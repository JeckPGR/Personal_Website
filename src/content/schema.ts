import { z } from 'zod'

export type Localized = {
  en: string
  id?: string
}

export const localizedSchema = z.object({
  en: z.string().min(1),
  id: z.string().optional(),
})

export type FlowNodeType =
  | 'actor'
  | 'human'
  | 'step'
  | 'service'
  | 'data'
  | 'ai'
  | 'external'

export const flowNodeTypeSchema = z.enum([
  'actor',
  'human',
  'step',
  'service',
  'data',
  'ai',
  'external',
])

export type FlowNode = {
  id: string
  type: FlowNodeType
  label: Localized
  description?: Localized
  tools?: string[]
  hideTools?: boolean
  lane?: number
}

export const flowNodeSchema = z.object({
  id: z.string().min(1),
  type: flowNodeTypeSchema,
  label: localizedSchema,
  description: localizedSchema.optional(),
  tools: z.array(z.string()).optional(),
  hideTools: z.boolean().optional(),
  lane: z.number().int().optional(),
})

export type FlowEdge = {
  from: string
  to: string
  label?: Localized
  style?: 'solid' | 'dashed'
}

export const flowEdgeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  label: localizedSchema.optional(),
  style: z.enum(['solid', 'dashed']).optional(),
})

export type FlowDiagram = {
  direction?: 'horizontal' | 'vertical' | 'auto'
  nodes: FlowNode[]
  edges: FlowEdge[]
}

export const flowDiagramSchema = z.object({
  direction: z.enum(['horizontal', 'vertical', 'auto']).optional(),
  nodes: z.array(flowNodeSchema),
  edges: z.array(flowEdgeSchema),
})

export type EvidenceType = 'measured' | 'estimated' | 'qualitative'

export type CaseStudyResult = {
  value: string
  label: Localized
  evidence: EvidenceType
  note?: Localized
}

export const caseStudyResultSchema = z.object({
  value: z.string().min(1),
  label: localizedSchema,
  evidence: z.enum(['measured', 'estimated', 'qualitative']),
  note: localizedSchema.optional(),
})

export type CaseStudyShowcase = {
  src: string
  alt: Localized
  caption: Localized
}

export const caseStudyShowcaseSchema = z.object({
  src: z.string().min(1),
  alt: localizedSchema,
  caption: localizedSchema,
})

export type TechStackGroup = {
  group: string
  items: string[]
}

export const techStackGroupSchema = z.object({
  group: z.string().min(1),
  items: z.array(z.string().min(1)),
})

export type CaseStudy = {
  slug: string
  kind: 'work' | 'project'
  category?: 'web-app' | 'mobile' | 'automation-bot'
  title: Localized
  subtitle?: Localized
  tagline: Localized
  metaLabel?: Localized
  thumbnail?: string
  accent?: string
  status: 'live' | 'beta' | 'internal' | 'archived'
  period: { start: string; end: string | 'present' }
  org?: { name: string; role: string; domain?: string }
  link?: { label: string; url: string }
  scope: { type: 'solo' | 'lead' | 'contributor'; summary: Localized }
  businessProblem?: Localized
  solutionFit?: Localized
  system?: FlowDiagram
  architecture?: FlowDiagram
  results?: CaseStudyResult[]
  showcase?: CaseStudyShowcase[]
  techStack?: TechStackGroup[]
  reflection?: Localized
  featured?: boolean
}

export const caseStudySchema = z
  .object({
    slug: z.string().min(1),
    kind: z.enum(['work', 'project']),
    category: z.enum(['web-app', 'mobile', 'automation-bot']).optional(),
    title: localizedSchema,
    subtitle: localizedSchema.optional(),
    tagline: localizedSchema,
    metaLabel: localizedSchema.optional(),
    thumbnail: z.string().optional(),
    accent: z.string().optional(),
    status: z.enum(['live', 'beta', 'internal', 'archived']),
    period: z.object({
      start: z.string().min(1),
      end: z.string().min(1),
    }),
    org: z
      .object({
        name: z.string().min(1),
        role: z.string().min(1),
        domain: z.string().optional(),
      })
      .optional(),
    link: z
      .object({
        label: z.string().min(1),
        url: z.string().min(1),
      })
      .optional(),
    scope: z.object({
      type: z.enum(['solo', 'lead', 'contributor']),
      summary: localizedSchema,
    }),
    businessProblem: localizedSchema.optional(),
    solutionFit: localizedSchema.optional(),
    system: flowDiagramSchema.optional(),
    architecture: flowDiagramSchema.optional(),
    results: z.array(caseStudyResultSchema).optional(),
    showcase: z.array(caseStudyShowcaseSchema).optional(),
    techStack: z.array(techStackGroupSchema).optional(),
    reflection: localizedSchema.optional(),
    featured: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.kind === 'project' && !data.category) return false
      return true
    },
    {
      message: 'category is required when kind = "project"',
      path: ['category'],
    },
  )

/** Helper to check whether a string is a TODO item */
export function isTodo(val?: string | null): boolean {
  if (!val) return false
  return val.trim().startsWith('TODO:') || val.trim() === 'TODO'
}

/** Check if a Localized object is a TODO */
export function isLocalizedTodo(val?: Localized | null): boolean {
  if (!val) return false
  return isTodo(val.en) || isTodo(val.id)
}

/** Resolve localized text with EN fallback */
export function resolveLocalized(val: Localized | undefined, lang: 'en' | 'id'): string {
  if (!val) return ''
  if (lang === 'id' && val.id && !isTodo(val.id)) return val.id
  if (val.en && !isTodo(val.en)) return val.en
  return ''
}

/** Sanitize case study for live display: hides fields that contain TODO strings */
export function sanitizeCaseStudy(item: CaseStudy): CaseStudy {
  const isDev =
    typeof globalThis !== 'undefined' &&
    (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV !== 'production'

  const check = (val?: Localized) => (val && !isLocalizedTodo(val) ? val : undefined)

  const cleanResults = item.results?.filter((r) => {
    if (isTodo(r.value) || isLocalizedTodo(r.label)) {
      if (isDev) console.warn(`[FDE TODO] Hidden result card in ${item.slug}:`, r)
      return false
    }
    return true
  })

  const cleanShowcase = item.showcase?.filter((s) => {
    if (isTodo(s.src) || isLocalizedTodo(s.alt)) {
      if (isDev) console.warn(`[FDE TODO] Hidden showcase in ${item.slug}:`, s)
      return false
    }
    return true
  })

  const cleanTechStack = item.techStack?.map((g) => ({
    group: g.group,
    items: g.items.filter((i) => !isTodo(i)),
  })).filter((g) => g.items.length > 0)

  return {
    ...item,
    businessProblem: check(item.businessProblem),
    solutionFit: check(item.solutionFit),
    results: cleanResults && cleanResults.length > 0 ? cleanResults : undefined,
    showcase: cleanShowcase && cleanShowcase.length > 0 ? cleanShowcase : undefined,
    techStack: cleanTechStack && cleanTechStack.length > 0 ? cleanTechStack : undefined,
    reflection: check(item.reflection),
  }
}
