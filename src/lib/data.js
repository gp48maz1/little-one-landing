// Little One Landing — single source of truth for all copy & logistics.
// Edit values here; every component reads from these exports so nothing is
// hard-coded in markup.
//
// Items marked `TODO` are still placeholders awaiting real details. Search
// "TODO" to find everything that needs filling in.

/** Core event facts. Real date/time/address are kept as plain text. */
export const event = {
  babyName: 'Baby Peters',
  hosts: 'Gary Mazzone Peters & Nora Szeto Peters',
  // Display + machine-friendly dates.
  dateLong: 'Saturday, August 1, 2026',
  dateShort: 'SAT · AUG 1',
  dateNumeric: '08 · 01',
  timeStart: '1:00 PM',
  timeRange: '1:00 PM – 4:00 PM',
  // TODO: friendly venue / room name for "The Air Park" (the clubhouse, etc.).
  venueName: 'The Air Park',
  address: '1199 Shadow Ln #1093, Nashville, TN 37206',
  dressCode: 'Sunny & casual',
  // TODO: confirm the RSVP "boarding closes" deadline date.
  boardingCloses: 'TODO — RSVP deadline',
  // TODO: parking note for guests.
  parking: 'TODO — parking details',
  hashtags: ['#LittleOneLanding', '#ClearedForLanding'],
  // TODO: ground-crew contact for day-of questions.
  groundCrew: 'TODO — name · phone'
};

/** Sticky-nav anchor links. */
export const nav = [
  { href: '#details', label: 'Boarding Pass' },
  { href: '#plan', label: 'Flight Plan' },
  { href: '#security', label: 'Security' },
  { href: '#registry', label: 'Cargo' },
  { href: '#navigation', label: 'Get There' }
];

/** Hero copy. */
export const hero = {
  eyebrow: 'Cleared for landing · private airfield',
  squeeze: "We can't wait to squeeze you",
  arrivalPre: 'Baby ',
  arrivalName: 'Peters',
  arrivalPost: ' is coming in for a landing',
  cta: 'Check in for the flight ✈'
};

/** Boarding-pass block: the main ticket rows + the tear-off stub. */
export const boardingPass = {
  airline: '🛬 Little One Landing',
  class: 'BABY SHOWER · CLASS: VIP (Very Important Parents)',
  rows: [
    { k: 'Passenger', v: 'You + 1 little guest of honor' },
    { k: 'Date', v: 'Sat, Aug 1' },
    { k: 'Boarding time', v: '1:00 PM' },
    { k: 'Gate', v: 'The Air Park, Nashville' }, // TODO: venue display name
    { k: 'Flight attire', v: 'Sunny & casual' },
    { k: 'Boarding closes', v: 'TODO (RSVP)' }
  ],
  stub: {
    flight: 'LOL 001',
    date: '08 · 01',
    seat: '2B'
  }
};

/** At-a-glance departure board tiles. */
export const departureBoard = [
  { lbl: 'Flight', big: 'LOL 001' },
  { lbl: 'Departs', big: '1:00 PM' },
  { lbl: 'Gate', big: 'AIR PARK' },
  { lbl: 'Weather', big: '☀ SUNNY' }
];

/** Today's flight plan — itinerary stops within the 1–4 PM window. */
export const flightPlan = [
  {
    icon: '🛄',
    title: 'Boarding',
    time: '1:00 PM',
    blurb: 'Arrive, grab a name tag, and mingle on the tarmac.'
  },
  {
    icon: '🥪',
    title: 'Taxi to the runway',
    time: '1:20 PM',
    blurb: 'Nibbles, sips, and the fresh-squeezed lemonade stand opens.'
  },
  {
    icon: '🎈',
    title: 'Take-off',
    time: '1:45 PM',
    blurb: 'A few easy games — no flight experience required.'
  },
  {
    icon: '🍰',
    title: 'Cruising altitude',
    time: '2:30 PM',
    blurb: 'Food, cake, and a toast to the little one.'
  },
  {
    icon: '🎁',
    title: 'Descent',
    time: '3:15 PM',
    blurb: 'Gifts, gratitude, and a soft landing home.'
  }
];

/** Finn — Head of K-9 Security. */
export const finn = {
  org: 'Little One Landing · K-9 Unit',
  badgeTitle: 'SECURITY CLEARANCE',
  name: 'Finn',
  role: 'Head of Security · K-9 Unit',
  photo: '/finn.png',
  intro:
    'All flights are secured by our Head of K-9 Security. Please have treats ready for inspection.',
  rows: [
    { k: 'Clearance', v: 'Very Good Boy (Lvl 11)' },
    { k: 'Specialty', v: 'Treat detection · greeting' },
    { k: 'Status', v: 'On duty (mostly napping)' }
  ],
  bio:
    'Finn personally screens every guest for belly rubs and inspects all snacks for quality. ' +
    "He's not TSA — he's Tail-wagging Security Assistance. Gentle reminder from the boss: " +
    'please latch the gate behind you. 🐾'
};

/** Registry "luggage tags". TODO: swap in real registries + links. */
export const registries = [
  { label: 'Pottery Barn Kids', url: '#' }, // TODO: real URL
  { label: 'Babylist', url: '#' }, // TODO: real URL
  { label: 'Amazon', url: '#' } // TODO: real URL
];

/** The single lemonade moment. */
export const refreshments = {
  squeeze: "we can't wait to squeeze you",
  body:
    'Cool off at the runway lemonade stand — fresh-squeezed all afternoon. ' +
    'When life gives you a little one… you squeeze the day. 🍋'
};

/** Navigation / ground-control info rows. */
export const navigation = [
  { k: 'Airfield', v: 'The Air Park' }, // TODO: venue display name
  { k: 'Address', v: '1199 Shadow Ln #1093, Nashville, TN 37206' },
  { k: 'Parking', v: 'TODO — parking details' },
  { k: 'Ground crew', v: 'TODO — name · phone' }
];

/** RSVP form option lists. */
export const ATTENDING_VALUES = /** @type {const} */ (['yes', 'no']);
export const attendingOptions = [
  { value: 'yes', label: 'Cleared for takeoff ✈' },
  { value: 'no', label: 'Grounded this time' }
];

export const PARTY_SIZE_VALUES = /** @type {const} */ (['1', '2', '3', '4+']);

/** Footer copy. */
export const footer = {
  squeeze: 'see you on the runway',
  hosts: 'With love, Gary & Nora',
  hashLine: '#LittleOneLanding · #ClearedForLanding',
  badge: 'Secured by Finn · K-9 Unit'
};
