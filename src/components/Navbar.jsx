import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../theme-context.jsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
      style={{
        padding: '12px 40px',
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
      }}
    >
      <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 20, color: 'var(--text-primary)' }}>Geodesic</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="theme-toggle__dot" />
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <button
          onClick={scrollToContact}
          className="btn-primary"
          style={{ fontSize: 12, padding: '0.35rem 1rem' }}
        >
          Talk to us
        </button>
      </div>
    </motion.nav>
  )
}
