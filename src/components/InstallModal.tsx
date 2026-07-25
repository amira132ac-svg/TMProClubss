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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3A2A22]/60 backdrop-blur-sm animate-fade-in">
      <div className="parchment-card rounded-2xl w-full max-w-lg overflow-hidden shadow-[0_10px_30px_rgba(58,42,34,0.15)] relative">
        <RuneCorners />
        
        {/* Modal Header */}
        <div className="bg-[#EAE3D8] p-5 border-b border-[#DDD0BF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8E2D2D] text-[#FAF6F0] flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#3A2A22]">
                Install SUPERLEAGUE App
              </h3>
              <p className="text-xs text-[#8A6444] font-inter font-medium">
                Fast, offline-ready mobile access to RAGNAROK Season 4
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8A6444] hover:text-[#3A2A22] hover:bg-[#DDD0BF]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 font-inter text-sm">
          
          {/* Native Install Button if browser supports beforeinstallprompt */}
          {deferredPrompt ? (
            <div className="bg-[#F2ECE3] border border-[#B99668] p-4 rounded-xl text-center space-y-3">
              <p className="text-[#3A2A22] font-medium">
                Your browser supports one-click app installation!
              </p>
              <button
                onClick={onNativeInstall}
                className="w-full py-3 px-4 rounded-lg bg-[#8E2D2D] hover:bg-[#3A2A22] text-[#FAF6F0] font-cinzel font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Install SUPERLEAGUE RAGNAROK Now</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#F2ECE3] border border-[#DDD0BF] p-3.5 rounded-xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#8E2D2D] shrink-0 mt-0.5" />
              <div className="text-xs text-[#3A2A22]">
                You can add this web app directly to your phone&apos;s home screen for an app-like experience!
              </div>
            </div>
          )}

          {/* iOS Safari Guide */}
          <div className="space-y-2">
            <h4 className="font-orbitron font-bold text-xs text-[#8E2D2D] uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#B99668]" /> iPhone / iPad (Safari)
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#3A2A22] bg-[#F2ECE3] p-3 rounded-lg border border-[#DDD0BF]">
              <li className="flex items-center gap-2">
                <span>1. Tap the Share button in Safari</span>
                <Share className="w-3.5 h-3.5 text-[#8E2D2D]" />
              </li>
              <li className="flex items-center gap-2">
                <span>2. Scroll down & select &quot;Add to Home Screen&quot;</span>
                <PlusSquare className="w-3.5 h-3.5 text-[#B99668]" />
              </li>
              <li>3. Confirm by tapping &quot;Add&quot; in top right</li>
            </ol>
          </div>

          {/* Android Chrome Guide */}
          <div className="space-y-2">
            <h4 className="font-orbitron font-bold text-xs text-[#8E2D2D] uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-[#B99668]" /> Android (Chrome / Edge)
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#3A2A22] bg-[#F2ECE3] p-3 rounded-lg border border-[#DDD0BF]">
              <li>1. Tap the 3 dots menu in the browser top-right</li>
              <li>2. Select &quot;Install app&quot; or &quot;Add to Home screen&quot;</li>
              <li>3. Tap &quot;Install&quot; to launch from your app drawer</li>
            </ol>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#EAE3D8] p-4 border-t border-[#DDD0BF] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#3A2A22] hover:bg-[#8E2D2D] text-[#FAF6F0] text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
