import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects } from '../src/data/project.ts'
import { workExperiences } from '../src/data/work.ts'
import { getProjectCaseStudy, getWorkCaseStudy } from '../src/content/index.ts'
import { resolveLocalized } from '../src/content/schema.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')

if (!fs.existsSync(distDir)) {
  console.error('Prerender error: dist directory does not exist. Run vite build first.')
  process.exit(1)
}

const baseIndexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

type RouteMeta = {
  route: string
  title: string
  description: string
  ogType?: string
  bodyHtml: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const routesToPrerender: RouteMeta[] = []

// 1. /project page
const projectListRows = projects
  .map((p) => {
    const title = escapeHtml(p.title)
    const [sub, meta] = p.context.split(' / ')
    return `
      <li style="display: flex; justify-content: space-between; align-items: baseline; padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div>
          <a href="${p.route}" style="font-size: 20px; font-weight: 700; color: #f0ecff; text-decoration: none;">${title}</a>
          ${sub ? `<p style="font-size: 13px; color: #9d92cc; margin: 4px 0 0 0;">${escapeHtml(sub)}</p>` : ''}
        </div>
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #9d92cc;">${escapeHtml(meta || p.category)}</span>
      </li>
    `
  })
  .join('\n')

routesToPrerender.push({
  route: '/project',
  title: 'Project Showcase | Dzaky Razi',
  description:
    'Selected project work grouped by platform. Hover a row for a quick preview, click to open the full case.',
  bodyHtml: `
    <main style="max-width: 960px; margin: 0 auto; padding: 40px 20px; font-family: Inter, sans-serif; color: #f0ecff;">
      <h1 style="font-size: 32px; font-weight: 800; margin-bottom: 8px;">Project Showcase</h1>
      <p style="font-size: 14px; color: #9d92cc; margin-bottom: 32px;">Selected project work grouped by platform. Hover a row for a quick preview, click to open the full case.</p>
      <ul style="list-style: none; padding: 0; margin: 0;">
        ${projectListRows}
      </ul>
    </main>
  `,
})

// 2. /work page
const workListRows = workExperiences
  .map((w) => {
    const title = escapeHtml(w.company)
    const role = escapeHtml(w.role)
    const meta = escapeHtml(w.tag)
    return `
      <li style="display: flex; justify-content: space-between; align-items: baseline; padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div>
          <a href="${w.route}" style="font-size: 20px; font-weight: 700; color: #f0ecff; text-decoration: none;">${title}</a>
          ${role ? `<p style="font-size: 13px; color: #9d92cc; margin: 4px 0 0 0;">${role}</p>` : ''}
        </div>
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #9d92cc;">${meta}</span>
      </li>
    `
  })
  .join('\n')

routesToPrerender.push({
  route: '/work',
  title: 'Work Experience | Dzaky Razi',
  description:
    'Track record of work experience and real-world system engineering contributions.',
  bodyHtml: `
    <main style="max-width: 960px; margin: 0 auto; padding: 40px 20px; font-family: Inter, sans-serif; color: #f0ecff;">
      <h1 style="font-size: 32px; font-weight: 800; margin-bottom: 8px;">Work Experience</h1>
      <p style="font-size: 14px; color: #9d92cc; margin-bottom: 32px;">Track record of work experience and real-world system engineering contributions.</p>
      <ul style="list-style: none; padding: 0; margin: 0;">
        ${workListRows}
      </ul>
    </main>
  `,
})

// 3. Project Detail Pages
for (const p of projects) {
  const cs = getProjectCaseStudy(p.slug)
  const title = escapeHtml(p.title)
  const desc = escapeHtml(p.description.en)
  const problem = cs?.businessProblem ? escapeHtml(resolveLocalized(cs.businessProblem, 'en')) : ''
  const solution = cs?.solutionFit ? escapeHtml(resolveLocalized(cs.solutionFit, 'en')) : ''
  const flowNodes = cs?.system?.nodes
    ?.map((n) => `<li><strong>${escapeHtml(resolveLocalized(n.label, 'en'))}</strong>: ${escapeHtml(resolveLocalized(n.description, 'en'))}</li>`)
    .join('') || ''
  const archNodes = cs?.architecture?.nodes
    ?.map((n) => `<li><strong>${escapeHtml(resolveLocalized(n.label, 'en'))}</strong>: ${escapeHtml(resolveLocalized(n.description, 'en'))}</li>`)
    .join('') || ''

  routesToPrerender.push({
    route: p.route,
    title: `${p.title} - Project | Dzaky Razi`,
    description: p.description.en,
    ogType: 'article',
    bodyHtml: `
      <main style="max-width: 960px; margin: 0 auto; padding: 40px 20px; font-family: Inter, sans-serif; color: #f0ecff;">
        <a href="/project" style="color: #c9bfff; font-size: 13px;">&larr; Back to Projects</a>
        <h1 style="font-size: 36px; font-weight: 800; margin: 16px 0 8px;">${title}</h1>
        <p style="font-size: 14px; color: #c9bfff; margin-bottom: 24px;">${escapeHtml(p.context)}</p>
        <p style="font-size: 16px; line-height: 1.6; color: #f0ecff;">${desc}</p>
        ${problem ? `<section style="margin: 24px 0;"><h2>The Business Problem</h2><p>${problem}</p></section>` : ''}
        ${solution ? `<section style="margin: 24px 0;"><h2>The Engineering Solution</h2><p>${solution}</p></section>` : ''}
        ${flowNodes ? `<section style="margin: 24px 0;"><h2>System & Business Flow</h2><ul>${flowNodes}</ul></section>` : ''}
        ${archNodes ? `<section style="margin: 24px 0;"><h2>Technical Architecture</h2><ul>${archNodes}</ul></section>` : ''}
        <ul style="margin: 20px 0; padding-left: 20px;">
          ${p.keyPoints.en.map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}
        </ul>
      </main>
    `,
  })
}

// 4. Work Detail Pages
for (const w of workExperiences) {
  const cs = getWorkCaseStudy(w.slug)
  const title = escapeHtml(w.company)
  const summary = escapeHtml(w.summary.en)
  const problem = cs?.businessProblem ? escapeHtml(resolveLocalized(cs.businessProblem, 'en')) : ''
  const solution = cs?.solutionFit ? escapeHtml(resolveLocalized(cs.solutionFit, 'en')) : ''
  const flowNodes = cs?.system?.nodes
    ?.map((n) => `<li><strong>${escapeHtml(resolveLocalized(n.label, 'en'))}</strong>: ${escapeHtml(resolveLocalized(n.description, 'en'))}</li>`)
    .join('') || ''
  const archNodes = cs?.architecture?.nodes
    ?.map((n) => `<li><strong>${escapeHtml(resolveLocalized(n.label, 'en'))}</strong>: ${escapeHtml(resolveLocalized(n.description, 'en'))}</li>`)
    .join('') || ''

  routesToPrerender.push({
    route: w.route,
    title: `${w.company} - Work Experience | Dzaky Razi`,
    description: w.summary.en,
    ogType: 'article',
    bodyHtml: `
      <main style="max-width: 960px; margin: 0 auto; padding: 40px 20px; font-family: Inter, sans-serif; color: #f0ecff;">
        <a href="/work" style="color: #c9bfff; font-size: 13px;">&larr; Back to Work</a>
        <h1 style="font-size: 36px; font-weight: 800; margin: 16px 0 8px;">${title}</h1>
        <p style="font-size: 14px; color: #c9bfff; margin-bottom: 24px;">${escapeHtml(w.role)} &bull; ${escapeHtml(w.period.en)}</p>
        <p style="font-size: 16px; line-height: 1.6; color: #f0ecff;">${summary}</p>
        ${problem ? `<section style="margin: 24px 0;"><h2>The Business Problem</h2><p>${problem}</p></section>` : ''}
        ${solution ? `<section style="margin: 24px 0;"><h2>The Engineering Solution</h2><p>${solution}</p></section>` : ''}
        ${flowNodes ? `<section style="margin: 24px 0;"><h2>System & Business Flow</h2><ul>${flowNodes}</ul></section>` : ''}
        ${archNodes ? `<section style="margin: 24px 0;"><h2>Technical Architecture</h2><ul>${archNodes}</ul></section>` : ''}
        <ul style="margin: 20px 0; padding-left: 20px;">
          ${w.bullets.en.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}
        </ul>
      </main>
    `,
  })
}

console.log('============================================================')
console.log('FDE Prerender: Generating crawlable HTML pages')
console.log('============================================================')

for (const { route, title, description, ogType, bodyHtml } of routesToPrerender) {
  // Replace title & description in head
  let html = baseIndexHtml
    .replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(description)}" />`,
    )
    .replace(
      /<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
    )
    .replace(
      /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(description)}" />`,
    )

  if (ogType) {
    html = html.replace(
      /<meta\s+property=["']og:type["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:type" content="${escapeHtml(ogType)}" />`,
    )
  }

  // Inject prerendered fallback into #root
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${bodyHtml}</div>`,
  )

  const normalizedRoute = route.replace(/^\//, '')
  const targetDir = path.join(distDir, normalizedRoute)
  fs.mkdirSync(targetDir, { recursive: true })
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8')
  console.log(`✓ [Prerendered] ${route.padEnd(35)} -> ${path.relative(rootDir, path.join(targetDir, 'index.html'))}`)
}

console.log('============================================================')
console.log(`Prerender complete: ${routesToPrerender.length} crawlable pages generated in dist/.`)
