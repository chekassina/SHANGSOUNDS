/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ARTIST_INFO } from '../data';
import { FileDown, FileText, Download, Check, ShieldAlert, Award } from 'lucide-react';

export const MediaKitSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const epkFiles = [
    { name: 'Official Biography (High Res PDF)', size: '1.2 MB', format: 'PDF', icon: FileText },
    { name: 'Branding Kit & High-Res Logos', size: '4.8 MB', format: 'ZIP', icon: Download },
    { name: 'Promotional Photos (Tours & Shoots)', size: '15.4 MB', format: 'ZIP', icon: Download },
    { name: 'Technical Stage Rider & Inputs', size: '840 KB', format: 'PDF', icon: FileText },
  ];

  const handleDownloadAll = () => {
    // Generate a beautiful, comprehensive EPK metadata card file
    const content = `
============================================================
              SHANGSOUNDS - OFFICIAL PRESS KIT (EPK)
                 "Sound is our Passion"
============================================================
Location: Shangombo, Western Province, Zambia
Founded: 2023
Genre Focus: Afro-fusion, Kalindula-fusion, Zed-Beats
Website: https://shangsounds.com (Official Online Portal)

------------------------------------------------------------
1. BRAND BIOGRAPHY & IDENTITY
------------------------------------------------------------
ShangSounds is a Zambia-based music and entertainment brand committed 
to delivering high-quality music, creative content, and memorable 
entertainment experiences. 

Based in Shangombo, Western Province, ShangSounds aims to promote local 
talent and showcase Zambian culture to audiences across the country and 
beyond. The brand is dedicated to professionalism, innovation, and 
consistency, building a strong presence in the music industry through 
digital platforms, collaborations, and live performances.

Our Mission: 
To produce inspiring, high-quality music and empower creative talent.

Our Vision: 
To become one of Zambia's leading independent music and entertainment 
brands, recognized locally and internationally for excellence and originality.

------------------------------------------------------------
2. STATS & MILESTONES (MID-2026 AUDIT)
------------------------------------------------------------
* Releases: 18+ Original tracks & EPs
* Supported Events: 45+ Local festivals and community expos
* Audience reach: 2.5 Million+ digital streams
* Newsletter Subscriptions: 10,000+ Active fans

------------------------------------------------------------
3. STAGE & INPUT RIDER SUMMARY
------------------------------------------------------------
* 1x Main Vocal Condenser (Wireless preferred, Shure SM58 or equiv)
* 2x Stereo Guitar Inputs (Acoustic and Electric Lead DI Boxes)
* 1x Stereo MIDI Keyboard controller playback line (TRS DI Box)
* 4x Wedge Monitors (Mix 1: Lead Vocal, Mix 2: Guitars, Mix 3: Drums)
* Drum setup: Full standard acoustic kit with 4 miced channels minimum.

------------------------------------------------------------
4. BOOKINGS & GENERAL INQUIRIES
------------------------------------------------------------
Primary Contact Email: ${ARTIST_INFO.contact.email}
Phone Line: ${ARTIST_INFO.contact.phone}
Mailing/Label Address: ${ARTIST_INFO.contact.address}

Copyright (c) 2026 ShangSounds Zambia. All rights reserved.
============================================================
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shangsounds_official_press_kit_epk.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="media-kit" className="py-24 bg-[#0A0A0B] text-white relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual EPK Intro */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-[10px] text-[#10B981] uppercase tracking-widest block">
              Press & Media Resources
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tighter leading-none text-white">
              Electronic <span className="text-[#10B981]">Press Kit</span> (EPK)
            </h2>
            <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
              Are you an event promoter, journalist, radio director, or collaborative brand? Access our official press assets, detailed bios, technical input lists, stage riders, and promotional brand logos compiled below.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3.5">
              <div className="p-2 bg-[#10B981]/15 text-[#10B981] rounded-lg border border-[#10B981]/20 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                <strong>Credential Use Only:</strong> All photography assets, biographies, and trademarks listed are copyright-cleared for official event promotion, radio announcements, and editorial interviews.
              </p>
            </div>

            <button
              onClick={handleDownloadAll}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 shadow-md ${
                downloadSuccess 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-[#10B981] text-black hover:bg-[#0da06f] shadow-[#10B981]/20'
              } cursor-pointer`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>EPK Package Downloaded</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  <span>Download Complete EPK Pack</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Press Files List Card */}
          <div className="lg:col-span-6 bg-[#111111] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="font-display font-bold text-base sm:text-lg text-white mb-6 border-b border-white/5 pb-3 uppercase tracking-wide">
              Press Assets Included
            </h3>

            <div className="space-y-4 mb-6">
              {epkFiles.map((file, idx) => {
                const Icon = file.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-[#10B981]/20 transition-colors"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="p-2 bg-[#10B981]/5 text-[#10B981] rounded-lg border border-[#10B981]/10">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-sans font-semibold text-xs sm:text-sm text-gray-200 truncate">
                        {file.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0 ml-4">
                      <span className="font-mono text-[10px] text-gray-500 uppercase">
                        {file.format} ({file.size})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center space-x-2.5 text-gray-500 text-[11px] font-sans justify-center">
              <ShieldAlert className="w-4 h-4 text-[#10B981]/60 shrink-0" />
              <span>Includes high-res vector `.SVG` and raw `.PNG` format logo files.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
