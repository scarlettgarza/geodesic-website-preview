export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--charcoal)', padding: '40px 5%' }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 500,
          fontSize: 16,
          color: 'var(--ivory)',
        }}>
          Geodesic Works
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          fontSize: 11,
          color: 'var(--gray-medium)',
          letterSpacing: '0.5px',
        }}>
          &copy; {new Date().getFullYear()} Geodesic Works
        </span>
      </div>
    </footer>
  )
}
