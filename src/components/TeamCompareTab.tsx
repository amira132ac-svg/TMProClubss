import React, { useState } from 'react';
import { Team, Match, Player } from '../types';
import { Swords, Trophy, ArrowRightLeft, Sparkles, AlertCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TeamCompareTabProps {
  teams: Team[];
  matches: Match[];
  players: Player[];
}

export const TeamCompareTab: React.FC<TeamCompareTabProps> = ({ teams, matches, players }) => {
  const playedTeams = teams.filter(t => t.played > 0);
  const defaultTeam1 = playedTeams[0] || teams[0];
  const defaultTeam2 = playedTeams[1] || teams[1] || teams[0];

  const [team1Id, setTeam1Id] = useState<string>(defaultTeam1?.id || '');
  const [team2Id, setTeam2Id] = useState<string>(defaultTeam2?.id || '');

  const team1 = teams.find(t => t.id === team1Id) || defaultTeam1;
  const team2 = teams.find(t => t.id === team2Id) || defaultTeam2;

  const handleSwap = () => {
    soundManager.playUiClick();
    setTeam1Id(team2.id);
    setTeam2Id(team1.id);
  };

  const handleSelectTeam1 = (id: string) => {
    soundManager.playUiClick();
    if (id === team2Id) {
      setTeam2Id(team1Id);
    }
    setTeam1Id(id);
  };

  const handleSelectTeam2 = (id: string) => {
    soundManager.playUiClick();
    if (id === team1Id) {
      setTeam1Id(team2Id);
    }
    setTeam2Id(id);
  };

  const h2hMatches = matches.filter(
    m =>
      m.status === 'finished' &&
      ((m.homeTeamId === team1.id && m.awayTeamId === team2.id) ||
       (m.homeTeamId === team2.id && m.awayTeamId === team1.id))
  );

  const team1LeaderboardPlayers = players.filter(p => p.teamId === team1.id);
  const team2LeaderboardPlayers = players.filter(p => p.teamId === team2.id);

  const getWinRate = (t: Team) => (t.played > 0 ? Math.round((t.won / t.played) * 100) : 0);
  const getOffenseRating = (t: Team) => (t.played > 0 ? Math.min(100, Math.round((t.goalsFor / t.played) * 25)) : 0);
  const getDefenseRating = (t: Team) => (t.played > 0 ? Math.max(10, Math.round(100 - (t.goalsAgainst / t.played) * 25)) : 0);

  const team1WinRate = getWinRate(team1);
  const team2WinRate = getWinRate(team2);

  const team1Offense = getOffenseRating(team1);
  const team2Offense = getOffenseRating(team2);

  const team1Defense = getDefenseRating(team1);
  const team2Defense = getDefenseRating(team2);

  let resultText = "برای مقایسه، آمار تیم‌های دارای بازی انجام‌شده سنجیده می‌شود.";
  if (team1.played > 0 && team2.played > 0) {
    const team1ScorePower = team1.points * 3 + team1.goalDifference * 2 + team1WinRate;
    const team2ScorePower = team2.points * 3 + team2.goalDifference * 2 + team2WinRate;

    if (team1ScorePower > team2ScorePower + 4) {
      const favorPercent = Math.min(85, 55 + Math.round((team1ScorePower - team2ScorePower) / 2));
      resultText = `بر اساس بازی‌های ثبت شده، تیم ${team1.name} با ${team1.goalsFor} گل زده و تفاضل ${team1.goalDifference} شانس برتری بیشتری دارد (${favorPercent}%).`;
    } else if (team2ScorePower > team1ScorePower + 4) {
      const favorPercent = Math.min(85, 55 + Math.round((team2ScorePower - team1ScorePower) / 2));
      resultText = `بر اساس بازی‌های ثبت شده، تیم ${team2.name} با ${team2.goalsFor} گل زده و تفاضل ${team2.goalDifference} شانس برتری بیشتری دارد (${favorPercent}%).`;
    } else {
      resultText = `هر دو تیم ${team1.name} و ${team2.name} نتایج و عملکرد بسیار نزدیک به هم داشته‌اند.`;
    }
  } else if (team1.played === 0 || team2.played === 0) {
    resultText = "تیمی که هنوز بازی ثبت شده ندارد، آماری برای تحلیل دقیق برایش وجود ندارد و پس از برگزاری مسابقه نمایش داده می‌شود.";
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-vazir">
      
      {/* Title & Banner */}
      <div className="bg-[#10173A]/90 border border-[#38BDF8]/25 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#1B2960] border border-[#38BDF8]/40 text-[#38BDF8]">
            <Swords className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-vazir font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
              <span>مقایسه مستقیم تیم‌ها</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-[#1B2960] border border-[#38BDF8]/40 text-[#38BDF8]">
                تحلیل آماری
              </span>
            </h2>
            <p className="text-xs text-[#94A3B8] font-vazir mt-1">
              مقایسه واقعی بر اساس بازی‌های انجام شده، آمار گل زده/خورده، تفاضل، برد/باخت و عملکرد.
            </p>
          </div>
        </div>

        <button
          onClick={handleSwap}
          className="px-4 py-2 rounded-xl bg-[#1B2960] hover:bg-[#152052] border border-[#38BDF8]/30 text-[#38BDF8] font-bold text-xs flex items-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>جابجایی دو تیم</span>
        </button>
      </div>

      {/* Team Selection Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Team 1 Picker */}
        <div className="bg-[#10173A]/90 border border-[#38BDF8]/30 rounded-2xl p-4 shadow-md space-y-2">
          <label className="block text-xs text-[#38BDF8] font-bold">
            انتخاب تیم اول
          </label>
          <select
            value={team1Id}
            onChange={(e) => handleSelectTeam1(e.target.value)}
            className="w-full bg-[#0B112C] border border-[#38BDF8]/20 rounded-xl p-3 text-xs font-bold text-white focus:outline-none focus:border-[#38BDF8] cursor-pointer"
          >
            {teams.map(t => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.played > 0 ? `${t.played} بازی | ${t.points} امتیاز` : 'بدون بازی'})
              </option>
            ))}
          </select>
        </div>

        {/* Team 2 Picker */}
        <div className="bg-[#10173A]/90 border border-[#38BDF8]/30 rounded-2xl p-4 shadow-md space-y-2">
          <label className="block text-xs text-[#38BDF8] font-bold">
            انتخاب تیم دوم
          </label>
          <select
            value={team2Id}
            onChange={(e) => handleSelectTeam2(e.target.value)}
            className="w-full bg-[#0B112C] border border-[#38BDF8]/20 rounded-xl p-3 text-xs font-bold text-white focus:outline-none focus:border-[#38BDF8] cursor-pointer"
          >
            {teams.map(t => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.played > 0 ? `${t.played} بازی | ${t.points} امتیاز` : 'بدون بازی'})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Main Face-Off Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Team 1 Showcase Card */}
        <div className="bg-[#10173A]/90 border border-[#38BDF8]/20 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 rounded-2xl bg-[#1B2960] border border-[#38BDF8]/30">
                🛡️
              </span>
              <div>
                <h3 className="font-vazir font-bold text-xl text-white">
                  {team1.name}
                </h3>
                <span className="text-xs text-[#38BDF8] font-semibold">
                  گروه {team1.group} • {team1.shortName}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-[#F59E0B]">
                {team1.points} <span className="text-xs text-[#94A3B8]">امتیاز</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">
                {team1.won} برد - {team1.drawn} مساوی - {team1.lost} باخت
              </span>
            </div>
          </div>

          {/* Played Status Pill */}
          {team1.played === 0 ? (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>این تیم هنوز مسابقه‌ای در تورنمنت برگزار نکرده است.</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0B112C] border border-[#38BDF8]/20 text-center">
              <div>
                <span className="text-[10px] text-[#94A3B8] block">گل زده</span>
                <span className="text-sm font-bold text-emerald-400">⚽ {team1.goalsFor}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] block">گل خورده</span>
                <span className="text-sm font-bold text-rose-400">🛡️ {team1.goalsAgainst}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] block">تفاضل گل</span>
                <span className="text-sm font-bold text-[#F59E0B]">
                  {team1.goalDifference > 0 ? `+${team1.goalDifference}` : team1.goalDifference}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Team 2 Showcase Card */}
        <div className="bg-[#10173A]/90 border border-[#38BDF8]/20 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 rounded-2xl bg-[#1B2960] border border-[#38BDF8]/30">
                🛡️
              </span>
              <div>
                <h3 className="font-vazir font-bold text-xl text-white">
                  {team2.name}
                </h3>
                <span className="text-xs text-[#38BDF8] font-semibold">
                  گروه {team2.group} • {team2.shortName}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-[#F59E0B]">
                {team2.points} <span className="text-xs text-[#94A3B8]">امتیاز</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">
                {team2.won} برد - {team2.drawn} مساوی - {team2.lost} باخت
              </span>
            </div>
          </div>

          {/* Played Status Pill */}
          {team2.played === 0 ? (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>این تیم هنوز مسابقه‌ای در تورنمنت برگزار نکرده است.</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0B112C] border border-[#38BDF8]/20 text-center">
              <div>
                <span className="text-[10px] text-[#94A3B8] block">گل زده</span>
                <span className="text-sm font-bold text-emerald-400">⚽ {team2.goalsFor}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] block">گل خورده</span>
                <span className="text-sm font-bold text-rose-400">🛡️ {team2.goalsAgainst}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] block">تفاضل گل</span>
                <span className="text-sm font-bold text-[#F59E0B]">
                  {team2.goalDifference > 0 ? `+${team2.goalDifference}` : team2.goalDifference}
                </span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Comparative Stat Bar Charts */}
      {(team1.played > 0 || team2.played > 0) && (
        <div className="bg-[#10173A]/90 border border-[#38BDF8]/25 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="font-vazir font-bold text-base text-[#38BDF8] border-b border-[#38BDF8]/20 pb-3 flex items-center gap-2">
            <span>مقایسه نموداری آمار واقعی</span>
          </h3>

          <div className="space-y-5">
            <StatBar
              label="گل زده"
              val1={team1.goalsFor}
              val2={team2.goalsFor}
              color1="#38BDF8"
              color2="#1E40AF"
              name1={team1.name}
              name2={team2.name}
            />

            <StatBar
              label="تفاضل گل"
              val1={team1.goalDifference}
              val2={team2.goalDifference}
              color1="#38BDF8"
              color2="#1E40AF"
              name1={team1.name}
              name2={team2.name}
            />

            <StatBar
              label="امتیاز کل"
              val1={team1.points}
              val2={team2.points}
              color1="#F59E0B"
              color2="#38BDF8"
              name1={team1.name}
              name2={team2.name}
              unit=" امتیاز"
            />
          </div>
        </div>
      )}

      {/* Tactical Prediction Verdict Box */}
      <div className="p-4 rounded-2xl bg-[#10173A]/90 border border-[#F59E0B]/30 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-[#F59E0B] shrink-0 animate-pulse" />
        <div>
          <h4 className="font-vazir font-bold text-sm text-[#F59E0B]">تحلیل تقابل:</h4>
          <p className="text-xs text-white font-vazir mt-0.5">
            {resultText}
          </p>
        </div>
      </div>

    </div>
  );
};

interface StatBarProps {
  label: string;
  val1: number;
  val2: number;
  color1: string;
  color2: string;
  name1: string;
  name2: string;
  unit?: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, val1, val2, color1, color2, name1, name2, unit = '' }) => {
  const max = Math.max(1, Math.max(val1, val2));
  const pct1 = Math.round((Math.max(0, val1) / max) * 100);
  const pct2 = Math.round((Math.max(0, val2) / max) * 100);

  return (
    <div className="space-y-1.5 font-vazir">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-[#E6E8EC]">{name1}: {val1}{unit}</span>
        <span className="text-[#D4AF37] font-bold text-[11px]">{label}</span>
        <span className="font-bold text-[#E6E8EC]">{name2}: {val2}{unit}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 h-3.5 bg-[#0D1117] rounded-lg p-0.5 border border-white/10">
        <div className="flex justify-end bg-[#121621] rounded-r-md overflow-hidden">
          <div
            className="h-full rounded-r-md transition-all duration-500"
            style={{ width: `${pct1}%`, backgroundColor: color1 }}
          />
        </div>

        <div className="bg-[#121621] rounded-l-md overflow-hidden">
          <div
            className="h-full rounded-l-md transition-all duration-500"
            style={{ width: `${pct2}%`, backgroundColor: color2 }}
          />
        </div>
      </div>
    </div>
  );
};
