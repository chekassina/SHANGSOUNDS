/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRACKS_DATA } from '../data';
import { Play, Pause, Download, Disc, FileText, Lock, Music } from 'lucide-react';
import { Track } from '../types';

export const MusicSection: React.FC = () => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useApp();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [lyricsTrack, setLyricsTrack] = useState<Track | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);

  const genres = ['All', 'Afro-fusion', 'Zed-Beats', 'Kalindula-fusion', 'Afro-pop', 'Zed-Hiphop'];

  const filteredTracks = selectedGenre === 'All' 
    ? TRACKS_DATA 
    : TRACKS_DATA.filter(t => t.genre.toLowerCase() === selectedGenre.toLowerCase());

  const handlePlayClick = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  const handleDownload = (track: Track) => {
    if (!track.isDownloadable) return;

    setDownloadProgress(track.id);

    // Simulate standard meta-card download
    setTimeout(() => {
      const textContent = `
=== SHANGSOUNDS DIGITAL EXCLUSIVE ===
Track Title: ${track.title}
Album: ${track.album || 'Single'}
Genre: ${track.genre}
Release Date: ${track.releaseDate}
Zambia, Shangombo Music & Entertainment Brand.
Sound is our Passion.

Lyrics:
${track.lyrics || 'Instrumental Track'}
`;

      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `shangsounds_${track.title.toLowerCase().replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadProgress(null);
    }, 1200);
  };

  return (
    <section id="music" className="py-24 bg-[#0A0A0B] text-white relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tighter uppercase mb-4">
            Music <span className="text-[#10B981]">Library</span>
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto rounded-full mb-6" />
          <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest">
            Stream and explore original studio creations & EP tracks
          </p>
        </div>

        {/* Genre Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full font-sans font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                selectedGenre === genre
                  ? 'bg-[#10B981] text-black shadow-md shadow-[#10B981]/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Music Display Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Featured Album / Interactive Vinyl visualizer */}
          <div className="lg:col-span-4 bg-[#111111] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
            <span className="font-mono text-[10px] text-[#F59E0B] uppercase tracking-widest mb-4">
              Now Loaded in Console
            </span>
            
            {/* Spinning Vinyl Visual */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-black border-4 border-gray-900 flex items-center justify-center shadow-2xl mb-6 overflow-hidden shrink-0 group">
              <div className="absolute inset-2 border border-gray-800 rounded-full" />
              <div className="absolute inset-8 border border-gray-800 rounded-full" />
              <div className="absolute inset-14 border border-gray-800 rounded-full" />
              
              {/* Cover Art Image */}
              <img 
                src={currentTrack?.coverUrl || '/public/images/lap1.jpg'} 
                alt="Vinyl center cover"
                className={`w-20 h-20 rounded-full object-cover border-2 border-black z-10 transition-transform ${
                  isPlaying ? 'animate-spin' : 'group-hover:rotate-12'
                }`}
                style={{ animationDuration: '6s' }}
                referrerPolicy="no-referrer"
              />
              
              {/* Vinyl Groove overlays */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 mix-blend-overlay rounded-full pointer-events-none" />
            </div>

            <h3 className="font-display font-bold text-lg text-white mb-1">
              {currentTrack?.title || 'No Track Selected'}
            </h3>
            <p className="font-sans text-xs text-[#10B981] mb-4">
              {currentTrack?.album || 'Single'} • {currentTrack?.genre}
            </p>

            <button
              onClick={() => currentTrack && handlePlayClick(currentTrack)}
              className="px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#e0620f] text-white font-semibold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md hover:scale-102 transition-transform cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-black" />
                  <span>Pause Console</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Play Console</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Track Listing */}
          <div className="lg:col-span-8 bg-[#111111]/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/5 bg-[#111111] flex items-center justify-between">
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                Track Listing ({filteredTracks.length} items)
              </span>
              <span className="font-sans text-[10px] text-gray-500">
                Click any row to load into mixer
              </span>
            </div>

            <div className="divide-y divide-gray-800 max-h-[500px] overflow-y-auto">
              {filteredTracks.map((track, idx) => {
                const isActive = currentTrack?.id === track.id;
                const isCurrentPlaying = isActive && isPlaying;
                
                return (
                  <div
                    key={track.id}
                    className={`flex items-center justify-between p-4 transition-all hover:bg-white/5 group ${
                      isActive ? 'bg-[#10B981]/5 border-l-2 border-[#10B981]' : 'border-l-2 border-transparent'
                    }`}
                  >
                    {/* Left: Row Number & Play Icon Trigger */}
                    <div className="flex items-center space-x-3 min-w-0 flex-1 mr-4">
                      <button
                        onClick={() => handlePlayClick(track)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                          isActive 
                            ? 'bg-[#10B981] text-black' 
                            : 'bg-white/5 text-gray-400 group-hover:bg-[#10B981]/20 group-hover:text-[#10B981]'
                        }`}
                      >
                        {isCurrentPlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        )}
                      </button>

                      {/* Small Album Thumb */}
                      <img 
                        src={track.coverUrl} 
                        alt="cover thumb" 
                        className="w-9 h-9 rounded object-cover shadow border border-gray-800/50 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="min-w-0">
                        <h4 className={`font-sans font-bold text-xs sm:text-sm truncate ${
                          isActive ? 'text-[#10B981]' : 'text-white'
                        }`}>
                          {track.title}
                        </h4>
                        <p className="font-sans text-[10px] sm:text-xs text-gray-400 truncate">
                          {track.album || 'Single'} • <span className="text-gray-500">{track.genre}</span>
                        </p>
                      </div>
                    </div>

                    {/* Middle: Actions (Lyrics, Download) */}
                    <div className="flex items-center space-x-3 shrink-0">
                      
                      {/* Lyrics button */}
                      {track.lyrics && (
                        <button
                          onClick={() => setLyricsTrack(track)}
                          className="p-1.5 rounded bg-gray-800/50 text-gray-400 hover:text-[#10B981] hover:bg-gray-800 transition-colors cursor-pointer"
                          title="View Lyrics"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Download status */}
                      {track.isDownloadable ? (
                        <button
                          onClick={() => handleDownload(track)}
                          disabled={downloadProgress === track.id}
                          className={`p-1.5 rounded transition-all cursor-pointer ${
                            downloadProgress === track.id
                              ? 'bg-[#10B981]/20 text-[#10B981]'
                              : 'bg-gray-800/50 text-gray-400 hover:text-[#10B981] hover:bg-gray-800'
                          }`}
                          title="Download Mp3 Pack"
                        >
                          <Download className={`w-3.5 h-3.5 ${downloadProgress === track.id ? 'animate-bounce' : ''}`} />
                        </button>
                      ) : (
                        <span 
                          className="p-1.5 rounded bg-gray-800/10 text-gray-600" 
                          title="Preview only"
                        >
                          <Lock className="w-3.5 h-3.5" />
                        </span>
                      )}

                      {/* Right: Duration */}
                      <span className="font-mono text-[10px] sm:text-xs text-gray-500 min-w-[32px] text-right">
                        {track.duration}
                      </span>

                    </div>
                  </div>
                );
              })}

              {filteredTracks.length === 0 && (
                <div className="p-12 text-center text-gray-500 font-sans text-sm">
                  No tracks available in this genre yet. Check back soon!
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Lyrics Popup Modal (Independent) */}
      {lyricsTrack && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#10B981]/30 rounded-2xl max-w-lg w-full max-h-[70vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-white text-base">{lyricsTrack.title}</h3>
                <p className="font-sans text-xs text-[#10B981]">{lyricsTrack.genre} • Lyrics</p>
              </div>
              <button 
                onClick={() => setLyricsTrack(null)}
                className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
            {/* Scrollable lyrics */}
            <div className="p-6 overflow-y-auto font-sans text-sm text-gray-300 leading-relaxed whitespace-pre-wrap text-center max-w-md mx-auto">
              {lyricsTrack.lyrics}
            </div>
            {/* Footer */}
            <div className="p-3 bg-[#0c0e12] text-center border-t border-gray-800/50">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">ShangSounds Quality Release</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
