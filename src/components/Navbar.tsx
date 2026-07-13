/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Music, Eye, Calendar, BookOpen, Settings, Phone, Image, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, activePage, setActivePage } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', page: 'home', icon: Music },
    { name: 'About', page: 'about', icon: BookOpen },
    { name: 'Music', page: 'music', icon: Music },
    { name: 'Videos', page: 'videos', icon: Eye },
    { name: 'Photos', page: 'photos', icon: Image },
    { name: 'Events', page: 'events', icon: Calendar },
    { name: 'News', page: 'news', icon: BookOpen },
    { name: 'Bookings & Contact', page: 'bookings', icon: Phone },
  ];

  const handleNavigate = (page: string) => {
    setActivePage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#0A0A0B]/90 backdrop-blur-md border-b border-[#10B981]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleNavigate('home')} 
              className="flex items-center space-x-2 group focus:outline-none text-left cursor-pointer"
            >
              <div className="relative w-10 h-10 rounded-full border border-[#10B981]/50 bg-[#111111] flex items-center justify-center overflow-hidden shadow-inner">
                <img 
                  src="/images/logo.jpg" 
                  alt="ShangSounds" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white tracking-wide group-hover:text-[#10B981] transition-colors">
                  SHANG<span className="text-[#10B981]">SOUNDS</span>
                </span>
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest leading-none">
                  Sound is our passion
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavigate(link.page)}
                  className={`font-sans font-medium text-xs uppercase tracking-widest transition-colors py-2 flex items-center space-x-1 border-b cursor-pointer focus:outline-none ${
                    isActive 
                      ? 'text-[#10B981] border-[#10B981]' 
                      : 'text-gray-300 border-transparent hover:text-[#10B981] hover:border-[#10B981]/30'
                  }`}
                >
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>

          {/* Admin Control Toggle & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            {/* Quick Access Admin Toggle */}
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className={`p-2.5 rounded-lg border transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                isAdminOpen 
                  ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/50' 
                  : 'bg-transparent text-gray-400 border-gray-800 hover:border-[#10B981]/30 hover:text-[#10B981]'
              }`}
              title="Toggle Admin/Inquiry Cockpit"
            >
              <Settings className={`w-4 h-4 ${isAdminOpen ? 'animate-spin' : ''}`} />
              <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:inline">
                {isAdminOpen ? 'Close Cockpit' : 'Admin Cockpit'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#161920] border border-transparent hover:border-gray-800 transition-all cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-[#0A0A0B] border-b border-[#10B981]/10 py-4 px-4 space-y-2 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.page;
            return (
              <button
                key={link.name}
                onClick={() => handleNavigate(link.page)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-sans font-semibold text-sm text-left transition-all cursor-pointer focus:outline-none ${
                  isActive 
                    ? 'text-[#10B981] bg-[#111111] border-l-2 border-[#10B981]' 
                    : 'text-gray-300 hover:text-[#10B981] hover:bg-[#111111]/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#10B981]' : 'text-gray-500'}`} />
                <span>{link.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
