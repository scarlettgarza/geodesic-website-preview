import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { commandCenterPanels, findings } from '../data/findings'
import FindingCard from '../components/FindingCard'
import SimulationPanel from '../components/SimulationPanel'

const connectedCards = [
  {
    id: 'customers',
    title: 'CUSTOMER ACCOUNTS',
    x: 0, y: 0,
    w: 190, h: 110,
    content: (
      <div className="flex items-end gap-1.5 mt-2 h-10">
        <div style={{ width: 14, height: '70%', backgroundColor: '#5f6f4a', borderRadius: 2 }} />
        <div style={{ width: 14, height: '45%', backgroundColor: '#8a9b6f', borderRadius: 2 }} />
        <div style={{ width: 14, height: '90%', backgroundColor: '#5f6f4a', borderRadius: 2 }} />
        <div style={{ width: 14, height: '55%', backgroundColor: '#c2cbb6', borderRadius: 2 }} />
        <div style={{ width: 14, height: '30%', backgroundColor: '#8a9b6f', borderRadius: 2 }} />
      </div>
    ),
  },
  {
    id: 'contracts',
    title: 'CONTRACTS',
    x: 220, y: 0,
    w: 200, h: 110,
    content: (
      <div className="mt-2 space-y-1">
        {['Active — 42', 'Renewing — 8', 'At Risk — 3'].map((row) => (
          <div key={row} className="flex justify-between text-[10px]" style={{ color: '#5e5e5e', fontFamily: 'var(--font-mono)' }}>
            <span>{row.split(' — ')[0]}</span>
            <span style={{ fontWeight: 600 }}>{row.split(' — ')[1]}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'pipeline',
    title: 'PIPELINE',
    x: 0, y: 140,
    w: 190, h: 105,
    content: (
      <div className="mt-2 space-y-1.5">
        {[
          { label: 'Q1', pct: 82, color: '#5f6f4a' },
          { label: 'Q2', pct: 64, color: '#8a9b6f' },
          { label: 'Q3', pct: 38, color: '#c2cbb6' },
        ].map((bar) => (
          <div key={bar.label} className="flex items-center gap-2">
            <span className="text-[9px] w-5" style={{ color: '#5e5e5e', fontFamily: 'var(--font-mono)' }}>{bar.label}</span>
            <div style={{ flex: 1, height: 6, backgroundColor: '#e8e4dc', borderRadius: 2 }}>
              <div style={{ width: `${bar.pct}%`, height: '100%', backgroundColor: bar.color, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'orgchart',
    title: 'ORG CHART',
    x: 220, y: 140,
    w: 200, h: 105,
    content: (
      <div className="mt-2 flex flex-col items-center">
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#5f6f4a' }} />
        <div style={{ width: 1, height: 8, backgroundColor: '#c6a664' }} />
        <div className="flex gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#8a9b6f' }} />
              <div style={{ width: 1, height: 6, backgroundColor: '#c6a664' }} />
              <div className="flex gap-1">
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#c2cbb6' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#c2cbb6' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'product',
    title: 'PRODUCT HEALTH',
    x: 440, y: 70,
    w: 190, h: 105,
    content: (
      <div className="mt-2 flex items-end gap-0.5 h-8">
        {[3, 5, 4, 7, 6, 8, 7, 9, 8, 10, 9].map((v, i) => (
          <div key={i} style={{ width: 6, height: `${v * 10}%`, backgroundColor: i > 7 ? '#5f6f4a' : '#8a9b6f', borderRadius: 1 }} />
        ))}
      </div>
    ),
  },
  {
    id: 'ebitda',
    title: 'EBITDA',
    x: 0, y: 275,
    w: 190, h: 110,
    content: (
      <div className="flex items-end gap-1.5 mt-2 h-10">
        {[60, 45, 70, 50, 80, 65].map((h, i) => (
          <div key={i} style={{ width: 12, height: `${h}%`, backgroundColor: i >= 4 ? '#5f6f4a' : '#8a9b6f', borderRadius: 2 }} />
        ))}
      </div>
    ),
  },
  {
    id: 'people',
    title: 'PEOPLE / FLIGHT RISK',
    x: 220, y: 275,
    w: 200, h: 110,
    content: (
      <div className="mt-2 space-y-1.5">
        {[
          { name: 'VP Eng', risk: 'high' },
          { name: 'Lead PM', risk: 'med' },
          { name: 'Sr. Acct', risk: 'low' },
          { name: 'CTO', risk: 'med' },
        ].map((p) => (
          <div key={p.name} className="flex items-center gap-2 text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: '#5e5e5e' }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              backgroundColor: p.risk === 'high' ? '#a34e28' : p.risk === 'med' ? '#c6a664' : '#8a9b6f',
            }} />
            <span>{p.name}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'financial',
    title: 'FINANCIAL',
    x: 440, y: 210,
    w: 190, h: 110,
    content: (
      <div className="mt-2 space-y-1">
        {['Rev  $12.4M', 'Burn  $1.8M', 'Runway  14mo'].map((row) => (
          <div key={row} className="text-[10px]" style={{ color: '#5e5e5e', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            {row}
          </div>
        ))}
      </div>
    ),
  },
]

// Gold line connections between card centers
const goldLines = [
  ['customers', 'contracts'],
  ['customers', 'pipeline'],
  ['contracts', 'orgchart'],
  ['pipeline', 'orgchart'],
  ['pipeline', 'ebitda'],
  ['orgchart', 'people'],
  ['orgchart', 'product'],
  ['product', 'financial'],
  ['people', 'financial'],
  ['ebitda', 'people'],
  ['contracts', 'product'],
  ['customers', 'ebitda'],
]

function getCardCenter(id) {
  const card = connectedCards.find((c) => c.id === id)
  if (!card) return { cx: 0, cy: 0 }
  return { cx: card.x + card.w / 2, cy: card.y + card.h / 2 }
}

function ConnectedVisual() {
  return (
    <div className="relative w-full" style={{ minHeight: 400 }}>
      {/* SVG gold connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 640 400"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        style={{ zIndex: 0 }}
      >
        {goldLines.map(([fromId, toId]) => {
          const from = getCardCenter(fromId)
          const to = getCardCenter(toId)
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.cx} y1={from.cy}
              x2={to.cx} y2={to.cy}
              stroke="#c6a664"
              strokeWidth="1.5"
              opacity="0.35"
            />
          )
        })}
      </svg>

      {/* Cards */}
      <div className="relative" style={{ width: '100%', height: 400, zIndex: 1 }}>
        <div className="relative w-full h-full" style={{ maxWidth: 640 }}>
          {connectedCards.map((card) => (
            <div
              key={card.id}
              className="absolute"
              style={{
                left: card.x,
                top: card.y,
                width: card.w,
                height: card.h,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgb(245,240,232)',
                  borderRadius: 3,
                  padding: '10px 12px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.6px',
                    color: '#322c29',
                    textTransform: 'uppercase',
                  }}
                >
                  {card.title}
                </div>
                {card.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InvestigationVisual() {
  return (
    <div className="space-y-4">
      <div
        className="text-xs uppercase tracking-wider pb-2 border-b"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: 'var(--gray-mid)',
          borderColor: 'var(--gray-light)',
          letterSpacing: '0.5px',
        }}
      >
        Investigation Findings
      </div>
      <div className="space-y-4">
        {findings.map((finding, i) => (
          <FindingCard key={finding.id} finding={finding} index={i} />
        ))}
      </div>
      <SimulationPanel />
    </div>
  )
}

function EvidenceVisual() {
  return (
    <div className="space-y-4">
      <div
        className="text-xs uppercase tracking-wider pb-2 border-b"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: 'var(--gray-mid)',
          borderColor: 'var(--gray-light)',
          letterSpacing: '0.5px',
        }}
      >
        Investigation Findings
      </div>
      <div className="space-y-4">
        {findings.map((finding, i) => (
          <FindingCard key={finding.id} finding={finding} index={i} />
        ))}
      </div>
    </div>
  )
}

const panelVisuals = [ConnectedVisual, InvestigationVisual, EvidenceVisual]

export default function CommandCenter() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress to active panel (0, 1, 2)
  const activePanel = useTransform(scrollYProgress, [0, 0.33, 0.34, 0.66, 0.67, 1], [0, 0, 1, 1, 2, 2])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: 'var(--soft-white)',
        height: '300vh', // 3 panels worth of scroll
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        <div className="px-6 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto w-full">
          {/* Headline — always visible */}
          <motion.div className="mb-8 md:mb-12">
            <h2
              className="text-3xl md:text-5xl lg:text-6xl leading-[1.1]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
              }}
            >
              <PanelHeadline scrollYProgress={scrollYProgress} />
            </h2>
          </motion.div>

          {/* Panel content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left: subhead + body text */}
            <PanelText scrollYProgress={scrollYProgress} />

            {/* Right: visual */}
            <PanelVisual scrollYProgress={scrollYProgress} />
          </div>

          {/* Panel indicators */}
          <div className="flex gap-3 mt-10 md:mt-14">
            <PanelIndicators scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  )
}

function PanelHeadline({ scrollYProgress }) {
  const panel0Opacity = useTransform(scrollYProgress, [0, 0.28, 0.33, 0.38], [1, 1, 0, 0])
  const panel1Opacity = useTransform(scrollYProgress, [0.28, 0.33, 0.61, 0.66], [0, 1, 1, 0])
  const panel2Opacity = useTransform(scrollYProgress, [0.61, 0.66, 1, 1], [0, 1, 1, 1])

  return (
    <div className="relative">
      <motion.span style={{ opacity: panel0Opacity }} className="block">
        <span style={{ color: 'var(--olive)' }}>Building the picture.</span>{' '}
        <span style={{ color: 'var(--gray-mid)' }}>Doing the work.</span>{' '}
        <span style={{ color: 'var(--gray-mid)' }}>Owning the outcome.</span>
      </motion.span>
      <motion.span style={{ opacity: panel1Opacity }} className="absolute inset-0">
        <span style={{ color: 'var(--gray-mid)' }}>Building the picture.</span>{' '}
        <span style={{ color: 'var(--olive)' }}>Doing the work.</span>{' '}
        <span style={{ color: 'var(--gray-mid)' }}>Owning the outcome.</span>
      </motion.span>
      <motion.span style={{ opacity: panel2Opacity }} className="absolute inset-0">
        <span style={{ color: 'var(--gray-mid)' }}>Building the picture.</span>{' '}
        <span style={{ color: 'var(--gray-mid)' }}>Doing the work.</span>{' '}
        <span style={{ color: 'var(--olive)' }}>Owning the outcome.</span>
      </motion.span>
    </div>
  )
}

function PanelText({ scrollYProgress }) {
  const panel0Opacity = useTransform(scrollYProgress, [0, 0.28, 0.33, 0.38], [1, 1, 0, 0])
  const panel1Opacity = useTransform(scrollYProgress, [0.28, 0.33, 0.61, 0.66], [0, 1, 1, 0])
  const panel2Opacity = useTransform(scrollYProgress, [0.61, 0.66, 1, 1], [0, 1, 1, 1])

  const panels = commandCenterPanels
  const opacities = [panel0Opacity, panel1Opacity, panel2Opacity]

  return (
    <div className="relative min-h-[200px]">
      {panels.map((panel, i) => (
        <motion.div
          key={panel.id}
          style={{ opacity: opacities[i] }}
          className={i === 0 ? 'relative' : 'absolute inset-0'}
        >
          <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, color: 'var(--dark-brown)', fontSize: '1.25rem', marginBottom: '1rem' }}>
            {panel.subhead}
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--gray-mid)', lineHeight: 1.6 }}>
            {panel.body}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

function PanelVisual({ scrollYProgress }) {
  const panel0Opacity = useTransform(scrollYProgress, [0, 0.28, 0.33, 0.38], [1, 1, 0, 0])
  const panel1Opacity = useTransform(scrollYProgress, [0.28, 0.33, 0.61, 0.66], [0, 1, 1, 0])
  const panel2Opacity = useTransform(scrollYProgress, [0.61, 0.66, 1, 1], [0, 1, 1, 1])

  const opacities = [panel0Opacity, panel1Opacity, panel2Opacity]

  return (
    <div className="relative min-h-[400px]">
      {panelVisuals.map((Visual, i) => (
        <motion.div
          key={i}
          style={{ opacity: opacities[i] }}
          className={i === 0 ? 'relative' : 'absolute inset-0'}
        >
          <Visual />
        </motion.div>
      ))}
    </div>
  )
}

function PanelIndicators({ scrollYProgress }) {
  const progress = useTransform(scrollYProgress, [0, 1], [0, 2])
  const labels = ['Building the picture.', 'Doing the work.', 'Owning the outcome.']
  return labels.map((label, i) => (
    <PanelDot key={i} index={i} progress={progress} label={label} />
  ))
}

function PanelDot({ index, progress, label }) {
  const isActive = useTransform(progress, (v) => Math.round(v) === index)
  const opacity = useTransform(isActive, (active) => (active ? 1 : 0.3))
  const scale = useTransform(isActive, (active) => (active ? 1 : 0.85))

  return (
    <motion.div
      className="flex items-center gap-2"
      style={{ opacity, scale }}
    >
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: 'var(--olive)' }}
      />
      <span
        className="text-xs hidden md:inline"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: 'var(--olive)',
          letterSpacing: '0.3px',
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}
