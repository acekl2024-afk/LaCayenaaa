import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO, RESTAURANT_IMAGES, OPENING_HOURS } from '../data/restaurantData';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Navigation,
  Smartphone,
  Sparkles,
  QrCode,
  Download,
  ShieldCheck,
  Instagram,
  Facebook,
  Globe
} from 'lucide-react';
import { MobileAppModal } from './MobileAppModal';

export const Footer: React.FC = () => {
  const { language, navigateTo, setIsMediaLibraryOpen, tr } = useApp();
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  return (
    <>
      <footer id="main-footer" className="bg-[#151311] text-[#F5F0E8] border-t border-[#B08D57]/20 pt-16 pb-28 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Download App Hero Callout inside Footer */}
          <div className="mb-12 bg-gradient-to-r from-[#201C19] via-[#2A231C] to-[#1E1914] rounded-3xl p-6 sm:p-8 border border-[#B08D57]/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B52A2A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-[#B52A2A] text-white flex items-center justify-center shadow-lg shrink-0">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#B08D57] text-[11px] font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{language === 'es' ? 'App Oficial para iOS y Android' : 'Official App for iOS & Android'}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {language === 'es' ? 'Descarga la App de La Cayena' : 'Download the La Cayena Mobile App'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-xl mt-0.5">
                    {language === 'es'
                      ? 'Reserva mesas con 1 clic, pide a domicilio, explora el menú 3D interactivo y recibe ofertas exclusivas para miembros.'
                      : '1-click reservations, seamless delivery orders, interactive 3D menu exploration, and exclusive member deals.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsAppModalOpen(true)}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <Download className="w-4 h-4 text-[#B52A2A]" />
                  <span>{language === 'es' ? 'Instalar App (iPhone / Android)' : 'Install App (iOS / Android)'}</span>
                </button>

                <button
                  onClick={() => setIsAppModalOpen(true)}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/15 transition-colors"
                >
                  <QrCode className="w-4 h-4 text-[#B08D57]" />
                  <span>{language === 'es' ? 'Código QR' : 'QR Scan'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
            {/* Brand Col */}
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="h-16 w-auto flex items-center justify-center shrink-0 bg-white px-3 py-1.5 rounded-2xl shadow-md border border-stone-200">
                  <img
                    src={RESTAURANT_IMAGES.logo}
                    alt="Asador La Cayena Logo"
                    referrerPolicy="no-referrer"
                    className="h-13 w-auto max-w-[160px] object-contain"
                  />
                </div>
                <div>
                  <span className="block font-serif text-2xl font-bold tracking-wider text-[#F5F0E8] leading-none">
                    LA CAYENA
                  </span>
                  <span className="block text-xs uppercase tracking-[0.2em] text-[#B08D57] font-semibold mt-1">
                    ASADOR • PIZZERÍA
                  </span>
                </div>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed">
                {tr.footer.aboutText}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a
                  href={RESTAURANT_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white hover:text-pink-400 font-semibold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 text-pink-400" />
                </a>
                <a
                  href={RESTAURANT_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white hover:text-blue-400 font-semibold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-400" />
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
                <a
                  href={RESTAURANT_INFO.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#B08D57] hover:text-[#F5F0E8] font-medium bg-[#B08D57]/10 px-3 py-1.5 rounded-lg border border-[#B08D57]/30 transition-colors"
                >
                  <span>Google Reseñas</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white hover:bg-[#B52A2A] font-semibold bg-[#B52A2A]/80 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Navigation className="w-3 h-3" />
                  <span>{language === 'es' ? 'Cómo llegar' : 'Get Directions'}</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-bold text-[#F5F0E8] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B52A2A]" />
                {tr.footer.quickLinks}
              </h4>
              <ul className="space-y-2.5 text-sm text-stone-400">
                <li>
                  <button
                    onClick={() => navigateTo('home')}
                    className="hover:text-[#B08D57] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>{tr.nav.home}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('menu')}
                    className="hover:text-[#B08D57] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>{tr.nav.menu}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('order')}
                    className="hover:text-[#B08D57] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>{tr.nav.order}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('reservations')}
                    className="hover:text-[#B08D57] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>{tr.nav.reservations}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('blog')}
                    className="hover:text-[#B08D57] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>{language === 'es' ? 'Blog & Artículos SEO (10 Guías)' : 'Blog & SEO Articles (10 Guides)'}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('gallery')}
                    className="hover:text-[#B08D57] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>{tr.nav.gallery}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('about')}
                    className="hover:text-[#B08D57] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>{tr.nav.about}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('contact')}
                    className="hover:text-[#B08D57] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>{tr.nav.contact}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsMediaLibraryOpen(true)}
                    className="text-[#B08D57] hover:underline transition-colors flex items-center gap-1.5 font-semibold"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>{language === 'es' ? 'Gestión de Medios & Subida' : 'Media Hub & Uploads'}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h4 className="font-serif text-lg font-bold text-[#F5F0E8] mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B08D57]" />
                {tr.footer.hoursTitle}
              </h4>
              <div className="space-y-2 text-xs text-stone-300">
                {OPENING_HOURS.map((h, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-stone-800/80">
                    <span className="font-medium text-stone-400">
                      {language === 'es' ? h.dayEs : h.dayEn}:
                    </span>
                    <span className={h.closed ? 'text-[#B52A2A] font-semibold' : 'text-stone-200'}>
                      {h.closed 
                        ? (language === 'es' ? 'Cerrado' : 'Closed') 
                        : (h.lunch && h.dinner ? `${h.lunch} / ${h.dinner}` : h.lunch || h.dinner)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="font-serif text-lg font-bold text-[#F5F0E8] mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B08D57]" />
                {tr.footer.contactTitle}
              </h4>
              <div className="space-y-3.5 text-sm text-stone-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B08D57] shrink-0 mt-1" />
                  <span>{RESTAURANT_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#B08D57] shrink-0" />
                  <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#B08D57] shrink-0" />
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white transition-colors break-all">
                    {RESTAURANT_INFO.email}
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => navigateTo('reservations')}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#B52A2A] to-[#C55A2A] text-white text-xs font-semibold uppercase tracking-wider text-center hover:opacity-90 transition-opacity"
                  >
                    {tr.nav.reserveTable}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom copyright & legal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div>
              © {new Date().getFullYear()} {RESTAURANT_INFO.name}. {tr.footer.allRights}
            </div>
            <div className="flex items-center gap-6">
              <span>{tr.footer.privacyPolicy}</span>
              <span>•</span>
              <span>{tr.footer.cookiePolicy}</span>
              <span>•</span>
              <span>{tr.footer.legalNotice}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Download App Simulation Modal */}
      <MobileAppModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
      />
    </>
  );
};
