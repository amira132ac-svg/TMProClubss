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

  const groups: GroupName[] = ['A', 'B', 'C', 'D'];

  const filteredMatches = matches.filter((match) => {
    const matchesGroup = selectedGroup === 'ALL' || match.group === selectedGroup;
    const matchesStatus = statusFilter === 'ALL' || match.status === statusFilter;
    return matchesGroup && matchesStatus;
  });

  const getGroupMatches = (group: GroupName) => {
    return filteredMatches.filter((m) => m.group === group);
  };

  const displayedGroups = selectedGroup === 'ALL' ? groups : [selectedGroup as GroupName];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#FAF6F0] border border-[#DDD0BF] p-4 sm:p-5 rounded-xl shadow-[0_2px_10px_rgba(58,42,34,0.05)]">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-[#3A2A22] flex items-center gap-2">
            <span className="text-[#8E2D2D]">⚔</span> FIXTURES & RESULTS
          </h2>
          <p className="text-xs sm:text-sm text-[#8A6444] font-inter mt-1 font-medium">
            Season 4 Match Schedule and Live Battle Scores
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center bg-[#F2ECE3] p-1 rounded-lg border border-[#DDD0BF] text-xs font-inter font-medium">
            <button
              onClick={() => {
                soundManager.playUiClick();
                setStatusFilter('ALL');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                statusFilter === 'ALL' ? 'bg-[#8E2D2D] text-[#FAF6F0] font-bold' : 'text-[#3A2A22] hover:text-[#8E2D2D]'
              }`}
            >
              All Matches
            </button>
            <button
              onClick={() => {
                soundManager.playUiClick();
                setStatusFilter('finished');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                statusFilter === 'finished' ? 'bg-[#8E2D2D] text-[#FAF6F0] font-bold' : 'text-[#3A2A22] hover:text-[#8E2D2D]'
              }`}
            >
              Results
            </button>
            <button
              onClick={() => {
                soundManager.playUiClick();
                setStatusFilter('upcoming');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                statusFilter === 'upcoming' ? 'bg-[#8E2D2D] text-[#FAF6F0] font-bold' : 'text-[#3A2A22] hover:text-[#8E2D2D]'
              }`}
            >
              Upcoming
            </button>
          </div>

          {/* Group Selector */}
          <div className="flex items-center bg-[#F2ECE3] p-1 rounded-lg border border-[#DDD0BF] text-xs font-orbitron font-bold">
            <button
              onClick={() => {
                soundManager.playUiClick();
                setSelectedGroup('ALL');
              }}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                selectedGroup === 'ALL' ? 'bg-[#B99668] text-white' : 'text-[#3A2A22] hover:text-[#8E2D2D]'
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
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  selectedGroup === g ? 'bg-[#B99668] text-white' : 'text-[#3A2A22] hover:text-[#8E2D2D]'
                }`}
              >
                G-{g}
              </button>
            ))}
          </div>
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
              className="relative parchment-card parchment-card-hover rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(58,42,34,0.06)]"
            >
              <RuneCorners />
              {/* Group Header */}
              <div className="bg-[#EAE3D8] px-5 py-3 border-b border-[#DDD0BF] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded bg-[#8E2D2D] text-[#FAF6F0] flex items-center justify-center font-orbitron font-bold text-xs shadow-sm">
                    {group}
                  </span>
                  <h3 className="font-cinzel text-base font-bold text-[#3A2A22]">
                    GROUP {group} FIXTURES
                  </h3>
                </div>
                <span className="text-xs font-orbitron text-[#8A6444] font-semibold">
                  {groupMatches.length} Matches
                </span>
              </div>

              {/* Match List */}
              <div className="divide-y divide-[#DDD0BF]/60">
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
                      className={`relative p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:bg-[#F2ECE3] ${
                        isAdminMode ? 'cursor-pointer border-l-2 border-l-[#B99668]' : ''
                      } ${isRecentlyUpdated ? 'animate-gold-pulse bg-[#FAF0D9]' : ''}`}
                    >
                      {/* Golden Particle Burst Effect on Score Update */}
                      {isRecentlyUpdated && <GoldenParticles />}
                      {/* Date / Round Info */}
                      <div className="flex items-center gap-2 text-xs font-orbitron text-[#8A6444] font-semibold w-full sm:w-32 justify-center sm:justify-start">
                        <Clock className="w-3.5 h-3.5 text-[#B99668]" />
                        <span>Round {match.round}</span>
                      </div>

                      {/* Main Match Score / Vs */}
                      <div className="flex items-center justify-center gap-3 sm:gap-6 flex-1 w-full max-w-lg">
                        {/* Home Team */}
                        <div className="flex-1 text-right font-cinzel font-bold text-sm sm:text-base text-[#3A2A22] truncate">
                          {match.homeTeamName}
                        </div>

                        {/* Score Board */}
                        <div className="px-3.5 py-1.5 rounded-lg bg-[#F2ECE3] border border-[#DDD0BF] flex items-center gap-2 font-orbitron font-extrabold text-base min-w-[90px] justify-center">
                          {isFinished ? (
                            <div className="flex items-center gap-2 text-[#8E2D2D]">
                              <span>{match.homeScore}</span>
                              <span className="text-[#8A6444] font-normal text-xs">-</span>
                              <span>{match.awayScore}</span>
                            </div>
                          ) : isLive ? (
                            <div className="flex items-center gap-1.5 text-[#8E2D2D] animate-pulse">
                              <span>{match.homeScore ?? 0}</span>
                              <span>:</span>
                              <span>{match.awayScore ?? 0}</span>
                              <span className="text-[10px] bg-[#8E2D2D] text-[#FAF6F0] px-1 rounded uppercase font-bold">
                                LIVE
                              </span>
                            </div>
                          ) : (
                            <div className="text-[#8A6444] text-xs font-medium tracking-wide">
                              {match.time}
                            </div>
                          )}
                        </div>

                        {/* Away Team */}
                        <div className="flex-1 text-left font-cinzel font-bold text-sm sm:text-base text-[#3A2A22] truncate">
                          {match.awayTeamName}
                        </div>
                      </div>

                      {/* Status Badge / Edit Action */}
                      <div className="w-full sm:w-28 flex items-center justify-center sm:justify-end">
                        {isAdminMode ? (
                          <button
                            onClick={() => onEditMatch(match)}
                            className="px-2.5 py-1 rounded bg-[#B99668] text-white font-inter text-xs font-bold flex items-center gap-1 hover:bg-[#8A6444] transition-all shadow-sm"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit Score</span>
                          </button>
                        ) : isFinished ? (
                          <span className="px-2.5 py-1 rounded bg-[#8E2D2D]/10 border border-[#8E2D2D]/30 text-[#8E2D2D] font-orbitron text-[11px] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>FT</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded bg-[#EAE3D8] text-[#8A6444] font-orbitron text-[11px] font-semibold">
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
          <div className="bg-[#FAF6F0] border border-[#DDD0BF] rounded-xl p-8 text-center text-[#8A6444] font-inter">
            No matches found for the selected filter
          </div>
        )}
      </div>
    </div>
  );
};
