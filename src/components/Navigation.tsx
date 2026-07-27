import React from 'react';
import { ActiveTab } from '../types';
import { Shield, BarChart2, Calendar, Swords, Trophy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'groups',
      label: 'جدول گروه‌ها',
      icon: <Shield className="w-4 h-4" />
    },
    {
      id: 'fixtures',
      label: 'برنامه مسابقات',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: 'stats',
      label: 'آمار بازیکنان',
      icon: <BarChart2 className="w-4 h-4" />
    },
    {
      id: 'compare',
      label: 'مقایسه تیم‌ها',
      icon: <Swords className="w-4 h-4" />,
      badge: 'H2H'
    },
    {
      id: 'predictions',
      label: 'پیش‌بینی و لیدربرد',
      icon: <Trophy className="w-4 h-4" />,
      badge: 'LIVE'
    }
  ];

  const handleTabClick = (tabId: ActiveTab) => {
    soundManager.playUiTab();
    onTabChange(tabId);
  };

  return (
    <nav className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 my-4">
      <div className="bg-[#10173A]/90 border border-[#38BDF8]/25 rounded-2xl p-1.5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`py-2.5 px-2 rounded-xl font-vazir font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-1.5 transition-all duration-200 relative shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-[#1B2960] to-[#0F1B4A] text-white shadow-[0_0_20px_rgba(56,189,248,0.25)] border border-[#38BDF8]/60'
                  : 'text-[#94A3B8] hover:bg-[#152052]/60 hover:text-white border border-transparent'
              }`}
            >
              <span className={isActive ? 'text-[#38BDF8]' : 'text-[#64748B]'}>
                {tab.icon}
              </span>
              <span className="truncate">{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-extrabold ${
                  tab.id === 'predictions' 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}>
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#38BDF8] rounded-full shadow-[0_0_10px_#38BDF8]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};



