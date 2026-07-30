import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { routeAliases, routePages, routePaths } from '../src/content/routes.js'

const dist = resolve('dist')
const homeHtml = await readFile(resolve(dist, 'index.html'), 'utf8')

function replaceMeta(html, route) {
  const canonicalRoute = routeAliases[route] || route
  const page = routePages[canonicalRoute]
  const depth = route.split('/').length
  const assetPrefix = `${'../'.repeat(depth)}assets/`
  const canonical = `https://tg.log.br/${canonicalRoute}/`
  const title = `${page.title} | T&G Innovations`
  return html
    .replaceAll('./assets/', assetPrefix)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${page.summary}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${page.summary}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${page.summary}" />`)
}

for (const route of routePaths) {
  const directory = resolve(dist, route)
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), replaceMeta(homeHtml, route), 'utf8')
}

const sitemapRoutes = ['', ...Object.keys(routePages)]
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapRoutes.map((route) => `  <url><loc>https://tg.log.br/${route ? `${route}/` : ''}</loc><priority>${route ? '0.8' : '1.0'}</priority></url>`),
  '</urlset>',
  '',
].join('\n')
await writeFile(resolve(dist, 'sitemap.xml'), sitemap, 'utf8')

console.log(`Generated ${routePaths.length} static routes and sitemap.xml`)
