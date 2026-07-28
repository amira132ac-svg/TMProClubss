import React, { useState } from 'react';
import { Team, Match, Player } from '../types';
import { Swords, ArrowRightLeft, Sparkles, AlertCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface TeamCompareTabProps {
  teams: Team[];
  matches: Match[];
  players: Player[];
}

export const TeamCompareTab: React.FC<TeamCompareTabProps> = ({ teams, matches, players }) => {
  const { t } = useLanguage();
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

  const getWinRate = (team: Team) => (team.played > 0 ? Math.round((team.won / team.played) * 100) : 0);

  const team1WinRate = getWinRate(team1);
  const team2WinRate = getWinRate(team2);

  let resultText = t.compareNotice;
  if (team1.played > 0 && team2.played > 0) {
    const team1ScorePower = team1.points * 3 + team1.goalDifference * 2 + team1WinRate;
    const team2ScorePower = team2.points * 3 + team2.goalDifference * 2 + team2WinRate;

    if (team1ScorePower > team2ScorePower + 4) {
      const favorPercent = Math.min(85, 55 + Math.round((team1ScorePower - team2ScorePower) / 2));
      resultText = `${team1.name} (${team1.goalsFor} GF, GD ${team1.goalDifference}) has a ${favorPercent}% higher chance of advantage.`;
    } else if (team2ScorePower > team1ScorePower + 4) {
      const favorPercent = Math.min(85, 55 + Math.round((team2ScorePower - team1ScorePower) / 2));
      resultText = `${team2.name} (${team2.goalsFor} GF, GD ${team2.goalDifference}) has a ${favorPercent}% higher chance of advantage.`;
    } else {
      resultText = `${team1.name} and ${team2.name} have closely matched performances.`;
    }
  } else if (team1.played === 0 || team2.played === 0) {
    resultText = t.noMatchYet;
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
              <span>{t.compareTitle}</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-[#1B2960] border border-[#38BDF8]/40 text-[#38BDF8]">
                H2H
              </span>
            </h2>
            <p className="text-xs text-[#94A3B8] font-vazir mt-1">
              {t.compareSub}
            </p>
          </div>
        </div>

        <button
          onClick={handleSwap}
          className="px-4 py-2 rounded-xl bg-[#1B2960] hover:bg-[#152052] border border-[#38BDF8]/30 text-[#38BDF8] font-bold text-xs flex items-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>{t.swapTeams}</span>
        </button>
      </div>

      {/* Team Selection Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Team 1 Picker */}
        <div className="bg-[#10173A]/90 border border-[#38BDF8]/30 rounded-2xl p-4 shadow-md space-y-2">
          <label className="block text-xs text-[#38BDF8] font-bold">
            {t.selectTeam1}
          </label>
          <select
            value={team1Id}
            onChange={(e) => handleSelectTeam1(e.target.value)}
            className="w-full bg-[#0B112C] border border-[#38BDF8]/20 rounded-xl p-3 text-xs font-bold text-white focus:outline-none focus:border-[#38BDF8] cursor-pointer"
          >
            {teams.map(team => (
              <option key={team.id} value={team.id}>
                {team.name} ({team.played > 0 ? `${team.played} ${t.played} | ${team.points} ${t.points}` : '0 P'})
              </option>
            ))}
          </select>
        </div>

        {/* Team 2 Picker */}
        <div className="bg-[#10173A]/90 border border-[#38BDF8]/30 rounded-2xl p-4 shadow-md space-y-2">
          <label className="block text-xs text-[#38BDF8] font-bold">
            {t.selectTeam2}
          </label>
          <select
            value={team2Id}
            onChange={(e) => handleSelectTeam2(e.target.value)}
            className="w-full bg-[#0B112C] border border-[#38BDF8]/20 rounded-xl p-3 text-xs font-bold text-white focus:outline-none focus:border-[#38BDF8] cursor-pointer"
          >
            {teams.map(team => (
              <option key={team.id} value={team.id}>
                {team.name} ({team.played > 0 ? `${team.played} ${t.played} | ${team.points} ${t.points}` : '0 P'})
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
                  {t.groupLabel} {team1.group} • {team1.shortName}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-[#F59E0B]">
                {team1.points} <span className="text-xs text-[#94A3B8]">{t.points}</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">
                {team1.won} {t.won} - {team1.drawn} {t.drawn} - {team1.lost} {t.lost}
              </span>
            </div>
          </div>

          {/* Played Status Pill */}
          {team1.played === 0 ? (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{t.noMatchYet}</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0B112C] border border-[#38BDF8]/20 text-center">
              <div>
                <span className="text-[10px] text-[#94A3B8] block">{t.goalsScored}</span>
                <span className="text-sm font-bold text-emerald-400">⚽ {team1.goalsFor}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] block">{t.goalsConceded}</span>
                <span className="text-sm font-bold text-rose-400">🛡️ {team1.goalsAgainst}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] block">{t.goalDiff}</span>
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
                  {t.groupLabel} {team2.group} • {team2.shortName}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-[#F59E0B]">
                {team2.points} <span className="text-xs text-[#94A3B8]">{t.points}</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">
                {team2.won} {t.won} - {team2.drawn} {t.drawn} - {team2.lost} {t.lost}
              </span>
            </div>
          </div>

          {/* Played Status Pill */}
          {team2.played === 0 ? (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{t.noMatchYet}</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0B112C] border border-[#38BDF8]/20 text-center">
              <div>
                <span className="text-[10px] text-[#94A3B8] block">{t.goalsScored}</span>
                <span className="text-sm font-bold text-emerald-400">⚽ {team2.goalsFor}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] block">{t.goalsConceded}</span>
                <span className="text-sm font-bold text-rose-400">🛡️ {team2.goalsAgainst}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] block">{t.goalDiff}</span>
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
            <span>Statistical Comparison</span>
          </h3>

          <div className="space-y-5">
            <StatBar
              label={t.goalsScored}
              val1={team1.goalsFor}
              val2={team2.goalsFor}
              color1="#38BDF8"
              color2="#1E40AF"
              name1={team1.name}
              name2={team2.name}
            />

            <StatBar
              label={t.goalDiff}
              val1={team1.goalDifference}
              val2={team2.goalDifference}
              color1="#38BDF8"
              color2="#1E40AF"
              name1={team1.name}
              name2={team2.name}
            />

            <StatBar
              label={t.points}
              val1={team1.points}
              val2={team2.points}
              color1="#F59E0B"
              color2="#38BDF8"
              name1={team1.name}
              name2={team2.name}
              unit={` ${t.points}`}
            />
          </div>
        </div>
      )}

      {/* Tactical Prediction Verdict Box */}
      <div className="p-4 rounded-2xl bg-[#10173A]/90 border border-[#F59E0B]/30 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-[#F59E0B] shrink-0 animate-pulse" />
        <div>
          <h4 className="font-vazir font-bold text-sm text-[#F59E0B]">{t.compareAnalysis}</h4>
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

