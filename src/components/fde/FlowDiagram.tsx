import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { FlowDiagram as FlowDiagramType, FlowNode, FlowNodeType } from '../../content/schema'
import { resolveLocalized } from '../../content/schema'
import { useLanguage, type Language } from '../../hooks/useLanguage'
import { useTheme } from '../../hooks/useTheme'
import {
  TbZoomIn,
  TbZoomOut,
  TbMaximize,
  TbMinimize,
  TbFocusCentered,
  TbX,
} from 'react-icons/tb'

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
    badgeLight: 'bg-cyan-50 text-cyan-900 border-cyan-400 font-bold',
    borderDark: 'border-cyan-500/30 hover:border-cyan-400/60',
    borderLight: 'border-cyan-300 hover:border-cyan-500',
  },
  human: {
    label: 'HUMAN',
    badgeDark: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
    badgeLight: 'bg-amber-50 text-amber-900 border-amber-400 font-bold',
    borderDark: 'border-amber-500/30 hover:border-amber-400/60',
    borderLight: 'border-amber-300 hover:border-amber-500',
  },
  step: {
    label: 'STEP',
    badgeDark: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
    badgeLight: 'bg-purple-50 text-purple-900 border-purple-400 font-bold',
    borderDark: 'border-purple-500/30 hover:border-purple-400/60',
    borderLight: 'border-purple-300 hover:border-purple-500',
  },
  service: {
    label: 'SERVICE',
    badgeDark: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
    badgeLight: 'bg-blue-50 text-blue-900 border-blue-400 font-bold',
    borderDark: 'border-blue-500/30 hover:border-blue-400/60',
    borderLight: 'border-blue-300 hover:border-blue-500',
  },
  data: {
    label: 'DATA',
    badgeDark: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    badgeLight: 'bg-emerald-50 text-emerald-900 border-emerald-400 font-bold',
    borderDark: 'border-emerald-500/30 hover:border-emerald-400/60',
    borderLight: 'border-emerald-300 hover:border-emerald-500',
  },
  ai: {
    label: 'AI',
    badgeDark: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/25',
    badgeLight: 'bg-fuchsia-50 text-fuchsia-900 border-fuchsia-400 font-bold',
    borderDark: 'border-fuchsia-500/30 hover:border-fuchsia-400/60',
    borderLight: 'border-fuchsia-300 hover:border-fuchsia-500',
  },
  external: {
    label: 'EXTERNAL',
    badgeDark: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    badgeLight: 'bg-sky-50 text-sky-900 border-sky-400 font-bold',
    borderDark: 'border-cyan-500/30 hover:border-cyan-400/60',
    borderLight: 'border-cyan-300 hover:border-cyan-500',
  },
}

/** Walks up offsetParent to get precise untransformed coordinates relative to ancestor */
function getOffsetRelativeTo(child: HTMLElement, ancestor: HTMLElement) {
  let x = 0
  let y = 0
  let current: HTMLElement | null = child
  while (current && current !== ancestor) {
    x += current.offsetLeft
    y += current.offsetTop
    current = current.offsetParent as HTMLElement | null
  }
  return {
    left: x,
    top: y,
    width: child.offsetWidth,
    height: child.offsetHeight,
  }
}

/** Interactive Canvas Viewport (shared between inline panel & full-screen portal) */
function CanvasViewport({
  diagram,
  mode = 'system',
  isFullscreen = false,
  onToggleFullscreen,
  isLight,
  language,
}: {
  diagram: FlowDiagramType
  mode?: 'system' | 'architecture'
  isFullscreen?: boolean
  onToggleFullscreen: () => void
  isLight: boolean
  language: Language
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const zoomRef = useRef(zoom)
  zoomRef.current = zoom
  const panRef = useRef(pan)
  panRef.current = pan
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })

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

    diagram.nodes.forEach((n) => {
      if (typeof n.lane === 'number') {
        layerMap.set(n.id, n.lane)
      }
    })

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

        if (typeof toNode.lane !== 'number' && toLayer <= fromLayer) {
          layerMap.set(toNode.id, fromLayer + 1)
          changed = true
        }
      }
    }

    diagram.nodes.forEach((n) => {
      if (!layerMap.has(n.id)) layerMap.set(n.id, 0)
    })

    const maxLayer = Math.max(0, ...Array.from(layerMap.values()))
    const layerBuckets: FlowNode[][] = Array.from({ length: maxLayer + 1 }, () => [])

    diagram.nodes.forEach((n) => {
      const l = layerMap.get(n.id) ?? 0
      layerBuckets[l]?.push(n)
    })

    return layerBuckets.filter((bucket) => bucket.length > 0)
  }, [diagram])

  // Measure connectors in unscaled local contentRef space (100% immune to zoom/pan)
  const updateConnectors = useCallback(() => {
    if (!contentRef.current) return
    const contentEl = contentRef.current

    const outgoingMap = new Map<string, Array<{ toId: string; toCenterX: number }>>()
    const incomingMap = new Map<string, Array<{ fromId: string; fromCenterX: number }>>()

    for (const edge of diagram.edges) {
      const fromEl = nodeRefs.current.get(edge.from)
      const toEl = nodeRefs.current.get(edge.to)
      if (!fromEl || !toEl) continue

      const fromPos = getOffsetRelativeTo(fromEl, contentEl)
      const toPos = getOffsetRelativeTo(toEl, contentEl)
      const fromCenterX = fromPos.left + fromPos.width / 2
      const toCenterX = toPos.left + toPos.width / 2

      if (!outgoingMap.has(edge.from)) outgoingMap.set(edge.from, [])
      outgoingMap.get(edge.from)!.push({ toId: edge.to, toCenterX })

      if (!incomingMap.has(edge.to)) incomingMap.set(edge.to, [])
      incomingMap.get(edge.to)!.push({ fromId: edge.from, fromCenterX })
    }

    for (const [_, list] of outgoingMap) {
      list.sort((a, b) => a.toCenterX - b.toCenterX)
    }
    for (const [_, list] of incomingMap) {
      list.sort((a, b) => a.fromCenterX - b.fromCenterX)
    }

    const getPortOffset = (idx: number, count: number, spread = 36) => {
      if (count <= 1 || idx < 0) return 0
      const step = spread / (count - 1)
      return -spread / 2 + idx * step
    }

    const newPaths: typeof connections = []

    for (const edge of diagram.edges) {
      const fromEl = nodeRefs.current.get(edge.from)
      const toEl = nodeRefs.current.get(edge.to)
      if (!fromEl || !toEl) continue

      const fromPos = getOffsetRelativeTo(fromEl, contentEl)
      const toPos = getOffsetRelativeTo(toEl, contentEl)

      const baseFromCenterX = fromPos.left + fromPos.width / 2
      const baseToCenterX = toPos.left + toPos.width / 2

      const outList = outgoingMap.get(edge.from) || []
      const outIdx = outList.findIndex((item) => item.toId === edge.to)
      const outOffset = getPortOffset(outIdx, outList.length, 40)

      const inList = incomingMap.get(edge.to) || []
      const inIdx = inList.findIndex((item) => item.fromId === edge.from)
      const inOffset = getPortOffset(inIdx, inList.length, 36)

      const fromCenterX = baseFromCenterX + outOffset
      const toCenterX = baseToCenterX + inOffset

      const isDownward = toPos.top >= fromPos.top + fromPos.height - 8
      const isUpward = fromPos.top >= toPos.top + toPos.height - 8

      let startX: number
      let startY: number
      let endX: number
      let endY: number
      let path = ''
      let labelX = 0
      let labelY = 0

      if (isDownward) {
        startX = fromCenterX
        startY = fromPos.top + fromPos.height
        endX = toCenterX
        endY = toPos.top - 7

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
      } else if (isUpward) {
        startX = fromCenterX
        startY = fromPos.top
        endX = toCenterX
        endY = toPos.top + toPos.height + 7

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
        const fromCenterY = fromPos.top + fromPos.height / 2
        const toCenterY = toPos.top + toPos.height / 2

        if (toPos.left >= fromPos.left + fromPos.width) {
          startX = fromPos.left + fromPos.width
          startY = fromCenterY
          endX = toPos.left - 7
          endY = toCenterY
        } else {
          startX = fromPos.left
          startY = fromCenterY
          endX = toPos.left + toPos.width + 7
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

  // Fit view calculation to center and scale content cleanly inside viewport
  const fitToView = useCallback(() => {
    if (!viewportRef.current || !contentRef.current) return
    const vpRect = viewportRef.current.getBoundingClientRect()
    const contentEl = contentRef.current

    const contentW = contentEl.offsetWidth || contentEl.scrollWidth || 600
    const contentH = contentEl.offsetHeight || contentEl.scrollHeight || 500

    if (contentW <= 0 || contentH <= 0 || vpRect.width <= 0) return

    const padX = vpRect.width < 500 ? 16 : 36
    const padY = vpRect.width < 500 ? 20 : 36

    const availW = Math.max(120, vpRect.width - padX * 2)
    const availH = Math.max(120, vpRect.height - padY * 2)

    const scaleW = availW / contentW
    const scaleH = availH / contentH

    let targetZoom: number
    if (vpRect.width < 640) {
      targetZoom = Math.min(0.95, Math.max(0.46, Math.min(scaleW, 0.90)))
    } else {
      targetZoom = Math.min(1.0, Math.max(0.46, Math.min(scaleW, scaleH)))
    }

    targetZoom = Math.round(targetZoom * 100) / 100

    const scaledW = contentW * targetZoom
    const scaledH = contentH * targetZoom

    const targetPanX = Math.round((vpRect.width - scaledW) / 2)
    let targetPanY = 24
    if (scaledH <= availH) {
      targetPanY = Math.round((vpRect.height - scaledH) / 2)
    }

    setZoom(targetZoom)
    zoomRef.current = targetZoom
    setPan({ x: targetPanX, y: targetPanY })
    panRef.current = { x: targetPanX, y: targetPanY }
  }, [])

  const handleZoomStep = (delta: number) => {
    const currentZ = zoomRef.current
    const newZ = Math.min(1.85, Math.max(0.35, Math.round((currentZ + delta) * 100) / 100))
    if (!viewportRef.current) return
    const vp = viewportRef.current.getBoundingClientRect()
    const cx = vp.width / 2
    const cy = vp.height / 2
    const currentP = panRef.current
    const newPanX = Math.round(cx - (cx - currentP.x) * (newZ / currentZ))
    const newPanY = Math.round(cy - (cy - currentP.y) * (newZ / currentZ))
    setZoom(newZ)
    zoomRef.current = newZ
    setPan({ x: newPanX, y: newPanY })
    panRef.current = { x: newPanX, y: newPanY }
  }

  // Pointer drag panning (Mouse)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      if (e.button !== 0) return
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, select')) return

      isDraggingRef.current = true
      setIsDragging(true)
      dragStartRef.current = {
        x: e.clientX - panRef.current.x,
        y: e.clientY - panRef.current.y,
      }
      e.currentTarget.setPointerCapture(e.pointerId)
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && isDraggingRef.current) {
      const newPan = {
        x: Math.round(e.clientX - dragStartRef.current.x),
        y: Math.round(e.clientY - dragStartRef.current.y),
      }
      setPan(newPan)
      panRef.current = newPan
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      isDraggingRef.current = false
      setIsDragging(false)
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
    }
  }

  // Mouse wheel zoom centered on cursor
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const factor = e.deltaY < 0 ? 1.08 : 0.92
      const currentZ = zoomRef.current
      const newZoom = Math.min(1.85, Math.max(0.35, Math.round(currentZ * factor * 100) / 100))
      const rect = vp.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const currentP = panRef.current
      const newPanX = Math.round(mouseX - (mouseX - currentP.x) * (newZoom / currentZ))
      const newPanY = Math.round(mouseY - (mouseY - currentP.y) * (newZoom / currentZ))
      setZoom(newZoom)
      zoomRef.current = newZoom
      setPan({ x: newPanX, y: newPanY })
      panRef.current = { x: newPanX, y: newPanY }
    }

    vp.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      vp.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // Touch gestures (Pinch-to-zoom & 1-finger / 2-finger pan)
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return

    let touchMode: 'none' | 'pan' | 'pinch' = 'none'
    let startDist = 0
    let startZoom = 1
    let startMid = { x: 0, y: 0 }
    let startPan = { x: 0, y: 0 }
    let singleTouchStart = { x: 0, y: 0 }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        touchMode = 'pinch'
        const t1 = e.touches[0]
        const t2 = e.touches[1]
        startDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
        startZoom = zoomRef.current
        startMid = {
          x: (t1.clientX + t2.clientX) / 2,
          y: (t1.clientY + t2.clientY) / 2,
        }
        startPan = { ...panRef.current }
      } else if (e.touches.length === 1) {
        const target = e.target as HTMLElement
        if (target.closest('button, a, input, select')) return

        touchMode = 'pan'
        singleTouchStart = {
          x: e.touches[0].clientX - panRef.current.x,
          y: e.touches[0].clientY - panRef.current.y,
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && touchMode === 'pinch') {
        e.preventDefault()
        const t1 = e.touches[0]
        const t2 = e.touches[1]
        const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
        const currentMid = {
          x: (t1.clientX + t2.clientX) / 2,
          y: (t1.clientY + t2.clientY) / 2,
        }

        if (startDist > 0) {
          const scaleFactor = currentDist / startDist
          const newZoom = Math.min(1.85, Math.max(0.35, Math.round(startZoom * scaleFactor * 100) / 100))
          const rect = vp.getBoundingClientRect()
          const localMidX = startMid.x - rect.left
          const localMidY = startMid.y - rect.top
          const deltaMidX = currentMid.x - startMid.x
          const deltaMidY = currentMid.y - startMid.y

          const newPanX = Math.round(localMidX - (localMidX - startPan.x) * (newZoom / startZoom) + deltaMidX)
          const newPanY = Math.round(localMidY - (localMidY - startPan.y) * (newZoom / startZoom) + deltaMidY)

          setZoom(newZoom)
          zoomRef.current = newZoom
          setPan({ x: newPanX, y: newPanY })
          panRef.current = { x: newPanX, y: newPanY }
        }
      } else if (e.touches.length === 1 && touchMode === 'pan') {
        e.preventDefault()
        const newPanX = Math.round(e.touches[0].clientX - singleTouchStart.x)
        const newPanY = Math.round(e.touches[0].clientY - singleTouchStart.y)
        setPan({ x: newPanX, y: newPanY })
        panRef.current = { x: newPanX, y: newPanY }
      }
    }

    const handleTouchEnd = () => {
      touchMode = 'none'
    }

    vp.addEventListener('touchstart', handleTouchStart, { passive: true })
    vp.addEventListener('touchmove', handleTouchMove, { passive: false })
    vp.addEventListener('touchend', handleTouchEnd, { passive: true })
    vp.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      vp.removeEventListener('touchstart', handleTouchStart)
      vp.removeEventListener('touchmove', handleTouchMove)
      vp.removeEventListener('touchend', handleTouchEnd)
      vp.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [])

  // Measure connectors on mount and layout updates
  useEffect(() => {
    updateConnectors()
    const rafId = requestAnimationFrame(updateConnectors)
    const t1 = setTimeout(updateConnectors, 80)
    const t2 = setTimeout(updateConnectors, 250)

    const observer = new ResizeObserver(() => {
      updateConnectors()
    })
    if (contentRef.current) observer.observe(contentRef.current)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t1)
      clearTimeout(t2)
      observer.disconnect()
    }
  }, [updateConnectors, layers])

  // Fit to view on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      fitToView()
      updateConnectors()
    }, 90)
    return () => clearTimeout(timer)
  }, [fitToView, updateConnectors])

  return (
    <div
      ref={viewportRef}
      tabIndex={0}
      aria-label={
        mode === 'architecture'
          ? 'Interactive Architecture Canvas'
          : 'Interactive System Flow Canvas'
      }
      className={`relative w-full h-full overflow-hidden select-none outline-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Subtle Dot Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 1.2px, transparent 1.2px)'
            : 'radial-gradient(circle, rgba(167, 139, 250, 0.20) 1.2px, transparent 1.2px)',
          backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      />

      {/* Floating Canvas Controls Toolbar */}
      <div
        className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 flex items-center gap-1 sm:gap-1.5 rounded-full border px-2.5 py-1.5 shadow-xl backdrop-blur-xl ${
          isLight
            ? 'border-zinc-300 bg-white/95 text-zinc-900 shadow-zinc-900/10'
            : 'border-[rgba(var(--rgb-line),0.18)] bg-[var(--app-panel)]/92 text-text-primary'
        }`}
      >
        {/* Zoom Out */}
        <button
          type="button"
          onClick={() => handleZoomStep(-0.15)}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
            isLight
              ? 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950'
              : 'hover:bg-[rgba(var(--rgb-hover),0.2)] text-text-secondary hover:text-text-primary'
          }`}
          title={language === 'id' ? 'Perkecil' : 'Zoom Out'}
          aria-label="Zoom Out"
        >
          <TbZoomOut size={15} />
        </button>

        {/* Zoom display */}
        <button
          type="button"
          onClick={() => fitToView()}
          className={`px-1.5 py-0.5 font-mono text-[11px] font-bold rounded transition-colors ${
            isLight
              ? 'text-indigo-800 hover:bg-zinc-100'
              : 'text-accent-lavender hover:bg-[rgba(var(--rgb-hover),0.2)]'
          }`}
          title={language === 'id' ? 'Reset / Pas ke Layar' : 'Fit to Screen'}
        >
          {Math.round(zoom * 100)}%
        </button>

        {/* Zoom In */}
        <button
          type="button"
          onClick={() => handleZoomStep(0.15)}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
            isLight
              ? 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950'
              : 'hover:bg-[rgba(var(--rgb-hover),0.2)] text-text-secondary hover:text-text-primary'
          }`}
          title={language === 'id' ? 'Perbesar' : 'Zoom In'}
          aria-label="Zoom In"
        >
          <TbZoomIn size={15} />
        </button>

        <div
          className={`h-3.5 w-px ${
            isLight ? 'bg-zinc-300' : 'bg-[rgba(var(--rgb-line),0.18)]'
          }`}
        />

        {/* Fit to View */}
        <button
          type="button"
          onClick={() => fitToView()}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
            isLight
              ? 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950'
              : 'hover:bg-[rgba(var(--rgb-hover),0.2)] text-text-secondary hover:text-text-primary'
          }`}
          title={language === 'id' ? 'Paskan ke Layar' : 'Fit to View'}
          aria-label="Fit to View"
        >
          <TbFocusCentered size={15} />
        </button>

        {/* Fullscreen / Expand Toggle */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
            isLight
              ? 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950'
              : 'hover:bg-[rgba(var(--rgb-hover),0.2)] text-text-secondary hover:text-text-primary'
          }`}
          title={
            isFullscreen
              ? language === 'id'
                ? 'Keluar Layar Penuh'
                : 'Exit Fullscreen'
              : language === 'id'
              ? 'Perbesar Penuh Semua Layar'
              : 'Expand Fullscreen'
          }
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <TbMinimize size={15} /> : <TbMaximize size={15} />}
        </button>
      </div>

      {/* Transform Surface */}
      <div
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          transformOrigin: '0 0',
          width: 'max-content',
        }}
        className="relative"
      >
        <div ref={contentRef} className="relative min-w-fit px-8 sm:px-12 py-8">
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
                  fill={isLight ? '#4f46e5' : 'rgba(167, 139, 250, 0.85)'}
                />
              </marker>
            </defs>

            {connections.map((c, i) => (
              <path
                key={`path-${c.fromId}-${c.toId}-${i}`}
                d={c.path}
                fill="none"
                stroke={isLight ? '#6366f1' : 'rgba(167, 139, 250, 0.55)'}
                strokeWidth={isLight ? '2' : '1.75'}
                strokeDasharray={c.style === 'dashed' ? '5,5' : undefined}
                markerEnd={`url(#arrow-${arrowMarkerId})`}
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* SVG Connector Labels (z-20 floating cleanly above lines) */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
          >
            {connections.map((c, i) => {
              if (!c.label) return null
              const labelWidth = Math.max(48, c.label.length * 6.2 + 18)
              const labelHeight = 20
              return (
                <g key={`label-${c.fromId}-${c.toId}-${i}`} className="transition-opacity duration-200">
                  <rect
                    x={c.labelX - labelWidth / 2}
                    y={c.labelY - labelHeight / 2}
                    width={labelWidth}
                    height={labelHeight}
                    rx={5}
                    fill={isLight ? '#ffffff' : '#0e0c1f'}
                    stroke={isLight ? '#818cf8' : 'rgba(167, 139, 250, 0.35)'}
                    strokeWidth={isLight ? '1.2' : '1'}
                    className={isLight ? 'shadow-sm' : ''}
                  />
                  <text
                    x={c.labelX}
                    y={c.labelY + 3.5}
                    textAnchor="middle"
                    className={`font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-wider select-none ${
                      isLight ? 'fill-indigo-950 font-bold' : 'fill-purple-200 font-semibold'
                    }`}
                  >
                    {c.label}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Node Layers (Vertical top-down tier stack with generous vertical gap) */}
          <div className="relative z-10 flex flex-col items-center gap-14 sm:gap-20 py-4">
            {layers.map((layerNodes, layerIndex) => {
              const isSingle = layerNodes.length === 1
              return (
                <div
                  key={`layer-${layerIndex}`}
                  className="flex flex-nowrap items-center justify-center gap-3 sm:gap-6 md:gap-8 w-full"
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
                        className={`group relative flex flex-col justify-between rounded-xl border p-3 sm:p-4 shadow-lg transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent-lavender/40 ${
                          isSingle
                            ? 'w-full max-w-[250px] sm:max-w-[275px]'
                            : 'w-[155px] sm:w-[220px] md:w-[250px] shrink-0'
                        } ${
                          isLight
                            ? 'bg-white border-zinc-300 shadow-zinc-900/[0.06] text-zinc-900'
                            : 'bg-[#100e1f]/95 border-white/[0.08] shadow-black/40 text-white'
                        } ${borderClass}`}
                      >
                        {/* Header: Type Badge & Classified status */}
                        <div className="flex items-center justify-between gap-1.5">
                          <span
                            className={`inline-flex items-center rounded-md border px-1.5 py-0.5 font-mono text-[8px] sm:text-[9px] font-bold tracking-widest uppercase ${badgeClass}`}
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
                              className={`inline-flex cursor-help items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[7.5px] sm:text-[8px] font-bold tracking-wide select-none ${
                                isLight
                                  ? 'border-red-400 bg-red-50 text-red-800'
                                  : 'border-red-500/25 bg-red-950/30 text-red-300/80'
                              }`}
                            >
                              <span className="opacity-50 text-[7px]">▒▒</span> Classified
                            </span>
                          )}
                        </div>

                        {/* Node Title */}
                        <p
                          className={`mt-1.5 sm:mt-2 text-[12px] sm:text-[13.5px] md:text-[14px] font-extrabold tracking-tight leading-snug ${
                            isLight ? 'text-zinc-950' : 'text-white'
                          }`}
                        >
                          {labelText}
                        </p>

                        {/* Description */}
                        {descText && (
                          <p
                            className={`mt-1 text-[9.5px] sm:text-[10.5px] md:text-[11px] leading-relaxed line-clamp-3 sm:line-clamp-none ${
                              isLight ? 'text-zinc-700 font-medium' : 'text-zinc-400'
                            }`}
                          >
                            {descText}
                          </p>
                        )}

                        {/* Tools disclosed badges */}
                        {showTools && (
                          <div className="mt-2.5 flex flex-wrap gap-1">
                            {node.tools!.map((tool) => (
                              <span
                                key={tool}
                                className={`inline-flex items-center rounded-md border px-1.5 py-0.5 font-mono text-[7.5px] sm:text-[8.5px] ${
                                  isLight
                                    ? 'border-zinc-300 bg-zinc-100 text-zinc-800 font-semibold'
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
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FlowDiagram({ diagram, mode = 'system' }: FlowDiagramProps) {
  const { language } = useLanguage()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Check if any node is classified
  const hasClassified = useMemo(() => {
    if (mode !== 'architecture') return false
    return diagram.nodes.some((n) => {
      const isClassifiable = ['service', 'data', 'ai', 'external'].includes(n.type)
      const hasNoTools = !n.tools || n.tools.length === 0
      return isClassifiable && hasNoTools && !n.hideTools
    })
  }, [diagram, mode])

  // Fullscreen escape key & body lock
  useEffect(() => {
    if (!isFullscreen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isFullscreen])

  return (
    <>
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

      {/* Inline Canvas Container */}
      <div
        className={`relative my-6 sm:my-8 rounded-2xl border shadow-xl backdrop-blur-md transition-colors duration-300 overflow-hidden ${
          isLight
            ? 'border-zinc-300 bg-slate-50/80 shadow-zinc-900/[0.06]'
            : 'border-[rgba(var(--rgb-line),0.14)] bg-[var(--app-panel-strong)]'
        }`}
      >
        <div className="relative w-full h-[450px] sm:h-[520px] md:h-[580px]">
          <CanvasViewport
            diagram={diagram}
            mode={mode}
            isFullscreen={false}
            onToggleFullscreen={() => setIsFullscreen(true)}
            isLight={isLight}
            language={language}
          />
        </div>

        {/* Footnote */}
        {hasClassified && (
          <p
            className={`border-t px-4 py-2.5 text-right font-mono text-[10px] ${
              isLight
                ? 'border-zinc-200 text-zinc-600'
                : 'border-[rgba(var(--rgb-line),0.08)] text-text-muted'
            }`}
          >
            {language === 'id'
              ? 'Beberapa komponen dirahasiakan (Classified).'
              : 'Some components are undisclosed.'}
          </p>
        )}
      </div>

      {/* Fullscreen Modal rendered directly into document.body to take over the ENTIRE SCREEN without dock overlap */}
      {isFullscreen &&
        createPortal(
          <div
            className={`fixed inset-0 z-[99999] flex flex-col select-none overflow-hidden ${
              isLight ? 'bg-[#f8fafc] text-zinc-900' : 'bg-[#070611] text-white'
            }`}
          >
            {/* Fullscreen Header Bar with prominent Close Button */}
            <div
              className={`flex shrink-0 items-center justify-between border-b px-4 sm:px-6 py-3.5 backdrop-blur-xl z-50 ${
                isLight
                  ? 'border-zinc-200 bg-white/95 text-zinc-900 shadow-sm'
                  : 'border-white/10 bg-[#090818]/95 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-heading text-sm sm:text-base font-bold text-accent-lavender">
                  {mode === 'architecture'
                    ? language === 'id'
                      ? 'Arsitektur Teknis'
                      : 'Technical Architecture'
                    : language === 'id'
                    ? 'Alur Sistem'
                    : 'System Flow'}
                </span>
              </div>

              {/* Prominent Close Button */}
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className={`flex items-center gap-2 rounded-xl border px-3.5 py-1.5 font-mono text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95 ${
                  isLight
                    ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900 hover:border-zinc-400'
                    : 'border-white/20 bg-white/10 hover:bg-white/20 text-white hover:border-white/30'
                }`}
                aria-label="Tutup Layar Penuh"
              >
                <TbX size={16} />
                <span>{language === 'id' ? 'Tutup (Esc)' : 'Close (Esc)'}</span>
              </button>
            </div>

            {/* Fullscreen Canvas Viewport */}
            <div className="flex-1 w-full h-full relative overflow-hidden">
              <CanvasViewport
                diagram={diagram}
                mode={mode}
                isFullscreen={true}
                onToggleFullscreen={() => setIsFullscreen(false)}
                isLight={isLight}
                language={language}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export default FlowDiagram
