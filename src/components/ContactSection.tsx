/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ARTIST_INFO } from '../data';
import { Mail, Phone, MapPin, Calendar, Heart, ShieldCheck, MailCheck, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { addBooking, addContact, addSubscriber } = useApp();

  // Booking Form State
  const [bName, setBName] = useState('');
  const [bEmail, setBEmail] = useState('');
  const [bPhone, setBPhone] = useState('');
  const [bOrg, setBOrg] = useState('');
  const [bDate, setBDate] = useState('');
  const [bVenue, setBVenue] = useState('');
  const [bBudget, setBBudget] = useState('');
  const [bDetails, setBDetails] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // General Contact State
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cSubject, setCSubject] = useState('');
  const [cMsg, setCMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Subscriber State
  const [subEmail, setSubEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'success' | 'exists'>('idle');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking({
      name: bName,
      email: bEmail,
      phone: bPhone,
      organization: bOrg,
      eventDate: bDate,
      venue: bVenue,
      budget: bBudget,
      details: bDetails,
    });
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBName('');
      setBEmail('');
      setBPhone('');
      setBOrg('');
      setBDate('');
      setBVenue('');
      setBBudget('');
      setBDetails('');
    }, 4000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContact({
      name: cName,
      email: cEmail,
      subject: cSubject,
      message: cMsg,
    });
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setCName('');
      setCEmail('');
      setCSubject('');
      setCMsg('');
    }, 4000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;

    const success = addSubscriber(subEmail);
    if (success) {
      setSubStatus('success');
      setSubEmail('');
    } else {
      setSubStatus('exists');
    }
    setTimeout(() => setSubStatus('idle'), 4000);
  };

  return (
    <section id="bookings" className="py-24 bg-[#0A0A0B] text-white relative overflow-hidden border-b border-white/5">
      
      {/* Decorative ambient gradients */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#10B981]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Fan Subscription Newsletter Container */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-[#10B981]/10 to-transparent border border-[#10B981]/20 shadow-xl mb-24 text-center">
          <Heart className="w-8 h-8 text-[#10B981] mx-auto mb-4 animate-pulse" />
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
            Join the ShangSounds Fan Club
          </h3>
          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-lg mx-auto mb-6">
            Subscribe to our newsletter to receive early listening links, exclusive concert alerts, and official releases straight to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              required
              placeholder="Enter your email address"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              className="flex-grow px-4 py-3 rounded-xl bg-black/60 border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#0da06f] text-black font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>

          {/* Feedback states */}
          {subStatus === 'success' && (
            <p className="text-emerald-400 font-sans text-xs mt-3 flex items-center justify-center space-x-1 animate-fade-in">
              <MailCheck className="w-4 h-4" />
              <span>Subscription successful! Welcome to the family.</span>
            </p>
          )}
          {subStatus === 'exists' && (
            <p className="text-[#10B981] font-sans text-xs mt-3 animate-fade-in">
              This email is already subscribed to our list!
            </p>
          )}
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tighter uppercase mb-4">
            Bookings & <span className="text-[#10B981]">Contact</span>
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto rounded-full mb-6" />
          <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest">
            Send booking requests or general business inquiries directly to the team
          </p>
        </div>

        {/* Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Contact info & Map Representation */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-3 uppercase tracking-wide">
              Official Contact
            </h3>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#111111] rounded-xl border border-white/5 text-[#10B981] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase text-gray-500 tracking-wider block">Email Inquiries</span>
                  <a href={`mailto:${ARTIST_INFO.contact.email}`} className="font-sans font-semibold text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                    {ARTIST_INFO.contact.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#111111] rounded-xl border border-white/5 text-[#10B981] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase text-gray-500 tracking-wider block">Phone & Booking Line</span>
                  <a href={`tel:${ARTIST_INFO.contact.phone}`} className="font-sans font-semibold text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                    {ARTIST_INFO.contact.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#111111] rounded-xl border border-white/5 text-[#10B981] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase text-gray-500 tracking-wider block">Mailing & Studio Address</span>
                  <p className="font-sans text-xs text-gray-300 leading-relaxed">
                    {ARTIST_INFO.contact.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Stylised Mock Map representation of Western Province */}
            <div className="rounded-2xl border border-white/5 bg-[#111111] p-5 space-y-4">
              <span className="font-mono text-[9px] text-[#10B981] uppercase tracking-widest block">District Locator</span>
              <div className="aspect-[4/3] rounded-lg bg-black/60 border border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
                
                {/* Background design representation */}
                <div className="absolute inset-4 border border-dashed border-white/5 rounded flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-[#10B981]/10 bg-[#10B981]/2 animate-pulse" />
                </div>

                <MapPin className="w-8 h-8 text-[#10B981] mb-2 relative z-10" />
                <h4 className="font-display font-bold text-xs text-white relative z-10">SHANGOMBO DISTRICT</h4>
                <p className="font-sans text-[10px] text-gray-500 max-w-[180px] leading-relaxed mt-1 relative z-10">
                  Western Province, Zambia. Situated along the peaceful Zambezi River borders.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Booking Form Card */}
          <div className="lg:col-span-8 space-y-6 bg-[#111111] border border-white/5 p-6 sm:p-8 rounded-2xl shadow-xl">
            <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-3 uppercase tracking-wide">
              Request Booking or Collaboration
            </h3>

            {bookingSuccess ? (
              <div className="py-16 text-center flex flex-col items-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h4 className="font-display font-bold text-lg text-white">Booking Request Logged!</h4>
                <p className="font-sans text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Excellent! Your official booking details have been securely logged. We will review your event budget, scheduling dates, and input requirements. A label manager will contact you within 24 hours.
                </p>
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl max-w-xs mx-auto">
                  <p className="font-mono text-[10px] text-[#10B981] uppercase tracking-widest">
                    Tip: View or approve this request instantly inside the Admin Cockpit panel above!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase text-gray-400 mb-1.5">Your Name / Contact Person</label>
                    <input 
                      type="text" 
                      required
                      value={bName}
                      onChange={(e) => setBName(e.target.value)}
                      placeholder="e.g. Elena Phiri"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs sm:text-sm"
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase text-gray-400 mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={bEmail}
                      onChange={(e) => setBEmail(e.target.value)}
                      placeholder="e.g. elena@lusakaroots.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase text-gray-400 mb-1.5">Phone Line (with Country Code)</label>
                    <input 
                      type="text" 
                      required
                      value={bPhone}
                      onChange={(e) => setBPhone(e.target.value)}
                      placeholder="e.g. +260 97 889 4433"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs sm:text-sm"
                    />
                  </div>
                  
                  {/* Organization */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase text-gray-400 mb-1.5">Company / Promoter Organization</label>
                    <input 
                      type="text" 
                      value={bOrg}
                      onChange={(e) => setBOrg(e.target.value)}
                      placeholder="e.g. Roots & Rhythms Club"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Event Date */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase text-gray-400 mb-1.5">Desired Date</label>
                    <input 
                      type="date" 
                      required
                      value={bDate}
                      onChange={(e) => setBDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs sm:text-sm appearance-none"
                    />
                  </div>
                  
                  {/* Venue Name */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase text-gray-400 mb-1.5">Venue Name & City</label>
                    <input 
                      type="text" 
                      required
                      value={bVenue}
                      onChange={(e) => setBVenue(e.target.value)}
                      placeholder="e.g. Woodlands Arena, Lusaka"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs sm:text-sm"
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase text-gray-400 mb-1.5">Estimated Budget (K / ZMW)</label>
                    <input 
                      type="text" 
                      required
                      value={bBudget}
                      onChange={(e) => setBBudget(e.target.value)}
                      placeholder="e.g. K22,000"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label className="block font-mono text-[9px] uppercase text-gray-400 mb-1.5">Performance / Stage Details</label>
                  <textarea 
                    rows={4}
                    required
                    value={bDetails}
                    onChange={(e) => setBDetails(e.target.value)}
                    placeholder="Provide details about the event, expected crowd size, performance length, and standard technical staging setups..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs sm:text-sm leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#10B981] hover:bg-[#0da06f] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-[#10B981]/20 transition-transform hover:scale-[1.01] cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Booking Request</span>
                </button>

              </form>
            )}
          </div>

        </div>

        {/* General Contact Inquiry section directly integrated into the footer boundary or separately underneath */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-1 pt-12 mt-12 border-t border-white/5">
          <div className="bg-[#111111]/40 border border-white/5 p-6 sm:p-8 rounded-2xl shadow-lg">
            <h3 className="font-display font-bold text-base text-white mb-6 uppercase tracking-wide">
              General Fan & Media Inquiries
            </h3>

            {contactSuccess ? (
              <p className="text-emerald-400 text-sm font-sans font-semibold flex items-center space-x-2 animate-fade-in py-4 justify-center">
                <ShieldCheck className="w-5 h-5" />
                <span>Thank you! Your general message has been received.</span>
              </p>
            ) : (
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block font-mono text-[9px] uppercase text-gray-500 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={cName}
                    onChange={(e) => setCName(e.target.value)}
                    placeholder="Mwansa"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase text-gray-500 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={cEmail}
                    onChange={(e) => setCEmail(e.target.value)}
                    placeholder="mwansa@gmail.com"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase text-gray-500 mb-1">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={cSubject}
                    onChange={(e) => setCSubject(e.target.value)}
                    placeholder="Traditional Sound inquiry"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block font-mono text-[9px] uppercase text-gray-500 mb-1">Message Detail</label>
                  <textarea 
                    rows={2}
                    required
                    value={cMsg}
                    onChange={(e) => setCMsg(e.target.value)}
                    placeholder="Write your fan or press message here..."
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/5 focus:border-[#10B981]/50 focus:outline-none text-white font-sans text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="sm:col-span-3 py-2.5 rounded-xl bg-[#111111] hover:bg-[#10B981] hover:text-black border border-white/5 text-gray-300 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Send General Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
