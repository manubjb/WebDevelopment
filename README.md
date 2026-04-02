# WebDevelopment — aulas de Desenvolvimento Web (7º período / IFES Cachoeiro)

Repositório com os materiais práticos das aulas da disciplina de Desenvolvimento Web do 7º período de Sistemas de Informação (IFES Campus Cachoeiro). Cada pasta traz um exercício focado em revisar e reforçar conceitos vistos ao longo do curso. 

## AulaBootstrap (06) — Loja Virtual com Bootstrap 5

Página estática que simula o catálogo de uma loja virtual usando a biblioteca Bootstrap 5 diretamente via CDN. O exercício revisa grid responsivo, cartões de produto e construção de um rodapé com ícones sociais.

### Estrutura
- `AulaBootstrap (06)/index.html` — markup principal com cards de produtos, cabeçalho e rodapé.
- `AulaBootstrap (06)/style.css` — reservado para estilos próprios (vazio no momento; o layout depende apenas do Bootstrap 5 e Bootstrap Icons via CDN).

### Conceitos revisados
- **Grid responsivo** (`row-cols-*`, `container`, `col`) para distribuir cards em diferentes larguras.
- **Cards** com imagem, título e ações para simular produtos.
- **Utilitários de espaçamento e tipografia** (`p-3`, `lead`, `display-3`, `text-bg-*`, `btn`).
- **Bootstrap Icons** integrados via CDN para links sociais no rodapé.

### Como executar localmente
1) Abra a pasta do exercício: `cd "AulaBootstrap (06)"`.
2) Inicie um servidor simples (opcional, mas facilita testes de caminhos relativos): `python3 -m http.server 8000` e acesse `http://localhost:8000/index.html`; ou simplesmente abra `index.html` direto no navegador.

### Próximos passos sugeridos
- Adicionar estilos próprios em `style.css` para customizar paleta e tipografia além do tema padrão do Bootstrap.
- Criar páginas complementares (`products.html`, `about.html`) citadas no rodapé para simular uma navegação completa.
- Substituir os placeholders do `picsum.photos` por imagens reais de produtos e integrar preços/estoque.
