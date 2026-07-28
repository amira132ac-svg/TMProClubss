import React, { useState } from 'react';
import { Player } from '../types';
import { Target, Award, Search, Users, Shield } from 'lucide-react';
import { initialTeamPlayerStats } from '../data/initialData';

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

  const filteredTeamsStats = initialTeamPlayerStats.filter(
    (ts) =>
      ts.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ts.farsiName.includes(searchTerm) ||
      ts.players.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#10173A]/90 border border-[#38BDF8]/25 p-4 sm:p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
        <div>
          <h2 className="font-vazir text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-[#38BDF8]">⚔</span> آمار و جدول گلزنان / پاس گل
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-vazir mt-1 font-medium">
            برترین گلزنان، پاسورها و عملکرد کلی تیم‌های فصل ۴ سوپرلیگ
          </p>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#38BDF8]" />
          <input
            type="text"
            placeholder="جستجوی نام بازیکن یا باشگاه..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B112C] border border-[#38BDF8]/20 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8] transition-colors font-vazir"
          />
        </div>
      </div>

      {/* Announcement Notice Box */}
      <div className="bg-[#10173A]/90 border border-[#38BDF8]/40 rounded-2xl p-4 text-white flex items-center gap-3 shadow-md">
        <span className="text-lg shrink-0">⚽</span>
        <p className="text-xs sm:text-sm font-vazir font-semibold text-[#38BDF8]">
          آمار گلزنان، پاسورها و عملکرد کلی تیم‌ها به‌روزرسانی شد. ✨
        </p>
      </div>

      {/* Two Side-By-Side Cards: Top Scorers & Top Assists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CARD 1: Top Scorers */}
        <div className="bg-[#10173A]/90 border border-[#38BDF8]/25 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-[#0B112C] px-5 py-4 border-b border-[#38BDF8]/20 flex items-center justify-between">
            <div>
              <h3 className="font-vazir text-base font-bold text-[#F59E0B] flex items-center gap-2">
                جدول گلزنان برتر
              </h3>
              <p className="text-[11px] text-[#94A3B8] font-vazir font-medium">برترین گلزنان مسابقات</p>
            </div>
            <Award className="w-5 h-5 text-[#F59E0B]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm font-vazir">
              <thead>
                <tr className="bg-[#0B112C]/80 text-[#38BDF8] border-b border-[#38BDF8]/20 text-[11px] font-bold">
                  <th className="py-2.5 px-3 text-center w-12">#</th>
                  <th className="py-2.5 px-3 text-right">بازیکن</th>
                  <th className="py-2.5 px-3 text-right">باشگاه</th>
                  <th className="py-2.5 px-3 text-center font-extrabold text-[#F59E0B]">گل‌ها</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#38BDF8]/10">
                {filteredScorers.map((player, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={player.id}
                      className="hover:bg-[#1B2960]/40 transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-3 px-3 text-center font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                            rank === 1
                              ? 'bg-[#F59E0B] text-[#0A0E2A] font-extrabold shadow-sm'
                              : rank === 2
                              ? 'bg-[#1B2960] text-white font-bold border border-[#38BDF8]/40'
                              : 'text-[#64748B]'
                          }`}
                        >
                          {rank}
                        </span>
                      </td>

                      {/* Player Name */}
                      <td className="py-3 px-3 font-semibold text-white">
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
                      <td className="py-3 px-3 text-white font-medium">
                        <span className="px-2 py-1 rounded-lg bg-[#0B112C] border border-[#38BDF8]/20 text-xs text-white">
                          {player.teamName}
                        </span>
                      </td>

                      {/* Goals */}
                      <td className="py-3 px-3 text-center font-extrabold text-sm text-[#F59E0B]">
                        {player.goals}
                      </td>
                    </tr>
                  );
                })}

                {filteredScorers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#94A3B8] font-vazir text-xs space-y-1">
                      <p className="font-semibold text-white">بازیکنی یافت نشد</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CARD 2: Top Assists */}
        <div className="bg-[#10173A]/90 border border-[#38BDF8]/25 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-[#0B112C] px-5 py-4 border-b border-[#38BDF8]/20 flex items-center justify-between">
            <div>
              <h3 className="font-vazir text-base font-bold text-[#38BDF8] flex items-center gap-2">
                جدول پاس گل‌دهندگان
              </h3>
              <p className="text-[11px] text-[#94A3B8] font-vazir font-medium">برترین پاسورهای مسابقات</p>
            </div>
            <Target className="w-5 h-5 text-[#38BDF8]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm font-vazir">
              <thead>
                <tr className="bg-[#0B112C]/80 text-[#38BDF8] border-b border-[#38BDF8]/20 text-[11px] font-bold">
                  <th className="py-2.5 px-3 text-center w-12">#</th>
                  <th className="py-2.5 px-3 text-right">بازیکن</th>
                  <th className="py-2.5 px-3 text-right">باشگاه</th>
                  <th className="py-2.5 px-3 text-center font-extrabold text-[#38BDF8]">پاس گل</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#38BDF8]/10">
                {filteredAssists.map((player, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={player.id}
                      className="hover:bg-[#1B2960]/40 transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-3 px-3 text-center font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                            rank === 1
                              ? 'bg-[#38BDF8] text-[#0A0E2A] font-extrabold shadow-sm'
                              : rank === 2
                              ? 'bg-[#1B2960] text-white font-bold border border-[#38BDF8]/40'
                              : 'text-[#64748B]'
                          }`}
                        >
                          {rank}
                        </span>
                      </td>

                      {/* Player Name */}
                      <td className="py-3 px-3 font-semibold text-white">
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
                      <td className="py-3 px-3 text-white font-medium">
                        <span className="px-2 py-1 rounded-lg bg-[#0B112C] border border-[#38BDF8]/20 text-xs text-white">
                          {player.teamName}
                        </span>
                      </td>

                      {/* Assists */}
                      <td className="py-3 px-3 text-center font-extrabold text-sm text-[#38BDF8]">
                        {player.assists}
                      </td>
                    </tr>
                  );
                })}

                {filteredAssists.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#94A3B8] font-vazir text-xs space-y-1">
                      <p className="font-semibold text-white">بازیکنی یافت نشد</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* SECTION 3: Overall Team Statistics Table */}
      <div className="bg-[#10173A]/90 border border-[#38BDF8]/25 rounded-2xl overflow-hidden shadow-xl space-y-2">
        <div className="bg-[#0B112C] px-5 py-4 border-b border-[#38BDF8]/20 flex items-center justify-between">
          <div>
            <h3 className="font-vazir text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#38BDF8]" />
              <span>📊 آمار کلی تیم‌ها</span>
            </h3>
            <p className="text-[11px] text-[#94A3B8] font-vazir font-medium">مجموع گل، پاس گل و امتیاز کل بازیکنان هر تیم</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm font-vazir">
            <thead>
              <tr className="bg-[#0B112C]/80 text-[#38BDF8] border-b border-[#38BDF8]/20 text-[11px] font-bold">
                <th className="py-2.5 px-3 text-center w-12">#</th>
                <th className="py-2.5 px-3 text-right">تیم</th>
                <th className="py-2.5 px-3 text-center">مجموع گل</th>
                <th className="py-2.5 px-3 text-center">مجموع پاس گل</th>
                <th className="py-2.5 px-3 text-center font-extrabold text-[#F59E0B]">مجموع امتیاز (گل + پاس)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#38BDF8]/10">
              {filteredTeamsStats.map((teamStat, index) => (
                <tr key={teamStat.teamName} className="hover:bg-[#1B2960]/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-[#64748B]">
                    {index + 1}
                  </td>
                  <td className="py-3 px-3 font-bold text-white">
                    {teamStat.teamName}
                  </td>
                  <td className="py-3 px-3 text-center font-extrabold text-[#F59E0B]">
                    {teamStat.goals}
                  </td>
                  <td className="py-3 px-3 text-center font-extrabold text-[#38BDF8]">
                    {teamStat.assists}
                  </td>
                  <td className="py-3 px-3 text-center font-extrabold text-sm text-emerald-400">
                    {teamStat.totalPoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: Detailed Team Player Breakdown */}
      <div className="bg-[#10173A]/90 border border-[#38BDF8]/25 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-[#38BDF8]/20 pb-3">
          <Users className="w-5 h-5 text-[#38BDF8]" />
          <h3 className="font-vazir text-base font-bold text-white">
            📋 جزئیات عملکرد بازیکنان به تفکیک تیم
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeamsStats.map((teamStat) => (
            <div
              key={teamStat.teamName}
              className="bg-[#0B112C] border border-[#38BDF8]/20 rounded-xl p-4 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#38BDF8]/10 pb-2">
                <div className="font-vazir font-bold text-sm text-white">
                  <span>{teamStat.teamName}</span>
                </div>
                <div className="text-[11px] text-[#94A3B8] font-vazir font-semibold">
                  ⚽ {teamStat.goals} | 🅰️ {teamStat.assists}
                </div>
              </div>

              <div className="space-y-1.5 font-vazir text-xs">
                {teamStat.players.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[#10173A]/60 px-3 py-1.5 rounded-lg border border-white/5"
                  >
                    <span className="text-white font-medium">{p.name}</span>
                    <div className="flex items-center gap-2 text-[11px] font-bold">
                      {p.goals > 0 && (
                        <span className="text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 py-0.5 rounded border border-[#F59E0B]/20">
                          {p.goals} گل
                        </span>
                      )}
                      {p.assists > 0 && (
                        <span className="text-[#38BDF8] bg-[#38BDF8]/10 px-1.5 py-0.5 rounded border border-[#38BDF8]/20">
                          {p.assists} پاس
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};


