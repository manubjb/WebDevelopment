import {
    inserirUrl, buscarPorCodigo, registrarAcesso, listarUrls
} from "./banco";
import { gerarCodigo, urlValida, codigoValido } from "./util";
import type { RespostaErro } from "./tipos";

function json(dados: unknown, status: number = 200): Response {
    return new Response(JSON.stringify(dados, null, 2), {
        status,
        headers: { "Content-Type": "application/json; charset=utf-8" },
    });
}

function erro(mensagem: string, status: number): Response {
    const resp: RespostaErro = { erro: mensagem };
    return json(resp, status);
}

function verificarExpiracao(expiraEm?: string): boolean {
    if (!expiraEm) return false;
    return new Date(expiraEm) < new Date();
}

const porta = Bun.env.PORTA ? Number(Bun.env.PORTA) : 3000;

const servidor = Bun.serve({
    port: porta,
    async fetch(req: Request): Promise<Response> {
        const url = new URL(req.url);
        const caminho = url.pathname;
        const metodo = req.method;

        // POST /api/encurtar -> cria nova URL curta
        // Desafio A: suporta código personalizado
        if (metodo === "POST" && caminho === "/api/encurtar") {
            const corpo = await req.json() as {
                urlOriginal?: string;
                codigo?: string;
                expiraEm?: string;
            };

            if (!corpo.urlOriginal || !urlValida(corpo.urlOriginal)) {
                return erro("URL inválida. Forneça http:// ou https://", 400);
            }

            let codigo: string;
            if (corpo.codigo) {
                if (!codigoValido(corpo.codigo)) {
                    return erro("Código inválido. Use 4–10 caracteres (letras e números)", 400);
                }
                if (buscarPorCodigo(corpo.codigo)) {
                    return erro("Código já existe", 409);
                }
                codigo = corpo.codigo;
            } else {
                codigo = gerarCodigo();
            }

            const registro = inserirUrl(codigo, corpo.urlOriginal, corpo.expiraEm);
            return json(registro, 201);
        }

        // GET /api/urls -> lista todas
        if (metodo === "GET" && caminho === "/api/urls") {
            return json(listarUrls());
        }

        // GET /:codigo -> redireciona
        // Desafio C: verifica expiração
        if (metodo === "GET" && /^\/[A-Za-z0-9]{4,10}$/.test(caminho)) {
            const codigo = caminho.slice(1);
            const registro = buscarPorCodigo(codigo);

            if (!registro) return erro("Código não encontrado", 404);

            if (verificarExpiracao(registro.expiraEm)) {
                return erro("Link expirado", 410);
            }

            registrarAcesso(codigo);
            return Response.redirect(registro.urlOriginal, 302);
        }

        // GET /stats/:codigo -> página de estatísticas
        // Desafio B: mostra informações da URL com QR Code
        if (metodo === "GET" && /^\/stats\/[A-Za-z0-9]{4,10}$/.test(caminho)) {
            const codigo = caminho.slice("/stats/".length);
            const registro = buscarPorCodigo(codigo);

            if (!registro) {
                return new Response("Código não encontrado", { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } });
            }

            const urlCurta = `${new URL(req.url).origin}/${codigo}`;
            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(urlCurta)}`;
            const dataFormatada = new Date(registro.criadoEm).toLocaleString("pt-BR");
            const expiraEm = registro.expiraEm
                ? new Date(registro.expiraEm).toLocaleString("pt-BR")
                : "Nunca expira";
            const statusExpiracao = verificarExpiracao(registro.expiraEm) ? "🔴 Expirado" : "🟢 Ativo";

            const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estatísticas - ${codigo}</title>
    <style>
        body {
            font-family: system-ui;
            max-width: 600px;
            margin: 40px auto;
            padding: 0 20px;
        }
        .container {
            background: #f5f5f5;
            padding: 30px;
            border-radius: 8px;
        }
        h1 {
            color: #0d4f3c;
            margin-bottom: 30px;
        }
        .stats {
            background: white;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        .stat-item {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #eee;
        }
        .stat-item:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #333;
        }
        .value {
            color: #0d4f3c;
            word-break: break-all;
        }
        .qr-code {
            text-align: center;
            margin: 20px 0;
        }
        .qr-code img {
            border: 2px solid #0d4f3c;
            border-radius: 6px;
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #0d4f3c;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        .back-link:hover {
            opacity: 0.9;
        }
        .status {
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>■ Estatísticas da URL Curta</h1>
        
        <div class="stats">
            <div class="stat-item">
                <span class="label">Código:</span>
                <span class="value">${codigo}</span>
            </div>
            <div class="stat-item">
                <span class="label">URL Original:</span>
                <span class="value"><a href="${registro.urlOriginal}" target="_blank" style="color: #0d4f3c;">${registro.urlOriginal}</a></span>
            </div>
            <div class="stat-item">
                <span class="label">Acessos:</span>
                <span class="value">${registro.acessos}</span>
            </div>
            <div class="stat-item">
                <span class="label">Criado em:</span>
                <span class="value">${dataFormatada}</span>
            </div>
            <div class="stat-item">
                <span class="label">Expira em:</span>
                <span class="value">${expiraEm}</span>
            </div>
            <div class="stat-item">
                <span class="label">Status:</span>
                <span class="value status">${statusExpiracao}</span>
            </div>
        </div>

        <div class="qr-code">
            <p><strong>QR Code:</strong></p>
            <img src="${qrCodeUrl}" alt="QR Code" />
        </div>

        <a href="/" class="back-link">← Voltar</a>
    </div>
</body>
</html>
            `;

            return new Response(html, {
                status: 200,
                headers: { "Content-Type": "text/html; charset=utf-8" },
            });
        }


        // GET / -> serve o frontend
        if (metodo === "GET" && caminho === "/") {
            return new Response(Bun.file("./public/index.html"));
        }
        if (metodo === "GET" && caminho === "/app.js") {
            return new Response(Bun.file("./public/app.js"));
        }
        if (metodo === "GET" && caminho === "/styles.css") {
            return new Response(Bun.file("./public/styles.css"));
        }

        return erro("Rota não encontrada", 404);
    },
});

console.log(`■ Servidor pronto em http://localhost:${servidor.port}`);
