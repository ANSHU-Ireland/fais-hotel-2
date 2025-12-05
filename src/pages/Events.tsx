import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  image_url: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .gte('event_date', new Date().toISOString().split('T')[0])
      .order('event_date');

    if (data) {
      setEvents(data);
    }
    setLoading(false);
  };

  const sampleEvents = [
    {
      id: '1',
      title: 'Wine Tasting Evening',
      description: 'Join us for an exclusive evening of wine tasting featuring premium Irish and European wines. Our sommelier will guide you through a selection of carefully chosen wines paired with artisan cheeses and canapés.',
      event_date: '2025-12-15',
      event_time: '19:00',
      image_url: 'https://images.pexels.com/photos/1306815/pexels-photo-1306815.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      title: 'Christmas Gala Dinner',
      description: 'Celebrate the festive season with a special five-course tasting menu. Live music, elegant decorations, and an unforgettable dining experience await you and your loved ones.',
      event_date: '2025-12-20',
      event_time: '18:30',
      image_url: 'https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      title: 'New Year\'s Eve Celebration',
      description: 'Ring in the new year with style! Enjoy a spectacular seven-course menu, champagne reception, and live entertainment. Limited seating available.',
      event_date: '2025-12-31',
      event_time: '20:00',
      image_url: 'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '4',
      title: 'Valentine\'s Day Special',
      description: 'A romantic evening for two featuring an intimate four-course menu designed by our executive chef. Complimentary champagne and live acoustic music create the perfect atmosphere.',
      event_date: '2026-02-14',
      event_time: '19:30',
      image_url: 'https://images.pexels.com/photos/1395323/pexels-photo-1395323.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const displayEvents = events.length > 0 ? events : sampleEvents;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in">Special Events</h1>
          <p className="text-2xl animate-fade-in-delay">Memorable occasions at Pulari Restaurant</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : displayEvents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No upcoming events at the moment.</p>
            <p className="text-gray-500 mt-4">Check back soon for exciting new events!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {displayEvents.map((event, index) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="relative h-80 md:h-full overflow-hidden group">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">{event.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="text-amber-600 mr-3" size={20} />
                        <span className="font-semibold">{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="text-amber-600 mr-3" size={20} />
                        <span className="font-semibold">{event.event_time}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPin className="text-amber-600 mr-3" size={20} />
                        <span className="font-semibold">Pulari Restaurant, Dublin City Centre</span>
                      </div>
                    </div>

                    <button className="bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 w-full md:w-auto">
                      Book Your Spot
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-fade-in">Private Events</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Looking to host a private event? Pulari Restaurant offers exclusive venue hire for
            corporate events, weddings, birthday celebrations, and more. Our dedicated events team
            will work with you to create a bespoke menu and ensure every detail is perfect.
          </p>
          <button className="bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300">
            Enquire About Private Events
          </button>
        </div>
      </section>
    </div>
  );
}
