import React from 'react';
import { Zap, ExternalLink, ShieldCheck } from 'lucide-react';

export const SponsorFooter: React.FC = () => {
  const sponsorUrl = 'https://t.me/NexaDNS';

  return (
    <footer className="relative z-10 border-t border-[#DDD0BF] bg-[#FAF6F0] py-8 px-4 sm:px-6 mt-16 shadow-[0_-2px_10px_rgba(58,42,34,0.03)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Sponsor Banner */}
        <div className="sponsor-footer flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B99668]/15 border border-[#B99668] text-[#8E2D2D] font-orbitron font-bold text-xs shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-[#8E2D2D]" />
            <span>Official Sponsor</span>
          </div>

          <div className="flex items-center gap-2 font-cinzel font-extrabold text-lg sm:text-xl text-[#3A2A22] tracking-wide">
            <span className="text-[#8E2D2D]">
              NexaDNS
            </span>
            <ShieldCheck className="w-4 h-4 text-[#B99668]" />
          </div>

          <a
            href={sponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-lg bg-[#F2ECE3] border border-[#DDD0BF] hover:border-[#B99668] text-[#3A2A22] hover:text-[#8E2D2D] font-inter text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ml-0 sm:ml-2"
          >
            <span>Visit Sponsor</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Footer Copyright / League Credits */}
        <div className="text-center md:text-right text-xs text-[#8A6444] font-inter space-y-1">
          <p className="font-orbitron font-bold text-[#3A2A22]">
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
