import { Droplets } from "lucide-react";
import GithubIcon from "./GithubIcon";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-5 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#fe8bbb] to-[#ff5a9e] flex items-center justify-center">
            <Droplets className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-bold text-white">Water Client</span>
        </div>

        <div className="flex items-center gap-5 sm:gap-6">
          <a
            href="https://github.com/ghostypostie/Water"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] sm:text-[12px] text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub
          </a>
          <a
            href="https://github.com/ghostypostie/Water/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] sm:text-[12px] text-gray-600 hover:text-gray-400 transition-colors"
          >
            AGPL-3.0
          </a>
          <a
            href="https://github.com/ghostypostie/Water/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] sm:text-[12px] text-gray-600 hover:text-gray-400 transition-colors"
          >
            Releases
          </a>
        </div>

        <p className="text-[10px] sm:text-[11px] text-gray-700">
          Made by the community &middot; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
