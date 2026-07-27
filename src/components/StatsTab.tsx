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
    <div className="animate-fade-in space-y-6">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#111D3A] border border-[#38BDF8]/25 p-4 sm:p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-[#FFFFFF] flex items-center gap-2">
            <span className="text-[#38BDF8]">⚔</span> PLAYER STATISTICS
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-inter mt-1 font-medium">
            Top Warrior Performers of RAGNAROK Season 4
          </p>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#38BDF8]" />
          <input
            type="text"
            placeholder="Search player or club..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1C2541] border border-[#38BDF8]/25 text-sm text-[#E2E8F0] placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8] transition-colors"
          />
        </div>
      </div>

      {/* Announcement Notice Box */}
      <div className="bg-[#1C2541] border border-[#F59E0B]/50 rounded-2xl p-4 text-[#E2E8F0] flex items-center gap-3 shadow-[0_4px_20px_rgba(245,158,11,0.15)]">
        <span className="text-lg shrink-0">⚔️</span>
        <p className="text-xs sm:text-sm font-inter font-semibold tracking-wide text-[#F59E0B]">
          Scorers have not been recorded yet — Stats will be updated after each matchday
        </p>
      </div>

      {/* Two Side-By-Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CARD 1: Top Scorers */}
        <div className="relative parchment-card parchment-card-hover rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
          <RuneCorners />
          <div className="bg-[#1C2541] px-5 py-4 border-b border-[#38BDF8]/20 flex items-center justify-between">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#FFFFFF] tracking-wide flex items-center gap-2">
                Top Scorers
              </h3>
              <p className="text-[11px] text-[#94A3B8] font-inter font-medium">Leading Goal Hunters</p>
            </div>
            <Award className="w-5 h-5 text-[#F59E0B]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-inter">
              <thead>
                <tr className="bg-[#18223C] text-[#38BDF8] border-b border-[#38BDF8]/20 font-orbitron text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 pl-4 pr-2 text-center w-12">#</th>
                  <th className="py-2.5 px-3">Player</th>
                  <th className="py-2.5 px-3">Club</th>
                  <th className="py-2.5 pr-4 pl-2 text-center font-bold text-[#F59E0B]">Goals</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#38BDF8]/10">
                {filteredScorers.map((player, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={player.id}
                      className="hover:bg-[#1C2541]/70 transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-3 pl-4 pr-2 text-center font-orbitron font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                            rank === 1
                              ? 'bg-[#F59E0B] text-black font-extrabold shadow-md'
                              : rank === 2
                              ? 'bg-[#0284C7] text-white font-bold shadow-md'
                              : 'text-[#64748B]'
                          }`}
                        >
                          {rank}
                        </span>
                      </td>

                      {/* Player Name */}
                      <td className="py-3 px-3 font-semibold text-[#E2E8F0]">
                        <div>
                          <div className="hover:text-[#38BDF8] transition-colors">
                            {player.name}
                          </div>
                          <div className="text-[11px] text-[#94A3B8] font-normal">
                            {player.position}
                          </div>
                        </div>
                      </td>

                      {/* Club */}
                      <td className="py-3 px-3 text-[#E2E8F0] font-medium">
                        <span className="px-2 py-1 rounded-lg bg-[#1C2541] border border-[#38BDF8]/20 text-xs text-[#38BDF8]">
                          {player.teamName}
                        </span>
                      </td>

                      {/* Goals */}
                      <td className="py-3 pr-4 pl-2 text-center font-orbitron text-base font-extrabold text-[#F59E0B]">
                        {player.goals}
                      </td>
                    </tr>
                  );
                })}

                {filteredScorers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#94A3B8] font-inter text-xs space-y-1">
                      <p className="font-semibold text-[#E2E8F0]">No Player Goal Stats Recorded Yet</p>
                      <p className="text-[11px]">Goal statistics will appear here as matches are played in Season 4.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CARD 2: Top Assists */}
        <div className="relative parchment-card parchment-card-hover rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
          <RuneCorners />
          <div className="bg-[#1C2541] px-5 py-4 border-b border-[#38BDF8]/20 flex items-center justify-between">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#FFFFFF] tracking-wide flex items-center gap-2">
                Top Assists
              </h3>
              <p className="text-[11px] text-[#94A3B8] font-inter font-medium">Master Playmakers</p>
            </div>
            <Target className="w-5 h-5 text-[#38BDF8]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-inter">
              <thead>
                <tr className="bg-[#18223C] text-[#38BDF8] border-b border-[#38BDF8]/20 font-orbitron text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 pl-4 pr-2 text-center w-12">#</th>
                  <th className="py-2.5 px-3">Player</th>
                  <th className="py-2.5 px-3">Club</th>
                  <th className="py-2.5 pr-4 pl-2 text-center font-bold text-[#38BDF8]">Assists</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#38BDF8]/10">
                {filteredAssists.map((player, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={player.id}
                      className="hover:bg-[#1C2541]/70 transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-3 pl-4 pr-2 text-center font-orbitron font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                            rank === 1
                              ? 'bg-[#F59E0B] text-black font-extrabold shadow-md'
                              : rank === 2
                              ? 'bg-[#0284C7] text-white font-bold shadow-md'
                              : 'text-[#64748B]'
                          }`}
                        >
                          {rank}
                        </span>
                      </td>

                      {/* Player Name */}
                      <td className="py-3 px-3 font-semibold text-[#E2E8F0]">
                        <div>
                          <div className="hover:text-[#38BDF8] transition-colors">
                            {player.name}
                          </div>
                          <div className="text-[11px] text-[#94A3B8] font-normal">
                            {player.position}
                          </div>
                        </div>
                      </td>

                      {/* Club */}
                      <td className="py-3 px-3 text-[#E2E8F0] font-medium">
                        <span className="px-2 py-1 rounded-lg bg-[#1C2541] border border-[#38BDF8]/20 text-xs text-[#38BDF8]">
                          {player.teamName}
                        </span>
                      </td>

                      {/* Assists */}
                      <td className="py-3 pr-4 pl-2 text-center font-orbitron text-base font-extrabold text-[#38BDF8]">
                        {player.assists}
                      </td>
                    </tr>
                  );
                })}

                {filteredAssists.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#94A3B8] font-inter text-xs space-y-1">
                      <p className="font-semibold text-[#E2E8F0]">No Player Assist Stats Recorded Yet</p>
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

