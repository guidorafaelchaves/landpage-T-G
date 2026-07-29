# Relatório de desempenho e validação

Medições de laboratório realizadas em 29 de julho de 2026 sobre o build local de produção. Resultados reais variam conforme dispositivo, rede, cache e disponibilidade do GitHub Pages.

## Core Web Vitals

| Cenário | LCP | CLS | Avaliação |
| --- | ---: | ---: | --- |
| Desktop, sem limitação artificial | 175 ms | 0,03 | Bom |
| Mobile, CPU 4× + rede Slow 4G | 1.793 ms | 0,00 | Bom |

No cenário móvel limitado, a folha de estilos foi o único recurso bloqueante relevante, com economia teórica de 554 ms. O LCP permaneceu abaixo da referência de 2,5 s, portanto não foi introduzida complexidade de CSS crítico inline.

## Lighthouse

| Categoria | Mobile | Desktop |
| --- | ---: | ---: |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |
| Navegação por agentes | 100 | 100 |

As auditorias finais não registraram falhas.

## Pacotes de produção

- JavaScript inicial: 182,30 kB, 56,62 kB gzip.
- CSS compartilhado: 44,70 kB, 10,65 kB gzip.
- Efeitos GSAP/Lenis: 130,35 kB, 50,07 kB gzip, carregados após o conteúdo inicial.
- Cidade Three.js: 478,17 kB, 121,89 kB gzip, carregada sob demanda.
- Fontes latinas variáveis: Inter 48,26 kB e Space Grotesk 22,29 kB.

## Estratégias adotadas

- Cidade voxel construída com geometrias procedurais, sem vídeo ou texturas pesadas.
- Cena 3D em chunk independente, iniciada quando o navegador está ocioso.
- Menos objetos, menor densidade de pixels e sombras reduzidas em mobile ou dispositivos com pouca memória.
- Pausa automática da animação quando a aba deixa de estar visível.
- Fontes hospedadas localmente para eliminar dependência externa e reduzir CLS de 0,16 para 0,03 no desktop e 0,00 no mobile limitado.
- GSAP e Lenis carregados separadamente; Lenis não é iniciado em telas menores.
- Fallback sem WebGL e experiência estática quando há preferência por movimento reduzido.
- Imagens com dimensões naturais declaradas.
- Oito documentos HTML com metadados específicos, canonical, Open Graph, sitemap e robots.

## Validações funcionais

- Oito páginas, `robots.txt` e `sitemap.xml` responderam HTTP 200.
- Página de logística: oito capacidades, três perguntas frequentes, formulário e Schema.org renderizados.
- Menu móvel abre, atualiza `aria-expanded` e fecha por Escape.
- Formulários possuem cinco rótulos e três campos obrigatórios.
- Nenhum overflow horizontal nos viewports testados.
- Nenhum erro, aviso ou issue no console.
- Build Vite concluído com 58 módulos transformados.

O GitHub Pages controla seus próprios cabeçalhos de cache. Os assets gerados usam nomes com hash, permitindo invalidação segura em cada publicação.
