/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { TRACKS_DATA, EVENTS_DATA, BLOG_DATA, PHOTOS_DATA } from '../data';
import { Play, Pause, Calendar, ArrowRight, Music, Image as ImageIcon, Disc, MessageSquare } from 'lucide-react';

export const HomeHighlights: React.FC = () => {
  const { playTrack, currentTrack, isPlaying, togglePlay, setActivePage } = useApp();

  // Get latest 2 tracks
  const latestTracks = TRACKS_DATA.slice(0, 2);
  // Get upcoming 2 events
  const upcomingEvents = EVENTS_DATA.filter(e => e.status === 'Upcoming').slice(0, 2);
  // Get latest blog post
  const latestPost = BLOG_DATA[0];
  // Get latest 3 photos
  const latestPhotos = PHOTOS_DATA.slice(0, 3);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0A0A0B] text-white space-y-24 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Row 1: Music & Gigs split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Panel: Featured Music Teaser */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-[#10B981]/15 text-[#10B981] rounded-lg">
                  <Music className="w-4 h-4" />
                </div>
                <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-wider text-white">
                  Featured Sounds
                </h3>
              </div>
              <button 
                onClick={() => handleNavigate('music')}
                className="group flex items-center space-x-1.5 font-mono text-[10px] text-[#10B981] hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
              >
                <span>Full Library</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="space-y-4">
              {latestTracks.map((track) => {
                const isCurrentPlaying = currentTrack?.id === track.id && isPlaying;
                return (
                  <div 
                    key={track.id}
                    className="p-4 rounded-xl bg-[#111111] border border-white/5 flex items-center justify-between group hover:border-[#10B981]/25 transition-all duration-300 shadow-md"
                  >
                    <div className="flex items-center space-x-4 min-w-0">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img 
                          src={track.coverUrl} 
                          alt={track.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={() => isCurrentPlaying ? togglePlay() : playTrack(track)}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          {isCurrentPlaying ? (
                            <Pause className="w-4 h-4 text-[#10B981] fill-current" />
                          ) : (
                            <Play className="w-4 h-4 text-white fill-current" />
                          )}
                        </button>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-sans font-bold text-xs sm:text-sm text-gray-200 truncate">{track.title}</h4>
                        <p className="font-sans text-[10px] text-gray-500 mt-0.5">{track.genre} • {track.duration}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => isCurrentPlaying ? togglePlay() : playTrack(track)}
                      className={`p-2.5 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none shrink-0 ${
                        isCurrentPlaying
                          ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/40'
                          : 'bg-white/5 text-gray-400 border-white/5 hover:border-[#10B981]/30 hover:text-white'
                      }`}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Upcoming Gigs Teaser */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-[#10B981]/15 text-[#10B981] rounded-lg">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-wider text-white">
                  Upcoming Events
                </h3>
              </div>
              <button 
                onClick={() => handleNavigate('events')}
                className="group flex items-center space-x-1.5 font-mono text-[10px] text-[#10B981] hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
              >
                <span>All Tour Dates</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => {
                const dateObj = new Date(event.date);
                const day = dateObj.getDate();
                const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                return (
                  <div 
                    key={event.id}
                    className="p-4 rounded-xl bg-[#111111] border border-white/5 flex items-center space-x-4 hover:border-[#10B981]/20 transition-all duration-300 shadow-md"
                  >
                    {/* Date Block */}
                    <div className="w-12 h-12 rounded-lg bg-[#10B981]/5 border border-[#10B981]/15 flex flex-col items-center justify-center shrink-0">
                      <span className="font-mono text-base font-bold text-[#10B981] leading-none">{day}</span>
                      <span className="font-mono text-[9px] text-[#10B981]/70 tracking-wider uppercase mt-1 leading-none">{month}</span>
                    </div>

                    <div className="min-w-0 flex-grow">
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-gray-200 truncate uppercase tracking-tight">{event.title}</h4>
                      <p className="font-sans text-[10px] text-gray-500 mt-0.5 truncate">{event.venue} • {event.location}</p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="inline-flex px-2 py-1 rounded bg-[#10B981]/10 border border-[#10B981]/20 font-mono text-[9px] text-[#10B981] uppercase tracking-wider">
                        {event.time.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Row 2: Featured Editorial Blog Post Card */}
        {latestPost && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111111] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="lg:col-span-5 relative aspect-video sm:aspect-[4/3] rounded-xl overflow-hidden shadow-inner">
              <img 
                src={latestPost.coverUrl} 
                alt={latestPost.title}
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#10B981] font-mono text-[9px] text-black font-bold uppercase tracking-widest">
                {latestPost.category}
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-5 lg:pl-4">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                {latestPost.date} • {latestPost.readTime}
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white leading-tight uppercase tracking-tight">
                {latestPost.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                {latestPost.excerpt}
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t border-white/5">
                <button 
                  onClick={() => handleNavigate('news')}
                  className="group inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:text-[#10B981] hover:border-[#10B981]/30 font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest hidden sm:inline">
                  ShangSounds Creative Journal
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Row 3: Gallery Teaser Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 bg-[#10B981]/15 text-[#10B981] rounded-lg">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-wider text-white">
                Artistic Photography
              </h3>
            </div>
            <button 
              onClick={() => handleNavigate('photos')}
              className="group flex items-center space-x-1.5 font-mono text-[10px] text-[#10B981] hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
            >
              <span>View Gallery</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {latestPhotos.map((photo) => (
              <div 
                key={photo.id}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 shadow-md bg-[#111111]"
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.85] group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  <span className="font-mono text-[8px] text-[#10B981] uppercase tracking-widest mb-1">{photo.category}</span>
                  <p className="font-sans text-[10px] text-gray-300 leading-normal line-clamp-2">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
