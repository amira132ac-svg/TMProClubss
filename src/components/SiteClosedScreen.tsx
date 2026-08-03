import React, { useState } from 'react';
import { Lock, ShieldAlert, Send, Clock, Sparkles, RefreshCw, KeyRound, Unlock } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface SiteClosedScreenProps {
  onBypass?: () => void;
}

export const SiteClosedScreen: React.FC<SiteClosedScreenProps> = ({ onBypass }) => {
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const telegramUrl = 'https://t.me/SUPERLEAGUE_RAGNAROK';

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passcode.trim();
    if (cleanPass === 'Ali1202390' || cleanPass === 'ali1202390' || cleanPass === 'ragna' || cleanPass === '1380') {
      soundManager.playUiClick();
      if (onBypass) onBypass();
    } else {
      soundManager.playUiClick();
      setErrorMsg('رمز عبور مدیریت اشتباه است.');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative z-20 text-slate-100 font-vazir">
      {/* Decorative background glow circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-tr from-[#38BDF8]/15 via-[#F59E0B]/10 to-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Card */}
      <div className="max-w-2xl w-full bg-[#0B1333]/90 backdrop-blur-xl border border-[#38BDF8]/30 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(56,189,248,0.2)] text-center relative overflow-hidden my-auto">
        
        {/* Top Gold Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent animate-pulse" />

        {/* Lock Shield Icon with Glowing Pulse */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/30 to-[#38BDF8]/30 rounded-full blur-lg animate-ping" />
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E2E6E] via-[#0D163D] to-[#111A42] border-2 border-[#F59E0B] shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center text-[#F59E0B] relative z-10">
            <Lock className="w-10 h-10 text-[#F59E0B] stroke-[2.2]" />
          </div>
        </div>

        {/* Tournament Brand */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B2960]/80 border border-[#38BDF8]/30 text-xs font-bold text-[#38BDF8] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>SUPER LEAGUE RAGNAROK • SEASON 4</span>
        </div>

        {/* Main Banner Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide mb-3 leading-tight">
          سایت قطعه (بسته می‌باشد)
        </h1>

        <p className="text-lg sm:text-xl font-bold text-[#F59E0B] mb-6 flex items-center justify-center gap-2">
          <Clock className="w-5 h-5 text-[#F59E0B] animate-spin" style={{ animationDuration: '8s' }} />
          <span>درحال بروزرسانی و تنظیم اطلاعات تورنمنت</span>
        </p>

        {/* Description Box */}
        <div className="bg-[#070D26]/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 text-slate-300 text-sm sm:text-base leading-relaxed text-center space-y-2">
          <p className="font-bold text-rose-400 text-base sm:text-lg">
            ⚠️ سایت در حال حاضر بسته می‌باشد.
          </p>
          <p>
            دسترسی به تمام بخش‌های جدول، آمار گلزنان، پاس گل‌ها و برنامه مسابقات به صورت موقت قطع و غیرفعال شده است.
          </p>
          <p className="text-[#38BDF8] font-semibold">
            درحال حاضر تنظیم و بروزرسانی اطلاعات تورنمنت در دست انجام است و به محض اتمام، سایت مجدداً بازگشایی خواهد شد.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playUiClick()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0088cc] to-[#00a8ff] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,136,204,0.4)] hover:brightness-110 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>عضویت در کانال تلگرام لیگ</span>
          </a>

          <button
            onClick={() => {
              soundManager.playUiClick();
              setShowAdminInput(!showAdminInput);
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#131E48] border border-[#38BDF8]/30 text-[#38BDF8] hover:bg-[#1A2A64] font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <KeyRound className="w-4 h-4 text-[#F59E0B]" />
            <span>ورود مدیریت</span>
          </button>
        </div>

        {/* Admin Secret Bypass Drawer */}
        {showAdminInput && (
          <form onSubmit={handleAdminSubmit} className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col items-center gap-3 animate-fadeIn">
            <div className="text-xs text-slate-400">
              جهت ورود مدیریت، رمز عبور را وارد کنید:
            </div>
            <div className="flex items-center gap-2 w-full max-w-sm">
              <input
                type="password"
                placeholder="رمز عبور مدیریت..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="flex-1 bg-[#070C21] border border-[#38BDF8]/40 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#F59E0B] hover:bg-[#d98206] text-[#060A21] font-bold text-sm rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Unlock className="w-4 h-4" />
                <span>ورود</span>
              </button>
            </div>
            {errorMsg && (
              <div className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </div>
            )}
          </form>
        )}

        {/* Footer note */}
        <div className="mt-8 text-xs text-slate-500 font-mono flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500/80" />
          <span>SUPER LEAGUE RAGNAROK • SYSTEM STATUS: CLOSED</span>
        </div>

      </div>
    </div>
  );
};
