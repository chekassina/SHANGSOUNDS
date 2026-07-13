/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ARTIST_INFO } from '../data';
import { Heart, Award, Users, Map, Star, Lightbulb, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const getIcon = (label: string) => {
    switch (label) {
      case 'Original Releases': return Star;
      case 'Local Events Supported': return Map;
      case 'Total Plays & Streams': return Award;
      case 'Active Subscriptions': return Users;
      default: return Heart;
    }
  };

  return (
    <section id="about" className="py-24 bg-[#0A0A0B] text-white relative overflow-hidden border-b border-white/5">
      {/* Decorative Blur Background Element */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#10B981]/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tighter uppercase mb-4">
            About <span className="text-[#10B981]">ShangSounds</span>
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto rounded-full mb-6" />
          <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest">
            A Journey of Authentic Rhythm and Artistic Excellence
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Biography Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Based in Shangombo, Western Province, Zambia
            </h3>
            
            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">
              {ARTIST_INFO.biography}
            </p>

            {/* Value blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#111111] border border-white/5 text-center">
                <span className="font-mono text-xs text-[#F59E0B] uppercase tracking-widest block mb-1">Consistency</span>
                <span className="font-sans text-xs text-gray-400">Committed to regular, high-quality music drops.</span>
              </div>
              <div className="p-4 rounded-xl bg-[#111111] border border-white/5 text-center">
                <span className="font-mono text-xs text-[#10B981] uppercase tracking-widest block mb-1">Innovation</span>
                <span className="font-sans text-xs text-gray-400">Merging heritage Kalindula with modern synths.</span>
              </div>
              <div className="p-4 rounded-xl bg-[#111111] border border-white/5 text-center">
                <span className="font-mono text-xs text-[#F97316] uppercase tracking-widest block mb-1">Culture</span>
                <span className="font-sans text-xs text-gray-400">Promoting the soul of Western Province.</span>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Mission */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 shadow-xl relative overflow-hidden group hover:border-[#10B981]/30 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#10B981]/5 rounded-full filter blur-xl group-hover:bg-[#10B981]/10 transition-colors" />
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#10B981]/10 text-[#10B981] rounded-lg shrink-0 border border-[#10B981]/20">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white mb-2 uppercase tracking-wide">
                    Our Mission
                  </h4>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">
                    {ARTIST_INFO.mission}
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 shadow-xl relative overflow-hidden group hover:border-[#F97316]/30 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F97316]/5 rounded-full filter blur-xl group-hover:bg-[#F97316]/10 transition-colors" />
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#F97316]/10 text-[#F97316] rounded-lg shrink-0 border border-[#F97316]/20">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white mb-2 uppercase tracking-wide">
                    Our Vision
                  </h4>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">
                    {ARTIST_INFO.vision}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-12 border-t border-white/5">
          {ARTIST_INFO.stats.map((stat, idx) => {
            const Icon = getIcon(stat.label);
            return (
              <div 
                key={idx} 
                className="p-5 sm:p-6 rounded-2xl bg-[#111111] border border-white/5 flex items-center space-x-4 hover:border-white/10 transition-colors duration-300"
              >
                <div className="p-2 sm:p-3 bg-[#10B981]/5 text-[#10B981] rounded-xl border border-[#10B981]/10">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="font-display font-bold text-xl sm:text-3xl text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-sans text-[10px] sm:text-xs text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
