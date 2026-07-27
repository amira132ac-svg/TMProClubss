import React from 'react';
import { Zap, ExternalLink, ShieldCheck } from 'lucide-react';

export const SponsorFooter: React.FC = () => {
  const sponsorUrl = 'https://t.me/NexaDNS';

  return (
    <footer className="relative z-10 border-t border-[#38BDF8]/20 bg-[#0B132B] py-8 px-4 sm:px-6 mt-16 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Sponsor Banner */}
        <div className="sponsor-footer flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C2541] border border-[#F59E0B]/50 text-[#F59E0B] font-orbitron font-bold text-xs shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-[#F59E0B]" />
            <span>Official Sponsor</span>
          </div>

          <div className="flex items-center gap-2 font-cinzel font-extrabold text-lg sm:text-xl text-[#FFFFFF] tracking-wide">
            <span className="text-[#38BDF8]">
              NexaDNS
            </span>
            <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
          </div>

          <a
            href={sponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-xl bg-[#1C2541] border border-[#38BDF8]/25 hover:border-[#38BDF8] text-[#E2E8F0] hover:text-[#38BDF8] font-inter text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ml-0 sm:ml-2"
          >
            <span>Visit Sponsor</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8]" />
          </a>
        </div>

        {/* Footer Copyright / League Credits */}
        <div className="text-center md:text-right text-xs text-[#94A3B8] font-inter space-y-1">
          <p className="font-orbitron font-bold text-[#FFFFFF]">
            SUPERLEAGUE · RAGNAROK SEASON 4
          </p>
          <p>© 2026 SUPERLEAGUE RAGNAROK. All Rights Reserved.</p>
        </div>

      </div>

      {/* Watermark in background */}
      <div className="watermark-ragnarok">
        RAGNAROK
      </div>
    </footer>
  );
};

