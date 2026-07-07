import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TrackRecord from "@/components/TrackRecord";
import TechKeyboard from "@/components/TechKeyboard";
import Profile from "@/components/Profile";
import Interests from "@/components/Interests";
import Ratings from "@/components/Ratings";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import BootSequence from "@/components/BootSequence";
import CommandPalette from "@/components/CommandPalette";
import CursorSpotlight from "@/components/CursorSpotlight";
import ScrollStory from "@/components/ScrollStory";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <BootSequence />
      <CommandPalette />

      {/* Tło 1:1 z prototypu: ciemny #030712 + samo „mrowienie" (ziarno) */}
      <div className="vignette-overlay" aria-hidden="true"></div>
      <div className="noise-bg" aria-hidden="true"></div>
      <CursorSpotlight />

      {/* Ticker Bar (Fixed Top) */}
      <Ticker />

      {/* Scrollytelling na wejściu: avatar 3D + filmowa podróż przez historię */}
      <ScrollStory />

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-12 sm:pb-24 flex flex-col gap-20 sm:gap-28 lg:gap-32">
        <Hero />
        <TechKeyboard />
        <Profile />
        <Projects />
        <TrackRecord />
        <Interests />
        <Ratings />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
