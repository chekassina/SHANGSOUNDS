/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VIDEOS_DATA } from '../data';
import { Play, Calendar, Clock, X } from 'lucide-react';
import { Video } from '../types';

export const VideoSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Official MV', 'Live Performance', 'Behind The Scenes', 'Lyric Video'];

  const filteredVideos = filterCategory === 'All'
    ? VIDEOS_DATA
    : VIDEOS_DATA.filter(v => v.category === filterCategory);

  return (
    <section id="videos" className="py-24 bg-[#0A0A0B] text-white relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tighter uppercase mb-4">
            Music <span className="text-[#10B981]">Videos</span>
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto rounded-full mb-6" />
          <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest">
            Watch official music releases, live sets, and studio archives
          </p>
        </div>

        {/* Video Categories Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-sans font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#10B981] text-black shadow-md shadow-[#10B981]/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVideos.map((video) => (
            <div 
              key={video.id}
              className="bg-[#111111] rounded-2xl overflow-hidden border border-white/5 shadow-xl group hover:border-[#10B981]/30 transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                onClick={() => setActiveVideo(video)}
              >
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-xl bg-[#F97316] group-hover:bg-[#e0620f] text-white flex items-center justify-center shadow-lg transition-transform duration-300 transform group-hover:scale-110">
                    <Play className="w-6 h-6 fill-white ml-1 text-white" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 font-mono text-[10px] text-gray-300 flex items-center space-x-1 border border-white/10">
                  <Clock className="w-3 h-3 text-[#10B981]" />
                  <span>{video.duration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#10B981] text-black font-sans font-bold text-[9px] uppercase tracking-wider">
                  {video.category}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2 font-mono">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#10B981]/80" />
                    <span>{video.releaseDate}</span>
                  </span>
                </div>
                <h3 
                  className="font-display font-bold text-base sm:text-lg text-white mb-2 group-hover:text-[#10B981] transition-colors cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  {video.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}

          {filteredVideos.length === 0 && (
            <div className="col-span-2 py-16 text-center text-gray-500 font-sans text-sm">
              No videos matching this category. Stay tuned for new visual uploads!
            </div>
          )}
        </div>

      </div>

      {/* Video IFrame Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0B] border border-[#10B981]/30 rounded-2xl max-w-4xl w-full flex flex-col overflow-hidden shadow-2xl animate-fade-in relative">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#111111]">
              <div>
                <span className="font-sans font-bold text-[9px] uppercase tracking-wider bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded-full border border-[#10B981]/30">
                  {activeVideo.category}
                </span>
                <h3 className="font-display font-bold text-white text-sm sm:text-base mt-1.5 truncate max-w-[250px] sm:max-w-lg">
                  {activeVideo.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 hover:text-[#10B981] text-white cursor-pointer transition-colors"
                title="Close Video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video w-full bg-black">
              {/* Using standard embedding with strict security referrer policies */}
              <iframe 
                src={activeVideo.youtubeUrl} 
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-5 bg-[#0e1116] border-t border-gray-800/80">
              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">
                {activeVideo.description}
              </p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
