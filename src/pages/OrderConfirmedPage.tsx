import React from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { 
  CheckCircle2, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Home, 
  UtensilsCrossed 
} from 'lucide-react';

export const OrderConfirmedPage: React.FC = () => {
  const { language, lastOrder, navigateTo, tr } = useApp();

  if (!lastOrder) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-[#F5F0E8] pt-24 text-center">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          {language === 'es' ? 'No hay pedido activo' : 'No active order found'}
        </h2>
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 px-6 py-2.5 rounded-xl bg-[#1E1B18] text-white text-xs font-semibold"
        >
          {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
        </button>
      </div>
    );
  }

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Hola Asador La Cayena, acabo de realizar el pedido online con referencia *${lastOrder.id}* a nombre de *${lastOrder.customer.name}*. Total: €${lastOrder.total.toFixed(2)}.`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div id="order-confirmed-page" className="min-h-screen bg-[#F5F0E8] pt-24 pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-stone-200 text-center space-y-6">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center shadow-lg animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B52A2A]">
              {language === 'es' ? 'PEDIDO REALIZADO CON ÉXITO' : 'ORDER PLACED SUCCESSFULLY'}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              {language === 'es' ? '¡Tu comida está en marcha!' : 'Your food is on the way!'}
            </h1>
            <p className="text-sm text-stone-600 max-w-md mx-auto mt-2">
              {language === 'es'
                ? 'Nuestra cocina de brasas ha recibido tu pedido y lo preparará con carbón de encina al momento.'
                : 'Our charcoal grill kitchen has received your order and will prepare it freshly over oak coals.'}
            </p>
          </div>

          {/* Reference Badge */}
          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 max-w-sm mx-auto">
            <span className="text-xs text-stone-500 block">
              {language === 'es' ? 'Nº de Referencia de Pedido:' : 'Order Reference Number:'}
            </span>
            <span className="font-mono font-bold text-xl text-[#1E1B18] tracking-wider">{lastOrder.id}</span>
            <span className="block text-[11px] text-emerald-600 font-semibold mt-1">
              ● {language === 'es' ? 'Recibido en cocina' : 'Received in kitchen'}
            </span>
          </div>

          {/* Details Summary Box */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-left space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-1 border-b border-stone-200">
              <span className="text-stone-500">{language === 'es' ? 'Tipo de servicio:' : 'Service type:'}</span>
              <span className="font-bold text-[#B52A2A] capitalize">
                {lastOrder.orderType === 'pickup'
                  ? (language === 'es' ? 'Recogida en Asador' : 'Takeaway Pickup')
                  : (language === 'es' ? 'Entrega a Domicilio' : 'Home Delivery')}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-200">
              <span className="text-stone-500">{language === 'es' ? 'Horario deseado:' : 'Desired time:'}</span>
              <span className="font-bold text-stone-900">{lastOrder.desiredDate} - {lastOrder.desiredTime}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-200">
              <span className="text-stone-500">{language === 'es' ? 'Cliente:' : 'Customer:'}</span>
              <span className="font-bold text-stone-900">{lastOrder.customer.name} ({lastOrder.customer.phone})</span>
            </div>

            {lastOrder.orderType === 'delivery' && (
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">{language === 'es' ? 'Dirección:' : 'Delivery address:'}</span>
                <span className="font-bold text-stone-900 text-right">{lastOrder.customer.address}, {lastOrder.customer.city}</span>
              </div>
            )}

            <div className="flex justify-between py-1 border-b border-stone-200">
              <span className="text-stone-500">{language === 'es' ? 'Método de pago:' : 'Payment method:'}</span>
              <span className="font-bold text-stone-900 capitalize">{lastOrder.paymentMethod.replace('_', ' ')}</span>
            </div>

            {/* Items */}
            <div className="pt-2">
              <span className="text-stone-500 block mb-2 font-semibold">
                {language === 'es' ? 'Artículos incluidos:' : 'Included items:'}
              </span>
              <div className="space-y-1.5 pl-2">
                {lastOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-stone-700">
                    <span>{it.quantity}x {language === 'es' ? it.item.name : (it.item.nameEn || it.item.name)}</span>
                    <span className="font-semibold">€{it.itemTotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-between text-base font-bold text-stone-900 border-t border-stone-300">
              <span>{language === 'es' ? 'Total Pedido:' : 'Order Total:'}</span>
              <span className="text-[#B52A2A]">€{lastOrder.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Restaurant Location & Contact */}
          <div className="p-4 rounded-2xl bg-[#1E1B18] text-white text-xs space-y-2 text-left">
            <div className="flex items-center gap-2 text-[#B08D57] font-semibold">
              <MapPin className="w-4 h-4" />
              <span>{RESTAURANT_INFO.name}</span>
            </div>
            <p className="text-stone-300 pl-6">{RESTAURANT_INFO.address}</p>
            <p className="text-stone-400 pl-6">{language === 'es' ? 'Teléfono:' : 'Phone:'} {RESTAURANT_INFO.phone}</p>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleWhatsAppContact}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'es' ? 'Consultar por WhatsApp' : 'Inquire via WhatsApp'}</span>
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-stone-300"
            >
              <Home className="w-4 h-4" />
              <span>{language === 'es' ? 'Volver al Inicio' : 'Back to Home'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
