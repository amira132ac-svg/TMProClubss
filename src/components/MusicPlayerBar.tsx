import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Disc, Volume2, Shuffle, Link as LinkIcon, Plus, X, Radio, ExternalLink, Music } from 'lucide-react';
import { soundManager, MUSIC_PLAYLIST, MusicTrack } from '../utils/audio';

interface MusicPlayerBarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  soundEnabled,
  onToggleSound
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(0.20); // Default soft volume (20%)
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [showRadioWidget, setShowRadioWidget] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customArtist, setCustomArtist] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  useEffect(() => {
    // Pick initial track index from soundManager (randomized on load)
    setCurrentTrackIndex(soundManager.getCurrentTrackIndex());
    soundManager.setVolume(0.20);

    const interval = setInterval(() => {
      setCurrentTrackIndex(soundManager.getCurrentTrackIndex());
      setElapsed(soundManager.getElapsedSeconds());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const currentTrack: MusicTrack = MUSIC_PLAYLIST[currentTrackIndex] || MUSIC_PLAYLIST[0];

  const handleSelectTrack = (index: number) => {
    soundManager.playUiClick();
    setCurrentTrackIndex(index);
    soundManager.selectTrack(index);

    // If selecting Radio IR-Music, set soft volume (20%)
    if (MUSIC_PLAYLIST[index]?.id === 'radio-ir-music') {
      setVolume(0.20);
      soundManager.setVolume(0.20);
    }

    if (!soundEnabled) {
      onToggleSound();
    }
  };

  const handlePlayRandomTrack = () => {
    soundManager.playUiClick();
    const randomIndex = Math.floor(Math.random() * MUSIC_PLAYLIST.length);
    setCurrentTrackIndex(randomIndex);
    soundManager.selectTrack(randomIndex);
    setVolume(0.20);
    soundManager.setVolume(0.20);
    if (!soundEnabled) {
      onToggleSound();
    }
  };

  const handleNext = () => {
    soundManager.playUiClick();
    soundManager.nextTrack();
    setCurrentTrackIndex(soundManager.getCurrentTrackIndex());
    if (!soundEnabled) {
      onToggleSound();
    }
  };

  const handlePrev = () => {
    soundManager.playUiClick();
    soundManager.prevTrack();
    setCurrentTrackIndex(soundManager.getCurrentTrackIndex());
    if (!soundEnabled) {
      onToggleSound();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundManager.setVolume(val);
  };

  const handleAddCustomMp3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    soundManager.addCustomTrack(
      customTitle.trim() || 'Custom Vocal Track',
      customArtist.trim() || 'User Audio Stream',
      customUrl.trim()
    );
    setIsUrlModalOpen(false);
    setCustomTitle('');
    setCustomArtist('');
    setCustomUrl('');
    if (!soundEnabled) {
      onToggleSound();
    }
  };

  const formatTime = (secs: number) => {
    if (currentTrack.id === 'radio-ir-music') return 'LIVE';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isSoundCloud = currentTrack.audioUrl?.includes('soundcloud.com');

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 my-2 animate-fade-in">
      {/* Sleek Ultra-Compact Single Row Container */}
      <div className="bg-[#111D3A]/95 border border-[#38BDF8]/30 rounded-xl py-2 px-3 sm:px-4 shadow-[0_6px_24px_rgba(0,0,0,0.4)] backdrop-blur-md flex items-center justify-between gap-2 sm:gap-4 text-xs font-inter">
        
        {/* Left: Disc Icon + Track Selector Dropdown */}
        <div className="flex items-center gap-2 max-w-[220px] sm:max-w-xs shrink-0">
          <div className={`relative w-7 h-7 rounded-lg bg-gradient-to-br ${currentTrack.coverBg} border border-[#38BDF8]/40 flex items-center justify-center shrink-0 ${soundEnabled ? 'animate-pulse' : ''}`}>
            <Disc className={`w-4 h-4 text-[#38BDF8] ${soundEnabled ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          </div>

          <div className="flex-1 min-w-0">
            <select
              value={currentTrackIndex}
              onChange={(e) => handleSelectTrack(Number(e.target.value))}
              className="w-full bg-[#1C2541] border border-[#38BDF8]/25 rounded-lg px-2 py-1 text-xs font-semibold text-white focus:outline-none focus:border-[#38BDF8] truncate cursor-pointer"
            >
              {MUSIC_PLAYLIST.map((track, idx) => (
                <option key={track.id} value={idx}>
                  🎵 {track.title} {track.audioUrl ? '(SC)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handlePrev}
            title="Previous Track"
            className="p-1.5 rounded-lg bg-[#1C2541] hover:bg-[#283655] text-[#38BDF8] border border-[#38BDF8]/20 transition-all active:scale-95"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Pause Audio' : 'Play Music'}
            className={`px-3 py-1.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white border border-[#38BDF8]'
                : 'bg-[#1C2541] text-[#F59E0B] border border-[#F59E0B]/40 hover:bg-[#283655]'
            }`}
          >
            {soundEnabled ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="font-orbitron font-bold text-[11px]">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span className="font-orbitron font-bold text-[11px]">PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            title="Next Track"
            className="p-1.5 rounded-lg bg-[#1C2541] hover:bg-[#283655] text-[#38BDF8] border border-[#38BDF8]/20 transition-all active:scale-95"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handlePlayRandomTrack}
            title="Play Random Track"
            className="p-1.5 rounded-lg bg-[#1C2541] hover:bg-[#283655] text-[#F59E0B] border border-[#F59E0B]/30 transition-all active:scale-95"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Soft Volume Slider & Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Radio Quick Button */}
          <button
            onClick={() => {
              const radioIdx = MUSIC_PLAYLIST.findIndex(t => t.id === 'radio-ir-music');
              if (radioIdx !== -1) handleSelectTrack(radioIdx);
            }}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 border ${
              currentTrack.id === 'radio-ir-music'
                ? 'bg-rose-600/30 border-rose-400 text-rose-300 animate-pulse'
                : 'bg-[#1C2541] border-rose-500/30 text-rose-300 hover:bg-[#283655]'
            }`}
            title="IR-Music Live Radio"
          >
            <Radio className="w-3 h-3 text-rose-400" />
            <span className="hidden sm:inline">Radio</span>
          </button>

          {/* Volume Slider (Default Soft 20%) */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#1C2541]/90 px-2 py-1 rounded-lg border border-[#38BDF8]/20">
            <Volume2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-14 sm:w-16 accent-[#38BDF8] cursor-pointer"
            />
            <span className="text-[10px] font-orbitron font-semibold text-[#94A3B8] min-w-[24px]">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <button
            onClick={() => setIsUrlModalOpen(true)}
            className="p-1.5 rounded-lg bg-[#1C2541] hover:bg-[#283655] text-[#F59E0B] border border-[#F59E0B]/30 transition-all"
            title="Add Custom MP3 / SoundCloud Link"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Embedded SoundCloud Stream Frame (when sound enabled & playing a SoundCloud track) */}
      {soundEnabled && isSoundCloud && currentTrack.audioUrl && (
        <div className="hidden">
          <iframe
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(currentTrack.audioUrl)}&color=%2338bdf8&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
            title="SoundCloud Audio Stream"
            allow="autoplay"
          />
        </div>
      )}

      {/* Embedded IR-Music Radio Stream Frame (when sound enabled & playing radio) */}
      {soundEnabled && currentTrack.id === 'radio-ir-music' && (
        <div className="hidden">
          <iframe
            src="https://ir-music.ir/radio/"
            title="IR Music Radio Live Stream"
            allow="autoplay"
          />
        </div>
      )}

      {/* Add Custom Vocal MP3 / SoundCloud Link Modal */}
      {isUrlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B132B]/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#111D3A] border border-[#38BDF8]/40 rounded-2xl w-full max-w-md p-6 shadow-[0_16px_48px_rgba(0,0,0,0.5)] space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#38BDF8]/20 pb-3">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="font-cinzel font-bold text-lg text-white">Add Custom Track / SoundCloud Link</h3>
              </div>
              <button
                onClick={() => setIsUrlModalOpen(false)}
                className="text-[#94A3B8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#94A3B8] font-inter">
              Paste a SoundCloud link or direct MP3 URL to play inside the app:
            </p>

            <form onSubmit={handleAddCustomMp3} className="space-y-3">
              <div>
                <label className="block text-xs font-orbitron text-[#38BDF8] font-bold mb-1">Song Title</label>
                <input
                  type="text"
                  placeholder="e.g. Favorite SoundCloud Track"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C2541] border border-[#38BDF8]/25 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-xs font-orbitron text-[#38BDF8] font-bold mb-1">Artist Name</label>
                <input
                  type="text"
                  placeholder="e.g. SoundCloud Artist"
                  value={customArtist}
                  onChange={(e) => setCustomArtist(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C2541] border border-[#38BDF8]/25 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-xs font-orbitron text-[#F59E0B] font-bold mb-1">Audio / SoundCloud URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://on.soundcloud.com/... or https://...mp3"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C2541] border border-[#38BDF8]/40 text-xs text-[#E2E8F0] placeholder-[#64748B] focus:outline-none focus:border-[#F59E0B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUrlModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#94A3B8] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] text-white font-bold text-xs shadow-md border border-[#38BDF8]/50 hover:brightness-110"
                >
                  Add & Play Track
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

