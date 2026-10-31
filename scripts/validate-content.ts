import { caseStudySchema } from '../src/content/schema.ts'

// Raw imports before sanitization
import fidela from '../src/content/projects/fidela.ts'
import inotrive from '../src/content/projects/inotrive.ts'
import yayzi from '../src/content/projects/yayzi.ts'
import pajaBarbershop from '../src/content/projects/paja-barbershop.ts'
import procurementOcr from '../src/content/projects/procurement-ocr.ts'
import edulocal from '../src/content/projects/edulocal.ts'
import watchSite from '../src/content/projects/watch-site.ts'
import metaLeadBot from '../src/content/projects/meta-lead-bot.ts'
import telegramPosBot from '../src/content/projects/telegram-pos-bot.ts'
import caatisHrms from '../src/content/projects/caatis-hrms.ts'
import pulseflowWebhook from '../src/content/projects/pulseflow-webhook.ts'
import barbergoMobile from '../src/content/projects/barbergo-mobile.ts'

import bankMandiri from '../src/content/work/bank-mandiri.ts'
import telkomProperty from '../src/content/work/telkom-property.ts'
import caatis from '../src/content/work/caatis.ts'
import informaticsLab from '../src/content/work/informatics-lab.ts'
import jokiwithsora from '../src/content/work/jokiwithsora.ts'

const rawEntries = [
  fidela,
  inotrive,
  yayzi,
  pajaBarbershop,
  procurementOcr,
  edulocal,
  watchSite,
  metaLeadBot,
  telegramPosBot,
  caatisHrms,
  pulseflowWebhook,
  barbergoMobile,
  bankMandiri,
  telkomProperty,
  caatis,
  informaticsLab,
  jokiwithsora,
]

console.log('='.repeat(60))
console.log('FDE Content Validation & TODO Report')
console.log('='.repeat(60))

let hasSchemaError = false
const todos: Array<{ slug: string; path: string; text: string }> = []

function scanTodos(obj: unknown, slug: string, currentPath = '') {
  if (typeof obj === 'string') {
    if (obj.includes('TODO:')) {
      todos.push({ slug, path: currentPath, text: obj })
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, idx) => scanTodos(item, slug, `${currentPath}[${idx}]`))
  } else if (obj !== null && typeof obj === 'object') {
    for (const [key, val] of Object.entries(obj)) {
      scanTodos(val, slug, currentPath ? `${currentPath}.${key}` : key)
    }
  }
}

for (const entry of rawEntries) {
  const result = caseStudySchema.safeParse(entry)
  if (!result.success) {
    console.error(`✗ [Invalid] ${entry.kind.padEnd(7)} | ${entry.slug}`)
    console.error(JSON.stringify(result.error.format(), null, 2))
    hasSchemaError = true
  } else {
    console.log(`✓ [Valid] ${entry.kind.padEnd(7)} | ${entry.slug}`)
    scanTodos(entry, entry.slug)
  }
}

if (todos.length > 0) {
  console.log('\n' + '-'.repeat(60))
  console.log(`TODO Report: ${todos.length} item(s) pending author data`)
  console.log('-'.repeat(60))
  todos.forEach(({ slug, path, text }) => {
    console.log(`[${slug}] ${path} -> "${text}"`)
  })
  console.log('\nNote: Fields with "TODO:" are automatically excluded from the public live site.')
}

console.log('='.repeat(60))

if (hasSchemaError) {
  console.error('Validation failed: One or more case study schemas are invalid.')
  process.exit(1)
} else {
  console.log('All case study schemas passed Zod validation.\n')
}
