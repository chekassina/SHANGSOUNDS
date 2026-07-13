/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { TRACKS_DATA, ARTIST_INFO } from '../data';
import { Play, Pause, Disc, ArrowDown, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const { currentTrack, isPlaying, playTrack, togglePlay, setActivePage } = useApp();
  const latestTrack = TRACKS_DATA[0]; // "Shangombo Sunset"

  const isCurrentPlaying = currentTrack?.id === latestTrack.id && isPlaying;

  const handlePlayLatest = () => {
    if (currentTrack?.id === latestTrack.id) {
      togglePlay();
    } else {
      playTrack(latestTrack);
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0A0B] text-white px-4"
    >
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/public/images/lap5.jpg" 
          alt="Shangombo Sunset Background" 
          className="w-full h-full object-cover scale-105 filter brightness-[0.35] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/90 via-transparent to-[#0A0A0B]/90" />
      </div>

      {/* Decorative floating lights/auras */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F97316]/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] font-mono text-[10px] uppercase tracking-widest mb-6">
          <MapPin className="w-3.5 h-3.5" />
          <span>{ARTIST_INFO.location}</span>
        </div>

        {/* Brand Title with elegant lettering */}
        <h1 className="font-display font-black text-5xl md:text-8xl tracking-tighter leading-none mb-4 select-none uppercase">
          SHANG<span className="text-[#10B981] relative">SOUNDS</span>
        </h1>
        
        {/* Subtle sub-heading / tagline */}
        <p className="font-mono text-sm md:text-lg text-gray-300 uppercase tracking-[0.4em] max-w-2xl mb-8">
          Sound Is Our Passion
        </p>

        {/* Concise Description */}
        <p className="font-sans text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed mb-10">
          Zambia-based music and entertainment brand dedicated to producing inspiring, high-quality music and empowering creative talent from the historic riverbanks of Shangombo.
        </p>

        {/* Actions Section (Interactive Player CTA) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          {/* Main Play CTA */}
          <button
            onClick={handlePlayLatest}
            className="group px-8 py-4 rounded-xl bg-[#F97316] hover:bg-[#e0620f] text-white font-bold uppercase tracking-tighter text-sm flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(249,115,22,0.35)] cursor-pointer"
          >
            {isCurrentPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-black" />
                <span>Pause Latest Release</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black" />
                <span>Play Latest Release</span>
              </>
            )}
          </button>

          {/* Quick Info Block */}
          <div className="flex items-center space-x-3 text-left px-5 py-3 rounded-2xl bg-[#111111] border border-white/10 backdrop-blur-sm">
            <Disc className={`w-8 h-8 text-[#10B981] ${isCurrentPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
            <div>
              <div className="font-mono text-[9px] text-[#F59E0B] uppercase tracking-widest leading-none mb-0.5">
                Featured Single
              </div>
              <div className="font-sans font-bold text-xs text-white">
                {latestTrack.title}
              </div>
              <div className="font-sans text-[10px] text-gray-400">
                {latestTrack.genre} • {latestTrack.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Page navigation indicator */}
        <button 
          onClick={() => {
            setActivePage('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-gray-500 hover:text-[#10B981] transition-colors flex flex-col items-center space-y-1.5 cursor-pointer focus:outline-none"
        >
          <span className="font-mono text-[9px] uppercase tracking-widest">Discover More</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>

      </div>
    </section>
  );
};
