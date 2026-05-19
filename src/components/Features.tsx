import { motion } from "framer-motion";
import {
  Store,
  Search,
  Radio,
  Palette,
  Zap,
  Settings2,
  Download,
  MessageSquareText,
  Shield,
  Globe,
} from "lucide-react";

const main = [
  {
    icon: Store,
    title: "Water Store",
    body: "Link Discord, convert KR to Pani (1:1000), buy CSS themes, userscripts & resources from the marketplace.",
    tags: ["Pani Economy", "Discord Bot"],
  },
  {
    icon: Search,
    title: "Smart Matchmaker",
    body: "Press F4 to join filtered games by mode, player count, region (MBI/TOK/FRA), and remaining time.",
    tags: ["F4 Hotkey", "Region Filter"],
  },
  {
    icon: Radio,
    title: "Twitch Chat",
    body: "Real-time IRC WebSocket brings stream chat into Krunker. Purple usernames, auto-reconnect, dedupe.",
    tags: ["IRC WS", "Auto-Reconnect"],
  },
  {
    icon: Palette,
    title: "UI Customization",
    body: "15 toggles to hide ads, terms, alerts. Community CSS themes with marketplace. Custom scripts section.",
    tags: ["15 Toggles", "CSS Themes"],
  },
  {
    icon: Zap,
    title: "Performance",
    body: "Uncapped FPS, detached DevTools (F12), ANGLE backend selection, accelerated canvas, in-process GPU.",
    tags: ["Uncapped FPS", "ANGLE"],
  },
  {
    icon: Settings2,
    title: "Advanced Settings",
    body: "Rich Presence, auto-update, userscripts, Resource Swapper, Chromium flags, display modes.",
    tags: ["Swapper", "Chromium Flags"],
  },
];

const extras = [
  { icon: Download, text: "One-click mod downloader" },
  { icon: MessageSquareText, text: "Chat filters" },
  { icon: Shield, text: "AGPL-3.0 Licensed" },
  { icon: Globe, text: "Cross-region servers" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-24">
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
              Best Features
            </span>
          </h2>
          <p className="text-gray-400 text-[15px] sm:text-[16px] max-w-md mx-auto leading-relaxed">
            Everything you need — built by the community, for the community.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {main.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariant}
              className="group relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 sm:p-6 hover:bg-white/[0.04] hover:border-[#fe8bbb]/15 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fe8bbb]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fe8bbb]/20 to-[#ff5a9e]/10 border border-[#fe8bbb]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="w-5 h-5 text-[#fe8bbb]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[14px] sm:text-[15px] font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed mb-4">{f.body}</p>
                <div className="flex flex-wrap gap-2">
                  {f.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.03] text-gray-400 border border-white/[0.05]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-2 sm:gap-y-3 mt-8 sm:mt-10"
        >
          {extras.map((e) => (
            <div key={e.text} className="flex items-center gap-2 text-[12px] sm:text-[13px] text-gray-500">
              <e.icon className="w-3.5 h-3.5 text-[#fe8bbb]/40" strokeWidth={1.5} />
              {e.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
