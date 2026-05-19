import { motion } from "framer-motion";
import { ArrowDown, Gamepad2, Droplets } from "lucide-react";
import GithubIcon from "./GithubIcon";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center pt-16 overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#fe8bbb]/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#ff5a9e]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-5 text-center"
      >
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fe8bbb]/8 border border-[#fe8bbb]/15 text-[#fe8bbb] text-[13px] font-medium mb-6 sm:mb-8">
            <Gamepad2 className="w-3.5 h-3.5" />
            Krunker.io Game Client
          </div>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-4 sm:mb-6"
        >
          <span className="text-white">Fresh</span>{" "}
          <span className="text-[#fe8bbb]">Water</span>
          <br />
          <span className="text-white/60">Available.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-[15px] sm:text-lg text-gray-400 max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed px-4"
        >
          A community-built Krunker.io client with a marketplace, Twitch chat,
          custom themes, and uncapped FPS. Open source under AGPL-3.0.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollTo("platforms")}
            className="group relative flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#fe8bbb] to-[#ff5a9e] text-white text-[14px] font-semibold rounded-xl shadow-lg shadow-[#fe8bbb]/20 hover:shadow-[#fe8bbb]/35 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2.5">
              <Droplets className="w-4 h-4" />
              Download Water
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </button>
          <a
            href="https://github.com/ghostypostie/Water"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-[14px] font-medium rounded-xl transition-all duration-300 hover:border-white/[0.12]"
          >
            <GithubIcon className="w-4 h-4" />
            View Source
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-12 sm:mt-16 flex items-center justify-center gap-8"
        >
          {[
            { label: "Windows", ext: ".exe" },
            { label: "macOS", ext: ".dmg" },
            { label: "Linux", ext: ".AppImage" },
          ].map((p) => (
            <div key={p.label} className="text-center">
              <div className="text-[14px] font-bold text-white">{p.label}</div>
              <div className="text-[11px] text-gray-600 font-mono mt-0.5">{p.ext}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-10 sm:mt-14">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5 mx-auto"
          >
            <div className="w-1 h-2 bg-[#fe8bbb]/60 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
