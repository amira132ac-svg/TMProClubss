import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fa';

export const translations = {
  en: {
    // Header
    superleague: 'SUPERLEAGUE',
    ragnarok: 'RAGNAROK',
    season4: 'Season 4',
    championsCup: 'Professional Super League - Champions Cup',
    installApp: 'Install App',
    telegramChannel: 'Telegram Channel',
    soundToggle: 'Sound',

    // Navigation Tabs
    groupsTab: 'Standings & Groups',
    statsTab: 'Stats & Leaderboards',
    fixturesTab: 'Fixtures & Results',
    compareTab: 'Team Comparison',

    // Groups Tab
    groupsTitle: 'Group Stage Standings',
    groupsSubtitle: 'Season 4 Groups & Standings',
    qualifyRule: 'Top 2 teams from each group qualify directly for the Playoffs',
    groupLabel: 'Group',
    teamsCount: 'Teams',
    rank: '#',
    team: 'Team',
    played: 'P',
    won: 'W',
    drawn: 'D',
    lost: 'L',
    goalsFor: 'GF',
    goalsAgainst: 'GA',
    goalDiff: 'GD',
    points: 'Pts',
    form: 'Form',

    // Fixtures Tab
    fixturesTitle: 'Match Schedule & Results',
    fixturesSubtitle: 'Schedule and live results for Season 4',
    allStatus: 'All',
    resultsStatus: 'Results',
    upcomingStatus: 'Upcoming',
    allGroups: 'All',
    allDays: 'All Days',
    matchDay: 'Day:',
    round: 'Round',
    finished: 'Finished',
    notPlayed: 'Not Played',
    live: 'Live',
    noMatches: 'No matches found for the selected filter',
    daySunday: 'Sunday',
    dayMonday: 'Monday',
    dayTuesday: 'Tuesday',
    daySaturday: 'Saturday',
    dayTBD: 'TBD',

    // Stats Tab
    statsTitle: 'Stats & Player Leaderboards',
    statsSubtitle: 'Top scorers, assists, and overall team statistics for Season 4',
    searchPlaceholder: 'Search player or club...',
    statsNotice: 'Top scorers, assists, and overall team stats updated. ✨',
    topScorers: 'Top Scorers',
    topScorersSub: 'Leading goal scorers',
    topAssists: 'Top Assists',
    topAssistsSub: 'Leading assist providers',
    overallTeamStats: '📊 Overall Team Statistics',
    overallTeamStatsSub: 'Total goals, assists, and points per team',
    playerBreakdown: '📋 Player Performance Breakdown by Team',
    goals: 'Goals',
    assists: 'Assists',
    totalPoints: 'Total Points (Goals + Assists)',
    playerNotFound: 'No players found',
    goalsUnit: 'goals',
    assistsUnit: 'assists',

    // Compare Tab
    compareTitle: 'Direct Team Comparison',
    compareSub: 'Statistical analysis based on played matches, goals, goal diff, and performance',
    swapTeams: 'Swap Teams',
    selectTeam1: 'Select First Team',
    selectTeam2: 'Select Second Team',
    noMatchYet: 'This team has not played any matches yet.',
    compareAnalysis: 'Match Analysis:',
    compareNotice: 'Real statistical comparison based on tournament results.',
    goalsScored: 'Goals Scored',
    goalsConceded: 'Goals Conceded',
    winRate: 'Win Rate',

    // Footer / Misc
    shareTitle: 'Share Application',
    shareSub: 'Share Superleague Ragnarok with friends',
    copyLink: 'Copy Link',
    copied: 'Copied!',
    sponsors: 'Official Sponsors & Partners',
  },
  fa: {
    // Header
    superleague: 'SUPERLEAGUE',
    ragnarok: 'RAGNAROK',
    season4: 'فصل ۴',
    championsCup: 'سوپر لیگ حرفه‌ای - کاپ قهرمانان',
    installApp: 'نصب اپلیکیشن',
    telegramChannel: 'کانال تلگرام',
    soundToggle: 'صدا',

    // Navigation Tabs
    groupsTab: 'جدول و گروه‌ها',
    statsTab: 'آمار و گلزنان',
    fixturesTab: 'برنامه مسابقات',
    compareTab: 'مقایسه تیم‌ها',

    // Groups Tab
    groupsTitle: 'جدول رده‌بندی مرحله گروهی',
    groupsSubtitle: 'گروه‌بندی و جدول رده‌بندی فصل ۴',
    qualifyRule: 'تیم‌های اول و دوم هر گروه صعود مستقیم به مرحله پلی‌آف خواهند داشت',
    groupLabel: 'گروه',
    teamsCount: 'تیم‌ها',
    rank: '#',
    team: 'تیم',
    played: 'بازی',
    won: 'برد',
    drawn: 'مساوی',
    lost: 'باخت',
    goalsFor: 'گ‌ز',
    goalsAgainst: 'گ‌خ',
    goalDiff: 'تفاضل',
    points: 'امتیاز',
    form: 'فرم',

    // Fixtures Tab
    fixturesTitle: 'برنامه و نتایج مسابقات',
    fixturesSubtitle: 'جدول زمان‌بندی و نتایج زنده فصل ۴ سوپرلیگ',
    allStatus: 'همه',
    resultsStatus: 'نتایج',
    upcomingStatus: 'پیش‌رو',
    allGroups: 'همه',
    allDays: 'همه روزها',
    matchDay: 'روز برگزاری:',
    round: 'دور',
    finished: 'پایان یافته',
    notPlayed: 'برگذار نشده',
    live: 'زنده',
    noMatches: 'هیچ مسابقه‌ای برای فیلتر انتخاب شده یافت نشد',
    daySunday: 'یکشنبه',
    dayMonday: 'دوشنبه',
    dayTuesday: 'سه‌شنبه',
    daySaturday: 'شنبه',
    dayTBD: 'نامشخص',

    // Stats Tab
    statsTitle: 'آمار و جدول گلزنان / پاس گل',
    statsSubtitle: 'برترین گلزنان، پاسورها و عملکرد کلی تیم‌های فصل ۴ سوپرلیگ',
    searchPlaceholder: 'جستجوی نام بازیکن یا باشگاه...',
    statsNotice: 'آمار گلزنان، پاسورها و عملکرد کلی تیم‌ها به‌روزرسانی شد. ✨',
    topScorers: 'جدول گلزنان برتر',
    topScorersSub: 'برترین گلزنان مسابقات',
    topAssists: 'جدول پاس گل‌دهندگان',
    topAssistsSub: 'برترین پاسورهای مسابقات',
    overallTeamStats: '📊 آمار کلی تیم‌ها',
    overallTeamStatsSub: 'مجموع گل، پاس گل و امتیاز کل بازیکنان هر تیم',
    playerBreakdown: '📋 جزئیات عملکرد بازیکنان به تفکیک تیم',
    goals: 'گل‌ها',
    assists: 'پاس گل',
    totalPoints: 'مجموع امتیاز (گل + پاس)',
    playerNotFound: 'بازیکنی یافت نشد',
    goalsUnit: 'گل',
    assistsUnit: 'پاس',

    // Compare Tab
    compareTitle: 'مقایسه مستقیم تیم‌ها',
    compareSub: 'تحلیل آماری بر اساس بازی‌های انجام شده، آمار گل زده/خورده، تفاضل و عملکرد.',
    swapTeams: 'جابجایی دو تیم',
    selectTeam1: 'انتخاب تیم اول',
    selectTeam2: 'انتخاب تیم دوم',
    noMatchYet: 'این تیم هنوز مسابقه‌ای در تورنمنت برگزار نکرده است.',
    compareAnalysis: 'تحلیل تقابل:',
    compareNotice: 'مقایسه واقعی بر اساس بازی‌های انجام شده.',
    goalsScored: 'گل زده',
    goalsConceded: 'گل خورده',
    winRate: 'درصد برد',

    // Footer / Misc
    shareTitle: 'اشتراک‌گذاری برنامه‌',
    shareSub: 'اشتراک‌گذاری سوپرلیگ راگناروک با دوستان',
    copyLink: 'کپی لینک',
    copied: 'کپی شد!',
    sponsors: 'حامیان و اسپانسرهای رسمی',
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'fa' || saved === 'en') ? saved : 'en'; // Default is English as requested
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('app_language', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'fa' : 'en');
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
