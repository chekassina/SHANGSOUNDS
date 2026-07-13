/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Track, BookingRequest, ContactInquiry, FanSubscription } from '../types';
import { TRACKS_DATA } from '../data';
import { audioService } from '../utils/audioEngine';

interface AppContextType {
  // Audio Player State
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setPlayerVolume: (vol: number) => void;
  frequencies: number[];
  
  // Simulated Backend Storage
  bookings: BookingRequest[];
  contacts: ContactInquiry[];
  subscribers: FanSubscription[];
  addBooking: (booking: Omit<BookingRequest, 'id' | 'submittedAt' | 'status'>) => void;
  addContact: (contact: Omit<ContactInquiry, 'id' | 'submittedAt'>) => void;
  addSubscriber: (email: string) => boolean;
  deleteBooking: (id: string) => void;
  deleteContact: (id: string) => void;
  deleteSubscriber: (id: string) => void;
  
  // Admin Panel
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Client-Side Navigation
  activePage: string;
  setActivePage: (page: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState<Track | null>(TRACKS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [frequencies, setFrequencies] = useState<number[]>(Array(16).fill(2));
  
  // Admin Panel State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Client-Side Page State
  const [activePage, setActivePage] = useState('home');

  // Simulated DB State
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [subscribers, setSubscribers] = useState<FanSubscription[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('shangsounds_bookings');
    const savedContacts = localStorage.getItem('shangsounds_contacts');
    const savedSubscribers = localStorage.getItem('shangsounds_subscribers');

    if (savedBookings) setBookings(JSON.parse(savedBookings));
    else {
      // Seed some demo requests
      const demoBookings: BookingRequest[] = [
        {
          id: 'b-1',
          name: 'Chanda Mwansa',
          email: 'chanda.mwansa@zambiaevents.co.zm',
          phone: '+260 96 554 3210',
          organization: 'Western Province Cultural Board',
          eventDate: '2026-08-15',
          venue: 'Shangombo Arena',
          budget: 'K15,000',
          details: 'Headline performance for the opening evening of the Shangombo Cultural Sound Fest.',
          submittedAt: new Date(Date.now() - 86400000 * 2).toLocaleString(),
          status: 'Pending',
        },
        {
          id: 'b-2',
          name: 'Elena Phiri',
          email: 'elena@lusakaroots.com',
          phone: '+260 97 889 4433',
          organization: 'Roots & Rythms Club',
          eventDate: '2026-10-12',
          venue: 'Woodlands Club Arena',
          budget: 'K22,000',
          details: 'Exclusive acoustic-fusion performance for our VIP evening.',
          submittedAt: new Date(Date.now() - 86400000 * 4).toLocaleString(),
          status: 'Approved',
        }
      ];
      setBookings(demoBookings);
      localStorage.setItem('shangsounds_bookings', JSON.stringify(demoBookings));
    }

    if (savedContacts) setContacts(JSON.parse(savedContacts));
    else {
      // Seed some demo inquiries
      const demoContacts: ContactInquiry[] = [
        {
          id: 'c-1',
          name: 'Dr. Joseph Mulenga',
          email: 'jmulenga@unza.zm',
          subject: 'Academic Collaboration / Traditional Instrument Preservation',
          message: 'Hello ShangSounds, I am a musicology researcher at UNZA. I am highly impressed by your traditional Kalindula-fusion. I would love to discuss a project on recording and archiving old instruments in Western Province.',
          submittedAt: new Date(Date.now() - 86400000).toLocaleString(),
        },
        {
          id: 'c-2',
          name: 'Mulife Situmbeko',
          email: 'mulife89@gmail.com',
          subject: 'Fan Love from Mongu!',
          message: 'Just wanted to say I love "Shangombo Sunset"! Your beats are clean and keep Zambian music alive. Please release the music videos soon!',
          submittedAt: new Date(Date.now() - 86400000 * 3).toLocaleString(),
        }
      ];
      setContacts(demoContacts);
      localStorage.setItem('shangsounds_contacts', JSON.stringify(demoContacts));
    }

    if (savedSubscribers) setSubscribers(JSON.parse(savedSubscribers));
    else {
      // Seed some demo subscribers
      const demoSubs: FanSubscription[] = [
        { id: 's-1', email: 'fan1@gmail.com', subscribedAt: new Date(Date.now() - 86400000 * 10).toLocaleDateString() },
        { id: 's-2', email: 'musiclover_zm@outlook.com', subscribedAt: new Date(Date.now() - 86400000 * 5).toLocaleDateString() },
        { id: 's-3', email: 'shangombo_proud@yahoo.com', subscribedAt: new Date(Date.now() - 86400000 * 1).toLocaleDateString() },
      ];
      setSubscribers(demoSubs);
      localStorage.setItem('shangsounds_subscribers', JSON.stringify(demoSubs));
    }
  }, []);

  // Update visual frequencies periodically when playing
  useEffect(() => {
    let intervalId: any;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setFrequencies([...audioService.frequencies]);
      }, 50);
    } else {
      setFrequencies(Array(16).fill(2));
    }
    return () => clearInterval(intervalId);
  }, [isPlaying]);

  // Audio actions
  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    audioService.play(track.id);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      audioService.pause();
      setIsPlaying(false);
    } else {
      audioService.play(currentTrack.id);
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const idx = TRACKS_DATA.findIndex(t => t.id === currentTrack.id);
    if (idx !== -1) {
      const nextIdx = (idx + 1) % TRACKS_DATA.length;
      playTrack(TRACKS_DATA[nextIdx]);
    }
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    const idx = TRACKS_DATA.findIndex(t => t.id === currentTrack.id);
    if (idx !== -1) {
      const prevIdx = (idx - 1 + TRACKS_DATA.length) % TRACKS_DATA.length;
      playTrack(TRACKS_DATA[prevIdx]);
    }
  };

  const setPlayerVolume = (vol: number) => {
    setVolume(vol);
    audioService.setVolume(vol);
  };

  // Database mutations
  const addBooking = (bookingData: Omit<BookingRequest, 'id' | 'submittedAt' | 'status'>) => {
    const newBooking: BookingRequest = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
      status: 'Pending',
    };
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('shangsounds_bookings', JSON.stringify(updated));
  };

  const addContact = (contactData: Omit<ContactInquiry, 'id' | 'submittedAt'>) => {
    const newContact: ContactInquiry = {
      ...contactData,
      id: `contact-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
    };
    const updated = [newContact, ...contacts];
    setContacts(updated);
    localStorage.setItem('shangsounds_contacts', JSON.stringify(updated));
  };

  const addSubscriber = (email: string): boolean => {
    const alreadySubbed = subscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (alreadySubbed) return false;

    const newSub: FanSubscription = {
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toLocaleDateString(),
    };
    const updated = [newSub, ...subscribers];
    setSubscribers(updated);
    localStorage.setItem('shangsounds_subscribers', JSON.stringify(updated));
    return true;
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('shangsounds_bookings', JSON.stringify(updated));
  };

  const deleteContact = (id: string) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    localStorage.setItem('shangsounds_contacts', JSON.stringify(updated));
  };

  const deleteSubscriber = (id: string) => {
    const updated = subscribers.filter(s => s.id !== id);
    setSubscribers(updated);
    localStorage.setItem('shangsounds_subscribers', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider value={{
      currentTrack,
      isPlaying,
      volume,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      setPlayerVolume,
      frequencies,
      
      bookings,
      contacts,
      subscribers,
      addBooking,
      addContact,
      addSubscriber,
      deleteBooking,
      deleteContact,
      deleteSubscriber,
      
      isAdminOpen,
      setIsAdminOpen,
      
      activePage,
      setActivePage,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
