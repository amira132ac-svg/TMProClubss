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
      <div className="parchment-card parchment-card-hover rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden bg-[#111D3A] border border-[#38BDF8]/25">
        <RuneCorners />
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0284C7] text-white text-[10px] font-orbitron font-extrabold tracking-wider flex items-center gap-1 border border-[#38BDF8]/40 shadow-sm">
              <Radio className="w-3 h-3 animate-pulse text-[#F59E0B]" />
              GOOGLE MEET VOICE LOUNGES
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#1C2541] border border-[#38BDF8]/20 text-[#38BDF8] text-[10px] font-orbitron font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
              Workspace Connected
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#FFFFFF] tracking-wide">
            Public Voice & Chill Halls
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-inter max-w-2xl">
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
            className="px-4 py-2.5 rounded-xl bg-[#1C2541] border border-[#38BDF8]/30 text-[#E2E8F0] font-inter text-xs font-bold flex items-center gap-2 hover:bg-[#283655] transition-all shadow-sm"
          >
            <ExternalLink className="w-4 h-4 text-[#38BDF8]" />
            Instant Google Meet
          </button>
          
          <button
            onClick={() => {
              soundManager.playUiClick();
              setIsCreatingModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white font-inter text-xs font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-md border border-[#38BDF8]/50"
          >
            <Plus className="w-4 h-4 text-[#F59E0B]" />
            Create Voice Room
          </button>
        </div>
      </div>

      {/* ACTIVE CONNECTED ROOM BAR (if joined) */}
      {activeRoom && (
        <div className="bg-[#1C2541] text-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(56,189,248,0.25)] border border-[#38BDF8]/60 relative overflow-hidden animate-fade-in flex flex-col sm:flex-row items-center justify-between gap-4">
          <RuneCorners />
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-full bg-[#0B132B] border-2 border-[#38BDF8] flex items-center justify-center text-2xl shadow-inner shrink-0">
              {activeRoom.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                <span className="text-[10px] font-orbitron text-[#38BDF8] font-bold uppercase tracking-wider">
                  Connected Live in {activeRoom.name}
                </span>
              </div>
              <p className="text-sm font-bold font-cinzel text-white">Host: {activeRoom.hostName}</p>
              <p className="text-xs text-[#94A3B8] font-inter">{activeRoom.activeCount + 1} Warriors in lounge</p>
            </div>
          </div>

          {/* Equalizer Waveform & Mute Controls */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-end gap-1 h-8 px-3 py-1 bg-[#0B132B]/60 rounded-xl border border-[#38BDF8]/30">
              {waveHeights.map((h, idx) => (
                <div
                  key={idx}
                  className="w-1 bg-[#38BDF8] rounded-t transition-all duration-150"
                  style={{ height: `${isMuted ? 4 : h}%` }}
                />
              ))}
            </div>

            <button
              onClick={() => {
                soundManager.playUiClick();
                setIsMuted(!isMuted);
              }}
              className={`p-2.5 rounded-xl border transition-all text-xs font-bold flex items-center gap-1.5 ${
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
              className="px-3.5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-orbitron font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Google Meet
            </a>

            <button
              onClick={handleLeaveRoom}
              className="px-3.5 py-2.5 rounded-xl bg-[#0B132B] hover:bg-[#111D3A] text-[#E2E8F0] font-inter text-xs font-semibold border border-[#38BDF8]/30 transition-all flex items-center gap-1.5 shadow-sm"
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
            className={`px-4 py-2 rounded-xl font-orbitron text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white shadow-md border border-[#38BDF8]/50'
                : 'bg-[#1C2541] border border-[#38BDF8]/20 text-[#94A3B8] hover:bg-[#283655] hover:text-[#E2E8F0]'
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
              className={`parchment-card parchment-card-hover rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 flex flex-col justify-between gap-4 border bg-[#111D3A] ${
                isCurrentActive ? 'border-2 border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.3)] bg-[#152342]' : 'border-[#38BDF8]/20'
              }`}
            >
              <RuneCorners />

              {/* Top Row: Category & Capacity */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#1C2541] text-[#38BDF8] text-[10px] font-orbitron font-bold uppercase tracking-wider border border-[#38BDF8]/20">
                  {lounge.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-orbitron font-bold">
                  <Users className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span className={lounge.activeCount > 0 ? 'text-[#10B981] font-extrabold' : 'text-[#94A3B8]'}>
                    {lounge.activeCount > 0 ? `${lounge.activeCount} Live` : `0/${lounge.maxCapacity}`}
                  </span>
                  {lounge.activeCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  )}
                </div>
              </div>

              {/* Middle: Title & Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1C2541] border border-[#38BDF8]/20 flex items-center justify-center text-xl shrink-0 shadow-inner">
                    {lounge.icon}
                  </div>
                  <div>
                    <h3 className="font-cinzel font-bold text-base text-[#FFFFFF] line-clamp-1">
                      {lounge.name}
                    </h3>
                    <p className="text-xs text-[#94A3B8] font-inter">Host: {lounge.hostName}</p>
                  </div>
                </div>

                <p className="text-xs text-[#E2E8F0]/80 font-inter line-clamp-2 leading-relaxed">
                  {lounge.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {lounge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-inter bg-[#1C2541] text-[#38BDF8] border border-[#38BDF8]/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#38BDF8]/15">
                <button
                  onClick={() => handleJoinRoom(lounge)}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-inter text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isCurrentActive
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white shadow-md'
                      : 'bg-[#1C2541] border border-[#38BDF8]/30 text-[#E2E8F0] hover:bg-[#283655] hover:text-[#FFFFFF]'
                  }`}
                >
                  <Radio className={`w-3.5 h-3.5 ${isCurrentActive ? 'animate-pulse text-[#F59E0B]' : ''}`} />
                  {isCurrentActive ? 'Leave Voice' : 'Join Web Voice'}
                </button>

                <a
                  href={lounge.meetUrl || 'https://meet.google.com/new'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playUiClick()}
                  className="py-2.5 px-3 rounded-xl bg-[#1C2541] hover:bg-[#283655] text-[#38BDF8] border border-[#38BDF8]/25 font-inter text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  title="Open in Google Meet"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Google Meet</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE VOICE ROOM MODAL */}
      {isCreatingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B132B]/80 backdrop-blur-md animate-fade-in">
          <div className="parchment-card rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative bg-[#111D3A] border border-[#38BDF8]/40">
            <RuneCorners />
            
            {/* Modal Header */}
            <div className="bg-[#1C2541] p-5 border-b border-[#38BDF8]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="font-cinzel font-bold text-lg text-[#FFFFFF]">Create Public Voice Room</h3>
              </div>
              <button
                onClick={() => setIsCreatingModalOpen(false)}
                className="text-[#94A3B8] hover:text-[#FFFFFF] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLoungeSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold font-orbitron text-[#38BDF8] mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shield-Bros Post-Match Chill"
                  value={newLoungeName}
                  onChange={(e) => setNewLoungeName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C2541] border border-[#38BDF8]/25 text-xs font-inter text-[#E2E8F0] placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-orbitron text-[#38BDF8] mb-1">
                  Host Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Captain Torstein"
                  value={newLoungeHost}
                  onChange={(e) => setNewLoungeHost(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C2541] border border-[#38BDF8]/25 text-xs font-inter text-[#E2E8F0] placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-orbitron text-[#38BDF8] mb-1">
                  Category
                </label>
                <select
                  value={newLoungeCategory}
                  onChange={(e) => setNewLoungeCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C2541] border border-[#38BDF8]/25 text-xs font-inter text-[#E2E8F0] focus:outline-none focus:border-[#38BDF8]"
                >
                  <option value="Match Chat">Match Chat</option>
                  <option value="Team Tactics">Team Tactics</option>
                  <option value="Viking Tavern">Viking Tavern</option>
                  <option value="General Chill">General Chill</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold font-orbitron text-[#38BDF8] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="What are warriors discussing in this hall?"
                  value={newLoungeDesc}
                  onChange={(e) => setNewLoungeDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C2541] border border-[#38BDF8]/25 text-xs font-inter text-[#E2E8F0] placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div className="p-3 bg-[#1C2541] rounded-xl border border-[#38BDF8]/20 text-[11px] text-[#94A3B8] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Every room includes an instant Google Meet space link for high-definition video & clear audio call chilling!</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#94A3B8] hover:text-[#FFFFFF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] hover:brightness-110 text-white text-xs font-bold border border-[#38BDF8]/50 shadow-md"
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

