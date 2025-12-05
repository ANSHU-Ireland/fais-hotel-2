import { ChefHat, Clock, MapPin, Award } from 'lucide-react';
import samosaImage from '../assets/gallery/samosa.jpg';
import meduVadaImage from '../assets/gallery/medu vada.jpg';
import masalaOmeletteImage from '../assets/gallery/masala omlette.jpg';
import kottayamChickenImage from '../assets/gallery/kottayam chicken fry.jpg';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 animate-slide-up">
            PULARI
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 animate-slide-up-delay">
            Experience Dublin's Finest Cuisine
          </p>
          <button
            onClick={() => onNavigate('menu')}
            className="bg-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-delay"
          >
            Explore Our Menu
          </button>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: 1 column with combined features, Desktop: 4 columns with all features */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Mobile View - Single combined card */}
            <div className="lg:hidden text-center p-6 rounded-lg shadow-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
              <div className="flex justify-center gap-8 mb-4">
                <div className="text-amber-600">
                  <Clock size={40} />
                </div>
                <div className="text-amber-600">
                  <MapPin size={40} />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Open Daily</h3>
                  <p className="text-sm text-gray-600">Monday - Sunday<br/>11:00 AM - 3:00 AM</p>
                </div>
                <div className="h-px bg-amber-300"></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Prime Location</h3>
                  <p className="text-sm text-gray-600">Temple Street, Dublin 2</p>
                </div>
              </div>
            </div>

            {/* Desktop View - All features */}
            {[
              {
                icon: <ChefHat size={48} />,
                title: 'Expert Chefs',
                description: 'Our award-winning chefs bring passion and creativity to every dish',
                showOnDesktop: true,
              },
              {
                icon: <Clock size={48} />,
                title: 'Open Daily',
                description: 'Monday - Sunday, 11:00 AM - 3:00 AM',
                showOnDesktop: true,
              },
              {
                icon: <MapPin size={48} />,
                title: 'Prime Location',
                description: 'Located in the heart of Dublin city centre',
                showOnDesktop: true,
              },
              {
                icon: <Award size={48} />,
                title: 'Award Winning',
                description: 'Recognized for excellence in fine dining',
                showOnDesktop: true,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="hidden lg:block text-center p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-amber-600 flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800 animate-fade-in">
            Featured Dishes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                image: samosaImage,
                title: 'Samosas',
                description: 'Handmade pastry stuffed with mashed spiced potatoes, green peas served with chickpeas and chutneys',
                price: '€4.99',
              },
              {
                image: meduVadaImage,
                title: 'Medu Vada',
                description: 'Authentic south Indian street food made with lentil and spices served with homemade chutney',
                price: '€5.99',
              },
              {
                image: masalaOmeletteImage,
                title: 'Nadan Masala Omelette',
                description: 'Made with onion, turmeric and chillies - a great way to spice up brunch',
                price: '€6.99',
              },
              {
                image: kottayamChickenImage,
                title: 'Kottayam Chicken Fry',
                description: 'Chicken marinated with chilly, coriander, garam masala served with mixed salad leaves',
                price: '€7.99',
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
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">{dish.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{dish.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl sm:text-2xl font-bold text-amber-600">{dish.price}</span>
                    <button
                      onClick={() => onNavigate('menu')}
                      className="text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-300 text-sm sm:text-base"
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
        className="py-24 sm:py-28 md:py-32 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in">Ready to Dine With Us?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 animate-fade-in-delay">
            Contact us today to place your order or learn more
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-delay"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}
