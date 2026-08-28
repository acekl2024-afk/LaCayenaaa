import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { 
  Flame, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CalendarDays, 
  ShoppingBag,
  Sparkles,
  Maximize2,
  Video,
  Play,
  Instagram,
  Facebook,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { GoogleReviewsSection } from '../components/GoogleReviewsSection';

export const GalleryPage: React.FC = () => {
  const { language, navigateTo, mediaList, tr } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: language === 'es' ? 'Todas las Fotos & Vídeos' : 'All Media' },
    { id: 'grill', label: language === 'es' ? 'Brasas & Carnes' : 'Grill & Meats' },
    { id: 'restaurant', label: language === 'es' ? 'Ambiente & Salón' : 'Atmosphere & Dining' },
    { id: 'terrace', label: language === 'es' ? 'Terraza Exterior' : 'Outdoor Terrace' },
    { id: 'food', label: language === 'es' ? 'Platos & Entrantes' : 'Dishes & Starters' },
    { id: 'cocktails', label: language === 'es' ? 'Cócteles & Vinos' : 'Cocktails & Wine' },
  ];

  // Helper to map media library category string to gallery category
  const mapCategory = (cat: string): 'food' | 'grill' | 'cocktails' | 'restaurant' | 'terrace' => {
    const c = (cat || '').toLowerCase();
    if (c.includes('grill') || c.includes('meat') || c.includes('beef') || c.includes('iberian') || c.includes('josper')) return 'grill';
    if (c.includes('cocktail') || c.includes('wine') || c.includes('beer') || c.includes('drink')) return 'cocktails';
    if (c.includes('terrace') || c.includes('exterior')) return 'terrace';
    if (c.includes('atmosphere') || c.includes('interior') || c.includes('fireplace') || c.includes('staff')) return 'restaurant';
    return 'food';
  };

  // Merge static gallery items with active custom-uploaded media
  const allGalleryItems = useMemo(() => {
    const activeUploads = mediaList
      .filter((m) => m.active)
      .map((m) => ({
        id: m.id,
        titleEs: m.altText || m.fileName,
        titleEn: m.altText || m.fileName,
        category: mapCategory(m.category),
        imageUrl: m.url,
        descriptionEs: m.description || '',
        descriptionEn: m.description || '',
        mediaType: m.mediaType
      }));

    return [...GALLERY_ITEMS, ...activeUploads];
  }, [mediaList]);

  const filteredGallery = useMemo(() => {
    return allGalleryItems.filter((item) => {
      if (selectedCategory === 'all') return true;
      return item.category === selectedCategory;
    });
  }, [allGalleryItems, selectedCategory]);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredGallery.length);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <div id="gallery-page" className="min-h-screen bg-[#F5F0E8] pt-32 sm:pt-36 pb-28">
      {/* Banner */}
      <div className="bg-[#1E1B18] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#B08D57]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B52A2A]/20 border border-[#B52A2A]/40 text-[#C55A2A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{tr.galleryPreview.badge}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F0E8]">
            {tr.galleryPreview.headline}
          </h1>
          <p className="text-sm text-stone-300 max-w-xl mx-auto">
            {language === 'es'
              ? 'Un recorrido visual por nuestras brasas de encina, el acogedor comedor con chimenea, nuestra terraza y el equipo en La Zubia.'
              : 'A visual journey through our oak charcoal grill, cozy fireplace dining room, outdoor terrace, and team in La Zubia.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Social Media & Google Live Connect Banner */}
        <div className="bg-[#1E1B18] rounded-2xl p-4 sm:p-5 shadow-xl border border-[#B08D57]/40 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B52A2A] to-[#C55A2A] flex items-center justify-center shrink-0">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#F5F0E8]">
                {language === 'es' ? 'Síguenos en Redes Sociales & Google' : 'Follow us on Social Media & Google'}
              </h4>
              <p className="text-xs text-stone-400">
                {language === 'es' ? 'Fotos diarias, vídeos del horno Josper y novedades de nuestra carta.' : 'Daily photos, Josper grill video reels and specials.'}
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 shrink-0">
            <a
              href={RESTAURANT_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:opacity-90 text-white text-xs font-semibold shadow-xs transition-opacity"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3 text-pink-200" />
            </a>

            <a
              href={RESTAURANT_INFO.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1877F2] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook</span>
              <ExternalLink className="w-3 h-3 text-blue-200" />
            </a>

            <a
              href={RESTAURANT_INFO.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF6F0] text-[#1E1B18] hover:bg-white text-xs font-bold shadow-xs transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B52A2A]" />
              <span>Google Photos</span>
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-stone-200 mb-8 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1E1B18] text-[#B08D57] shadow-md scale-105'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => {
            const title = language === 'es' ? item.titleEs : item.titleEn;
            const isVideo = (item as any).mediaType === 'video';
            return (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setActiveLightboxIndex(idx)}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg border border-stone-200 cursor-pointer bg-stone-900"
              >
                {isVideo ? (
                  <video
                    src={item.imageUrl}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/60 text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {isVideo && (
                  <div className="absolute top-4 left-4 p-1.5 rounded-lg bg-black/60 text-[#B08D57] flex items-center gap-1 text-[11px] font-bold border border-[#B08D57]/40">
                    <Video className="w-3.5 h-3.5" />
                    <span>VÍDEO</span>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#B08D57] block mb-1">
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">
                    {title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-16 p-8 rounded-3xl bg-[#1E1B18] text-white text-center border border-[#B08D57]/30 shadow-2xl space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            {language === 'es' ? '¿Listo para vivir la experiencia?' : 'Ready to experience it yourself?'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
            {language === 'es'
              ? 'Haz tu reserva con antelación o pide tus platos favoritos para llevar a casa.'
              : 'Book your table in advance or order your favorite Josper dishes for takeaway.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('reservations')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#B52A2A] to-[#C55A2A] text-white font-semibold text-xs shadow-lg"
            >
              {tr.nav.reserveTable}
            </button>
            <button
              onClick={() => navigateTo('order')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20"
            >
              {tr.nav.order}
            </button>
          </div>
        </div>

        {/* Google Customer Reviews Widget */}
        <div className="mt-12">
          <GoogleReviewsSection />
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredGallery[activeLightboxIndex] && (
        <div
          id="gallery-lightbox"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {(filteredGallery[activeLightboxIndex] as any).mediaType === 'video' ? (
              <video
                src={filteredGallery[activeLightboxIndex].imageUrl}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-[70vh] rounded-2xl shadow-2xl"
              />
            ) : (
              <img
                src={filteredGallery[activeLightboxIndex].imageUrl}
                alt="Gallery Preview"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />
            )}
            <div className="mt-4 text-center">
              <h3 className="font-serif text-xl font-bold text-white">
                {language === 'es'
                  ? filteredGallery[activeLightboxIndex].titleEs
                  : filteredGallery[activeLightboxIndex].titleEn}
              </h3>
              <span className="text-xs text-stone-400 mt-1 block">
                {activeLightboxIndex + 1} / {filteredGallery.length}
              </span>
            </div>
          </div>

          <button
            onClick={handleNextPhoto}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
