import React from 'react';
import { ActiveTab } from '../types';
import { Shield, BarChart2, Calendar, Radio, Swords, Trophy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; isNew?: boolean }[] = [
    {
      id: 'groups',
      label: 'GROUPS',
      icon: <Shield className="w-4 h-4" />
    },
    {
      id: 'fixtures',
      label: 'FIXTURES',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: 'stats',
      label: 'STATS',
      icon: <BarChart2 className="w-4 h-4" />
    },
    {
      id: 'compare',
      label: 'COMPARE',
      icon: <Swords className="w-4 h-4 text-[#F59E0B]" />,
      isNew: true
    },
    {
      id: 'predictions',
      label: 'PREDICTIONS',
      icon: <Trophy className="w-4 h-4 text-emerald-400" />,
      isNew: true
    },
    {
      id: 'lounges',
      label: 'VOICE LOUNGES',
      icon: <Radio className="w-4 h-4 animate-pulse text-[#38BDF8]" />
    }
  ];

  const handleTabClick = (tabId: ActiveTab) => {
    soundManager.playUiTab();
    onTabChange(tabId);
  };

  return (
    <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 my-5">
      <div className="bg-[#111D3A]/90 border border-[#38BDF8]/25 rounded-2xl p-1.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 sm:gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 min-w-[120px] py-2.5 px-2 sm:px-4 rounded-xl font-cinzel font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 relative ${
                isActive
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white shadow-[0_0_15px_rgba(56,189,248,0.35)] border border-[#38BDF8]'
                  : 'text-[#94A3B8] hover:bg-[#1C2541] hover:text-[#E2E8F0]'
              }`}
            >
              <span className={isActive ? 'text-[#38BDF8]' : 'text-[#64748B]'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {tab.isNew && !isActive && (
                <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] font-orbitron font-extrabold bg-[#0284C7] text-white">
                  LIVE
                </span>
              )}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#38BDF8] rounded-full shadow-[0_0_8px_#38BDF8]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};


