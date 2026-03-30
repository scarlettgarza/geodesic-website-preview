import { useState } from 'react'
import { motion } from 'framer-motion'

export default function HowWeWork() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      style={{ backgroundColor: 'var(--contact-bg)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 5%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: 'var(--contact-text)',
              lineHeight: 1.2,
              margin: '0 0 24px',
            }}
          >
            Product company. Engineers in the building. Not a login and a wave goodbye.
          </motion.p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            color: 'var(--contact-text-secondary)',
            lineHeight: 1.6,
          }}>
            We deploy with the outcome — our platform plus forward-deployed engineers in the building.
          </p>
        </div>

        <div>
          {!submitted ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    fontSize: 11,
                    color: 'var(--contact-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: 8,
                  }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 0',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--contact-border)',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 14,
                      color: 'var(--input-text)',
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    fontSize: 11,
                    color: 'var(--contact-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: 8,
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 0',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--contact-border)',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 14,
                      color: 'var(--input-text)',
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  fontSize: 11,
                  color: 'var(--contact-text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: 8,
                }}>
                  What are you dealing with?
                </label>
                <input
                  type="text"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 0',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--contact-border)',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    color: 'var(--input-text)',
                  }}
                />
              </div>
              <div>
                <button type="submit" className="btn-primary">
                  Talk to us
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 400,
                fontSize: 24,
                color: 'var(--accent-secondary)',
              }}>
                We&rsquo;ll be in touch.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
