import { memo } from 'react'
import type { IconType } from 'react-icons'
import {
  SiDocker,
  SiFastapi,
  SiFigma,
  SiGit,
  SiGo,
  SiJira,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSass,
  SiShadcnui,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
} from 'react-icons/si'

type OrbitItem = {
  name: string
  color: string
  Icon: IconType
}

// 16 curated tech stack & tools, interleaved for visual variety & balance
const orbitItems: OrbitItem[] = [
  { name: 'React', color: '#61DAFB', Icon: SiReact },
  { name: 'Figma', color: '#F24E1E', Icon: SiFigma },
  { name: 'TypeScript', color: '#3178C6', Icon: SiTypescript },
  { name: 'Docker', color: '#2496ED', Icon: SiDocker },
  { name: 'Next.js', color: '#FFFFFF', Icon: SiNextdotjs },
  { name: 'Jira', color: '#0052CC', Icon: SiJira },
  { name: 'NestJS', color: '#E0234E', Icon: SiNestjs },
  { name: 'PostgreSQL', color: '#4169E1', Icon: SiPostgresql },
  { name: 'Python', color: '#3776AB', Icon: SiPython },
  { name: 'Trello', color: '#0079BF', Icon: SiTrello },
  { name: 'Golang', color: '#00ADD8', Icon: SiGo },
  { name: 'shadcn/ui', color: '#FFFFFF', Icon: SiShadcnui },
  { name: 'FastAPI', color: '#009688', Icon: SiFastapi },
  { name: 'SCSS', color: '#CF649A', Icon: SiSass },
  { name: 'Tailwind CSS', color: '#38BDF8', Icon: SiTailwindcss },
  { name: 'Node.js', color: '#68A063', Icon: SiNodedotjs },
  { name: 'Git', color: '#F05032', Icon: SiGit },
]

// Expansive horizontal reach (320px) to span wide open wings of the card
const RX = 320
// Proportional vertical reach (74px) to clear hair comfortably and stay safely inside top container border
const RY = 74
const DURATION_SECONDS = 46
// Complete closed elliptical path in clockwise direction
const PATH_D = `M -${RX} 0 a ${RX} ${RY} 0 0 1 ${RX * 2} 0 a ${RX} ${RY} 0 0 1 -${RX * 2} 0`

export const RotatingTechOrbit = memo(function RotatingTechOrbit() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[34%] z-1 -translate-x-1/2 -translate-y-1/2 scale-[0.52] xs:scale-[0.62] sm:scale-[0.74] md:scale-[0.84] lg:scale-[0.82] xl:scale-[0.96] 2xl:scale-100 select-none"
      style={{ width: 0, height: 0 }}
    >
      <style>{`
        @keyframes orbit-travel {
          0% {
            offset-distance: 0%;
            -webkit-offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
            -webkit-offset-distance: 100%;
          }
        }
        .anim-orbit-badge {
          position: absolute;
          left: 0;
          top: 0;
          offset-path: path('${PATH_D}');
          -webkit-offset-path: path('${PATH_D}');
          offset-rotate: 0deg;
          -webkit-offset-rotate: 0deg;
          offset-anchor: 50% 50%;
          animation: orbit-travel ${DURATION_SECONDS}s linear infinite;
          will-change: offset-distance;
        }
        .group:hover .anim-orbit-badge {
          animation-play-state: paused;
        }
      `}</style>

      {/* ─── Soft Ambient Cosmic Glow backdrop (NO wireframe border lines) ─── */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(var(--rgb-glow),0.18)_0%,transparent_70%)] blur-2xl"
        style={{ width: RX * 2.2, height: RY * 2.8 }}
      />

      {/* ─── Unified Expansive Orbit (Tech Stack + Tools Interleaved) ─── */}
      {orbitItems.map((item, index) => {
        const { Icon } = item
        const delay = -Number((index * (DURATION_SECONDS / orbitItems.length)).toFixed(3))

        return (
          <div
            key={item.name}
            className="anim-orbit-badge pointer-events-auto"
            style={{
              animationDelay: `${delay}s`,
            }}
          >
            <div
              className="group/badge relative flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(var(--rgb-line),0.25)] bg-[rgba(12,8,22,0.92)] shadow-[0_4px_18px_rgba(0,0,0,0.65),0_0_12px_rgba(var(--rgb-glow),0.14)] backdrop-blur-md transition-all duration-200 hover:scale-125 hover:border-accent-lavender hover:bg-[rgba(20,12,38,0.95)] hover:shadow-[0_0_20px_rgba(var(--rgb-glow),0.4)]"
              title={item.name}
            >
              <Icon size={14} style={{ color: item.color }} />
              {/* Tooltip placed safely below badge so it never clips top border */}
              <span className="pointer-events-none absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[rgba(var(--rgb-line),0.22)] bg-[var(--app-panel)] px-1.5 py-0.5 text-[8.5px] font-medium tracking-wide text-text-primary opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover/badge:opacity-100 z-30">
                {item.name}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
})

export default RotatingTechOrbit
