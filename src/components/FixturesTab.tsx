import React, { useState } from 'react';
import { Match, GroupName } from '../types';
import { Clock, Edit3, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface FixturesTabProps {
  matches: Match[];
  isAdminMode: boolean;
  onEditMatch: (match: Match) => void;
  lastUpdatedMatchId?: string | null;
}

export const FixturesTab: React.FC<FixturesTabProps> = ({
  matches,
  isAdminMode,
  onEditMatch,
}) => {
  const { t } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'finished' | 'upcoming'>('ALL');
  const [selectedDay, setSelectedDay] = useState<string>('ALL');

  const groups: GroupName[] = ['A', 'B', 'C', 'D'];

  const dayOptions = [
    { id: 'ALL', label: t.allDays },
    { id: 'Saturday', label: t.daySaturday || 'Saturday' },
    { id: 'Sunday', label: t.daySunday },
    { id: 'Monday', label: t.dayMonday },
    { id: 'Tuesday', label: t.dayTuesday },
    { id: 'TBD', label: t.dayTBD }
  ];

  const filteredMatches = matches.filter((match) => {
    const matchesGroup = selectedGroup === 'ALL' || match.group === selectedGroup;
    const matchesStatus = statusFilter === 'ALL' || match.status === statusFilter;
    const matchesDay = selectedDay === 'ALL' || match.day === selectedDay || match.date === selectedDay;
    return matchesGroup && matchesStatus && matchesDay;
  });

  const getGroupMatches = (group: GroupName) => {
    return filteredMatches.filter((m) => m.group === group);
  };

  const displayedGroups = selectedGroup === 'ALL' ? groups : [selectedGroup as GroupName];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col gap-4 bg-[#10173A]/90 border border-[#38BDF8]/25 p-4 sm:p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-vazir text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-[#38BDF8]">⚔</span> {t.fixturesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-vazir mt-1 font-medium">
              {t.fixturesSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center bg-[#0B112C] p-1 rounded-xl border border-[#38BDF8]/20 text-xs font-vazir font-medium">
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setStatusFilter('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'ALL' ? 'bg-[#1B2960] text-[#38BDF8] font-bold shadow-sm' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {t.allStatus}
              </button>
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setStatusFilter('finished');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'finished' ? 'bg-[#1B2960] text-[#38BDF8] font-bold shadow-sm' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {t.resultsStatus}
              </button>
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setStatusFilter('upcoming');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'upcoming' ? 'bg-[#1B2960] text-[#38BDF8] font-bold shadow-sm' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {t.upcomingStatus}
              </button>
            </div>

            {/* Group Selector */}
            <div className="flex items-center bg-[#0B112C] p-1 rounded-xl border border-[#38BDF8]/20 text-xs font-vazir font-bold">
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setSelectedGroup('ALL');
                }}
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  selectedGroup === 'ALL' ? 'bg-[#38BDF8] text-[#0A0E2A] font-extrabold' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {t.allGroups}
              </button>
              {groups.map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    soundManager.playUiClick();
                    setSelectedGroup(g);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                    selectedGroup === g ? 'bg-[#38BDF8] text-[#0A0E2A] font-extrabold' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {t.groupLabel} {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Day Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#38BDF8]/20 scrollbar-none">
          <span className="text-xs font-vazir font-bold text-[#38BDF8] shrink-0 ml-1">{t.matchDay}</span>
          {dayOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                soundManager.playUiClick();
                setSelectedDay(opt.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-vazir font-bold whitespace-nowrap transition-all ${
                selectedDay === opt.id
                  ? 'bg-[#1B2960] text-[#38BDF8] border border-[#38BDF8]/50 shadow-sm'
                  : 'bg-[#0B112C] border border-[#38BDF8]/20 text-[#94A3B8] hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fixture Cards by Group */}
      <div className="space-y-6">
        {displayedGroups.map((group) => {
          const groupMatches = getGroupMatches(group);
          if (groupMatches.length === 0) return null;

          return (
            <div
              key={group}
              className="bg-[#10173A]/90 border border-[#38BDF8]/25 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              {/* Group Header */}
              <div className="bg-[#0B112C] px-5 py-3 border-b border-[#38BDF8]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#1B2960] text-[#38BDF8] flex items-center justify-center font-vazir font-bold text-xs shadow-sm border border-[#38BDF8]/40">
                    {group}
                  </span>
                  <h3 className="font-vazir text-sm font-bold text-[#38BDF8]">
                    {t.groupLabel} {group}
                  </h3>
                </div>
                <span className="text-xs font-vazir text-[#94A3B8] font-medium">
                  {groupMatches.length}
                </span>
              </div>

              {/* Match List */}
              <div className="divide-y divide-[#38BDF8]/10">
                {groupMatches.map((match) => {
                  const isFinished = match.status === 'finished';
                  const isLive = match.status === 'live';

                  return (
                    <div
                      key={match.id}
                      onClick={() => {
                        if (isAdminMode) {
                          soundManager.playUiClick();
                          onEditMatch(match);
                        }
                      }}
                      className={`relative p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:bg-[#1B2960]/50 ${
                        isAdminMode ? 'cursor-pointer border-r-2 border-r-[#38BDF8]' : ''
                      }`}
                    >
                      {/* Date / Round Info */}
                      <div className="flex items-center gap-2 text-xs font-vazir text-[#38BDF8] font-semibold w-full sm:w-32 justify-center sm:justify-start">
                        <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{t.round} {match.round}</span>
                      </div>

                      {/* Main Match Score / Vs */}
                      <div className="flex items-center justify-between gap-3 sm:gap-6 flex-1 w-full max-w-lg">
                        {/* Home Team */}
                        <div className="flex-1 text-left sm:text-right font-vazir font-bold text-sm sm:text-base text-white truncate">
                          {match.homeTeamName}
                        </div>

                        {/* Score Board */}
                        <div className="px-4 py-1.5 rounded-xl bg-[#0B112C] border border-[#38BDF8]/30 flex items-center gap-2 font-vazir font-extrabold text-base min-w-[90px] justify-center shadow-inner">
                          {isFinished ? (
                            <div className="flex items-center gap-2 text-[#F59E0B]">
                              <span>{match.homeScore}</span>
                              <span className="text-[#64748B] font-normal text-xs">-</span>
                              <span>{match.awayScore}</span>
                            </div>
                          ) : isLive ? (
                            <div className="flex items-center gap-1.5 text-emerald-400 animate-pulse">
                              <span>{match.homeScore ?? 0}</span>
                              <span>:</span>
                              <span>{match.awayScore ?? 0}</span>
                              <span className="text-[10px] bg-emerald-500 text-[#0A0E2A] px-1 rounded font-bold">
                                {t.live}
                              </span>
                            </div>
                          ) : (
                            <div className="text-[#38BDF8] text-xs font-bold tracking-wide">
                              {match.time}
                            </div>
                          )}
                        </div>

                        {/* Away Team */}
                        <div className="flex-1 text-right sm:text-left font-vazir font-bold text-sm sm:text-base text-white truncate">
                          {match.awayTeamName}
                        </div>
                      </div>

                      {/* Status Badge / Edit Action */}
                      <div className="w-full sm:w-28 flex items-center justify-center sm:justify-end">
                        {isAdminMode ? (
                          <button
                            onClick={() => onEditMatch(match)}
                            className="px-2.5 py-1 rounded-lg bg-[#38BDF8] text-[#0A0E2A] font-vazir text-xs font-bold flex items-center gap-1 hover:brightness-110 transition-all shadow-sm"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        ) : isFinished ? (
                          <span className="px-2.5 py-1 rounded-lg bg-[#1B2960] border border-[#38BDF8]/30 text-white font-vazir text-[11px] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>{t.finished}</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg bg-[#0B112C] text-[#94A3B8] font-vazir text-[11px] font-semibold border border-[#38BDF8]/20">
                            {t.notPlayed}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredMatches.length === 0 && (
          <div className="bg-[#10173A]/90 border border-[#38BDF8]/25 rounded-2xl p-8 text-center text-[#94A3B8] font-vazir text-xs">
            {t.noMatches}
          </div>
        )}
      </div>
    </div>
  );
};


