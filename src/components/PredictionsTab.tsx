import React, { useState, useEffect } from 'react';
import { Match } from '../types';
import { Trophy, Lock, ShieldCheck, Target, Award, Sparkles, Check, ChevronDown, ChevronUp, UserCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PredictionsTabProps {
  matches: Match[];
}

interface UserPrediction {
  matchId: string;
  homeScore: number;
  awayScore: number;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  isCurrentUser: boolean;
  isLocked: boolean;
  points: number;
  exactScores: number;
  correctOutcomes: number;
  predictions: Record<string, { home: number; away: number }>;
  avatar: string;
}

const INITIAL_LEADERBOARD_SEED: LeaderboardEntry[] = [];

export const PredictionsTab: React.FC<PredictionsTabProps> = ({ matches }) => {
  // User name locking state
  const [usernameInput, setUsernameInput] = useState('');
  const [lockedUsername, setLockedUsername] = useState<string | null>(null);
  
  // User's predictions map matchId -> { home, away }
  const [userPredictions, setUserPredictions] = useState<Record<string, { home: number; away: number }>>({});
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);

  // Load locked username & user predictions on mount
  useEffect(() => {
    const savedName = localStorage.getItem('viking_locked_username');
    if (savedName) {
      setLockedUsername(savedName);
    }

    const savedPreds = localStorage.getItem('viking_user_predictions');
    if (savedPreds) {
      try {
        setUserPredictions(JSON.parse(savedPreds));
      } catch (e) {}
    }
  }, []);

  // Lock Username permanently
  const handleLockUsername = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = usernameInput.trim();
    if (!cleanName) return;

    soundManager.playUiClick();
    localStorage.setItem('viking_locked_username', cleanName);
    setLockedUsername(cleanName);
    setUsernameInput('');
  };

  // Update a single prediction input
  const handleScoreChange = (matchId: string, team: 'home' | 'away', val: number) => {
    const safeVal = Math.max(0, Math.min(20, val || 0));
    const updated = {
      ...userPredictions,
      [matchId]: {
        home: team === 'home' ? safeVal : userPredictions[matchId]?.home ?? 0,
        away: team === 'away' ? safeVal : userPredictions[matchId]?.away ?? 0
      }
    };
    setUserPredictions(updated);
  };

  // Save predictions
  const handleSavePredictions = () => {
    soundManager.playUiClick();
    localStorage.setItem('viking_user_predictions', JSON.stringify(userPredictions));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  // Calculate user points dynamically against finished matches
  const calculateUserPoints = () => {
    let points = 0;
    let exactScores = 0;
    let correctOutcomes = 0;

    matches.forEach(m => {
      if (m.status === 'finished' && m.homeScore !== null && m.awayScore !== null) {
        const pred = userPredictions[m.id];
        if (pred) {
          const isExact = pred.home === m.homeScore && pred.away === m.awayScore;
          const actualWinner = m.homeScore > m.awayScore ? 'home' : m.homeScore < m.awayScore ? 'away' : 'draw';
          const predWinner = pred.home > pred.away ? 'home' : pred.home < pred.away ? 'away' : 'draw';

          if (isExact) {
            points += 3;
            exactScores++;
          } else if (actualWinner === predWinner) {
            points += 1;
            correctOutcomes++;
          }
        }
      }
    });

    return { points, exactScores, correctOutcomes };
  };

  const userStats = calculateUserPoints();

  // Combine currentUser into Leaderboard
  const currentUserLeaderboardEntry: LeaderboardEntry | null = lockedUsername
    ? {
        id: 'current-user-locked',
        name: lockedUsername,
        isCurrentUser: true,
        isLocked: true,
        points: userStats.points,
        exactScores: userStats.exactScores,
        correctOutcomes: userStats.correctOutcomes,
        avatar: '🏆',
        predictions: userPredictions
      }
    : null;

  const fullLeaderboard: LeaderboardEntry[] = currentUserLeaderboardEntry
    ? [...INITIAL_LEADERBOARD_SEED, currentUserLeaderboardEntry]
    : INITIAL_LEADERBOARD_SEED;

  // Sort descending by points, then exactScores
  fullLeaderboard.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.exactScores - a.exactScores;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-[#111D3A]/90 border border-[#38BDF8]/30 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#0284C7]/20 border border-[#38BDF8]/40 text-[#F59E0B]">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-cinzel font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
              <span>MATCH PREDICTION & LEADERBOARD</span>
              <span className="text-xs font-orbitron px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/50 text-emerald-400">
                پیش‌بینی و لیدربورد
              </span>
            </h2>
            <p className="text-xs text-[#94A3B8] font-inter mt-1">
              Predict exact match scores! Earn 3 Points for exact score, 1 Point for correct match outcome.
            </p>
          </div>
        </div>

        {/* Lock Rules Badge */}
        <div className="p-3 rounded-xl bg-[#0B132B] border border-[#F59E0B]/30 text-right shrink-0">
          <span className="text-[11px] font-orbitron text-[#F59E0B] font-bold block flex items-center gap-1 justify-end">
            <Lock className="w-3.5 h-3.5" />
            <span>قوانین نام کاربری:</span>
          </span>
          <p className="text-[10px] text-[#94A3B8]">
            هر شخص فقط یکبار نام ثبت می‌کند و نام وی برای همیشه قفل می‌شود.
          </p>
        </div>
      </div>

      {/* Username Lock Registration Box */}
      {!lockedUsername ? (
        <div className="bg-gradient-to-r from-[#111D3A] via-[#1C2541] to-[#111D3A] border-2 border-[#F59E0B]/50 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-[#F59E0B]/20 pb-3">
            <ShieldCheck className="w-6 h-6 text-[#F59E0B]" />
            <div>
              <h3 className="font-cinzel font-bold text-base text-white">
                ثبت نام و قفل هویت شرکت‌کننده (Locked Participant Identity)
              </h3>
              <p className="text-xs text-[#94A3B8]">
                لطفاً یک نام یکتا برای خود وارد کنید. پس از ثبت، نام شما برای همیشه قفل خواهد شد و امکان تغییر نخواهد داشت.
              </p>
            </div>
          </div>

          <form onSubmit={handleLockUsername} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="نام یا آیدی خود را وارد کنید (مثلاً: Amir_Viking)"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="flex-1 bg-[#0B132B] border border-[#38BDF8]/40 rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#F59E0B]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0B132B] font-bold font-orbitron text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all shrink-0"
            >
              <Lock className="w-4 h-4" />
              <span>ثبت و قفل دائمی نام</span>
            </button>
          </form>
        </div>
      ) : (
        /* Locked Name Status Pill */
        <div className="bg-gradient-to-r from-emerald-950/80 via-[#111D3A] to-emerald-950/80 border border-emerald-500/50 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-orbitron font-bold text-[#94A3B8]">LOCKED PREDICTOR PROFILE:</span>
                <span className="text-base font-cinzel font-extrabold text-white">{lockedUsername}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>ثبت شده و غیرقابل تغییر</span>
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                امتیاز فعلی شما: <strong className="text-[#F59E0B]">{userStats.points} امتیاز</strong> (پیش‌بینی دقیق: {userStats.exactScores})
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Predict Matches & Global Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Matches Predictor Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#111D3A]/90 border border-[#38BDF8]/25 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#38BDF8]/20 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="font-cinzel font-bold text-base text-white">
                  پیش‌بینی نتایج مسابقات (PREDICT SCORES)
                </h3>
              </div>

              {lockedUsername && (
                <button
                  onClick={handleSavePredictions}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white font-bold text-xs font-orbitron border border-[#38BDF8] shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>ذخیره پیش‌بینی‌ها</span>
                </button>
              )}
            </div>

            {savedNotice && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4 h-4" />
                <span>پیش‌بینی‌های شما با موفقیت ثبت شد و در جدول لیدربورد اعمال گردید!</span>
              </div>
            )}

            {!lockedUsername && (
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>برای شرکت در پیش‌بینی و محاسبه امتیازات، ابتدا نام خود را در کادر بالا قفل کنید.</span>
              </div>
            )}

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
              {matches.map(m => {
                const pred = userPredictions[m.id] || { home: 0, away: 0 };
                const isFinished = m.status === 'finished';

                let pointBadge = null;
                if (isFinished && m.homeScore !== null && m.awayScore !== null) {
                  const isExact = pred.home === m.homeScore && pred.away === m.awayScore;
                  const actualWinner = m.homeScore > m.awayScore ? 'home' : m.homeScore < m.awayScore ? 'away' : 'draw';
                  const predWinner = pred.home > pred.away ? 'home' : pred.home < pred.away ? 'away' : 'draw';

                  if (isExact) {
                    pointBadge = <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/50 text-amber-400 font-bold text-[10px]">⭐ +3 PTS (دقیق)</span>;
                  } else if (actualWinner === predWinner) {
                    pointBadge = <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-bold text-[10px]">⚽ +1 PT (نتیجه)</span>;
                  } else {
                    pointBadge = <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-[10px]">0 PT</span>;
                  }
                }

                return (
                  <div key={m.id} className="p-3.5 rounded-xl bg-[#1C2541]/90 border border-[#38BDF8]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white w-full sm:w-auto justify-between sm:justify-start">
                      <span className="w-24 text-right truncate">{m.homeTeamName}</span>
                      <span className="text-[#94A3B8]">vs</span>
                      <span className="w-24 text-left truncate">{m.awayTeamName}</span>
                    </div>

                    {/* Inputs - Disabled if match finished or no locked username */}
                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        disabled={isFinished || !lockedUsername}
                        value={pred.home}
                        onChange={(e) => handleScoreChange(m.id, 'home', parseInt(e.target.value))}
                        className={`w-12 h-9 text-center border rounded-lg text-sm font-orbitron font-extrabold focus:outline-none transition-all ${
                          isFinished
                            ? 'bg-[#0B132B]/60 text-slate-400 border-slate-700/50 cursor-not-allowed opacity-75'
                            : 'bg-[#0B132B] text-white border-[#38BDF8]/30 focus:border-[#F59E0B]'
                        }`}
                      />
                      <span className="text-[#94A3B8] font-bold">:</span>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        disabled={isFinished || !lockedUsername}
                        value={pred.away}
                        onChange={(e) => handleScoreChange(m.id, 'away', parseInt(e.target.value))}
                        className={`w-12 h-9 text-center border rounded-lg text-sm font-orbitron font-extrabold focus:outline-none transition-all ${
                          isFinished
                            ? 'bg-[#0B132B]/60 text-slate-400 border-slate-700/50 cursor-not-allowed opacity-75'
                            : 'bg-[#0B132B] text-white border-[#38BDF8]/30 focus:border-[#F59E0B]'
                        }`}
                      />
                    </div>

                    {/* Status or Actual Score */}
                    <div className="text-right shrink-0 flex items-center gap-2">
                      {isFinished ? (
                        <div className="text-right flex flex-col items-end gap-1">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-400" />
                            <span>پایان یافته ({m.homeScore}-{m.awayScore})</span>
                          </span>
                          {pointBadge}
                        </div>
                      ) : (
                        <span className="px-2 py-1 rounded bg-[#0B132B] text-[#38BDF8] border border-[#38BDF8]/30 text-[10px] font-orbitron font-semibold">
                          پیش‌بینی باز است
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Global Leaderboard Table (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#111D3A]/90 border border-[#38BDF8]/25 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#38BDF8]/20 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="font-cinzel font-bold text-base text-white">
                  جدول لیدربورد پیش‌بینی (LEADERBOARD)
                </h3>
              </div>
              <span className="text-[11px] font-orbitron text-[#38BDF8] font-bold">
                RANKINGS
              </span>
            </div>

            <div className="space-y-2.5">
              {fullLeaderboard.length === 0 ? (
                <div className="p-6 rounded-xl bg-[#1C2541]/60 border border-[#38BDF8]/15 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#0B132B] border border-[#38BDF8]/30 flex items-center justify-center mx-auto text-[#F59E0B]">
                    <Award className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-white text-xs">
                    هنوز هیچ شرکت‌کننده‌ای ثبت نشده است
                  </p>
                  <p className="text-[11px] text-[#94A3B8] max-w-xs mx-auto">
                    نام خود را در کادر فوق قفل کنید و پیش‌بینی‌هایتان را ذخیره کنید تا اولین نفر در لیدربورد باشید!
                  </p>
                </div>
              ) : (
                fullLeaderboard.map((entry, index) => {
                const rank = index + 1;
                const isExpanded = expandedUser === entry.id;

                let rankBadge = (
                  <span className="w-6 h-6 rounded-full bg-[#1C2541] border border-[#38BDF8]/30 font-orbitron font-bold text-xs text-[#94A3B8] flex items-center justify-center">
                    #{rank}
                  </span>
                );

                if (rank === 1) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 text-[#0B132B] font-orbitron font-extrabold text-xs flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.6)]">
                      👑 1
                    </span>
                  );
                } else if (rank === 2) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-full bg-slate-300 text-[#0B132B] font-orbitron font-extrabold text-xs flex items-center justify-center shadow-md">
                      2
                    </span>
                  );
                } else if (rank === 3) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-full bg-amber-700 text-white font-orbitron font-extrabold text-xs flex items-center justify-center shadow-md">
                      3
                    </span>
                  );
                }

                return (
                  <div
                    key={entry.id}
                    className={`rounded-xl border transition-all ${
                      entry.isCurrentUser
                        ? 'bg-gradient-to-r from-[#0284C7]/25 via-[#1C2541] to-[#0284C7]/25 border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                        : 'bg-[#1C2541]/80 border-[#38BDF8]/15 hover:border-[#38BDF8]/40'
                    }`}
                  >
                    <div
                      onClick={() => setExpandedUser(isExpanded ? null : entry.id)}
                      className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        {rankBadge}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{entry.avatar}</span>
                            <span className="font-cinzel font-bold text-sm text-white">
                              {entry.name}
                            </span>
                            {entry.isCurrentUser && (
                              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold border border-emerald-500/30">
                                🔐 YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#94A3B8] font-orbitron">
                            دقیق: {entry.exactScores} | نتیجه: {entry.correctOutcomes}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-lg font-orbitron font-extrabold text-[#F59E0B]">
                            {entry.points}
                          </span>
                          <span className="text-[10px] text-[#94A3B8] block font-sans">PTS</span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#38BDF8]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                        )}
                      </div>
                    </div>

                    {/* Expandable predictions breakdown */}
                    {isExpanded && (
                      <div className="p-3 border-t border-[#38BDF8]/15 bg-[#0B132B]/80 text-xs space-y-1.5">
                        <p className="font-bold text-[#38BDF8] text-[10px] uppercase font-orbitron">
                          PREDICTIONS SUMMARY FOR {entry.name}:
                        </p>
                        {Object.keys(entry.predictions).length > 0 ? (
                          <div className="grid grid-cols-2 gap-1.5">
                            {Object.entries(entry.predictions).map(([matchId, p]) => {
                              const matchObj = matches.find(m => m.id === matchId);
                              return (
                                <div key={matchId} className="p-1.5 rounded bg-[#1C2541] border border-[#38BDF8]/10 text-[11px] flex justify-between">
                                  <span className="text-[#94A3B8] truncate">{matchObj ? `${matchObj.homeTeamName.slice(0, 3)}-${matchObj.awayTeamName.slice(0, 3)}` : matchId}:</span>
                                  <span className="font-bold text-[#F59E0B] font-orbitron">{p.home}-{p.away}</span>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-[#94A3B8] text-[11px]">هنوز پیش‌بینی ثبت نشده است.</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              }))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
