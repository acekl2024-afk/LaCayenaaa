import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_CATEGORIES, INITIAL_MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { CategoryId, MenuItem } from '../types';
import { BeerMenuShowcase } from '../components/BeerMenuShowcase';
import { handleImageError } from '../utils/imageFallbacks';
import { 
  Search, 
  Flame, 
  Filter, 
  ArrowUpDown, 
  Plus, 
  Info, 
  Leaf, 
  Check, 
  CalendarDays, 
  ChevronDown, 
  ChevronUp,
  Instagram,
  Sparkles,
  Beer,
  Utensils,
  Wine,
  Pizza,
  Fish,
  Salad,
  Cake,
  ExternalLink
} from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { 
    language, 
    addToCart, 
    openCustomizationModal, 
    preOrderCart,
    navigateTo,
    getDishImage,
    tr 
  } = useApp();

  // Top tabs: 'menu' (Carta) vs 'beers' (Cervezas)
  const [topTab, setTopTab] = useState<'menu' | 'beers'>('menu');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc'>('recommended');
  
  // Category expanded state for accordion view
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    appetisers: true,
    salads: true,
    starters: true,
    meats: true,
    fish: true,
    pizzas: true,
    desserts: true,
    beers: true,
    wines: true
  });

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const expandAll = () => {
    setExpandedCategories({
      appetisers: true,
      salads: true,
      starters: true,
      meats: true,
      fish: true,
      pizzas: true,
      desserts: true,
      beers: true,
      wines: true
    });
  };

  const collapseAll = () => {
    setExpandedCategories({
      appetisers: false,
      salads: false,
      starters: false,
      meats: false,
      fish: false,
      pizzas: false,
      desserts: false,
      beers: false,
      wines: false
    });
  };

  // Filtered menu categories based on top tab
  const displayCategories = useMemo(() => {
    if (topTab === 'beers') {
      return MENU_CATEGORIES.filter(c => c.id === 'beers' || c.id === 'wines');
    }
    return MENU_CATEGORIES.filter(c => c.id !== 'beers' && c.id !== 'wines');
  }, [topTab]);

  // Filter items
  const filteredItems = useMemo(() => {
    return INITIAL_MENU_ITEMS.filter((item) => {
      // Top tab filter
      if (topTab === 'beers') {
        if (item.category !== 'beers' && item.category !== 'wines') return false;
      } else {
        if (item.category === 'beers' || item.category === 'wines') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(q) || (item.nameEn && item.nameEn.toLowerCase().includes(q));
        const descMatch = item.description.toLowerCase().includes(q) || (item.descriptionEn && item.descriptionEn.toLowerCase().includes(q));
        if (!nameMatch && !descMatch) return false;
      }

      // Dietary / feature filters
      if (activeFilter === 'vegetarian' && !item.vegetarian) return false;
      if (activeFilter === 'vegan' && !item.vegan) return false;
      if (activeFilter === 'glutenFree' && !item.glutenFree) return false;
      if (activeFilter === 'spicy' && !item.spicy) return false;
      if (activeFilter === 'grilled' && !item.grilled) return false;
      if (activeFilter === 'popular' && !item.popular) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0;
    });
  }, [topTab, searchQuery, activeFilter, sortBy]);

  const filterOptions = [
    { id: 'all', label: tr.menu.filters.all },
    { id: 'grilled', label: tr.menu.filters.grilled },
    { id: 'popular', label: tr.menu.filters.popular },
    { id: 'glutenFree', label: tr.menu.filters.glutenFree },
    { id: 'vegetarian', label: tr.menu.filters.vegetarian },
    { id: 'spicy', label: tr.menu.filters.spicy }
  ];

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'appetisers': return <Sparkles className="w-4 h-4 text-[#B08D57]" />;
      case 'salads': return <Salad className="w-4 h-4 text-emerald-600" />;
      case 'starters': return <Utensils className="w-4 h-4 text-[#C55A2A]" />;
      case 'meats': return <Flame className="w-4 h-4 text-[#B52A2A]" />;
      case 'fish': return <Fish className="w-4 h-4 text-blue-500" />;
      case 'pizzas': return <Pizza className="w-4 h-4 text-amber-600" />;
      case 'desserts': return <Cake className="w-4 h-4 text-rose-500" />;
      case 'beers': return <Beer className="w-4 h-4 text-amber-500" />;
      case 'wines': return <Wine className="w-4 h-4 text-purple-500" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  return (
    <div id="menu-page" className="min-h-screen bg-[#FAF6F0] pt-28 sm:pt-32 pb-28">
      {/* Top Authentic Bar with Menu / Beers Tabs (Matching authentic site layout) */}
      <div className="bg-[#E6DACB] border-b border-[#D8C7B2] sticky top-20 sm:top-24 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex w-full sm:w-auto">
              <button
                onClick={() => {
                  setTopTab('menu');
                  setSearchQuery('');
                }}
                className={`flex-1 sm:flex-initial py-3.5 px-8 text-sm sm:text-base font-bold tracking-wide transition-all border-b-2 ${
                  topTab === 'menu'
                    ? 'bg-[#D2BBA0] text-[#1E1B18] border-[#1E1B18] shadow-inner font-extrabold'
                    : 'text-stone-700 hover:text-stone-900 border-transparent hover:bg-black/5'
                }`}
              >
                {language === 'es' ? 'CARTA / MENU' : 'MENU'}
              </button>
              <button
                onClick={() => {
                  setTopTab('beers');
                  setSearchQuery('');
                }}
                className={`flex-1 sm:flex-initial py-3.5 px-8 text-sm sm:text-base font-bold tracking-wide transition-all border-b-2 flex items-center justify-center gap-2 ${
                  topTab === 'beers'
                    ? 'bg-[#D2BBA0] text-[#1E1B18] border-[#1E1B18] shadow-inner font-extrabold'
                    : 'text-stone-700 hover:text-stone-900 border-transparent hover:bg-black/5'
                }`}
              >
                <Beer className="w-4 h-4 text-amber-700" />
                <span>{language === 'es' ? 'CERVEZAS / BEERS' : 'BEERS'}</span>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-stone-600">
              <button 
                onClick={expandAll}
                className="hover:text-stone-900 underline px-2 py-1"
              >
                {language === 'es' ? 'Expandir todo' : 'Expand all'}
              </button>
              <span>•</span>
              <button 
                onClick={collapseAll}
                className="hover:text-stone-900 underline px-2 py-1"
              >
                {language === 'es' ? 'Contraer todo' : 'Collapse all'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Title Heading */}
        <div className="text-center py-2 space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-[#2A2421] uppercase">
            LA CAYENA GRILL
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-sans tracking-wide">
            {language === 'es' 
              ? 'Asador - Pizzería • Horno Josper • La Zubia, Granada' 
              : 'Grill & Pizzeria • Josper Oak Oven • La Zubia, Granada'}
          </p>

          {/* Pre-order banner if user has items */}
          {preOrderCart.length > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 bg-[#B08D57]/15 border border-[#B08D57] text-[#1E1B18] px-4 py-1.5 rounded-full text-xs">
              <CalendarDays className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>
                {language === 'es' 
                  ? `${preOrderCart.length} plato(s) en tu pre-pedido de mesa.` 
                  : `${preOrderCart.length} item(s) in your table reservation pre-order.`}
              </span>
              <button
                onClick={() => navigateTo('reservations')}
                className="underline font-bold text-[#B52A2A] hover:text-black ml-1"
              >
                {language === 'es' ? 'Ver Reserva' : 'View Reservation'}
              </button>
            </div>
          )}
        </div>

        {/* Search, Filter & Quick Tools */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-stone-200/80 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'es' ? 'Buscar plato, ingrediente o alérgeno...' : 'Search dish, ingredient or allergen...'}
                className="w-full pl-10 pr-8 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#B08D57] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2 px-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800 font-medium focus:outline-none focus:border-[#B08D57]"
              >
                <option value="recommended">{tr.menu.sort.recommended}</option>
                <option value="price_asc">{tr.menu.sort.priceAsc}</option>
                <option value="price_desc">{tr.menu.sort.priceDesc}</option>
              </select>
            </div>
          </div>

          {/* Quick Dietary Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            <span className="text-[11px] font-bold text-stone-400 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3 h-3" />
              <span>{language === 'es' ? 'Filtros:' : 'Filters:'}</span>
            </span>
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeFilter === f.id
                    ? 'bg-[#1E1B18] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Category Anchor Bar (When on Menu Tab) */}
        {topTab === 'menu' && !searchQuery && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {displayCategories.map((cat) => {
              const catName = language === 'es' ? cat.nameEs : cat.nameEn;
              return (
                <a
                  key={cat.id}
                  href={`#category-${cat.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setExpandedCategories(prev => ({ ...prev, [cat.id]: true }));
                    const el = document.getElementById(`category-${cat.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#EAE2D5] text-[#2A2421] text-xs font-semibold whitespace-nowrap hover:bg-[#DBCDBB] border border-[#D5C4AF] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {getCategoryIcon(cat.id)}
                  <span>{catName}</span>
                </a>
              );
            })}
          </div>
        )}

        {/* ========================================================= */}
        {/* CATEGORY ACCORDION SECTIONS (Matching Authentic Screenshots) */}
        {/* ========================================================= */}
        <div className="space-y-8">
          {displayCategories.map((cat) => {
            const catItems = filteredItems.filter(item => item.category === cat.id);
            if (catItems.length === 0 && searchQuery) return null;

            const isExpanded = expandedCategories[cat.id] ?? true;
            const catTitle = language === 'es' ? cat.nameEs : cat.nameEn;

            return (
              <div 
                key={cat.id} 
                id={`category-${cat.id}`}
                className="scroll-mt-36"
              >
                {/* Category Header Row (Authentic uppercase beige-tan styling) */}
                <div 
                  onClick={() => toggleCategory(cat.id)}
                  className="flex items-center justify-between py-3 cursor-pointer group border-b border-[#D8C7B2] select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-sm sm:text-base font-bold tracking-widest text-[#9C8267] group-hover:text-[#5B4632] uppercase transition-colors">
                      {catTitle}
                    </span>
                    <span className="text-xs text-stone-400 font-normal">
                      ({catItems.length})
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-[#EFE6D8] group-hover:bg-[#E2D4C0] text-[#7A624A] flex items-center justify-center transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {/* Specific Category Banners (Josper notice & Artemisa Instagram notice) */}
                {isExpanded && cat.id === 'meats' && (
                  <div className="my-4 p-4 rounded-xl bg-[#F0E6D8] border border-[#D5C4AF] text-stone-800 text-xs sm:text-sm leading-relaxed flex items-start gap-3 shadow-xs">
                    <div className="w-8 h-8 rounded-lg bg-[#B52A2A]/20 border border-[#B52A2A]/40 flex items-center justify-center text-[#B52A2A] shrink-0 mt-0.5">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 uppercase tracking-wide text-xs">
                        {language === 'es'
                          ? 'TODAS NUESTRAS CARNES SE COCINAN EN HORNO JOSPER DE CARBÓN DE ENCINA Y VAN ACOMPAÑADAS DE PATATAS FRITAS CASERAS Y PIMIENTOS DE PADRÓN'
                          : 'ALL OUR MEATS ARE COOKED ON A JOSPER OAK CHARCOAL GRILL AND ARE ACCOMPANIED BY HOMEMADE FRIES AND PADRÓN PEPPERS'}
                      </p>
                      <p className="text-[#8B5E3C] text-[11px] mt-1 italic font-medium">
                        {language === 'es'
                          ? '(LA SALSA QUE ACOMPAÑA LAS CARNES CONTIENE MOSTAZA Y HUEVO)'
                          : '(THE SAUCE THAT ACCOMPANIES THE MEATS CONTAINS MUSTARD AND EGG)'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Category Dishes Grid (3-column layout matching screenshots) */}
                {isExpanded && (
                  cat.id === 'beers' ? (
                    <div className="pt-4">
                      <BeerMenuShowcase beers={catItems} />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                      {catItems.map((dish) => {
                        const name = language === 'es' ? dish.name : (dish.nameEn || dish.name);
                        const desc = language === 'es' ? dish.description : (dish.descriptionEn || dish.description);
                        const hasOptions = dish.supportsMeatDoneness || dish.supportsSpiceLevel || (dish.minQuantity && dish.minQuantity > 1);

                        return (
                          <div
                            key={dish.id}
                            className="bg-[#EFE6D8]/60 hover:bg-[#EFE6D8] rounded-2xl p-4 border border-[#E0D3BF] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative"
                          >
                            <div>
                              {/* Top row: Thumbnail image (if available) + Name */}
                              <div className="flex gap-3 items-start">
                                {dish.image && (
                                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-black/5 shadow-xs">
                                    <img
                                      src={getDishImage(dish.id, dish.image)}
                                      alt={name}
                                      referrerPolicy="no-referrer"
                                      onError={(e) => handleImageError(e, dish.category)}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-sans text-xs sm:text-sm font-bold text-[#2A2421] uppercase tracking-wide leading-tight group-hover:text-[#8B2500] transition-colors">
                                    {name}
                                  </h3>
                                  {desc && (
                                    <p className="text-[11px] text-stone-600 mt-1 leading-normal line-clamp-3">
                                      {desc}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Allergens & Dietary Indicators */}
                              {dish.allergens && dish.allergens.length > 0 && (
                                <div className="mt-2.5 pt-2 border-t border-[#E2D5C1] flex items-center gap-1 text-[10px] text-stone-500">
                                  <Info className="w-3 h-3 text-stone-400 shrink-0" />
                                  <span className="truncate">{dish.allergens.join(', ')}</span>
                                </div>
                              )}
                            </div>

                            {/* Bottom Row: Price + Add Button */}
                            <div className="mt-3 pt-2 border-t border-[#E2D5C1] flex items-center justify-between">
                              <div>
                                <span className="font-bold text-xs sm:text-sm text-[#2A2421]">
                                  {dish.priceDetails?.includes('/') || dish.priceDetails?.includes('Media')
                                    ? dish.priceDetails
                                    : `${dish.price.toFixed(2).replace('.', ',')}€${dish.priceDetails?.includes('/ud') ? '/ud' : ''}`}
                                </span>
                              </div>

                              <button
                                onClick={() => {
                                  if (hasOptions) {
                                    openCustomizationModal(dish, 'cart');
                                  } else {
                                    addToCart(dish);
                                  }
                                }}
                                className="w-8 h-8 rounded-lg bg-[#D6C5AF] hover:bg-[#B52A2A] text-stone-800 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                                title="Añadir a pedido"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                )}

                {/* Artemisa Homemade Cakes Instagram Box under Desserts Category */}
                {isExpanded && cat.id === 'desserts' && (
                  <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#EBE0D0] border border-[#D5C4AF] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-white p-1 border border-[#B08D57] flex items-center justify-center shrink-0 shadow-sm">
                        <Cake className="w-7 h-7 text-[#B52A2A]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2A2421] block">
                          {language === 'es' ? 'NUESTRAS TARTAS CASERAS ESTÁN DISPONIBLES POR ENCARGO' : 'NOW OUR HOMEMADE CAKES ARE AVAILABLE TO ORDER'}
                        </span>
                        <p className="text-xs text-stone-600 mt-0.5">
                          #artemisahomemadecakes {language === 'es' ? '• Elaboradas artesanalmente a diario' : '• Daily handmade artisan pastries'}
                        </p>
                      </div>
                    </div>

                    <a
                      href={RESTAURANT_INFO.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#1E1B18] hover:bg-[#B52A2A] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors whitespace-nowrap"
                    >
                      <Instagram className="w-4 h-4 text-pink-400" />
                      <span>{language === 'es' ? 'Síguenos en Instagram' : 'Follow us on Instagram'}</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty Search Result */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-white/60 rounded-2xl p-6 border border-stone-200">
            <div className="w-12 h-12 rounded-full bg-stone-200 mx-auto flex items-center justify-center text-stone-500">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-800">{tr.menu.emptySearch}</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="py-2 px-4 rounded-xl bg-[#1E1B18] text-white text-xs font-semibold hover:bg-stone-800"
            >
              {tr.menu.resetFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
