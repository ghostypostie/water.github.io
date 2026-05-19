import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Zap,
  MessageCircle,
  Shield,
  Palette,
  Gamepad2,
  Settings,
  Store,
  Keyboard,
  Trophy,
  SlidersHorizontal,
  MousePointerClick,
  ChevronDown,
  Radio,
} from "lucide-react";

interface SettingItem {
  name: string;
  desc: string;
  detail?: string;
}

interface Category {
  icon: typeof Monitor;
  title: string;
  subtitle: string;
  color: string;
  glow: string;
  settings: SettingItem[];
}

const categories: Category[] = [
  {
    icon: Zap,
    title: "Performance",
    subtitle: "Frame rates, GPU modes, and 40+ Chromium flags",
    color: "text-amber-400",
    glow: "shadow-amber-400/10",
    settings: [
      { name: "Uncap FPS", desc: "Removes the frame rate limit and VSync cap for maximum smoothness.", detail: "Appends --disable-frame-rate-limit and --disable-gpu-vsync to Chromium." },
      { name: "In-process GPU", desc: "Runs the GPU process inside the main process for OBS and Shadowplay compatibility.", detail: "Useful for streamers who need game capture to work reliably." },
      { name: "Chromium Switches", desc: "A built-in editor for 40+ command-line performance flags.", detail: "Includes --enable-gpu-rasterization, --ignore-gpu-blacklist, --enable-zero-copy, and more." },
      { name: "Splash Screen", desc: "Animated splash with particle background and partner slider on startup.", detail: "Can be disabled for faster cold starts." },
    ],
  },
  {
    icon: Monitor,
    title: "Display",
    subtitle: "Window modes, sizing, and loading screens",
    color: "text-blue-400",
    glow: "shadow-blue-400/10",
    settings: [
      { name: "Display Mode", desc: "Switch between Windowed, Maximized, Fullscreen, or Borderless.", detail: "Borderless is recommended for the best FPS if fullscreen causes issues." },
      { name: "Custom Loading Screen", desc: "Replace the default loading background with any direct image or GIF URL.", detail: "Accepts any publicly accessible image link." },
      { name: "Lock Window Size", desc: "Prevent the window from being resized by the user.", detail: "Useful for maintaining consistent aspect ratio on stream." },
    ],
  },
  {
    icon: MessageCircle,
    title: "Discord Rich Presence",
    subtitle: "Show your game status on Discord with join buttons",
    color: "text-indigo-400",
    glow: "shadow-indigo-400/10",
    settings: [
      { name: "Join Game Button", desc: "Friends can click Join on Discord to enter your lobby directly.", detail: "Uses Discord's joinSecret protocol with real-time lobby IDs." },
      { name: "Custom Buttons", desc: "Configure up to 2 custom buttons with labels and URLs.", detail: "Promote your stream, clan, or social links." },
      { name: "Match Info", desc: "Show current game mode and map name in your Discord status.", detail: "Updates every 2 seconds via IPC." },
      { name: "Lobby Size", desc: "Display current player count and max capacity.", detail: "partySize and partyMax fields in Discord RPC." },
    ],
  },
  {
    icon: Radio,
    title: "Twitch Chat Integration",
    subtitle: "Real-time IRC WebSocket chat inside Krunker",
    color: "text-purple-400",
    glow: "shadow-purple-400/10",
    settings: [
      { name: "Channel Mirroring", desc: "Mirror any Twitch channel's chat directly into the game.", detail: "Connects via TMI IRC WebSocket with auto-reconnect and 5-attempt retry logic." },
      { name: "OAuth Bot Mode", desc: "Send messages back to Twitch from inside Krunker using /msg.", detail: "Rate-limited to 40 messages per minute with queue management." },
      { name: "Chat Filters", desc: "Filter by Players, Killfeed, Unboxings, Server, or Twitch-only.", detail: "Type /players, /kills, /unbox, /server, /twitch, or /all in chat." },
      { name: "Badge & Emote Support", desc: "Renders subscriber badges and Twitch emotes as images.", detail: "Fetches global and channel badges from Twitch GQL API." },
      { name: "Notifications", desc: "Get in-game alerts for raids, hosts, subs, and channel point redeems.", detail: "Injects styled notifications directly into Krunker's chat list." },
    ],
  },
  {
    icon: Shield,
    title: "Ad Block",
    subtitle: "Network-level ad and tracker blocking",
    color: "text-emerald-400",
    glow: "shadow-emerald-400/10",
    settings: [
      { name: "URL Pattern Blocklist", desc: "50+ patterns blocking ads, trackers, and unnecessary assets.", detail: "Blocks Google Ads, DoubleClick, Pollfish, CookiePro, and Krunker bloat assets." },
      { name: "Hosts File Blocklist", desc: "Fetches and applies the Blocklist Project ads.txt list.", detail: "Thousands of known ad domains blocked at the DNS level." },
      { name: "Turf War Stand Removal", desc: "Blocks Turf War stand models and clan assets from loading.", detail: "Reduces map load times and visual clutter." },
    ],
  },
  {
    icon: Palette,
    title: "Customization",
    subtitle: "Themes, watermarks, and UI tweaks",
    color: "text-pink-400",
    glow: "shadow-pink-400/10",
    settings: [
      { name: "Community CSS Themes", desc: "Built-in theme selector with Aiiimpact and MTZ included.", detail: "Themes are loaded from assets/community-css/ with manifest.json registry." },
      { name: "User CSS", desc: "Drop custom CSS files into the Swap/css folder.", detail: "Automatically detected and listed in the theme dropdown." },
      { name: "Client Watermark", desc: "Toggle the Water branding overlay in-game.", detail: "Uses CSS custom property --watermark-display for instant toggling." },
    ],
  },
  {
    icon: Gamepad2,
    title: "Quick Play (F4)",
    subtitle: "Smart matchmaker with animated lobby scanner",
    color: "text-cyan-400",
    glow: "shadow-cyan-400/10",
    settings: [
      { name: "Game Mode Filter", desc: "Select which modes to include in the search.", detail: "FFA, TDM, CTF, Hardpoint, Race, Parkour, and more." },
      { name: "Region Filter", desc: "Pick server regions to search across.", detail: "MBI, TOK, FRA, SIN, SYD, NYC, DAL, MIA — with ping display." },
      { name: "Player Count Range", desc: "Set minimum and maximum player thresholds.", detail: "Filters lobbies before the animated scan begins." },
      { name: "Tidal Overlay", desc: "Full-screen animated overlay showing live lobby scan.", detail: "Pink theme while scanning, green theme when a match is found." },
    ],
  },
  {
    icon: SlidersHorizontal,
    title: "Resource Swapper",
    subtitle: "Replace game assets and run userscripts",
    color: "text-orange-400",
    glow: "shadow-orange-400/10",
    settings: [
      { name: "Asset Swapping", desc: "Drop files into the Swap folder to replace Krunker assets.", detail: "Uses a custom client-swapper:// protocol with file existence caching." },
      { name: "Userscript Engine", desc: "Full userscript loader with TypeScript compiler.", detail: "Supports @require dependencies, hot-reload, error management, and performance monitoring." },
      { name: "Purchased Scripts", desc: "Auto-load scripts purchased from the Water Store.", detail: "Fetches from GitHub and integrates into the userscript pipeline." },
    ],
  },
  {
    icon: Trophy,
    title: "Ranked",
    subtitle: "Auto-focus and insta-lock for competitive",
    color: "text-yellow-400",
    glow: "shadow-yellow-400/10",
    settings: [
      { name: "Auto-Focus", desc: "Brings the game window to front when a ranked match is found.", detail: "Detects pop_3.mp3 audio load via XHR/fetch/audio prototype hooks." },
      { name: "Insta-Lock Class", desc: "Automatically selects your preferred class when the match starts.", detail: "Waits for the competitive menu to appear then calls selectClass()." },
    ],
  },
  {
    icon: Keyboard,
    title: "Keybinds",
    subtitle: "Fully remappable client and Water hotkeys",
    color: "text-violet-400",
    glow: "shadow-violet-400/10",
    settings: [
      { name: "Client Controls", desc: "New Game (F6), Refresh (F5), Fullscreen (F11), DevTools (F12).", detail: "All editable through an in-game keybind window injected into Krunker's settings." },
      { name: "Water Features", desc: "Quick Play (F4) and any module-specific binds.", detail: "Stored in config and applied at LoadStart." },
      { name: "Alt Manager Keybinds", desc: "Each saved alt can have its own keybind for instant login.", detail: "Supports keyboard and mouse button combinations." },
    ],
  },
  {
    icon: MousePointerClick,
    title: "Keystrokes",
    subtitle: "On-screen key press overlay for streamers",
    color: "text-rose-400",
    glow: "shadow-rose-400/10",
    settings: [
      { name: "QWASDE + Mouse", desc: "Visual overlay for Q, W, A, S, D, E, LMB, RMB, and Space.", detail: "Rendered via injected HTML/CSS with active state animations." },
      { name: "Position & Scale", desc: "Drag to position and scale the overlay anywhere on screen.", detail: "Uses CSS custom properties for X offset, Y offset, and scale factor." },
    ],
  },
  {
    icon: Settings,
    title: "Settings Swapper",
    subtitle: "Save and load multiple Krunker config profiles",
    color: "text-teal-400",
    glow: "shadow-teal-400/10",
    settings: [
      { name: "Profile Management", desc: "Create unlimited named profiles with custom colors.", detail: "Profiles are stored as JSON and can be exported or imported." },
      { name: "Auto-Reset", desc: "Option to reset Krunker settings before loading a profile.", detail: "Prevents config conflicts by starting from a clean state." },
    ],
  },
  {
    icon: Store,
    title: "Water Store",
    subtitle: "Discord-linked marketplace for themes and scripts",
    color: "text-[#fe8bbb]",
    glow: "shadow-[#fe8bbb]/10",
    settings: [
      { name: "Discord Linking", desc: "Generate a 6-character code to link your Discord via Water Bot.", detail: "Codes expire in 5 minutes. Stored in Supabase with client_id mapping." },
      { name: "Pani Economy", desc: "Convert KR to Pani at 1:1000 rate through the bot.", detail: "1 Pani = 1,000 KR. Used to buy themes, scripts, and features." },
      { name: "Marketplace", desc: "Browse community-created CSS themes and userscripts.", detail: "Purchases are tied to your linked Discord account." },
      { name: "Inventory", desc: "View and activate purchased items.", detail: "Themes apply instantly; scripts reload into the userscript pipeline." },
    ],
  },
];

export default function ClientSettings() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="settings" className="relative py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3">
            <span className="bg-gradient-to-r from-[#fe8bbb] to-[#ff5a9e] bg-clip-text text-transparent">
              Under the Hood
            </span>
          </h2>
          <p className="text-gray-400 text-[15px] max-w-lg mx-auto leading-relaxed">
            Every module, setting, and toggle extracted from the source code.
            This is what powers Water Client.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`rounded-xl border border-white/[0.05] overflow-hidden transition-all duration-300 ${
                openIndex === i ? "bg-white/[0.02]" : "bg-white/[0.01] hover:bg-white/[0.02]"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center gap-3.5 px-5 py-3.5 text-left"
              >
                <div
                  className={`w-9 h-9 rounded-lg ${cat.glow} flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "scale-110" : ""
                  }`}
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <cat.icon className={`w-4.5 h-4.5 ${cat.color}`} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-semibold text-white">{cat.title}</h3>
                  <p className="text-[12px] text-gray-500 truncate">{cat.subtitle}</p>
                </div>
                <span className="text-[11px] text-gray-600 font-mono shrink-0 mr-2">
                  {cat.settings.length}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 pt-1 space-y-3">
                      {cat.settings.map((s, j) => (
                        <div
                          key={j}
                          className="pl-12 relative"
                        >
                          <div className="absolute left-4 top-1.5 w-1 h-1 rounded-full bg-[#fe8bbb]/40" />
                          <h4 className="text-[13px] font-medium text-gray-200">{s.name}</h4>
                          <p className="text-[12px] text-gray-500 leading-relaxed mt-0.5">
                            {s.desc}
                          </p>
                          {s.detail && (
                            <p className="text-[11px] text-gray-600 leading-relaxed mt-1">
                              {s.detail}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { label: "Modules", value: "32" },
            { label: "Settings", value: "80+" },
            { label: "UI Options", value: "Checkbox, Slider, Dropdown, Keybind, Text, Button" },
            { label: "Config Store", value: "electron-store" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-white/[0.015] border border-white/[0.04]"
            >
              <div className="text-[18px] font-black text-white">{stat.value}</div>
              <div className="text-[11px] text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
