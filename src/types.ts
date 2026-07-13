/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Track {
  id: string;
  title: string;
  album?: string;
  duration: string;
  releaseDate: string;
  audioUrl: string; // We can use royalty-free, placeholder, or synthesized frequencies
  coverUrl: string;
  genre: string;
  lyrics?: string;
  downloadsCount: number;
  isDownloadable: boolean;
}

export interface Video {
  id: string;
  title: string;
  category: 'Official MV' | 'Live Performance' | 'Behind The Scenes' | 'Lyric Video';
  duration: string;
  releaseDate: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  description: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  category: 'Live' | 'Studio' | 'Promo' | 'Shangombo';
}

export interface Event {
  id: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Sold Out' | 'Completed';
  ticketLink?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Release' | 'Tour' | 'Announcement' | 'Interview';
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  coverUrl: string;
}

export interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  eventDate: string;
  venue: string;
  budget: string;
  details: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Declined';
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface FanSubscription {
  id: string;
  email: string;
  subscribedAt: string;
}
