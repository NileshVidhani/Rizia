// =====================================================
// TYPE DEFINITIONS
// These types are used throughout the application
// =====================================================

export interface Event {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  city: string;
  venue: string;
  venueAddress: string;
  date: string;
  time: string;
  price: string;
  image?: string;
  tags: string[];
  language?: string;
  ageRestriction?: string;
  features?: string[];
  latitude?: number;
  longitude?: number;
}

export interface Registration {
  id: string;
  eventId: string;
  eventName: string;
  userId: string;
  ticketCount: number;
  totalAmount: string;
  timestamp: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface Submission {
  id: string;
  competitionId: string;
  competitionName: string;
  userId: string;
  title: string;
  description: string;
  fileUrl: string;
  timestamp: string;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
}

// For backward compatibility with existing code
export type Competition = Event;

// =====================================================
// DEPRECATED FUNCTIONS - USE SUPABASE HELPERS INSTEAD
// Import from: utils/supabaseHelpers.ts
// =====================================================
// - fetchAllEvents()
// - fetchActiveEvents()
// - fetchEventById(id)
// - createEvent(eventData)
// - updateEvent(id, eventData)
// - deleteEvent(id)
// - fetchAllBookings()
// - fetchUserBookings(userId)
// - createBooking(bookingData)
// =====================================================