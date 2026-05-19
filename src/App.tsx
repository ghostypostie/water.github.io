import Navbar from "./components/Navbar";
import ParticleCanvas from "./components/ParticleCanvas";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Screenshots from "./components/Screenshots";
import ClientSettings from "./components/ClientSettings";
import Platforms from "./components/Platforms";
import Community from "./components/Community";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-[#fe8bbb]/30 relative">
      <ParticleCanvas />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <Screenshots />
        <ClientSettings />
        <Platforms />
        <Community />
        <Footer />
      </div>
    </div>
  );
}
