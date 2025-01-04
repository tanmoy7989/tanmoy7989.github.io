import { promises as fs } from 'fs'
import * as theme from 'jsonresume-theme-cortado'
import puppeteer from 'puppeteer'
import { render } from 'resumed'

const themePkg =  'jsonresume-theme-cortado/index.js';

// render html
const resume = JSON.parse(await fs.readFile('content/resume.json', 'utf-8'))
const html = await render(resume, theme)
await fs.writeFile("content/resume.html", html)

// render pdf (using puppeteer + chromium)
const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=medium']
})

const page = await browser.newPage()

await page.emulateMediaType(
    (themePkg.pdfRenderOptions && themePkg.pdfRenderOptions.mediaType) ||
      'screen',
);

await page.setContent(html, { waitUntil: 'networkidle0' })

if (themePkg.pdfViewport) {
    await page.setViewport(themePkg.pdfViewport);
}

await page.pdf({
    path: 'content/resume.pdf',
    format: 'letter',
    printBackground: true,
    ...themePkg.pdfRenderOptions,
  });

await browser.close()