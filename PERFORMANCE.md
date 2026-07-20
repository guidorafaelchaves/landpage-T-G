# Relatório de desempenho e validação

Medições realizadas em 20 de julho de 2026. Os números abaixo são de laboratório e servem como referência comparativa; resultados reais variam conforme dispositivo, rede e cache.

## Antes

- Site público no GitHub Pages: LCP de 1.258 ms e CLS de 0,00, sem limitação artificial de rede ou CPU.
- JavaScript principal: 861,58 kB (arquivo sem compressão).
- Three.js, GSAP, Lenis e Framer Motion carregados no caminho inicial.
- Cena 3D e duas rotinas de animação contínua competiam pelo ciclo de renderização.
- Lighthouse móvel: Acessibilidade 100, Boas práticas 100 e SEO 100.

## Depois

- Versão local de produção: LCP de 127 ms e CLS de 0,00, sem limitação artificial de rede ou CPU.
- JavaScript inicial: 167,79 kB (53,46 kB gzip), redução aproximada de 80,5% no arquivo principal sem compressão.
- CSS: 18,05 kB (5,13 kB gzip).
- Conteúdo aprofundado do dossiê: 11,87 kB (4,39 kB gzip), carregado somente quando solicitado.
- Efeitos de rolagem: 127,90 kB (49,25 kB gzip), iniciados após o conteúdo principal.
- Cena Three.js: 468,18 kB (118,19 kB gzip), carregada de forma tardia e desativada com preferência de movimento reduzido ou pouca memória.

O LCP local não é diretamente comparável ao site público por eliminar a latência da internet. A redução do pacote inicial é a comparação estrutural mais confiável antes da publicação.

## Melhorias implementadas

- Remoção do Framer Motion e consolidação das animações em GSAP/Lenis.
- Divisão do código por responsabilidade e carregamento sob demanda do 3D, dos efeitos e do dossiê.
- Cena 3D simplificada, menor densidade de pixels e pausa automática quando a aba não está visível.
- Conteúdo essencial renderizado primeiro e alternativa institucional em `noscript`.
- Dossiê acessível com foco controlado, fechamento por Escape, bloqueio do fundo e retorno ao acionador.
- Respeito a `prefers-reduced-motion`, navegação por teclado, foco visível e menu responsivo.
- Metadados de SEO, Open Graph, canonical e dados estruturados de organização.
- Deploy refeito para instalar, compilar e publicar o artefato `dist` pelo GitHub Actions; `dist` e `node_modules` não são versionados.

## Validações

- Build de produção com Vite concluído sem erros.
- Links internos, seis perfis de público e 23 acionadores de conteúdo testados.
- Acesso direto por hash ao dossiê e recarga da página verificados.
- Sem overflow horizontal no viewport móvel de 397 × 823 px.
- Sem erros no console durante os fluxos testados.

O cache do GitHub Pages é controlado pela plataforma e não pode ser configurado diretamente neste repositório. Os nomes versionados dos arquivos gerados permitem invalidação segura a cada build.
