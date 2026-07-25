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
      <div className="share-box relative parchment-card parchment-card-hover rounded-xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(58,42,34,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 transition-all overflow-hidden">
        <RuneCorners />
        
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-lg bg-[#8E2D2D] text-[#FAF6F0] flex items-center justify-center text-lg shrink-0 font-bold shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#3A2A22]">
              Share RAGNAROK with your friends!
            </h3>
            <p className="text-xs text-[#8A6444] font-inter mt-0.5 font-medium">
              Spread the battle cry and invite fellow Viking managers
            </p>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="px-5 py-2.5 rounded-lg bg-[#8E2D2D] hover:bg-[#3A2A22] text-[#FAF6F0] font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#B99668]" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Share Link</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};
