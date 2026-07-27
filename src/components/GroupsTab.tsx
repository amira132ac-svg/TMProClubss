import React, { useState } from 'react';
import { Team, GroupName } from '../types';
import { Search } from 'lucide-react';
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
    <div className="animate-fade-in space-y-6">
      {/* Title & Search / Filter Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#10173A]/90 border border-[#38BDF8]/25 p-4 sm:p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
        <div>
          <h2 className="font-vazir text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-[#38BDF8]">⚔</span> مرحله گروهی سوپرلیگ
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-vazir mt-1 font-medium">
            ۲۸ تیم در ۴ گروه رقابتی برای صعود به مرحله حذفی
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#38BDF8]" />
            <input
              type="text"
              placeholder="جستجوی نام تیم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B112C] border border-[#38BDF8]/20 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8] transition-colors font-vazir"
            />
          </div>

          {/* Group Filter Buttons */}
          <div className="flex items-center bg-[#0B112C] p-1 rounded-xl border border-[#38BDF8]/20 overflow-x-auto">
            {['ALL', 'A', 'B', 'C', 'D'].map((grp) => (
              <button
                key={grp}
                onClick={() => setSelectedGroupFilter(grp)}
                className={`px-3 py-1.5 rounded-lg font-vazir text-xs font-bold transition-all whitespace-nowrap ${
                  selectedGroupFilter === grp
                    ? 'bg-[#1B2960] text-[#38BDF8] border border-[#38BDF8]/50 shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {grp === 'ALL' ? 'همه گروه‌ها' : `گروه ${grp}`}
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
              className="relative bg-[#10173A]/90 border border-[#38BDF8]/25 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#38BDF8]/50"
            >
              {/* Group Card Header */}
              <div className="bg-[#0B112C] px-5 py-3.5 border-b border-[#38BDF8]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#1B2960] text-[#38BDF8] flex items-center justify-center font-vazir font-extrabold text-xs shadow-md border border-[#38BDF8]/40">
                    {group}
                  </div>
                  <h3 className="font-vazir text-base font-bold text-[#38BDF8] tracking-wide">
                    گروه {group}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-vazir text-slate-200 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>۲ تیم اول صعودکننده</span>
                </div>
              </div>

              {/* Group Standings Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs sm:text-sm font-vazir">
                  <thead>
                    <tr className="bg-[#0B112C]/90 text-[#38BDF8] border-b border-[#38BDF8]/20 text-[11px] font-bold">
                      <th className="py-2.5 px-3 text-center w-10">#</th>
                      <th className="py-2.5 px-3 text-right">تیم</th>
                      <th className="py-2.5 px-2 text-center">بازی</th>
                      <th className="py-2.5 px-2 text-center">برد</th>
                      <th className="py-2.5 px-2 text-center">مساوی</th>
                      <th className="py-2.5 px-2 text-center">باخت</th>
                      <th className="py-2.5 px-2 text-center">تفاضل</th>
                      <th className="py-2.5 px-3 text-center font-extrabold text-[#F59E0B]">امتیاز</th>
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
                          className={`cursor-pointer transition-colors hover:bg-[#1B2960]/60 ${
                            isQualifying ? 'bg-[#152052]/40' : ''
                          }`}
                        >
                          {/* Rank */}
                          <td className="py-3 px-3 text-center font-bold">
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                                rank === 1
                                  ? 'bg-[#F59E0B] text-[#0A0E2A] font-extrabold shadow-sm'
                                  : rank === 2
                                  ? 'bg-[#1B2960] text-white border border-[#38BDF8]/40 font-bold'
                                  : 'text-[#64748B]'
                              }`}
                            >
                              {rank}
                            </span>
                          </td>

                          {/* Team Name */}
                          <td className="py-3 px-3 font-bold text-white">
                            <span className="hover:text-[#38BDF8] transition-colors truncate max-w-[180px] sm:max-w-none">
                              {team.name}
                            </span>
                          </td>

                          {/* Played */}
                          <td className="py-3 px-2 text-center text-[#E6E8EC]">
                            {team.played}
                          </td>

                          {/* Wins */}
                          <td className="py-3 px-2 text-center text-emerald-400 font-semibold">
                            {team.won}
                          </td>

                          {/* Draws */}
                          <td className="py-3 px-2 text-center text-amber-400">
                            {team.drawn}
                          </td>

                          {/* Losses */}
                          <td className="py-3 px-2 text-center text-rose-400">
                            {team.lost}
                          </td>

                          {/* Goal Difference */}
                          <td className="py-3 px-2 text-center font-semibold text-[#E6E8EC]">
                            {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                          </td>

                          {/* Points */}
                          <td className="py-3 px-3 text-center text-sm font-extrabold text-[#D4AF37]">
                            {team.points}
                          </td>
                        </tr>
                      );
                    })}

                    {groupTeams.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-[#94A3B8] font-vazir text-xs">
                          تیمی با این عبارت جستجو یافت نشد
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

