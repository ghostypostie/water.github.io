import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Monitor,
  Apple,
  Terminal,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

type Plat = "windows" | "macos" | "linux";

const data: Record<
  Plat,
  {
    label: string;
    ext: string;
    icon: typeof Monitor;
    gradient: string;
    steps: { text: string; code?: string }[];
    note?: { title: string; content: string[] };
  }
> = {
  windows: {
    label: "Windows",
    ext: ".exe",
    icon: Monitor,
    gradient: "from-blue-400 to-cyan-400",
    steps: [
      { text: "Download", code: "Water.exe" },
      { text: "Run the installer wizard" },
      { text: "Launch from desktop shortcut" },
    ],
  },
  macos: {
    label: "macOS",
    ext: ".dmg",
    icon: Apple,
    gradient: "from-violet-400 to-purple-400",
    steps: [
      { text: "Download", code: "Water.dmg" },
      { text: "Open DMG and drag to Applications" },
    ],
    note: {
      title: "First launch blocked?",
      content: [
        "Go to System Settings → Privacy & Security",
        "Click \"Open Anyway\" next to Water",
        "Confirm the dialog — app is now trusted",
      ],
    },
  },
  linux: {
    label: "Linux",
    ext: ".AppImage",
    icon: Terminal,
    gradient: "from-amber-400 to-orange-400",
    steps: [
      { text: "Download", code: "Water.AppImage" },
      { text: "Make executable", code: "chmod +x Water.AppImage" },
      { text: "Run", code: "./Water.AppImage --no-sandbox" },
    ],
    note: {
      title: "Why --no-sandbox?",
      content: [
        "Required on most distros — Chrome sandboxing needs kernel features",
        "Omit if you have SUID chrome-sandbox from your package manager",
      ],
    },
  },
};

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      }}
      className="ml-2 p-1 rounded hover:bg-white/[0.08] transition-colors shrink-0"
    >
      {ok ? (
        <Check className="w-3 h-3 text-emerald-400" />
      ) : (
        <Copy className="w-3 h-3 text-gray-600 hover:text-gray-400 transition-colors" />
      )}
    </button>
  );
}

export default function Platforms() {
  const [tab, setTab] = useState<Plat>("windows");
  const d = data[tab];

  return (
    <section id="platforms" className="relative py-16 sm:py-24">
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
              Download Water
            </span>
          </h2>
          <p className="text-gray-400 text-[15px] sm:text-[16px] max-w-md mx-auto leading-relaxed">
            Available on all major desktop platforms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          {/* Tabs */}
          <div className="flex gap-1 mb-6 sm:mb-8 bg-white/[0.02] border border-white/[0.05] rounded-xl p-1 w-fit mx-auto">
            {(Object.entries(data) as [Plat, typeof data[Plat]][]).map(([k, v]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-300 ${
                  tab === k
                    ? "bg-white/[0.08] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <v.icon className="w-4 h-4" strokeWidth={1.5} />
                {v.label}
              </button>
            ))}
          </div>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white/[0.015] border border-white/[0.06] rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${d.gradient} flex items-center justify-center shadow-lg`}>
                    <d.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-[14px] sm:text-[15px] font-bold text-white">{d.label}</span>
                    <code className="block text-[11px] text-[#fe8bbb] font-mono">{d.ext}</code>
                  </div>
                </div>
                <a
                  href="https://github.com/ghostypostie/Water/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r ${d.gradient} text-white text-[13px] font-semibold rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg`}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
              </div>

              <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-1">
                {d.steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${d.gradient} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-gray-300">{s.text}</span>
                    {s.code && (
                      <code className="ml-auto text-[12px] font-mono text-gray-400 bg-black/25 px-3 py-1.5 rounded-lg flex items-center gap-1 border border-white/[0.04]">
                        {s.code}
                        <CopyBtn text={s.code} />
                      </code>
                    )}
                  </div>
                ))}
              </div>

              {d.note && (
                <div className="border-t border-white/[0.04] bg-amber-400/[0.03] px-5 sm:px-6 py-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5" strokeWidth={2} />
                    <div>
                      <p className="text-[13px] font-semibold text-amber-400/90 mb-2">{d.note.title}</p>
                      {d.note.content.map((c, i) => (
                        <p key={i} className="text-[12px] text-gray-500 leading-relaxed mt-1">{c}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-6 sm:mt-8">
            <a
              href="https://github.com/ghostypostie/Water/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-300 transition-colors"
            >
              View all releases on GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
