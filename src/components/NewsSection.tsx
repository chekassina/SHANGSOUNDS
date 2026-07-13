/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BLOG_DATA } from '../data';
import { BookOpen, Calendar, Clock, X, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

export const NewsSection: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="news" className="py-24 bg-[#0A0A0B] text-white relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tighter uppercase mb-4">
            News & <span className="text-[#10B981]">Blog</span>
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto rounded-full mb-6" />
          <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest">
            Stay updated with our latest releases, tours, & community projects
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_DATA.map((post) => (
            <article 
              key={post.id}
              className="bg-[#111111] rounded-2xl overflow-hidden border border-white/5 flex flex-col h-full shadow-lg group hover:border-[#10B981]/30 transition-all duration-300"
            >
              {/* Cover Thumbnail */}
              <div 
                className="relative aspect-[16/10] bg-black overflow-hidden cursor-pointer"
                onClick={() => setActivePost(post)}
              >
                <img 
                  src={post.coverUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12]/80 to-transparent" />
                
                {/* Category tag */}
                <div className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-[#10B981] text-black font-sans font-bold text-[9px] uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-3 text-[10px] text-gray-500 font-mono mb-2.5">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#10B981]/80" />
                    <span>{post.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#10B981]/80" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 
                  className="font-display font-bold text-base text-white group-hover:text-[#10B981] cursor-pointer transition-colors line-clamp-2 mb-3"
                  onClick={() => setActivePost(post)}
                >
                  {post.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read Button */}
                <button
                  onClick={() => setActivePost(post)}
                  className="text-[#10B981] hover:text-[#0da06f] font-semibold text-xs uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer mt-auto border-t border-white/5 pt-4"
                >
                  <span>Read Full Post</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Expanded Blog Post Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#10B981]/30 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in">
            
            {/* Header image */}
            <div className="relative h-48 sm:h-64 bg-black overflow-hidden shrink-0">
              <img 
                src={activePost.coverUrl} 
                alt={activePost.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
              
              {/* Category tag */}
              <div className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-[#10B981] text-black font-sans font-bold text-[9px] uppercase tracking-wider z-10">
                {activePost.category}
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-black/60 hover:bg-black/90 border border-gray-800 text-white hover:text-[#10B981] transition-colors cursor-pointer z-10"
                title="Close Article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Post Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 flex-grow">
              <div className="flex items-center space-x-4 text-xs text-gray-400 font-mono">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-[#10B981]/80" />
                  <span>{activePost.date}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-[#10B981]/80" />
                  <span>{activePost.readTime}</span>
                </span>
              </div>

              <h3 className="font-display font-bold text-lg sm:text-2xl text-white leading-tight">
                {activePost.title}
              </h3>
              
              <div className="w-12 h-0.5 bg-[#10B981]/50 rounded-full" />

              {/* Main content with basic rich-formatting helpers (substitutes markdown styles) */}
              <div className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed space-y-4 pt-2">
                {activePost.content.split('\n\n').map((paragraph, index) => {
                  // Basic formatting helpers for previewing headers or lists
                  if (paragraph.startsWith('###')) {
                    return (
                      <h4 key={index} className="font-display font-bold text-white text-base sm:text-lg pt-4">
                        {paragraph.replace('###', '').trim()}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('*')) {
                    return (
                      <ul key={index} className="list-disc list-inside space-y-1 text-gray-300 pl-2">
                        {paragraph.split('\n').map((li, i) => (
                          <li key={i}>{li.replace('*', '').trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('1.')) {
                    return (
                      <ol key={index} className="list-decimal list-inside space-y-1 text-gray-300 pl-2">
                        {paragraph.split('\n').map((li, i) => (
                          <li key={i}>{li.replace(/^\d+\.\s*/, '').trim()}</li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p key={index} className="whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#0A0A0B] border-t border-white/5 flex items-center justify-between shrink-0">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">ShangSounds Editorial Press</span>
              <button 
                onClick={() => setActivePost(null)}
                className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 hover:text-[#10B981] text-white font-sans text-xs font-semibold cursor-pointer transition-colors"
              >
                Finished Reading
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
