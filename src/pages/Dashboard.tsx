import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CompetitionCard } from '../components/CompetitionCard';
import { supabase } from '../utils/supabaseClient';
import { Calendar, FileText, Trophy, Settings, TrendingUp, Clock } from 'lucide-react';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch active events
      if (supabase) {
        const { data: eventsData } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (eventsData) setEvents(eventsData);

        // Fetch user's bookings
        const { data: bookingsData } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('booking_date', { ascending: false });

        if (bookingsData) setBookings(bookingsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const registeredEventIds = bookings.map(b => b.event_id);
  const registeredEvents = events.filter(e => registeredEventIds.includes(e.id));
  const availableEvents = events.filter(e => !registeredEventIds.includes(e.id)).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} onLogout={onLogout} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl">
            <h1 className="text-white mb-2">Welcome back, {user.name}!</h1>
            <p className="text-gray-200">
              Here's an overview of your events and bookings
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-xl border border-pink-500/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg">
                  <Trophy className="text-white" size={24} />
                </div>
              </div>
              <div className="text-3xl text-white mb-1">{events.length}</div>
              <div className="text-sm text-gray-200">Available Events</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl shadow-lg">
                  <FileText className="text-white" size={24} />
                </div>
              </div>
              <div className="text-3xl text-white mb-1">{bookings.length}</div>
              <div className="text-sm text-gray-200">My Bookings</div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl shadow-lg">
                  <Calendar className="text-white" size={24} />
                </div>
              </div>
              <div className="text-3xl text-white mb-1">{registeredEvents.length}</div>
              <div className="text-sm text-gray-200">Registered</div>
            </div>

            <Link 
              to="/account-settings" 
              className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-lg">
                  <Settings className="text-white" size={24} />
                </div>
              </div>
              <div className="text-3xl text-white mb-1">Settings</div>
              <div className="text-sm text-gray-200">Manage Account</div>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              to="/competitions"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl">
                  <Trophy className="text-white" size={20} />
                </div>
                <h3 className="text-white">View Events</h3>
              </div>
              <p className="text-gray-200 text-sm">Browse all available events</p>
            </Link>

            <Link
              to="/my-submissions"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl">
                  <FileText className="text-white" size={20} />
                </div>
                <h3 className="text-white">My Bookings</h3>
              </div>
              <p className="text-gray-200 text-sm">View and manage your bookings</p>
            </Link>

            <Link
              to="/account-settings"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl">
                  <Settings className="text-white" size={20} />
                </div>
                <h3 className="text-white">Account Settings</h3>
              </div>
              <p className="text-gray-200 text-sm">Update your profile information</p>
            </Link>
          </div>

          {/* Registered Events */}
          {registeredEvents.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h2 className="text-white text-2xl">Your Registered Events</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {registeredEvents.map((event) => (
                  <div key={event.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                    {event.image_url && (
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-2xl mb-4"
                      />
                    )}
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full mb-3">
                      {event.category}
                    </div>
                    <h3 className="text-white mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{event.event_date}</span>
                      <span className="text-pink-400 font-semibold">{event.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Events */}
          {availableEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl">
                  <Clock className="text-white" size={24} />
                </div>
                <h2 className="text-white text-2xl">Available Events</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableEvents.map((event) => (
                  <Link 
                    key={event.id} 
                    to={`/competition/${event.id}`}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  >
                    {event.image_url && (
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-2xl mb-4"
                      />
                    )}
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full mb-3">
                      {event.category}
                    </div>
                    <h3 className="text-white mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{event.event_date}</span>
                      <span className="text-pink-400 font-semibold">{event.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-white text-lg">Loading your dashboard...</div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}