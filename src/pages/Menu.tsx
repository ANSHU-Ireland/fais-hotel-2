import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Leaf, Wheat } from 'lucide-react';

// Import menu images
import samosaImage from '../assets/gallery/samosa.jpg';
import meduVadaImage from '../assets/gallery/medu vada.jpg';
import masalaOmeletteImage from '../assets/gallery/masala omlette.jpg';
import kottayamChickenImage from '../assets/gallery/kottayam chicken fry.jpg';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export default function Menu() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(false); // Set to false to use local data

  useEffect(() => {
    // Comment out database loading for now, using local menu data
    // loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const { data: categoriesData } = await supabase
        .from('menu_categories')
        .select('*')
        .order('display_order');

      if (categoriesData) {
        const categoriesWithItems = await Promise.all(
          categoriesData.map(async (category) => {
            const { data: items } = await supabase
              .from('menu_items')
              .select('*')
              .eq('category_id', category.id)
              .eq('is_available', true);

            return {
              ...category,
              items: items || [],
            };
          })
        );

        setCategories(categoriesWithItems);
      }
    } catch (error) {
      console.error('Error loading menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const sampleMenu = [
    {
      id: '1',
      name: 'APPETIZERS',
      description: 'Traditional starters to begin your journey',
      items: [
        {
          id: '1',
          name: 'SAMOSAS',
          description: 'Handmade pastry stuffed with mashed spiced potatoes, green peas served with chickpeas, sweet yoghurt, mint and tamarind chutneys. (1, 7)',
          price: 4.99,
          image_url: samosaImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '2',
          name: 'MEDU VADA',
          description: 'An authentic south Indian street food, made with lentil and spices served with homemade chutney (10)',
          price: 5.99,
          image_url: meduVadaImage,
          is_vegetarian: true,
          is_vegan: true,
          is_gluten_free: false,
        },
        {
          id: '3',
          name: 'NADAN MASALA OMELETTE',
          description: 'Made with onion turmeric and chillies is a great way to spice up brunch (3,10)',
          price: 6.99,
          image_url: masalaOmeletteImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '4',
          name: 'KOTTAYAM CHICKEN FRY',
          description: 'Chicken marinated with chilly, coriander, garam masala and served with mixed salad leaves. On the bone (1, 10)',
          price: 7.99,
          image_url: kottayamChickenImage,
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '5',
          name: 'BANANA FRY',
          description: 'Traditional street food banana fritters that is crispy and golden on the outside while soft and mushy once fried (1, 10)',
          price: 5.99,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '6',
          name: 'VENADU KONCHU FRY',
          description: 'Prawn made with hand pounded spices, onions, ginger and garlic (1,2,10,prawns)',
          price: 7.99,
          image_url: '',
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
      ],
    },
    {
      id: '2',
      name: 'DOSAS',
      description: 'Traditional South Indian crepes',
      items: [
        {
          id: '7',
          name: 'GHEE ROAST',
          description: 'Crispy dosa roasted with ghee (7, 10)',
          price: 11.50,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '8',
          name: 'MASALA DOSA',
          description: 'Crispy rice crepe filled with spiced potato masala (7, 10)',
          price: 11.99,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '9',
          name: 'SET DOSA',
          description: 'Soft, fluffy dosas served in a set (7, 10)',
          price: 11.50,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
      ],
    },
    {
      id: '3',
      name: 'ALL TIME FAVOURITES',
      description: 'Our signature main courses',
      items: [
        {
          id: '10',
          name: 'MYLAPOR EGG ROAST',
          description: 'Hard boiled eggs cooked with thin sliced onions, tomatoes and hand pounded spices (1,3, 10)',
          price: 11.99,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '11',
          name: 'HOUSE BOAT FISH CURRY',
          description: 'Fresh fish cooked with Kashmiri chillies, turmeric, tamarind, and Kerala kudampuli for a special spicy tang (2, 4)',
          price: 12.99,
          image_url: '',
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '12',
          name: 'NADAN POTHU ROAST',
          description: 'Traditional Kerala style beef made with curry leaves, black pepper, fennel seeds and spices (1, 10)',
          price: 13.99,
          image_url: '',
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '13',
          name: 'HI RANGE BEEF ULARTHIYATHU',
          description: 'Classic beef fry dish, cooked in the traditional Toddy shop way. Slow cooked beef with onions and spicy Kerala masala (10)',
          price: 13.99,
          image_url: '',
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '14',
          name: 'VEETTILE KOZHI CURRY',
          description: 'Authentic Kerala dish. On the bone chicken cooked with black pepper, coriander, cinnamon, and cloves (10)',
          price: 11.99,
          image_url: '',
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '15',
          name: 'KONCHU MANGO CURRY',
          description: 'Made with prawns, coconut, pearl onions and sour mangoes (2,10,prawns)',
          price: 14.99,
          image_url: '',
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '16',
          name: 'MALABAR CHICKEN BIRIYANI',
          description: 'Aged, fragrantly flavored rice blends perfectly with chicken cooked to tenderness (7,8)',
          price: 13.50,
          image_url: '',
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '17',
          name: 'MALABAR BEEF BIRIYANI',
          description: 'Cooked in the traditional Malabar Weddings style. Made with beef and signature spices (7,8)',
          price: 13.99,
          image_url: '',
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '18',
          name: 'KAPPA BIRIYANI',
          description: 'A Kerala dish with Tapioca, beef and spices (7,8)',
          price: 12.50,
          image_url: '',
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '19',
          name: 'KAPPA PUZHUKKU',
          description: 'A Kerala dish cooked with Tapioca, beef and spices (7,8)',
          price: 7.99,
          image_url: '',
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '20',
          name: 'OLD DELHI STYLE BUTTER CHICKEN',
          description: 'Traditional dish made from chicken tikka cooked with onion and tomato sauce, finished with fenugreek, fresh cream, honey and butter (7)',
          price: 14.99,
          image_url: '',
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '21',
          name: 'PANEER BUTTER MASALA',
          description: 'Grilled cubes of cottage cheese cooked in a rich and creamy tomato sauce infused with aromatic spices (7)',
          price: 13.99,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
      ],
    },
    {
      id: '4',
      name: 'BREADS & RICE',
      description: 'Perfect accompaniments',
      items: [
        {
          id: '22',
          name: 'KERALA PARATHA',
          description: 'Layered flatbread',
          price: 2.99,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '23',
          name: 'APPAM',
          description: 'Traditional rice pancake',
          price: 2.50,
          image_url: '',
          is_vegetarian: true,
          is_vegan: true,
          is_gluten_free: true,
        },
        {
          id: '24',
          name: 'BUTTER NAAN',
          description: 'Soft leavened bread with butter',
          price: 3.50,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '25',
          name: 'NEYY CHORU',
          description: 'Ghee rice',
          price: 4.50,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '26',
          name: 'STEAM RICE',
          description: 'Steamed basmati rice',
          price: 3.50,
          image_url: '',
          is_vegetarian: true,
          is_vegan: true,
          is_gluten_free: true,
        },
        {
          id: '27',
          name: 'PULAO RICE',
          description: 'Fragrant spiced rice',
          price: 3.99,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '28',
          name: 'RAITA',
          description: 'Yogurt with cucumber and spices',
          price: 3.00,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
      ],
    },
    {
      id: '5',
      name: 'DESSERTS & BEVERAGES',
      description: 'Sweet treats and refreshing drinks',
      items: [
        {
          id: '29',
          name: 'MANGO LASSI',
          description: 'Refreshing mango yogurt drink',
          price: 3.50,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '30',
          name: 'GULAB JAMUN',
          description: 'Traditional Indian sweet dumplings in syrup',
          price: 4.00,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '31',
          name: 'NADAN CHAI',
          description: 'Traditional Kerala tea',
          price: 3.00,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '32',
          name: 'MASALA TEA',
          description: 'Spiced Indian tea',
          price: 3.00,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '33',
          name: 'CARDAMOM TEA',
          description: 'Aromatic cardamom infused tea',
          price: 3.00,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '34',
          name: 'FILTER COFFEE',
          description: 'Traditional South Indian filter coffee',
          price: 3.00,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
      ],
    },
  ];

  const displayMenu = categories.length > 0 ? categories : sampleMenu;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-amber-50">
      {/* Hero Section with Parallax Effect */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        <div className="relative z-10 text-center text-white px-4">
          <div className="mb-6 animate-fade-in">
            <div className="inline-block px-6 py-2 bg-amber-600/20 backdrop-blur-sm border border-amber-400/30 rounded-full">
              <span className="text-amber-300 text-sm font-semibold tracking-widest">AUTHENTIC KERALA CUISINE</span>
            </div>
          </div>
          <h1 className="text-7xl font-bold mb-4 animate-slide-up bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
            Our Menu
          </h1>
          <p className="text-2xl animate-fade-in-delay text-amber-100 font-light tracking-wide">
            A Culinary Journey Through Kerala's Finest Flavors
          </p>
          <div className="mt-8 flex justify-center gap-2 animate-fade-in-delay">
            <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
            <div className="w-2 h-1 bg-amber-400 rounded-full"></div>
            <div className="w-2 h-1 bg-amber-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-600 shadow-lg"></div>
            <p className="mt-4 text-amber-700 font-semibold">Loading delicious items...</p>
          </div>
        ) : (
          displayMenu.map((category, categoryIndex) => (
            <div key={category.id} className="mb-24" style={{ animationDelay: `${categoryIndex * 200}ms` }}>
              {/* Category Header with Decorative Elements */}
              <div className="text-center mb-16 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="w-full h-32 bg-gradient-to-r from-transparent via-amber-300 to-transparent blur-3xl"></div>
                </div>
                <div className="relative">
                  <div className="inline-block mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500"></div>
                      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                      <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500"></div>
                    </div>
                  </div>
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 bg-clip-text text-transparent mb-4 tracking-tight">
                    {category.name}
                  </h2>
                  <p className="text-xl text-gray-600 italic font-light">{category.description}</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up border border-gray-100"
                    style={{ animationDelay: `${itemIndex * 80}ms` }}
                  >
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 transition-all duration-500 pointer-events-none"></div>
                    
                    <div className="flex flex-col sm:flex-row">
                      {/* Image Section with Enhanced Placeholder */}
                      <div className="relative w-full sm:w-56 h-56 overflow-hidden">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 relative overflow-hidden">
                            {/* Animated Background Pattern */}
                            <div className="absolute inset-0 opacity-20">
                              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent animate-pulse"></div>
                            </div>
                            <svg className="w-16 h-16 text-amber-400 mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-amber-600 text-sm font-semibold">Image Coming Soon</span>
                          </div>
                        )}
                        {/* Corner Accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-500/20 to-transparent"></div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6 relative">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-amber-700 transition-colors duration-300 leading-tight pr-2">
                            {item.name}
                          </h3>
                          <div className="flex-shrink-0">
                            <span className="inline-block bg-gradient-to-br from-amber-500 to-amber-700 text-white px-4 py-2 rounded-full text-xl font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                              €{item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3 group-hover:text-gray-700 transition-colors">
                          {item.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {item.is_vegetarian && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm">
                              <Leaf size={14} className="mr-1.5" />
                              Vegetarian
                            </span>
                          )}
                          {item.is_vegan && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm">
                              <Leaf size={14} className="mr-1.5" />
                              Vegan
                            </span>
                          )}
                          {item.is_gluten_free && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200 shadow-sm">
                              <Wheat size={14} className="mr-1.5" />
                              GF
                            </span>
                          )}
                        </div>

                        {/* Decorative Bottom Border */}
                        <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Allergen Information Section with Enhanced Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-4 border-amber-500 rounded-2xl p-10 shadow-2xl overflow-hidden animate-fade-in">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.03) 10px, rgba(0,0,0,.03) 20px)'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-red-800 mb-3 tracking-tight">
                BE FOOD ALLERGEN AWARE
              </h2>
              <div className="w-24 h-1 bg-red-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-800 mb-4 font-bold italic">
                "YOUR SAFETY MATTERS, INFORM US OF FOOD ALLERGENS OR RESTRICTIONS"
              </p>
            </div>
            
            <div className="text-center text-gray-700 mb-8 bg-white/60 rounded-lg p-6 backdrop-blur-sm">
              <p className="mb-2 text-sm">The food products are manufactured in a facility and also processes allergens.</p>
              <p className="mb-3 text-sm">May contain allergies.</p>
              <p className="font-bold text-amber-900">Please ask our staff if you require further allergen information.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { num: 1, name: 'Wheat' },
                { num: 2, name: 'Crustaceans' },
                { num: 3, name: 'Eggs' },
                { num: 4, name: 'Fish' },
                { num: 5, name: 'Peanuts' },
                { num: 6, name: 'Soybean' },
                { num: 7, name: 'Dairy' },
                { num: 8, name: 'Nuts' },
                { num: 9, name: 'Celery' },
                { num: 10, name: 'Mustard' },
                { num: 11, name: 'Sesame Seed' },
                { num: 12, name: 'Lupin' },
                { num: 13, name: 'Sulphites' },
                { num: 14, name: 'Molluscs Oyster Sauce' },
              ].map((allergen, index) => (
                <div 
                  key={allergen.num}
                  className="flex items-center bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold rounded-full mr-3 shadow-md">
                    {allergen.num}
                  </span>
                  <span className="text-gray-800 font-medium">{allergen.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-4xl font-bold text-white mb-4">Ready to Experience Authentic Kerala Flavors?</h3>
          <p className="text-xl text-amber-100 mb-8">Book your table now and embark on a culinary journey</p>
          <button className="bg-white text-amber-700 px-10 py-4 rounded-full text-lg font-bold hover:bg-amber-50 transform hover:scale-105 transition-all duration-300 shadow-2xl">
            Make a Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
