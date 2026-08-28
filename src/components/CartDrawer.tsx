import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Bike, 
  Store,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    language,
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartDeliveryFee,
    cartServiceFee,
    cartTotal,
    orderType,
    setOrderType,
    navigateTo,
    tr
  } = useApp();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('order');
  };

  return (
    <div 
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end transition-opacity duration-300 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCartOpen(false);
      }}
    >
      <div 
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#1E1B18] text-[#F5F0E8] h-full shadow-2xl flex flex-col border-l border-[#B08D57]/30"
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-[#B08D57]/20 flex items-center justify-between bg-[#151311]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#B52A2A]/20 text-[#B52A2A] border border-[#B52A2A]/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">{tr.cart.title}</h3>
              <span className="text-xs text-stone-400">
                {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-[#B52A2A] px-2 py-1 transition-colors"
                title="Vaciar carrito"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Order Type Selector */}
        <div className="p-4 bg-[#151311]/50 border-b border-stone-800">
          <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
            {tr.cart.orderType}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setOrderType('pickup')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                orderType === 'pickup'
                  ? 'bg-[#B52A2A] border-[#B52A2A] text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>{tr.cart.pickup}</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                orderType === 'delivery'
                  ? 'bg-[#B52A2A] border-[#B52A2A] text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>{tr.cart.delivery}</span>
            </button>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-[#B08D57]/20 flex items-center justify-center text-stone-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-semibold text-white">{tr.cart.empty}</h4>
                <p className="text-xs text-stone-400 max-w-xs mt-1">
                  {tr.cart.emptySub}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('menu');
                }}
                className="py-2.5 px-5 rounded-xl bg-[#B08D57] hover:bg-[#c59d60] text-black font-semibold text-xs transition-colors"
              >
                {tr.cart.exploreMenu}
              </button>
            </div>
          ) : (
            cart.map((cartItem) => {
              const itemName = language === 'es' ? cartItem.item.name : (cartItem.item.nameEn || cartItem.item.name);
              return (
                <div
                  key={cartItem.cartItemId}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 flex gap-3 items-center group hover:border-[#B08D57]/30 transition-all"
                >
                  <img
                    src={cartItem.item.image}
                    alt={itemName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-stone-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm text-white truncate pr-2">
                        {itemName}
                      </h4>
                      <button
                        onClick={() => removeFromCart(cartItem.cartItemId)}
                        className="text-stone-500 hover:text-[#B52A2A] p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization Badges */}
                    {cartItem.customizations && (
                      <div className="text-[11px] text-[#B08D57] mt-0.5 space-y-0.5">
                        {cartItem.customizations.meatDoneness && (
                          <div className="capitalize">
                            Punto: {tr.customization.meatOptions[cartItem.customizations.meatDoneness]}
                          </div>
                        )}
                        {cartItem.customizations.spiceLevel && (
                          <div className="capitalize">
                            Picante: {tr.customization.spiceOptions[cartItem.customizations.spiceLevel]}
                          </div>
                        )}
                        {cartItem.customizations.specialInstructions && (
                          <div className="text-stone-400 italic line-clamp-1">
                            «{cartItem.customizations.specialInstructions}»
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-sm text-white">
                        €{cartItem.itemTotal.toFixed(2)}
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center bg-black/40 rounded-lg border border-white/10">
                        <button
                          onClick={() => updateCartQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-white">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Cart Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#151311] border-t border-[#B08D57]/20 space-y-3">
            {orderType === 'delivery' && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#B08D57]/10 border border-[#B08D57]/20 text-[11px] text-[#B08D57]">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{tr.cart.freeDeliveryNotice}</span>
              </div>
            )}

            <div className="space-y-1.5 text-xs text-stone-400">
              <div className="flex justify-between">
                <span>{tr.cart.subtotal}</span>
                <span className="text-stone-200">€{cartSubtotal.toFixed(2)}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>{tr.cart.deliveryFee}</span>
                  <span className="text-stone-200">
                    {cartDeliveryFee === 0 ? 'Gratis' : `€${cartDeliveryFee.toFixed(2)}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{tr.cart.serviceFee}</span>
                <span className="text-stone-200">€{cartServiceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-stone-800">
                <span>{tr.cart.total}</span>
                <span className="text-[#B08D57]">€{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B52A2A] to-[#C55A2A] hover:from-[#9c2424] hover:to-[#b04f24] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#B52A2A]/20 transition-all transform active:scale-95"
            >
              <span>{tr.cart.checkoutBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
