import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyCounseling from './components/WhyCounseling';
import Packages from './components/Packages';
import AboutMe from './components/AboutMe';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden pt-20 bg-[var(--neu-base)] text-[var(--neu-text)] transition-colors duration-300">
      <Navbar />

      <div id="home" className="relative bg-[var(--neu-base)] transition-colors duration-300">
        <Hero />
      </div>

      <div className="relative bg-[var(--neu-base)] transition-colors duration-300">
        <WhyCounseling />
      </div>

      <div className="relative bg-[var(--neu-base)] transition-colors duration-300">
        <Packages />
      </div>

      <div className="relative bg-[var(--neu-base)] transition-colors duration-300">
        <AboutMe />
      </div>

      <div className="relative bg-[var(--neu-base)] transition-colors duration-300">
        <SocialMedia />
      </div>

      <Footer />
    </div>
  );
}
