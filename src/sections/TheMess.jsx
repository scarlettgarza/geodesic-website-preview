import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FindingCard from '../components/FindingCard'
import SimulationPanel from '../components/SimulationPanel'
import { findings, commandCenterPanels } from '../data/findings'

// ── Shared styles ──────────────────────────────────────────────────────────────

const mono = "'Space Mono', monospace"
const paperShadow = '1.5px 1.5px 4.5px rgba(0,0,0,0.08), 4.5px 6px 18px rgba(0,0,0,0.25)'
const paperInnerShadow = 'inset 3px 0 4.5px rgba(209,199,184,0.2), inset 0 -3px 9px rgba(199,189,173,0.35), inset 0 3px 6px rgba(255,250,242,0.4)'
const tableShadow = '0 1.5px 3px rgba(0,0,0,0.05), 3px 4.5px 15px rgba(0,0,0,0.2)'
const grainOverlay = 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)'
const darkGrainOverlay = 'repeating-linear-gradient(120deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 5px)'

// ── Card Components ────────────────────────────────────────────────────────────

function BoardDeckCard() {
  return (
    <div
      style={{
        width: 428,
        height: 225,
        borderRadius: 2,
        background: `${grainOverlay}, linear-gradient(90deg, rgb(245,240,232) 0%, rgb(245,240,232) 100%)`,
        boxShadow: `${paperShadow}, ${paperInnerShadow}`,
        padding: '21px 24px',
        fontFamily: mono,
        color: '#1f1f1f',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7.5 }}>
        <span style={{ fontSize: 18, fontWeight: 700 }}>BOARD DECK - Q3</span>
        <span style={{ fontSize: 11.3, fontWeight: 600, color: '#6b6b6b' }}>PG 14</span>
      </div>
      <div style={{ height: 1, background: '#c8c0b4', marginBottom: 13.5 }} />
      <div style={{ fontSize: 15.8, lineHeight: 1.7 }}>
        <div>Customer retention: <strong>94%</strong></div>
        <div>Pipeline coverage: <strong>3.2x</strong></div>
        <div style={{ fontStyle: 'italic', color: '#4a4a4a', marginTop: 3 }}>&quot;Executing well against plan&quot;</div>
      </div>
    </div>
  )
}

function VendorContractsCard() {
  const rows = [
    { vendor: 'Acme IT Services', end: '2025-03-15', keyPerson: 'Yes — CFO' },
    { vendor: 'DataCorp Analytics', end: '2025-06-01', keyPerson: 'Yes — CFO' },
    { vendor: 'CloudFirst Infra', end: '???', keyPerson: 'Yes — CFO' },
  ]
  const cellStyle = { padding: '6px 9px', borderBottom: '1px solid #d4cec4', fontSize: 14.6 }
  const headerStyle = { ...cellStyle, fontWeight: 700, fontSize: 11.3, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6b6b6b', borderBottom: '2px solid #b8b0a4' }

  return (
    <div
      style={{
        width: 472,
        height: 203,
        borderRadius: 2,
        background: `${grainOverlay}, rgb(250,247,242)`,
        boxShadow: tableShadow,
        fontFamily: mono,
        color: '#1f1f1f',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', flex: 1 }}>
        <thead>
          <tr>
            <th style={{ ...headerStyle, textAlign: 'left' }}>Vendor</th>
            <th style={{ ...headerStyle, textAlign: 'left' }}>Contract End</th>
            <th style={{ ...headerStyle, textAlign: 'left' }}>Key Person?</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={cellStyle}>{r.vendor}</td>
              <td style={{ ...cellStyle, color: r.end === '???' ? '#b2261a' : undefined, fontWeight: r.end === '???' ? 700 : 400 }}>{r.end}</td>
              <td style={{ ...cellStyle, color: '#b2261a' }}>{r.keyPerson}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function WarningMemoCard() {
  return (
    <div
      style={{
        width: 449,
        height: 180,
        borderRadius: 2,
        background: `${darkGrainOverlay}, rgb(222,209,189)`,
        boxShadow: paperShadow,
        fontFamily: mono,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: 35,
          background: 'rgb(158,56,46)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
        }}
      >
        <span style={{ fontSize: 11.3, fontWeight: 600, color: '#f5efe7', textTransform: 'uppercase', letterSpacing: '1px' }}>
          FROM: FORMER CFO &rarr; BOARD (7 MONTHS AGO)
        </span>
      </div>
      <div style={{ padding: '15px 18px', color: '#591f14', fontSize: 15.8, fontStyle: 'italic', lineHeight: 1.6 }}>
        &quot;I want to flag key-person exposure across vendor relationships. If I leave, several contracts have no documented backup contact.&quot;
      </div>
    </div>
  )
}

function CRMExportCard() {
  return (
    <div
      style={{
        width: 404,
        height: 225,
        borderRadius: 2,
        background: `${darkGrainOverlay}, rgb(143,158,158)`,
        boxShadow: paperShadow,
        fontFamily: mono,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: 38,
          background: '#616b70',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 18px',
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 700, color: '#f5efe7' }}>CRM EXPORT</span>
        <span style={{ fontSize: 11.3, fontWeight: 700, color: '#b2261a' }}>RAW</span>
      </div>
      <div style={{ padding: '15px 18px', color: '#1f1f1f', fontSize: 15.8, lineHeight: 1.7 }}>
        <div>Actual retention: <span style={{ color: '#b2261a', fontWeight: 700 }}>81%</span></div>
        <div>Pipeline: 47% &quot;verbal commit&quot; &mdash;</div>
        <div><span style={{ textDecoration: 'line-through', color: '#b2261a' }}>no signed LOI</span></div>
      </div>
    </div>
  )
}

function StickyNoteCard() {
  return (
    <div
      style={{
        width: 337,
        height: 180,
        borderRadius: 4,
        background: `${grainOverlay}, rgb(232,217,140)`,
        boxShadow: '2px 3px 12px rgba(0,0,0,0.18)',
        padding: '21px 21px',
        fontFamily: mono,
        color: '#26211a',
        fontSize: 15.8,
        fontStyle: 'italic',
        lineHeight: 1.6,
      }}
    >
      Ask Karen about the vendor contracts &mdash; she was the only one who knew the renewal dates?
    </div>
  )
}

function OrgChartCard() {
  return (
    <div
      style={{
        width: 382,
        height: 203,
        borderRadius: 2,
        background: 'rgb(242,242,245)',
        boxShadow: tableShadow,
        padding: '21px 21px',
        fontFamily: mono,
        color: '#1f1f1f',
        fontSize: 15.8,
        lineHeight: 1.7,
      }}
    >
      <div>CEO (interim)</div>
      <div>├─ <span style={{ textDecoration: 'line-through', color: '#b23326' }}>CFO — terminated</span></div>
      <div>├─ VP Eng (1 report left?)</div>
      <div>├─ VP Sales — &quot;on leave&quot;</div>
      <div>└─ Head of Product (reporting to?)</div>
    </div>
  )
}

function ToolCardSalesforce() {
  return (
    <div
      style={{
        width: 359,
        height: 180,
        borderRadius: 2,
        background: 'linear-gradient(180deg, #fff 0%, #fafafa 100%)',
        boxShadow: tableShadow,
        padding: '18px 21px',
        fontFamily: mono,
        color: '#1f1f1f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        src="/images/cards/salesforce-logo.svg"
        alt="Salesforce"
        style={{ position: 'absolute', top: 11, right: 18, width: 45, height: 31 }}
      />
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>SALESFORCE</div>
      <div style={{ fontSize: 15.8, lineHeight: 1.7 }}>
        <div>Account: Top 10 = <span style={{ color: '#1a8c66', fontWeight: 700 }}>72%</span> ARR</div>
        <div>Pipeline: $4M reported</div>
        <div style={{ color: '#99261a' }}>12 opps last updated 90+ days ago</div>
      </div>
    </div>
  )
}

function ToolCardZendesk() {
  return (
    <div
      style={{
        width: 359,
        height: 169,
        borderRadius: 2,
        background: 'linear-gradient(180deg, #fff 0%, #fafafa 100%)',
        boxShadow: tableShadow,
        padding: '18px 21px',
        fontFamily: mono,
        color: '#1f1f1f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        src="/images/cards/zendesk-logo.svg"
        alt="Zendesk"
        style={{ position: 'absolute', top: 11, right: 18, width: 34, height: 26 }}
      />
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>ZENDESK</div>
      <div style={{ fontSize: 15.8, lineHeight: 1.7 }}>
        <div style={{ color: '#99261a' }}>Support Volume &uarr;40% QoQ</div>
        <div>Top category: product bugs (38%)</div>
        <div>18mo ticket history</div>
      </div>
    </div>
  )
}

function ToolCardJira() {
  return (
    <div
      style={{
        width: 359,
        height: 180,
        borderRadius: 2,
        background: 'linear-gradient(180deg, #fff 0%, #fafafa 100%)',
        boxShadow: tableShadow,
        padding: '18px 21px',
        fontFamily: mono,
        color: '#1f1f1f',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: '6px solid #2ba11c',
      }}
    >
      <img
        src="/images/cards/jira-logo.svg"
        alt="Jira"
        style={{ position: 'absolute', top: 11, right: 18, width: 31, height: 31 }}
      />
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>JIRA</div>
      <div style={{ fontSize: 15.8, lineHeight: 1.7 }}>
        <div style={{ color: '#99261a' }}>Sprint velocity &darr;60% QoQ</div>
        <div>Bug category: product bugs (38%)</div>
        <div>18mo ticket history: 14</div>
      </div>
    </div>
  )
}

function ToolCardNetSuite() {
  return (
    <div
      style={{
        width: 337,
        height: 169,
        borderRadius: 2,
        background: 'linear-gradient(180deg, #fff 0%, #fafafa 100%)',
        boxShadow: tableShadow,
        padding: '18px 21px',
        fontFamily: mono,
        color: '#1f1f1f',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: '6px solid #2ba11c',
      }}
    >
      <img
        src="/images/cards/netsuite-logo.svg"
        alt="NetSuite"
        style={{ position: 'absolute', top: 11, right: 18, width: 31, height: 31 }}
      />
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>NETSUITE</div>
      <div style={{ fontSize: 15.8, lineHeight: 1.7 }}>
        <div style={{ color: '#99261a' }}>GL close: 23 days overdue</div>
        <div style={{ color: '#99261a' }}>Intercompany: 4 unreconciled</div>
        <div>Last journal entry: 6 weeks ago</div>
      </div>
    </div>
  )
}

function ToolCardQuickBooks() {
  return (
    <div
      style={{
        width: 359,
        height: 169,
        borderRadius: 2,
        background: `${grainOverlay}, rgb(173,226,167)`,
        boxShadow: tableShadow,
        padding: '18px 21px',
        fontFamily: mono,
        color: '#1f1f1f',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: '6px solid #1f6614',
      }}
    >
      <img
        src="/images/cards/quickbooks-logo.svg"
        alt="QuickBooks"
        style={{ position: 'absolute', top: 11, right: 18, width: 34, height: 34 }}
      />
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>QUICKBOOKS</div>
      <div style={{ fontSize: 15.8, lineHeight: 1.7, fontWeight: 700 }}>
        <div>Cash position: $1.2M</div>
        <div>Payroll due: 12 days</div>
        <div>Covenant headroom: $400K</div>
      </div>
    </div>
  )
}

function SlackMessageCard() {
  return (
    <div
      style={{
        width: 337,
        height: 158,
        borderRadius: 4,
        background: `${grainOverlay}, rgb(224,209,229)`,
        boxShadow: tableShadow,
        padding: '18px 21px',
        fontFamily: mono,
        color: '#1f1f1f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        src="/images/cards/slack-logo.svg"
        alt="Slack"
        style={{ position: 'absolute', top: 11, right: 18, width: 31, height: 31 }}
      />
      <div style={{ fontSize: 15.8, fontWeight: 700, marginBottom: 10.5 }}>#leadership &mdash; 3mo ago</div>
      <div style={{ fontSize: 15.8, fontStyle: 'italic', lineHeight: 1.6, color: '#2e2e2e' }}>
        &quot;Has anyone talked to the VP Eng about the offer from [competitor]?&quot;
      </div>
    </div>
  )
}

// ── Card type map ──────────────────────────────────────────────────────────────

const CARD_COMPONENTS = {
  Document: BoardDeckCard,
  Table: VendorContractsCard,
  WarningMemo: WarningMemoCard,
  DataCard: CRMExportCard,
  StickyNote: StickyNoteCard,
  PlainWhite: OrgChartCard,
  'ToolCard-Salesforce': ToolCardSalesforce,
  'ToolCard-Zendesk': ToolCardZendesk,
  'ToolCard-Jira': ToolCardJira,
  'ToolCard-NetSuite': ToolCardNetSuite,
  'ToolCard-QuickBooks': ToolCardQuickBooks,
  SlackMessage: SlackMessageCard,
}

// ── Card positions — scroll-driven, pixel values based on 1440x900 reference ──

// Positions as % of viewport. endXPct/endYPct are 0-100.
// startXPct: negative = from left off-screen, >100 = from right off-screen
// startYPct: negative = from top off-screen, >100 = from bottom off-screen
const CARDS = [
  // ── Wave 1 (0.08–0.20): top + upper sides ──
  { endXPct: -4, endYPct: -3, startXPct: -55, startYPct: -55, rotation: -5, type: 'Document', entryStart: 0.08, entryEnd: 0.20, morph: true, organizedX: 950, organizedY: 320 },
  { endXPct: 78, endYPct: -4, startXPct: 150, startYPct: -55, rotation: 4, type: 'DataCard', entryStart: 0.08, entryEnd: 0.20, morph: true, organizedX: 1190, organizedY: 320 },
  { endXPct: 24, endYPct: -4, startXPct: 24, startYPct: -65, rotation: -2, type: 'ToolCard-Zendesk', entryStart: 0.09, entryEnd: 0.21, morph: false },
  { endXPct: 52, endYPct: -3, startXPct: 52, startYPct: -65, rotation: 3, type: 'WarningMemo', entryStart: 0.09, entryEnd: 0.21, morph: false },
  { endXPct: -5, endYPct: 17, startXPct: -55, startYPct: 17, rotation: 6, type: 'ToolCard-QuickBooks', entryStart: 0.10, entryEnd: 0.22, morph: true, organizedX: 950, organizedY: 470 },
  { endXPct: 80, endYPct: 16, startXPct: 150, startYPct: 16, rotation: -5, type: 'PlainWhite', entryStart: 0.10, entryEnd: 0.22, morph: true, organizedX: 1190, organizedY: 470 },

  // ── Wave 2 (0.14–0.28): mid sides + center ──
  { endXPct: -3, endYPct: 38, startXPct: -55, startYPct: 38, rotation: -3, type: 'ToolCard-NetSuite', entryStart: 0.14, entryEnd: 0.26, morph: true, organizedX: 1350, organizedY: 390 },
  { endXPct: 78, endYPct: 37, startXPct: 150, startYPct: 37, rotation: 5, type: 'ToolCard-Jira', entryStart: 0.14, entryEnd: 0.26, morph: false },
  { endXPct: -4, endYPct: 58, startXPct: -55, startYPct: 130, rotation: 4, type: 'WarningMemo', entryStart: 0.16, entryEnd: 0.28, morph: true, organizedX: 950, organizedY: 620 },
  { endXPct: 77, endYPct: 57, startXPct: 150, startYPct: 130, rotation: -3, type: 'StickyNote', entryStart: 0.16, entryEnd: 0.28, morph: true, organizedX: 1350, organizedY: 540 },
  { endXPct: 26, endYPct: 28, startXPct: -40, startYPct: -30, rotation: 5, type: 'SlackMessage', entryStart: 0.18, entryEnd: 0.30, morph: false },
  { endXPct: 54, endYPct: 31, startXPct: 150, startYPct: -20, rotation: -4, type: 'ToolCard-Salesforce', entryStart: 0.18, entryEnd: 0.30, morph: false },

  // ── Wave 3 (0.22–0.38): bottom + remaining ──
  { endXPct: -3, endYPct: 78, startXPct: -55, startYPct: 130, rotation: -2, type: 'Table', entryStart: 0.22, entryEnd: 0.34, morph: true, organizedX: 1190, organizedY: 620 },
  { endXPct: 76, endYPct: 77, startXPct: 150, startYPct: 130, rotation: 5, type: 'ToolCard-QuickBooks', entryStart: 0.22, entryEnd: 0.34, morph: false },
  { endXPct: 7, endYPct: 49, startXPct: -48, startYPct: 49, rotation: -6, type: 'ToolCard-Salesforce', entryStart: 0.24, entryEnd: 0.36, morph: false },
  { endXPct: 72, endYPct: 50, startXPct: 150, startYPct: 50, rotation: 3, type: 'DataCard', entryStart: 0.24, entryEnd: 0.36, morph: false },
  { endXPct: 28, endYPct: 69, startXPct: 28, startYPct: 130, rotation: 4, type: 'ToolCard-NetSuite', entryStart: 0.26, entryEnd: 0.38, morph: false },
  { endXPct: 50, endYPct: 71, startXPct: 50, startYPct: 130, rotation: -3, type: 'ToolCard-Zendesk', entryStart: 0.26, entryEnd: 0.38, morph: false },
  { endXPct: 31, endYPct: 11, startXPct: -40, startYPct: -44, rotation: 7, type: 'Table', entryStart: 0.28, entryEnd: 0.40, morph: false },
  { endXPct: 47, endYPct: 9, startXPct: 150, startYPct: -33, rotation: -3, type: 'ToolCard-Jira', entryStart: 0.30, entryEnd: 0.42, morph: false },
]

// ── ScrollCard component ───────────────────────────────────────────────────────

function ScrollCard({ card, scrollYProgress, vw, vh, children }) {
  const startX = card.startXPct * vw / 100
  const endX = card.endXPct * vw / 100
  const startY = card.startYPct * vh / 100
  const endY = card.endYPct * vh / 100
  const isMorph = card.morph

  const x = useTransform(
    scrollYProgress,
    isMorph
      ? [card.entryStart, card.entryEnd, 0.50, 0.70]
      : [card.entryStart, card.entryEnd],
    isMorph
      ? [startX, endX, endX, card.organizedX]
      : [startX, endX]
  )
  const y = useTransform(
    scrollYProgress,
    isMorph
      ? [card.entryStart, card.entryEnd, 0.50, 0.70]
      : [card.entryStart, card.entryEnd],
    isMorph
      ? [startY, endY, endY, card.organizedY]
      : [startY, endY]
  )
  const opacity = useTransform(
    scrollYProgress,
    isMorph
      ? [card.entryStart, card.entryStart + 0.03, card.entryEnd, 0.78, 0.80]
      : [card.entryStart, card.entryStart + 0.03, card.entryEnd, 0.50, 0.58],
    isMorph
      ? [0, 1, 1, 1, 0]
      : [0, 1, 1, 1, 0]
  )
  const rotate = useTransform(
    scrollYProgress,
    isMorph
      ? [card.entryStart, card.entryEnd, 0.50, 0.70]
      : [card.entryStart, card.entryEnd],
    isMorph
      ? [card.rotation * 3, card.rotation, card.rotation, 0]
      : [card.rotation * 3, card.rotation]
  )
  const scale = useTransform(
    scrollYProgress,
    isMorph
      ? [0.50, 0.70]
      : [0, 1],
    isMorph
      ? [1, 0.45]
      : [1, 1]
  )

  return (
    <motion.div style={{ position: 'absolute', x, y, opacity, rotate, scale, willChange: 'transform', transformOrigin: 'top left' }}>
      {children}
    </motion.div>
  )
}

function ConnectionLine({ x1, y1, x2, y2, scrollYProgress }) {
  const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  const opacity = useTransform(scrollYProgress, [0.58, 0.62, 0.78, 0.80], [0, 0.5, 0.5, 0])
  const dashOffset = useTransform(scrollYProgress, [0.62, 0.75], [len, 0])
  return (
    <motion.line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="#c6a664" strokeWidth={1.5}
      strokeDasharray={len}
      style={{ strokeDashoffset: dashOffset, opacity }}
    />
  )
}

function ConnectionDot({ cx, cy, scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [0.60, 0.64, 0.78, 0.80], [0, 1, 1, 0])
  return <motion.circle cx={cx} cy={cy} r={4} fill="#c6a664" style={{ opacity }} />
}

// ── Panel visuals ─────────────────────────────────────────────────────────────

function InvestigationVisual() {
  return (
    <div style={{ backgroundColor: '#141414', borderRadius: 8, padding: '20px 24px', color: '#f4f0e6' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 11, color: '#8a9b6f', textTransform: 'uppercase', letterSpacing: '0.5px', paddingBottom: 8, borderBottom: '1px solid #2b2b2b' }}>
        Investigation Findings
      </div>
      <div style={{ marginTop: 16 }}>
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
    <div style={{ backgroundColor: '#141414', borderRadius: 8, padding: '20px 24px', color: '#f4f0e6' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 11, color: '#8a9b6f', textTransform: 'uppercase', letterSpacing: '0.5px', paddingBottom: 8, borderBottom: '1px solid #2b2b2b' }}>
        Investigation Findings
      </div>
      <div style={{ marginTop: 16 }}>
        {findings.map((finding, i) => (
          <FindingCard key={finding.id} finding={finding} index={i} />
        ))}
      </div>
    </div>
  )
}

// ── Main section component ─────────────────────────────────────────────────────

export default function TheMess() {
  const sectionRef = useRef(null)
  const [vw, setVw] = useState(1440)
  const [vh, setVh] = useState(900)

  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth)
      setVh(window.innerHeight)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.04, 0.45, 0.55], [0, 1, 0.6, 0])

  // Panel headline + content transforms
  const headlineOpacity = useTransform(scrollYProgress, [0.50, 0.55], [0, 1])
  const hl1Opacity = useTransform(scrollYProgress, [0.50, 0.53, 0.78, 0.80], [1, 1, 1, 0])
  const hl2Opacity = useTransform(scrollYProgress, [0.78, 0.80, 0.91, 0.93], [0, 1, 1, 0])
  const hl3Opacity = useTransform(scrollYProgress, [0.91, 0.93, 1, 1], [0, 1, 1, 1])

  // Panel text crossfade
  const p1Opacity = useTransform(scrollYProgress, [0.50, 0.55, 0.78, 0.80], [0, 1, 1, 0])
  const p2Opacity = useTransform(scrollYProgress, [0.78, 0.80, 0.91, 0.93], [0, 1, 1, 0])
  const p3Opacity = useTransform(scrollYProgress, [0.91, 0.93, 1, 1], [0, 1, 1, 1])

  // Panel indicators
  const dot1Active = useTransform(scrollYProgress, [0.50, 0.55, 0.78, 0.80], [1, 1, 1, 0.3])
  const dot2Active = useTransform(scrollYProgress, [0.78, 0.80, 0.91, 0.93], [0.3, 1, 1, 0.3])
  const dot3Active = useTransform(scrollYProgress, [0.91, 0.93, 1, 1], [0.3, 1, 1, 1])

  const CONNECTIONS = [
    [0, 1], [0, 4], [1, 5], [4, 8], [5, 10], [8, 12], [12, 10], [6, 1], [6, 5], [6, 10],
  ]

  return (
    <section ref={sectionRef} style={{ height: '700vh', position: 'relative' }}>
      <motion.div style={{
        position: 'sticky', top: 0, height: '100vh', width: '100%',
        overflow: 'hidden', backgroundColor: '#faf9f7',
      }}>
        {/* Cards */}
        {CARDS.map((card, i) => {
          const CardComponent = CARD_COMPONENTS[card.type]
          return (
            <ScrollCard key={i} card={card} scrollYProgress={scrollYProgress} vw={vw} vh={vh}>
              <CardComponent />
            </ScrollCard>
          )
        })}

        {/* Connection lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 40, pointerEvents: 'none' }}>
          {CONNECTIONS.map(([fromIdx, toIdx], i) => {
            const fromCard = CARDS[fromIdx]
            const toCard = CARDS[toIdx]
            if (!fromCard?.morph || !toCard?.morph) return null
            const cx1 = fromCard.organizedX + 90
            const cy1 = fromCard.organizedY + 50
            const cx2 = toCard.organizedX + 90
            const cy2 = toCard.organizedY + 50
            return <ConnectionLine key={i} x1={cx1} y1={cy1} x2={cx2} y2={cy2} scrollYProgress={scrollYProgress} />
          })}
          {CARDS.filter(c => c.morph).map((card, i) => (
            <ConnectionDot key={i} cx={card.organizedX + 90} cy={card.organizedY + 50} scrollYProgress={scrollYProgress} />
          ))}
        </svg>

        {/* Centered text */}
        <motion.div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 50, textAlign: 'center', pointerEvents: 'none',
          opacity: textOpacity,
        }}>
          <motion.h2 style={{
            fontFamily: 'var(--font-serif)', fontWeight: 500,
            color: '#1c1c1c',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.1, margin: '0 0 16px',
          }}>
            The clock is running.
          </motion.h2>
          <motion.p style={{
            fontFamily: 'var(--font-sans)',
            color: '#1c1c1c',
            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
            margin: 0,
          }}>
            You have the numbers. You don&rsquo;t have the picture.
          </motion.p>
        </motion.div>

        {/* Panel content — appears after morph */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 60,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '70px 5% 30px',
          opacity: headlineOpacity,
        }}>
          {/* Headline — always at top */}
          <div style={{ marginBottom: 32, position: 'relative', flexShrink: 0 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(3rem, 6vw, 5.6rem)', lineHeight: 1.1, color: '#1c1c1c' }}>
              <motion.span style={{ opacity: hl1Opacity, display: 'block' }}>
                <span style={{ color: '#5f6f4a' }}>Building the picture.</span>{' '}
                <span>Doing the work. Owning the outcome.</span>
              </motion.span>
              <motion.span style={{ opacity: hl2Opacity, position: 'absolute', inset: 0 }}>
                <span>Building the picture.</span>{' '}
                <span style={{ color: '#5f6f4a' }}>Doing the work.</span>{' '}
                <span>Owning the outcome.</span>
              </motion.span>
              <motion.span style={{ opacity: hl3Opacity, position: 'absolute', inset: 0 }}>
                <span>Building the picture. Doing the work.</span>{' '}
                <span style={{ color: '#5f6f4a' }}>Owning the outcome.</span>
              </motion.span>
            </h2>
          </div>

          {/* Content grid: text left, visual right — fills remaining space */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, flex: 1, alignItems: 'start' }}>
            {/* Left column: subhead + body */}
            <div style={{ position: 'relative', paddingTop: 20 }}>
              {/* Panel 1 text */}
              <motion.div style={{ opacity: p1Opacity }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontWeight: 500,
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                  color: '#1c1c1c', marginBottom: '12px',
                }}>
                  Company data. Connected across every system.
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                  color: '#5e5e5e', lineHeight: 1.6, margin: 0,
                }}>
                  Financials, contracts, customers, operations, support, engineering. Siloed in ten systems today. Connected in one knowledge layer by us.
                </p>
              </motion.div>
              {/* Panel 2 text */}
              <motion.div style={{ opacity: p2Opacity, position: 'absolute', inset: 0 }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontWeight: 500,
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                  color: '#1c1c1c', marginBottom: '12px',
                }}>
                  Investigation. Stress-testing. Action.
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                  color: '#5e5e5e', lineHeight: 1.6, margin: 0,
                }}>
                  See what&rsquo;s actually wrong, with evidence behind every claim. See the full range of actions you can take, not just the obvious ones, ranked by cost, impact, and time.
                </p>
              </motion.div>
              {/* Panel 3 text */}
              <motion.div style={{ opacity: p3Opacity, position: 'absolute', inset: 0 }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontWeight: 500,
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                  color: '#1c1c1c', marginBottom: '12px',
                }}>
                  Where the operator works. Evidence behind everything.
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                  color: '#5e5e5e', lineHeight: 1.6, margin: 0,
                }}>
                  You see what&rsquo;s on fire, what&rsquo;s drifting, and what needs your decision. You drill into the evidence behind any finding. You track whether the actions you took are working. This is where the turnaround gets managed, not in a slide deck.
                </p>
              </motion.div>
            </div>
            {/* Right column: visuals — morph cards visible for panel 1, findings for 2&3 */}
            <div style={{ position: 'relative', minHeight: 400 }}>
              {/* Panel 1 visual: connected cards already visible behind this layer */}
              <motion.div style={{ opacity: p1Opacity }}>
                {/* Empty — the morph cards + connection lines ARE the panel 1 visual */}
              </motion.div>
              {/* Panel 2 visual: investigation findings */}
              <motion.div style={{ opacity: p2Opacity, position: 'absolute', inset: 0, maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
                <InvestigationVisual />
              </motion.div>
              {/* Panel 3 visual: evidence view */}
              <motion.div style={{ opacity: p3Opacity, position: 'absolute', inset: 0, maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
                <EvidenceVisual />
              </motion.div>
            </div>
          </div>

          {/* Panel indicators at bottom */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24, flexShrink: 0 }}>
            <motion.div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#5f6f4a', opacity: dot1Active }} />
            <motion.div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#5f6f4a', opacity: dot2Active }} />
            <motion.div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#5f6f4a', opacity: dot3Active }} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
