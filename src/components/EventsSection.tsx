/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EVENTS_DATA } from '../data';
import { Calendar, MapPin, Clock, Ticket, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Event } from '../types';

export const EventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [ticketName, setTicketName] = useState<string>('');
  const [ticketEmail, setTicketEmail] = useState<string>('');
  const [ticketSuccess, setTicketSuccess] = useState<boolean>(false);

  const filteredEvents = EVENTS_DATA.filter((event) => {
    if (activeTab === 'upcoming') return event.status === 'Upcoming';
    if (activeTab === 'completed') return event.status === 'Completed';
    return true; // 'all'
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return { day: dateStr.split('-')[2] || '15', month: 'AUG' };
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return {
      day: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear()
    };
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketEmail) return;

    // Simulate ticket request
    setTicketSuccess(true);
    setTimeout(() => {
      setTicketSuccess(false);
      setSelectedEvent(null);
      setTicketName('');
      setTicketEmail('');
      setTicketQuantity(1);
    }, 2500);
  };

  return (
    <section id="events" className="py-24 bg-[#0A0A0B] text-white relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tighter uppercase mb-4">
            Events & <span className="text-[#10B981]">Tour Dates</span>
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto rounded-full mb-6" />
          <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest">
            Catch ShangSounds live in concert, festivals, and cultural expos
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center space-x-2 mb-12">
          {['all', 'upcoming', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-2 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer border ${
                activeTab === tab
                  ? 'bg-[#10B981] text-black border-[#10B981] shadow-md shadow-[#10B981]/20'
                  : 'bg-[#111111] text-gray-400 border-white/5 hover:text-white hover:border-white/10'
              }`}
            >
              {tab} Events
            </button>
          ))}
        </div>

        {/* Events Stack */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredEvents.map((event) => {
            const dateObj = formatDate(event.date);
            const isUpcoming = event.status === 'Upcoming';

            return (
              <div 
                key={event.id}
                className={`p-5 sm:p-6 rounded-2xl bg-[#111111] border transition-all duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 hover:border-[#10B981]/30 ${
                  isUpcoming ? 'border-white/5' : 'border-white/5 opacity-75'
                }`}
              >
                {/* Left: Date Tag */}
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex flex-col items-center justify-center shrink-0">
                    <span className="font-display font-bold text-lg text-[#10B981] leading-none">{dateObj.day}</span>
                    <span className="font-mono text-[9px] text-[#10B981] font-medium tracking-widest mt-0.5 uppercase">{dateObj.month}</span>
                  </div>

                  {/* Title & Venue */}
                  <div>
                    <h3 className="font-sans font-bold text-sm sm:text-base text-white">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 font-sans text-xs text-gray-400">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>{event.venue}, {event.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle: Timing details */}
                <div className="flex items-center space-x-4 sm:ml-auto">
                  <div className="flex items-center space-x-1.5 font-mono text-[10px] sm:text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-[#10B981]/80" />
                    <span>{event.time}</span>
                  </div>
                  
                  {/* Status Indicator */}
                  <span className={`px-2.5 py-0.5 rounded-full font-sans font-bold text-[9px] uppercase tracking-wider ${
                    isUpcoming 
                      ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 animate-pulse'
                      : 'bg-gray-800 text-gray-500 border border-transparent'
                  }`}>
                    {event.status}
                  </span>
                </div>

                {/* Right: Interactive CTA */}
                <div>
                  {isUpcoming ? (
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#0da06f] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform hover:scale-102 cursor-pointer shadow-md shadow-[#10B981]/20"
                    >
                      <Ticket className="w-3.5 h-3.5 fill-black" />
                      <span>Request Ticket</span>
                    </button>
                  ) : (
                    <span className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-800/20 text-gray-500 font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 border border-transparent">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Concluded</span>
                    </span>
                  )}
                </div>

              </div>
            );
          })}

          {filteredEvents.length === 0 && (
            <div className="p-16 text-center text-gray-500 font-sans text-sm">
              No events found matching your filter category. Stay tuned for new announcements!
            </div>
          )}
        </div>

      </div>

      {/* Ticket Request Modal dialog */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#10B981]/30 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-fade-in">
            {/* Header */}
            <div className="p-5 border-b border-white/5 bg-[#0A0A0B] flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] text-[#10B981] uppercase tracking-widest block">Ticket Booking Inquiry</span>
                <h3 className="font-display font-bold text-sm sm:text-base text-white mt-1">
                  {selectedEvent.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="px-3 py-1.5 rounded-lg bg-gray-850 hover:bg-gray-800 text-white text-xs cursor-pointer hover:text-[#10B981] transition-colors"
              >
                Close
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleTicketSubmit} className="p-6 space-y-4">
              {ticketSuccess ? (
                <div className="py-8 text-center flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-white text-base">Request Submitted!</h4>
                  <p className="font-sans text-xs text-gray-400 max-w-xs mx-auto">
                    We have received your ticket booking inquiry for {selectedEvent.venue}. Our box office manager will contact you at {ticketEmail} within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-3.5 rounded-xl bg-[#0A0A0B] border border-white/5 flex items-start space-x-3.5">
                    <div className="p-2 bg-[#10B981]/10 text-[#10B981] rounded-lg shrink-0 border border-[#10B981]/20">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="font-sans text-xs text-gray-300">
                      <div><strong>Venue:</strong> {selectedEvent.venue}</div>
                      <div className="mt-0.5"><strong>Date:</strong> {selectedEvent.date} ({selectedEvent.time})</div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-gray-400 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      placeholder="e.g. Mwansa Kalunga"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-gray-400 mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={ticketEmail}
                      onChange={(e) => setTicketEmail(e.target.value)}
                      placeholder="e.g. mwansa@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-gray-400 mb-1.5">Quantity of Tickets</label>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="range" 
                        min="1"
                        max="6"
                        value={ticketQuantity}
                        onChange={(e) => setTicketQuantity(parseInt(e.target.value, 10))}
                        className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
                      />
                      <span className="font-mono text-sm font-bold text-[#10B981] min-w-[20px] text-center">
                        {ticketQuantity}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3 rounded-xl bg-[#10B981] hover:bg-[#0da06f] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg cursor-pointer shadow-[#10B981]/20"
                  >
                    <span>Request {ticketQuantity} Tickets</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
