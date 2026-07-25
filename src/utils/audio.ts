// Web Audio API Epic Viking War Music & Drone Synthesizer for RAGNAROK Season 4

class AudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: any = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneOsc3: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;

  public toggleSound(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Play subtle acoustic UI click sound for buttons and cards
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
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
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
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
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

      // Master gain node
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Start Nordic Ambient Drone (Deep Viking Horn/Wind Hum)
      this.startDrone();

      // Initial Gjallarhorn Blast
      this.playEpicHornMelody(110, 2.5);

      // Viking War Drum & Melody Sequencer (Pentatonic Viking Melody)
      const hornFrequencies = [110, 130.81, 146.83, 164.81, 196.00, 220.00, 196.00, 164.81];
      let step = 0;

      this.timer = setInterval(() => {
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }

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

        // Horn Melody Calls every 8 steps
        if (step % 8 === 0) {
          const freq = hornFrequencies[(step / 8) % hornFrequencies.length];
          this.playEpicHornMelody(freq, 1.8);
        }

        step++;
      }, 420); // ~142 BPM Epic Nordic War Rhythm

    } catch (e) {
      console.warn('Audio Context not available:', e);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.droneOsc1) {
      try { this.droneOsc1.stop(); } catch (e) {}
      this.droneOsc1 = null;
    }
    if (this.droneOsc2) {
      try { this.droneOsc2.stop(); } catch (e) {}
      this.droneOsc2 = null;
    }
    if (this.droneOsc3) {
      try { this.droneOsc3.stop(); } catch (e) {}
      this.droneOsc3 = null;
    }
    if (this.ctx) {
      try { this.ctx.close(); } catch (e) {}
      this.ctx = null;
    }
  }

  private startDrone() {
    if (!this.ctx || !this.masterGain) return;

    try {
      // Sub bass drone (A1 note = 55Hz)
      this.droneOsc1 = this.ctx.createOscillator();
      const droneGain1 = this.ctx.createGain();
      this.droneOsc1.type = 'sawtooth';
      this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      droneGain1.gain.setValueAtTime(0.18, this.ctx.currentTime);

      this.droneOsc1.connect(filter);
      filter.connect(droneGain1);
      droneGain1.connect(this.masterGain);
      this.droneOsc1.start();

      // Brassy horn fifth interval (E2 note = 82.4Hz)
      this.droneOsc2 = this.ctx.createOscillator();
      const droneGain2 = this.ctx.createGain();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(82.4, this.ctx.currentTime);

      droneGain2.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.droneOsc2.connect(droneGain2);
      droneGain2.connect(filter);
      this.droneOsc2.start();

      // Atmospheric Wind/Chant hum
      this.droneOsc3 = this.ctx.createOscillator();
      const droneGain3 = this.ctx.createGain();
      this.droneOsc3.type = 'sine';
      this.droneOsc3.frequency.setValueAtTime(110, this.ctx.currentTime);

      droneGain3.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.droneOsc3.connect(droneGain3);
      droneGain3.connect(filter);
      this.droneOsc3.start();

    } catch (e) {
      // Ignore
    }
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
    } catch (e) {
      // ignore
    }
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
    } catch (e) {
      // ignore
    }
  }

  private playEpicHornMelody(baseFreq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const hornOsc = this.ctx.createOscillator();
      const hornGain = this.ctx.createGain();

      hornOsc.type = 'sawtooth';
      
      // Pitch swell & swell down
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
    } catch (e) {
      // ignore
    }
  }
}

export const soundManager = new AudioSynth();
