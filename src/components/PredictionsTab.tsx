import React, { useState, useEffect } from 'react';
import { Match } from '../types';
import { Trophy, Lock, ShieldCheck, Target, Award, Check, ChevronDown, ChevronUp, UserCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
  telegram?: string;
  isCurrentUser: boolean;
  isLocked: boolean;
  points: number;
  exactScores: number;
  correctOutcomes: number;
  predictions: Record<string, { home: number; away: number }>;
  avatar: string;
}

export const PredictionsTab: React.FC<PredictionsTabProps> = ({ matches }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [telegramInput, setTelegramInput] = useState('');
  const [lockedUsername, setLockedUsername] = useState<string | null>(null);
  const [lockedTelegram, setLockedTelegram] = useState<string | null>(null);
  
  const [userPredictions, setUserPredictions] = useState<Record<string, { home: number; away: number }>>({});
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [remoteLeaderboard, setRemoteLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isRealtimeActive, setIsRealtimeActive] = useState<boolean>(false);

  useEffect(() => {
    const savedName = localStorage.getItem('viking_locked_username');
    if (savedName) {
      setLockedUsername(savedName);
    }
    const savedTelegram = localStorage.getItem('viking_locked_telegram');
    if (savedTelegram) {
      setLockedTelegram(savedTelegram);
    }

    const savedPreds = localStorage.getItem('viking_user_predictions');
    if (savedPreds) {
      try {
        setUserPredictions(JSON.parse(savedPreds));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const path = 'predictions';
    setFirebaseError(null);
    const unsubscribe = onSnapshot(
      collection(db, path),
      (snapshot) => {
        setIsRealtimeActive(true);
        const entries: LeaderboardEntry[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && data.name) {
            entries.push({
              id: docSnap.id,
              name: data.name,
              telegram: data.telegram || '',
              isCurrentUser: lockedUsername ? data.name.toLowerCase() === lockedUsername.toLowerCase() : false,
              isLocked: true,
              points: data.points || 0,
              exactScores: data.exactScores || 0,
              correctOutcomes: data.correctOutcomes || 0,
              predictions: data.predictions || {},
              avatar: data.avatar || '🏆'
            });
          }
        });

        entries.sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          if (b.exactScores !== a.exactScores) return b.exactScores - a.exactScores;
          return (b.correctOutcomes || 0) - (a.correctOutcomes || 0);
        });

        setRemoteLeaderboard(entries);
      },
      (error) => {
        setIsRealtimeActive(false);
        const errMsg = error?.message || 'خطا در برقراری ارتباط با فایربیس';
        console.error("Firestore onSnapshot error:", error);
        setFirebaseError(`خطا در دریافت زنده لیدربرد از فایربیس: ${errMsg}`);
      }
    );

    return () => unsubscribe();
  }, [lockedUsername]);

  const handleLockUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = usernameInput.trim();
    let cleanTelegram = telegramInput.trim();
    if (!cleanName || !cleanTelegram) return;

    if (!cleanTelegram.startsWith('@')) {
      cleanTelegram = `@${cleanTelegram}`;
    }

    soundManager.playUiClick();
    setIsSaving(true);
    setFirebaseError(null);

    localStorage.setItem('viking_locked_username', cleanName);
    localStorage.setItem('viking_locked_telegram', cleanTelegram);
    setLockedUsername(cleanName);
    setLockedTelegram(cleanTelegram);
    setUsernameInput('');
    setTelegramInput('');

    const docId = cleanName.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    try {
      await setDoc(doc(db, 'predictions', docId), {
        id: docId,
        name: cleanName,
        telegram: cleanTelegram,
        points: userStats.points,
        exactScores: userStats.exactScores,
        correctOutcomes: userStats.correctOutcomes,
        avatar: '🏆',
        predictions: userPredictions,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("Firestore setDoc error:", err);
      setFirebaseError(`خطا در ذخیره‌سازی نام کاربر در فایربیس: ${errMsg}`);
      alert(`خطا در ثبت نام و ذخیره در فایربیس:\n${errMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

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

  const handleSavePredictions = async () => {
    soundManager.playUiClick();
    localStorage.setItem('viking_user_predictions', JSON.stringify(userPredictions));

    if (lockedUsername) {
      setIsSaving(true);
      setFirebaseError(null);
      const stats = calculateUserPoints();
      const docId = lockedUsername.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
      try {
        await setDoc(doc(db, 'predictions', docId), {
          id: docId,
          name: lockedUsername,
          telegram: lockedTelegram || '',
          points: stats.points,
          exactScores: stats.exactScores,
          correctOutcomes: stats.correctOutcomes,
          avatar: '🏆',
          predictions: userPredictions,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error("Firestore save predictions error:", err);
        setFirebaseError(`خطا در ذخیره‌سازی پیش‌بینی در فایربیس: ${errMsg}`);
        alert(`خطا در ذخیره پیش‌بینی‌ها در فایربیس:\n${errMsg}`);
      } finally {
        setIsSaving(false);
      }
    } else {
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    }
  };

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

  let fullLeaderboard = [...remoteLeaderboard];
  if (lockedUsername) {
    const foundIndex = fullLeaderboard.findIndex(
      e => e.name.toLowerCase() === lockedUsername.toLowerCase()
    );
    const currentUserEntry: LeaderboardEntry = {
      id: 'current-user-locked',
      name: lockedUsername,
      telegram: lockedTelegram || '',
      isCurrentUser: true,
      isLocked: true,
      points: userStats.points,
      exactScores: userStats.exactScores,
      correctOutcomes: userStats.correctOutcomes,
      avatar: '🏆',
      predictions: userPredictions
    };

    if (foundIndex >= 0) {
      fullLeaderboard[foundIndex] = {
        ...fullLeaderboard[foundIndex],
        telegram: lockedTelegram || fullLeaderboard[foundIndex].telegram,
        isCurrentUser: true,
        points: userStats.points,
        exactScores: userStats.exactScores,
        correctOutcomes: userStats.correctOutcomes,
        predictions: userPredictions
      };
    } else {
      fullLeaderboard.push(currentUserEntry);
    }
  }

  fullLeaderboard.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.exactScores - a.exactScores;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-vazir">
      
      {/* Firebase Error Alert Banner */}
      {firebaseError && (
        <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-200 text-xs flex items-center justify-between gap-3 animate-fade-in shadow-lg font-vazir">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span className="font-medium">{firebaseError}</span>
          </div>
          <button
            onClick={() => setFirebaseError(null)}
            className="px-2.5 py-1 rounded-lg bg-rose-500/30 text-white font-bold hover:bg-rose-500/50 transition-colors text-[11px] shrink-0"
          >
            بستن
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#10173A]/90 border border-[#38BDF8]/30 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#1B2960] border border-[#38BDF8]/40 text-[#F59E0B]">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-vazir font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
              <span>پیش‌بینی مسابقات و جدول لیدربورد</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-bold">
                بروزرسانی زنده
              </span>
            </h2>
            <p className="text-xs text-[#94A3B8] font-vazir mt-1">
              پیش‌بینی دقیق: ۳ امتیاز | پیش‌بینی برنده/مساوی: ۱ امتیاز
            </p>
          </div>
        </div>

        {/* Lock Rules Badge */}
        <div className="p-3 rounded-xl bg-[#0B112C] border border-[#F59E0B]/30 text-right shrink-0">
          <span className="text-[11px] text-[#F59E0B] font-bold block flex items-center gap-1 justify-end">
            <Lock className="w-3.5 h-3.5" />
            <span>قوانین نام کاربری:</span>
          </span>
          <p className="text-[10px] text-[#94A3B8] font-vazir">
            هر شخص یکبار نام ثبت می‌کند و نام وی برای همیشه قفل می‌شود.
          </p>
        </div>
      </div>

      {/* Username & Telegram Lock Registration Box */}
      {!lockedUsername ? (
        <div className="bg-[#10173A]/90 border border-[#F59E0B]/40 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-[#38BDF8]/20 pb-3">
            <ShieldCheck className="w-6 h-6 text-[#F59E0B]" />
            <div>
              <h3 className="font-vazir font-bold text-base text-white">
                ثبت نام و قفل هویت شرکت‌کننده
              </h3>
              <p className="text-xs text-[#94A3B8] font-vazir">
                لطفاً نام کامل و آیدی تلگرام خود را وارد کنید. اطلاعات شما برای همیشه قفل خواهد شد.
              </p>
            </div>
          </div>

          <form onSubmit={handleLockUsername} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              disabled={isSaving}
              placeholder="نام و نام خانوادگی یا اسم مستعار..."
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="flex-1 bg-[#0B112C] border border-[#38BDF8]/30 rounded-xl px-4 py-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#F59E0B] font-vazir"
            />
            <input
              type="text"
              required
              disabled={isSaving}
              placeholder="آیدی تلگرام (مثال: @username)..."
              value={telegramInput}
              onChange={(e) => setTelegramInput(e.target.value)}
              className="flex-1 bg-[#0B112C] border border-[#38BDF8]/30 rounded-xl px-4 py-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#F59E0B] font-vazir text-left"
              dir="ltr"
            />
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0A0E2A] font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all shrink-0 disabled:opacity-50 font-vazir"
            >
              <Lock className="w-4 h-4" />
              <span>{isSaving ? 'در حال ثبت...' : 'ثبت و قفل دائمی'}</span>
            </button>
          </form>
        </div>
      ) : (
        /* Locked Name & Telegram Status Pill */
        <div className="bg-[#10173A]/90 border border-emerald-500/40 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#94A3B8]">پروفایل ثبت شده:</span>
                <span className="text-base font-bold text-white">{lockedUsername}</span>
                {lockedTelegram && (
                  <span className="px-2 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8] text-xs font-bold border border-[#38BDF8]/40" dir="ltr">
                    {lockedTelegram}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>غیرقابل تغییر</span>
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5 font-vazir">
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
          <div className="bg-[#10173A]/90 border border-[#38BDF8]/25 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#38BDF8]/20 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="font-vazir font-bold text-base text-white">
                  پیش‌بینی نتایج مسابقات
                </h3>
              </div>

              {lockedUsername && (
                <button
                  onClick={handleSavePredictions}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl bg-[#38BDF8] text-[#0A0E2A] font-extrabold text-xs shadow-md hover:bg-[#00f0ff] active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-50 font-vazir"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSaving ? 'در حال ذخیره...' : 'ذخیره پیش‌بینی‌ها'}</span>
                </button>
              )}
            </div>

            {savedNotice && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce font-vazir">
                <CheckCircle2 className="w-4 h-4" />
                <span>پیش‌بینی‌های شما با موفقیت ثبت شد و در جدول لیدربورد اعمال گردید!</span>
              </div>
            )}

            {!lockedUsername && (
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2 font-vazir">
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
                    pointBadge = <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/50 text-amber-400 font-bold text-[10px]">⭐ +۳ امتیاز (دقیق)</span>;
                  } else if (actualWinner === predWinner) {
                    pointBadge = <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-bold text-[10px]">⚽ +۱ امتیاز (نتیجه)</span>;
                  } else {
                    pointBadge = <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-[10px]">۰ امتیاز</span>;
                  }
                }

                return (
                  <div key={m.id} className="p-3.5 rounded-xl bg-[#0D1117] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-vazir">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#E6E8EC] w-full sm:w-auto justify-between sm:justify-start">
                      <span className="w-28 text-right truncate">{m.homeTeamName}</span>
                      <span className="text-[#94A3B8]">مقابل</span>
                      <span className="w-28 text-left truncate">{m.awayTeamName}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        disabled={isFinished || !lockedUsername}
                        value={pred.home}
                        onChange={(e) => handleScoreChange(m.id, 'home', parseInt(e.target.value))}
                        className={`w-12 h-9 text-center border rounded-lg text-sm font-bold focus:outline-none transition-all ${
                          isFinished
                            ? 'bg-[#121621] text-slate-400 border-slate-700/50 cursor-not-allowed opacity-75'
                            : 'bg-[#121621] text-[#E6E8EC] border-white/20 focus:border-[#D4AF37]'
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
                        className={`w-12 h-9 text-center border rounded-lg text-sm font-bold focus:outline-none transition-all ${
                          isFinished
                            ? 'bg-[#121621] text-slate-400 border-slate-700/50 cursor-not-allowed opacity-75'
                            : 'bg-[#121621] text-[#E6E8EC] border-white/20 focus:border-[#D4AF37]'
                        }`}
                      />
                    </div>

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
                        <span className="px-2 py-1 rounded bg-[#121621] text-[#D4AF37] border border-white/10 text-[10px] font-semibold">
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
          <div className="bg-[#161B26] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4 font-vazir">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-vazir font-bold text-base text-[#E6E8EC]">
                  جدول لیدربورد پیش‌بینی
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isRealtimeActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className="text-[11px] text-[#D4AF37] font-bold">
                  {isRealtimeActive ? 'زنده (Realtime)' : 'جدول رده‌بندی'}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              {fullLeaderboard.length === 0 ? (
                <div className="p-6 rounded-xl bg-[#0D1117] border border-white/10 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#161B26] border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <Award className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-[#E6E8EC] text-xs">
                    هنوز هیچ شرکت‌کننده‌ای ثبت نشده است
                  </p>
                  <p className="text-[11px] text-[#94A3B8] max-w-xs mx-auto">
                    نام خود را در کادر فوق قفل کنید و پیش‌بینی‌هایتان را ذخیره کنید!
                  </p>
                </div>
              ) : (
                fullLeaderboard.map((entry, index) => {
                const rank = index + 1;
                const isExpanded = expandedUser === entry.id;

                let rankBadge = (
                  <span className="w-6 h-6 rounded-full bg-[#0D1117] border border-white/10 font-bold text-xs text-[#94A3B8] flex items-center justify-center">
                    #{rank}
                  </span>
                );

                if (rank === 1) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0D1117] font-extrabold text-xs flex items-center justify-center shadow-md">
                      👑 ۱
                    </span>
                  );
                } else if (rank === 2) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-full bg-slate-300 text-[#0D1117] font-extrabold text-xs flex items-center justify-center shadow-md">
                      ۲
                    </span>
                  );
                } else if (rank === 3) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-full bg-amber-800 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                      ۳
                    </span>
                  );
                }

                return (
                  <div
                    key={entry.id}
                    className={`rounded-xl border transition-all ${
                      entry.isCurrentUser
                        ? 'bg-[#121621] border-[#D4AF37] shadow-md'
                        : 'bg-[#0D1117] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div
                      onClick={() => setExpandedUser(isExpanded ? null : entry.id)}
                      className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        {rankBadge}
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-base">{entry.avatar}</span>
                            <span className="font-bold text-sm text-[#E6E8EC]">
                              {entry.name}
                            </span>
                            {entry.telegram && (
                              <span className="text-[11px] font-semibold text-[#38BDF8]" dir="ltr">
                                ({entry.telegram})
                              </span>
                            )}
                            {entry.isCurrentUser && (
                              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold border border-emerald-500/30">
                                🔐 شما
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#94A3B8]">
                            دقیق: {entry.exactScores} | نتیجه: {entry.correctOutcomes}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-lg font-extrabold text-[#D4AF37]">
                            {entry.points}
                          </span>
                          <span className="text-[10px] text-[#94A3B8] block">امتیاز</span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-3 border-t border-white/10 bg-[#121621] text-xs space-y-1.5">
                        <p className="font-bold text-[#D4AF37] text-[10px]">
                          خلاصه پیش‌بینی‌های {entry.name}:
                        </p>
                        {Object.keys(entry.predictions).length > 0 ? (
                          <div className="grid grid-cols-2 gap-1.5">
                            {Object.entries(entry.predictions).map(([matchId, p]: [string, { home: number; away: number }]) => {
                              const matchObj = matches.find(m => m.id === matchId);
                              return (
                                <div key={matchId} className="p-1.5 rounded bg-[#0D1117] border border-white/10 text-[11px] flex justify-between">
                                  <span className="text-[#94A3B8] truncate">{matchObj ? `${matchObj.homeTeamName.slice(0, 8)}-${matchObj.awayTeamName.slice(0, 8)}` : matchId}:</span>
                                  <span className="font-bold text-[#D4AF37]">{p.home}-{p.away}</span>
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
