const btn = document.getElementById("btn");
const input = document.getElementById("url");
const resultado = document.getElementById("resultado");
const ordenar = document.getElementById("ordenar");
const tbody = document.querySelector("#tabela tbody");
function formatarData(iso) {
    return new Date(iso).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    });
}
async function carregarLista() {
    const ordem = ordenar.value;
    const resp = await fetch(`/api/urls?ordenar=${ordem}`);
    const lista = await resp.json();
    tbody.innerHTML = lista.map(u => `
 <tr>
 <td><a href="/${u.codigo}" target="_blank">${u.codigo}</a></td>
 <td><a href="${u.urlOriginal}" target="_blank">${u.urlOriginal}</a></td>
 <td>${u.acessos}</td>
 <td>${formatarData(u.criadoEm)}</td>
 <td><button class="copy-button" data-codigo="${u.codigo}">Copiar</button></td>
 </tr>`).join("");
    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", async (event) => {
            const codigo = event.currentTarget.dataset.codigo;
            if (!codigo) return;
            const curta = `${location.origin}/${codigo}`;
            await navigator.clipboard.writeText(curta);
            mostrarResultado(`Link copiado: ${curta}`);
        });
    });
}
function mostrarResultado(mensagem, erro = false) {
    resultado.innerHTML = `<div class="resultado ${erro ? "erro" : "ok"}">${mensagem}</div>`;
}
btn.addEventListener("click", async () => {
    const resp = await fetch("/api/encurtar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urlOriginal: input.value }),
    });
    const dados = await resp.json();
    if (!resp.ok) {
        mostrarResultado(dados.erro, true);
        return;
    }
    const curta = `${location.origin}/${dados.codigo}`;
    mostrarResultado(`URL curta: <a href="${curta}" target="_blank">${curta}</a>`);
    input.value = "";
    carregarLista();
});
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
});
ordenar.addEventListener("change", carregarLista);
carregarLista();
