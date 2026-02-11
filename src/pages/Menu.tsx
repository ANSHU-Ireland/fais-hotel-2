import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Leaf, Wheat, ShoppingCart, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

// Import menu images
import samosaImage from '../assets/gallery/samosa.jpg';
import meduVadaImage from '../assets/gallery/medu vada.jpg';
import masalaOmeletteImage from '../assets/gallery/masala omlette.jpg';
import kottayamChickenImage from '../assets/gallery/kottayam chicken fry.jpg';
import bananaFryImage from '../assets/gallery/banana fry.jpg';
import venaduKonchuImage from '../assets/gallery/venadu kochu fry.jpg';
import gheeRoastImage from '../assets/gallery/ghee roast.jpg';
import masalaDosaImage from '../assets/gallery/masala dosa.jpg';
import setDosaImage from '../assets/gallery/set dosa.jpg';
import mylaporeEggImage from '../assets/gallery/MYLAPOR EGG ROAST.jpg';
import houseBoatFishImage from '../assets/gallery/HOUSE BOAT FISH CURRY.jpg';
import nadanPothuRoastImage from '../assets/gallery/NADAN POTHU ROAST.jpg';
import hiRangeBeefImage from '../assets/gallery/HI RANGE BEEF ULARTHIYATHU.jpg';
import veetileKozhiImage from '../assets/gallery/VEETTILE KOZHI CURRY.jpg';
import konchuMangoImage from '../assets/gallery/KONCHU MANGO CURRY.jpg';
import malabarChickenImage from '../assets/gallery/MALABAR CHICKEN BIRIYANI.jpg';
import malabarBeefImage from '../assets/gallery/MALABAR BEEF BIRIYANI.jpg';
import kappaPuzhukuImage from '../assets/gallery/KAPPA PUZHUKKU.jpg';
import butterChickenImage from '../assets/gallery/OLD DELHI STYLE BUTTER CHICKEN.jpg';
import paneerButterImage from '../assets/gallery/PANEER BUTTER MASALA.jpg';
import keralaParathaImage from '../assets/gallery/KERALA PARATHA.jpg';
import appamImage from '../assets/gallery/APPAM.jpg';
import butterNaanImage from '../assets/gallery/BUTTER NAAN.jpg';
import neyyChoruImage from '../assets/gallery/NEYY CHORU.jpg';
import steamRiceImage from '../assets/gallery/STEAM RICE.jpg';
import pulaoRiceImage from '../assets/gallery/PULAO RICE.jpg';
import raitaImage from '../assets/gallery/RAITA.jpg';
import mangoLassiImage from '../assets/gallery/MANGO LASSI.jpg';
import gulabJamunImage from '../assets/gallery/GULAB JAMUN.jpg';
import nadanChaiImage from '../assets/gallery/NADAN CHAI.jpg';
import masalaTeaImage from '../assets/gallery/MASALA TEA.jpg';
import cardamomTeaImage from '../assets/gallery/CARDAMOM TEA.jpg';
import filterCoffeeImage from '../assets/gallery/FILTER COFFEE.jpg';

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
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const { addToCart, items: cartItems } = useCart();
  const navigate = useNavigate();

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image_url: item.image_url,
      is_vegetarian: item.is_vegetarian,
      is_vegan: item.is_vegan,
      is_gluten_free: item.is_gluten_free,
    });
    
    // Show added animation
    setAddedItems(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  useEffect(() => {
    // Comment out database loading for now, using local menu data
    // loadMenu();
    
    // Handle responsive behavior for category expansion
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setExpandedCategories(new Set(['1', '2', '3', '4', '5']));
      } else {
        setExpandedCategories(new Set());
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          description: 'Handmade pastry stuffed with spiced mashed potatoes and green peas. Served with chickpeas, sweet yoghurt, mint, and tamarind chutneys.',
          price: 4.99,
          image_url: samosaImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '2',
          name: 'MEDU VADA',
          description: 'A classic South Indian street food made with lentils and spices, served with homemade chutney.',
          price: 5.99,
          image_url: meduVadaImage,
          is_vegetarian: true,
          is_vegan: true,
          is_gluten_free: false,
        },
        {
          id: '3',
          name: 'NADAN MASALA OMELETTE',
          description: 'A Kerala-style omelette made with onions, turmeric, and chillies — a great way to spice up brunch.',
          price: 6.99,
          image_url: masalaOmeletteImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '4',
          name: 'KOTTAYAM CHICKEN FRY',
          description: 'On-the-bone chicken marinated with chilli, coriander, and garam masala, served with mixed salad leaves.',
          price: 7.99,
          image_url: kottayamChickenImage,
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '5',
          name: 'BANANA FRY',
          description: 'A traditional Kerala snack — golden, crispy banana fritters that are soft and sweet inside.',
          price: 5.99,
          image_url: bananaFryImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '6',
          name: 'VENADU KONCHU FRY',
          description: 'Prawns cooked with hand-pounded spices, onions, ginger, and garlic.',
          price: 7.99,
          image_url: venaduKonchuImage,
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
          description: 'Crispy dosa roasted with ghee.',
          price: 11.50,
          image_url: gheeRoastImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '8',
          name: 'MASALA DOSA',
          description: 'Crispy rice crepe filled with spiced potato masala.',
          price: 11.99,
          image_url: masalaDosaImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '9',
          name: 'SET DOSA',
          description: 'Soft, fluffy dosas served in a set.',
          price: 11.50,
          image_url: setDosaImage,
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
          description: 'Hard-boiled eggs cooked with thinly sliced onions, tomatoes, and hand-pounded spices.',
          price: 11.99,
          image_url: mylaporeEggImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '11',
          name: 'HOUSE BOAT FISH CURRY',
          description: 'Fresh fish simmered in a spicy, tangy gravy made with Kashmiri chillies, turmeric, tamarind, and Kerala kudampuli.',
          price: 12.99,
          image_url: houseBoatFishImage,
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '12',
          name: 'NADAN POTHU ROAST',
          description: 'Traditional Kerala-style beef cooked with curry leaves, black pepper, fennel seeds, and aromatic spices.',
          price: 13.99,
          image_url: nadanPothuRoastImage,
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '13',
          name: 'HIGH RANGE BEEF ULARTHIYATHU',
          description: 'A classic Toddy Shop-style beef fry. Slow-cooked beef and onions blend with Kerala spices for a rich, dark, flavourful finish.',
          price: 13.99,
          image_url: hiRangeBeefImage,
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '14',
          name: 'VEETTILE KOZHI CURRY',
          description: 'A homestyle Kerala chicken curry cooked on the bone with black pepper, coriander, cinnamon, and cloves.',
          price: 11.99,
          image_url: veetileKozhiImage,
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '15',
          name: 'KONCHU MANGO CURRY',
          description: 'Prawns cooked with coconut, pearl onions, and tangy raw mango.',
          price: 14.99,
          image_url: konchuMangoImage,
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '16',
          name: 'MALABAR CHICKEN BIRIYANI',
          description: 'Aged, aromatic rice layered with tender chicken, cooked in traditional Malabar style.',
          price: 13.50,
          image_url: malabarChickenImage,
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '17',
          name: 'MALABAR BEEF BIRIYANI',
          description: "Slow-cooked beef biryani prepared in the authentic Malabar wedding style — our chef's signature dish.",
          price: 13.99,
          image_url: malabarBeefImage,
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '18',
          name: 'GOPI MANCHURIAN',
          description: 'Crispy cauliflower tossed in a tangy Indo-Chinese garlic-chilli sauce.',
          price: 13.00,
          image_url: '',
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '19',
          name: 'KAPPA PUZHUKKU',
          description: 'A comforting Kerala dish made with mashed tapioca and spices.',
          price: 7.99,
          image_url: kappaPuzhukuImage,
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '20',
          name: 'OLD DELHI STYLE BUTTER CHICKEN',
          description: 'Chicken tikka cooked in a creamy tomato sauce with fenugreek, fresh cream, honey and butter.',
          price: 14.99,
          image_url: butterChickenImage,
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '21',
          name: 'PANEER BUTTER MASALA',
          description: 'Grilled cottage cheese cubes simmered in a rich, creamy, spiced tomato gravy.',
          price: 13.99,
          image_url: paneerButterImage,
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
          image_url: keralaParathaImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '23',
          name: 'APPAM',
          description: 'Traditional rice pancake',
          price: 2.50,
          image_url: appamImage,
          is_vegetarian: true,
          is_vegan: true,
          is_gluten_free: true,
        },
        {
          id: '24',
          name: 'BUTTER NAAN',
          description: 'Soft leavened bread with butter',
          price: 3.50,
          image_url: butterNaanImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '25',
          name: 'NEYY CHORU',
          description: 'Fragrant ghee rice',
          price: 4.50,
          image_url: neyyChoruImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '26',
          name: 'STEAM RICE',
          description: 'Steamed basmati rice',
          price: 3.50,
          image_url: steamRiceImage,
          is_vegetarian: true,
          is_vegan: true,
          is_gluten_free: true,
        },
        {
          id: '27',
          name: 'PULAO RICE',
          description: 'Fragrant spiced rice',
          price: 3.99,
          image_url: pulaoRiceImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '28',
          name: 'RAITA',
          description: 'Yogurt with cucumber and spices',
          price: 3.00,
          image_url: raitaImage,
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
          image_url: mangoLassiImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '30',
          name: 'GULAB JAMUN',
          description: 'Traditional Indian sweet dumplings in syrup',
          price: 4.00,
          image_url: gulabJamunImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: false,
        },
        {
          id: '31',
          name: 'NADAN CHAI',
          description: 'Traditional Kerala tea',
          price: 3.00,
          image_url: nadanChaiImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '32',
          name: 'MASALA TEA',
          description: 'Aromatic spiced Indian tea',
          price: 3.00,
          image_url: masalaTeaImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '33',
          name: 'CARDAMOM TEA',
          description: 'Aromatic cardamom infused tea',
          price: 3.00,
          image_url: cardamomTeaImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
        {
          id: '34',
          name: 'FILTER COFFEE',
          description: 'Traditional South Indian filter coffee',
          price: 3.00,
          image_url: filterCoffeeImage,
          is_vegetarian: true,
          is_vegan: false,
          is_gluten_free: true,
        },
      ],
    },
  ];

  const displayMenu = categories.length > 0 ? categories : sampleMenu;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-amber-50 pt-16 sm:pt-20">
      {/* Hero Section with Parallax Effect */}
      <section
        className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        <div className="relative z-10 text-center text-white px-4">
          <div className="mb-4 sm:mb-6 animate-fade-in">
            <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-amber-600/20 backdrop-blur-sm border border-amber-400/30 rounded-full">
              <span className="text-amber-300 text-xs sm:text-sm font-semibold tracking-widest">AUTHENTIC KERALA CUISINE</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4 animate-slide-up bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
            Our Menu
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl animate-fade-in-delay text-amber-100 font-light tracking-wide px-4">
            A Culinary Journey Through Kerala's Finest Flavors
          </p>
          <div className="mt-4 sm:mt-8 flex justify-center gap-2 animate-fade-in-delay">
            <div className="w-12 sm:w-20 h-1 bg-amber-500 rounded-full"></div>
            <div className="w-2 h-1 bg-amber-400 rounded-full"></div>
            <div className="w-2 h-1 bg-amber-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-4 border-amber-200 border-t-amber-600 shadow-lg"></div>
            <p className="mt-4 text-amber-700 font-semibold text-sm sm:text-base">Loading delicious items...</p>
          </div>
        ) : (
          displayMenu.map((category, categoryIndex) => (
            <div key={category.id} className="mb-16 sm:mb-20 md:mb-24" style={{ animationDelay: `${categoryIndex * 200}ms` }}>
              {/* Category Header - Clickable on Mobile */}
              <div className="text-center mb-10 sm:mb-12 md:mb-16 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="w-full h-24 sm:h-32 bg-gradient-to-r from-transparent via-amber-300 to-transparent blur-3xl"></div>
                </div>
                <div className="relative">
                  <div className="inline-block mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-amber-500"></div>
                      <div className="w-2 sm:w-3 h-2 sm:h-3 bg-amber-500 rounded-full animate-pulse"></div>
                      <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-amber-500"></div>
                    </div>
                  </div>
                  
                  {/* Mobile: Clickable header */}
                  <div className="flex items-center justify-center gap-2 lg:block">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight px-4 lg:cursor-default">
                      {category.name}
                    </h2>
                    {/* Chevron icon - only visible on mobile, clickable button */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="lg:hidden p-2 hover:bg-amber-50 rounded-full transition-colors"
                      aria-label={expandedCategories.has(category.id) ? 'Collapse category' : 'Expand category'}
                    >
                      {expandedCategories.has(category.id) ? (
                        <ChevronUp className="text-amber-600" size={24} />
                      ) : (
                        <ChevronDown className="text-amber-600" size={24} />
                      )}
                    </button>
                  </div>
                  
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 italic font-light px-4">{category.description}</p>
                  <div className="mt-3 sm:mt-4 flex justify-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Menu Items Grid - Collapsible on Mobile */}
              <div 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 transition-all duration-500 ease-in-out overflow-hidden ${
                  expandedCategories.has(category.id)
                    ? 'max-h-[10000px] opacity-100'
                    : 'max-h-0 opacity-0 lg:max-h-[10000px] lg:opacity-100'
                }`}
              >
                {category.items.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up border border-gray-100"
                    style={{ animationDelay: `${itemIndex * 80}ms` }}
                  >
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 transition-all duration-500 pointer-events-none"></div>
                    
                    <div className="flex flex-col sm:flex-row">
                      {/* Image Section with Enhanced Placeholder */}
                      <div className="relative w-full sm:w-48 md:w-56 h-48 sm:h-56 overflow-hidden">
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
                            <svg className="w-12 sm:w-16 h-12 sm:h-16 text-amber-400 mb-2 sm:mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-amber-600 text-xs sm:text-sm font-semibold">Image Coming Soon</span>
                          </div>
                        )}
                        {/* Corner Accent */}
                        <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-amber-500/20 to-transparent"></div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-4 sm:p-5 md:p-6 relative">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 group-hover:text-amber-700 transition-colors duration-300 leading-tight sm:pr-2">
                            {item.name}
                          </h3>
                          <div className="flex-shrink-0">
                            <span className="inline-block bg-gradient-to-br from-amber-500 to-amber-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-base sm:text-lg md:text-xl font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                              €{item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm line-clamp-3 group-hover:text-gray-700 transition-colors">
                          {item.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {item.is_vegetarian && (
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm">
                              <Leaf size={12} className="mr-1 sm:mr-1.5" />
                              Vegetarian
                            </span>
                          )}
                          {item.is_vegan && (
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm">
                              <Leaf size={12} className="mr-1 sm:mr-1.5" />
                              Vegan
                            </span>
                          )}
                          {item.is_gluten_free && (
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200 shadow-sm">
                              <Wheat size={12} className="mr-1 sm:mr-1.5" />
                              GF
                            </span>
                          )}
                        </div>

                        {/* Add to Cart / View Cart Button */}
                        <button
                          onClick={() => {
                            const isInCart = cartItems.some(cartItem => cartItem.id === item.id);
                            if (isInCart) {
                              navigate('/cart');
                            } else {
                              handleAddToCart(item);
                            }
                          }}
                          disabled={addedItems.has(item.id) && !cartItems.some(cartItem => cartItem.id === item.id)}
                          className={`mt-4 w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                            addedItems.has(item.id) && !cartItems.some(cartItem => cartItem.id === item.id)
                              ? 'bg-green-500 text-white cursor-not-allowed'
                              : cartItems.some(cartItem => cartItem.id === item.id)
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                              : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800'
                          }`}
                        >
                          {addedItems.has(item.id) && !cartItems.some(cartItem => cartItem.id === item.id) ? (
                            <>
                              <Check size={18} className="animate-bounce" />
                              Added to Cart
                            </>
                          ) : cartItems.some(cartItem => cartItem.id === item.id) ? (
                            <>
                              <ShoppingCart size={18} />
                              View Cart
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={18} />
                              Add to Cart
                            </>
                          )}
                        </button>

                        {/* Decorative Bottom Border */}
                        <div className="hidden sm:block absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-2 sm:border-4 border-amber-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden animate-fade-in">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.03) 10px, rgba(0,0,0,.03) 20px)'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-block p-2 sm:p-3 bg-red-100 rounded-full mb-3 sm:mb-4">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-800 mb-2 sm:mb-3 tracking-tight px-4">
                BE FOOD ALLERGEN AWARE
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-red-600 mx-auto mb-4 sm:mb-6 rounded-full"></div>
              <p className="text-base sm:text-lg md:text-xl text-gray-800 mb-3 sm:mb-4 font-bold italic px-4">
                "YOUR SAFETY MATTERS, INFORM US OF FOOD ALLERGENS OR RESTRICTIONS"
              </p>
            </div>
            
            <div className="text-center text-gray-700 mb-6 sm:mb-8 bg-white/60 rounded-lg p-4 sm:p-6 backdrop-blur-sm">
              <p className="mb-2 text-xs sm:text-sm">The food products are manufactured in a facility and also processes allergens.</p>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm">May contain allergies.</p>
              <p className="font-bold text-amber-900 text-sm sm:text-base">Please ask our staff if you require further allergen information.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
                  className="flex items-center bg-white/80 backdrop-blur-sm p-2.5 sm:p-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="flex-shrink-0 w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold rounded-full mr-2 sm:mr-3 shadow-md text-sm sm:text-base">
                    {allergen.num}
                  </span>
                  <span className="text-gray-800 font-medium text-xs sm:text-sm">{allergen.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Ready to Experience Authentic Kerala Flavors?</h3>
          <p className="text-base sm:text-lg md:text-xl text-amber-100 mb-6 sm:mb-8">Book your table now and embark on a culinary journey</p>
          <button className="bg-white text-amber-700 px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-amber-50 transform hover:scale-105 transition-all duration-300 shadow-2xl">
            Make a Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
