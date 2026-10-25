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
    hasSchemaError = true
    console.error(`\n❌ [Validation Failed] ${entry.slug}:`)
    for (const issue of result.error.issues) {
      console.error(`   - Field: ${issue.path.join('.')} | Error: ${issue.message}`)
    }
  } else {
    console.log(`✓ [Valid] ${entry.kind.padEnd(7)} | ${entry.slug}`)
  }

  scanTodos(entry, entry.slug)
}

console.log('\n' + '-'.repeat(60))
console.log(`TODO Report: ${todos.length} item(s) pending author data`)
console.log('-'.repeat(60))

if (todos.length > 0) {
  for (const t of todos) {
    console.log(`[${t.slug}] ${t.path} -> "${t.text.trim()}"`)
  }
  console.log('\nNote: Fields with "TODO:" are automatically excluded from the public live site.')
} else {
  console.log('All fields are fully populated with no pending TODOs.')
}

console.log('='.repeat(60))

if (hasSchemaError) {
  console.error('\nBuild aborted: Zod schema validation errors found above.')
  process.exit(1)
} else {
  console.log('All case study schemas passed Zod validation.\n')
}
