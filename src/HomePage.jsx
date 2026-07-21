import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyCounseling from './components/WhyCounseling';
import Packages from './components/Packages';
import AboutMe from './components/AboutMe';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';
import eMeetingImg from './assets/E-meet.png';
import physicalImg from './assets/P-meet.png';

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden pt-20 bg-[var(--neu-base)] text-[var(--neu-text)] transition-colors duration-300">
      <Navbar />

      {/* Ornamental Divider */}
      <div className="flex items-center justify-center mt-8 mb-0 md:mt-2 md:mb-2 w-1/2 md:w-1/4 mx-auto bg-[var(--neu-base)] transition-colors duration-300">
        <div className="flex-1 h-px bg-[var(--neu-accent)] opacity-40"></div>
        <div className="flex items-center gap-1.5 px-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--neu-accent)] opacity-50"></span>
          <span className="w-2 h-2 rounded-full bg-[var(--neu-accent)] opacity-60"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--neu-accent)] opacity-80"></span>
          <span className="w-3 h-3 rounded-full bg-[var(--neu-accent)]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--neu-accent)] opacity-80"></span>
          <span className="w-2 h-2 rounded-full bg-[var(--neu-accent)] opacity-60"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--neu-accent)] opacity-50"></span>
        </div>
        <div className="flex-1 h-px bg-[var(--neu-accent)] opacity-40"></div>
      </div>

      <div id="home" className="relative bg-[var(--neu-base)] transition-colors duration-300">
        <Hero />
      </div>

      <div className="relative bg-[var(--neu-base)] transition-colors duration-300">
        <WhyCounseling />
      </div>

      {/* E-Meeting & Physical Images */}
      <div className="relative bg-[var(--neu-base)] transition-colors duration-300 py-10 md:py-16">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="group relative overflow-hidden rounded-xl border border-[var(--neu-border)] transition-all duration-300 hover:border-[var(--neu-accent)]">
              <img src={eMeetingImg} alt="E-Meeting" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-[var(--neu-border)] transition-all duration-300 hover:border-[var(--neu-accent)]">
              <img src={physicalImg} alt="Physical Meeting" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>
        </div>
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
