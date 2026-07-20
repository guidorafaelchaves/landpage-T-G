# T&G Innovations — Landing Page Cinematográfica

Landing page em React + Vite com Three.js, GSAP ScrollTrigger, Lenis e Framer Motion.

## Rodar localmente

```bash
npm install
npm run dev
```

## Gerar produção

```bash
npm run build
```

## Deploy

Cada push para a branch `main` publica a pasta `dist/` no GitHub Pages, sem instalar dependências no runner.

Ao alterar o código-fonte, execute `npm run build` e inclua a pasta `dist/` atualizada no commit. As dependências (`node_modules/`) não devem ser versionadas.
