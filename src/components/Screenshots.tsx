import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const shots = [
  { src: "https://raw.githubusercontent.com/ghostypostie/Water/main/screenshots/account-link.png", label: "Account Link" },
  { src: "https://raw.githubusercontent.com/ghostypostie/Water/main/screenshots/marketplace.png", label: "Marketplace" },
  { src: "https://raw.githubusercontent.com/ghostypostie/Water/main/screenshots/inventory.png", label: "Inventory" },
  { src: "https://raw.githubusercontent.com/ghostypostie/Water/main/screenshots/rank-badges.png", label: "Rank Badges" },
  { src: "https://raw.githubusercontent.com/ghostypostie/Water/main/screenshots/mods.png", label: "Mod Downloader" },
  { src: "https://raw.githubusercontent.com/ghostypostie/Water/main/screenshots/quickplay.png", label: "Quick Play" },
  { src: "https://raw.githubusercontent.com/ghostypostie/Water/main/screenshots/twitch-chat.png", label: "Twitch Chat" },
  { src: "https://raw.githubusercontent.com/ghostypostie/Water/main/screenshots/water-window.png", label: "Customizations" },
  { src: "https://raw.githubusercontent.com/ghostypostie/Water/main/screenshots/chat-filters.png", label: "Chat Filters" },
];

export default function Screenshots() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = (idx: number) => setLightbox(idx);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((p) => (p !== null ? (p - 1 + shots.length) % shots.length : null));
  const next = () => setLightbox((p) => (p !== null ? (p + 1) % shots.length : null));

  return (
    <section id="screenshots" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#fe8bbb] to-[#ff5a9e] bg-clip-text text-transparent">
              Screenshots
            </span>
          </h2>
          <p className="text-gray-400 text-[15px] sm:text-[16px] max-w-md mx-auto leading-relaxed">
            Water Client in action across all features.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {shots.map((s, i) => (
            <button
              key={i}
              onClick={() => open(i)}
              className="group relative aspect-video rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.05] hover:border-[#fe8bbb]/20 transition-all duration-500"
            >
              <img
                src={s.src}
                alt={s.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-left">
                <p className="text-white text-[12px] sm:text-[13px] font-semibold">{s.label}</p>
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-8 p-2.5 sm:p-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-8 p-2.5 sm:p-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl w-full max-h-[85dvh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={shots[lightbox].src}
                alt={shots[lightbox].label}
                className="max-w-full max-h-[75dvh] rounded-xl object-contain shadow-2xl"
              />
              <div className="mt-4 sm:mt-5 text-center">
                <h3 className="text-white text-base sm:text-lg font-semibold">{shots[lightbox].label}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  {lightbox + 1} / {shots.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
