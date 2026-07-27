import React, { useState } from 'react';
import { Player } from '../types';
import { Target, Award, Search } from 'lucide-react';

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
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#161B26] border border-white/10 p-4 sm:p-5 rounded-2xl shadow-xl">
        <div>
          <h2 className="font-vazir text-xl sm:text-2xl font-bold text-[#E6E8EC] flex items-center gap-2">
            <span className="text-[#D4AF37]">⚔</span> آمار و جدول گلزنان / پاس گل
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-vazir mt-1 font-medium">
            برترین برترین‌های فصل ۴ سوپرلیگ
          </p>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
          <input
            type="text"
            placeholder="جستجوی نام بازیکن یا باشگاه..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0D1117] border border-white/10 text-xs text-[#E6E8EC] placeholder-[#64748B] focus:outline-none focus:border-[#D4AF37] transition-colors font-vazir"
          />
        </div>
      </div>

      {/* Announcement Notice Box */}
      <div className="bg-[#161B26] border border-[#D4AF37]/30 rounded-2xl p-4 text-[#E6E8EC] flex items-center gap-3 shadow-md">
        <span className="text-lg shrink-0">⚽</span>
        <p className="text-xs sm:text-sm font-vazir font-semibold text-[#D4AF37]">
          آمار دقیق بازیکنان پس از برگزاری اولین هفته از بازی‌ها به‌روزرسانی خواهد شد
        </p>
      </div>

      {/* Two Side-By-Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CARD 1: Top Scorers */}
        <div className="bg-[#161B26] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-[#121621] px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-vazir text-base font-bold text-[#D4AF37] flex items-center gap-2">
                جدول گلزنان
              </h3>
              <p className="text-[11px] text-[#94A3B8] font-vazir font-medium">برترین گلزنان مسابقات</p>
            </div>
            <Award className="w-5 h-5 text-[#D4AF37]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm font-vazir">
              <thead>
                <tr className="bg-[#0D1117]/80 text-[#D4AF37] border-b border-white/10 text-[11px] font-bold">
                  <th className="py-2.5 px-3 text-center w-12">#</th>
                  <th className="py-2.5 px-3 text-right">بازیکن</th>
                  <th className="py-2.5 px-3 text-right">باشگاه</th>
                  <th className="py-2.5 px-3 text-center font-extrabold text-[#D4AF37]">گل‌ها</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {filteredScorers.map((player, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={player.id}
                      className="hover:bg-[#21283B]/40 transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-3 px-3 text-center font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                            rank === 1
                              ? 'bg-[#D4AF37] text-[#0D1117] font-extrabold shadow-sm'
                              : rank === 2
                              ? 'bg-[#21283B] text-[#E6E8EC] font-bold border border-[#D4AF37]/30'
                              : 'text-[#64748B]'
                          }`}
                        >
                          {rank}
                        </span>
                      </td>

                      {/* Player Name */}
                      <td className="py-3 px-3 font-semibold text-[#E6E8EC]">
                        <div>
                          <div className="hover:text-[#D4AF37] transition-colors">
                            {player.name}
                          </div>
                          <div className="text-[11px] text-[#94A3B8] font-normal">
                            {player.position}
                          </div>
                        </div>
                      </td>

                      {/* Club */}
                      <td className="py-3 px-3 text-[#E6E8EC] font-medium">
                        <span className="px-2 py-1 rounded-lg bg-[#0D1117] border border-white/10 text-xs text-[#E6E8EC]">
                          {player.teamName}
                        </span>
                      </td>

                      {/* Goals */}
                      <td className="py-3 px-3 text-center font-extrabold text-sm text-[#D4AF37]">
                        {player.goals}
                      </td>
                    </tr>
                  );
                })}

                {filteredScorers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#94A3B8] font-vazir text-xs space-y-1">
                      <p className="font-semibold text-[#E6E8EC]">هنوز گلی ثبت نشده است</p>
                      <p className="text-[11px]">آمار گلزنان پس از انجام مسابقات ثبت می‌گردد.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CARD 2: Top Assists */}
        <div className="bg-[#161B26] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-[#121621] px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-vazir text-base font-bold text-[#D4AF37] flex items-center gap-2">
                جدول پاس گل
              </h3>
              <p className="text-[11px] text-[#94A3B8] font-vazir font-medium">برترین پاسورهای مسابقات</p>
            </div>
            <Target className="w-5 h-5 text-[#D4AF37]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm font-vazir">
              <thead>
                <tr className="bg-[#0D1117]/80 text-[#D4AF37] border-b border-white/10 text-[11px] font-bold">
                  <th className="py-2.5 px-3 text-center w-12">#</th>
                  <th className="py-2.5 px-3 text-right">بازیکن</th>
                  <th className="py-2.5 px-3 text-right">باشگاه</th>
                  <th className="py-2.5 px-3 text-center font-extrabold text-[#D4AF37]">پاس گل</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {filteredAssists.map((player, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={player.id}
                      className="hover:bg-[#21283B]/40 transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-3 px-3 text-center font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                            rank === 1
                              ? 'bg-[#D4AF37] text-[#0D1117] font-extrabold shadow-sm'
                              : rank === 2
                              ? 'bg-[#21283B] text-[#E6E8EC] font-bold border border-[#D4AF37]/30'
                              : 'text-[#64748B]'
                          }`}
                        >
                          {rank}
                        </span>
                      </td>

                      {/* Player Name */}
                      <td className="py-3 px-3 font-semibold text-[#E6E8EC]">
                        <div>
                          <div className="hover:text-[#D4AF37] transition-colors">
                            {player.name}
                          </div>
                          <div className="text-[11px] text-[#94A3B8] font-normal">
                            {player.position}
                          </div>
                        </div>
                      </td>

                      {/* Club */}
                      <td className="py-3 px-3 text-[#E6E8EC] font-medium">
                        <span className="px-2 py-1 rounded-lg bg-[#0D1117] border border-white/10 text-xs text-[#E6E8EC]">
                          {player.teamName}
                        </span>
                      </td>

                      {/* Assists */}
                      <td className="py-3 px-3 text-center font-extrabold text-sm text-[#D4AF37]">
                        {player.assists}
                      </td>
                    </tr>
                  );
                })}

                {filteredAssists.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#94A3B8] font-vazir text-xs space-y-1">
                      <p className="font-semibold text-[#E6E8EC]">هنوز پاس گلی ثبت نشده است</p>
                      <p className="text-[11px]">آمار پاس گل پس از انجام مسابقات ثبت می‌گردد.</p>
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

