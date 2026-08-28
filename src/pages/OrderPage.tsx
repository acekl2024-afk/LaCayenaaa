import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';
import { PaymentMethod, CustomerInfo } from '../types';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, 
  Store, 
  Bike, 
  CreditCard, 
  Banknote, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  Lock,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';

export const OrderPage: React.FC = () => {
  const { 
    language, 
    cart, 
    cartSubtotal, 
    cartDeliveryFee, 
    cartServiceFee, 
    cartTotal, 
    orderType, 
    setOrderType,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    setLastOrder,
    navigateTo,
    tr 
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Form fields
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'La Zubia',
    postalCode: '18140',
    deliveryNotes: '',
    allergies: '',
    specialInstructions: ''
  });

  const [desiredTime, setDesiredTime] = useState<string>('21:00');
  const [desiredDate, setDesiredDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  // Validation
  const validateStep1 = () => {
    if (!customer.name.trim() || !customer.phone.trim() || !customer.email.trim()) {
      setErrorMsg(language === 'es' ? 'Por favor completa tu nombre, teléfono y correo electrónico.' : 'Please enter your name, phone and email.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const validateStep2 = () => {
    if (orderType === 'delivery' && !customer.address?.trim()) {
      setErrorMsg(language === 'es' ? 'Por favor introduce la dirección de entrega.' : 'Please enter your delivery address.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep((s) => Math.min(4, s + 1));
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const order = await apiService.createOrder({
        items: cart,
        orderType,
        customer,
        paymentMethod,
        subtotal: cartSubtotal,
        deliveryFee: cartDeliveryFee,
        serviceFee: cartServiceFee,
        total: cartTotal,
        desiredTime,
        desiredDate,
        notes: customer.specialInstructions
      });

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      clearCart();
      setLastOrder(order);
      navigateTo('order-confirmed', { orderId: order.id });
    } catch (err: any) {
      setErrorMsg(err.message || 'Error processing order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div id="order-empty" className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-[#F5F0E8] pt-36 pb-20 text-center">
        <div className="w-20 h-20 rounded-full bg-white border border-stone-300 shadow-md flex items-center justify-center text-stone-400 mb-4">
          <ShoppingBag className="w-10 h-10 text-[#B08D57]" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-stone-900">{tr.cart.empty}</h2>
        <p className="text-stone-600 text-sm max-w-md mt-2 mb-6">
          {tr.cart.emptySub}
        </p>
        <button
          onClick={() => navigateTo('menu')}
          className="px-8 py-3.5 rounded-xl bg-[#1E1B18] hover:bg-[#B52A2A] text-white font-semibold text-sm transition-colors shadow-lg"
        >
          {tr.cart.exploreMenu}
        </button>
      </div>
    );
  }

  return (
    <div id="order-page" className="min-h-screen bg-[#F5F0E8] pt-32 sm:pt-36 pb-28">
      {/* Header Banner */}
      <div className="bg-[#1E1B18] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-[#B08D57]/30">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E8]">
            {tr.orderFlow.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400">
            {language === 'es' ? 'Recogida rápida en el asador o entrega directa en La Zubia y alrededores.' : 'Quick takeaway pickup or home delivery in La Zubia and surroundings.'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        {/* Step Progress Indicator */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-stone-200 mb-8">
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
            {[
              { num: 1, label: tr.orderFlow.step1 },
              { num: 2, label: tr.orderFlow.step2 },
              { num: 3, label: tr.orderFlow.step3 },
              { num: 4, label: tr.orderFlow.step4 }
            ].map((step) => {
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div
                  key={step.num}
                  className={`py-2 px-1 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-[#1E1B18] text-[#B08D57] shadow-sm font-bold'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  <span className="block text-sm">{step.num}</span>
                  <span className="hidden sm:inline text-[11px] truncate">{step.label.split('.')[1]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout: Main Step Form & Cart Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200">
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-[#B52A2A]/10 border border-[#B52A2A] text-[#B52A2A] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: CONTACT DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                    <span className="w-8 h-8 rounded-full bg-[#1E1B18] text-[#B08D57] font-bold text-sm flex items-center justify-center">1</span>
                    <h3 className="font-serif text-xl font-bold text-stone-900">{tr.orderFlow.step1}</h3>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {tr.orderFlow.fullName}
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="Ej. Juan Pérez"
                        className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D57]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {tr.orderFlow.phone}
                        </label>
                        <input
                          type="tel"
                          required
                          value={customer.phone}
                          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                          placeholder="+34 600 000 000"
                          className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {tr.orderFlow.email}
                        </label>
                        <input
                          type="email"
                          required
                          value={customer.email}
                          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                          placeholder="juan@ejemplo.com"
                          className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: DELIVERY & TIMING */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                    <span className="w-8 h-8 rounded-full bg-[#1E1B18] text-[#B08D57] font-bold text-sm flex items-center justify-center">2</span>
                    <h3 className="font-serif text-xl font-bold text-stone-900">{tr.orderFlow.step2}</h3>
                  </div>

                  {/* Order Type Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`flex items-center justify-center gap-2 p-3.5 rounded-xl text-xs font-bold border transition-all ${
                        orderType === 'pickup'
                          ? 'bg-[#1E1B18] border-[#1E1B18] text-[#B08D57] shadow-md'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>{tr.cart.pickup}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`flex items-center justify-center gap-2 p-3.5 rounded-xl text-xs font-bold border transition-all ${
                        orderType === 'delivery'
                          ? 'bg-[#1E1B18] border-[#1E1B18] text-[#B08D57] shadow-md'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>{tr.cart.delivery}</span>
                    </button>
                  </div>

                  {/* Address fields if delivery */}
                  {orderType === 'delivery' && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {tr.orderFlow.address}
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.address}
                          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                          placeholder="Calle Mayor nº12, 2ºB"
                          className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            {tr.orderFlow.city}
                          </label>
                          <input
                            type="text"
                            value={customer.city}
                            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                            className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#B08D57]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            {tr.orderFlow.postalCode}
                          </label>
                          <input
                            type="text"
                            value={customer.postalCode}
                            onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                            className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#B08D57]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {tr.orderFlow.deliveryNotes}
                        </label>
                        <input
                          type="text"
                          value={customer.deliveryNotes}
                          onChange={(e) => setCustomer({ ...customer, deliveryNotes: e.target.value })}
                          placeholder="Ej. El timbre no funciona, llamar al llegar"
                          className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Timing & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {language === 'es' ? 'Fecha deseada' : 'Desired Date'}
                      </label>
                      <input
                        type="date"
                        value={desiredDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDesiredDate(e.target.value)}
                        className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#B08D57]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {tr.orderFlow.desiredTime}
                      </label>
                      <select
                        value={desiredTime}
                        onChange={(e) => setDesiredTime(e.target.value)}
                        className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#B08D57]"
                      >
                        <option value="13:30">13:30 (Almuerzo)</option>
                        <option value="14:00">14:00 (Almuerzo)</option>
                        <option value="14:30">14:30 (Almuerzo)</option>
                        <option value="15:00">15:00 (Almuerzo)</option>
                        <option value="20:30">20:30 (Cena)</option>
                        <option value="21:00">21:00 (Cena)</option>
                        <option value="21:30">21:30 (Cena)</option>
                        <option value="22:00">22:00 (Cena)</option>
                        <option value="22:30">22:30 (Cena)</option>
                      </select>
                    </div>
                  </div>

                  {/* Allergies */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {tr.orderFlow.allergies}
                    </label>
                    <textarea
                      rows={2}
                      value={customer.allergies}
                      onChange={(e) => setCustomer({ ...customer, allergies: e.target.value })}
                      placeholder={tr.orderFlow.allergiesPlaceholder}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                    <span className="w-8 h-8 rounded-full bg-[#1E1B18] text-[#B08D57] font-bold text-sm flex items-center justify-center">3</span>
                    <h3 className="font-serif text-xl font-bold text-stone-900">{tr.orderFlow.paymentTitle}</h3>
                  </div>

                  <div className="space-y-3">
                    {/* Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#B52A2A] bg-[#B52A2A]/5 shadow-sm'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#1E1B18] text-[#B08D57] flex items-center justify-center shrink-0">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-sm text-stone-900 block">{tr.orderFlow.paymentCard}</span>
                        <span className="text-xs text-stone-500">{tr.orderFlow.paymentCardSub}</span>
                      </div>
                    </button>

                    {/* Cash at pickup */}
                    {orderType === 'pickup' && (
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cash_pickup')}
                        className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                          paymentMethod === 'cash_pickup'
                            ? 'border-[#B52A2A] bg-[#B52A2A]/5 shadow-sm'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0">
                          <Banknote className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-sm text-stone-900 block">{tr.orderFlow.paymentCashPickup}</span>
                          <span className="text-xs text-stone-500">{tr.orderFlow.paymentCashPickupSub}</span>
                        </div>
                      </button>
                    )}

                    {/* Cash on delivery */}
                    {orderType === 'delivery' && (
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cash_delivery')}
                        className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                          paymentMethod === 'cash_delivery'
                            ? 'border-[#B52A2A] bg-[#B52A2A]/5 shadow-sm'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0">
                          <Banknote className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-sm text-stone-900 block">{tr.orderFlow.paymentCashDelivery}</span>
                          <span className="text-xs text-stone-500">{tr.orderFlow.paymentCashDeliverySub}</span>
                        </div>
                      </button>
                    )}

                    {/* Bizum */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bizum')}
                      className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                        paymentMethod === 'bizum'
                          ? 'border-[#B52A2A] bg-[#B52A2A]/5 shadow-sm'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#00A499] text-white font-bold flex items-center justify-center shrink-0">
                        B
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-sm text-stone-900 block">{tr.orderFlow.paymentBizum}</span>
                        <span className="text-xs text-stone-500">{tr.orderFlow.paymentBizumSub}</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & CONFIRM */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                    <span className="w-8 h-8 rounded-full bg-[#1E1B18] text-[#B08D57] font-bold text-sm flex items-center justify-center">4</span>
                    <h3 className="font-serif text-xl font-bold text-stone-900">{tr.orderFlow.step4}</h3>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span className="text-stone-500">Cliente:</span>
                      <span className="font-bold text-stone-900">{customer.name} ({customer.phone})</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span className="text-stone-500">Tipo de pedido:</span>
                      <span className="font-bold text-[#B52A2A]">
                        {orderType === 'pickup' ? tr.cart.pickup : tr.cart.delivery}
                      </span>
                    </div>
                    {orderType === 'delivery' && (
                      <div className="flex justify-between py-1 border-b border-stone-200">
                        <span className="text-stone-500">Dirección:</span>
                        <span className="font-bold text-stone-900 text-right">{customer.address}, {customer.city}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span className="text-stone-500">Hora deseada:</span>
                      <span className="font-bold text-stone-900">{desiredDate} a las {desiredTime}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-stone-500">Método de pago:</span>
                      <span className="font-bold text-stone-900 capitalize">{paymentMethod.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 italic">
                    {tr.orderFlow.disclaimer}
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="py-3 px-5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{tr.reservationFlow.backBtn}</span>
                  </button>
                ) : <div />}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="py-3.5 px-6 rounded-xl bg-[#1E1B18] hover:bg-stone-900 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all"
                  >
                    <span>{tr.reservationFlow.nextBtn}</span>
                    <ArrowRight className="w-4 h-4 text-[#B08D57]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handlePlaceOrder}
                    className="py-4 px-8 rounded-xl bg-gradient-to-r from-[#B52A2A] to-[#C55A2A] hover:from-[#9c2424] hover:to-[#b04f24] text-white font-bold text-sm shadow-xl shadow-[#B52A2A]/30 flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isSubmitting ? 'Procesando...' : tr.orderFlow.placeOrderBtn}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Cart Summary (Col 8-12) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#1E1B18] text-white rounded-3xl p-6 shadow-2xl border border-[#B08D57]/30">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#B08D57]" />
                  <span>{tr.orderFlow.orderSummary}</span>
                </h3>
                <span className="text-xs text-stone-400">{cart.length} platos</span>
              </div>

              {/* Items List */}
              <div className="py-4 space-y-3 max-h-80 overflow-y-auto pr-1">
                {cart.map((cartItem) => {
                  const itemName = language === 'es' ? cartItem.item.name : (cartItem.item.nameEn || cartItem.item.name);
                  return (
                    <div key={cartItem.cartItemId} className="flex gap-3 text-xs pb-3 border-b border-stone-800/60">
                      <img
                        src={cartItem.item.image}
                        alt={itemName}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-700"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-stone-200 truncate">{itemName}</h4>
                        {cartItem.customizations && (
                          <div className="text-[10px] text-[#B08D57]">
                            {cartItem.customizations.meatDoneness && `Punto: ${tr.customization.meatOptions[cartItem.customizations.meatDoneness]}`}
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-stone-400">{cartItem.quantity}x €{cartItem.item.price.toFixed(2)}</span>
                          <span className="font-bold text-white">€{cartItem.itemTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Breakdown */}
              <div className="pt-4 border-t border-stone-800 space-y-2 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>{tr.cart.subtotal}</span>
                  <span className="font-semibold text-white">€{cartSubtotal.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>{tr.cart.deliveryFee}</span>
                    <span className="font-semibold text-white">
                      {cartDeliveryFee === 0 ? 'Gratis' : `€${cartDeliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{tr.cart.serviceFee}</span>
                  <span className="font-semibold text-white">€{cartServiceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-stone-800">
                  <span>{tr.cart.total}</span>
                  <span className="text-[#B08D57]">€{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
