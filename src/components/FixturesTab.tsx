import React, { useState } from 'react';
import { Match, GroupName } from '../types';
import { Clock, Edit3, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

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
  lastUpdatedMatchId
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'finished' | 'upcoming'>('ALL');
  const [selectedDay, setSelectedDay] = useState<string>('ALL');

  const groups: GroupName[] = ['A', 'B', 'C', 'D'];

  const dayOptions = [
    { id: 'ALL', label: 'همه روزها' },
    { id: 'Sunday', label: 'یکشنبه' },
    { id: 'Monday', label: 'دوشنبه' },
    { id: 'Tuesday', label: 'سه‌شنبه' },
    { id: 'TBD', label: 'نامشخص' }
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
      <div className="flex flex-col gap-4 bg-[#161B26] border border-white/10 p-4 sm:p-5 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-vazir text-xl sm:text-2xl font-bold text-[#E6E8EC] flex items-center gap-2">
              <span className="text-[#D4AF37]">⚔</span> برنامه و نتایج مسابقات
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-vazir mt-1 font-medium">
              جدول زمان‌بندی و نتایج زنده فصل ۴ سوپرلیگ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center bg-[#0D1117] p-1 rounded-xl border border-white/10 text-xs font-vazir font-medium">
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setStatusFilter('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'ALL' ? 'bg-[#21283B] text-[#D4AF37] font-bold shadow-sm' : 'text-[#94A3B8] hover:text-[#E6E8EC]'
                }`}
              >
                همه
              </button>
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setStatusFilter('finished');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'finished' ? 'bg-[#21283B] text-[#D4AF37] font-bold shadow-sm' : 'text-[#94A3B8] hover:text-[#E6E8EC]'
                }`}
              >
                نتایج
              </button>
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setStatusFilter('upcoming');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'upcoming' ? 'bg-[#21283B] text-[#D4AF37] font-bold shadow-sm' : 'text-[#94A3B8] hover:text-[#E6E8EC]'
                }`}
              >
                پیش‌رو
              </button>
            </div>

            {/* Group Selector */}
            <div className="flex items-center bg-[#0D1117] p-1 rounded-xl border border-white/10 text-xs font-vazir font-bold">
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setSelectedGroup('ALL');
                }}
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  selectedGroup === 'ALL' ? 'bg-[#D4AF37] text-[#0D1117] font-extrabold' : 'text-[#94A3B8] hover:text-[#E6E8EC]'
                }`}
              >
                همه
              </button>
              {groups.map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    soundManager.playUiClick();
                    setSelectedGroup(g);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                    selectedGroup === g ? 'bg-[#D4AF37] text-[#0D1117] font-extrabold' : 'text-[#94A3B8] hover:text-[#E6E8EC]'
                  }`}
                >
                  گروه {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Day Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/10 scrollbar-none">
          <span className="text-xs font-vazir font-bold text-[#D4AF37] shrink-0 ml-1">روز برگزاری:</span>
          {dayOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                soundManager.playUiClick();
                setSelectedDay(opt.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-vazir font-bold whitespace-nowrap transition-all ${
                selectedDay === opt.id
                  ? 'bg-[#21283B] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                  : 'bg-[#0D1117] border border-white/10 text-[#94A3B8] hover:text-[#E6E8EC]'
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
              className="bg-[#161B26] border border-white/10 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Group Header */}
              <div className="bg-[#121621] px-5 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#21283B] text-[#D4AF37] flex items-center justify-center font-vazir font-bold text-xs shadow-sm border border-[#D4AF37]/30">
                    {group}
                  </span>
                  <h3 className="font-vazir text-sm font-bold text-[#D4AF37]">
                    مسابقات گروه {group}
                  </h3>
                </div>
                <span className="text-xs font-vazir text-[#94A3B8] font-medium">
                  {groupMatches.length} مسابقه
                </span>
              </div>

              {/* Match List */}
              <div className="divide-y divide-white/5">
                {groupMatches.map((match) => {
                  const isFinished = match.status === 'finished';
                  const isLive = match.status === 'live';
                  const isRecentlyUpdated = lastUpdatedMatchId === match.id;

                  return (
                    <div
                      key={match.id}
                      onClick={() => {
                        if (isAdminMode) {
                          soundManager.playUiClick();
                          onEditMatch(match);
                        }
                      }}
                      className={`relative p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:bg-[#21283B]/40 ${
                        isAdminMode ? 'cursor-pointer border-r-2 border-r-[#D4AF37]' : ''
                      }`}
                    >
                      {/* Date / Round Info */}
                      <div className="flex items-center gap-2 text-xs font-vazir text-[#D4AF37] font-semibold w-full sm:w-32 justify-center sm:justify-start">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>دور {match.round}</span>
                      </div>

                      {/* Main Match Score / Vs */}
                      <div className="flex items-center justify-between gap-3 sm:gap-6 flex-1 w-full max-w-lg">
                        {/* Home Team */}
                        <div className="flex-1 text-left sm:text-right font-vazir font-bold text-sm sm:text-base text-[#E6E8EC] truncate">
                          {match.homeTeamName}
                        </div>

                        {/* Score Board */}
                        <div className="px-4 py-1.5 rounded-xl bg-[#0D1117] border border-white/10 flex items-center gap-2 font-vazir font-extrabold text-base min-w-[90px] justify-center shadow-inner">
                          {isFinished ? (
                            <div className="flex items-center gap-2 text-[#D4AF37]">
                              <span>{match.homeScore}</span>
                              <span className="text-[#64748B] font-normal text-xs">-</span>
                              <span>{match.awayScore}</span>
                            </div>
                          ) : isLive ? (
                            <div className="flex items-center gap-1.5 text-emerald-400 animate-pulse">
                              <span>{match.homeScore ?? 0}</span>
                              <span>:</span>
                              <span>{match.awayScore ?? 0}</span>
                              <span className="text-[10px] bg-emerald-500 text-[#0D1117] px-1 rounded font-bold">
                                زنده
                              </span>
                            </div>
                          ) : (
                            <div className="text-[#94A3B8] text-xs font-medium tracking-wide">
                              {match.time}
                            </div>
                          )}
                        </div>

                        {/* Away Team */}
                        <div className="flex-1 text-right sm:text-left font-vazir font-bold text-sm sm:text-base text-[#E6E8EC] truncate">
                          {match.awayTeamName}
                        </div>
                      </div>

                      {/* Status Badge / Edit Action */}
                      <div className="w-full sm:w-28 flex items-center justify-center sm:justify-end">
                        {isAdminMode ? (
                          <button
                            onClick={() => onEditMatch(match)}
                            className="px-2.5 py-1 rounded-lg bg-[#D4AF37] text-[#0D1117] font-vazir text-xs font-bold flex items-center gap-1 hover:brightness-110 transition-all shadow-sm"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>ویرایش</span>
                          </button>
                        ) : isFinished ? (
                          <span className="px-2.5 py-1 rounded-lg bg-[#21283B] border border-white/10 text-[#E6E8EC] font-vazir text-[11px] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>پایان یافته</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg bg-[#0D1117] text-[#94A3B8] font-vazir text-[11px] font-semibold border border-white/10">
                            برگذار نشده
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
          <div className="bg-[#161B26] border border-white/10 rounded-2xl p-8 text-center text-[#94A3B8] font-vazir text-xs">
            هیچ مسابقه‌ای برای فیلتر انتخاب شده یافت نشد
          </div>
        )}
      </div>
    </div>
  );
};

