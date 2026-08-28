import React, { useState } from 'react';
import { Percent, Sparkles, Flame, Droplets, RotateCw } from 'lucide-react';

interface BeerBottle3DProps {
  beerId: string;
  name: string;
  abv?: string;
  origin?: string;
  imageFallback?: string;
  isInteractive?: boolean;
}

export const BeerBottle3D: React.FC<BeerBottle3DProps> = ({
  beerId,
  name,
  abv,
  origin,
  imageFallback,
  isInteractive = true,
}) => {
  const [rotateY, setRotateY] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rY = ((x - rect.width / 2) / (rect.width / 2)) * 25;
    const rX = -((y - rect.height / 2) / (rect.height / 2)) * 15;
    setRotateY(rY);
    setRotateX(rX);
  };

  const handleMouseLeave = () => {
    setRotateY(0);
    setRotateX(0);
    setIsHovered(false);
  };

  // Determine bottle theme & graphics based on beerId
  const getBeerDesign = () => {
    if (beerId.includes('alhambra-1925')) {
      return {
        type: 'bottle-green',
        glassColor: 'from-[#0F3B20] via-[#1B5E32] to-[#0A2614]',
        liquidColor: 'from-amber-600/70 to-emerald-900/90',
        capColor: 'bg-[#B08D57]',
        labelBg: 'bg-transparent border border-emerald-400/40',
        labelTitle: '1925',
        labelSubtitle: 'RESERVA',
        embossed: true,
        glowColor: 'rgba(27, 94, 50, 0.4)',
        textColor: 'text-emerald-100',
        isDraft: false,
      };
    }
    if (beerId.includes('alhambra-roja')) {
      return {
        type: 'bottle-red',
        glassColor: 'from-[#3A1010] via-[#5C1A1A] to-[#250808]',
        liquidColor: 'from-red-600/80 to-amber-950/90',
        capColor: 'bg-[#B52A2A]',
        labelBg: 'bg-[#7A1C1C] border border-amber-400/60',
        labelTitle: 'ROJA',
        labelSubtitle: 'BOCK 7.2%',
        embossed: false,
        glowColor: 'rgba(181, 42, 42, 0.4)',
        textColor: 'text-amber-100',
        isDraft: false,
      };
    }
    if (beerId.includes('voll-damm')) {
      return {
        type: 'bottle-black',
        glassColor: 'from-[#1C1A17] via-[#2E2820] to-[#12100E]',
        liquidColor: 'from-amber-700/80 to-stone-950/95',
        capColor: 'bg-[#D4AF37]',
        labelBg: 'bg-[#181614] border-2 border-[#D4AF37]',
        labelTitle: 'VOLL-DAMM',
        labelSubtitle: 'DOBLE MALTA 7.2%',
        embossed: false,
        glowColor: 'rgba(212, 175, 55, 0.35)',
        textColor: 'text-[#D4AF37]',
        isDraft: false,
      };
    }
    if (beerId.includes('turia')) {
      return {
        type: 'bottle-amber',
        glassColor: 'from-[#4A260B] via-[#7B3F11] to-[#301807]',
        liquidColor: 'from-amber-500/85 to-amber-900/90',
        capColor: 'bg-[#B08D57]',
        labelBg: 'bg-[#F5ECE0] border border-[#7B3F11]',
        labelTitle: 'TURIA',
        labelSubtitle: 'MÄRZEN TOSTADA',
        embossed: false,
        glowColor: 'rgba(123, 63, 17, 0.4)',
        textColor: 'text-[#4A260B]',
        isDraft: false,
      };
    }
    if (beerId.includes('victoria-pasos-largos') || beerId.includes('radler')) {
      return {
        type: 'bottle-lemon',
        glassColor: 'from-[#3A3210] via-[#5C5016] to-[#252008]',
        liquidColor: 'from-yellow-400/85 to-amber-600/90',
        capColor: 'bg-yellow-400',
        labelBg: 'bg-[#FFFDE7] border border-yellow-500',
        labelTitle: 'PASOS LARGOS',
        labelSubtitle: 'CON LIMÓN NATURAL',
        embossed: false,
        glowColor: 'rgba(234, 179, 8, 0.4)',
        textColor: 'text-stone-900',
        isDraft: false,
      };
    }
    if (beerId.includes('victoria-sin') || beerId.includes('alhambra-sin') || beerId.includes('free-damm')) {
      return {
        type: 'bottle-blue',
        glassColor: 'from-[#1A2E40] via-[#24476B] to-[#0E1C29]',
        liquidColor: 'from-sky-500/75 to-amber-700/80',
        capColor: 'bg-sky-400',
        labelBg: 'bg-[#E1F5FE] border border-sky-600',
        labelTitle: beerId.includes('free-damm') ? 'FREE DAMM' : '0,0% SIN',
        labelSubtitle: 'ALCOHOL FREE',
        embossed: false,
        glowColor: 'rgba(3, 169, 244, 0.35)',
        textColor: 'text-sky-950',
        isDraft: false,
      };
    }
    if (beerId.includes('jarra')) {
      return {
        type: 'glass-jarra',
        glassColor: 'from-amber-200/40 via-amber-400/50 to-amber-600/70',
        liquidColor: 'from-amber-400 to-amber-500',
        capColor: 'bg-white',
        labelBg: 'bg-white/80',
        labelTitle: 'JARRA 50cl',
        labelSubtitle: 'ALHAMBRA BARRIL',
        embossed: false,
        glowColor: 'rgba(245, 158, 11, 0.4)',
        textColor: 'text-amber-950',
        isDraft: true,
      };
    }
    if (beerId.includes('cana') || beerId.includes('tubo') || beerId.includes('barril')) {
      return {
        type: 'glass-draft',
        glassColor: 'from-amber-200/40 via-amber-400/50 to-amber-600/70',
        liquidColor: 'from-amber-400 to-amber-500',
        capColor: 'bg-white',
        labelBg: 'bg-white/80',
        labelTitle: beerId.includes('cana') ? 'CAÑA 25cl' : 'DOBLE 35cl',
        labelSubtitle: 'RECIÉN TIRADA',
        embossed: false,
        glowColor: 'rgba(245, 158, 11, 0.4)',
        textColor: 'text-amber-950',
        isDraft: true,
      };
    }
    if (beerId.includes('ipa')) {
      return {
        type: 'bottle-ipa',
        glassColor: 'from-[#223318] via-[#3B592D] to-[#14200E]',
        liquidColor: 'from-amber-500/80 to-amber-800/90',
        capColor: 'bg-emerald-600',
        labelBg: 'bg-[#E8F5E9] border-2 border-emerald-700',
        labelTitle: 'GRANADA IPA',
        labelSubtitle: 'CRAFT HOPS 6.0%',
        embossed: false,
        glowColor: 'rgba(46, 125, 50, 0.4)',
        textColor: 'text-emerald-950',
        isDraft: false,
      };
    }
    if (beerId.includes('gluten')) {
      return {
        type: 'bottle-glutenfree',
        glassColor: 'from-[#3A2A15] via-[#634824] to-[#241A0D]',
        liquidColor: 'from-amber-400/80 to-amber-700/85',
        capColor: 'bg-amber-400',
        labelBg: 'bg-[#FFF8E1] border-2 border-amber-600',
        labelTitle: 'SIN GLUTEN',
        labelSubtitle: 'GLUTEN FREE 100%',
        embossed: false,
        glowColor: 'rgba(217, 119, 6, 0.4)',
        textColor: 'text-amber-950',
        isDraft: false,
      };
    }

    // Default Victoria Clásica Malaga
    return {
      type: 'bottle-victoria',
      glassColor: 'from-[#382410] via-[#5C3B1A] to-[#25170B]',
      liquidColor: 'from-amber-400/85 to-amber-700/90',
      capColor: 'bg-[#B52A2A]',
      labelBg: 'bg-[#F9F5EC] border-2 border-[#B52A2A]',
      labelTitle: 'VICTORIA',
      labelSubtitle: 'MÁLAGA 1928',
      embossed: false,
      glowColor: 'rgba(181, 42, 42, 0.35)',
      textColor: 'text-[#1E1B18]',
      isDraft: false,
    };
  };

  const design = getBeerDesign();

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex flex-col items-center justify-center relative cursor-pointer select-none py-2"
      style={{ perspective: '800px' }}
    >
      {/* 3D Container with Dynamic Transform */}
      <div
        className="transition-transform duration-200 ease-out will-change-transform flex flex-col items-center relative"
        style={{
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${isHovered ? 1.06 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow behind the bottle */}
        <div
          className="absolute -inset-4 rounded-full blur-xl opacity-60 transition-opacity duration-300 pointer-events-none"
          style={{ background: design.glowColor }}
        />

        {/* ================= DRAFT BEER GLASS RENDER ================= */}
        {design.isDraft ? (
          <div className="relative flex flex-col items-center z-10">
            {/* Thick Creamy White Foam Head */}
            <div className="w-20 h-7 bg-white rounded-t-2xl shadow-md border-b-2 border-amber-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-stone-100 via-white to-stone-200 opacity-90" />
              {/* Foam bubbles */}
              <div className="w-2 h-2 rounded-full bg-amber-50/60 absolute left-2 top-2" />
              <div className="w-3 h-3 rounded-full bg-amber-50/70 absolute right-3 top-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-100 absolute left-8 top-3" />
              <span className="relative z-10 text-[8px] font-black tracking-widest text-stone-400 uppercase">
                FROTH
              </span>
            </div>

            {/* Glass Body with Golden Amber Ale & Bubbles */}
            <div
              className={`w-18 ${beerId.includes('jarra') ? 'h-28 w-22 rounded-b-xl border-4' : 'h-32 rounded-b-2xl border-2'} border-white/60 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 relative overflow-hidden shadow-xl flex flex-col items-center justify-between p-2`}
            >
              {/* Glass Sheen Light Reflection */}
              <div className="absolute top-0 left-1 w-2 h-full bg-white/40 blur-[1px] rounded-full" />
              <div className="absolute top-0 right-1 w-1 h-full bg-white/30 blur-[0.5px] rounded-full" />

              {/* Rising Carbonation Bubbles */}
              <div className="w-1 h-1 rounded-full bg-white/80 absolute bottom-4 left-4 animate-ping opacity-75" />
              <div className="w-1 h-1 rounded-full bg-white/80 absolute bottom-8 right-5 animate-ping opacity-60" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/90 absolute bottom-2 left-8" />

              {/* Jarra Handle if applicable */}
              {beerId.includes('jarra') && (
                <div className="absolute -left-5 top-4 w-5 h-16 rounded-l-2xl border-4 border-white/70 bg-transparent shadow-xs" />
              )}

              {/* Glass Label Badge */}
              <div className="w-full bg-white/90 backdrop-blur-xs rounded-lg py-1 px-1.5 text-center shadow-xs border border-amber-300/60 mt-auto mb-1">
                <span className="block text-[9px] font-black text-amber-950 uppercase leading-none">
                  {design.labelTitle}
                </span>
                <span className="block text-[7px] font-bold text-stone-600 uppercase tracking-tighter mt-0.5">
                  {design.labelSubtitle}
                </span>
              </div>
            </div>

            {/* Glass Base */}
            <div className="w-14 h-2.5 bg-white/80 rounded-b-md shadow-md border-t border-white/40 mt-0.5" />
          </div>
        ) : (
          /* ================= BOTTLE RENDER ================= */
          <div className="relative flex flex-col items-center z-10">
            {/* Crown Bottle Cap */}
            <div className={`w-6 h-3 rounded-t-md ${design.capColor} shadow-md border-b border-black/30 flex items-center justify-center`}>
              <div className="w-4 h-0.5 bg-white/40 rounded-full" />
            </div>

            {/* Bottle Neck */}
            <div className={`w-5 h-10 bg-gradient-to-r ${design.glassColor} shadow-inner relative flex items-center justify-center border-x border-white/10`}>
              {/* Vertical Light Glare */}
              <div className="absolute left-0.5 top-0 w-1 h-full bg-white/20 blur-[0.5px]" />
              {/* Foil or neck ribbon */}
              {beerId.includes('victoria') && (
                <div className="w-full h-3 bg-[#B52A2A] border-y border-amber-300 flex items-center justify-center">
                  <span className="text-[6px] font-bold text-white tracking-widest">1928</span>
                </div>
              )}
              {beerId.includes('voll-damm') && (
                <div className="w-full h-3 bg-[#D4AF37] border-y border-black flex items-center justify-center">
                  <span className="text-[6px] font-black text-black tracking-tighter">VOLL</span>
                </div>
              )}
            </div>

            {/* Bottle Shoulder */}
            <div
              className={`w-14 h-6 bg-gradient-to-r ${design.glassColor} shadow-md relative overflow-hidden border-x border-white/10`}
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
              }}
            >
              <div className="absolute left-2 top-0 w-2 h-full bg-white/25 blur-[1px]" />
            </div>

            {/* Bottle Main Body & Label */}
            <div
              className={`w-14 h-24 bg-gradient-to-r ${design.glassColor} rounded-b-xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center border-x border-b border-white/15 p-1`}
            >
              {/* Realistic Glass Sheen */}
              <div className="absolute top-0 left-1 w-1.5 h-full bg-white/30 blur-[0.8px] rounded-full" />
              <div className="absolute top-0 right-1 w-1 h-full bg-white/20 blur-[0.5px] rounded-full" />

              {/* Condensation Droplets */}
              <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-white/60 blur-[0.2px]" />
              <div className="absolute top-6 left-2 w-1 h-1 rounded-full bg-white/60 blur-[0.2px]" />
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-white/50 blur-[0.3px]" />

              {/* Embossed Glass (Alhambra 1925) vs Printed Paper Label */}
              {design.embossed ? (
                <div className="w-full py-2 px-1 text-center border-y border-emerald-300/40 bg-emerald-950/40 backdrop-blur-xs rounded-md shadow-inner">
                  <span className="block text-[11px] font-serif font-black tracking-widest text-emerald-200 drop-shadow-md">
                    1925
                  </span>
                  <span className="block text-[6px] font-sans font-bold tracking-[0.2em] text-emerald-300/90 uppercase">
                    ALHAMBRA
                  </span>
                </div>
              ) : (
                <div
                  className={`w-full py-1.5 px-1 rounded-md ${design.labelBg} shadow-md text-center flex flex-col items-center justify-center border`}
                >
                  <span className={`block text-[8px] font-serif font-black uppercase tracking-wider leading-tight ${design.textColor}`}>
                    {design.labelTitle}
                  </span>
                  <span className="block text-[6px] font-sans font-bold text-stone-600 uppercase tracking-tight mt-0.5">
                    {design.labelSubtitle}
                  </span>
                  {origin && (
                    <span className="block text-[5px] font-semibold text-stone-500 uppercase tracking-tighter">
                      {origin.split(',')[0]}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Interactive 3D Hint Badge */}
      {isInteractive && (
        <div className="mt-2 flex items-center gap-1 text-[9px] font-bold text-stone-400 group-hover:text-[#B52A2A] transition-colors">
          <RotateCw className="w-2.5 h-2.5" />
          <span>{isHovered ? 'Rotación 3D Activa' : 'Vista 3D'}</span>
        </div>
      )}
    </div>
  );
};
