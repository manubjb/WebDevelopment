# Encurtador de URLs

Projeto de encurtamento de URLs desenvolvido em TypeScript com Bun, implementando 5 desafios técnicos progressivos.

## Objetivo

Aplicação backend que demonstra conhecimento em TypeScript, Bun e desenvolvimento de APIs REST com testes automatizados.

## Quick Start

### Requisitos
- Bun v1.3.13 ou superior

### Instalação
```bash
bun install
```

### Executar
```bash
bun run dev
# ou
bun run src/index.ts
```

### Testes
```bash
bun test
```

O servidor iniciará em `http://localhost:3003` (configurável via `.env`)

---

## Desafios Implementados

### Desafio A - Códigos Personalizados

Permite configurar um código customizado ao encurtar URLs.

- Validação: 4-10 caracteres (letras e números)
- Retorna 409 Conflict se código já existe
- Código gerado automaticamente se não informado

```bash
POST /api/encurtar
{
  "urlOriginal": "https://exemplo.com/muito/longo",
  "codigo": "customizado"
}
```

### Desafio B - Página de Estatísticas

Rota interativa que exibe informações de URLs encurtadas.

```
GET /stats/:codigo
```

Exibe:
- URL original
- Número de acessos
- Data de criação
- Data de expiração (se configurada)
- Status de atividade
- QR Code (api.qrserver.com)

### Desafio C - Expiração de Links

URLs podem ter data de expiração configurável.

- Coluna expiraEm (ISO 8601, opcional)
- Retorna 410 Gone ao acessar link expirado
- Status visível nas estatísticas

```bash
POST /api/encurtar
{
  "urlOriginal": "https://exemplo.com",
  "expiraEm": "2025-12-31T23:59:59Z"
}
```

### Desafio D - Testes Automatizados

Cobertura de testes para módulos críticos.

- `src/util.test.ts` - 15 testes
- `src/banco.test.ts` - 6 testes

```bash
bun test
# 21 pass, 0 fail
```

### Desafio E - Variáveis de Ambiente

Configuração da aplicação via `.env`.

```env
PORTA=3003
```

Leitura em tempo de execução com `Bun.env.PORTA`.

---

## Estrutura do Projeto

```
EncurtadorURL/
├── src/
│   ├── index.ts          Servidor e rotas
│   ├── banco.ts          Operações SQLite
│   ├── util.ts           Validadores e geradores
│   ├── tipos.ts          Tipos TypeScript
│   ├── util.test.ts      Testes utilitários
│   └── banco.test.ts     Testes de banco
├── public/
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## API REST

### Encurtar URL
```
POST /api/encurtar
Content-Type: application/json

{
  "urlOriginal": "https://exemplo.com",
  "codigo": "opcional",
  "expiraEm": "2025-12-31T..."
}

Respostas:
201 Created - URL encurtada
400 Bad Request - URL ou código inválido
409 Conflict - Código já existe
```

### Listar URLs
```
GET /api/urls

Respostas:
200 OK - Array de URLs cadastradas
```

### Acessar URL
```
GET /:codigo

Respostas:
302 Found - Redireciona para URL original
404 Not Found - Código não existe
410 Gone - Link expirado
```

### Estatísticas
```
GET /stats/:codigo

Respostas:
200 OK - Página HTML com informações
404 Not Found - Código não existe
```

---

## Tecnologias

- Bun 1.3.13+
- TypeScript 5.x
- SQLite (integrado no Bun)
- Bun Test (test runner nativo)

---

## Notas

- Banco de dados SQLite é criado automaticamente
- Sem dependências externas além do Bun
- QR Codes gerados via API pública



