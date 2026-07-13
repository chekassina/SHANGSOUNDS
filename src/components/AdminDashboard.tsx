/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Mail, Phone, Calendar, Trash2, ShieldCheck, XCircle, CheckCircle2, UserCheck, Shield } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    contacts,
    subscribers,
    deleteBooking,
    deleteContact,
    deleteSubscriber,
    isAdminOpen,
    setIsAdminOpen,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'contacts' | 'subscribers'>('bookings');

  // Local state for approval override simulation
  const [localBookings, setLocalBookings] = useState<Record<string, 'Approved' | 'Declined'>>({});

  if (!isAdminOpen) return null;

  const handleApprove = (id: string) => {
    setLocalBookings(prev => ({ ...prev, [id]: 'Approved' }));
  };

  const handleDecline = (id: string) => {
    setLocalBookings(prev => ({ ...prev, [id]: 'Declined' }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A0A0B] border border-[#10B981]/40 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in">
        
        {/* Header */}
        <div className="p-5 border-b border-[#10B981]/20 bg-[#111111] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#10B981]/10 text-[#10B981] rounded-lg border border-[#10B981]/20 animate-pulse">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg">ShangSounds Admin Cockpit</h3>
              <p className="font-sans text-xs text-[#10B981]">Simulated Content Management System (Local State)</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAdminOpen(false)}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-semibold cursor-pointer transition-colors border border-white/5"
          >
            Exit Cockpit
          </button>
        </div>

        {/* Dashboard Stat summary cards */}
        <div className="p-6 bg-black/20 border-b border-white/5 grid grid-cols-3 gap-4 shrink-0">
          {/* Bookings Stat */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#111111]/60 border border-white/5 text-center">
            <div className="font-display font-bold text-white text-xl sm:text-2xl">{bookings.length}</div>
            <div className="font-sans text-[10px] text-gray-400 uppercase tracking-wider">Bookings Requests</div>
          </div>
          {/* Contacts Stat */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#111111]/60 border border-white/5 text-center">
            <div className="font-display font-bold text-white text-xl sm:text-2xl">{contacts.length}</div>
            <div className="font-sans text-[10px] text-gray-400 uppercase tracking-wider">Fan Inquiries</div>
          </div>
          {/* Subscribers Stat */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#111111]/60 border border-white/5 text-center">
            <div className="font-display font-bold text-white text-xl sm:text-2xl">{subscribers.length}</div>
            <div className="font-sans text-[10px] text-gray-400 uppercase tracking-wider">Subscribers</div>
          </div>
        </div>

        {/* Sub-Tabs Selector */}
        <div className="px-6 pt-4 border-b border-white/5 bg-[#111111]/30 flex space-x-4 shrink-0">
          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`pb-3 font-sans font-bold text-xs sm:text-sm uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
              activeSubTab === 'bookings'
                ? 'text-[#10B981] border-[#10B981]'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            Booking Orders
          </button>
          <button
            onClick={() => setActiveSubTab('contacts')}
            className={`pb-3 font-sans font-bold text-xs sm:text-sm uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
              activeSubTab === 'contacts'
                ? 'text-[#10B981] border-[#10B981]'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            General Mail
          </button>
          <button
            onClick={() => setActiveSubTab('subscribers')}
            className={`pb-3 font-sans font-bold text-xs sm:text-sm uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
              activeSubTab === 'subscribers'
                ? 'text-[#10B981] border-[#10B981]'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            Fan Base List
          </button>
        </div>

        {/* Tab Content Display Area */}
        <div className="p-6 overflow-y-auto flex-grow bg-black/10">
          
          {/* 1. BOOKINGS REQUESTS TAB */}
          {activeSubTab === 'bookings' && (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const statusOverride = localBookings[booking.id] || booking.status;
                return (
                  <div key={booking.id} className="p-4 rounded-xl bg-[#111111] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3 mb-3">
                      <div>
                        <h4 className="font-sans font-bold text-white text-sm">{booking.name}</h4>
                        <p className="font-sans text-[11px] text-[#10B981]">{booking.organization || 'Independent Organizer'}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* Status Label */}
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          statusOverride === 'Approved' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : statusOverride === 'Declined'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-[#10B981]/20 text-[#10B981]'
                        }`}>
                          {statusOverride}
                        </span>

                        {/* Status Change Buttons */}
                        {statusOverride === 'Pending' && (
                          <div className="flex items-center space-x-1 ml-2">
                            <button 
                              onClick={() => handleApprove(booking.id)}
                              className="p-1 rounded bg-emerald-500 hover:bg-emerald-600 text-black cursor-pointer"
                              title="Approve Booking"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDecline(booking.id)}
                              className="p-1 rounded bg-rose-500 hover:bg-rose-600 text-black cursor-pointer"
                              title="Decline Booking"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {/* Delete Booking Button */}
                        <button 
                          onClick={() => deleteBooking(booking.id)}
                          className="p-1.5 rounded text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer transition-colors ml-2"
                          title="Delete Request"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Booking Details layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs text-gray-400 mb-3">
                      <div className="flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-500" />
                        <span>{booking.email}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-500" />
                        <span>{booking.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        <span>Date: {booking.eventDate} (Est: {booking.budget})</span>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-black/40 border border-white/5">
                      <p className="font-sans text-xs text-gray-300 leading-relaxed">
                        <strong>Event details:</strong> {booking.details}
                      </p>
                    </div>
                    
                    <span className="font-mono text-[9px] text-gray-600 mt-2 block text-right">
                      Logged: {booking.submittedAt}
                    </span>
                  </div>
                );
              })}

              {bookings.length === 0 && (
                <div className="p-12 text-center text-gray-500 font-sans text-sm">
                  No booking requests submitted yet.
                </div>
              )}
            </div>
          )}

          {/* 2. GENERAL FAN MAIL INQUIRIES */}
          {activeSubTab === 'contacts' && (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-4 rounded-xl bg-[#111111] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-2.5">
                    <div>
                      <h4 className="font-sans font-bold text-white text-sm">{contact.name}</h4>
                      <p className="font-sans text-[11px] text-gray-500">{contact.email}</p>
                    </div>
                    
                    <button 
                      onClick={() => deleteContact(contact.id)}
                      className="p-1.5 rounded text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer transition-colors"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="font-sans text-xs text-[#10B981] font-bold mb-1.5">
                    Subject: {contact.subject}
                  </p>

                  <div className="p-3 rounded bg-black/40 border border-white/5 font-sans text-xs text-gray-300 leading-relaxed">
                    {contact.message}
                  </div>

                  <span className="font-mono text-[9px] text-gray-600 mt-2 block text-right">
                    Inquiry Date: {contact.submittedAt}
                  </span>
                </div>
              ))}

              {contacts.length === 0 && (
                <div className="p-12 text-center text-gray-500 font-sans text-sm">
                  No general inquiry logs logged yet.
                </div>
              )}
            </div>
          )}

          {/* 3. FANBASE SUBSCRIBER LIST */}
          {activeSubTab === 'subscribers' && (
            <div className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden shadow">
              <div className="p-3 border-b border-white/5 bg-black/30 font-mono text-[10px] text-gray-400 uppercase tracking-widest flex items-center justify-between">
                <span>Active Fan Subscriber Base</span>
                <span>{subscribers.length} Emails</span>
              </div>
              <div className="divide-y divide-white/5">
                {subscribers.map((sub, index) => (
                  <div key={sub.id} className="p-3 flex items-center justify-between hover:bg-white/2 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-[#10B981]/10 text-[#10B981] text-[10px] font-mono flex items-center justify-center border border-[#10B981]/20 shrink-0">
                        {index + 1}
                      </div>
                      <div className="font-sans text-xs sm:text-sm text-gray-200">{sub.email}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-[10px] text-gray-500">Subbed: {sub.subscribedAt}</span>
                      <button 
                        onClick={() => deleteSubscriber(sub.id)}
                        className="p-1 rounded text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                        title="Unsubscribe Fan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {subscribers.length === 0 && (
                  <div className="p-12 text-center text-gray-500 font-sans text-sm">
                    Fan subscriber base is empty. Promote your newsletter sign up!
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0A0A0B] border-t border-white/5 flex items-center justify-center shrink-0">
          <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider">
            All database state synchronized to LocalStorage. Changes persist on browser refresh.
          </span>
        </div>

      </div>
    </div>
  );
};
