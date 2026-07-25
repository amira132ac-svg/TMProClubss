import React from 'react';
import { ActiveTab } from '../types';
import { Shield, BarChart2, Calendar, Radio } from 'lucide-react';
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
      id: 'stats',
      label: 'STATS',
      icon: <BarChart2 className="w-4 h-4" />
    },
    {
      id: 'fixtures',
      label: 'FIXTURES',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: 'lounges',
      label: 'VOICE LOUNGES',
      icon: <Radio className="w-4 h-4 animate-pulse text-[#B99668]" />,
      isNew: true
    }
  ];

  const handleTabClick = (tabId: ActiveTab) => {
    soundManager.playUiTab();
    onTabChange(tabId);
  };

  return (
    <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 my-5">
      <div className="bg-[#FAF6F0] border border-[#DDD0BF] rounded-xl p-1.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1 sm:gap-2 shadow-[0_2px_10px_rgba(58,42,34,0.06)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 min-w-[120px] py-2.5 px-2 sm:px-4 rounded-lg font-cinzel font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 relative ${
                isActive
                  ? 'bg-[#8E2D2D] text-[#FAF6F0] shadow-md border border-[#B99668]/50'
                  : 'text-[#3A2A22] hover:bg-[#F2ECE3] hover:text-[#8E2D2D]'
              }`}
            >
              <span className={isActive ? 'text-[#B99668]' : 'text-[#8A6444]'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {tab.isNew && !isActive && (
                <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] font-orbitron font-extrabold bg-[#8E2D2D] text-[#FAF6F0]">
                  LIVE
                </span>
              )}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#B99668] rounded-full shadow-sm" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

