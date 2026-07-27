import React, { useState } from 'react';
import { Team, GroupName } from '../types';
import { Search } from 'lucide-react';
import { RuneCorners } from './RuneCorners';
import { soundManager } from '../utils/audio';

interface GroupsTabProps {
  teams: Team[];
  onSelectTeam: (team: Team) => void;
}

export const GroupsTab: React.FC<GroupsTabProps> = ({ teams, onSelectTeam }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('ALL');

  const groupNames: GroupName[] = ['A', 'B', 'C', 'D'];

  const getFilteredTeamsForGroup = (group: GroupName) => {
    return teams
      .filter((t) => t.group === group)
      .filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      });
  };

  const displayedGroups = selectedGroupFilter === 'ALL'
    ? groupNames
    : groupNames.filter((g) => g === selectedGroupFilter);

  return (
    <div className="animate-fade-in space-y-8">
      {/* Title & Search / Filter Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#111D3A] border border-[#38BDF8]/25 p-4 sm:p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-extrabold tracking-wider text-[#FFFFFF] flex items-center gap-2">
            <span className="text-[#38BDF8]">⚔</span> RAGNAROK · GROUP STAGE
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-inter mt-1 font-medium">
            28 Teams competing across 4 Battle Groups for glory & victory
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#38BDF8]" />
            <input
              type="text"
              placeholder="Search team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1C2541] border border-[#38BDF8]/25 text-sm text-[#E2E8F0] placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8] transition-colors"
            />
          </div>

          {/* Group Filter Buttons */}
          <div className="flex items-center bg-[#1C2541] p-1 rounded-xl border border-[#38BDF8]/25">
            {['ALL', 'A', 'B', 'C', 'D'].map((grp) => (
              <button
                key={grp}
                onClick={() => setSelectedGroupFilter(grp)}
                className={`px-3 py-1.5 rounded-lg font-orbitron text-xs font-bold transition-all ${
                  selectedGroupFilter === grp
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white shadow-[0_0_12px_rgba(56,189,248,0.3)] border border-[#38BDF8]/50'
                    : 'text-[#94A3B8] hover:text-[#E2E8F0]'
                }`}
              >
                {grp === 'ALL' ? 'ALL' : `GROUP ${grp}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayedGroups.map((group) => {
          const groupTeams = getFilteredTeamsForGroup(group);

          return (
            <div
              key={group}
              className="relative parchment-card parchment-card-hover rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <RuneCorners />
              {/* Group Card Header */}
              <div className="bg-[#1C2541] px-5 py-3.5 border-b border-[#38BDF8]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white flex items-center justify-center font-orbitron font-extrabold text-xs shadow-md border border-[#38BDF8]/40">
                    {group}
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-[#FFFFFF] tracking-wide">
                    GROUP {group}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-inter text-[#38BDF8] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Qualification Top 2</span>
                </div>
              </div>

              {/* Group Standings Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm font-inter">
                  <thead>
                    <tr className="bg-[#18223C] text-[#38BDF8] border-b border-[#38BDF8]/20 font-orbitron text-[11px] uppercase tracking-wider">
                      <th className="py-2.5 pl-4 pr-2 text-center w-10">#</th>
                      <th className="py-2.5 px-3">Team</th>
                      <th className="py-2.5 px-2 text-center">P</th>
                      <th className="py-2.5 px-2 text-center">W</th>
                      <th className="py-2.5 px-2 text-center">D</th>
                      <th className="py-2.5 px-2 text-center">L</th>
                      <th className="py-2.5 px-2 text-center">GD</th>
                      <th className="py-2.5 pr-4 pl-2 text-center font-bold text-[#F59E0B]">PTS</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#38BDF8]/10">
                    {groupTeams.map((team, index) => {
                      const rank = index + 1;
                      const isQualifying = rank <= 2;

                      return (
                        <tr
                          key={team.id}
                          onClick={() => {
                            soundManager.playUiClick();
                            onSelectTeam(team);
                          }}
                          className={`cursor-pointer transition-colors hover:bg-[#1C2541]/80 ${
                            isQualifying ? 'bg-[#152342]/60' : ''
                          }`}
                        >
                          {/* Rank */}
                          <td className="py-3 pl-4 pr-2 text-center font-orbitron font-bold">
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                                rank === 1
                                  ? 'bg-[#F59E0B] text-black font-extrabold shadow-md'
                                  : rank === 2
                                  ? 'bg-[#0284C7] text-white font-extrabold shadow-md'
                                  : 'text-[#64748B]'
                              }`}
                            >
                              {rank}
                            </span>
                          </td>

                          {/* Team Name - Strictly NO EMOJIS */}
                          <td className="py-3 px-3 font-bold text-[#E2E8F0]">
                            <span className="hover:text-[#38BDF8] transition-colors truncate max-w-[180px] sm:max-w-none tracking-wide">
                              {team.name}
                            </span>
                          </td>

                          {/* Played */}
                          <td className="py-3 px-2 text-center font-orbitron text-[#E2E8F0]">
                            {team.played}
                          </td>

                          {/* Wins */}
                          <td className="py-3 px-2 text-center font-orbitron text-[#10B981] font-semibold">
                            {team.won}
                          </td>

                          {/* Draws */}
                          <td className="py-3 px-2 text-center font-orbitron text-[#F59E0B]">
                            {team.drawn}
                          </td>

                          {/* Losses */}
                          <td className="py-3 px-2 text-center font-orbitron text-[#EF4444]">
                            {team.lost}
                          </td>

                          {/* Goal Difference */}
                          <td className="py-3 px-2 text-center font-orbitron font-semibold text-[#E2E8F0]">
                            {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                          </td>

                          {/* Points */}
                          <td className="py-3 pr-4 pl-2 text-center font-orbitron text-base font-extrabold text-[#F59E0B]">
                            {team.points}
                          </td>
                        </tr>
                      );
                    })}

                    {groupTeams.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-[#94A3B8] font-inter text-xs">
                          No teams match your search term
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

