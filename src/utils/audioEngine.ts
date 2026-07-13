/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// A Web Audio API based synthesizer that plays dynamic Zambian-inspired instrumentals
// using oscillators, gain nodes, and scheduling to represent each track.
// Includes a real-time visualization level array that components can poll!

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrackId = '';
  private volumeNode: GainNode | null = null;
  private currentVolume = 0.5; // 0 to 1
  private schedulerTimerId: any = null;
  
  // Sequencer state
  private tempo = 120;
  private beatDuration = 60 / 120; // duration of one beat in seconds
  private nextNoteTime = 0.0;
  private step = 0;
  private scheduleAheadTime = 0.1; // how far ahead to schedule audio (sec)
  
  // Real-time analysis values for the graphic EQ (0 to 100)
  public frequencies: number[] = Array(16).fill(0);
  private animFrameId: any = null;

  constructor() {
    // Lazy initialisation to prevent audio playing warnings before interaction
  }

  private initContext() {
    if (!this.ctx) {
      // @ts-ignore
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(trackId: string) {
    this.initContext();
    
    if (this.isPlaying && this.currentTrackId === trackId) {
      return; // Already playing this track
    }

    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;
    this.currentTrackId = trackId;
    
    // Set tempo based on track type
    if (trackId.includes('sunset')) {
      this.tempo = 90; // Mellow Afro-fusion
    } else if (trackId.includes('flow')) {
      this.tempo = 122; // Energetic Zed-beats
    } else if (trackId.includes('traditional')) {
      this.tempo = 105; // Guitar Kalindula-fusion
    } else if (trackId.includes('echoes')) {
      this.tempo = 95; // Ambient Afro-pop
    } else if (trackId.includes('excellence')) {
      this.tempo = 115; // Zed-hiphop
    } else {
      this.tempo = 110;
    }

    this.beatDuration = 60 / this.tempo;
    this.nextNoteTime = this.ctx!.currentTime;
    this.step = 0;

    // Start scheduling
    this.schedulerLoop();
    this.startVisualization();
  }

  public pause() {
    if (this.ctx && this.isPlaying) {
      this.isPlaying = false;
      this.stopScheduler();
      this.stopVisualization();
      this.resetFrequencies();
    }
  }

  public stop() {
    this.pause();
    this.currentTrackId = '';
  }

  public setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
  }

  private stopScheduler() {
    if (this.schedulerTimerId) {
      clearTimeout(this.schedulerTimerId);
      this.schedulerTimerId = null;
    }
  }

  private schedulerLoop() {
    if (!this.isPlaying || !this.ctx) return;

    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.step, this.nextNoteTime);
      this.advanceStep();
    }

    this.schedulerTimerId = setTimeout(() => this.schedulerLoop(), 25);
  }

  private advanceStep() {
    // 16-step sequencer
    const secondsPerStep = this.beatDuration / 4; // 16th notes
    this.nextNoteTime += secondsPerStep;
    this.step = (this.step + 1) % 16;
  }

  // Synthesis of Zambian instruments (Acoustic strings, kalindula bass, shaker, kick, rimshot)
  private scheduleNote(step: number, time: number) {
    if (!this.ctx || !this.volumeNode) return;

    const trackId = this.currentTrackId;

    // --- INSTRUMENT 1: KICK DRUM (rhythm foundation) ---
    // Sunset and Echoes have a slow steady heartbeat
    // Flow, Excellence, Traditional have custom upbeat patterns
    let playKick = false;
    if (trackId.includes('sunset')) {
      playKick = (step === 0 || step === 8);
    } else if (trackId.includes('flow')) {
      playKick = (step === 0 || step === 6 || step === 10 || step === 14);
    } else if (trackId.includes('traditional')) {
      playKick = (step === 0 || step === 4 || step === 8 || step === 12);
    } else if (trackId.includes('echoes')) {
      playKick = (step === 0 || step === 8 || step === 12);
    } else if (trackId.includes('excellence')) {
      playKick = (step === 0 || step === 3 || step === 8 || step === 11);
    }

    if (playKick) {
      this.playKickDrum(time);
    }

    // --- INSTRUMENT 2: PERCUSSION/SHAKER/HI-HAT (constant pulse) ---
    // Zambian rhythm uses heavy syncopated shakers or wooden blocks
    let playShaker = false;
    let shakerVolume = 0.05;
    if (trackId.includes('traditional')) {
      playShaker = true; // Constantly shaking
      shakerVolume = step % 2 === 0 ? 0.07 : 0.03;
    } else {
      playShaker = (step % 2 === 0 || step % 3 === 0);
      shakerVolume = step % 4 === 0 ? 0.05 : 0.02;
    }

    if (playShaker) {
      this.playShakerSound(time, shakerVolume);
    }

    // --- INSTRUMENT 3: SNARE/CLAP (backbeat) ---
    let playSnare = false;
    if (trackId.includes('excellence')) {
      playSnare = (step === 4 || step === 12); // standard boom-clap
    } else if (trackId.includes('flow') || trackId.includes('sunset')) {
      playSnare = (step === 4 || step === 12 || step === 15); // syncopated afro-snare
    } else if (trackId.includes('traditional')) {
      playSnare = (step === 4 || step === 10 || step === 12); // Kalindula snare syncopation
    } else if (trackId.includes('echoes')) {
      playSnare = (step === 4 || step === 12);
    }

    if (playSnare) {
      this.playSnareSound(time);
    }

    // --- INSTRUMENT 4: BASSLINE (Kalindula / Afro-pop synth) ---
    // Define a bass progression based on track
    let bassNotes = [36, 36, 41, 41, 43, 43, 36, 36]; // MIDI notes (C, F, G, C)
    if (trackId.includes('sunset')) {
      bassNotes = [36, 36, 41, 41, 43, 43, 39, 39]; // C, F, G, D#
    } else if (trackId.includes('flow')) {
      bassNotes = [40, 40, 45, 45, 47, 47, 45, 45]; // E, A, B, A
    } else if (trackId.includes('traditional')) {
      bassNotes = [36, 39, 41, 43, 36, 39, 41, 43]; // Rapid melodic bassline
    }

    const currentChordIdx = Math.floor(step / 2) % bassNotes.length;
    const bassNote = bassNotes[currentChordIdx];

    // Play bass note on selected steps to sound groovy
    let playBass = false;
    if (trackId.includes('sunset')) {
      playBass = (step === 0 || step === 3 || step === 8 || step === 11);
    } else if (trackId.includes('flow')) {
      playBass = (step === 0 || step === 2 || step === 5 || step === 8 || step === 10 || step === 13);
    } else if (trackId.includes('traditional')) {
      playBass = (step % 2 === 0); // Very active kalindula bass
    } else if (trackId.includes('excellence')) {
      playBass = (step === 0 || step === 4 || step === 8 || step === 12);
    } else {
      playBass = (step === 0 || step === 8);
    }

    if (playBass) {
      this.playBassSynth(this.midiToFreq(bassNote), time);
    }

    // --- INSTRUMENT 5: LEAD MELODY (Pluck strings / synth brass) ---
    // Play an uplifting, sweet African melody
    let playMelody = false;
    let melodyNote = 60; // Middle C

    // Simple melodic progressions
    const sunsetMelody = [60, 64, 67, 72, 67, 64, 60, 55]; // C major pentatonic
    const flowMelody = [64, 67, 69, 71, 69, 67, 64, 62]; // E minor / A major
    const traditionalMelody = [60, 62, 64, 67, 69, 72, 74, 76];
    const echoesMelody = [60, 67, 65, 63, 60, 65, 63, 58];

    const stepMelodyIdx = Math.floor(step / 2) % 8;

    if (trackId.includes('sunset')) {
      playMelody = (step === 2 || step === 5 || step === 10 || step === 13);
      melodyNote = sunsetMelody[stepMelodyIdx];
    } else if (trackId.includes('flow')) {
      playMelody = (step === 1 || step === 4 || step === 7 || step === 9 || step === 12 || step === 14);
      melodyNote = flowMelody[stepMelodyIdx] + (step % 2 === 0 ? 12 : 0); // octaves
    } else if (trackId.includes('traditional')) {
      playMelody = (step % 4 === 1 || step % 4 === 3); // rapid plucks
      melodyNote = traditionalMelody[step % 8];
    } else if (trackId.includes('echoes')) {
      playMelody = (step === 1 || step === 9 || step === 13);
      melodyNote = echoesMelody[stepMelodyIdx];
    } else if (trackId.includes('excellence')) {
      playMelody = (step === 0 || step === 2 || step === 8 || step === 10);
      melodyNote = 58 + (step % 3 === 0 ? 7 : 12);
    }

    if (playMelody) {
      this.playLeadSynth(this.midiToFreq(melodyNote), time, trackId);
    }
  }

  // --- AUDIO SYNTHESIS COMPONENTS ---

  private midiToFreq(note: number): number {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  // Kick Drum synthesis: sweep oscillator down from 150Hz to 0.01Hz very fast
  private playKickDrum(time: number) {
    if (!this.ctx || !this.volumeNode) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.volumeNode);

    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.3);

    gain.gain.setValueAtTime(1.0, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);

    osc.start(time);
    osc.stop(time + 0.3);
  }

  // Shaker synthesis: white noise filtered with high pass
  private playShakerSound(time: number, volume: number) {
    if (!this.ctx || !this.volumeNode) return;
    
    // Create white noise buffer
    const bufferSize = this.ctx.sampleRate * 0.05; // 50ms shaker
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter to make it a bright shaker
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(6000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.volumeNode);

    noise.start(time);
    noise.stop(time + 0.06);
  }

  // Snare synthesis: noise blended with a triangle pitch sweep
  private playSnareSound(time: number) {
    if (!this.ctx || !this.volumeNode) return;

    // Noise component
    const bufferSize = this.ctx.sampleRate * 0.15; // 150ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, time);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.volumeNode);

    // Osc tonality component
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, time);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.15, time);
    oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

    osc.connect(oscGain);
    oscGain.connect(this.volumeNode);

    noiseSource.start(time);
    osc.start(time);

    noiseSource.stop(time + 0.16);
    osc.stop(time + 0.11);
  }

  // Bass Synth synthesis: deep triangle oscillator with a soft lowpass sweep
  private playBassSynth(frequency: number, time: number) {
    if (!this.ctx || !this.volumeNode) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, time);
    filter.frequency.exponentialRampToValueAtTime(100, time + 0.2);

    gain.gain.setValueAtTime(0.45, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.volumeNode);

    osc.start(time);
    osc.stop(time + 0.26);
  }

  // Lead Synth/Guitar Pluck: sine/sawtooth oscillator with sharp envelope
  private playLeadSynth(frequency: number, time: number, trackId: string) {
    if (!this.ctx || !this.volumeNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Choose voice based on track style
    if (trackId.includes('traditional')) {
      // Nylon acoustic pluck
      osc.type = 'sine';
      // Add a higher harmonic oscillator to sound pluck-like
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(frequency * 2, time);
      subGain.gain.setValueAtTime(0.08, time);
      subGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
      subOsc.connect(subGain);
      subGain.connect(this.volumeNode);
      subOsc.start(time);
      subOsc.stop(time + 0.15);
    } else if (trackId.includes('excellence')) {
      // Hiphop saw-lead
      osc.type = 'sawtooth';
    } else if (trackId.includes('echoes')) {
      // Sine wave with a touch of triangle
      osc.type = 'sine';
    } else {
      // Sweet square/triangle combination
      osc.type = 'triangle';
    }

    osc.frequency.setValueAtTime(frequency, time);

    // Filter to mellow saw/square waves
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(trackId.includes('excellence') ? 1500 : 2500, time);

    gain.gain.setValueAtTime(0.18, time);
    // Exponential decay
    const decayDuration = trackId.includes('sunset') ? 0.4 : 0.2;
    gain.gain.exponentialRampToValueAtTime(0.001, time + decayDuration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.volumeNode);

    osc.start(time);
    osc.stop(time + decayDuration + 0.05);
  }

  // --- VISUALIZATION EQ ANIMATION LOOP ---
  // Simply generates beautiful responsive rhythmic values
  private startVisualization() {
    const updateFrequencies = () => {
      if (!this.isPlaying) return;

      const baseStep = this.step;
      for (let i = 0; i < this.frequencies.length; i++) {
        // Create an organic graphic equalizer wave based on sequencer steps and indices
        let base = 10;
        // Low bands bounce with kick (steps 0, 8)
        if (i < 4) {
          base = (baseStep === 0 || baseStep === 8 || baseStep === 6) ? 75 + Math.random() * 20 : 25 + Math.random() * 15;
        } 
        // Mid bands bounce with snare (steps 4, 12)
        else if (i >= 4 && i < 10) {
          base = (baseStep === 4 || baseStep === 12) ? 65 + Math.random() * 25 : 20 + Math.random() * 20;
        } 
        // High bands bounce with shaker/melody (all steps)
        else {
          base = (baseStep % 2 === 0) ? 45 + Math.random() * 30 : 15 + Math.random() * 15;
        }

        // Apply a multiplier for volume
        const volScaled = base * (0.2 + this.currentVolume * 0.8);
        this.frequencies[i] = Math.max(5, Math.min(95, volScaled));
      }

      this.animFrameId = requestAnimationFrame(updateFrequencies);
    };

    updateFrequencies();
  }

  private stopVisualization() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private resetFrequencies() {
    for (let i = 0; i < this.frequencies.length; i++) {
      this.frequencies[i] = 2; // Flat lines when idle
    }
  }

  // Return whether audio is playing
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Return the currently active track id
  public getCurrentTrackId(): string {
    return this.currentTrackId;
  }
}

// Export single global instance
export const audioService = new AudioEngine();
export default audioService;
