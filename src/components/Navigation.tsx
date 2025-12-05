import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'About', path: 'about' },
    { name: 'Menu', path: 'menu' },
    { name: 'Reservations', path: 'reservations' },
    { name: 'Gallery', path: 'gallery' },
    { name: 'Events', path: 'events' },
    { name: 'Reviews', path: 'reviews' },
    { name: 'Contact', path: 'contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-4' : 'bg-black bg-opacity-20 backdrop-blur-sm py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate('home')}
            className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-amber-600' : 'text-white'
            }`}
          >
            Pulari Restaurant
          </button>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`transition-all duration-300 hover:text-amber-600 ${
                  currentPage === item.path
                    ? 'text-amber-600 font-semibold'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('account')}
                  className={`flex items-center space-x-2 transition-colors duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-200'
                  }`}
                >
                  <User size={20} />
                  <span>Account</span>
                </button>
                <button
                  onClick={() => signOut()}
                  className={`flex items-center space-x-2 transition-colors duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-200'
                  }`}
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors duration-300"
              >
                Sign In
              </button>
            )}
          </div>

          <button
            className={`lg:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: isScrolled ? '76px' : '96px' }}
      >
        <div className="flex flex-col items-center py-8 space-y-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path);
                setIsMenuOpen(false);
              }}
              className={`text-xl transition-colors duration-300 ${
                currentPage === item.path
                  ? 'text-amber-600 font-semibold'
                  : 'text-gray-700 hover:text-amber-600'
              }`}
            >
              {item.name}
            </button>
          ))}
          {user ? (
            <>
              <button
                onClick={() => {
                  onNavigate('account');
                  setIsMenuOpen(false);
                }}
                className="text-xl text-gray-700 hover:text-amber-600 transition-colors duration-300"
              >
                My Account
              </button>
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="text-xl text-gray-700 hover:text-amber-600 transition-colors duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                onNavigate('login');
                setIsMenuOpen(false);
              }}
              className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors duration-300"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
