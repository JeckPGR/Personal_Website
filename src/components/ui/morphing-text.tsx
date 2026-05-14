import { useCallback, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

type MorphingTextTiming = {
  morphDuration: number
  pauseDuration: number
  loop: boolean
}

const useMorphingText = (
  texts: string[],
  { morphDuration, pauseDuration, loop }: MorphingTextTiming
) => {
  const textIndexRef = useRef(0)
  const elapsedRef = useRef(0)
  const phaseRef = useRef<"pause" | "morph" | "done">("pause")
  const timeRef = useRef(performance.now())

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const showText = useCallback(
    (index: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current]
      if (!current1 || !current2 || texts.length === 0) return

      current1.textContent = texts[index % texts.length]
      current1.style.filter = "none"
      current1.style.opacity = "100%"

      current2.textContent = ""
      current2.style.filter = "none"
      current2.style.opacity = "0%"
    },
    [texts]
  )

  const setStyles = useCallback(
    (fraction: number, index: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current]
      if (!current1 || !current2 || texts.length === 0) return

      const nextIndex = loop ? (index + 1) % texts.length : index + 1
      if (nextIndex >= texts.length) {
        showText(index)
        return
      }

      const nextFraction = Math.max(fraction, 0.001)
      const invertedFraction = Math.max(1 - fraction, 0.001)

      current1.textContent = texts[index % texts.length]
      current2.textContent = texts[nextIndex]

      current2.style.filter = `blur(${Math.min(
        8 / nextFraction - 8,
        100
      )}px)`
      current2.style.opacity = `${Math.pow(nextFraction, 0.4) * 100}%`
      current1.style.filter = `blur(${Math.min(
        8 / invertedFraction - 8,
        100
      )}px)`
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`
    },
    [loop, showText, texts]
  )

  useEffect(() => {
    textIndexRef.current = 0
    elapsedRef.current = 0
    phaseRef.current = "pause"
    timeRef.current = performance.now()
    showText(0)
  }, [showText])

  useEffect(() => {
    if (texts.length === 0) return

    let animationFrameId: number

    const animate = (now: number) => {
      const deltaSeconds = (now - timeRef.current) / 1000
      timeRef.current = now

      if (phaseRef.current === "done") {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      elapsedRef.current += deltaSeconds

      if (phaseRef.current === "pause") {
        showText(textIndexRef.current)

        if (elapsedRef.current >= pauseDuration) {
          const isLastText = textIndexRef.current >= texts.length - 1

          if (isLastText && !loop) {
            phaseRef.current = "done"
            showText(textIndexRef.current)
          } else {
            phaseRef.current = "morph"
            elapsedRef.current = 0
          }
        }
      } else {
        const fraction = Math.min(elapsedRef.current / morphDuration, 1)
        setStyles(fraction, textIndexRef.current)

        if (fraction >= 1) {
          textIndexRef.current = loop
            ? (textIndexRef.current + 1) % texts.length
            : textIndexRef.current + 1
          phaseRef.current = "pause"
          elapsedRef.current = 0
          showText(textIndexRef.current)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [loop, morphDuration, pauseDuration, setStyles, showText, texts.length])

  return { text1Ref, text2Ref }
}

interface MorphingTextProps {
  className?: string
  texts: string[]
  morphDuration?: number
  pauseDuration?: number
  loop?: boolean
}

const Texts: React.FC<
  Pick<MorphingTextProps, "loop" | "morphDuration" | "pauseDuration" | "texts">
> = ({ texts, morphDuration = 1.5, pauseDuration = 0.5, loop = true }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts, {
    morphDuration,
    pauseDuration,
    loop,
  })
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text2Ref}
      />
    </>
  )
}

const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    className="fixed h-0 w-0"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
)

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
  morphDuration,
  pauseDuration,
  loop,
}) => (
  <div
    className={cn(
      "relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold filter-[url(#threshold)_blur(0.6px)] md:h-24 lg:text-[6rem]",
      className
    )}
  >
    <Texts
      texts={texts}
      morphDuration={morphDuration}
      pauseDuration={pauseDuration}
      loop={loop}
    />
    <SvgFilters />
  </div>
)
