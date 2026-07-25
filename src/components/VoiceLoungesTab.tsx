import React, { useState, useEffect } from 'react';
import { VoiceLounge } from '../types';
import { Volume2, VolumeX, Mic, MicOff, Users, ExternalLink, Plus, Radio, Sparkles, MessageSquare, Shield, CheckCircle2 } from 'lucide-react';
import { RuneCorners } from './RuneCorners';
import { soundManager } from '../utils/audio';

export const initialLounges: VoiceLounge[] = [
  {
    id: 'lounge-1',
    name: 'Valhalla Matchday Central',
    description: 'Official matchday live voice commentary & community reactions for Season 4!',
    category: 'Match Chat',
    activeCount: 0,
    maxCapacity: 50,
    icon: '🏰',
    hostName: 'Chieftain Ragnar',
    meetUrl: 'https://meet.google.com/new',
    tags: ['Google Meet', 'Live Commentary', 'Matchday'],
    isGoogleMeet: true
  },
  {
    id: 'lounge-2',
    name: 'Tactics & Shield-Wall Room',
    description: 'Analyze Group A & B team formations, strategy debates, and team squad lineups.',
    category: 'Team Tactics',
    activeCount: 0,
    maxCapacity: 30,
    icon: '⚔️',
    hostName: 'Coach Bjorn',
    meetUrl: 'https://meet.google.com/new',
    tags: ['Tactics', 'Formations', 'Google Meet'],
    isGoogleMeet: true
  },
  {
    id: 'lounge-3',
    name: 'Viking Shield-Bros Tavern & Chill',
    description: 'Relax with epic Viking music, chant war drums, and chill with fellow fans.',
    category: 'Viking Tavern',
    activeCount: 0,
    maxCapacity: 100,
    icon: '🍺',
    hostName: 'Skald Torstein',
    meetUrl: 'https://meet.google.com/new',
    tags: ['Music', 'Chill', 'Community'],
    isGoogleMeet: true
  },
  {
    id: 'lounge-4',
    name: 'Group C & D Fan Arena',
    description: 'Vanguard FC, SoroushFC, Young Wizard & Vikings fan banter & prediction chat.',
    category: 'Match Chat',
    activeCount: 0,
    maxCapacity: 40,
    icon: '🛡️',
    hostName: 'Aria Ragnarsson',
    meetUrl: 'https://meet.google.com/new',
    tags: ['Group C', 'Group D', 'Banter'],
    isGoogleMeet: true
  },
  {
    id: 'lounge-5',
    name: 'General Ragnarok Chill Hall',
    description: 'Open mic space for general discussion, FIFA tactics, and meeting new allies.',
    category: 'General Chill',
    activeCount: 0,
    maxCapacity: 50,
    icon: '🔥',
    hostName: 'Ehsan Viking',
    meetUrl: 'https://meet.google.com/new',
    tags: ['Open Mic', 'General', 'Google Meet'],
    isGoogleMeet: true
  }
];

export const VoiceLoungesTab: React.FC = () => {
  const [lounges, setLounges] = useState<VoiceLounge[]>(initialLounges);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeRoom, setActiveRoom] = useState<VoiceLounge | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCreatingModalOpen, setIsCreatingModalOpen] = useState(false);

  // New lounge form state
  const [newLoungeName, setNewLoungeName] = useState('');
  const [newLoungeDesc, setNewLoungeDesc] = useState('');
  const [newLoungeCategory, setNewLoungeCategory] = useState<'Match Chat' | 'Team Tactics' | 'Viking Tavern' | 'General Chill'>('General Chill');
  const [newLoungeHost, setNewLoungeHost] = useState('');

  // Audio wave visualizer levels
  const [waveHeights, setWaveHeights] = useState<number[]>([40, 70, 30, 90, 60, 20, 80, 50]);

  useEffect(() => {
    if (!activeRoom || isMuted) return;
    const interval = setInterval(() => {
      setWaveHeights(waveHeights.map(() => Math.floor(Math.random() * 80) + 20));
    }, 150);
    return () => clearInterval(interval);
  }, [activeRoom, isMuted]);

  const categories = ['ALL', 'Match Chat', 'Team Tactics', 'Viking Tavern', 'General Chill'];

  const filteredLounges = activeCategory === 'ALL'
    ? lounges
    : lounges.filter(l => l.category === activeCategory);

  const handleLeaveRoom = () => {
    soundManager.playUiClick();
    if (activeRoom) {
      setLounges(prev =>
        prev.map(l => (l.id === activeRoom.id ? { ...l, activeCount: Math.max(0, l.activeCount - 1) } : l))
      );
      setActiveRoom(null);
    }
  };

  const handleJoinRoom = (lounge: VoiceLounge) => {
    soundManager.playUiClick();
    if (activeRoom?.id === lounge.id) {
      handleLeaveRoom();
    } else {
      // Leave previous room if any
      if (activeRoom) {
        setLounges(prev =>
          prev.map(l => (l.id === activeRoom.id ? { ...l, activeCount: Math.max(0, l.activeCount - 1) } : l))
        );
      }
      // Join new room
      const newCount = lounge.activeCount + 1;
      setLounges(prev =>
        prev.map(l => (l.id === lounge.id ? { ...l, activeCount: newCount } : l))
      );
      setActiveRoom({ ...lounge, activeCount: newCount });
      setIsMuted(false);
    }
  };

  const handleCreateLoungeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLoungeName.trim()) return;

    soundManager.playUiClick();
    const created: VoiceLounge = {
      id: `lounge-custom-${Date.now()}`,
      name: newLoungeName,
      description: newLoungeDesc || 'Public voice lounge room created by community member.',
      category: newLoungeCategory,
      activeCount: 1,
      maxCapacity: 40,
      icon: newLoungeCategory === 'Viking Tavern' ? '🍺' : newLoungeCategory === 'Team Tactics' ? '⚔️' : '🎤',
      hostName: newLoungeHost.trim() || 'Viking Warrior',
      meetUrl: 'https://meet.google.com/new',
      tags: ['Google Meet', 'Custom Lounge', 'Community'],
      isGoogleMeet: true
    };

    setLounges([created, ...lounges]);
    setIsCreatingModalOpen(false);
    setNewLoungeName('');
    setNewLoungeDesc('');
    setNewLoungeHost('');
    setActiveRoom(created);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 my-6 space-y-6">
      
      {/* Banner / Header Card */}
      <div className="parchment-card parchment-card-hover rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <RuneCorners />
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#8E2D2D] text-[#FAF6F0] text-[10px] font-orbitron font-extrabold tracking-wider flex items-center gap-1">
              <Radio className="w-3 h-3 animate-pulse text-[#B99668]" />
              GOOGLE MEET VOICE LOUNGES
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#EAE3D8] border border-[#DDD0BF] text-[#3A2A22] text-[10px] font-orbitron font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#34A853]" />
              Workspace Connected
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#3A2A22] tracking-wide">
            Public Voice & Chill Halls
          </h2>
          <p className="text-xs sm:text-sm text-[#8A6444] font-inter max-w-2xl">
            Gather with fellow warriors, debate match tactics, or hang out in instant public Google Meet voice spaces created for Season 4!
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center">
          <button
            onClick={() => {
              soundManager.playUiClick();
              window.open('https://meet.google.com/new', '_blank');
            }}
            className="px-4 py-2.5 rounded-lg bg-[#FAF6F0] border border-[#B99668] text-[#3A2A22] font-inter text-xs font-bold flex items-center gap-2 hover:bg-[#F2ECE3] transition-all shadow-sm"
          >
            <ExternalLink className="w-4 h-4 text-[#8E2D2D]" />
            Instant Google Meet
          </button>
          
          <button
            onClick={() => {
              soundManager.playUiClick();
              setIsCreatingModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-lg bg-[#8E2D2D] text-[#FAF6F0] font-inter text-xs font-bold flex items-center gap-2 hover:bg-[#722323] transition-all shadow-md border border-[#B99668]/50"
          >
            <Plus className="w-4 h-4 text-[#B99668]" />
            Create Voice Room
          </button>
        </div>
      </div>

      {/* ACTIVE CONNECTED ROOM BAR (if joined) */}
      {activeRoom && (
        <div className="bg-[#8E2D2D] text-[#FAF6F0] rounded-xl p-4 sm:p-5 shadow-lg border border-[#B99668] relative overflow-hidden animate-fade-in flex flex-col sm:flex-row items-center justify-between gap-4">
          <RuneCorners />
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-full bg-[#3A2A22] border-2 border-[#B99668] flex items-center justify-center text-2xl shadow-inner shrink-0">
              {activeRoom.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-orbitron text-[#B99668] font-bold uppercase tracking-wider">
                  Connected Live in {activeRoom.name}
                </span>
              </div>
              <p className="text-sm font-bold font-cinzel text-white">Host: {activeRoom.hostName}</p>
              <p className="text-xs text-[#FAF6F0]/80 font-inter">{activeRoom.activeCount + 1} Warriors in lounge</p>
            </div>
          </div>

          {/* Equalizer Waveform & Mute Controls */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-end gap-1 h-8 px-3 py-1 bg-[#3A2A22]/40 rounded-lg border border-[#B99668]/30">
              {waveHeights.map((h, idx) => (
                <div
                  key={idx}
                  className="w-1 bg-[#B99668] rounded-t transition-all duration-150"
                  style={{ height: `${isMuted ? 4 : h}%` }}
                />
              ))}
            </div>

            <button
              onClick={() => {
                soundManager.playUiClick();
                setIsMuted(!isMuted);
              }}
              className={`p-2.5 rounded-lg border transition-all text-xs font-bold flex items-center gap-1.5 ${
                isMuted
                  ? 'bg-red-900/80 border-red-500 text-red-200'
                  : 'bg-emerald-900/80 border-emerald-500 text-emerald-100'
              }`}
            >
              {isMuted ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4 text-emerald-400" />}
              <span>{isMuted ? 'Muted' : 'Speaking'}</span>
            </button>

            <a
              href={activeRoom.meetUrl || 'https://meet.google.com/new'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playUiClick()}
              className="px-3.5 py-2.5 rounded-lg bg-[#B99668] hover:bg-[#a38054] text-[#3A2A22] font-orbitron font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Google Meet
            </a>

            <button
              onClick={handleLeaveRoom}
              className="px-3.5 py-2.5 rounded-lg bg-[#3A2A22] hover:bg-[#201510] text-[#FAF6F0] font-inter text-xs font-semibold border border-[#B99668]/40 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Leave Room</span>
            </button>
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundManager.playUiClick();
              setActiveCategory(cat);
            }}
            className={`px-4 py-2 rounded-lg font-orbitron text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#8E2D2D] text-[#FAF6F0] shadow-sm border border-[#B99668]/50'
                : 'bg-[#FAF6F0] border border-[#DDD0BF] text-[#3A2A22] hover:bg-[#F2ECE3]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lounges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLounges.map((lounge) => {
          const isCurrentActive = activeRoom?.id === lounge.id;

          return (
            <div
              key={lounge.id}
              className={`parchment-card parchment-card-hover rounded-xl p-5 shadow-sm transition-all duration-300 flex flex-col justify-between gap-4 border ${
                isCurrentActive ? 'border-2 border-[#8E2D2D] bg-[#F8F1E5]' : 'border-[#DDD0BF]'
              }`}
            >
              <RuneCorners />

              {/* Top Row: Category & Capacity */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#EAE3D8] text-[#3A2A22] text-[10px] font-orbitron font-bold uppercase tracking-wider">
                  {lounge.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-orbitron font-bold">
                  <Users className="w-3.5 h-3.5 text-[#B99668]" />
                  <span className={lounge.activeCount > 0 ? 'text-emerald-700 font-extrabold' : 'text-[#8A6444]'}>
                    {lounge.activeCount > 0 ? `${lounge.activeCount} Live` : `0/${lounge.maxCapacity}`}
                  </span>
                  {lounge.activeCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Middle: Title & Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAE3D8] border border-[#DDD0BF] flex items-center justify-center text-xl shrink-0 shadow-inner">
                    {lounge.icon}
                  </div>
                  <div>
                    <h3 className="font-cinzel font-bold text-base text-[#3A2A22] line-clamp-1">
                      {lounge.name}
                    </h3>
                    <p className="text-xs text-[#8A6444] font-inter">Host: {lounge.hostName}</p>
                  </div>
                </div>

                <p className="text-xs text-[#3A2A22]/80 font-inter line-clamp-2 leading-relaxed">
                  {lounge.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {lounge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-inter bg-[#F2ECE3] text-[#8A6444] border border-[#DDD0BF]/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#DDD0BF]/60">
                <button
                  onClick={() => handleJoinRoom(lounge)}
                  className={`flex-1 py-2.5 px-3 rounded-lg font-inter text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isCurrentActive
                      ? 'bg-[#8E2D2D] text-[#FAF6F0] shadow-sm'
                      : 'bg-[#FAF6F0] border border-[#B99668] text-[#3A2A22] hover:bg-[#8E2D2D] hover:text-[#FAF6F0]'
                  }`}
                >
                  <Radio className={`w-3.5 h-3.5 ${isCurrentActive ? 'animate-pulse text-[#B99668]' : ''}`} />
                  {isCurrentActive ? 'Leave Voice' : 'Join Web Voice'}
                </button>

                <a
                  href={lounge.meetUrl || 'https://meet.google.com/new'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playUiClick()}
                  className="py-2.5 px-3 rounded-lg bg-[#EAE3D8] hover:bg-[#DDD0BF] text-[#3A2A22] border border-[#DDD0BF] font-inter text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  title="Open in Google Meet"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#4285F4]" />
                  <span>Google Meet</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE VOICE ROOM MODAL */}
      {isCreatingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3A2A22]/60 backdrop-blur-sm animate-fade-in">
          <div className="parchment-card rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
            <RuneCorners />
            
            {/* Modal Header */}
            <div className="bg-[#EAE3D8] p-5 border-b border-[#DDD0BF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#8E2D2D]" />
                <h3 className="font-cinzel font-bold text-lg text-[#3A2A22]">Create Public Voice Room</h3>
              </div>
              <button
                onClick={() => setIsCreatingModalOpen(false)}
                className="text-[#8A6444] hover:text-[#3A2A22] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLoungeSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold font-orbitron text-[#3A2A22] mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shield-Bros Post-Match Chill"
                  value={newLoungeName}
                  onChange={(e) => setNewLoungeName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F2ECE3] border border-[#DDD0BF] text-xs font-inter text-[#3A2A22] focus:outline-none focus:border-[#8E2D2D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-orbitron text-[#3A2A22] mb-1">
                  Host Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Captain Torstein"
                  value={newLoungeHost}
                  onChange={(e) => setNewLoungeHost(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F2ECE3] border border-[#DDD0BF] text-xs font-inter text-[#3A2A22] focus:outline-none focus:border-[#8E2D2D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-orbitron text-[#3A2A22] mb-1">
                  Category
                </label>
                <select
                  value={newLoungeCategory}
                  onChange={(e) => setNewLoungeCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F2ECE3] border border-[#DDD0BF] text-xs font-inter text-[#3A2A22] focus:outline-none focus:border-[#8E2D2D]"
                >
                  <option value="Match Chat">Match Chat</option>
                  <option value="Team Tactics">Team Tactics</option>
                  <option value="Viking Tavern">Viking Tavern</option>
                  <option value="General Chill">General Chill</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold font-orbitron text-[#3A2A22] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="What are warriors discussing in this hall?"
                  value={newLoungeDesc}
                  onChange={(e) => setNewLoungeDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F2ECE3] border border-[#DDD0BF] text-xs font-inter text-[#3A2A22] focus:outline-none focus:border-[#8E2D2D]"
                />
              </div>

              <div className="p-3 bg-[#EAE3D8]/60 rounded-lg border border-[#DDD0BF] text-[11px] text-[#8A6444] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0" />
                <span>Every room includes an instant Google Meet space link for high-definition video & clear audio call chilling!</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-[#8A6444] hover:text-[#3A2A22]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#8E2D2D] hover:bg-[#722323] text-[#FAF6F0] text-xs font-bold border border-[#B99668]/50 shadow-sm"
                >
                  Launch Voice Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
