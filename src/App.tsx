import Header from './components/Header'
import Hero from './components/Hero'
import CountdownSection from './components/CountdownSection'
import QueViviras from './components/QueViviras'
import Agenda from './components/Agenda'
import Premios from './components/Premios'
import Ubicacion from './components/Ubicacion'
import Organizadores from './components/Organizadores'
import Faq from './components/Faq'
import CtaFinal from './components/CtaFinal'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CountdownSection />
        <QueViviras />
        <Agenda />
        <Premios />
        <Ubicacion />
        <Organizadores />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}

export default App
