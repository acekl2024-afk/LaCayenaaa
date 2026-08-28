import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  RESTAURANT_INFO, 
  RESTAURANT_IMAGES, 
  EXPERIENCE_CARDS, 
  INITIAL_MENU_ITEMS, 
  GALLERY_ITEMS 
} from '../data/restaurantData';
import { BLOG_POSTS } from '../data/blogData';
import { GoogleReviewsSection } from '../components/GoogleReviewsSection';
import { TiltCard3D } from '../components/TiltCard3D';
import { JosperEmbers3D } from '../components/JosperEmbers3D';
import { 
  CalendarDays, 
  ShoppingBag, 
  UtensilsCrossed, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink,
  CheckCircle2,
  ChevronDown,
  Plus,
  Navigation,
  Heart,
  Users,
  BookOpen
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    language, 
    navigateTo, 
    setSelectedBlogPostSlug,
    openCustomizationModal, 
    addToCart,
    setQuickReservationState,
    getPlacementMedia,
    getDishImage,
    mediaList,
    tr 
  } = useApp();

  // Dynamic media resolution
  const heroMediaUrl = getPlacementMedia('Home Hero', RESTAURANT_IMAGES.josperGrill);
  const heroMediaItem = mediaList.find(m => m.url === heroMediaUrl);
  const isHeroVideo = heroMediaItem?.mediaType === 'video';

  const teamMediaUrl = getPlacementMedia('About Section', RESTAURANT_IMAGES.team);
  const josperMediaUrl = getPlacementMedia('Josper Grill Section', RESTAURANT_IMAGES.josperGrill);

  // Quick reservation bar state
  const [quickGuests, setQuickGuests] = useState<number>(2);
  const [quickDate, setQuickDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [quickTime, setQuickTime] = useState<string>('21:00');

  const featuredDishes = INITIAL_MENU_ITEMS.filter((item) => item.featured).slice(0, 8);
  const gallerySubset = GALLERY_ITEMS.slice(0, 6);

  const handleQuickReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickReservationState({
      guests: quickGuests,
      date: quickDate,
      time: quickTime
    });
    navigateTo('reservations');
  };

  return (
    <div id="home-page" className="min-h-screen bg-[#F5F0E8] text-[#1E1B18]">
      {/* 1. CINEMATIC HERO SECTION */}
      <section 
        id="hero-section"
        className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center bg-[#151311] overflow-hidden pt-36 sm:pt-44 md:pt-48 pb-20 sm:pb-28 px-4 sm:px-6"
      >
        {/* Hero Background Image / Video with Layered Charcoal Gradient */}
        <div className="absolute inset-0 z-0">
          {isHeroVideo ? (
            <video
              src={heroMediaUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover object-center opacity-45 scale-105"
            />
          ) : (
            <img
              src={heroMediaUrl}
              alt="Asador La Cayena Josper Oak Charcoal Grill"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-45 scale-105 transform transition-transform duration-1000"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18] via-[#1E1B18]/75 to-[#1E1B18]/65" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#151311]/40 to-[#151311]/90" />
        </div>

        {/* Floating Ember Particles & 3D Embers Canvas */}
        <JosperEmbers3D intensity="medium" className="z-1 opacity-70" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6">
          {/* Logo Badge with Original Logo Emblem on White Background */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 border border-[#B08D57]/40 backdrop-blur-md mb-6 animate-fadeIn shadow-2xl">
            <div className="h-9 w-auto flex items-center justify-center shrink-0 bg-white px-2 py-0.5 rounded-lg shadow-sm border border-stone-200">
              <img
                src={RESTAURANT_IMAGES.logo}
                alt="La Cayena Emblem"
                referrerPolicy="no-referrer"
                className="h-8 w-auto max-w-[110px] object-contain"
              />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold">
              {tr.hero.tagline}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#F5F0E8] tracking-tight leading-[1.1] mb-6">
            {tr.hero.headline}
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#F5F0E8]/85 font-sans font-normal leading-relaxed mb-10">
            {tr.hero.subheading}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 max-w-md mx-auto">
            <button
              id="hero-reserve-cta"
              onClick={() => navigateTo('reservations')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#B52A2A] to-[#C55A2A] hover:from-[#9c2424] hover:to-[#b04f24] text-white font-medium text-base shadow-2xl shadow-[#B52A2A]/40 flex items-center justify-center gap-2.5 transition-all transform active:scale-95 border border-[#B08D57]/30"
            >
              <CalendarDays className="w-5 h-5" />
              <span>{tr.hero.reserveBtn}</span>
            </button>

            <button
              id="hero-order-cta"
              onClick={() => navigateTo('order')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1E1B18]/80 hover:bg-[#1E1B18] text-[#F5F0E8] font-medium text-base border border-[#B08D57]/50 hover:border-[#B08D57] flex items-center justify-center gap-2.5 transition-all backdrop-blur-sm shadow-xl"
            >
              <ShoppingBag className="w-5 h-5 text-[#B08D57]" />
              <span>{tr.hero.orderBtn}</span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-14 sm:mt-16 flex flex-col items-center gap-2 text-stone-400 text-xs">
            <span className="tracking-widest uppercase text-[11px] font-medium text-[#B08D57]/80">
              {tr.hero.scrollDown}
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#B08D57]" />
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTION BAR (Floating / High-Priority Cards) */}
      <section id="quick-action-bar" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Reserve */}
          <button
            onClick={() => navigateTo('reservations')}
            className="bg-[#1E1B18] text-left p-6 rounded-2xl border border-[#B08D57]/40 shadow-2xl hover:border-[#B08D57] transition-all group flex items-start gap-4 hover:-translate-y-1 duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#B52A2A] to-[#C55A2A] flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#B08D57] transition-colors">
                {tr.quickActions.reserve}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                {tr.quickActions.reserveSub}
              </p>
            </div>
          </button>

          {/* Card 2: Order Online */}
          <button
            onClick={() => navigateTo('order')}
            className="bg-[#1E1B18] text-left p-6 rounded-2xl border border-[#B08D57]/40 shadow-2xl hover:border-[#B08D57] transition-all group flex items-start gap-4 hover:-translate-y-1 duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#B08D57] to-[#C55A2A] flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#B08D57] transition-colors">
                {tr.quickActions.order}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                {tr.quickActions.orderSub}
              </p>
            </div>
          </button>

          {/* Card 3: View Menu */}
          <button
            onClick={() => navigateTo('menu')}
            className="bg-[#1E1B18] text-left p-6 rounded-2xl border border-[#B08D57]/40 shadow-2xl hover:border-[#B08D57] transition-all group flex items-start gap-4 hover:-translate-y-1 duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2B211C] border border-[#B08D57]/30 flex items-center justify-center text-[#B08D57] shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#B08D57] transition-colors">
                {tr.quickActions.menu}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                {tr.quickActions.menuSub}
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* 3. RESTAURANT INTRODUCTION & TEAM SPOTLIGHT */}
      <section id="restaurant-intro" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#B52A2A]/10 text-[#B52A2A] text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>{tr.intro.badge}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1B18] tracking-tight leading-tight">
              {tr.intro.headline}
            </h2>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
              {tr.intro.p1}
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {tr.intro.p2}
            </p>

            {/* Highlights bullet list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {tr.intro.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#B52A2A] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E1B18] hover:bg-[#2B211C] text-white text-xs sm:text-sm font-semibold transition-colors shadow-md border border-[#B08D57]/30"
              >
                <Users className="w-4 h-4 text-[#B08D57]" />
                <span>{language === 'es' ? 'Conoce a nuestro equipo y asador' : 'Meet our team & story'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Visual Image Composition with Team Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#B08D57]/30 bg-[#1E1B18]">
              <img
                src={teamMediaUrl || RESTAURANT_IMAGES.team}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = RESTAURANT_IMAGES.team; }}
                alt="Familia y Equipo de Asador La Cayena"
                loading="eager"
                referrerPolicy="no-referrer"
                className="w-full h-[430px] sm:h-[470px] object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex items-end p-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#B52A2A] text-white text-[11px] font-bold uppercase tracking-wider mb-1.5 shadow-md">
                    <Users className="w-3 h-3" />
                    <span>{language === 'es' ? 'Nuestra Familia y Equipo' : 'Our Family & Team'}</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    {language === 'es' ? 'El corazón y alma de La Cayena' : 'The heart and soul of La Cayena'}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    {language === 'es' 
                      ? 'Maestros asadores, pizzeros artesanos y equipo de sala dedicados a hacerte sentir en casa.' 
                      : 'Master grillers, artisan pizza makers and dining crew dedicated to making you feel at home.'}
                  </p>
                </div>
              </div>
            </div>
            {/* Secondary overlapping photo badge */}
            <div className="absolute -bottom-6 -left-6 z-20 hidden sm:flex items-center gap-3.5 bg-[#1E1B18] text-white p-4 rounded-2xl shadow-2xl border border-[#B08D57]/40 max-w-xs">
              <div className="w-11 h-11 rounded-xl bg-[#B52A2A]/20 border border-[#B52A2A] flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6 text-[#C55A2A]" />
              </div>
              <div className="text-xs">
                <span className="block font-serif font-bold text-sm text-[#F5F0E8]">Brasa & Hospitalidad</span>
                <span className="text-stone-400 text-[11px]">Pasión, cercanía y tradición</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE CARDS */}
      <section id="experience-cards" className="py-16 bg-[#2B211C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B08D57]">
              {tr.experiences.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2">
              {tr.experiences.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERIENCE_CARDS.map((card) => {
              const title = language === 'es' ? card.titleEs : card.titleEn;
              const desc = language === 'es' ? card.descriptionEs : card.descriptionEn;
              return (
                <TiltCard3D key={card.id} maxTilt={10} scale={1.03} className="h-full">
                  <div
                    className="bg-[#1E1B18] rounded-2xl overflow-hidden border border-[#B08D57]/20 shadow-xl group hover:border-[#B08D57] transition-all flex flex-col h-full"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={card.image}
                        alt={title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18] via-transparent to-transparent" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#B08D57] transition-colors">
                          {title}
                        </h3>
                        <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURED DISHES SECTION */}
      <section id="featured-dishes" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B52A2A]">
              {tr.featured.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1B18] mt-1">
              {tr.featured.headline}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-xl">
              {tr.featured.subheading}
            </p>
          </div>
          <button
            onClick={() => navigateTo('menu')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E1B18] hover:bg-[#2B211C] text-white text-sm font-semibold transition-colors shrink-0 shadow-md border border-[#B08D57]/30"
          >
            <span>{tr.featured.viewFullMenu}</span>
            <ArrowRight className="w-4 h-4 text-[#B08D57]" />
          </button>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((dish) => {
            const name = language === 'es' ? dish.name : (dish.nameEn || dish.name);
            const desc = language === 'es' ? dish.description : (dish.descriptionEn || dish.description);
            const hasOptions = dish.supportsMeatDoneness || dish.supportsSpiceLevel || (dish.minQuantity && dish.minQuantity > 1);

            return (
              <TiltCard3D key={dish.id} maxTilt={8} scale={1.02} className="h-full">
                <div
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group h-full justify-between"
                >
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={getDishImage(dish.id, dish.image)}
                      alt={name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {dish.popular && (
                      <span className="absolute top-3 left-3 bg-[#B52A2A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                        {language === 'es' ? 'Popular' : 'Popular'}
                      </span>
                    )}
                    {dish.glutenFree && (
                      <span className="absolute top-3 right-3 bg-[#1E1B18]/80 backdrop-blur-xs text-[#B08D57] text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border border-[#B08D57]/40">
                        Sin Gluten
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif text-lg font-bold text-[#1E1B18] group-hover:text-[#B52A2A] transition-colors leading-snug">
                          {name}
                        </h3>
                      </div>
                      <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-lg text-[#1E1B18]">
                          €{dish.price.toFixed(2)}
                        </span>
                        {dish.priceDetails && (
                          <span className="block text-[10px] text-stone-500 font-medium">
                            {dish.priceDetails}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          if (hasOptions) {
                            openCustomizationModal(dish, 'cart');
                          } else {
                            addToCart(dish);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E1B18] hover:bg-[#B52A2A] text-white text-xs font-semibold shadow-md transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{hasOptions ? tr.featured.customize : tr.featured.addToOrder}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </section>

      {/* 6. DRAMATIC JOSPER GRILL FEATURE SECTION */}
      <section id="josper-feature" className="py-24 bg-[#151311] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={josperMediaUrl}
            alt="Josper Oak Charcoal Grill embers"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#151311] via-[#151311]/90 to-transparent" />
        </div>

        {/* 3D Dynamic Fire Embers Overlay */}
        <JosperEmbers3D intensity="high" className="opacity-80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#B52A2A]/20 text-[#C55A2A] border border-[#B52A2A]/40 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>{tr.josperSection.badge}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {tr.josperSection.headline}
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {tr.josperSection.p1}
            </p>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed italic border-l-2 border-[#B08D57] pl-4 py-1">
              {tr.josperSection.quote}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {tr.josperSection.features.map((feat, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="block font-serif font-bold text-sm text-[#B08D57]">{feat.title}</span>
                  <span className="block text-xs text-stone-400 mt-1">{feat.desc}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('menu')}
                className="px-6 py-3 rounded-xl bg-[#B52A2A] hover:bg-[#9c2424] text-white font-semibold text-sm transition-all shadow-lg shadow-[#B52A2A]/30"
              >
                {language === 'es' ? 'Explorar cortes de brasa' : 'Explore Josper cuts'}
              </button>
              <a
                href={RESTAURANT_INFO.officialDigitalMenuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20"
              >
                <span>{language === 'es' ? 'Ver Carta Digital Oficial' : 'Official Digital Menu'}</span>
                <ExternalLink className="w-4 h-4 text-[#B08D57]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RESERVATION CTA WIDGET */}
      <section id="reservation-cta-widget" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E1B18] text-white rounded-3xl p-8 sm:p-12 border border-[#B08D57]/40 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B08D57]">
              {tr.reservationBanner.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2">
              {tr.reservationBanner.headline}
            </h2>
            <p className="text-sm sm:text-base text-stone-300 mt-3">
              {tr.reservationBanner.subheading}
            </p>

            {/* Interactive Availability Checker Form */}
            <form onSubmit={handleQuickReservationSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Guests */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-400">
                  {tr.reservationBanner.guestsLabel}
                </label>
                <select
                  value={quickGuests}
                  onChange={(e) => setQuickGuests(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#B08D57]"
                >
                  <option value={1} className="bg-[#1E1B18]">1 {language === 'es' ? 'Persona' : 'Guest'}</option>
                  <option value={2} className="bg-[#1E1B18]">2 {language === 'es' ? 'Personas' : 'Guests'}</option>
                  <option value={3} className="bg-[#1E1B18]">3 {language === 'es' ? 'Personas' : 'Guests'}</option>
                  <option value={4} className="bg-[#1E1B18]">4 {language === 'es' ? 'Personas' : 'Guests'}</option>
                  <option value={5} className="bg-[#1E1B18]">5 {language === 'es' ? 'Personas' : 'Guests'}</option>
                  <option value={6} className="bg-[#1E1B18]">6 {language === 'es' ? 'Personas' : 'Guests'}</option>
                  <option value={7} className="bg-[#1E1B18]">7 {language === 'es' ? 'Personas' : 'Guests'}</option>
                  <option value={8} className="bg-[#1E1B18]">8 {language === 'es' ? 'Personas' : 'Guests'}</option>
                  <option value={9} className="bg-[#1E1B18]">9+ {language === 'es' ? 'Grupo grande' : 'Large group'}</option>
                </select>
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-400">
                  {tr.reservationBanner.dateLabel}
                </label>
                <input
                  type="date"
                  value={quickDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setQuickDate(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#B08D57]"
                />
              </div>

              {/* Time */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-400">
                  {tr.reservationBanner.timeLabel}
                </label>
                <select
                  value={quickTime}
                  onChange={(e) => setQuickTime(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#B08D57]"
                >
                  <option value="13:30" className="bg-[#1E1B18]">13:30 (Almuerzo)</option>
                  <option value="14:00" className="bg-[#1E1B18]">14:00 (Almuerzo)</option>
                  <option value="14:30" className="bg-[#1E1B18]">14:30 (Almuerzo)</option>
                  <option value="20:30" className="bg-[#1E1B18]">20:30 (Cena)</option>
                  <option value="21:00" className="bg-[#1E1B18]">21:00 (Cena)</option>
                  <option value="21:30" className="bg-[#1E1B18]">21:30 (Cena)</option>
                  <option value="22:00" className="bg-[#1E1B18]">22:00 (Cena)</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B52A2A] to-[#C55A2A] hover:from-[#9c2424] hover:to-[#b04f24] text-white font-medium text-sm shadow-xl transition-all"
                >
                  {tr.reservationBanner.checkAvailability}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 8. GOOGLE REVIEWS & GOOGLE BUSINESS PROFILE SECTION */}
      <GoogleReviewsSection />

      {/* 9. GALLERY PREVIEW */}
      <section id="gallery-preview" className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B52A2A]">
                {tr.galleryPreview.badge}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1B18] mt-1">
                {tr.galleryPreview.headline}
              </h2>
            </div>
            <button
              onClick={() => navigateTo('gallery')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#B52A2A] hover:text-[#C55A2A] transition-colors"
            >
              <span>{tr.galleryPreview.viewAll}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {gallerySubset.map((item) => (
              <div
                key={item.id}
                onClick={() => navigateTo('gallery')}
                className="relative h-64 rounded-2xl overflow-hidden shadow-md group cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={language === 'es' ? item.titleEs : item.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="font-serif text-sm font-bold text-white">
                    {language === 'es' ? item.titleEs : item.titleEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CULINARY BLOG & GRANADA GUIDE TEASER */}
      <section id="blog-teaser-section" className="py-20 bg-[#FDFBF7] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B52A2A]/10 text-[#B52A2A] text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Blog Gastronómico & Guías' : 'Culinary Blog & Guides'}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1B18]">
                {language === 'es' ? 'Secretos del Fuego, Carnes & Granada' : 'Secrets of the Fire, Meats & Granada'}
              </h2>
            </div>
            <button
              onClick={() => navigateTo('blog')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#B52A2A] hover:text-[#962222] transition-colors self-start sm:self-auto"
            >
              <span>{language === 'es' ? 'Ver todos los artículos' : 'View all articles'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => {
              const title = language === 'es' ? post.titleEs : post.titleEn;
              const excerpt = language === 'es' ? post.excerptEs : post.excerptEn;
              const catLabel = language === 'es' ? post.categoryLabelEs : post.categoryLabelEn;

              return (
                <article
                  key={post.id}
                  onClick={() => {
                    if (setSelectedBlogPostSlug) {
                      setSelectedBlogPostSlug(post.slug);
                    }
                    navigateTo('blog-post');
                  }}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="h-48 overflow-hidden bg-stone-900 relative">
                      <img
                        src={post.coverImage}
                        alt={title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[#1E1B18]/85 text-[#F5F0E8] text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                          {catLabel}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-stone-500">
                        <span>{post.publishedDate}</span>
                        <span>•</span>
                        <span>{post.readingTimeMinutes} min {language === 'es' ? 'lectura' : 'read'}</span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-[#1E1B18] group-hover:text-[#B52A2A] transition-colors leading-snug line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#B52A2A]">
                    <span>{language === 'es' ? 'Leer artículo' : 'Read article'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. LOCATION & INFO SECTION */}
      <section id="location-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xl">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B52A2A]">
              {language === 'es' ? 'DÓNDE ENCONTRARNOS' : 'WHERE TO FIND US'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1B18]">
              {RESTAURANT_INFO.name}
            </h2>
            <div className="space-y-4 text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B52A2A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#1E1B18]">{RESTAURANT_INFO.address}</span>
                  <span className="text-xs text-stone-500">La Zubia, Granada (Fácil aparcamiento y terraza)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#B52A2A] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="font-medium hover:text-[#B52A2A] transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#B52A2A] shrink-0" />
                <span>Martes a Sábado (Cenas 20:30–23:30) • Miérc a Dom (Almuerzos 13:00–16:00)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
              <a
                href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#B52A2A] hover:bg-[#9c2424] text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-[#B52A2A]/25"
              >
                <Navigation className="w-4 h-4" />
                <span>{language === 'es' ? 'GET DIRECTIONS / CÓMO LLEGAR' : 'GET DIRECTIONS'}</span>
              </a>

              <a
                href={RESTAURANT_INFO.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#1E1B18] hover:bg-[#2B211C] text-white text-xs sm:text-sm font-semibold transition-colors shadow-md"
              >
                <span>Google Business Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#B08D57]" />
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#F5F0E8] text-[#1E1B18] hover:bg-stone-200 text-xs sm:text-sm font-semibold border border-stone-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#B52A2A]" />
                <span>{language === 'es' ? 'Llamar al Asador' : 'Call Us'}</span>
              </a>
            </div>
          </div>

          {/* Map card with visual representation */}
          <div className="lg:col-span-6 h-80 rounded-2xl overflow-hidden border border-stone-200 shadow-inner relative bg-stone-200">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
              alt="Map area near La Zubia, Granada"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1E1B18]/30 backdrop-blur-[1px] flex items-center justify-center p-4">
              <div className="bg-white/95 text-[#1E1B18] p-6 rounded-2xl shadow-2xl max-w-xs text-center border border-[#B08D57]/40">
                <div className="h-14 w-auto flex items-center justify-center mx-auto mb-3">
                  <img
                    src={RESTAURANT_IMAGES.logo}
                    alt="Asador La Cayena"
                    referrerPolicy="no-referrer"
                    className="h-14 w-auto max-w-[150px] object-contain rounded-lg shadow-sm"
                  />
                </div>
                <h4 className="font-serif font-bold text-base text-[#1E1B18]">Asador La Cayena</h4>
                <p className="text-xs text-stone-600 mt-1">{RESTAURANT_INFO.street}, La Zubia</p>
                <a
                  href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#B52A2A] hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Abrir indicaciones en Google Maps →' : 'Get directions in Google Maps →'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL HOMEPAGE CTA */}
      <section id="final-cta" className="py-24 bg-[#1E1B18] text-white text-center px-4 relative overflow-hidden border-t border-[#B08D57]/30">
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#B52A2A] to-[#C55A2A] mx-auto flex items-center justify-center border border-[#B08D57]/40 shadow-xl">
            <Flame className="w-6 h-6 text-white" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F5F0E8]">
            {tr.finalCta.headline}
          </h2>

          <p className="text-base sm:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
            {tr.finalCta.subtext}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => navigateTo('reservations')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#B52A2A] hover:bg-[#9c2424] text-white font-medium text-base shadow-xl transition-all"
            >
              {tr.finalCta.reserveBtn}
            </button>

            <button
              onClick={() => navigateTo('order')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-[#F5F0E8] font-medium text-base border border-white/20 transition-all"
            >
              {tr.finalCta.orderBtn}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
