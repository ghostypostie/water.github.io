import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink, Droplets } from "lucide-react";
import GithubIcon from "./GithubIcon";

const links = [
  { id: "hero", label: "Home" },
  { id: "features", label: "Features" },
  { id: "screenshots", label: "Screenshots" },
  { id: "settings", label: "Settings" },
  { id: "platforms", label: "Download" },
  { id: "community", label: "Community" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050508]/80 backdrop-blur-2xl border-b border-white/[0.05]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#fe8bbb] to-[#ff5a9e] flex items-center justify-center shadow-lg shadow-[#fe8bbb]/20 group-hover:shadow-[#fe8bbb]/40 transition-shadow duration-300">
            <Droplets className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-bold tracking-tight">
            Water<span className="text-[#fe8bbb]">Client</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="px-3 py-2 rounded-lg text-[13px] font-medium text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              {l.label}
            </button>
          ))}
          <a
            href="https://github.com/ghostypostie/Water"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub
            <ExternalLink className="w-3 h-3 opacity-30" />
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#050508]/95 backdrop-blur-xl border-b border-white/[0.05] overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all"
                >
                  {l.label}
                </button>
              ))}
              <a
                href="https://github.com/ghostypostie/Water"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub Repository
                <ExternalLink className="w-3 h-3 ml-auto opacity-30" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
