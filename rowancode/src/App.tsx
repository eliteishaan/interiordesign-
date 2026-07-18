import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import FeaturedProject from './components/FeaturedProject';
import SelectedWorks from './components/SelectedWorks';
import About from './components/About';
import Process from './components/Process';
import Materials from './components/Materials';
import Testimonials from './components/Testimonials';
import Journal from './components/Journal';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-paper text-charcoal">
      <Navigation />
      <main>
        <Hero />
        <Philosophy />
        <FeaturedProject />
        <SelectedWorks />
        <About />
        <Process />
        <Materials />
        <Testimonials />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
