// Web Audio API Epic Music Synthesizer for SUPERLEAGUE RAGNAROK Season 4

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSeconds: number;
  coverBg: string;
  bpm: number;
  genre: string;
  audioUrl?: string; // SoundCloud link or direct MP3
}

export const SOUNDCLOUD_TRACKS: MusicTrack[] = [
  {
    id: 'sc-1',
    title: 'SoundCloud Vibe #1',
    artist: 'SoundCloud Artist',
    duration: '3:30',
    durationSeconds: 210,
    coverBg: 'from-amber-500 to-orange-800',
    bpm: 110,
    genre: 'SoundCloud',
    audioUrl: 'https://on.soundcloud.com/gSV20Bx8wtKwLM33O9'
  },
  {
    id: 'sc-2',
    title: 'SoundCloud Vibe #2',
    artist: 'SoundCloud Artist',
    duration: '3:15',
    durationSeconds: 195,
    coverBg: 'from-purple-600 to-indigo-900',
    bpm: 105,
    genre: 'SoundCloud',
    audioUrl: 'https://on.soundcloud.com/zD4PCaWX3bntOx7lkF'
  },
  {
    id: 'sc-3',
    title: 'SoundCloud Vibe #3',
    artist: 'SoundCloud Artist',
    duration: '3:45',
    durationSeconds: 225,
    coverBg: 'from-cyan-600 to-blue-900',
    bpm: 120,
    genre: 'SoundCloud',
    audioUrl: 'https://on.soundcloud.com/8p1cdf0WEEgpSzi8TV'
  },
  {
    id: 'sc-4',
    title: 'SoundCloud Vibe #4',
    artist: 'SoundCloud Artist',
    duration: '2:50',
    durationSeconds: 170,
    coverBg: 'from-rose-600 to-pink-900',
    bpm: 115,
    genre: 'SoundCloud',
    audioUrl: 'https://on.soundcloud.com/JdTs9hDPTqvRJNVbsj'
  },
  {
    id: 'sc-5',
    title: 'SoundCloud Vibe #5',
    artist: 'SoundCloud Artist',
    duration: '3:10',
    durationSeconds: 190,
    coverBg: 'from-emerald-600 to-teal-900',
    bpm: 100,
    genre: 'SoundCloud',
    audioUrl: 'https://on.soundcloud.com/2NB48eXHWQ46ffAHUI'
  },
  {
    id: 'sc-6',
    title: 'SoundCloud Vibe #6',
    artist: 'SoundCloud Artist',
    duration: '4:00',
    durationSeconds: 240,
    coverBg: 'from-sky-600 to-indigo-950',
    bpm: 128,
    genre: 'SoundCloud',
    audioUrl: 'https://on.soundcloud.com/F6u56fABcxqPDB4Wc5'
  },
  {
    id: 'sc-7',
    title: 'SoundCloud Vibe #7',
    artist: 'SoundCloud Artist',
    duration: '3:20',
    durationSeconds: 200,
    coverBg: 'from-fuchsia-600 to-purple-950',
    bpm: 108,
    genre: 'SoundCloud',
    audioUrl: 'https://on.soundcloud.com/FQ9BPLHrM9IC0cCy5l'
  },
  {
    id: 'sc-8',
    title: 'SoundCloud Vibe #8',
    artist: 'SoundCloud Artist',
    duration: '3:35',
    durationSeconds: 215,
    coverBg: 'from-orange-600 to-red-950',
    bpm: 112,
    genre: 'SoundCloud',
    audioUrl: 'https://on.soundcloud.com/Lpfu5YW9b5WYCOrdYv'
  },
  {
    id: 'sc-9',
    title: 'SoundCloud Vibe #9',
    artist: 'SoundCloud Artist',
    duration: '3:05',
    durationSeconds: 185,
    coverBg: 'from-teal-600 to-cyan-950',
    bpm: 102,
    genre: 'SoundCloud',
    audioUrl: 'https://on.soundcloud.com/xkf9hHuYTkhTlSROrL'
  },
  {
    id: 'sc-10',
    title: 'SoundCloud Vibe #10',
    artist: 'SoundCloud Artist',
    duration: '3:50',
    durationSeconds: 230,
    coverBg: 'from-blue-600 to-slate-950',
    bpm: 118,
    genre: 'SoundCloud',
    audioUrl: 'https://on.soundcloud.com/jSxux5tVHiClSvLXs5'
  },
  {
    id: 'sc-11',
    title: 'SoundCloud Vibe #11',
    artist: 'SoundCloud Artist',
    duration: '3:25',
    durationSeconds: 205,
    coverBg: 'from-amber-600 to-rose-950',
    bpm: 122,
    genre: 'SoundCloud',
    audioUrl: 'https://on.soundcloud.com/5f2S8SxrPtRxc6E41W'
  },
  {
    id: 'radio-ir-music',
    title: 'IR-Music Live Radio 📻',
    artist: 'ir-music.ir',
    duration: 'LIVE',
    durationSeconds: 9999,
    coverBg: 'from-rose-600 via-amber-600 to-indigo-900',
    bpm: 120,
    genre: 'Live Radio',
    audioUrl: 'https://stream.ir-music.ir/live'
  }
];

export const MUSIC_PLAYLIST: MusicTrack[] = SOUNDCLOUD_TRACKS;

class AudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: any = null;
  private currentTrackIndex = Math.floor(Math.random() * (SOUNDCLOUD_TRACKS.length - 1)); // Random song on load
  private currentElapsedSeconds = 0;
  private playbackInterval: any = null;
  private masterGain: GainNode | null = null;
  private volume = 0.20; // Soft 20% default volume
  private audioElement: HTMLAudioElement | null = null;

  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;

  public getPlaylist(): MusicTrack[] {
    return MUSIC_PLAYLIST;
  }

  public addCustomTrack(title: string, artist: string, audioUrl: string): MusicTrack {
    const newTrack: MusicTrack = {
      id: `custom-${Date.now()}`,
      title,
      artist,
      duration: '3:30',
      durationSeconds: 210,
      coverBg: 'from-emerald-600 to-teal-900',
      bpm: 100,
      genre: 'Vocal Track',
      audioUrl
    };
    MUSIC_PLAYLIST.push(newTrack);
    this.selectTrack(MUSIC_PLAYLIST.length - 1);
    return newTrack;
  }

  public setTrackAudioUrl(index: number, url: string) {
    if (MUSIC_PLAYLIST[index]) {
      MUSIC_PLAYLIST[index].audioUrl = url;
      if (this.currentTrackIndex === index && this.isPlaying) {
        this.selectTrack(index);
      }
    }
  }

  public getCurrentTrack(): MusicTrack {
    return MUSIC_PLAYLIST[this.currentTrackIndex] || MUSIC_PLAYLIST[0];
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public getElapsedSeconds(): number {
    return this.currentElapsedSeconds;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  public toggleSound(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public selectTrack(index: number) {
    if (index < 0 || index >= MUSIC_PLAYLIST.length) return;
    this.currentTrackIndex = index;
    this.currentElapsedSeconds = 0;
    if (this.isPlaying) {
      this.stopTimer();
      this.startTrackSynthesizer();
    }
  }

  public nextTrack() {
    const nextIndex = (this.currentTrackIndex + 1) % MUSIC_PLAYLIST.length;
    this.selectTrack(nextIndex);
  }

  public prevTrack() {
    const prevIndex = (this.currentTrackIndex - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length;
    this.selectTrack(prevIndex);
  }

  // Play subtle acoustic UI click sound for buttons
  public playUiClick() {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = this.ctx || new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(380, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // ignore
    }
  }

  // Play satisfying shield-thud sound when switching tabs
  public playUiTab() {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = this.ctx || new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // ignore
    }
  }

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.isPlaying = true;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.startTrackSynthesizer();
    } catch (e) {
      console.warn('Audio Context error:', e);
    }
  }

  public stop() {
    this.isPlaying = false;
    this.stopTimer();

    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch (e) {}
      this.audioElement = null;
    }

    if (this.droneOsc1) {
      try { this.droneOsc1.stop(); } catch (e) {}
      this.droneOsc1 = null;
    }
    if (this.droneOsc2) {
      try { this.droneOsc2.stop(); } catch (e) {}
      this.droneOsc2 = null;
    }
    if (this.ctx) {
      try { this.ctx.close(); } catch (e) {}
      this.ctx = null;
    }
  }

  private stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = null;
    }
  }

  private startTrackSynthesizer() {
    this.stopTimer();

    if (this.audioElement) {
      try { this.audioElement.pause(); } catch (e) {}
      this.audioElement = null;
    }

    const track = this.getCurrentTrack();

    if (track.audioUrl) {
      try {
        this.audioElement = new Audio(track.audioUrl);
        this.audioElement.volume = this.volume;
        this.audioElement.play().then(() => {
          this.playbackInterval = setInterval(() => {
            if (this.audioElement && !this.audioElement.paused) {
              this.currentElapsedSeconds = Math.floor(this.audioElement.currentTime);
            }
          }, 500);
        }).catch(err => {
          console.warn('Audio URL playback blocked or failed, falling back to Web Audio synth:', err);
          this.startSynthMelody(track);
        });

        this.audioElement.onended = () => {
          this.nextTrack();
        };

        return;
      } catch (e) {
        console.warn('Failed to play custom MP3 URL:', e);
      }
    }

    this.startSynthMelody(track);
  }

  private startSynthMelody(track: MusicTrack) {
    if (!this.ctx || !this.masterGain) return;

    // Elapsed timer loop
    this.playbackInterval = setInterval(() => {
      if (this.isPlaying) {
        this.currentElapsedSeconds = (this.currentElapsedSeconds + 1) % track.durationSeconds;
      }
    }, 1000);

    let step = 0;

    // Track 0: Morteza Pashaei - Negarane Mani (Emotional Persian Melodic Synth)
    if (track.id === 'track-1') {
      const notes = [174.61, 207.65, 261.63, 311.13, 349.23, 311.13, 261.63, 207.65]; // F minor
      this.timer = setInterval(() => {
        if (!this.ctx || !this.isPlaying) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const freq = notes[step % notes.length];
        this.playSoftPianoNote(freq, 0.45);

        if (step % 8 === 0) {
          this.playWarmBassPad(87.31, 2.2); // F2 Sub
        } else if (step % 8 === 4) {
          this.playWarmBassPad(103.83, 2.2); // Ab2 Sub
        }
        step++;
      }, 340);
    } 
    // Track 1: Malcolm Todd - Earrings (Groovy Indie Pop Synth)
    else if (track.id === 'track-2') {
      const bassNotes = [116.54, 116.54, 138.59, 155.56, 174.61, 155.56];
      this.timer = setInterval(() => {
        if (!this.ctx || !this.isPlaying) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const isBassStep = step % 2 === 0;
        const isSnap = step % 4 === 2;

        if (isBassStep) {
          const freq = bassNotes[(step / 2) % bassNotes.length];
          this.playFunkyBass(freq, 0.28);
        }
        if (isSnap) {
          this.playSnareSnap(0.18);
        }
        step++;
      }, 270);
    } 
    // Track 2: Frank Ocean - Nights (R&B Chill Wave)
    else if (track.id === 'track-3') {
      const padChords = [
        [155.56, 196.00, 233.08, 293.66], // Eb maj7
        [130.81, 164.81, 196.00, 246.94]  // C min7
      ];
      this.timer = setInterval(() => {
        if (!this.ctx || !this.isPlaying) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        if (step % 8 === 0) {
          const chordIndex = Math.floor(step / 8) % padChords.length;
          const chord = padChords[chordIndex];
          chord.forEach(freq => this.playChillRhodesNote(freq, 1.8));
          this.playDeepDrum(65, 0.6);
        } else if (step % 4 === 2) {
          this.playSnareSnap(0.15);
        }
        step++;
      }, 310);
    } 
    // Track 3: Ragnarok War Anthem (Viking Battle Drums & Horns)
    else {
      const hornFrequencies = [110, 130.81, 146.83, 164.81, 196.00, 220.00, 196.00, 164.81];
      this.timer = setInterval(() => {
        if (!this.ctx || !this.isPlaying) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const isHeavyBeat = step % 4 === 0;
        const isAccent = step % 8 === 2 || step % 8 === 6;
        const isSubThud = step % 2 === 1;

        if (isHeavyBeat) {
          this.playDeepDrum(55, 0.95); // Sub Bass Taiko War Drum
        } else if (isAccent) {
          this.playShieldImpact(0.5); // Shield Clashing Metal
        } else if (isSubThud) {
          this.playDeepDrum(90, 0.45); // Frame Drum
        }

        if (step % 8 === 0) {
          const freq = hornFrequencies[(step / 8) % hornFrequencies.length];
          this.playEpicHornMelody(freq, 1.8);
        }

        step++;
      }, 420);
    }
  }

  private playSoftPianoNote(freq: number, gainVal: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gainVal * 0.3, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.62);
    } catch (e) {}
  }

  private playWarmBassPad(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  private playFunkyBass(freq: number, gainVal: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.24);
    } catch (e) {}
  }

  private playChillRhodesNote(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  private playSnareSnap(gainVal: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1000;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start();
    } catch (e) {}
  }

  private playDeepDrum(freq: number, gainVal: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(22, this.ctx.currentTime + 0.38);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.42);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.42);
    } catch (e) {}
  }

  private playShieldImpact(gainVal: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1200;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start();
    } catch (e) {}
  }

  private playEpicHornMelody(baseFreq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const hornOsc = this.ctx.createOscillator();
      const hornGain = this.ctx.createGain();

      hornOsc.type = 'sawtooth';
      hornOsc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      hornOsc.frequency.linearRampToValueAtTime(baseFreq * 1.25, this.ctx.currentTime + duration * 0.4);
      hornOsc.frequency.linearRampToValueAtTime(baseFreq, this.ctx.currentTime + duration);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, this.ctx.currentTime);

      hornGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      hornGain.gain.linearRampToValueAtTime(0.22, this.ctx.currentTime + 0.3);
      hornGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      hornOsc.connect(filter);
      filter.connect(hornGain);
      hornGain.connect(this.masterGain);

      hornOsc.start();
      hornOsc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }
}

export const soundManager = new AudioSynth();
