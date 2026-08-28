import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, UtensilsCrossed, CalendarDays, ShoppingBag } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPage, navigateTo, cartCount, setIsCartOpen, tr } = useApp();

  return (
    <div
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1E1B18]/95 backdrop-blur-lg border-t border-[#B08D57]/30 px-3 py-2 shadow-2xl safe-area-pb"
    >
      <div className="grid grid-cols-4 gap-1 items-center">
        {/* Home */}
        <button
          id="mobile-nav-home"
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            currentPage === 'home'
              ? 'text-[#B08D57] bg-white/5 font-semibold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] leading-tight">{tr.nav.home}</span>
        </button>

        {/* Menu */}
        <button
          id="mobile-nav-menu"
          onClick={() => navigateTo('menu')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            currentPage === 'menu'
              ? 'text-[#B08D57] bg-white/5 font-semibold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] leading-tight">{tr.nav.menu}</span>
        </button>

        {/* Reserve */}
        <button
          id="mobile-nav-reserve"
          onClick={() => navigateTo('reservations')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            currentPage === 'reservations'
              ? 'text-[#B52A2A] bg-white/5 font-bold'
              : 'text-[#B52A2A] hover:text-[#C55A2A]'
          }`}
        >
          <div className="p-1 rounded-full bg-[#B52A2A]/20 border border-[#B52A2A]/40 mb-0.5">
            <CalendarDays className="w-4 h-4 text-[#B52A2A]" />
          </div>
          <span className="text-[11px] leading-tight font-medium">{tr.nav.reservations}</span>
        </button>

        {/* Order / Cart */}
        <button
          id="mobile-nav-order"
          onClick={() => {
            if (cartCount > 0) {
              setIsCartOpen(true);
            } else {
              navigateTo('order');
            }
          }}
          className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            currentPage === 'order'
              ? 'text-[#B08D57] bg-white/5 font-semibold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#B52A2A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] leading-tight">{tr.nav.order}</span>
        </button>
      </div>
    </div>
  );
};
