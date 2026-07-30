import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { routeAliases, routePages, routePaths } from '../src/content/routes.js'

const errors = []
const dist = resolve('dist')

for (const route of routePaths) {
  const canonical = routeAliases[route] || route
  const page = routePages[canonical]
  if (!page?.title || !page?.summary || !page?.cta || !page?.items?.length) {
    errors.push(`${route}: conteúdo obrigatório incompleto`)
  }
  for (const related of page?.related || []) {
    const relatedKey = related.replace(/^\/|\/$/g, '')
    if (!routePages[relatedKey] && !routeAliases[relatedKey]) {
      errors.push(`${route}: link relacionado inexistente (${related})`)
    }
  }

  const htmlPath = resolve(dist, route, 'index.html')
  try {
    await access(htmlPath)
    const html = await readFile(htmlPath, 'utf8')
    if (!html.includes(`https://tg.log.br/${canonical}/`)) {
      errors.push(`${route}: canonical incorreto`)
    }
    const depth = route.split('/').length
    if (!html.includes(`${'../'.repeat(depth)}assets/`)) {
      errors.push(`${route}: caminho de assets incorreto`)
    }
  } catch {
    errors.push(`${route}: página estática não gerada`)
  }
}

const sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8')
for (const route of Object.keys(routePages)) {
  if (!sitemap.includes(`https://tg.log.br/${route}/`)) {
    errors.push(`${route}: ausente do sitemap`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${routePaths.length} routes, related links, metadata, assets and sitemap`)
