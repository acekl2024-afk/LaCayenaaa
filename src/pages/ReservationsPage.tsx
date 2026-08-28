import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';
import { INITIAL_MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { SeatingPreference, Reservation } from '../types';
import confetti from 'canvas-confetti';
import { 
  CalendarDays, 
  Users, 
  Clock, 
  MapPin, 
  UtensilsCrossed, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronLeft, 
  Plus, 
  Minus, 
  Trash2, 
  Sparkles, 
  Calendar as CalendarIcon,
  MessageCircle,
  Home,
  Flame,
  Wine
} from 'lucide-react';

export const ReservationsPage: React.FC = () => {
  const { 
    language, 
    quickReservationState, 
    preOrderCart, 
    removeFromPreOrder, 
    updatePreOrderQuantity, 
    clearPreOrder,
    openCustomizationModal, 
    addToPreOrder, 
    navigateTo,
    tr 
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Step 1: Date, Guests, Time
  const [guests, setGuests] = useState<number>(quickReservationState?.guests || 2);
  const [date, setDate] = useState<string>(() => {
    if (quickReservationState?.date) return quickReservationState.date;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [serviceType, setServiceType] = useState<'lunch' | 'dinner'>('dinner');
  const [time, setTime] = useState<string>(quickReservationState?.time || '21:00');

  // Step 2: Seating Area
  const [seatingPreference, setSeatingPreference] = useState<SeatingPreference>('fireplace');

  // Step 3: Pre-order is managed by preOrderCart & local selector
  const [selectedCategoryForPreorder, setSelectedCategoryForPreorder] = useState<string>('meats');

  // Step 4: Contact & Requests
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dietaryRequirements, setDietaryRequirements] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const lunchTimes = ['13:30', '14:00', '14:30', '15:00'];
  const dinnerTimes = ['20:30', '21:00', '21:30', '22:00', '22:30'];

  const seatingOptions: { id: SeatingPreference; title: string; desc: string; icon: string }[] = [
    { 
      id: 'fireplace', 
      title: language === 'es' ? 'Salón Principal con Chimenea' : 'Main Room with Fireplace', 
      desc: language === 'es' ? 'Ambiente cálido y acogedor presidido por el fuego.' : 'Warm, cozy indoor setting next to the open fireplace.',
      icon: '🔥'
    },
    { 
      id: 'terrace', 
      title: language === 'es' ? 'Terraza Exterior Cubierta' : 'Covered Outdoor Terrace', 
      desc: language === 'es' ? 'Al aire libre, protegida y con la brisa de la sierra.' : 'Open-air sheltered terrace with fresh mountain breeze.',
      icon: '🌿'
    },
    { 
      id: 'indoor', 
      title: language === 'es' ? 'Salón Climatizado' : 'Indoor Dining Room', 
      desc: language === 'es' ? 'Confort total para almuerzos y cenas tranquilas.' : 'Total comfort for peaceful lunches and dinners.',
      icon: '🏛️'
    },
    { 
      id: 'no_preference', 
      title: language === 'es' ? 'Sin Preferencia (Cualquiera)' : 'Any Available Table', 
      desc: language === 'es' ? 'La mejor mesa disponible asignada por el asador.' : 'Best available table assigned by the restaurant team.',
      icon: '✨'
    }
  ];

  const preOrderTotal = preOrderCart.reduce((sum, item) => sum + item.itemTotal, 0);

  const validateStep4 = () => {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg(language === 'es' ? 'Por favor completa nombre, teléfono y email de contacto.' : 'Please enter your name, phone and email.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 4 && !validateStep4()) return;
    setErrorMsg('');
    setCurrentStep((s) => Math.min(5, s + 1));
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleSubmitReservation = async () => {
    if (!validateStep4()) return;
    setIsSubmitting(true);
    setErrorMsg('');

    const combinedRequests = [
      specialRequests.trim(),
      dietaryRequirements.trim() ? `Alergias: ${dietaryRequirements.trim()}` : ''
    ].filter(Boolean).join(' | ');

    try {
      const res = await apiService.createReservation({
        guests,
        date,
        time,
        seatingPreference,
        customer: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim()
        },
        specialRequests: combinedRequests || undefined,
        preOrderedItems: preOrderCart.length > 0 ? preOrderCart : undefined,
        preOrderTotal: preOrderTotal > 0 ? preOrderTotal : undefined
      });

      setConfirmedReservation(res);
      clearPreOrder();

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}

      setCurrentStep(5);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error processing reservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const menuItemsForPreorder = INITIAL_MENU_ITEMS.filter((item) => {
    if (selectedCategoryForPreorder === 'all') return true;
    return item.category === selectedCategoryForPreorder;
  });

  return (
    <div id="reservations-page" className="min-h-screen bg-[#F5F0E8] pt-32 sm:pt-36 pb-28">
      {/* Banner */}
      <div className="bg-[#1E1B18] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#B08D57]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B52A2A]/20 border border-[#B52A2A]/40 text-[#C55A2A] text-xs font-bold uppercase tracking-wider">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'RESERVA ONLINE INMEDIATA' : 'INSTANT ONLINE RESERVATION'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F0E8]">
            {tr.reservationFlow.title}
          </h1>
          <p className="text-sm text-stone-300 max-w-xl mx-auto">
            {tr.reservationFlow.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Step Indicator */}
        {currentStep < 5 && (
          <div className="bg-white rounded-2xl p-4 shadow-xl border border-stone-200 mb-8">
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
              {[
                { num: 1, label: language === 'es' ? '1. Comensales y Hora' : '1. Guests & Time' },
                { num: 2, label: language === 'es' ? '2. Preferencia de Mesa' : '2. Seating Area' },
                { num: 3, label: language === 'es' ? '3. Pre-pedido (Opcional)' : '3. Pre-order (Opt)' },
                { num: 4, label: language === 'es' ? '4. Datos de Contacto' : '4. Contact Details' }
              ].map((st) => {
                const isCurrent = currentStep === st.num;
                const isDone = currentStep > st.num;
                return (
                  <div
                    key={st.num}
                    className={`py-2 px-1 rounded-xl transition-all ${
                      isCurrent
                        ? 'bg-[#1E1B18] text-[#B08D57] shadow-sm font-bold'
                        : isDone
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-stone-100 text-stone-400'
                    }`}
                  >
                    <span className="block text-sm">{st.num}</span>
                    <span className="hidden sm:inline text-[11px] truncate">{st.label.split('. ')[1]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-stone-200">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-[#B52A2A]/10 border border-[#B52A2A] text-[#B52A2A] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: GUESTS, DATE, SERVICE & TIME */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <span className="w-8 h-8 rounded-full bg-[#1E1B18] text-[#B08D57] font-bold text-sm flex items-center justify-center">1</span>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {language === 'es' ? '¿Cuántos seréis y cuándo vendréis?' : 'How many guests and when?'}
                </h3>
              </div>

              {/* Number of guests */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  {tr.reservationBanner.guestsLabel}
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                        guests === num
                          ? 'bg-[#1E1B18] text-[#B08D57] border-[#1E1B18] shadow-md scale-105'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {num} {num === 1 ? 'persona' : 'pers.'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  {tr.reservationBanner.dateLabel}
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#B08D57]"
                />
              </div>

              {/* Service & Time slot */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    {tr.reservationBanner.timeLabel}
                  </label>
                  {/* Service toggle */}
                  <div className="flex bg-stone-100 rounded-lg p-0.5 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => {
                        setServiceType('lunch');
                        setTime('14:00');
                      }}
                      className={`px-3 py-1 rounded-md transition-all ${
                        serviceType === 'lunch' ? 'bg-[#B52A2A] text-white' : 'text-stone-600'
                      }`}
                    >
                      Almuerzo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setServiceType('dinner');
                        setTime('21:00');
                      }}
                      className={`px-3 py-1 rounded-md transition-all ${
                        serviceType === 'dinner' ? 'bg-[#B52A2A] text-white' : 'text-stone-600'
                      }`}
                    >
                      Cena
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {(serviceType === 'lunch' ? lunchTimes : dinnerTimes).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                        time === slot
                          ? 'bg-[#1E1B18] text-[#B08D57] border-[#1E1B18] shadow-md scale-105'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SEATING AREA PREFERENCE */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <span className="w-8 h-8 rounded-full bg-[#1E1B18] text-[#B08D57] font-bold text-sm flex items-center justify-center">2</span>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {language === 'es' ? '¿Dónde prefieres disfrutar de tu mesa?' : 'Where would you prefer to sit?'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {seatingOptions.map((opt) => {
                  const isSelected = seatingPreference === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSeatingPreference(opt.id)}
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#B52A2A] bg-[#B52A2A]/5 shadow-md ring-2 ring-[#B52A2A]/20'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <div className="text-2xl mb-2">{opt.icon}</div>
                        <h4 className="font-serif text-base font-bold text-stone-900">{opt.title}</h4>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">{opt.desc}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-end">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#B52A2A] bg-[#B52A2A]' : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: OPTIONAL FOOD PRE-ORDER */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#1E1B18] text-[#B08D57] font-bold text-sm flex items-center justify-center">3</span>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {language === 'es' ? 'Pre-selección de Platos (Opcional)' : 'Food Pre-Order (Optional)'}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {language === 'es' ? 'Asegura la disponibilidad de tus cortes Josper y especialidades favoritas para cuando llegues.' : 'Ensure availability of your favorite Josper cuts and dishes for when you arrive.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pre-order items summary bar if any */}
              {preOrderCart.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#1E1B18] text-white space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B08D57] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {language === 'es' ? 'Platos seleccionados para la mesa' : 'Pre-selected dishes for your table'}
                    </span>
                    <button
                      onClick={clearPreOrder}
                      className="text-xs text-stone-400 hover:text-[#B52A2A]"
                    >
                      {language === 'es' ? 'Limpiar' : 'Clear'}
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {preOrderCart.map((it) => (
                      <div key={it.cartItemId} className="flex justify-between items-center text-xs">
                        <div>
                          <span className="font-medium text-stone-200">
                            {it.quantity}x {language === 'es' ? it.item.name : (it.item.nameEn || it.item.name)}
                          </span>
                          {it.customizations?.meatDoneness && (
                            <span className="text-[10px] text-[#B08D57] ml-2">({it.customizations.meatDoneness})</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">€{it.itemTotal.toFixed(2)}</span>
                          <button
                            onClick={() => removeFromPreOrder(it.cartItemId)}
                            className="text-stone-400 hover:text-[#B52A2A] p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 flex justify-between text-sm font-bold text-[#F5F0E8] border-t border-stone-800">
                    <span>{language === 'es' ? 'Total Estimado Platos:' : 'Estimated Dishes Total:'}</span>
                    <span className="text-[#B08D57]">€{preOrderTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Mini Dish Selector for Preorder */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryForPreorder('meats')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                      selectedCategoryForPreorder === 'meats' ? 'bg-[#1E1B18] text-[#B08D57]' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    🔥 {language === 'es' ? 'Carnes Josper' : 'Josper Meats'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryForPreorder('starters')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                      selectedCategoryForPreorder === 'starters' ? 'bg-[#1E1B18] text-[#B08D57]' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    🍴 {language === 'es' ? 'Entrantes & Raciones' : 'Starters & Portions'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryForPreorder('pizzas')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                      selectedCategoryForPreorder === 'pizzas' ? 'bg-[#1E1B18] text-[#B08D57]' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    🍕 {language === 'es' ? 'Pizzas Artesanas' : 'Artisan Pizzas'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryForPreorder('appetisers')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                      selectedCategoryForPreorder === 'appetisers' ? 'bg-[#1E1B18] text-[#B08D57]' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    ✨ {language === 'es' ? 'Aperitivos & Conservas' : 'Appetisers'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryForPreorder('desserts')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                      selectedCategoryForPreorder === 'desserts' ? 'bg-[#1E1B18] text-[#B08D57]' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    🍰 {language === 'es' ? 'Postres Artemisa' : 'Desserts'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryForPreorder('beers')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                      selectedCategoryForPreorder === 'beers' ? 'bg-[#1E1B18] text-[#B08D57]' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    🍺 {language === 'es' ? 'Cervezas' : 'Beers'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryForPreorder('wines')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                      selectedCategoryForPreorder === 'wines' ? 'bg-[#1E1B18] text-[#B08D57]' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    🍷 {language === 'es' ? 'Vinos' : 'Wines'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto p-1">
                  {menuItemsForPreorder.map((dish) => {
                    const dishName = language === 'es' ? dish.name : (dish.nameEn || dish.name);
                    const hasOptions = dish.supportsMeatDoneness || dish.supportsSpiceLevel || (dish.minQuantity && dish.minQuantity > 1);

                    return (
                      <div
                        key={dish.id}
                        className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-3 shadow-xs hover:border-[#B08D57]/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={dish.image}
                            alt={dishName}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-semibold text-xs text-stone-900 block truncate">{dishName}</span>
                            <span className="text-xs text-[#B52A2A] font-bold">€{dish.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (hasOptions) {
                              openCustomizationModal(dish, 'preorder');
                            } else {
                              addToPreOrder(dish);
                            }
                          }}
                          className="p-2 rounded-lg bg-stone-100 hover:bg-[#B52A2A] hover:text-white text-stone-700 transition-colors shrink-0"
                          title="Añadir a pre-pedido"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & SPECIAL REQUESTS */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <span className="w-8 h-8 rounded-full bg-[#1E1B18] text-[#B08D57] font-bold text-sm flex items-center justify-center">4</span>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {language === 'es' ? 'Datos de Contacto y Preferencias' : 'Contact Details & Preferences'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {tr.orderFlow.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Carmen González"
                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {tr.orderFlow.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {tr.orderFlow.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="carmen@ejemplo.com"
                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {language === 'es' ? 'Alergias o Intolerancias' : 'Allergies / Dietary notes'}
                  </label>
                  <input
                    type="text"
                    value={dietaryRequirements}
                    onChange={(e) => setDietaryRequirements(e.target.value)}
                    placeholder={language === 'es' ? 'Ej. 1 persona celíaca, sin frutos secos...' : 'e.g. 1 gluten-free, nut allergy...'}
                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {language === 'es' ? 'Peticiones especiales o notas' : 'Special requests / notes'}
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder={language === 'es' ? 'Ej. Necesitamos 1 trona para bebé, celebración de aniversario...' : 'e.g. High chair needed, anniversary celebration...'}
                    className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRMATION SUCCESS */}
          {currentStep === 5 && confirmedReservation && (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                  {language === 'es' ? 'RESERVA REGISTRADA' : 'RESERVATION CONFIRMED'}
                </span>
                <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
                  {language === 'es' ? '¡Tu mesa está reservada!' : 'Your table is booked!'}
                </h2>
                <p className="text-sm text-stone-600 max-w-md mx-auto mt-2">
                  {language === 'es' 
                    ? 'Hemos guardado tu solicitud en Asador La Cayena. Te esperamos con los brazos abiertos y las brasas a punto.' 
                    : 'We have confirmed your booking at Asador La Cayena. We look forward to welcoming you.'}
                </p>
              </div>

              {/* Reservation Code Badge */}
              <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 max-w-xs mx-auto">
                <span className="text-xs text-stone-500 block">
                  {language === 'es' ? 'Código de Reserva:' : 'Booking Reference:'}
                </span>
                <span className="font-mono font-bold text-2xl text-[#1E1B18] tracking-widest">
                  {confirmedReservation.reservationNumber || confirmedReservation.id}
                </span>
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs sm:text-sm space-y-2.5 max-w-lg mx-auto">
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Comensales:</span>
                  <span className="font-bold text-stone-900">{confirmedReservation.guests} personas</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Fecha y Hora:</span>
                  <span className="font-bold text-stone-900">{confirmedReservation.date} a las {confirmedReservation.time}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Zona reservada:</span>
                  <span className="font-bold text-[#B52A2A] capitalize">
                    {seatingOptions.find(o => o.id === confirmedReservation.seatingPreference)?.title || confirmedReservation.seatingPreference}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Titular:</span>
                  <span className="font-bold text-stone-900">{confirmedReservation.customer.name} ({confirmedReservation.customer.phone})</span>
                </div>
                {confirmedReservation.preOrderedItems && confirmedReservation.preOrderedItems.length > 0 && (
                  <div className="pt-2">
                    <span className="text-stone-500 block font-semibold mb-1">Platos pre-pedidos:</span>
                    <div className="space-y-1 pl-2 text-stone-700">
                      {confirmedReservation.preOrderedItems.map((pi, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{pi.quantity}x {language === 'es' ? pi.item.name : (pi.item.nameEn || pi.item.name)}</span>
                          <span className="font-semibold">€{pi.itemTotal.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Add to Google Calendar & WhatsApp */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                <a
                  href={apiService.generateGoogleCalendarUrl(confirmedReservation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#1E1B18] hover:bg-stone-900 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <CalendarIcon className="w-4 h-4 text-[#B08D57]" />
                  <span>{language === 'es' ? 'Añadir a Google Calendar' : 'Add to Google Calendar'}</span>
                </a>

                <a
                  href={apiService.generateWhatsAppReservationLink(confirmedReservation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'es' ? 'Confirmar por WhatsApp' : 'Confirm via WhatsApp'}</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigateTo('home')}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline"
                >
                  {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
                </button>
              </div>
            </div>
          )}

          {/* Navigation buttons for wizard */}
          {currentStep < 5 && (
            <div className="pt-8 border-t border-stone-200 flex items-center justify-between gap-4">
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
                  onClick={handleSubmitReservation}
                  className="py-4 px-8 rounded-xl bg-gradient-to-r from-[#B52A2A] to-[#C55A2A] hover:from-[#9c2424] hover:to-[#b04f24] text-white font-bold text-sm shadow-xl shadow-[#B52A2A]/30 flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? 'Confirmando...' : (language === 'es' ? 'Confirmar Reserva' : 'Confirm Reservation')}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
