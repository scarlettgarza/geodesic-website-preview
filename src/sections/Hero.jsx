import { motion } from 'framer-motion'

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: 'var(--soft-white)' }}
    >
      <div className="w-full text-center" style={{ maxWidth: '900px' }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-[90px] leading-[1.1]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            color: 'var(--charcoal)',
            marginBottom: 24,
          }}
        >
          From turnaround to transformation.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-base md:text-lg"
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--charcoal)',
            lineHeight: 1.6,
            letterSpacing: '0.08px',
            marginBottom: 32,
          }}
        >
          We connect everything inside a company and find what matters. Then we act on it.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          onClick={scrollToContact}
          className="btn-primary"
        >
          Talk to us
        </motion.button>
      </div>

      {/* Visual pull downward — faint artifact suggestion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(20, 20, 20, 0.6))',
        }}
      />
    </section>
  )
}
