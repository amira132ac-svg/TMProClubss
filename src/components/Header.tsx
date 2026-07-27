import React from 'react';
import { Smartphone, Send, ShieldAlert, Volume2, VolumeX, Shield, Sparkles } from 'lucide-react';
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
    <header className="relative z-10 pt-5 pb-3 px-3 sm:px-6 max-w-7xl mx-auto border-b border-[#38BDF8]/20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Title & Emblem */}
        <div className="flex items-center gap-3 text-center md:text-right">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E2E6E] to-[#0D163D] border border-[#38BDF8]/40 shadow-[0_0_20px_rgba(56,189,248,0.2)] flex items-center justify-center text-[#38BDF8] shrink-0">
            <Shield className="w-7 h-7 stroke-[2]" />
          </div>
          <div>
            <h1 className="font-vazir text-2xl sm:text-3xl font-black tracking-wide text-white flex items-center justify-center md:justify-start gap-2">
              <span>SUPERLEAGUE</span>
              <span className="text-[#38BDF8]">•</span>
              <span className="text-[#F59E0B]">RAGNAROK</span>
            </h1>
            <p className="font-vazir text-xs text-[#94A3B8] font-medium flex items-center justify-center md:justify-start gap-2 mt-0.5">
              <span className="text-[#F59E0B] font-bold">فصل ۴</span>
              <span className="text-[#38BDF8]">•</span>
              <span className="text-slate-200 font-semibold">سوپر لیگ حرفه‌ای - کاپ قهرمانان</span>
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              soundManager.playUiClick();
              onToggleSound();
            }}
            title={soundEnabled ? 'غیرفعال‌سازی موزیک' : 'فعال‌سازی موزیک'}
            className={`p-2.5 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-[#1B2960] border-[#38BDF8] text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'bg-[#10173A] border-[#38BDF8]/20 text-[#94A3B8] hover:border-[#38BDF8]/50 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#38BDF8]" /> : <VolumeX className="w-4 h-4 text-[#94A3B8]" />}
          </button>

          {/* Install App Button */}
          <button
            onClick={() => {
              soundManager.playUiClick();
              onOpenInstallModal();
            }}
            className="px-3.5 py-2 rounded-xl bg-[#10173A] border border-[#38BDF8]/30 hover:border-[#38BDF8] text-white font-vazir text-xs font-semibold flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Smartphone className="w-4 h-4 text-[#38BDF8]" />
            <span>نصب اپلیکیشن</span>
          </button>

          {/* Telegram Channel Button */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playUiClick()}
            className="px-3.5 py-2 rounded-xl bg-[#10173A] border border-[#38BDF8]/20 hover:border-[#38BDF8]/60 text-white font-vazir text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>کانال تلگرام</span>
          </a>

          {/* Season Badge */}
          <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#1E2E6E] to-[#10173A] border border-[#F59E0B]/40 text-[#F59E0B] font-vazir text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>فصل ۴</span>
          </div>
        </div>

      </div>
    </header>
  );
};

