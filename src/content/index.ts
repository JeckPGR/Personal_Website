import type { CaseStudy } from './schema.ts'
import { sanitizeCaseStudy } from './schema.ts'

// Import projects
import fidelaCaseStudy from './projects/fidela.ts'
import inotriveCaseStudy from './projects/inotrive.ts'
import yayziCaseStudy from './projects/yayzi.ts'
import pajaBarbershopCaseStudy from './projects/paja-barbershop.ts'
import procurementOcrCaseStudy from './projects/procurement-ocr.ts'
import edulocalCaseStudy from './projects/edulocal.ts'
import watchSiteCaseStudy from './projects/watch-site.ts'
import metaLeadBotCaseStudy from './projects/meta-lead-bot.ts'
import telegramPosBotCaseStudy from './projects/telegram-pos-bot.ts'
import caatisHrmsCaseStudy from './projects/caatis-hrms.ts'
import pulseflowWebhookCaseStudy from './projects/pulseflow-webhook.ts'
import barbergoMobileCaseStudy from './projects/barbergo-mobile.ts'

// Import work experiences
import bankMandiriCaseStudy from './work/bank-mandiri.ts'
import telkomPropertyCaseStudy from './work/telkom-property.ts'
import caatisCaseStudy from './work/caatis.ts'
import informaticsLabCaseStudy from './work/informatics-lab.ts'
import jokiwithsoraCaseStudy from './work/jokiwithsora.ts'

export const projectCaseStudies: CaseStudy[] = [
  fidelaCaseStudy,
  inotriveCaseStudy,
  yayziCaseStudy,
  pajaBarbershopCaseStudy,
  procurementOcrCaseStudy,
  edulocalCaseStudy,
  watchSiteCaseStudy,
  metaLeadBotCaseStudy,
  telegramPosBotCaseStudy,
  caatisHrmsCaseStudy,
  pulseflowWebhookCaseStudy,
  barbergoMobileCaseStudy,
].map(sanitizeCaseStudy)

export const workCaseStudies: CaseStudy[] = [
  bankMandiriCaseStudy,
  telkomPropertyCaseStudy,
  caatisCaseStudy,
  informaticsLabCaseStudy,
  jokiwithsoraCaseStudy,
].map(sanitizeCaseStudy)

export const allCaseStudies: CaseStudy[] = [
  ...projectCaseStudies,
  ...workCaseStudies,
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return allCaseStudies.find((item) => item.slug === slug)
}

export function getProjectCaseStudy(slug: string): CaseStudy | undefined {
  return projectCaseStudies.find((item) => item.slug === slug)
}

export function getWorkCaseStudy(slug: string): CaseStudy | undefined {
  return workCaseStudies.find((item) => item.slug === slug)
}

export * from './schema.ts'
