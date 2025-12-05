import { useEffect, useState } from 'react';
import { User, Calendar, Mail, Phone, Clock, MapPin, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Profile {
  full_name: string;
  phone: string;
  email: string;
}

interface Reservation {
  id: string;
  date: string;
  time: string;
  party_size: number;
  special_requests: string;
  status: string;
  created_at: string;
}

interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  is_approved: boolean;
  created_at: string;
}

interface AccountProps {
  onNavigate: (page: string) => void;
}

export default function Account({ onNavigate }: AccountProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'reservations' | 'reviews'>('profile');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  });

  useEffect(() => {
    if (!user) {
      onNavigate('login');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (profileData) {
      setProfile(profileData);
      setFormData({
        full_name: profileData.full_name || '',
        phone: profileData.phone || '',
      });
    }

    const { data: reservationsData } = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (reservationsData) {
      setReservations(reservationsData);
    }

    const { data: reviewsData } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (reviewsData) {
      setReviews(reviewsData);
    }

    setLoading(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (!error) {
      setProfile({ ...profile!, ...formData });
      setEditMode(false);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    const { error } = await supabase
      .from('reservations')
      .update({ status: 'cancelled' })
      .eq('id', reservationId);

    if (!error) {
      loadData();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in">My Account</h1>
          <p className="text-2xl animate-fade-in-delay">Welcome back, {profile?.full_name || 'Guest'}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors duration-300 ${
                activeTab === 'profile'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <User className="inline mr-2" size={20} />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors duration-300 ${
                activeTab === 'reservations'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="inline mr-2" size={20} />
              Reservations ({reservations.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors duration-300 ${
                activeTab === 'reviews'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star className="inline mr-2" size={20} />
              Reviews ({reviews.length})
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'profile' && (
              <div className="max-w-2xl animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Profile Information</h2>

                {!editMode ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <User className="text-amber-600" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {profile?.full_name || 'Not provided'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <Mail className="text-amber-600" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-lg font-semibold text-gray-800">{profile?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <Phone className="text-amber-600" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {profile?.phone || 'Not provided'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setEditMode(true)}
                      className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300"
                    >
                      Edit Profile
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="flex-1 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'reservations' && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800">My Reservations</h2>
                  <button
                    onClick={() => onNavigate('reservations')}
                    className="bg-amber-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300"
                  >
                    New Reservation
                  </button>
                </div>

                {reservations.length === 0 ? (
                  <div className="text-center py-20">
                    <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
                    <p className="text-xl text-gray-600">No reservations yet</p>
                    <button
                      onClick={() => onNavigate('reservations')}
                      className="mt-4 text-amber-600 hover:text-amber-700 font-semibold"
                    >
                      Make your first reservation →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              reservation.status
                            )}`}
                          >
                            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                          </span>
                          {reservation.status === 'pending' && (
                            <button
                              onClick={() => handleCancelReservation(reservation.id)}
                              className="text-red-600 hover:text-red-700 font-semibold text-sm"
                            >
                              Cancel
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            <Calendar className="text-amber-600" size={20} />
                            <span className="text-gray-700">
                              {new Date(reservation.date).toLocaleDateString('en-IE', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Clock className="text-amber-600" size={20} />
                            <span className="text-gray-700">{reservation.time}</span>
                          </div>

                          <div className="flex items-center space-x-3">
                            <User className="text-amber-600" size={20} />
                            <span className="text-gray-700">
                              {reservation.party_size} {reservation.party_size === 1 ? 'Guest' : 'Guests'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-3">
                            <MapPin className="text-amber-600" size={20} />
                            <span className="text-gray-700">Pulari Restaurant</span>
                          </div>
                        </div>

                        {reservation.special_requests && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">Special Requests:</p>
                            <p className="text-gray-700">{reservation.special_requests}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800">My Reviews</h2>
                  <button
                    onClick={() => onNavigate('reviews')}
                    className="bg-amber-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300"
                  >
                    Write Review
                  </button>
                </div>

                {reviews.length === 0 ? (
                  <div className="text-center py-20">
                    <Star className="mx-auto text-gray-400 mb-4" size={64} />
                    <p className="text-xl text-gray-600">No reviews yet</p>
                    <button
                      onClick={() => onNavigate('reviews')}
                      className="mt-4 text-amber-600 hover:text-amber-700 font-semibold"
                    >
                      Write your first review →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              review.is_approved
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {review.is_approved ? 'Published' : 'Pending Approval'}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{review.title}</h3>
                        <p className="text-gray-600 mb-3">{review.comment}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
