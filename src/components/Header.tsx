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
    <header className="relative z-10 pt-6 pb-4 px-4 sm:px-6 max-w-7xl mx-auto border-b border-[#38BDF8]/20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Title & Emblem */}
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-12 h-12 rounded-xl bg-[#111D3A] border-2 border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center justify-center text-[#38BDF8] shrink-0">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wider text-[#FFFFFF]">
              SUPERLEAGUE <span className="text-[#38BDF8]">•</span> <span className="text-[#F59E0B]">RAGNAROK</span>
            </h1>
            <p className="font-inter text-xs sm:text-sm text-[#94A3B8] tracking-widest font-bold flex items-center justify-center md:justify-start gap-2 mt-0.5">
              <span className="text-[#38BDF8] font-orbitron">SEASON 4</span>
              <span className="text-[#F59E0B]">•</span>
              <span className="uppercase text-[#E2E8F0]">The Dawn of War</span>
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
            title={soundEnabled ? 'Disable Music Audio' : 'Enable Music Audio'}
            className={`p-2.5 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-[#0284C7] border-[#38BDF8] text-[#FFFFFF] shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                : 'bg-[#111D3A] border-[#38BDF8]/30 text-[#94A3B8] hover:border-[#38BDF8] hover:text-[#E2E8F0]'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FFFFFF]" /> : <VolumeX className="w-4 h-4 text-[#94A3B8]" />}
          </button>

          {/* Admin / Manager Mode Toggle */}
          <button
            onClick={() => {
              soundManager.playUiClick();
              onToggleAdminMode();
            }}
            title="Toggle Match Score Editor Mode"
            className={`px-3 py-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
              isAdminMode
                ? 'bg-[#F59E0B] border-[#F59E0B] text-black font-bold shadow-md'
                : 'bg-[#111D3A] border-[#38BDF8]/30 text-[#E2E8F0] hover:border-[#F59E0B]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{isAdminMode ? 'Editor Active' : 'Score Editor'}</span>
          </button>

          {/* Install App Button */}
          <button
            onClick={() => {
              soundManager.playUiClick();
              onOpenInstallModal();
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] hover:from-[#0369A1] hover:to-[#1E293B] text-white font-inter text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#38BDF8]/40"
          >
            <Smartphone className="w-4 h-4 text-[#38BDF8]" />
            <span>Install App</span>
          </button>

          {/* Telegram Channel Button */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playUiClick()}
            className="px-3.5 py-2 rounded-xl bg-[#111D3A] border border-[#38BDF8]/30 hover:border-[#38BDF8] text-[#E2E8F0] font-inter text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Send className="w-4 h-4 text-[#38BDF8]" />
            <span>Telegram Channel</span>
          </a>

          {/* Season Badge */}
          <div className="px-3 py-2 rounded-xl bg-[#111D3A] border border-[#F59E0B] text-[#F59E0B] font-orbitron text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <span>SEASON 4</span>
          </div>
        </div>

      </div>
    </header>
  );
};
