import React, { useState } from 'react';
import { Share2, Check, Shield } from 'lucide-react';
import { RuneCorners } from './RuneCorners';

export const ShareBox: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'SUPERLEAGUE RAGNAROK · Season 4',
      text: 'Join the ultimate Viking Football League! Standings, Fixtures & Stats for Season 4: The Dawn of War.',
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    // Fallback: Copy link
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 my-10">
      <div className="share-box relative parchment-card parchment-card-hover rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col sm:flex-row items-center justify-between gap-4 transition-all overflow-hidden bg-[#111D3A] border border-[#38BDF8]/25">
        <RuneCorners />
        
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white flex items-center justify-center text-lg shrink-0 font-bold shadow-md border border-[#38BDF8]/30">
            <Shield className="w-5 h-5 text-[#38BDF8]" />
          </div>
          <div>
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#FFFFFF]">
              Share RAGNAROK with your friends!
            </h3>
            <p className="text-xs text-[#94A3B8] font-inter mt-0.5 font-medium">
              Spread the battle cry and invite fellow Viking managers
            </p>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] hover:brightness-110 text-white font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md border border-[#38BDF8]/40 transition-all shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#F59E0B]" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-[#38BDF8]" />
              <span>Share Link</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};

