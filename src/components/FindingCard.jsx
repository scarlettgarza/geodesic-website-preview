import { motion } from 'framer-motion'

export default function FindingCard({ finding, index }) {
  const severityColor = finding.severity === 'Critical' ? 'var(--terracotta)' : 'var(--gold)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="border-l-2 pl-4 py-3"
      style={{ borderColor: severityColor }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <span
          className="text-xs uppercase tracking-wider"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: 'var(--olive)',
            letterSpacing: '0.5px',
          }}
        >
          {finding.id}
        </span>
        <span
          className="text-xs uppercase px-2 py-0.5 tracking-wider"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: severityColor,
            border: `1px solid ${severityColor}`,
            letterSpacing: '0.5px',
          }}
        >
          {finding.severity}
        </span>
        <span
          className="text-xs"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: 'var(--gray-mid)',
          }}
        >
          {finding.confidence}% confidence
        </span>
      </div>

      {/* Title */}
      <p
        className="text-sm mb-3"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--dark-brown)',
          lineHeight: 1.6,
        }}
      >
        {finding.title}
      </p>

      {/* Evidence chain */}
      <div className="mb-2">
        <span
          className="text-xs uppercase tracking-wider"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: 'var(--gray-mid)',
            letterSpacing: '0.5px',
          }}
        >
          Evidence chain:
        </span>
        <div className="mt-1 space-y-0.5">
          {finding.evidenceChain.map((step, i) => (
            <div
              key={i}
              className="text-xs"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: 'var(--olive)',
              }}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div
        className="text-xs mt-2"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: 'var(--gray-mid)',
          letterSpacing: '0.05px',
        }}
      >
        Sources: {finding.sources}
      </div>

      {/* Action */}
      <div
        className="text-xs mt-1"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: 'var(--sage)',
        }}
      >
        Action: {finding.action}
      </div>
    </motion.div>
  )
}
