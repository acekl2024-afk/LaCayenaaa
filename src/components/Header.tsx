import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO, RESTAURANT_IMAGES } from '../data/restaurantData';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  CalendarDays,
  UtensilsCrossed,
  Globe,
  Sparkles,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  MapPin
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    currentPage, 
    navigateTo, 
    cartCount, 
    cartTotal,
    setIsCartOpen,
    setIsMediaLibraryOpen,
    tr 
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Removed duplicate 'reservations' link from navLinks as we have the prominent 'Reserve a Table' CTA
  const navLinks = [
    { id: 'home', label: tr.nav.home },
    { id: 'menu', label: tr.nav.menu },
    { id: 'order', label: tr.nav.order },
    { id: 'blog', label: language === 'es' ? 'Blog' : 'Blog' },
    { id: 'gallery', label: tr.nav.gallery },
    { id: 'about', label: tr.nav.about },
    { id: 'contact', label: tr.nav.contact }
  ];

  const handleNavClick = (pageId: string) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  const isHeroPage = currentPage === 'home';

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || !isHeroPage
            ? 'bg-[#1E1B18]/95 backdrop-blur-md border-b border-[#B08D57]/20 shadow-xl'
            : 'bg-gradient-to-b from-[#151311]/98 via-[#1E1B18]/90 to-transparent'
        }`}
      >
        {/* Top Info & Utility Bar */}
        <div 
          id="header-top-bar"
          className="bg-[#12100E] border-b border-white/5 py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-stone-300 transition-colors"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
            {/* Left: Contact, WhatsApp & Email */}
            <div className="flex items-center flex-wrap gap-3 sm:gap-5">
              {/* Phone Call */}
              <a
                id="topbar-phone-link"
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="flex items-center gap-1.5 text-[#F5F0E8] hover:text-[#B08D57] transition-colors"
                title={language === 'es' ? 'Llamar al restaurante' : 'Call restaurant'}
              >
                <Phone className="w-3.5 h-3.5 text-[#B08D57]" />
                <span className="font-medium tracking-wide">{RESTAURANT_INFO.phone}</span>
              </a>

              {/* WhatsApp Direct */}
              <a
                id="topbar-whatsapp-link"
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  language === 'es' 
                    ? '¡Hola Asador La Cayena! Me gustaría hacer una consulta / reserva.' 
                    : 'Hello Asador La Cayena! I would like to make an inquiry / reservation.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                title={language === 'es' ? 'Escribir por WhatsApp' : 'Chat on WhatsApp'}
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xs:inline">WhatsApp</span>
              </a>

              {/* Email */}
              <a
                id="topbar-email-link"
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="hidden md:flex items-center gap-1.5 text-stone-400 hover:text-[#F5F0E8] transition-colors"
                title="Email Asador La Cayena"
              >
                <Mail className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>{RESTAURANT_INFO.email}</span>
              </a>

              {/* Location pill */}
              <button
                onClick={() => handleNavClick('contact')}
                className="hidden lg:flex items-center gap-1 text-stone-400 hover:text-[#B08D57] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>La Zubia, Granada</span>
              </button>
            </div>

            {/* Right: Social Media, Media Hub, Language & Cart */}
            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              {/* Social Links */}
              <div className="flex items-center gap-2 text-stone-400">
                <a
                  id="topbar-instagram"
                  href={RESTAURANT_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-1 rounded hover:text-pink-400 hover:bg-white/5 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  id="topbar-facebook"
                  href={RESTAURANT_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-1 rounded hover:text-blue-400 hover:bg-white/5 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  id="topbar-maps"
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps Location"
                  className="p-1 rounded hover:text-[#B08D57] hover:bg-white/5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Subtle divider */}
              <div className="h-3 w-px bg-white/20" />

              {/* Media Library Hub Button */}
              <button
                id="topbar-media-hub-btn"
                onClick={() => setIsMediaLibraryOpen(true)}
                title={language === 'es' ? 'Biblioteca de Medios & Subida' : 'Media Library & Uploads'}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#B08D57]/20 hover:bg-[#B08D57] hover:text-black text-[#B08D57] border border-[#B08D57]/40 text-[11px] font-semibold transition-all shadow-xs group"
              >
                <Sparkles className="w-3 h-3 text-[#B08D57] group-hover:text-black transition-colors" />
                <span>Media Hub</span>
              </button>

              {/* Language Switcher */}
              <div className="flex items-center bg-black/50 rounded-md p-0.5 border border-[#B08D57]/30 text-[11px]">
                <button
                  id="lang-btn-es"
                  onClick={() => setLanguage('es')}
                  className={`px-1.5 py-0.5 rounded font-semibold transition-all ${
                    language === 'es'
                      ? 'bg-[#B52A2A] text-white shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  ES
                </button>
                <button
                  id="lang-btn-en"
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-0.5 rounded font-semibold transition-all ${
                    language === 'en'
                      ? 'bg-[#B52A2A] text-white shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Cart Button with Total & Counter in Top Bar */}
              <button
                id="topbar-cart-btn"
                onClick={() => setIsCartOpen(true)}
                aria-label={tr.nav.cart}
                className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#B52A2A]/20 hover:bg-[#B52A2A]/40 text-[#F5F0E8] border border-[#B52A2A]/40 hover:border-[#B52A2A] transition-all focus:outline-none"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#F5F0E8]" />
                <span className="text-[11px] font-semibold">
                  {cartCount > 0 ? `${cartTotal.toFixed(2)}€` : (language === 'es' ? 'Cesta' : 'Cart')}
                </span>
                {cartCount > 0 && (
                  <span className="w-4 h-4 bg-[#B52A2A] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between">
          {/* Authentic Original Logo with White Background in Main Header */}
          <button
            id="header-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none py-1"
          >
            <div className="h-12 sm:h-14 w-auto flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300 bg-white px-2.5 py-1 rounded-xl shadow-md border border-stone-200">
              <img
                src={RESTAURANT_IMAGES.logo}
                alt="Asador La Cayena Logo Original"
                referrerPolicy="no-referrer"
                className="h-10 sm:h-12 w-auto max-w-[140px] sm:max-w-[180px] object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-wider text-[#F5F0E8] group-hover:text-[#B08D57] transition-colors leading-none">
                LA CAYENA
              </span>
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-sans font-semibold mt-1">
                ASADOR • PIZZERÍA
              </span>
            </div>
          </button>

          {/* Desktop Navigation - Clean, spacious & no duplicate reservations */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#B08D57] bg-[#B08D57]/15 font-semibold border-b-2 border-[#B08D57]'
                      : 'text-[#F5F0E8]/90 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Primary Action Button - Reservar Mesa CTA */}
            <button
              id="header-reserve-btn"
              onClick={() => handleNavClick('reservations')}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B52A2A] to-[#C55A2A] hover:from-[#9c2424] hover:to-[#b04f24] text-white font-semibold text-sm shadow-lg shadow-[#B52A2A]/25 transition-all duration-200 border border-[#B08D57]/40 transform hover:-translate-y-0.5 active:scale-95"
            >
              <CalendarDays className="w-4 h-4" />
              <span>{tr.nav.reserveTable}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/10 text-[#F5F0E8] border border-white/15 hover:bg-white/15 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer"
          className="fixed inset-0 z-50 lg:hidden bg-[#151311]/98 backdrop-blur-2xl flex flex-col pt-24 pb-8 px-6 overflow-y-auto animate-fadeIn"
        >
          <div className="flex justify-between items-center pb-6 border-b border-[#B08D57]/20">
            <div className="flex items-center gap-3">
              <div className="h-12 w-auto flex items-center justify-center shrink-0 bg-white px-2.5 py-1 rounded-xl shadow-md border border-stone-200">
                <img
                  src={RESTAURANT_IMAGES.logo}
                  alt="Asador La Cayena Logo"
                  referrerPolicy="no-referrer"
                  className="h-10 w-auto max-w-[130px] object-contain"
                />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-[#F5F0E8]">LA CAYENA</span>
                <span className="text-[10px] uppercase tracking-widest text-[#B08D57]">ASADOR • PIZZERÍA</span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white/10 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-2 py-6">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-4 py-3.5 rounded-xl font-medium text-lg flex items-center justify-between transition-colors ${
                    isActive
                      ? 'text-[#B08D57] bg-[#B08D57]/15 font-bold'
                      : 'text-[#F5F0E8]/90 hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <div className="w-2.5 h-2.5 rounded-full bg-[#B08D57]" />}
                </button>
              );
            })}
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="mt-auto space-y-3 pt-6 border-t border-[#B08D57]/20">
            <button
              onClick={() => handleNavClick('reservations')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B52A2A] to-[#C55A2A] text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <CalendarDays className="w-5 h-5" />
              <span>{tr.nav.reserveTable}</span>
            </button>

            <button
              onClick={() => handleNavClick('order')}
              className="w-full py-3 rounded-xl bg-white/10 text-[#F5F0E8] font-medium text-center flex items-center justify-center gap-2 border border-[#B08D57]/30"
            >
              <UtensilsCrossed className="w-5 h-5 text-[#B08D57]" />
              <span>{tr.nav.order}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsMediaLibraryOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-[#B08D57]/20 hover:bg-[#B08D57] hover:text-black text-[#B08D57] font-semibold text-center flex items-center justify-center gap-2 border border-[#B08D57]/40"
            >
              <Sparkles className="w-5 h-5 text-[#B08D57]" />
              <span>{language === 'es' ? 'Biblioteca de Medios & Subida' : 'Media Library & Uploads'}</span>
            </button>

            {/* Direct Phone & WhatsApp in Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-stone-800 text-stone-200 text-xs font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-900/50 text-emerald-300 text-xs font-semibold border border-emerald-500/30"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
