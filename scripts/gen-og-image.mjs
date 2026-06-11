// One-time script to generate the OG preview image.
// Run manually: node scripts/gen-og-image.mjs
import { chromium } from 'playwright'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: linear-gradient(135deg, #1266cc 0%, #00bcd4 100%);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Nunito', sans-serif;
  }
  .card {
    background: rgba(255,255,255,0.12);
    border: 3px solid rgba(255,255,255,0.3);
    border-radius: 40px;
    padding: 60px 80px;
    text-align: center;
    color: white;
    max-width: 960px;
    width: 100%;
  }
  .fish { font-size: 96px; line-height: 1; margin-bottom: 24px; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.3)); }
  h1 {
    font-family: 'Fredoka One', cursive;
    font-size: 88px;
    line-height: 1.05;
    text-shadow: 3px 4px 0 rgba(0,0,0,0.2);
    margin-bottom: 20px;
  }
  p {
    font-size: 36px;
    font-weight: 700;
    opacity: 0.92;
    line-height: 1.4;
  }
  .tag {
    display: inline-block;
    background: rgba(255,255,255,0.22);
    border-radius: 999px;
    padding: 8px 28px;
    font-size: 28px;
    margin-top: 28px;
    font-weight: 800;
    letter-spacing: 0.02em;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="fish">🎣</div>
    <h1>Go Fish Seattle!</h1>
    <p>Free fishing guide for Seattle-area kids</p>
    <div class="tag">go-fish-seattle.vercel.app</div>
  </div>
</body>
</html>`

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setViewportSize({ width: 1200, height: 630 })
await page.setContent(html, { waitUntil: 'networkidle' })
const buf = await page.screenshot({ type: 'png' })
await browser.close()

const out = resolve(__dirname, '../public/og-image.png')
writeFileSync(out, buf)
console.log('OG image saved to public/og-image.png')
