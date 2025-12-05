import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import logo from '../assets/gallery/logo.jpg';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { getCartCount } = useCart();

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
        isScrolled ? 'bg-white shadow-xl py-3' : 'bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-lg py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 transition-all duration-300 hover:opacity-80"
          >
            <img 
              src={logo} 
              alt="Pulari Restaurant Logo" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain rounded-lg"
            />
            <span className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-amber-600' : 'text-white'
            }`}>
              Pulari Restaurant
            </span>
          </button>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`transition-all duration-300 hover:text-amber-500 text-sm xl:text-base font-medium ${
                  currentPage === item.path
                    ? 'text-amber-500 font-bold border-b-2 border-amber-500 pb-1'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('cart')}
                  className={`relative flex items-center space-x-1 transition-colors duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {getCartCount()}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onNavigate('account')}
                  className={`flex items-center space-x-2 transition-colors duration-300 font-medium ${
                    isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
                  }`}
                >
                  <User size={18} />
                  <span className="text-sm">Account</span>
                </button>
                <button
                  onClick={() => signOut()}
                  className={`flex items-center space-x-1 transition-colors duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
                  }`}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('cart')}
                  className={`relative flex items-center space-x-1 transition-colors duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {getCartCount()}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isScrolled 
                      ? 'bg-amber-600 text-white hover:bg-amber-700' 
                      : 'bg-white text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          <button
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMenuOpen(false)}
          style={{ top: isScrolled ? '64px' : '76px' }}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed right-0 top-0 h-screen w-72 bg-white z-40 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: isScrolled ? '64px' : '76px' }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  onNavigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentPage === item.path
                    ? 'bg-amber-100 text-amber-700 font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          
          <div className="mt-auto p-6 border-t border-gray-200">
            {user ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onNavigate('cart');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <ShoppingCart size={20} />
                    <span>Shopping Cart</span>
                  </div>
                  {getCartCount() > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    onNavigate('account');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <User size={20} />
                  <span>My Account</span>
                </button>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onNavigate('cart');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <ShoppingCart size={20} />
                    <span>Shopping Cart</span>
                  </div>
                  {getCartCount() > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors duration-300 font-semibold"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
