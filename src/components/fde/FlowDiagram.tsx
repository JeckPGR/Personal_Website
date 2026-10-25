import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { FlowDiagram as FlowDiagramType, FlowNode, FlowNodeType } from '../../content/schema'
import { resolveLocalized } from '../../content/schema'
import { useLanguage } from '../../hooks/useLanguage'
import { useTheme } from '../../hooks/useTheme'

type FlowDiagramProps = {
  diagram: FlowDiagramType
  /** Distinguishes between system flow and architecture for classified tool rules */
  mode?: 'system' | 'architecture'
}

type NodeStyleConfig = {
  label: string
  badgeDark: string
  badgeLight: string
  borderDark: string
  borderLight: string
}

const TYPE_CONFIG: Record<FlowNodeType, NodeStyleConfig> = {
  actor: {
    label: 'CLIENT',
    badgeDark: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
    badgeLight: 'bg-cyan-50 text-cyan-800 border-cyan-300',
    borderDark: 'border-cyan-500/30 hover:border-cyan-400/60',
    borderLight: 'border-cyan-300 hover:border-cyan-500',
  },
  human: {
    label: 'HUMAN',
    badgeDark: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
    badgeLight: 'bg-amber-50 text-amber-800 border-amber-300',
    borderDark: 'border-amber-500/30 hover:border-amber-400/60',
    borderLight: 'border-amber-300 hover:border-amber-500',
  },
  step: {
    label: 'STEP',
    badgeDark: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
    badgeLight: 'bg-purple-50 text-purple-800 border-purple-300',
    borderDark: 'border-purple-500/30 hover:border-purple-400/60',
    borderLight: 'border-purple-300 hover:border-purple-500',
  },
  service: {
    label: 'SERVICE',
    badgeDark: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
    badgeLight: 'bg-blue-50 text-blue-800 border-blue-300',
    borderDark: 'border-blue-500/30 hover:border-blue-400/60',
    borderLight: 'border-blue-300 hover:border-blue-500',
  },
  data: {
    label: 'DATA',
    badgeDark: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    badgeLight: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    borderDark: 'border-emerald-500/30 hover:border-emerald-400/60',
    borderLight: 'border-emerald-300 hover:border-emerald-500',
  },
  ai: {
    label: 'AI',
    badgeDark: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/25',
    badgeLight: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-300',
    borderDark: 'border-fuchsia-500/30 hover:border-fuchsia-400/60',
    borderLight: 'border-fuchsia-300 hover:border-fuchsia-500',
  },
  external: {
    label: 'EXTERNAL',
    badgeDark: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    badgeLight: 'bg-cyan-50 text-cyan-800 border-cyan-300',
    borderDark: 'border-cyan-500/30 hover:border-cyan-400/60',
    borderLight: 'border-cyan-300 hover:border-cyan-500',
  },
}

export function FlowDiagram({ diagram, mode = 'system' }: FlowDiagramProps) {
  const { language } = useLanguage()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [connections, setConnections] = useState<
    Array<{
      fromId: string
      toId: string
      label?: string
      style?: 'solid' | 'dashed'
      path: string
      labelX: number
      labelY: number
    }>
  >([])
  const arrowMarkerId = useId()

  // Compute layers (Topological order - Top to Bottom)
  const layers = useMemo(() => {
    const nodeMap = new Map(diagram.nodes.map((n) => [n.id, n]))
    const layerMap = new Map<string, number>()

    // Use lane hints if provided
    diagram.nodes.forEach((n) => {
      if (typeof n.lane === 'number') {
        layerMap.set(n.id, n.lane)
      }
    })

    // Compute topological layer based on in-edges
    let changed = true
    let iterations = 0
    while (changed && iterations < 15) {
      changed = false
      iterations++
      for (const edge of diagram.edges) {
        if (!nodeMap.has(edge.from) || !nodeMap.has(edge.to)) continue
        const fromNode = nodeMap.get(edge.from)!
        const toNode = nodeMap.get(edge.to)!

        const fromLayer = layerMap.get(fromNode.id) ?? 0
        const toLayer = layerMap.get(toNode.id) ?? 0

        // If toNode doesn't have an explicit lane and needs to be placed on a lower tier
        if (typeof toNode.lane !== 'number' && toLayer <= fromLayer) {
          layerMap.set(toNode.id, fromLayer + 1)
          changed = true
        }
      }
    }

    // Default unassigned to layer 0
    diagram.nodes.forEach((n) => {
      if (!layerMap.has(n.id)) layerMap.set(n.id, 0)
    })

    // Group nodes by layer
    const maxLayer = Math.max(0, ...Array.from(layerMap.values()))
    const layerBuckets: FlowNode[][] = Array.from({ length: maxLayer + 1 }, () => [])

    diagram.nodes.forEach((n) => {
      const l = layerMap.get(n.id) ?? 0
      layerBuckets[l]?.push(n)
    })

    return layerBuckets.filter((bucket) => bucket.length > 0)
  }, [diagram])

  // Check if any node is classified
  const hasClassified = useMemo(() => {
    if (mode !== 'architecture') return false
    return diagram.nodes.some((n) => {
      const isClassifiable = ['service', 'data', 'ai', 'external'].includes(n.type)
      const hasNoTools = !n.tools || n.tools.length === 0
      return isClassifiable && hasNoTools && !n.hideTools
    })
  }, [diagram, mode])

  // Measure and calculate clean, non-overlapping connector paths with port distribution
  const updateConnectors = useCallback(() => {
    if (!containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()

    // 1. Group outgoing and incoming edges to distribute connection ports across card width
    const outgoingMap = new Map<string, Array<{ toId: string; toCenterX: number }>>()
    const incomingMap = new Map<string, Array<{ fromId: string; fromCenterX: number }>>()

    for (const edge of diagram.edges) {
      const fromEl = nodeRefs.current.get(edge.from)
      const toEl = nodeRefs.current.get(edge.to)
      if (!fromEl || !toEl) continue

      const fromRect = fromEl.getBoundingClientRect()
      const toRect = toEl.getBoundingClientRect()
      const fromCenterX = fromRect.left + fromRect.width / 2 - containerRect.left
      const toCenterX = toRect.left + toRect.width / 2 - containerRect.left

      if (!outgoingMap.has(edge.from)) outgoingMap.set(edge.from, [])
      outgoingMap.get(edge.from)!.push({ toId: edge.to, toCenterX })

      if (!incomingMap.has(edge.to)) incomingMap.set(edge.to, [])
      incomingMap.get(edge.to)!.push({ fromId: edge.from, fromCenterX })
    }

    // Sort outgoing by target X, incoming by source X
    for (const [_, list] of outgoingMap) {
      list.sort((a, b) => a.toCenterX - b.toCenterX)
    }
    for (const [_, list] of incomingMap) {
      list.sort((a, b) => a.fromCenterX - b.fromCenterX)
    }

    const getPortOffset = (idx: number, count: number, spread = 48) => {
      if (count <= 1 || idx < 0) return 0
      const step = spread / (count - 1)
      return -spread / 2 + idx * step
    }

    const newPaths: typeof connections = []

    for (const edge of diagram.edges) {
      const fromEl = nodeRefs.current.get(edge.from)
      const toEl = nodeRefs.current.get(edge.to)
      if (!fromEl || !toEl) continue

      const fromRect = fromEl.getBoundingClientRect()
      const toRect = toEl.getBoundingClientRect()

      const baseFromCenterX = fromRect.left + fromRect.width / 2 - containerRect.left
      const baseToCenterX = toRect.left + toRect.width / 2 - containerRect.left

      const outList = outgoingMap.get(edge.from) || []
      const outIdx = outList.findIndex((item) => item.toId === edge.to)
      const outOffset = getPortOffset(outIdx, outList.length, 52)

      const inList = incomingMap.get(edge.to) || []
      const inIdx = inList.findIndex((item) => item.fromId === edge.from)
      const inOffset = getPortOffset(inIdx, inList.length, 48)

      const fromCenterX = baseFromCenterX + outOffset
      const toCenterX = baseToCenterX + inOffset

      const isDownward = toRect.top >= fromRect.bottom - 12
      const isUpward = fromRect.top >= toRect.bottom - 12

      let startX: number
      let startY: number
      let endX: number
      let endY: number
      let path = ''
      let labelX = 0
      let labelY = 0

      if (isDownward) {
        // Normal top-to-bottom vertical flow
        startX = fromCenterX
        startY = fromRect.bottom - containerRect.top
        endX = toCenterX
        endY = toRect.top - containerRect.top - 7

        const dx = endX - startX
        const dy = endY - startY

        if (Math.abs(dx) < 6) {
          // Perfectly straight vertical drop
          path = `M ${startX} ${startY} L ${endX} ${endY}`
          labelX = startX
          labelY = startY + dy * 0.5
        } else {
          // Elegant, smooth S-curve (cubic Bezier) that never collides with sharp corners
          const cy1 = startY + dy * 0.45
          const cy2 = endY - dy * 0.45
          path = `M ${startX} ${startY} C ${startX} ${cy1}, ${endX} ${cy2}, ${endX} ${endY}`
          labelX = (startX + endX) * 0.5
          labelY = (startY + endY) * 0.5
        }
      } else if (isUpward) {
        // Bottom-to-top flow
        startX = fromCenterX
        startY = fromRect.top - containerRect.top
        endX = toCenterX
        endY = toRect.bottom - containerRect.top + 7

        const dx = endX - startX
        const dy = endY - startY

        if (Math.abs(dx) < 6) {
          path = `M ${startX} ${startY} L ${endX} ${endY}`
          labelX = startX
          labelY = startY + dy * 0.5
        } else {
          const cy1 = startY + dy * 0.45
          const cy2 = endY - dy * 0.45
          path = `M ${startX} ${startY} C ${startX} ${cy1}, ${endX} ${cy2}, ${endX} ${endY}`
          labelX = (startX + endX) * 0.5
          labelY = (startY + endY) * 0.5
        }
      } else {
        // Same tier horizontal connection
        const fromCenterY = fromRect.top + fromRect.height / 2 - containerRect.top
        const toCenterY = toRect.top + toRect.height / 2 - containerRect.top

        if (toRect.left >= fromRect.right) {
          startX = fromRect.right - containerRect.left
          startY = fromCenterY
          endX = toRect.left - containerRect.left - 7
          endY = toCenterY
        } else {
          startX = fromRect.left - containerRect.left
          startY = fromCenterY
          endX = toRect.right - containerRect.left + 7
          endY = toCenterY
        }

        path = `M ${startX} ${startY} L ${endX} ${endY}`
        labelX = (startX + endX) / 2
        labelY = (startY + endY) / 2
      }

      const labelText = resolveLocalized(edge.label, language)

      newPaths.push({
        fromId: edge.from,
        toId: edge.to,
        label: labelText,
        style: edge.style,
        path,
        labelX,
        labelY,
      })
    }

    setConnections(newPaths)
  }, [diagram.edges, language])

  useEffect(() => {
    updateConnectors()
    const rafId = requestAnimationFrame(updateConnectors)
    const timeoutId = setTimeout(updateConnectors, 120)

    const observer = new ResizeObserver(() => {
      updateConnectors()
    })
    if (containerRef.current) observer.observe(containerRef.current)
    window.addEventListener('resize', updateConnectors)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
      observer.disconnect()
      window.removeEventListener('resize', updateConnectors)
    }
  }, [updateConnectors, layers])

  return (
    <div className="relative my-6 sm:my-8 rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-[var(--app-panel-strong)] p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md transition-colors duration-300">
      {/* Screen reader text-only fallback */}
      <div className="sr-only">
        <h4>Diagram Flow Summary</h4>
        <ol>
          {diagram.nodes.map((n) => {
            const outgoing = diagram.edges
              .filter((e) => e.from === n.id)
              .map((e) => e.to)
              .join(', ')
            return (
              <li key={n.id}>
                <strong>{resolveLocalized(n.label, language)}</strong> ({n.type})
                {n.description ? `: ${resolveLocalized(n.description, language)}` : ''}
                {outgoing ? ` -> Connects to: ${outgoing}` : ''}
              </li>
            )
          })}
        </ol>
      </div>

      {/* Visual Diagram Canvas */}
      <div ref={containerRef} className="relative w-full">
        {/* SVG Connector Lines (z-0 under cards) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
        >
          <defs>
            <marker
              id={`arrow-${arrowMarkerId}`}
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path
                d="M 1 2 L 8 5 L 1 8 z"
                fill={isLight ? 'rgba(99, 102, 241, 0.85)' : 'rgba(167, 139, 250, 0.85)'}
              />
            </marker>
          </defs>

          {connections.map((c, i) => (
            <path
              key={`path-${c.fromId}-${c.toId}-${i}`}
              d={c.path}
              fill="none"
              stroke={isLight ? 'rgba(99, 102, 241, 0.45)' : 'rgba(167, 139, 250, 0.55)'}
              strokeWidth="1.75"
              strokeDasharray={c.style === 'dashed' ? '5,5' : undefined}
              markerEnd={`url(#arrow-${arrowMarkerId})`}
              className="transition-all duration-300"
            />
          ))}
        </svg>

        {/* SVG Connector Labels (z-20 floating above lines and cards) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
        >
          {connections.map((c, i) => {
            if (!c.label) return null
            const labelWidth = Math.max(52, c.label.length * 6.6 + 22)
            const labelHeight = 22
            return (
              <g key={`label-${c.fromId}-${c.toId}-${i}`} className="transition-opacity duration-200">
                <rect
                  x={c.labelX - labelWidth / 2}
                  y={c.labelY - labelHeight / 2}
                  width={labelWidth}
                  height={labelHeight}
                  rx={6}
                  fill={isLight ? '#ffffff' : '#0e0c1f'}
                  stroke={isLight ? 'rgba(99, 102, 241, 0.35)' : 'rgba(167, 139, 250, 0.35)'}
                  strokeWidth="1"
                  className="shadow-sm"
                />
                <text
                  x={c.labelX}
                  y={c.labelY + 3.5}
                  textAnchor="middle"
                  className={`font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider select-none ${
                    isLight ? 'fill-indigo-950 font-bold' : 'fill-purple-200 font-semibold'
                  }`}
                >
                  {c.label}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Node Layers (Vertical top-down tier stack) */}
        <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 py-4">
          {layers.map((layerNodes, layerIndex) => (
            <div
              key={`layer-${layerIndex}`}
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 w-full"
            >
              {layerNodes.map((node) => {
                const conf = TYPE_CONFIG[node.type] ?? TYPE_CONFIG.service
                const labelText = resolveLocalized(node.label, language)
                const descText = resolveLocalized(node.description, language)

                // Tooling rules
                const isClassifiable = ['service', 'data', 'ai', 'external'].includes(node.type)
                const isArchitecture = mode === 'architecture'
                const hasTools = Boolean(node.tools && node.tools.length > 0)
                const showClassified =
                  isArchitecture && isClassifiable && !hasTools && !node.hideTools
                const showTools = isArchitecture && hasTools && !node.hideTools

                const badgeClass = isLight ? conf.badgeLight : conf.badgeDark
                const borderClass = isLight ? conf.borderLight : conf.borderDark

                return (
                  <div
                    key={node.id}
                    ref={(el) => {
                      if (el) nodeRefs.current.set(node.id, el)
                      else nodeRefs.current.delete(node.id)
                    }}
                    role="region"
                    tabIndex={0}
                    aria-label={`${conf.label}: ${labelText}`}
                    className={`group relative flex w-full max-w-[270px] flex-col justify-between rounded-xl border p-4 shadow-xl transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-accent-lavender/40 ${
                      isLight
                        ? 'bg-white/95 border-zinc-200/80 shadow-zinc-900/[0.04]'
                        : 'bg-[#100e1f]/95 border-white/[0.08] shadow-black/40'
                    } ${borderClass}`}
                  >
                    {/* Header: Type Badge & Classified status */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase ${badgeClass}`}
                      >
                        {conf.label}
                      </span>
                      {showClassified && (
                        <span
                          title={
                            language === 'id'
                              ? 'Perkakas dirahasiakan (Konfidensial)'
                              : 'Tooling undisclosed (confidential)'
                          }
                          className={`inline-flex cursor-help items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[8.5px] font-semibold tracking-wide select-none ${
                            isLight
                              ? 'border-red-300 bg-red-50 text-red-700'
                              : 'border-red-500/25 bg-red-950/30 text-red-300/80'
                          }`}
                        >
                          <span className="opacity-50 text-[8px]">▒▒</span> Classified
                        </span>
                      )}
                    </div>

                    {/* Node Title */}
                    <p
                      className={`mt-2.5 text-sm sm:text-[14.5px] font-bold tracking-tight leading-snug ${
                        isLight ? 'text-zinc-900' : 'text-white'
                      }`}
                    >
                      {labelText}
                    </p>

                    {/* Description */}
                    {descText && (
                      <p
                        className={`mt-1.5 text-[11px] sm:text-[11.5px] leading-relaxed ${
                          isLight ? 'text-zinc-600' : 'text-zinc-400'
                        }`}
                      >
                        {descText}
                      </p>
                    )}

                    {/* Tools disclosed badges */}
                    {showTools && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {node.tools!.map((tool) => (
                          <span
                            key={tool}
                            className={`inline-flex items-center rounded-md border px-1.5 py-0.5 font-mono text-[9px] ${
                              isLight
                                ? 'border-zinc-200 bg-zinc-100 text-zinc-700'
                                : 'border-white/[0.08] bg-white/[0.04] text-zinc-300'
                            }`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Undisclosed tooling footnote */}
      {hasClassified && (
        <p className="mt-6 border-t border-[rgba(var(--rgb-line),0.08)] pt-3 text-right font-mono text-[10px] text-text-muted">
          {language === 'id'
            ? 'Beberapa komponen dirahasiakan (Classified).'
            : 'Some components are undisclosed.'}
        </p>
      )}
    </div>
  )
}

export default FlowDiagram

