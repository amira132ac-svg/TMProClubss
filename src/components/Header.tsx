import React from 'react';
import { Smartphone, Send, ShieldAlert, Volume2, VolumeX, Shield } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  onOpenInstallModal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isAdminMode: boolean;
  onToggleAdminMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenInstallModal,
  soundEnabled,
  onToggleSound,
  isAdminMode,
  onToggleAdminMode
}) => {
  const telegramUrl = 'https://t.me/SUPERLEAGUE_RAGNAROK';

  return (
    <header className="relative z-10 pt-6 pb-4 px-4 sm:px-6 max-w-7xl mx-auto border-b border-[#DDD0BF]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Title & Emblem */}
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border-2 border-[#B99668] shadow-[0_2px_8px_rgba(138,100,68,0.15)] flex items-center justify-center text-[#8E2D2D] shrink-0">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wider text-[#3A2A22]">
              SUPERLEAGUE <span className="text-[#B99668]">•</span> <span className="text-[#8E2D2D]">RAGNAROK</span>
            </h1>
            <p className="font-inter text-xs sm:text-sm text-[#8A6444] tracking-widest font-bold flex items-center justify-center md:justify-start gap-2 mt-0.5">
              <span className="text-[#8E2D2D] font-orbitron">SEASON 4</span>
              <span className="text-[#B99668]">•</span>
              <span className="uppercase text-[#3A2A22]">The Dawn of War</span>
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              soundManager.playUiClick();
              onToggleSound();
            }}
            title={soundEnabled ? 'Disable War Drums Audio' : 'Enable War Drums Audio'}
            className={`p-2.5 rounded-lg border transition-all text-xs font-semibold flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-[#8E2D2D] border-[#8E2D2D] text-[#FAF6F0] shadow-md'
                : 'bg-[#FAF6F0] border-[#DDD0BF] text-[#3A2A22] hover:border-[#B99668]'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FAF6F0]" /> : <VolumeX className="w-4 h-4 text-[#8A6444]" />}
          </button>

          {/* Admin / Manager Mode Toggle */}
          <button
            onClick={() => {
              soundManager.playUiClick();
              onToggleAdminMode();
            }}
            title="Toggle Match Score Editor Mode"
            className={`px-3 py-2 rounded-lg border transition-all text-xs font-semibold flex items-center gap-1.5 ${
              isAdminMode
                ? 'bg-[#B99668] border-[#B99668] text-white shadow-md'
                : 'bg-[#FAF6F0] border-[#DDD0BF] text-[#3A2A22] hover:border-[#B99668]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#8E2D2D]" />
            <span>{isAdminMode ? 'Editor Active' : 'Score Editor'}</span>
          </button>

          {/* Install App Button */}
          <button
            onClick={() => {
              soundManager.playUiClick();
              onOpenInstallModal();
            }}
            className="px-3.5 py-2 rounded-lg bg-[#8E2D2D] hover:bg-[#722323] text-[#FAF6F0] font-inter text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#B99668]/50"
          >
            <Smartphone className="w-4 h-4 text-[#B99668]" />
            <span>Install App</span>
          </button>

          {/* Telegram Channel Button */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playUiClick()}
            className="px-3.5 py-2 rounded-lg bg-[#FAF6F0] border border-[#DDD0BF] hover:border-[#B99668] text-[#3A2A22] font-inter text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Send className="w-4 h-4 text-[#8E2D2D]" />
            <span>Telegram Channel</span>
          </a>

          {/* Season Badge */}
          <div className="px-3 py-2 rounded-lg bg-[#FAF6F0] border border-[#B99668] text-[#8E2D2D] font-orbitron text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <span>SEASON 4</span>
          </div>
        </div>

      </div>
    </header>
  );
};
