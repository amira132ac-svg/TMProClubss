import React, { useState } from 'react';
import { Team, Match, Player } from '../types';
import { Swords, Shield, Trophy, Flame, Target, Award, ArrowRightLeft, Sparkles, CheckCircle2, AlertCircle, UserCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TeamCompareTabProps {
  teams: Team[];
  matches: Match[];
  players: Player[];
}

export const TeamCompareTab: React.FC<TeamCompareTabProps> = ({ teams, matches, players }) => {
  // Filter played teams first if available
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

  // Find direct H2H matches between team1 and team2
  const h2hMatches = matches.filter(
    m =>
      m.status === 'finished' &&
      ((m.homeTeamId === team1.id && m.awayTeamId === team2.id) ||
       (m.homeTeamId === team2.id && m.awayTeamId === team1.id))
  );

  // Players belonging to team1 and team2 who are in the leaderboards
  const team1LeaderboardPlayers = players.filter(p => p.teamId === team1.id);
  const team2LeaderboardPlayers = players.filter(p => p.teamId === team2.id);

  // Top players for each team
  const team1StarPlayer = team1LeaderboardPlayers[0];
  const team2StarPlayer = team2LeaderboardPlayers[0];

  // Calculate comparative ratings only if played > 0
  const getWinRate = (t: Team) => (t.played > 0 ? Math.round((t.won / t.played) * 100) : 0);
  const getOffenseRating = (t: Team) => (t.played > 0 ? Math.min(100, Math.round((t.goalsFor / t.played) * 25)) : 0);
  const getDefenseRating = (t: Team) => (t.played > 0 ? Math.max(10, Math.round(100 - (t.goalsAgainst / t.played) * 25)) : 0);

  const team1WinRate = getWinRate(team1);
  const team2WinRate = getWinRate(team2);

  const team1Offense = getOffenseRating(team1);
  const team2Offense = getOffenseRating(team2);

  const team1Defense = getDefenseRating(team1);
  const team2Defense = getDefenseRating(team2);

  // Determine prediction text
  let resultText = "برای مقایسه، آمار تیم‌های دارای بازی بازی‌شده سنجیده می‌شود.";
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
      resultText = `هر دو تیم ${team1.name} و ${team2.name} نتایج و عملکرد نزدیک به هم داشته‌اند.`;
    }
  } else if (team1.played === 0 || team2.played === 0) {
    resultText = "تیمی که هنوز بازی ثبت شده ندارد، آماری برای تحلیل دقیق برایش وجود ندارد و پس از برگزاری مسابقه نمایش داده می‌شود.";
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Title & Banner */}
      <div className="bg-[#111D3A]/90 border border-[#38BDF8]/30 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#0284C7]/20 border border-[#38BDF8]/40 text-[#F59E0B]">
            <Swords className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-cinzel font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
              <span>HEAD-TO-HEAD COMPARISON</span>
              <span className="text-xs font-orbitron px-2 py-0.5 rounded-md bg-[#F59E0B]/20 border border-[#F59E0B]/50 text-[#F59E0B]">
                مقایسه تیم‌های دارای بازی
              </span>
            </h2>
            <p className="text-xs text-[#94A3B8] font-inter mt-1">
              مقایسه واقعی بر اساس بازی‌های انجام شده، آمار گل زده/خورده، تفاضل، برد/باخت و بازیکنای حاضر در لیدربرد.
            </p>
          </div>
        </div>

        <button
          onClick={handleSwap}
          className="px-4 py-2.5 rounded-xl bg-[#1C2541] hover:bg-[#283655] border border-[#38BDF8]/30 text-[#38BDF8] font-bold text-xs font-orbitron flex items-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>جابجایی دو تیم</span>
        </button>
      </div>

      {/* Team Selection Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Team 1 Picker */}
        <div className="bg-[#111D3A]/90 border border-[#0284C7]/40 rounded-2xl p-4 shadow-md space-y-2">
          <label className="block text-xs font-orbitron text-[#38BDF8] font-bold">
            انتخاب تیم اول (TEAM 1)
          </label>
          <select
            value={team1Id}
            onChange={(e) => handleSelectTeam1(e.target.value)}
            className="w-full bg-[#1C2541] border border-[#38BDF8]/30 rounded-xl p-3 text-sm font-bold text-white focus:outline-none focus:border-[#38BDF8] cursor-pointer"
          >
            {teams.map(t => (
              <option key={t.id} value={t.id}>
                {t.logo} {t.name} ({t.played > 0 ? `${t.played} بازی ثبت شده | ${t.points} امتیاز` : 'هنوز بازی نکرده'})
              </option>
            ))}
          </select>
        </div>

        {/* Team 2 Picker */}
        <div className="bg-[#111D3A]/90 border border-[#F59E0B]/40 rounded-2xl p-4 shadow-md space-y-2">
          <label className="block text-xs font-orbitron text-[#F59E0B] font-bold">
            انتخاب تیم دوم (TEAM 2)
          </label>
          <select
            value={team2Id}
            onChange={(e) => handleSelectTeam2(e.target.value)}
            className="w-full bg-[#1C2541] border border-[#F59E0B]/30 rounded-xl p-3 text-sm font-bold text-white focus:outline-none focus:border-[#F59E0B] cursor-pointer"
          >
            {teams.map(t => (
              <option key={t.id} value={t.id}>
                {t.logo} {t.name} ({t.played > 0 ? `${t.played} بازی ثبت شده | ${t.points} امتیاز` : 'هنوز بازی نکرده'})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Main Face-Off Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Team 1 Showcase Card */}
        <div className="bg-gradient-to-b from-[#111D3A] to-[#0B132B] border-2 border-[#0284C7]/50 rounded-2xl p-6 shadow-[0_12px_36px_rgba(2,132,199,0.15)] relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2 rounded-2xl bg-[#0284C7]/20 border border-[#38BDF8]/30 shadow-inner">
                {team1.logo}
              </span>
              <div>
                <h3 className="font-cinzel font-extrabold text-2xl text-white tracking-wide">
                  {team1.name}
                </h3>
                <span className="text-xs font-orbitron font-bold text-[#38BDF8]">
                  گروه {team1.group} • {team1.shortName}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-orbitron font-extrabold text-[#38BDF8]">
                {team1.points} <span className="text-xs font-sans text-[#94A3B8]">امتیاز</span>
              </div>
              <span className="text-[11px] font-orbitron text-[#10B981] font-bold">
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
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#1C2541]/80 border border-[#38BDF8]/20 text-center">
              <div>
                <span className="text-[10px] text-[#94A3B8] font-orbitron block">گل زده</span>
                <span className="text-sm font-extrabold font-orbitron text-emerald-400">⚽ {team1.goalsFor}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] font-orbitron block">گل خورده</span>
                <span className="text-sm font-extrabold font-orbitron text-rose-400">🛡️ {team1.goalsAgainst}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] font-orbitron block">تفاضل گل</span>
                <span className="text-sm font-extrabold font-orbitron text-[#F59E0B]">
                  {team1.goalDifference > 0 ? `+${team1.goalDifference}` : team1.goalDifference}
                </span>
              </div>
            </div>
          )}

          {/* Players in Leaderboard */}
          <div className="p-3 rounded-xl bg-[#1C2541]/80 border border-[#38BDF8]/20 space-y-1.5">
            <span className="text-[11px] font-bold text-[#38BDF8] flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>بازیکنان شاخص در لیدربرد:</span>
            </span>
            {team1LeaderboardPlayers.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {team1LeaderboardPlayers.map(p => (
                  <span key={p.id} className="px-2 py-1 rounded bg-[#0B132B] border border-[#38BDF8]/30 text-xs text-white flex items-center gap-1 font-orbitron">
                    <span>{p.avatar}</span>
                    <span className="font-bold">{p.name}</span>
                    <span className="text-[#F59E0B] font-bold">({p.goals} گل / {p.assists} پاس)</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#94A3B8]">بازیکنی در لیدربرد فعلی ثبت نشده است.</p>
            )}
          </div>
        </div>

        {/* Team 2 Showcase Card */}
        <div className="bg-gradient-to-b from-[#111D3A] to-[#0B132B] border-2 border-[#F59E0B]/50 rounded-2xl p-6 shadow-[0_12px_36px_rgba(245,158,11,0.15)] relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2 rounded-2xl bg-[#F59E0B]/20 border border-[#F59E0B]/30 shadow-inner">
                {team2.logo}
              </span>
              <div>
                <h3 className="font-cinzel font-extrabold text-2xl text-white tracking-wide">
                  {team2.name}
                </h3>
                <span className="text-xs font-orbitron font-bold text-[#F59E0B]">
                  گروه {team2.group} • {team2.shortName}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-orbitron font-extrabold text-[#F59E0B]">
                {team2.points} <span className="text-xs font-sans text-[#94A3B8]">امتیاز</span>
              </div>
              <span className="text-[11px] font-orbitron text-[#10B981] font-bold">
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
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#1C2541]/80 border border-[#F59E0B]/20 text-center">
              <div>
                <span className="text-[10px] text-[#94A3B8] font-orbitron block">گل زده</span>
                <span className="text-sm font-extrabold font-orbitron text-emerald-400">⚽ {team2.goalsFor}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] font-orbitron block">گل خورده</span>
                <span className="text-sm font-extrabold font-orbitron text-rose-400">🛡️ {team2.goalsAgainst}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] font-orbitron block">تفاضل گل</span>
                <span className="text-sm font-extrabold font-orbitron text-[#F59E0B]">
                  {team2.goalDifference > 0 ? `+${team2.goalDifference}` : team2.goalDifference}
                </span>
              </div>
            </div>
          )}

          {/* Players in Leaderboard */}
          <div className="p-3 rounded-xl bg-[#1C2541]/80 border border-[#F59E0B]/20 space-y-1.5">
            <span className="text-[11px] font-bold text-[#F59E0B] flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>بازیکنان شاخص در لیدربرد:</span>
            </span>
            {team2LeaderboardPlayers.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {team2LeaderboardPlayers.map(p => (
                  <span key={p.id} className="px-2 py-1 rounded bg-[#0B132B] border border-[#F59E0B]/30 text-xs text-white flex items-center gap-1 font-orbitron">
                    <span>{p.avatar}</span>
                    <span className="font-bold">{p.name}</span>
                    <span className="text-[#F59E0B] font-bold">({p.goals} گل / {p.assists} پاس)</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#94A3B8]">بازیکنی در لیدربرد فعلی ثبت نشده است.</p>
            )}
          </div>
        </div>

      </div>

      {/* Comparative Stat Bar Charts */}
      {(team1.played > 0 || team2.played > 0) && (
        <div className="bg-[#111D3A]/90 border border-[#38BDF8]/25 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="font-cinzel font-bold text-lg text-white border-b border-[#38BDF8]/20 pb-3 flex items-center gap-2">
            <BarChartIcon className="w-5 h-5 text-[#38BDF8]" />
            <span>مقایسه نموداری آمار واقعی انجام‌شده</span>
          </h3>

          <div className="space-y-5">
            
            {/* Stat 1: Goals Scored */}
            <StatBar
              label="گل زده (GOALS SCORED)"
              val1={team1.goalsFor}
              val2={team2.goalsFor}
              color1="#0284C7"
              color2="#F59E0B"
              name1={team1.name}
              name2={team2.name}
            />

            {/* Stat 2: Goal Difference */}
            <StatBar
              label="تفاضل گل (GOAL DIFFERENCE)"
              val1={team1.goalDifference}
              val2={team2.goalDifference}
              color1="#0284C7"
              color2="#F59E0B"
              name1={team1.name}
              name2={team2.name}
            />

            {/* Stat 3: Total Points */}
            <StatBar
              label="امتیاز کل (TOTAL POINTS)"
              val1={team1.points}
              val2={team2.points}
              color1="#0284C7"
              color2="#F59E0B"
              name1={team1.name}
              name2={team2.name}
              unit=" PTS"
            />

            {/* Stat 4: Offense Power */}
            <StatBar
              label="میانگین قدرت هجوم (OFFENSE RATING)"
              val1={team1Offense}
              val2={team2Offense}
              color1="#0284C7"
              color2="#F59E0B"
              name1={team1.name}
              name2={team2.name}
              unit="/100"
            />

            {/* Stat 5: Defense Solidity */}
            <StatBar
              label="میانگین استحکام دفاعی (DEFENSE RATING)"
              val1={team1Defense}
              val2={team2Defense}
              color1="#0284C7"
              color2="#F59E0B"
              name1={team1.name}
              name2={team2.name}
              unit="/100"
            />

          </div>
        </div>
      )}

      {/* Head to Head Record Section */}
      <div className="bg-[#111D3A]/90 border border-[#38BDF8]/25 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-cinzel font-bold text-lg text-white border-b border-[#38BDF8]/20 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#F59E0B]" />
            <span>تاریخچه تقابل مستقیم در تورنمنت (H2H)</span>
          </div>
          <span className="text-xs font-orbitron text-[#38BDF8]">
            {h2hMatches.length} بازی برگزار شده
          </span>
        </h3>

        {h2hMatches.length > 0 ? (
          <div className="space-y-3">
            {h2hMatches.map(m => (
              <div key={m.id} className="p-4 rounded-xl bg-[#1C2541]/90 border border-[#38BDF8]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">{m.homeTeamName}</span>
                  <span className="px-3 py-1 rounded-lg bg-[#0B132B] text-base font-orbitron font-extrabold text-[#F59E0B] border border-[#F59E0B]/30">
                    {m.homeScore ?? 0} - {m.awayScore ?? 0}
                  </span>
                  <span className="text-sm font-bold text-white">{m.awayTeamName}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-orbitron text-[#94A3B8]">{m.date}</span>
                  <span className="block text-[10px] font-bold text-emerald-400 uppercase">{m.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#1C2541]/50 border border-[#38BDF8]/15 text-center text-xs text-[#94A3B8]">
            این دو تیم هنوز مسابقه مستقیمی با یکدیگر در تورنمنت برگزار نکرده‌اند.
          </div>
        )}

        {/* Tactical Prediction Verdict Box */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#0284C7]/20 via-[#111D3A] to-[#F59E0B]/20 border border-[#38BDF8]/40 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-[#F59E0B] shrink-0 animate-pulse" />
          <div>
            <h4 className="font-cinzel font-bold text-sm text-white">تحلیل هوشمند تقابل:</h4>
            <p className="text-xs text-[#E2E8F0] font-inter mt-0.5">
              {resultText}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

// Helper Component for Visual Stat Bars
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
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-orbitron">
        <span className="font-bold text-[#38BDF8]">{name1}: {val1}{unit}</span>
        <span className="text-[#94A3B8] font-bold text-[11px] uppercase tracking-wider">{label}</span>
        <span className="font-bold text-[#F59E0B]">{name2}: {val2}{unit}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 h-3.5 bg-[#0B132B] rounded-lg p-0.5 border border-[#38BDF8]/20">
        {/* Team 1 Bar (Fills right to left) */}
        <div className="flex justify-end bg-[#1C2541] rounded-l-md overflow-hidden">
          <div
            className="h-full rounded-l-md transition-all duration-500"
            style={{ width: `${pct1}%`, backgroundColor: color1 }}
          />
        </div>

        {/* Team 2 Bar (Fills left to right) */}
        <div className="bg-[#1C2541] rounded-r-md overflow-hidden">
          <div
            className="h-full rounded-r-md transition-all duration-500"
            style={{ width: `${pct2}%`, backgroundColor: color2 }}
          />
        </div>
      </div>
    </div>
  );
};

const BarChartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
