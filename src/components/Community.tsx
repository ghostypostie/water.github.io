import { motion } from "framer-motion";
import { MessageCircle, Heart, Users, Shield, ExternalLink } from "lucide-react";

const partners = [
  { discord: "https://discord.gg/vNh35Wx6ua" },
  { discord: "https://discord.gg/yJJ2KEZR9Y" },
  { discord: "https://discord.gg/NVpwMqGZxG" },
  { discord: "https://discord.gg/h9V53uXpHz" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Community() {
  return (
    <section id="community" className="relative py-16 sm:py-24">
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
              Community
            </span>
          </h2>
          <p className="text-gray-400 text-[15px] sm:text-[16px] max-w-md mx-auto leading-relaxed">
            Open source, community-driven, and always free.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { icon: Users, title: "Community Built", body: "Made by the community, for the community." },
            { icon: Heart, title: "Pani Economy", body: "Convert KR, buy themes & scripts, support creators." },
            { icon: Shield, title: "AGPL-3.0", body: "Free to use, modify, and distribute." },
            { icon: MessageCircle, title: "Discord Bot", body: "Account linking, Pani balance, store transactions." },
          ].map((v) => (
            <motion.div
              key={v.title}
              variants={cardVariant}
              className="text-center p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#fe8bbb]/15 hover:bg-white/[0.03] transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-[#fe8bbb]/8 border border-[#fe8bbb]/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-5 h-5 text-[#fe8bbb]" strokeWidth={1.5} />
              </div>
              <h4 className="text-[14px] font-bold text-white mb-1.5">{v.title}</h4>
              <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 sm:mt-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
            <div className="h-px w-12 bg-white/[0.06]" />
            <h3 className="text-[11px] sm:text-[12px] font-semibold text-gray-500 uppercase tracking-widest">
              Community Partners
            </h3>
            <div className="h-px w-12 bg-white/[0.06]" />
          </div>

          <div className="flex justify-center gap-3 sm:gap-4">
            {partners.map((p, i) => (
              <a
                key={i}
                href={p.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#fe8bbb]/25 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#fe8bbb]/70 transition-colors" strokeWidth={1.5} />
                <span className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-[11px] text-gray-500 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity flex items-center gap-1">
                  Discord <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
