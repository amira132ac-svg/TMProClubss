import React from 'react';
import { Smartphone, X, Download, Share, PlusSquare, Compass, CheckCircle } from 'lucide-react';
import { RuneCorners } from './RuneCorners';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onNativeInstall: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onNativeInstall
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B132B]/80 backdrop-blur-md animate-fade-in">
      <div className="parchment-card rounded-2xl w-full max-w-lg overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)] relative bg-[#111D3A] border border-[#38BDF8]/40">
        <RuneCorners />
        
        {/* Modal Header */}
        <div className="bg-[#1C2541] p-5 border-b border-[#38BDF8]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white flex items-center justify-center border border-[#38BDF8]/30">
              <Smartphone className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#FFFFFF]">
                Install SUPERLEAGUE App
              </h3>
              <p className="text-xs text-[#94A3B8] font-inter font-medium">
                Fast, offline-ready mobile access to RAGNAROK Season 4
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#283655] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 font-inter text-sm">
          
          {/* Native Install Button if browser supports beforeinstallprompt */}
          {deferredPrompt ? (
            <div className="bg-[#1C2541] border border-[#38BDF8]/30 p-4 rounded-xl text-center space-y-3">
              <p className="text-[#E2E8F0] font-medium">
                Your browser supports one-click app installation!
              </p>
              <button
                onClick={onNativeInstall}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] hover:brightness-110 text-white font-cinzel font-bold text-sm flex items-center justify-center gap-2 shadow-md border border-[#38BDF8]/40 transition-all"
              >
                <Download className="w-4 h-4 text-[#F59E0B]" />
                <span>Install SUPERLEAGUE RAGNAROK Now</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#1C2541] border border-[#38BDF8]/20 p-3.5 rounded-xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
              <div className="text-xs text-[#E2E8F0]">
                You can add this web app directly to your phone&apos;s home screen for an app-like experience!
              </div>
            </div>
          )}

          {/* iOS Safari Guide */}
          <div className="space-y-2">
            <h4 className="font-orbitron font-bold text-xs text-[#38BDF8] uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#F59E0B]" /> iPhone / iPad (Safari)
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#E2E8F0] bg-[#1C2541] p-3 rounded-xl border border-[#38BDF8]/20">
              <li className="flex items-center gap-2">
                <span>1. Tap the Share button in Safari</span>
                <Share className="w-3.5 h-3.5 text-[#38BDF8]" />
              </li>
              <li className="flex items-center gap-2">
                <span>2. Scroll down & select &quot;Add to Home Screen&quot;</span>
                <PlusSquare className="w-3.5 h-3.5 text-[#F59E0B]" />
              </li>
              <li>3. Confirm by tapping &quot;Add&quot; in top right</li>
            </ol>
          </div>

          {/* Android Chrome Guide */}
          <div className="space-y-2">
            <h4 className="font-orbitron font-bold text-xs text-[#38BDF8] uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-[#F59E0B]" /> Android (Chrome / Edge)
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#E2E8F0] bg-[#1C2541] p-3 rounded-xl border border-[#38BDF8]/20">
              <li>1. Tap the 3 dots menu in the browser top-right</li>
              <li>2. Select &quot;Install app&quot; or &quot;Add to Home screen&quot;</li>
              <li>3. Tap &quot;Install&quot; to launch from your app drawer</li>
            </ol>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#1C2541] p-4 border-t border-[#38BDF8]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0B132B] hover:bg-[#0284C7] text-[#E2E8F0] hover:text-white border border-[#38BDF8]/30 text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};

