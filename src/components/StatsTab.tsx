import React, { useState } from 'react';
import { Player } from '../types';
import { Target, Award, Search } from 'lucide-react';
import { RuneCorners } from './RuneCorners';

interface StatsTabProps {
  topScorers: Player[];
  topAssists: Player[];
}

export const StatsTab: React.FC<StatsTabProps> = ({ topScorers, topAssists }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filterPlayers = (players: Player[]) => {
    return players.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredScorers = filterPlayers(topScorers);
  const filteredAssists = filterPlayers(topAssists);

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#FAF6F0] border border-[#DDD0BF] p-4 sm:p-5 rounded-xl shadow-[0_2px_10px_rgba(58,42,34,0.05)]">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-[#3A2A22] flex items-center gap-2">
            <span className="text-[#8E2D2D]">⚔</span> PLAYER STATISTICS
          </h2>
          <p className="text-xs sm:text-sm text-[#8A6444] font-inter mt-1 font-medium">
            Top Warrior Performers of RAGNAROK Season 4
          </p>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A6444]" />
          <input
            type="text"
            placeholder="Search player or club..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F2ECE3] border border-[#DDD0BF] text-sm text-[#3A2A22] placeholder-[#B8B0A5] focus:outline-none focus:border-[#B99668] transition-colors"
          />
        </div>
      </div>

      {/* Two Side-By-Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CARD 1: Top Scorers */}
        <div className="relative parchment-card parchment-card-hover rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(58,42,34,0.06)]">
          <RuneCorners />
          <div className="bg-[#EAE3D8] px-5 py-4 border-b border-[#DDD0BF] flex items-center justify-between">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#3A2A22] tracking-wide flex items-center gap-2">
                Top Scorers
              </h3>
              <p className="text-[11px] text-[#8A6444] font-inter font-medium">Leading Goal Hunters</p>
            </div>
            <Award className="w-5 h-5 text-[#8E2D2D]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-inter">
              <thead>
                <tr className="bg-[#F2ECE3] text-[#8A6444] border-b border-[#DDD0BF] font-orbitron text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 pl-4 pr-2 text-center w-12">#</th>
                  <th className="py-2.5 px-3">Player</th>
                  <th className="py-2.5 px-3">Club</th>
                  <th className="py-2.5 pr-4 pl-2 text-center font-bold text-[#8E2D2D]">Goals</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#DDD0BF]/60">
                {filteredScorers.map((player, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={player.id}
                      className="hover:bg-[#F2ECE3] transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-3 pl-4 pr-2 text-center font-orbitron font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                            rank === 1
                              ? 'bg-[#B99668] text-white font-extrabold shadow-sm'
                              : rank === 2
                              ? 'bg-[#8E2D2D] text-white font-bold shadow-sm'
                              : 'text-[#8A6444]'
                          }`}
                        >
                          {rank}
                        </span>
                      </td>

                      {/* Player Name */}
                      <td className="py-3 px-3 font-semibold text-[#3A2A22]">
                        <div>
                          <div className="hover:text-[#8E2D2D] transition-colors">
                            {player.name}
                          </div>
                          <div className="text-[11px] text-[#8A6444] font-normal">
                            {player.position}
                          </div>
                        </div>
                      </td>

                      {/* Club */}
                      <td className="py-3 px-3 text-[#3A2A22] font-medium">
                        <span className="px-2 py-1 rounded bg-[#F2ECE3] border border-[#DDD0BF] text-xs">
                          {player.teamName}
                        </span>
                      </td>

                      {/* Goals */}
                      <td className="py-3 pr-4 pl-2 text-center font-orbitron text-base font-extrabold text-[#8E2D2D]">
                        {player.goals}
                      </td>
                    </tr>
                  );
                })}

                {filteredScorers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#8A6444] font-inter text-xs space-y-1">
                      <p className="font-semibold text-[#3A2A22]">No Player Goal Stats Recorded Yet</p>
                      <p className="text-[11px]">Goal statistics will appear here as matches are played in Season 4.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CARD 2: Top Assists */}
        <div className="relative parchment-card parchment-card-hover rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(58,42,34,0.06)]">
          <RuneCorners />
          <div className="bg-[#EAE3D8] px-5 py-4 border-b border-[#DDD0BF] flex items-center justify-between">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#3A2A22] tracking-wide flex items-center gap-2">
                Top Assists
              </h3>
              <p className="text-[11px] text-[#8A6444] font-inter font-medium">Master Playmakers</p>
            </div>
            <Target className="w-5 h-5 text-[#B99668]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-inter">
              <thead>
                <tr className="bg-[#F2ECE3] text-[#8A6444] border-b border-[#DDD0BF] font-orbitron text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 pl-4 pr-2 text-center w-12">#</th>
                  <th className="py-2.5 px-3">Player</th>
                  <th className="py-2.5 px-3">Club</th>
                  <th className="py-2.5 pr-4 pl-2 text-center font-bold text-[#B99668]">Assists</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#DDD0BF]/60">
                {filteredAssists.map((player, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={player.id}
                      className="hover:bg-[#F2ECE3] transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-3 pl-4 pr-2 text-center font-orbitron font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                            rank === 1
                              ? 'bg-[#B99668] text-white font-extrabold shadow-sm'
                              : rank === 2
                              ? 'bg-[#8E2D2D] text-white font-bold shadow-sm'
                              : 'text-[#8A6444]'
                          }`}
                        >
                          {rank}
                        </span>
                      </td>

                      {/* Player Name */}
                      <td className="py-3 px-3 font-semibold text-[#3A2A22]">
                        <div>
                          <div className="hover:text-[#8E2D2D] transition-colors">
                            {player.name}
                          </div>
                          <div className="text-[11px] text-[#8A6444] font-normal">
                            {player.position}
                          </div>
                        </div>
                      </td>

                      {/* Club */}
                      <td className="py-3 px-3 text-[#3A2A22] font-medium">
                        <span className="px-2 py-1 rounded bg-[#F2ECE3] border border-[#DDD0BF] text-xs">
                          {player.teamName}
                        </span>
                      </td>

                      {/* Assists */}
                      <td className="py-3 pr-4 pl-2 text-center font-orbitron text-base font-extrabold text-[#B99668]">
                        {player.assists}
                      </td>
                    </tr>
                  );
                })}

                {filteredAssists.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#8A6444] font-inter text-xs space-y-1">
                      <p className="font-semibold text-[#3A2A22]">No Player Assist Stats Recorded Yet</p>
                      <p className="text-[11px]">Assist statistics will appear here as matches are played in Season 4.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
