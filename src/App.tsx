/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeHighlights } from './components/HomeHighlights';
import { AboutSection } from './components/AboutSection';
import { MusicSection } from './components/MusicSection';
import { VideoSection } from './components/VideoSection';
import { GallerySection } from './components/GallerySection';
import { EventsSection } from './components/EventsSection';
import { NewsSection } from './components/NewsSection';
import { MediaKitSection } from './components/MediaKitSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { AudioPlayer } from './components/AudioPlayer';
import { ARTIST_INFO } from './data';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { activePage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="space-y-0"
          >
            <Hero />
            <HomeHighlights />
          </motion.div>
        );
      case 'about':
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <AboutSection />
          </motion.div>
        );
      case 'music':
        return (
          <motion.div
            key="music"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <MusicSection />
          </motion.div>
        );
      case 'videos':
        return (
          <motion.div
            key="videos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <VideoSection />
          </motion.div>
        );
      case 'photos':
        return (
          <motion.div
            key="photos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <GallerySection />
          </motion.div>
        );
      case 'events':
        return (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <EventsSection />
          </motion.div>
        );
      case 'news':
        return (
          <motion.div
            key="news"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <NewsSection />
          </motion.div>
        );
      case 'bookings':
        return (
          <motion.div
            key="bookings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="space-y-0"
          >
            <ContactSection />
            <MediaKitSection />
          </motion.div>
        );
      default:
        return (
          <div className="py-32 text-center text-gray-500 font-mono text-sm">
            Page Not Found
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans selection:bg-[#10B981] selection:text-black antialiased flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <Navbar />

        {/* Animated Page Transitions wrapper */}
        <main className="relative min-h-[70vh]">
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#07090c] border-t border-white/5 pt-16 pb-28 text-gray-500 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          {/* Logo representation in footer */}
          <div className="flex items-center space-x-2 group mb-6">
            <div className="relative w-8 h-8 rounded-full border border-[#10B981]/20 bg-[#111111] flex items-center justify-center overflow-hidden">
              <img 
                src="/images/logo.jpg" 
                alt="ShangSounds" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-display font-bold text-base text-gray-300 uppercase tracking-wider">
              SHANG<span className="text-[#10B981]">SOUNDS</span>
            </span>
          </div>

          <p className="font-sans text-xs max-w-md leading-relaxed mb-6 text-gray-400">
            Empowering local talent and showcasing Zambian music & creative culture from Shangombo to the world. Built on professional standards, consistency, and artistic innovation.
          </p>

          {/* Social Icons inside Footer */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs font-sans">
            <a href={ARTIST_INFO.socials.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-[#10B981] transition-colors uppercase tracking-widest font-semibold">Spotify</a>
            <a href={ARTIST_INFO.socials.appleMusic} target="_blank" rel="noopener noreferrer" className="hover:text-[#10B981] transition-colors uppercase tracking-widest font-semibold">Apple Music</a>
            <a href={ARTIST_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#10B981] transition-colors uppercase tracking-widest font-semibold">YouTube</a>
            <a href={ARTIST_INFO.socials.audiomack} target="_blank" rel="noopener noreferrer" className="hover:text-[#10B981] transition-colors uppercase tracking-widest font-semibold">Audiomack</a>
            <a href={ARTIST_INFO.socials.soundcloud} target="_blank" rel="noopener noreferrer" className="hover:text-[#10B981] transition-colors uppercase tracking-widest font-semibold">SoundCloud</a>
          </div>

          <div className="w-12 h-px bg-white/5 rounded mb-6" />

          <p className="font-mono text-[9px] uppercase tracking-widest text-gray-600 leading-none">
            &copy; {new Date().getFullYear()} {ARTIST_INFO.name} Zambia. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Global Simulated Content Dashboard */}
      <AdminDashboard />

      {/* Persistent Sticky Audio Console Player */}
      <AudioPlayer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
