import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Account from './pages/Account';
import Cart from './pages/Cart';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'menu':
        return <Menu />;
      case 'reservations':
        return <Reservations onNavigate={setCurrentPage} />;
      case 'gallery':
        return <Gallery />;
      case 'events':
        return <Events />;
      case 'reviews':
        return <Reviews onNavigate={setCurrentPage} />;
      case 'contact':
        return <Contact />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'account':
        return <Account onNavigate={setCurrentPage} />;
      case 'cart':
        return <Cart onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        {renderPage()}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-amber-500">Pulari Restaurant</h3>
                <p className="text-gray-400">
                  Experience Dublin's finest cuisine in the heart of the city centre.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-white transition-colors">
                      About Us
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCurrentPage('menu')} className="text-gray-400 hover:text-white transition-colors">
                      Menu
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCurrentPage('reservations')} className="text-gray-400 hover:text-white transition-colors">
                      Reservations
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCurrentPage('events')} className="text-gray-400 hover:text-white transition-colors">
                      Events
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>123 Grafton Street</li>
                  <li>Dublin 2, D02 X285</li>
                  <li>+353 1 234 5678</li>
                  <li>info@xyz-restaurant.ie</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Hours</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Mon - Thu: 12:00 PM - 10:00 PM</li>
                  <li>Fri - Sat: 12:00 PM - 11:00 PM</li>
                  <li>Sunday: 12:00 PM - 9:00 PM</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Pulari Restaurant. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
