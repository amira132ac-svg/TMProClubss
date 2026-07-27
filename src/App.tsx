import React, { useState, useEffect } from 'react';
import { ActiveTab, Team, Match, Player } from './types';
import { initialTeams, initialMatches, initialTopScorers, initialTopAssists } from './data/initialData';
import { EmbersCanvas } from './components/EmbersCanvas';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { GroupsTab } from './components/GroupsTab';
import { StatsTab } from './components/StatsTab';
import { FixturesTab } from './components/FixturesTab';
import { TeamCompareTab } from './components/TeamCompareTab';
import { PredictionsTab } from './components/PredictionsTab';
import { VoiceLoungesTab } from './components/VoiceLoungesTab';
import { ShareBox } from './components/ShareBox';
import { SponsorFooter } from './components/SponsorFooter';
import { InstallModal } from './components/InstallModal';
import { TeamModal } from './components/TeamModal';
import { EditMatchModal } from './components/EditMatchModal';
import { soundManager } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('groups');
  const [teams, setTeams] = useState<Team[]>(initialTeams);
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
    const newTeams = teams.map((team) => {
      // Find all finished matches involving this team
      const teamFinishedMatches = newMatches.filter(
        (m) => m.status === 'finished' && (m.homeTeamId === team.id || m.awayTeamId === team.id)
      );

      let played = 0;
      let won = 0;
      let drawn = 0;
      let lost = 0;
      let goalsFor = 0;
      let goalsAgainst = 0;
      const form: ('W' | 'D' | 'L')[] = [];

      teamFinishedMatches.forEach((m) => {
        played++;
        const isHome = m.homeTeamId === team.id;
        const myScore = isHome ? (m.homeScore ?? 0) : (m.awayScore ?? 0);
        const opponentScore = isHome ? (m.awayScore ?? 0) : (m.homeScore ?? 0);

        goalsFor += myScore;
        goalsAgainst += opponentScore;

        if (myScore > opponentScore) {
          won++;
          form.push('W');
        } else if (myScore === opponentScore) {
          drawn++;
          form.push('D');
        } else {
          lost++;
          form.push('L');
        }
      });

      const goalDifference = goalsFor - goalsAgainst;
      const points = won * 3 + drawn * 1;

      return {
        ...team,
        played,
        won,
        drawn,
        lost,
        goalsFor,
        goalsAgainst,
        goalDifference,
        points,
        form: form.slice(-4)
      };
    });

    setTeams(newTeams);
  };

  return (
    <div className={`min-h-screen bg-parchment text-[#E2E8F0] font-inter relative overflow-x-hidden selection:bg-[#38BDF8] selection:text-[#0B132B] flex flex-col justify-between ${isShaking ? 'animate-screen-shake' : ''}`}>
      
      {/* Background Particle Embers */}
      <EmbersCanvas />

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
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4">
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

          {activeTab === 'predictions' && (
            <PredictionsTab
              matches={matches}
            />
          )}

          {activeTab === 'lounges' && (
            <VoiceLoungesTab />
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

    </div>
  );
}
