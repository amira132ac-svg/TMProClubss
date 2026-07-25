import React, { useState } from 'react';
import { Team, GroupName } from '../types';
import { Search, Shield } from 'lucide-react';
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
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#FAF6F0] border border-[#DDD0BF] p-4 sm:p-5 rounded-xl shadow-[0_2px_10px_rgba(58,42,34,0.05)]">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-extrabold tracking-wider text-[#3A2A22] flex items-center gap-2">
            <span className="text-[#8E2D2D]">⚔</span> RAGNAROK · GROUP STAGE
          </h2>
          <p className="text-xs sm:text-sm text-[#8A6444] font-inter mt-1 font-medium">
            28 Teams competing across 4 Battle Groups for glory & victory
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A6444]" />
            <input
              type="text"
              placeholder="Search team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F2ECE3] border border-[#DDD0BF] text-sm text-[#3A2A22] placeholder-[#B8B0A5] focus:outline-none focus:border-[#B99668] transition-colors"
            />
          </div>

          {/* Group Filter Buttons */}
          <div className="flex items-center bg-[#F2ECE3] p-1 rounded-lg border border-[#DDD0BF]">
            {['ALL', 'A', 'B', 'C', 'D'].map((grp) => (
              <button
                key={grp}
                onClick={() => setSelectedGroupFilter(grp)}
                className={`px-3 py-1.5 rounded-md font-orbitron text-xs font-bold transition-all ${
                  selectedGroupFilter === grp
                    ? 'bg-[#8E2D2D] text-[#FAF6F0] shadow-sm'
                    : 'text-[#3A2A22] hover:text-[#8E2D2D]'
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
              className="relative parchment-card parchment-card-hover rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(58,42,34,0.06)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <RuneCorners />
              {/* Group Card Header */}
              <div className="bg-[#EAE3D8] px-5 py-3.5 border-b border-[#DDD0BF] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#8E2D2D] text-[#FAF6F0] flex items-center justify-center font-orbitron font-extrabold text-xs shadow-sm">
                    {group}
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-[#3A2A22] tracking-wide">
                    GROUP {group}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-inter text-[#8A6444] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#8E2D2D]" />
                  <span>Qualification Top 2</span>
                </div>
              </div>

              {/* Group Standings Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm font-inter">
                  <thead>
                    <tr className="bg-[#F2ECE3] text-[#8A6444] border-b border-[#DDD0BF] font-orbitron text-[11px] uppercase tracking-wider">
                      <th className="py-2.5 pl-4 pr-2 text-center w-10">#</th>
                      <th className="py-2.5 px-3">Team</th>
                      <th className="py-2.5 px-2 text-center">P</th>
                      <th className="py-2.5 px-2 text-center">W</th>
                      <th className="py-2.5 px-2 text-center">D</th>
                      <th className="py-2.5 px-2 text-center">L</th>
                      <th className="py-2.5 px-2 text-center">GD</th>
                      <th className="py-2.5 pr-4 pl-2 text-center font-bold text-[#8E2D2D]">PTS</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#DDD0BF]/60">
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
                          className={`cursor-pointer transition-colors hover:bg-[#F2ECE3] ${
                            isQualifying ? 'bg-[#F5EFE6]' : ''
                          }`}
                        >
                          {/* Rank */}
                          <td className="py-3 pl-4 pr-2 text-center font-orbitron font-bold">
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                                rank === 1
                                  ? 'bg-[#B99668] text-white font-extrabold shadow-sm'
                                  : rank === 2
                                  ? 'bg-[#8E2D2D] text-white font-extrabold shadow-sm'
                                  : 'text-[#8A6444]'
                              }`}
                            >
                              {rank}
                            </span>
                          </td>

                          {/* Team Name - Strictly NO EMOJIS */}
                          <td className="py-3 px-3 font-bold text-[#3A2A22]">
                            <span className="hover:text-[#8E2D2D] transition-colors truncate max-w-[180px] sm:max-w-none tracking-wide">
                              {team.name}
                            </span>
                          </td>

                          {/* Played */}
                          <td className="py-3 px-2 text-center font-orbitron text-[#3A2A22]">
                            {team.played}
                          </td>

                          {/* Wins */}
                          <td className="py-3 px-2 text-center font-orbitron text-[#8A6444] font-medium">
                            {team.won}
                          </td>

                          {/* Draws */}
                          <td className="py-3 px-2 text-center font-orbitron text-[#8A6444]">
                            {team.drawn}
                          </td>

                          {/* Losses */}
                          <td className="py-3 px-2 text-center font-orbitron text-[#8A6444]">
                            {team.lost}
                          </td>

                          {/* Goal Difference */}
                          <td className="py-3 px-2 text-center font-orbitron font-semibold text-[#3A2A22]">
                            {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                          </td>

                          {/* Points */}
                          <td className="py-3 pr-4 pl-2 text-center font-orbitron text-base font-extrabold text-[#8E2D2D]">
                            {team.points}
                          </td>
                        </tr>
                      );
                    })}

                    {groupTeams.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-[#8A6444] font-inter text-xs">
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
