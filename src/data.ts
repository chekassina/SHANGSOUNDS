/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Track, Video, Photo, Event, BlogPost } from './types';

export const ARTIST_INFO = {
  name: 'ShangSounds',
  tagline: 'Sound is our Passion',
  location: 'Shangombo, Western Province, Zambia',
  founded: '2023',
  mission: 'To produce inspiring, high-quality music and empower creative talent.',
  vision: 'To become one of Zambia\'s leading independent music and entertainment brands, recognized locally and internationally for excellence and originality.',
  biography: `ShangSounds is a Zambia-based music and entertainment brand committed to delivering high-quality music, creative content, and memorable entertainment experiences. Founded with a passion for creativity and artistic excellence, ShangSounds supports original music production while connecting with audiences through authentic storytelling and modern sound.

Based in Shangombo, Western Province, ShangSounds aims to promote local talent and showcase Zambian culture to audiences across the country and beyond. The brand is dedicated to professionalism, innovation, and consistency, building a strong presence in the music industry through digital platforms, collaborations, and live performances.

At ShangSounds, the mission is to inspire, entertain, and create music that resonates with people from all walks of life while contributing to the continued growth of Zambia's creative industry.`,
  socials: {
    spotify: 'https://spotify.com',
    appleMusic: 'https://music.apple.com',
    youtube: 'https://youtube.com',
    audiomack: 'https://audiomack.com',
    soundcloud: 'https://soundcloud.com',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    tiktok: 'https://tiktok.com',
  },
  contact: {
    email: 'bookings@shangsounds.com',
    phone: '+260 97 123 4567',
    address: 'Plot 45, Kanyonyo Area, Shangombo District, Western Province, Zambia',
  },
  stats: [
    { label: 'Original Releases', value: '18+' },
    { label: 'Local Events Supported', value: '45+' },
    { label: 'Total Plays & Streams', value: '2.5M+' },
    { label: 'Active Subscriptions', value: '10K+' },
  ],
};

export const TRACKS_DATA: Track[] = [
  {
    id: 'track-1',
    title: 'Shangombo Sunset',
    album: 'Western Gold EP',
    duration: '3:45',
    releaseDate: '2025-11-20',
    audioUrl: 'synth:sunset', // special identifier for our Web Audio synth
    coverUrl: '/public/images/lap5.jpg',
    genre: 'Afro-fusion',
    isDownloadable: true,
    downloadsCount: 1420,
    lyrics: `[Intro]
Yeah, yeah, ShangSounds...
Sound is our passion
From Shangombo to the world, listen...

[Verse 1]
The sun goes down on the Zambezi bank
Golden light, a peaceful mind to thank
We sing the songs of our fathers' land
Holding onto tomorrow with our own hands
Oh from Kanyonyo, down to the border side
We carry our culture with a heart of pride

[Chorus]
Oh, Shangombo sunset, shining so bright
Glow on our water, guide us through the night
Let the music rise, let the rhythm flow
This is our home, the place we love and know
(Ahee, ahee, Zambian sound!)

[Verse 2]
The Kalindula bass is sounding sweet
Making everybody jump upon their feet
We mix the old and the brand new sound
Spreading love and harmony all around
No matter where you go, never lose your way
The sunset of Shangombo will light your day...

[Chorus]
Oh, Shangombo sunset, shining so bright
Glow on our water, guide us through the night
Let the music rise, let the rhythm flow
This is our home, the place we love and know

[Outro]
Sunset... Zambezi...
ShangSounds! We are one...
(Fade out on golden waves)`
  },
  {
    id: 'track-2',
    title: 'Zambezi Flow',
    album: 'Western Gold EP',
    duration: '3:12',
    releaseDate: '2025-12-05',
    audioUrl: 'synth:flow',
    coverUrl: '/public/images/lap1.jpg',
    genre: 'Zed-Beats',
    isDownloadable: true,
    downloadsCount: 2310,
    lyrics: `[Intro]
Are you ready?
Let it flow, let it flow!
ShangSounds in the building!

[Verse 1]
Like the river winding through the plains of green
Strongest current that you have ever seen
Our music moves, it never stays in place
Bringing a smile to every single face
From Mongu to Livingstone, feel the vibration
Unifying the entire nation

[Chorus]
Flowing like the Zambezi, running deep and wide
Nothing can stop the rhythm swelling inside
Zambezi flow, let the drums talk loud
Zambezi flow, make the elders proud
Yeah, we flow, yeah we flow!

[Verse 2]
Hear the beat, feel the heat of the fire glow
Modern sound with a traditional soul
We elevate, we create, we inspire the youth
Speaking our minds, spreading nothing but the truth
Join the movement, let the bass drum knock
From the morning sun 'til six o'clock!

[Chorus]
Flowing like the Zambezi, running deep and wide
Nothing can stop the rhythm swelling inside
Zambezi flow, let the drums talk loud
Zambezi flow, make the elders proud

[Outro]
Keep on flowing...
Shangombo pride...
ShangSounds.`
  },
  {
    id: 'track-3',
    title: 'Sounds of Western Province',
    album: 'Traditional Vibes Vol. 1',
    duration: '4:20',
    releaseDate: '2026-02-14',
    audioUrl: 'synth:traditional',
    coverUrl: '/public/images/lap4.jpg',
    genre: 'Kalindula-fusion',
    isDownloadable: false,
    downloadsCount: 0,
    lyrics: `[Instrumental Intro - Acoustic Guitar and Shaker]

[Verse 1]
Under the canopy of the grand Acacia trees
The voices carry on the gentle evening breeze
Singing of Kuomboka, the water rising high
The drums of the Litunga echoing in the sky
This is the rhythm of the soil, the heartbeat of the land
Passed down from hand to hand, we understand

[Chorus]
These are the sounds of Western Province, deep and true
Bringing the classic kalindula back to life for you
Clap your hands, let the shaker play
We celebrate our heritage today!
Oh oh, feel the drum beat, feel the spirit rise!

[Verse 2]
Our acoustic strings tell a story of the past
Of love and hope and peace that is built to last
We blend the nylon strings with the electronic bass
To give our ancient culture a brand new modern space
Smile for the future, honor what has been
The most beautiful sound you have ever seen!

[Chorus]
These are the sounds of Western Province, deep and true
Bringing the classic kalindula back to life for you
Clap your hands, let the shaker play
We celebrate our heritage today!

[Outro]
Traditional meets the modern...
ShangSounds style.
(Guitar fading out dynamically)`
  },
  {
    id: 'track-4',
    title: 'Echoes in the Night',
    album: 'Single',
    duration: '3:30',
    releaseDate: '2026-04-30',
    audioUrl: 'synth:echoes',
    coverUrl: '/public/images/lap2.jpg',
    genre: 'Afro-pop',
    isDownloadable: true,
    downloadsCount: 1850,
    lyrics: `[Intro]
ShangSounds... Echoes in the night...
Can you hear it?
Oh, baby...

[Verse 1]
When the shadows fall and the world is asleep
I hear a voice in the silence so deep
Calling my name from across the dividing line
Telling me everything is gonna be just fine
It\'s the melody of love, it\'s the melody of hope
Giving me the strength and the power to cope

[Chorus]
Echoes in the night, singing sweet and clear
Chasing away every single shadow of fear
Echoes in the night, a beautiful sound
Lifting my feet right off the cold ground
Oh, hear the echo... hear it play!

[Verse 2]
We dance in the dark 'til the morning sun appears
Forgetting our troubles, washing away our tears
The beat is our guide and the melody\'s our friend
A beautiful circle that never has to end
From Shangombo, we send it out to you
A message of light, warm and always true

[Chorus]
Echoes in the night, singing sweet and clear
Chasing away every single shadow of fear
Echoes in the night, a beautiful sound
Lifting my feet right off the cold ground

[Outro]
Can you hear the echo?
(Echo... echo... echo...)
ShangSounds.`
  },
  {
    id: 'track-5',
    title: 'Artistic Excellence',
    album: 'Single',
    duration: '2:58',
    releaseDate: '2026-06-18',
    audioUrl: 'synth:excellence',
    coverUrl: '/public/images/lap3.jpg',
    genre: 'Zed-Hiphop',
    isDownloadable: true,
    downloadsCount: 940,
    lyrics: `[Intro]
Ayo! ShangSounds!
Consistency. Innovation. Professionalism.
We set the bar. Check the flow.

[Verse 1]
We started in the West, now we heading for the crest
Putting all our dedication, putting it to the test
Original production, no copy-paste here
We building up the talent, making everything clear
From the studio console to the stage performance light
Every single detail, we got to get it right
Excellence is not an act, it is a daily habit
When the opportunity comes, we always reach and grab it!

[Chorus]
This is artistic excellence, the standard that we hold
Turning local stories into pure musical gold
We represent the culture, we innovate the game
ShangSounds is the brand, remember the name!

[Verse 2]
Collaborating, elevating, creating a new way
Supporting every artist, every single day
We show the world what Shangombo has in store
Open up the portal, open up the golden door
No shortcut to greatness, we do it with respect
Professional sound that you always can expect!

[Chorus]
This is artistic excellence, the standard that we hold
Turning local stories into pure musical gold
We represent the culture, we innovate the game
ShangSounds is the brand, remember the name!

[Outro]
Sound is our passion.
Excellence is our path.
ShangSounds!
Out.`
  }
];

export const VIDEOS_DATA: Video[] = [
  {
    id: 'vid-1',
    title: 'Shangombo Sunset (Official Music Video)',
    category: 'Official MV',
    duration: '3:50',
    releaseDate: '2025-11-28',
    thumbnailUrl: '/public/images/lap5.jpg',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder embed
    description: 'Filmed on location along the majestic Zambezi River banks in Shangombo. Capturing the breathtaking golden hour sunset, traditional dances blended with modern choreography, and the authentic spirit of Western Province.',
  },
  {
    id: 'vid-2',
    title: 'Zambezi Flow - Live at Lusaka Music Festival',
    category: 'Live Performance',
    duration: '4:15',
    releaseDate: '2025-12-15',
    thumbnailUrl: '/public/images/lap2.jpg',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Watch the energetic live performance of "Zambezi Flow" in front of over 10,000 screaming fans. Authentic Zambian energy, roaring brass sections, and highly syncopated rhythms that got the whole crowd moving.',
  },
  {
    id: 'vid-3',
    title: 'Behind the Beat: Recording Traditional Vibes Vol. 1',
    category: 'Behind The Scenes',
    duration: '8:40',
    releaseDate: '2026-02-20',
    thumbnailUrl: '/public/images/lap4.jpg',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Take an exclusive look inside the recording studio as the team merges authentic local acoustic instrumentation, hand drum patterns, and historic story-telling with high-end modern electronic production.',
  },
  {
    id: 'vid-4',
    title: 'Echoes in the Night (Official Lyric Video)',
    category: 'Lyric Video',
    duration: '3:32',
    releaseDate: '2026-05-02',
    thumbnailUrl: '/public/images/lap1.jpg',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Official lyric video for "Echoes in the Night", featuring stunning kinetic typography overlays and dark, ambient, cosmic visuals from Western Province landscapes.',
  }
];

export const PHOTOS_DATA: Photo[] = [
  {
    id: 'photo-1',
    url: '/public/images/lap1.jpg',
    caption: 'Vocal recording session at ShangSounds primary studio, focusing on pristine vocal delivery and top-tier engineering.',
    category: 'Studio',
  },
  {
    id: 'photo-2',
    url: '/public/images/lap2.jpg',
    caption: 'Dynamic stage performance under stunning golden lights at the Western Province Annual Cultural Fest.',
    category: 'Live',
  },
  {
    id: 'photo-3',
    url: '/public/images/lap3.jpg',
    caption: 'Official promotional shoot representing the core artistic team of ShangSounds.',
    category: 'Promo',
  },
  {
    id: 'photo-4',
    url: '/public/images/lap4.jpg',
    caption: 'Behind-the-scenes collab with local instrumentalists, capturing authentic Kalindula guitar patterns.',
    category: 'Studio',
  },
  {
    id: 'photo-5',
    url: '/public/images/lap5.jpg',
    caption: 'Inspirational sunset along the scenic banks of the Zambezi River in Shangombo, the root of our sound.',
    category: 'Shangombo',
  }
];

export const EVENTS_DATA: Event[] = [
  {
    id: 'event-1',
    title: 'Shangombo Cultural Sound Fest',
    venue: 'Shangombo Arena',
    location: 'Shangombo, Western Province',
    date: '2026-08-15',
    time: '14:00 - 23:00',
    status: 'Upcoming',
  },
  {
    id: 'event-2',
    title: 'Western Province Music Expo',
    venue: 'Mongu Sports Stadium',
    location: 'Mongu, Western Province',
    date: '2026-09-05',
    time: '12:00 - 22:00',
    status: 'Upcoming',
  },
  {
    id: 'event-3',
    title: 'Lusaka Afro-Fusion Night',
    venue: 'Woodlands Club Arena',
    location: 'Lusaka, Zambia',
    date: '2026-10-12',
    time: '19:00 - 02:00',
    status: 'Upcoming',
  },
  {
    id: 'event-4',
    title: 'ShangSounds Live Showcase',
    venue: 'The Pavilion Theatre',
    location: 'Lusaka, Zambia',
    date: '2026-05-18',
    time: '20:00 - 23:00',
    status: 'Completed',
  }
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'ShangSounds Announces Debut Album "Western Gold"',
    category: 'Release',
    excerpt: 'The brand is releasing a 12-track project detailing the rich culture of Western Province, blending traditional kalindula with modern Afro-beats.',
    content: `We are thrilled to officially announce our upcoming debut studio album, **"Western Gold"**, scheduled for release in late 2026! 

This album represents the culmination of two years of intensive research, recording, and creative exploration. Our engineering team, alongside senior cultural musicians in Shangombo, has recorded authentic local instruments, drums, and folk melodies that have never been captured in high-fidelity digital audio before.

"Western Gold is more than just an album; it's a bridge between our beautiful ancestry in the Western Province and the contemporary sound waves sweeping across Africa," says our lead producer.

### What to Expect:
*   **12 Original Tracks** spanning Afro-fusion, Kalindula-fusion, and modern Zed-Beats.
*   **Collaborations** with both established national artists and discovered local youths from Shangombo.
*   **Pristine Production** engineered to meet global standards while retaining the raw, warm, acoustic soul of Zambian storytelling.

Stay tuned for our first lead single dropping next month. Subscription members will receive early listening links 48 hours before official launch!`,
    date: '2026-07-10',
    readTime: '4 min read',
    coverUrl: '/public/images/lap1.jpg',
  },
  {
    id: 'blog-2',
    title: 'The Journey from Shangombo to the World',
    category: 'Interview',
    excerpt: 'An inside look at the origins of ShangSounds, our dedication to professionalism, and how we aim to redefine Zambia\'s independent music scene.',
    content: `Shangombo, located in the far west of Zambia along the border of Angola, is a place rich in untamed beauty, storytelling, and musical rhythm. Historically, artists in these remote areas struggled to gain access to professional recording equipment, branding expertise, and distribution networks.

That is where **ShangSounds** was born. 

Founded with a vision to provide a world-class platform for local talent, the brand has invested heavily in mobile high-end recording gear, solar-powered systems to handle power grid fluctuations, and digital marketing training for young talents.

"We don't believe in regional limitations," says our managing director. "Quality is universal. If a track is written with heart, performed with precision, and mixed to professional standards, it can succeed in Lusaka, Lagos, London, or Los Angeles. We are proof that greatness can emerge from any corner when backed by professionalism and consistency."

In this blog post, we look at how the brand was built, the logistical challenges of operating a high-end music label in Shangombo, and why our commitment to artistic excellence remains absolute.`,
    date: '2026-06-22',
    readTime: '6 min read',
    coverUrl: '/public/images/lap5.jpg',
  },
  {
    id: 'blog-3',
    title: 'Empowering local youths through Music Workshops',
    category: 'Announcement',
    excerpt: 'ShangSounds launches our annual Creative Arts Youth Program, teaching professional songwriting, instrument play, and digital music distribution.',
    content: `As part of our core mission to empower creative talent, ShangSounds is proud to launch the **Creative Arts Youth Program (CAYP) 2026** in Shangombo.

Starting this August, the program will provide free, hands-on workshops for 30 talented teenagers and young adults from across the district.

### Key Learning Tracks:
1.  **Instrument Mastery**: Training on traditional drums, kalindula bass guitar, and modern keyboard controllers.
2.  **Vocal Control & Songwriting**: Professional vocal exercises, lyric composition, and structuring songs for commercial radio and streaming.
3.  **Modern Audio Software (DAW)**: Hands-on tutorials on digital editing, mixing, and understanding sound waves.
4.  **The Music Business**: Introduction to royalties, copyright law, social media distribution, and brand packaging.

"We aren't just creating musicians; we are training the future producers, executives, and audio engineers of Zambia," says our community relations leader. "This is our contribution to the growth of Zambia's creative economy."

The program is fully sponsored by ShangSounds and our local partners. Applications close on July 31st. Promote talent, spread the word!`,
    date: '2026-07-02',
    readTime: '3 min read',
    coverUrl: '/public/images/lap4.jpg',
  }
];
