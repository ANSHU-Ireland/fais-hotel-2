import { ChefHat, Clock, MapPin, Award } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-up">
            PULARI
          </h1>
          <p className="text-2xl md:text-3xl mb-8 animate-slide-up-delay">
            Experience Dublin's Finest Cuisine
          </p>
          <button
            onClick={() => onNavigate('reservations')}
            className="bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-delay"
          >
            Book a Table
          </button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ChefHat size={48} />,
                title: 'Expert Chefs',
                description: 'Our award-winning chefs bring passion and creativity to every dish',
              },
              {
                icon: <Clock size={48} />,
                title: 'Open Daily',
                description: 'Monday - Sunday, 12:00 PM - 11:00 PM',
              },
              {
                icon: <MapPin size={48} />,
                title: 'Prime Location',
                description: 'Located in the heart of Dublin city centre',
              },
              {
                icon: <Award size={48} />,
                title: 'Award Winning',
                description: 'Recognized for excellence in fine dining',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-amber-600 flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <img
                src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Restaurant interior"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="animate-slide-in-right">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Welcome to PULARI</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Since opening our doors in the heart of Dublin, PULARI Restaurant has been dedicated
                to providing an unforgettable dining experience. Our commitment to using the
                finest locally-sourced ingredients and time-honored cooking techniques has made us
                a beloved destination for food lovers.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Whether you're celebrating a special occasion or simply enjoying a meal with
                loved ones, our warm atmosphere and exceptional service will make your visit
                memorable.
              </p>
              <button
                onClick={() => onNavigate('about')}
                className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transform hover:scale-105 transition-all duration-300"
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 animate-fade-in">
            Featured Dishes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
                title: 'Grilled Salmon',
                description: 'Fresh Atlantic salmon with seasonal vegetables',
                price: '€28',
              },
              {
                image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=800',
                title: 'Ribeye Steak',
                description: 'Premium Irish beef, cooked to perfection',
                price: '€35',
              },
              {
                image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
                title: 'Pasta Primavera',
                description: 'House-made pasta with fresh garden vegetables',
                price: '€22',
              },
            ].map((dish, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={dish.image}
                    alt={dish.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">{dish.title}</h3>
                  <p className="text-gray-600 mb-4">{dish.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-600">{dish.price}</span>
                    <button
                      onClick={() => onNavigate('menu')}
                      className="text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-300"
                    >
                      View Full Menu →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-32 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="text-5xl font-bold mb-6 animate-fade-in">Ready to Dine With Us?</h2>
          <p className="text-xl mb-8 animate-fade-in-delay">
            Reserve your table today and experience culinary excellence
          </p>
          <button
            onClick={() => onNavigate('reservations')}
            className="bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-delay"
          >
            Make a Reservation
          </button>
        </div>
      </section>
    </div>
  );
}
