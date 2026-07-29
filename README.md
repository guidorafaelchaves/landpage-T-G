# T&G Innovations — Ecossistema digital

Experiência multipágina em React + Vite para apresentar as frentes de logística, mobilidade elétrica, energia solar e infraestrutura de recarga da T&G.

## Arquitetura

- Home cinematográfica com narrativa de scroll e cidade voxel procedural em Three.js.
- Páginas comerciais independentes para Logística, Galpão, E-Bikes, Energia Solar, Carregadores, Sobre e Contato.
- Animações em GSAP/ScrollTrigger e rolagem suave com Lenis apenas no desktop.
- Fontes variáveis hospedadas localmente.
- Cena 3D, efeitos e conteúdo divididos em chunks independentes.
- Fallback sem WebGL e suporte a `prefers-reduced-motion`.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

O build gera oito entradas HTML dentro de `dist/`, além de `robots.txt` e `sitemap.xml`.

## Deploy

Cada push para `main` executa o build e publica `dist/` no GitHub Pages. `node_modules/` e `dist/` não são versionados.

Produção: [https://tg.log.br](https://tg.log.br)

O relatório técnico está em [`PERFORMANCE.md`](./PERFORMANCE.md).
