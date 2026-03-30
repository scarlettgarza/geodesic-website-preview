import { motion } from 'framer-motion'
import { simulations } from '../data/findings'

export default function SimulationPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div
        className="text-xs uppercase tracking-wider mb-3"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: 'var(--text-inverse-secondary)',
          letterSpacing: '0.5px',
        }}
      >
        Simulated interventions
      </div>
      <div className="space-y-2">
        {simulations.map((sim, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 border transition-colors"
            style={{
              borderColor: sim.selected ? 'var(--accent-primary)' : 'var(--viz-shell-border)',
              backgroundColor: sim.selected ? 'color-mix(in srgb, var(--accent-primary) 8%, transparent)' : 'transparent',
            }}
          >
            <div
              className="w-3 h-3 mt-0.5 border-2 flex-shrink-0 flex items-center justify-center"
              style={{
                borderColor: sim.selected ? 'var(--accent-primary)' : 'var(--border-subtle)',
                borderRadius: '2px',
              }}
            >
              {sim.selected && (
                <div
                  className="w-1.5 h-1.5"
                  style={{ backgroundColor: 'var(--accent-primary)', borderRadius: '1px' }}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-sm mb-1"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  color: sim.selected ? 'var(--text-inverse)' : 'var(--text-inverse-secondary)',
                }}
              >
                {sim.label}
                {sim.selected && (
                  <span
                    className="text-xs ml-2"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    [selected]
                  </span>
                )}
              </div>
              <div
                className="text-xs flex gap-3 flex-wrap"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  color: 'var(--text-inverse-secondary)',
                }}
              >
                <span>{sim.cost} cost</span>
                <span>{sim.timeline} timeline</span>
                <span style={{ color: sim.selected ? 'var(--text-tertiary)' : 'var(--text-inverse-secondary)' }}>
                  {sim.outcome}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
