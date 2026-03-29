import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import TheMess from './sections/TheMess'
import HowWeWork from './sections/HowWeWork'
import Footer from './sections/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TheMess />
        <HowWeWork />
      </main>
      <Footer />
    </>
  )
}

export default App
