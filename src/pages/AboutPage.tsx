import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO, RESTAURANT_IMAGES } from '../data/restaurantData';
import { 
  Flame, 
  Sparkles, 
  Wine, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  ExternalLink,
  Navigation,
  HeartHandshake
} from 'lucide-react';
import { GoogleReviewsSection } from '../components/GoogleReviewsSection';

export const AboutPage: React.FC = () => {
  const { language, navigateTo, getPlacementMedia, tr } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const teamImg = getPlacementMedia('About Section', RESTAURANT_IMAGES.team);
  const josperImg = getPlacementMedia('Josper Grill Section', RESTAURANT_IMAGES.josperGrill);

  const faqs = [
    {
      qEs: '¿Es necesario reservar con antelación?',
      qEn: 'Is advance reservation necessary?',
      aEs: 'Recomendamos encarecidamente reservar mesa, especialmente para los servicios de cena de viernes y sábado, así como los almuerzos de fin de semana. Puedes reservar online en menos de 1 minuto desde nuestra web.',
      aEn: 'We highly recommend booking in advance, particularly for Friday and Saturday dinners and weekend lunches. You can easily reserve online through our website in under a minute.'
    },
    {
      qEs: '¿Cómo funciona la brasa Josper?',
      qEn: 'How does the Josper charcoal grill work?',
      aEs: 'El horno Josper combina parrilla y horno en una sola máquina cerrada. Funciona 100% con carbón vegetal de encina a más de 350°C, sellando los jugos de las carnes al instante y aportando ese inconfundible aroma ahumado.',
      aEn: 'The Josper oven combines grill and oven in a single closed chamber. Fueled 100% with natural holm oak charcoal at over 350°C, it locks in natural meat juices instantly while infusing that signature smoky flavor.'
    },
    {
      qEs: '¿Disponen de opciones sin gluten o vegetarianas?',
      qEn: 'Do you have gluten-free or vegetarian options?',
      aEs: 'Sí, disponemos de numerosas opciones sin gluten (carnes a la brasa, patatas caseras, ensaladas, etc.) y platos vegetarianos como quesos a la plancha, setas rellenas y ensaladas frescas. Por favor indícanos tus alergias al reservar.',
      aEn: 'Yes, we have many gluten-free choices (grilled cuts, homemade fries, salads) and vegetarian items like grilled goat cheese, stuffed mushrooms, and fresh salads. Please let us know of any dietary requirements when booking.'
    },
    {
      qEs: '¿Se pueden realizar pedidos para recoger o a domicilio?',
      qEn: 'Can I order for takeaway or delivery?',
      aEs: '¡Sí! Puedes pedir toda nuestra carta directamente a través de la sección "Pedir Online" de esta web, eligiendo recogida en el local o entrega a domicilio con seguimiento en directo.',
      aEn: 'Yes! You can order our entire menu through the "Order Online" section on this website, selecting either takeaway pickup or direct home delivery.'
    },
    {
      qEs: '¿Hay aparcamiento cerca del restaurante?',
      qEn: 'Is there parking available near the restaurant?',
      aEs: 'Sí, el Camino de Gójar cuenta con fácil aparcamiento gratuito en las inmediaciones del restaurante.',
      aEn: 'Yes, the Camino de Gójar street offers convenient and easy free parking nearby.'
    }
  ];

  return (
    <div id="about-page" className="min-h-screen bg-[#F5F0E8] pt-32 sm:pt-36 pb-28">
      {/* Banner */}
      <div className="bg-[#1E1B18] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#B08D57]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B52A2A]/20 border border-[#B52A2A]/40 text-[#C55A2A] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'NUESTRA HISTORIA Y PASIÓN' : 'OUR STORY & PASSION'}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F0E8]">
            {language === 'es' ? 'Asador La Cayena' : 'Asador La Cayena Steakhouse'}
          </h1>
          <p className="text-sm text-stone-300 max-w-xl mx-auto">
            {language === 'es'
              ? 'El punto de encuentro para los amantes de las brasas, la buena carne y los momentos auténticos en La Zubia, Granada.'
              : 'The gathering spot for lovers of charcoal grilling, great cuts, and authentic moments in La Zubia, Granada.'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-12">
        {/* Story Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B52A2A]">
              {language === 'es' ? 'TRADICIÓN & FUEGO' : 'TRADITION & FIRE'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 leading-snug">
              {language === 'es'
                ? 'Pasión por el carbón de encina y los sabores sinceros.'
                : 'Passion for holm oak charcoal and authentic flavors.'}
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              {language === 'es'
                ? 'En Asador La Cayena entendemos la cocina como una celebración. Ubicados en el Camino de Gójar en La Zubia, a los pies de Sierra Nevada, combinamos la tradición de los mejores asadores andaluces con toques internacionales y una coctelería cuidada al detalle.'
                : 'At Asador La Cayena, we treat dining as a celebration. Located on Camino de Gójar in La Zubia at the foot of Sierra Nevada, we blend Andalusian grill traditions with international inspirations and refined cocktails.'}
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              {language === 'es'
                ? 'Nuestra joya es el horno de brasa Josper, alimentado exclusivamente con carbón vegetal de encina. Gracias a sus altas temperaturas constantes, conseguimos carnes con un exterior caramelizado y un corazón tierno y jugoso.'
                : 'Our centerpiece is the Josper charcoal oven, fired strictly with natural holm oak coal. Its intense heat seals in tenderness and coats each cut with deep aromatic caramelization.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-serif font-bold text-xl text-[#B52A2A] block">350°C</span>
                <span className="text-xs text-stone-600 font-medium">Temperatura Josper</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-serif font-bold text-xl text-[#B08D57] block">100%</span>
                <span className="text-xs text-stone-600 font-medium">Carbón de Encina</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-xl border-4 border-stone-100">
            <img
              src={josperImg}
              alt="Josper grill cooking embers"
              referrerPolicy="no-referrer"
              className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Team & Family Spotlight Card */}
        <div className="bg-[#1E1B18] text-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-[#B08D57]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-xl border-2 border-[#B08D57]/40 order-2 lg:order-1 bg-[#1E1B18]">
            <img
              src={teamImg || RESTAURANT_IMAGES.team}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = RESTAURANT_IMAGES.team; }}
              alt="Equipo y familia Asador La Cayena"
              loading="eager"
              referrerPolicy="no-referrer"
              className="w-full h-[400px] object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#B08D57] text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'NUESTRO EQUIPO' : 'OUR TEAM'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E8]">
              {language === 'es'
                ? 'Hospitalidad granadina y cercanía familiar'
                : 'Granadian hospitality & family warmth'}
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              {language === 'es'
                ? 'Detrás de cada plato y cada brasa hay un equipo apasionado comprometido con hacerte sentir como en casa. Desde la bienvenida en sala hasta el punto exacto de la carne en parrilla, cuidamos cada segundo de tu experiencia.'
                : 'Behind every cut and ember is a dedicated crew committed to making you feel at home. From the warm greeting in the dining room to the exact doneness on the grill, we craft every moment of your visit.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('reservations')}
                className="px-6 py-3 rounded-xl bg-[#B52A2A] hover:bg-[#9c2424] text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-[#B52A2A]/30"
              >
                {language === 'es' ? 'Reservar una mesa' : 'Reserve a table'}
              </button>
              <a
                href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all"
              >
                <Navigation className="w-4 h-4 text-[#B08D57]" />
                <span>{language === 'es' ? 'Cómo llegar' : 'Get Directions'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Pillars / Atmosphere Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1E1B18] text-white p-8 rounded-3xl border border-[#B08D57]/30 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#B52A2A]/20 border border-[#B52A2A] flex items-center justify-center text-[#C55A2A]">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold">
              {language === 'es' ? 'Ambiente con Chimenea' : 'Fireplace Ambiance'}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {language === 'es'
                ? 'Un comedor interior cálido y acogedor presidido por el fuego, ideal para almuerzos familiares y cenas románticas.'
                : 'A warm, intimate indoor dining room centered around our fireplace, perfect for family meals and romantic evenings.'}
            </p>
          </div>

          <div className="bg-[#1E1B18] text-white p-8 rounded-3xl border border-[#B08D57]/30 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#B08D57]/20 border border-[#B08D57] flex items-center justify-center text-[#B08D57]">
              <Wine className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold">
              {language === 'es' ? 'Cócteles & Bodega' : 'Cocktails & Wine Cellar'}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {language === 'es'
                ? 'Selección de vinos de Rioja, Ribera del Duero y Granada, junto con cócteles artesanales para redondear cada velada.'
                : 'A curated cellar of Spanish wines from Rioja, Ribera, and Granada, alongside handcrafted signature cocktails.'}
            </p>
          </div>

          <div className="bg-[#1E1B18] text-white p-8 rounded-3xl border border-[#B08D57]/30 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-900/40 border border-emerald-600 flex items-center justify-center text-emerald-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold">
              {language === 'es' ? 'Terraza al Aire Libre' : 'Outdoor Covered Terrace'}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {language === 'es'
                ? 'Disfruta de la brisa andaluza en nuestra terraza acondicionada para todas las épocas del año.'
                : 'Enjoy the crisp Andalusian breeze in our sheltered terrace equipped for all seasons.'}
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-200 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B52A2A]">
              {language === 'es' ? 'PREGUNTAS FRECUENTES' : 'FREQUENTLY ASKED QUESTIONS'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              {language === 'es' ? 'Resolvemos tus dudas' : 'Answers to your questions'}
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto pt-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-stone-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-4 sm:p-5 text-left font-serif font-bold text-sm sm:text-base text-stone-900 flex justify-between items-center hover:bg-stone-50"
                  >
                    <span>{language === 'es' ? faq.qEs : faq.qEn}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#B52A2A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50/50">
                      {language === 'es' ? faq.aEs : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Google Reviews & Rating Card */}
        <div className="pt-4">
          <GoogleReviewsSection />
        </div>
      </div>
    </div>
  );
};
