/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PHOTOS_DATA } from '../data';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Photo } from '../types';

export const GallerySection: React.FC = () => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Live', 'Studio', 'Promo', 'Shangombo'];

  const filteredPhotos = filterCategory === 'All'
    ? PHOTOS_DATA
    : PHOTOS_DATA.filter(p => p.category === filterCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx === null) return;
    const prevIdx = (activePhotoIdx - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhotoIdx(prevIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx === null) return;
    const nextIdx = (activePhotoIdx + 1) % filteredPhotos.length;
    setActivePhotoIdx(nextIdx);
  };

  return (
    <section id="photos" className="py-24 bg-[#0A0A0B] text-white relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tighter uppercase mb-4">
            Photo <span className="text-[#10B981]">Gallery</span>
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto rounded-full mb-6" />
          <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest">
            A visual documentation of sessions, performances, and scenery
          </p>
        </div>

        {/* Categories */}
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

        {/* Grid Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div 
              key={photo.id}
              className="group relative aspect-[4/3] bg-black rounded-2xl overflow-hidden border border-white/5 shadow-md cursor-pointer hover:border-[#10B981]/30 transition-all duration-300"
              onClick={() => setActivePhotoIdx(index)}
            >
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.9] group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />

              {/* Blur Hover Backdrop Overlay */}
              <div className="absolute inset-0 bg-[#0A0A0B]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="p-2.5 rounded-full bg-[#10B981] text-black self-end mb-auto shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                </div>
                
                <span className="font-sans font-bold text-[9px] uppercase tracking-wider text-[#10B981] mb-1.5 flex items-center space-x-1">
                  <Camera className="w-3 h-3" />
                  <span>{photo.category} Category</span>
                </span>
                
                <p className="font-sans text-xs text-white leading-relaxed line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}

          {filteredPhotos.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-500 font-sans text-sm">
              No photos found in this category. We upload new photos from tours frequently!
            </div>
          )}
        </div>

      </div>

      {/* Lightbox Zoom Overlay */}
      {activePhotoIdx !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={() => setActivePhotoIdx(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 p-2.5 rounded-lg bg-gray-900/80 border border-gray-800 text-white hover:text-[#10B981] transition-colors cursor-pointer"
            onClick={() => setActivePhotoIdx(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl w-full max-h-[75vh] flex items-center justify-center">
            {/* Left navigation arrow */}
            <button 
              className="absolute left-2 sm:-left-16 p-2 rounded-full bg-gray-900/60 hover:bg-[#10B981] hover:text-black border border-gray-800 text-white cursor-pointer transition-all shrink-0 z-10"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* High res Image */}
            <div className="max-w-full max-h-full overflow-hidden rounded-xl border border-[#10B981]/10 shadow-2xl">
              <img 
                src={filteredPhotos[activePhotoIdx].url} 
                alt="Lightbox expanded" 
                className="max-w-full max-h-[70vh] object-contain mx-auto"
                onClick={(e) => e.stopPropagation()} // stop close trigger
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right navigation arrow */}
            <button 
              className="absolute right-2 sm:-right-16 p-2 rounded-full bg-gray-900/60 hover:bg-[#10B981] hover:text-black border border-gray-800 text-white cursor-pointer transition-all shrink-0 z-10"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Expanded Caption Panel */}
          <div 
            className="max-w-xl text-center mt-5 px-6 py-4 rounded-xl bg-[#111111] border border-white/5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-mono text-[9px] text-[#10B981] uppercase tracking-widest block mb-1">
              {filteredPhotos[activePhotoIdx].category} Session Photo ({activePhotoIdx + 1} / {filteredPhotos.length})
            </span>
            <p className="font-sans text-sm text-gray-300 leading-relaxed">
              {filteredPhotos[activePhotoIdx].caption}
            </p>
          </div>

        </div>
      )}

    </section>
  );
};
