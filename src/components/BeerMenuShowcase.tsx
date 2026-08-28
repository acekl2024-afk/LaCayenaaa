import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem } from '../types';
import { 
  Beer, 
  Sparkles, 
  Plus, 
  Check, 
  Wine, 
  ShieldCheck, 
  ExternalLink,
  Info,
  Layers,
  Percent,
  RotateCw,
  Thermometer,
  Utensils,
  Award,
  Eye,
  X
} from 'lucide-react';
import { BeerBottle3D } from './BeerBottle3D';
import { TiltCard3D } from './TiltCard3D';
import { JosperEmbers3D } from './JosperEmbers3D';

interface BeerMenuShowcaseProps {
  beers: MenuItem[];
}

export const BeerMenuShowcase: React.FC<BeerMenuShowcaseProps> = ({ beers }) => {
  const { language, addToCart } = useApp();
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [inspectingBeer, setInspectingBeer] = useState<MenuItem | null>(null);

  const origins = [
    { id: 'all', labelEs: 'Todas las Cervezas (Carta Completa)', labelEn: 'All Beers (Full Menu)' },
    { id: 'malaga', labelEs: 'Cervezas Victoria (Málaga)', labelEn: 'Victoria Beers (Malaga)' },
    { id: 'granada', labelEs: 'Cervezas Alhambra (Granada)', labelEn: 'Alhambra Beers (Granada)' },
    { id: 'specialty', labelEs: 'Tostadas & Especiales', labelEn: 'Amber & Specialties' },
    { id: 'sin', labelEs: 'Sin Alcohol 0,0% / Sin Gluten', labelEn: 'Non-Alcoholic 0.0% / Gluten Free' }
  ];

  const filteredBeers = beers.filter(beer => {
    if (selectedOrigin === 'malaga') {
      return beer.id.includes('victoria') || (beer.origin && beer.origin.toLowerCase().includes('málaga'));
    }
    if (selectedOrigin === 'granada') {
      return beer.id.includes('alhambra') || (beer.origin && beer.origin.toLowerCase().includes('granada'));
    }
    if (selectedOrigin === 'specialty') {
      return beer.id.includes('turia') || beer.id.includes('voll-damm') || beer.id.includes('ipa') || beer.id.includes('roja');
    }
    if (selectedOrigin === 'sin') {
      return beer.abv === '0.00% Vol.' || beer.glutenFree || beer.id.includes('sin') || beer.id.includes('free-damm');
    }
    return true;
  });

  const handleAddBeer = (beer: MenuItem) => {
    addToCart(beer);
    setAddedAnimationId(beer.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  const getPairingSuggestion = (beerId: string) => {
    if (beerId.includes('1925') || beerId.includes('voll-damm')) {
      return language === 'es' ? 'Chuletón de Vaca Madurada & Solomillo Angus' : 'Dry-Aged Ribeye & Angus Sirloin';
    }
    if (beerId.includes('turia') || beerId.includes('roja')) {
      return language === 'es' ? 'Costillar BBQ & Parrillada Ibérica' : 'BBQ Ribs & Grilled Iberian Pork';
    }
    if (beerId.includes('pasos-largos') || beerId.includes('radler')) {
      return language === 'es' ? 'Flores de Alcachofa & Ensalada Templada' : 'Artichoke Flowers & Warm Goat Cheese Salad';
    }
    if (beerId.includes('ipa')) {
      return language === 'es' ? 'Pizza Cayenne Picante & Provolone' : 'Spicy Cayenne Pizza & Baked Provolone';
    }
    return language === 'es' ? 'Pizzas Artesanas & Entrantes Ibéricos' : 'Artisan Pizzas & Iberian Starters';
  };

  return (
    <div id="beer-menu-showcase" className="space-y-8">
      {/* Authentic Victoria Málaga & Alhambra 3D Showcase Banner */}
      <div className="bg-[#1E1B18] rounded-3xl p-6 sm:p-10 text-white border border-[#B08D57]/40 shadow-2xl relative overflow-hidden">
        <JosperEmbers3D intensity="subtle" className="opacity-40" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Authentic Physical Poster Card (3D Tilt) */}
          <div className="lg:col-span-4">
            <TiltCard3D maxTilt={14} scale={1.03}>
              <div className="bg-[#F4EFE6] text-[#1E1B18] p-5 sm:p-6 rounded-3xl border border-[#D5C4AF] shadow-2xl text-center flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-1.5 border-b border-[#D5C4AF] pb-3">
                  <span className="text-[10px] font-black tracking-widest text-[#B52A2A] uppercase">
                    {language === 'es' ? 'CERVEZA DE MÁLAGA' : 'MALAGA CRAFT HERITAGE'}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-[#1E1B18]">
                    VICTORIA
                  </h3>
                  <p className="text-[10px] font-bold text-stone-600 tracking-wider uppercase">
                    100% INGREDIENTES NATURALES
                  </p>
                </div>

                {/* 3D Interactive Bottle inside Card */}
                <div className="py-2 h-44 flex items-center justify-center">
                  <BeerBottle3D
                    beerId="beer-victoria-malaga"
                    name="Victoria Málaga 1928"
                    abv="4.80% Vol."
                    origin="Málaga, Andalucía"
                    isInteractive={true}
                  />
                </div>

                <div className="space-y-2 border-t border-[#D5C4AF] pt-3">
                  <p className="text-[10px] font-medium leading-snug text-stone-700">
                    {language === 'es'
                      ? 'ELABORADA CUIDADOSAMENTE CON EL PROCEDIMIENTO TRADICIONAL DE MADURACIÓN LENTA PARA CONSEGUIR SU SABOR EXQUISITO.'
                      : 'CAREFULLY CRAFTED USING THE TRADITIONAL SLOW MATURATION PROCESS TO ACHIEVE ITS EXQUISITE TASTE.'}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-black text-[#B52A2A]">
                    <Beer className="w-3.5 h-3.5" />
                    <span>VICTORIA 1928</span>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Description & Cellar Heritage */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B52A2A]/20 border border-[#B52A2A]/50 text-[#F5F0E8] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>{language === 'es' ? 'Carta y Bodega Cervecera en 3D' : '3D Craft Beer Cellar & Menu'}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F0E8] leading-tight">
              {language === 'es'
                ? 'El Mejor Maridaje para Nuestras Brasas de Encina'
                : 'The Ultimate Pairing for Our Oak Charcoal Embers'}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {language === 'es'
                ? 'Nuestra bodega cervecera reúne lo mejor de la tradición andaluza: la frescura inconfundible de Cervezas Victoria de Málaga, las joyas grabadas de Cervezas Alhambra de Granada, el carácter tostado de Turia y Voll-Damm Doble Malta, y refrescantes opciones 0,0% sin alcohol y sin gluten.'
                : 'Our cellar brings together the finest Andalusian brewing heritage: the crisp elegance of Victoria from Malaga, the iconic embossed Alhambra from Granada, rich amber lagers like Turia and Voll-Damm Double Malt, plus refreshing 0.0% non-alcoholic and gluten-free choices.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                <span className="block text-[11px] text-stone-400 font-medium">
                  {language === 'es' ? 'Servicio Helado' : 'Ice Cold Serve'}
                </span>
                <span className="font-bold text-sm text-[#FAF6F0] flex items-center justify-center gap-1 mt-0.5">
                  <Thermometer className="w-3.5 h-3.5 text-sky-400" />
                  2°C – 4°C
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                <span className="block text-[11px] text-stone-400 font-medium">
                  {language === 'es' ? 'Variedades Disponibles' : 'Varieties Available'}
                </span>
                <span className="font-bold text-sm text-[#FAF6F0] flex items-center justify-center gap-1 mt-0.5">
                  <Beer className="w-3.5 h-3.5 text-amber-400" />
                  {beers.length} {language === 'es' ? 'Cervezas' : 'Beers'}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center col-span-2 sm:col-span-1">
                <span className="block text-[11px] text-stone-400 font-medium">
                  {language === 'es' ? 'Opciones 0,0% & Gluten Free' : '0.0% & Gluten Free'}
                </span>
                <span className="font-bold text-sm text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% {language === 'es' ? 'Garantizado' : 'Guaranteed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Origin & Style Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {origins.map((orig) => (
          <button
            key={orig.id}
            onClick={() => setSelectedOrigin(orig.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedOrigin === orig.id
                ? 'bg-[#1E1B18] text-white shadow-md'
                : 'bg-[#EFE6D8] text-stone-700 hover:bg-[#E2D4C0] border border-[#D5C4AF]'
            }`}
          >
            <Beer className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'es' ? orig.labelEs : orig.labelEn}</span>
          </button>
        ))}
      </div>

      {/* 3D Beer Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeers.map((beer) => {
          const name = language === 'es' ? beer.name : (beer.nameEn || beer.name);
          const desc = language === 'es' ? beer.description : (beer.descriptionEn || beer.description);
          const isAdded = addedAnimationId === beer.id;

          return (
            <TiltCard3D key={beer.id} maxTilt={10} scale={1.02} className="h-full">
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden">
                <div>
                  {/* Top Origin Tag & ABV */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#B52A2A] bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
                      {beer.origin || (language === 'es' ? 'Cerveza Selecta' : 'Craft Beer')}
                    </span>

                    {beer.abv && (
                      <span className="text-[10px] font-extrabold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Percent className="w-2.5 h-2.5 text-stone-400" />
                        <span>{beer.abv}</span>
                      </span>
                    )}
                  </div>

                  {/* 3D Visual Bottle / Glass Viewport */}
                  <div className="w-full h-48 bg-gradient-to-b from-[#FAF6F0] to-[#F0E6D8] rounded-2xl p-2 mb-4 flex items-center justify-center border border-stone-200/60 overflow-hidden relative group/bottle">
                    <BeerBottle3D
                      beerId={beer.id}
                      name={name}
                      abv={beer.abv}
                      origin={beer.origin}
                      isInteractive={true}
                    />

                    {beer.popular && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#B52A2A] text-white text-[9px] font-black uppercase tracking-wider shadow-xs z-20">
                        {language === 'es' ? 'Favorito' : 'Top Pick'}
                      </div>
                    )}

                    {/* Quick Inspect Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectingBeer(beer);
                      }}
                      className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black text-white text-[10px] flex items-center gap-1 backdrop-blur-xs transition-colors z-20"
                      title={language === 'es' ? 'Cata 3D y Maridaje' : '3D Tasting & Pairing'}
                    >
                      <Eye className="w-3 h-3 text-amber-300" />
                      <span className="text-[9px] font-bold">{language === 'es' ? 'Cata 3D' : '3D Info'}</span>
                    </button>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-base sm:text-lg font-black text-[#1E1B18] uppercase tracking-wide group-hover:text-[#B52A2A] transition-colors leading-tight">
                    {name}
                  </h3>

                  {beer.nameEn && beer.nameEn !== name && (
                    <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mt-0.5">
                      {beer.nameEn}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed line-clamp-2">
                    {desc}
                  </p>

                  {/* Pairing Tip */}
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#B08D57] font-medium bg-[#FAF6F0] p-1.5 rounded-lg border border-[#D5C4AF]/60">
                    <Utensils className="w-3 h-3 text-[#B52A2A] shrink-0" />
                    <span className="line-clamp-1">{getPairingSuggestion(beer.id)}</span>
                  </div>
                </div>

                {/* Formats and Add-to-Cart Action */}
                <div className="mt-4 pt-3 border-t border-stone-100 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-400 block">
                      {language === 'es' ? 'FORMATOS DISPONIBLES' : 'AVAILABLE FORMATS'}
                    </span>
                    
                    <div className="flex items-center flex-wrap gap-2">
                      {beer.formats && beer.formats.length > 0 ? (
                        beer.formats.map((fmt, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#FAF6F0] border border-[#D5C4AF] text-xs font-bold text-[#1E1B18]"
                          >
                            <span className="text-stone-500 font-normal text-[11px]">{fmt.label}:</span>
                            <span className="text-[#B52A2A]">{fmt.price.toFixed(2).replace('.', ',')}€</span>
                          </span>
                        ))
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#FAF6F0] border border-[#D5C4AF] text-xs font-bold text-[#1E1B18]">
                          <span>{beer.priceDetails || `${beer.price.toFixed(2).replace('.', ',')}€`}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Order Button */}
                  <button
                    onClick={() => handleAddBeer(beer)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs ${
                      isAdded
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-[#1E1B18] hover:bg-[#B52A2A] text-white active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{language === 'es' ? '¡Añadido a la Cesta!' : 'Added to Basket!'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>{language === 'es' ? 'Añadir al Pedido' : 'Add to Order'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </TiltCard3D>
          );
        })}
      </div>

      {/* 3D Beer Tasting & Cellar Inspector Modal */}
      {inspectingBeer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1E1B18] border border-[#B08D57]/40 rounded-3xl max-w-lg w-full text-white shadow-2xl p-6 sm:p-8 relative overflow-hidden">
            <button
              onClick={() => setInspectingBeer(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-4">
              <span className="text-[10px] font-bold text-[#B08D57] uppercase tracking-widest bg-[#B08D57]/15 px-3 py-1 rounded-full">
                {inspectingBeer.origin || 'Cerveza Selecta'}
              </span>

              <h3 className="font-serif text-2xl font-black text-white">
                {language === 'es' ? inspectingBeer.name : (inspectingBeer.nameEn || inspectingBeer.name)}
              </h3>

              {/* Large 3D Interactive Bottle Viewport */}
              <div className="h-56 w-full bg-gradient-to-b from-[#2A241F] to-[#161412] rounded-2xl border border-white/10 flex items-center justify-center relative shadow-inner p-4">
                <BeerBottle3D
                  beerId={inspectingBeer.id}
                  name={inspectingBeer.name}
                  abv={inspectingBeer.abv}
                  origin={inspectingBeer.origin}
                  isInteractive={true}
                />
              </div>

              <p className="text-xs text-stone-300 leading-relaxed text-left">
                {language === 'es' ? inspectingBeer.description : (inspectingBeer.descriptionEn || inspectingBeer.description)}
              </p>

              {/* Tasting Metrics */}
              <div className="grid grid-cols-2 gap-2 text-left text-xs pt-2">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-stone-400 block">{language === 'es' ? 'Graduación' : 'Alcohol (ABV)'}</span>
                  <span className="font-bold text-white">{inspectingBeer.abv || '5.0% Vol.'}</span>
                </div>

                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-stone-400 block">{language === 'es' ? 'Servicio Óptimo' : 'Serving Temp'}</span>
                  <span className="font-bold text-sky-400">2°C – 4°C (Helada)</span>
                </div>

                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 col-span-2">
                  <span className="text-[10px] text-stone-400 block">{language === 'es' ? 'Maridaje Recomendado' : 'Recommended Pairing'}</span>
                  <span className="font-bold text-[#B08D57]">{getPairingSuggestion(inspectingBeer.id)}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  handleAddBeer(inspectingBeer);
                  setInspectingBeer(null);
                }}
                className="w-full py-3 rounded-xl bg-[#B52A2A] hover:bg-[#962222] text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'es' ? 'Añadir a la Cesta' : 'Add to Basket'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
