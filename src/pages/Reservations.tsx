import { useState } from 'react';
import { Calendar, Clock, Users, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ReservationsProps {
  onNavigate: (page: string) => void;
}

export default function Reservations({ onNavigate }: ReservationsProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    party_size: 2,
    special_requests: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      onNavigate('login');
      return;
    }

    setLoading(true);
    setError('');

    const { error: insertError } = await supabase.from('reservations').insert({
      user_id: user.id,
      date: formData.date,
      time: formData.time,
      party_size: formData.party_size,
      special_requests: formData.special_requests,
      status: 'pending',
    });

    if (insertError) {
      setError('Failed to create reservation. Please try again.');
    } else {
      setSuccess(true);
      setFormData({
        date: '',
        time: '',
        party_size: 2,
        special_requests: '',
      });
      setTimeout(() => setSuccess(false), 5000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in">Reservations</h1>
          <p className="text-2xl animate-fade-in-delay">Book your table at Pulari Restaurant</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-slide-in-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Make a Reservation</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Join us for an unforgettable dining experience. Please book at least 24 hours in
              advance. For same-day reservations, please call us directly.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <Calendar className="text-amber-600 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Opening Hours</h3>
                  <p className="text-gray-600">Monday - Sunday: 12:00 PM - 11:00 PM</p>
                  <p className="text-gray-600">Kitchen closes at 10:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Users className="text-amber-600 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Group Bookings</h3>
                  <p className="text-gray-600">
                    For parties of 8 or more, please contact us directly at reservations@xyz.ie
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="text-amber-600 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Cancellation Policy</h3>
                  <p className="text-gray-600">
                    Please provide at least 24 hours notice for cancellations
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Contact Us</h3>
              <p className="text-gray-600">Phone: +353 1 234 5678</p>
              <p className="text-gray-600">Email: reservations@xyz.ie</p>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <div className="bg-white rounded-lg shadow-xl p-8">
              {!user && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800">
                    Please{' '}
                    <button
                      onClick={() => onNavigate('login')}
                      className="font-semibold underline hover:text-yellow-900"
                    >
                      sign in
                    </button>{' '}
                    to make a reservation.
                  </p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3 animate-fade-in">
                  <Check className="text-green-600" size={24} />
                  <p className="text-green-800">
                    Reservation submitted successfully! We'll confirm via email shortly.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
                    Time
                  </label>
                  <select
                    id="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a time</option>
                    {Array.from({ length: 22 }, (_, i) => {
                      const hour = Math.floor(i / 2) + 12;
                      const minute = i % 2 === 0 ? '00' : '30';
                      const time = `${hour}:${minute}`;
                      return (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label htmlFor="party_size" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <select
                    id="party_size"
                    required
                    value={formData.party_size}
                    onChange={(e) => setFormData({ ...formData, party_size: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="special_requests" className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    id="special_requests"
                    rows={4}
                    value={formData.special_requests}
                    onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                    placeholder="Dietary requirements, allergies, special occasions..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading || !user}
                  className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-400 transform hover:scale-105 transition-all duration-300"
                >
                  {loading ? 'Submitting...' : 'Reserve Table'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
