import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const routes = ['/', '/learn', '/lakes', '/sound', '/fish-id', '/rules', '/weather', '/clams', '/parents']

async function prerender() {
  const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8')
  const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))

  for (const route of routes) {
    const { html: appHtml, helmet } = render(route)

    // Build head injection from Helmet
    const headTags = helmet
      ? [
          helmet.title.toString(),
          helmet.meta.toString(),
          helmet.link.toString(),
          helmet.script.toString(),
        ].filter(Boolean).join('\n    ')
      : ''

    const html = template
      // Replace the default title when Helmet provides one
      .replace(/<title>.*?<\/title>/, '')
      .replace('<!--app-head-->', headTags)
      .replace('<!--app-html-->', appHtml)

    const outDir = route === '/' ? resolve(root, 'dist') : resolve(root, `dist${route}`)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(resolve(outDir, 'index.html'), html)
    console.log(`  ✓ ${route}`)
  }

  console.log('\nPre-render complete.')
}

prerender().catch(err => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
