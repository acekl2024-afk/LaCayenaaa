import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GOOGLE_REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';
import { 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  MessageSquarePlus, 
  MapPin, 
  Sparkles,
  Flame,
  Pizza,
  Cake,
  ThumbsUp
} from 'lucide-react';

export const GoogleReviewsSection: React.FC = () => {
  const { language } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredReviews = GOOGLE_REVIEWS.filter(review => {
    if (selectedFilter === 'all') return true;
    return review.highlightCategory === selectedFilter;
  });

  return (
    <section id="google-reviews-section" className="py-20 bg-[#FAF6F0] border-t border-b border-[#E6DACB] relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B08D57]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B52A2A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header Block: Google Business Profile Badge + Call to Action */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-[#E2D5C1] flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Rating Info & Google Badge */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            {/* Google "G" & Rating Score */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#FAF6F0] border border-[#E0D3BF] flex flex-col items-center justify-center shrink-0 shadow-inner">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1E1B18] leading-none">
                4.6
              </span>
              <div className="flex items-center gap-0.5 text-amber-500 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-stone-500 font-medium mt-0.5 uppercase tracking-wider">
                Google
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'es' ? 'Perfil Verificado en Google' : 'Google Verified Business'}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18]">
                {language === 'es' ? 'Opiniones de Nuestros Clientes' : 'Google Customer Reviews'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
                {language === 'es'
                  ? 'Más de 500 comensales disfrutan de nuestras carnes a la brasa Josper, pizzas artesanas y tartas caseras en La Zubia, Granada.'
                  : 'Over 500 diners enjoy our Josper charcoal meats, handmade pizzas and artisan cakes in La Zubia, Granada.'}
              </p>
            </div>
          </div>

          {/* Right: Actions (Write Review + Open Maps) */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              id="write-google-review-btn"
              href={RESTAURANT_INFO.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1E1B18] hover:bg-[#B52A2A] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-md transition-all duration-200"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-400" />
              <span>{language === 'es' ? 'Dejar una Reseña en Google' : 'Write a Google Review'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>

            <a
              id="view-google-maps-btn"
              href={RESTAURANT_INFO.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#1E1B18] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-stone-300 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#B52A2A]" />
              <span>{language === 'es' ? 'Ver Perfil en Google' : 'View on Google Maps'}</span>
            </a>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedFilter === 'all'
                ? 'bg-[#1E1B18] text-[#F5F0E8] shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {language === 'es' ? 'Todas las opiniones' : 'All reviews'}
          </button>

          <button
            onClick={() => setSelectedFilter('meats')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              selectedFilter === 'meats'
                ? 'bg-[#1E1B18] text-[#F5F0E8] shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#B52A2A]" />
            <span>{language === 'es' ? 'Carnes Josper' : 'Josper Meats'}</span>
          </button>

          <button
            onClick={() => setSelectedFilter('pizzas')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              selectedFilter === 'pizzas'
                ? 'bg-[#1E1B18] text-[#F5F0E8] shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Pizza className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'es' ? 'Pizzas Artesanas' : 'Artisan Pizzas'}</span>
          </button>

          <button
            onClick={() => setSelectedFilter('desserts')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              selectedFilter === 'desserts'
                ? 'bg-[#1E1B18] text-[#F5F0E8] shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Cake className="w-3.5 h-3.5 text-rose-500" />
            <span>{language === 'es' ? 'Tartas Artemisa' : 'Artemisa Cakes'}</span>
          </button>

          <button
            onClick={() => setSelectedFilter('service')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              selectedFilter === 'service'
                ? 'bg-[#1E1B18] text-[#F5F0E8] shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>{language === 'es' ? 'Servicio & Terraza' : 'Service & Terrace'}</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 shadow-xs hover:shadow-md border border-[#E5DACD] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.authorAvatar}
                      alt={rev.authorName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-stone-200"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                        {rev.authorName}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {rev.isLocalGuide && (
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                            Local Guide
                          </span>
                        )}
                        <span className="text-[11px] text-stone-400">
                          {language === 'es' ? rev.relativeTime : rev.relativeTimeEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Google G small icon */}
                  <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                    G
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{language === 'es' ? rev.textEs : rev.textEn}"
                </p>
              </div>

              {/* Bottom footer */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{language === 'es' ? 'Opinión verificada' : 'Verified Review'}</span>
                </span>
                <a
                  href={rev.googleMapsUrl || RESTAURANT_INFO.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-stone-900 underline flex items-center gap-0.5"
                >
                  <span>Google</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom review encourage strip */}
        <div className="text-center pt-2">
          <p className="text-xs text-stone-500">
            {language === 'es'
              ? '¿Has visitado Asador La Cayena recientemente? Tu opinión ayuda a nuestra familia a seguir mejorando día a día.'
              : 'Visited Asador La Cayena recently? Your feedback helps our team keep delivering the best experience every day.'}
            {' '}
            <a
              href={RESTAURANT_INFO.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B52A2A] font-bold underline hover:text-[#1E1B18] ml-1"
            >
              {language === 'es' ? 'Deja tu reseña aquí →' : 'Leave your review here →'}
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
