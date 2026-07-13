/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Download, FileText, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    setPlayerVolume,
    frequencies,
  } = useApp();

  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const prevVolumeRef = useRef(volume);

  const durationStr = currentTrack?.duration || '3:00';
  
  // Convert duration like "3:45" to seconds
  const totalSeconds = (() => {
    const parts = durationStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 180;
  })();

  // Reset progress when track changes
  useEffect(() => {
    setCurrentTime(0);
  }, [currentTrack]);

  // Tick playback timer when playing
  useEffect(() => {
    let intervalId: any;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            nextTrack(); // Auto play next
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, totalSeconds]);

  if (!currentTrack) return null;

  // Format seconds to "m:ss"
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value, 10));
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      setPlayerVolume(prevVolumeRef.current);
      setIsMuted(false);
    } else {
      prevVolumeRef.current = volume;
      setPlayerVolume(0);
      setIsMuted(true);
    }
  };

  const handleDownload = () => {
    if (!currentTrack.isDownloadable) return;

    // Simulate downloading an audio metadata card
    const textContent = `
=== SHANGSOUNDS ORIGINAL RELEASE ===
Track Title: ${currentTrack.title}
Album: ${currentTrack.album || 'Single'}
Genre: ${currentTrack.genre}
Release Date: ${currentTrack.releaseDate}
Zambia, Shangombo Music & Entertainment Brand.
Sound is our Passion.

Lyrics:
${currentTrack.lyrics || 'Instrumental Track'}
`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shangsounds_${currentTrack.title.toLowerCase().replace(/\s+/g, '_')}_metadata.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0B] border-t border-[#10B981]/30 text-white shadow-2xl px-4 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          
          {/* Left Side: Track Info */}
          <div className="flex items-center space-x-3 w-full md:w-1/4">
            <div className="relative w-12 h-12 rounded bg-[#111111] border border-[#10B981]/20 overflow-hidden shrink-0 shadow-inner">
              <img 
                src={currentTrack.coverUrl} 
                alt={currentTrack.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Music className="w-5 h-5 text-[#10B981] animate-bounce" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-sans font-bold text-xs sm:text-sm text-white truncate">
                {currentTrack.title}
              </h4>
              <p className="font-sans text-[10px] sm:text-xs text-gray-400 truncate">
                {currentTrack.album ? `${currentTrack.album}` : 'Single'} • <span className="text-[#10B981]/80">{currentTrack.genre}</span>
              </p>
            </div>
          </div>

          {/* Middle Side: Player Controls & Progress */}
          <div className="flex flex-col items-center w-full md:w-2/4">
            {/* Playback Buttons */}
            <div className="flex items-center space-x-4 mb-1.5">
              <button 
                onClick={prevTrack}
                className="p-1.5 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="p-2.5 rounded-full bg-[#10B981] hover:bg-[#0da06f] text-black transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md shadow-[#10B981]/20"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4.5 h-4.5 fill-black text-black" />
                ) : (
                  <Play className="w-4.5 h-4.5 fill-black text-black ml-0.5" />
                )}
              </button>

              <button 
                onClick={nextTrack}
                className="p-1.5 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>
            </div>

            {/* Progress Slider */}
            <div className="flex items-center space-x-2.5 w-full px-2">
              <span className="font-mono text-[10px] text-gray-400 min-w-[28px] text-right">
                {formatTime(currentTime)}
              </span>
              
              <input 
                type="range"
                min="0"
                max={totalSeconds}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
              />

              <span className="font-mono text-[10px] text-gray-400 min-w-[28px]">
                {durationStr}
              </span>
            </div>
          </div>

          {/* Right Side: Visualizer, Volume, Actions */}
          <div className="flex items-center justify-end space-x-4 w-full md:w-1/4">
            
            {/* Rhythmic graphic EQ visualizer */}
            <div className="hidden lg:flex items-end space-x-[2px] h-6 px-3 border-r border-white/5 mr-2">
              {frequencies.map((height, idx) => (
                <div 
                  key={idx} 
                  className="w-[3px] bg-[#10B981]/80 rounded-t"
                  style={{ 
                    height: `${height}%`,
                    transition: 'height 50ms ease-out',
                    opacity: isPlaying ? 0.9 : 0.2
                  }}
                />
              ))}
            </div>

            {/* Lyrics Button */}
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-all ${
                showLyrics 
                  ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/40' 
                  : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-700 hover:text-white'
              }`}
              title="View Lyrics"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lyrics</span>
            </button>

            {/* Download Button */}
            {currentTrack.isDownloadable && (
              <button
                onClick={handleDownload}
                className={`p-2 rounded-lg border border-transparent text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-all ${
                  downloadSuccess 
                    ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40'
                    : 'bg-[#F97316] text-white hover:bg-[#e0620f] shadow-md shadow-[#F97316]/20'
                }`}
                title="Download Track Pack"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {downloadSuccess ? 'Downloaded' : 'Download'}
                </span>
              </button>
            )}

            {/* Volume controls */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleMuteToggle}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setPlayerVolume(parseFloat(e.target.value));
                  if (parseFloat(e.target.value) > 0) setIsMuted(false);
                }}
                className="w-16 sm:w-20 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
              />
            </div>

          </div>

        </div>
      </div>

      {/* Lyrics Popup Drawer */}
      {showLyrics && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#10B981]/30 rounded-2xl max-w-lg w-full max-h-[70vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-white text-base">{currentTrack.title}</h3>
                <p className="font-sans text-xs text-[#10B981]">{currentTrack.genre} • Lyrics</p>
              </div>
              <button 
                onClick={() => setShowLyrics(false)}
                className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
            {/* Scrollable lyrics */}
            <div className="p-6 overflow-y-auto font-sans text-sm text-gray-300 leading-relaxed whitespace-pre-wrap text-center max-w-md mx-auto">
              {currentTrack.lyrics || "No lyrics available for this track."}
            </div>
            {/* Footer */}
            <div className="p-3 bg-[#0c0e12] text-center border-t border-gray-800/50">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">ShangSounds Original Release</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
