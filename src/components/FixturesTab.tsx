import React, { useState } from 'react';
import { Match, GroupName } from '../types';
import { Clock, Edit3, CheckCircle2 } from 'lucide-react';
import { RuneCorners } from './RuneCorners';
import { GoldenParticles } from './GoldenParticles';
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
    { id: 'ALL', label: 'All Days' },
    { id: 'Sunday', label: 'Sunday (یکشنبه)' },
    { id: 'Monday', label: 'Monday (دوشنبه)' },
    { id: 'Tuesday', label: 'Tuesday (سه‌شنبه)' },
    { id: 'TBD', label: 'TBD' }
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
    <div className="animate-fade-in space-y-8">
      {/* Header & Filters */}
      <div className="flex flex-col gap-4 bg-[#111D3A] border border-[#38BDF8]/25 p-4 sm:p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-[#FFFFFF] flex items-center gap-2">
              <span className="text-[#38BDF8]">⚔</span> FIXTURES & RESULTS
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-inter mt-1 font-medium">
              Season 4 Match Schedule and Live Battle Scores
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center bg-[#1C2541] p-1 rounded-xl border border-[#38BDF8]/25 text-xs font-inter font-medium">
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setStatusFilter('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'ALL' ? 'bg-[#0284C7] text-white font-bold shadow-sm' : 'text-[#94A3B8] hover:text-[#E2E8F0]'
                }`}
              >
                All Matches
              </button>
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setStatusFilter('finished');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'finished' ? 'bg-[#0284C7] text-white font-bold shadow-sm' : 'text-[#94A3B8] hover:text-[#E2E8F0]'
                }`}
              >
                Results
              </button>
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setStatusFilter('upcoming');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'upcoming' ? 'bg-[#0284C7] text-white font-bold shadow-sm' : 'text-[#94A3B8] hover:text-[#E2E8F0]'
                }`}
              >
                Upcoming
              </button>
            </div>

            {/* Group Selector */}
            <div className="flex items-center bg-[#1C2541] p-1 rounded-xl border border-[#38BDF8]/25 text-xs font-orbitron font-bold">
              <button
                onClick={() => {
                  soundManager.playUiClick();
                  setSelectedGroup('ALL');
                }}
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  selectedGroup === 'ALL' ? 'bg-[#F59E0B] text-black font-extrabold' : 'text-[#94A3B8] hover:text-[#E2E8F0]'
                }`}
              >
                ALL
              </button>
              {groups.map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    soundManager.playUiClick();
                    setSelectedGroup(g);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                    selectedGroup === g ? 'bg-[#F59E0B] text-black font-extrabold' : 'text-[#94A3B8] hover:text-[#E2E8F0]'
                  }`}
                >
                  G-{g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Day Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#38BDF8]/15 scrollbar-none">
          <span className="text-xs font-orbitron font-bold text-[#38BDF8] shrink-0 mr-1">Match Day:</span>
          {dayOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                soundManager.playUiClick();
                setSelectedDay(opt.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-inter font-bold whitespace-nowrap transition-all ${
                selectedDay === opt.id
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white shadow-md border border-[#38BDF8]/50'
                  : 'bg-[#1C2541] border border-[#38BDF8]/20 text-[#94A3B8] hover:bg-[#283655] hover:text-[#E2E8F0]'
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
              className="relative parchment-card parchment-card-hover rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            >
              <RuneCorners />
              {/* Group Header */}
              <div className="bg-[#1C2541] px-5 py-3 border-b border-[#38BDF8]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white flex items-center justify-center font-orbitron font-bold text-xs shadow-md border border-[#38BDF8]/30">
                    {group}
                  </span>
                  <h3 className="font-cinzel text-base font-bold text-[#FFFFFF]">
                    GROUP {group} FIXTURES
                  </h3>
                </div>
                <span className="text-xs font-orbitron text-[#38BDF8] font-semibold">
                  {groupMatches.length} Matches
                </span>
              </div>

              {/* Match List */}
              <div className="divide-y divide-[#38BDF8]/10">
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
                      className={`relative p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:bg-[#1C2541]/70 ${
                        isAdminMode ? 'cursor-pointer border-l-2 border-l-[#F59E0B]' : ''
                      } ${isRecentlyUpdated ? 'animate-gold-pulse bg-[#1E293B]' : ''}`}
                    >
                      {/* Golden Particle Burst Effect on Score Update */}
                      {isRecentlyUpdated && <GoldenParticles />}
                      {/* Date / Round Info */}
                      <div className="flex items-center gap-2 text-xs font-orbitron text-[#38BDF8] font-semibold w-full sm:w-32 justify-center sm:justify-start">
                        <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Round {match.round}</span>
                      </div>

                      {/* Main Match Score / Vs */}
                      <div className="flex items-center justify-center gap-3 sm:gap-6 flex-1 w-full max-w-lg">
                        {/* Home Team */}
                        <div className="flex-1 text-right font-cinzel font-bold text-sm sm:text-base text-[#E2E8F0] truncate">
                          {match.homeTeamName}
                        </div>

                        {/* Score Board */}
                        <div className="px-3.5 py-1.5 rounded-xl bg-[#1C2541] border border-[#38BDF8]/30 flex items-center gap-2 font-orbitron font-extrabold text-base min-w-[90px] justify-center shadow-inner">
                          {isFinished ? (
                            <div className="flex items-center gap-2 text-[#F59E0B]">
                              <span>{match.homeScore}</span>
                              <span className="text-[#64748B] font-normal text-xs">-</span>
                              <span>{match.awayScore}</span>
                            </div>
                          ) : isLive ? (
                            <div className="flex items-center gap-1.5 text-[#38BDF8] animate-pulse">
                              <span>{match.homeScore ?? 0}</span>
                              <span>:</span>
                              <span>{match.awayScore ?? 0}</span>
                              <span className="text-[10px] bg-[#0284C7] text-white px-1 rounded uppercase font-bold">
                                LIVE
                              </span>
                            </div>
                          ) : (
                            <div className="text-[#94A3B8] text-xs font-medium tracking-wide">
                              {match.time}
                            </div>
                          )}
                        </div>

                        {/* Away Team */}
                        <div className="flex-1 text-left font-cinzel font-bold text-sm sm:text-base text-[#E2E8F0] truncate">
                          {match.awayTeamName}
                        </div>
                      </div>

                      {/* Status Badge / Edit Action */}
                      <div className="w-full sm:w-28 flex items-center justify-center sm:justify-end">
                        {isAdminMode ? (
                          <button
                            onClick={() => onEditMatch(match)}
                            className="px-2.5 py-1 rounded-lg bg-[#F59E0B] text-black font-inter text-xs font-bold flex items-center gap-1 hover:bg-[#D97706] transition-all shadow-sm"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit Score</span>
                          </button>
                        ) : isFinished ? (
                          <span className="px-2.5 py-1 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] font-orbitron text-[11px] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                            <span>FT</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg bg-[#1C2541] text-[#94A3B8] font-orbitron text-[11px] font-semibold border border-[#38BDF8]/15">
                            UPCOMING
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
          <div className="bg-[#111D3A] border border-[#38BDF8]/20 rounded-2xl p-8 text-center text-[#94A3B8] font-inter">
            No matches found for the selected filter
          </div>
        )}
      </div>
    </div>
  );
};

