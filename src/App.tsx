import React, { useState, useEffect } from 'react';
import { ActiveTab, Team, Match, Player } from './types';
import { initialTeams, initialMatches, initialTopScorers, initialTopAssists, computeStandings } from './data/initialData';
import { EmbersCanvas } from './components/EmbersCanvas';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { GroupsTab } from './components/GroupsTab';
import { StatsTab } from './components/StatsTab';
import { FixturesTab } from './components/FixturesTab';
import { TeamCompareTab } from './components/TeamCompareTab';
import { ShareBox } from './components/ShareBox';
import { SponsorFooter } from './components/SponsorFooter';
import { InstallModal } from './components/InstallModal';
import { TeamModal } from './components/TeamModal';
import { EditMatchModal } from './components/EditMatchModal';
import { SiteClosedScreen } from './components/SiteClosedScreen';
import { soundManager } from './utils/audio';
import { Lock, Unlock } from 'lucide-react';

export default function App() {
  const [isSiteClosed, setIsSiteClosed] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('groups');
  const [teams, setTeams] = useState<Team[]>(() => computeStandings(initialTeams, initialMatches));
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [topScorers, setTopScorers] = useState<Player[]>(initialTopScorers);
  const [topAssists, setTopAssists] = useState<Player[]>(initialTopAssists);

  // Modals
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Controls & PWA
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Screen shake & particle effects
  const [isShaking, setIsShaking] = useState(false);
  const [lastUpdatedMatchId, setLastUpdatedMatchId] = useState<string | null>(null);

  // Listen for PWA beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleNativeInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
    setIsInstallModalOpen(false);
  };

  const handleToggleSound = () => {
    const isNowPlaying = soundManager.toggleSound();
    setSoundEnabled(isNowPlaying);
  };

  // Recalculate standings when match score changes
  const handleSaveMatch = (updatedMatch: Match) => {
    const newMatches = matches.map((m) => (m.id === updatedMatch.id ? updatedMatch : m));
    setMatches(newMatches);
    setEditingMatch(null);

    // Trigger Screen Shake & Golden Particle Burst
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);

    setLastUpdatedMatchId(updatedMatch.id);
    setTimeout(() => setLastUpdatedMatchId(null), 3500);

    soundManager.playUiTab();

    // Recompute standings for all teams
    const newTeams = computeStandings(initialTeams, newMatches);
    setTeams(newTeams);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#060A21] via-[#0B1238] to-[#080D2B] text-slate-100 font-vazir relative overflow-x-hidden selection:bg-[#38BDF8] selection:text-[#060A21] flex flex-col justify-between ${isShaking ? 'animate-screen-shake' : ''}`}>
      
      {/* Background Particle Embers */}
      <EmbersCanvas />

      {/* If site is closed, render Site Closed Screen */}
      {isSiteClosed ? (
        <SiteClosedScreen onBypass={() => setIsSiteClosed(false)} />
      ) : (
        <>
          {/* Top Admin Bar when site is unlocked */}
          <div className="bg-[#10173A] border-b border-[#F59E0B]/30 px-4 py-2 flex items-center justify-between text-xs text-[#F59E0B] relative z-20">
            <div className="flex items-center gap-2">
              <Unlock className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="font-bold">دسترس مدیریت فعال است (سایت برای کاربران عمومی بسته می‌باشد)</span>
            </div>
            <button
              onClick={() => {
                soundManager.playUiClick();
                setIsSiteClosed(true);
              }}
              className="px-2.5 py-1 bg-[#1E2E6E] hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 font-bold rounded-lg flex items-center gap-1 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>بستن مجدد سایت</span>
            </button>
          </div>

          {/* Main Content Wrap */}
          <div>
            {/* Header */}
            <Header
              onOpenInstallModal={() => setIsInstallModalOpen(true)}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
              isAdminMode={isAdminMode}
              onToggleAdminMode={() => setIsAdminMode(!isAdminMode)}
            />

            {/* Navigation Tabs */}
            <Navigation
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
            />

            {/* Tab View Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 py-4">
              {activeTab === 'groups' && (
                <GroupsTab
                  teams={teams}
                  onSelectTeam={(team) => setSelectedTeam(team)}
                />
              )}

              {activeTab === 'stats' && (
                <StatsTab
                  topScorers={topScorers}
                  topAssists={topAssists}
                />
              )}

              {activeTab === 'fixtures' && (
                <FixturesTab
                  matches={matches}
                  isAdminMode={isAdminMode}
                  onEditMatch={(match) => setEditingMatch(match)}
                  lastUpdatedMatchId={lastUpdatedMatchId}
                />
              )}

              {activeTab === 'compare' && (
                <TeamCompareTab
                  teams={teams}
                  matches={matches}
                  players={[...topScorers, ...topAssists]}
                />
              )}
            </main>

            {/* Share Box */}
            <ShareBox />
          </div>

          {/* Sponsor Footer */}
          <SponsorFooter />

          {/* Modals */}
          <InstallModal
            isOpen={isInstallModalOpen}
            onClose={() => setIsInstallModalOpen(false)}
            deferredPrompt={deferredPrompt}
            onNativeInstall={handleNativeInstall}
          />

          <TeamModal
            team={selectedTeam}
            onClose={() => setSelectedTeam(null)}
            matches={matches}
            players={[...topScorers, ...topAssists]}
          />

          <EditMatchModal
            match={editingMatch}
            onClose={() => setEditingMatch(null)}
            onSave={handleSaveMatch}
          />
        </>
      )}

    </div>
  );
}
