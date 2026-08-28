import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { 
  Smartphone, 
  Apple, 
  Download, 
  QrCode, 
  X, 
  Check, 
  Flame, 
  Calendar, 
  Award, 
  Bell, 
  Navigation, 
  Star, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight,
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';

interface MobileAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlatform?: 'ios' | 'android' | 'all';
}

export const MobileAppModal: React.FC<MobileAppModalProps> = ({
  isOpen,
  onClose,
  initialPlatform = 'all',
}) => {
  const { language, navigateTo } = useApp();
  const [deviceFrame, setDeviceFrame] = useState<'iphone' | 'android'>('iphone');
  const [activeTab, setActiveTab] = useState<'reserve' | 'order' | 'loyalty' | 'notifications'>('loyalty');
  const [loyaltyStamps, setLoyaltyStamps] = useState<number>(3);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [installedSuccess, setInstalledSuccess] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (initialPlatform === 'android') {
      setDeviceFrame('android');
    } else if (initialPlatform === 'ios') {
      setDeviceFrame('iphone');
    }
  }, [initialPlatform]);

  if (!isOpen) return null;

  const handleDownload = (platform: 'ios' | 'android') => {
    setDownloadProgress(10);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          setInstalledSuccess(true);
          setTimeout(() => {
            setDownloadProgress(null);
          }, 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleStamp = () => {
    if (loyaltyStamps < 5) {
      setLoyaltyStamps(loyaltyStamps + 1);
    } else {
      setLoyaltyStamps(1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        id="mobile-app-modal" 
        className="bg-[#181614] border border-[#B08D57]/40 rounded-3xl max-w-4xl w-full text-white shadow-2xl overflow-hidden relative my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
          {/* Left Column: App Description & Download CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B52A2A]/20 border border-[#B52A2A]/40 text-[#F5F0E8] text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>{language === 'es' ? 'App Oficial para iOS & Android' : 'Official iOS & Android App'}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#F5F0E8] tracking-tight leading-tight">
                {language === 'es'
                  ? 'Lleva Asador La Cayena en tu Bolsillo'
                  : 'Carry Asador La Cayena in Your Pocket'}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {language === 'es'
                  ? 'Disfruta de reservas instantáneas en 1 clic, pre-pedidos de carnes al Josper con seguimiento en directo, tarjeta de fidelización con regalos y ofertas exclusivas.'
                  : 'Enjoy 1-tap table bookings, Josper grill pre-orders with live status tracking, digital loyalty punch card and exclusive VIP perks.'}
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">
                    {language === 'es' ? 'Club de Fidelidad' : 'Loyalty Club'}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {language === 'es' ? '5 sellos = Postre gratis' : '5 stamps = Free dessert'}
                  </span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2.5">
                <Flame className="w-4 h-4 text-[#B52A2A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">
                    {language === 'es' ? 'Josper Express' : 'Josper Express'}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {language === 'es' ? 'Pre-pide tu punto de carne' : 'Pre-order doneness'}
                  </span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2.5">
                <Bell className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">
                    {language === 'es' ? 'Alertas de Mesa' : 'Table Alerts'}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {language === 'es' ? 'Confirmación inmediata' : 'Instant confirmation'}
                  </span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2.5">
                <Navigation className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">
                    {language === 'es' ? 'GPS & Offline' : 'GPS & Offline'}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {language === 'es' ? 'Ruta directa a La Zubia' : 'Direct route to La Zubia'}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Download & QR Code Section */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                {/* iOS App Store Button */}
                <button
                  onClick={() => handleDownload('ios')}
                  className="flex-1 min-w-[150px] py-3 px-4 rounded-xl bg-white text-black hover:bg-stone-200 transition-all font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95"
                >
                  <Apple className="w-4 h-4" />
                  <div className="text-left leading-tight">
                    <span className="text-[9px] block text-stone-600 font-normal">Download on</span>
                    <span className="font-bold text-xs">App Store (iOS)</span>
                  </div>
                </button>

                {/* Google Play / Android APK Button */}
                <button
                  onClick={() => handleDownload('android')}
                  className="flex-1 min-w-[150px] py-3 px-4 rounded-xl bg-[#25221F] hover:bg-[#322E2A] text-white border border-stone-700 transition-all font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <div className="text-left leading-tight">
                    <span className="text-[9px] block text-stone-400 font-normal">Get it on</span>
                    <span className="font-bold text-xs">Google Play (Android)</span>
                  </div>
                </button>
              </div>

              {/* Download Progress or Installed Banner */}
              {downloadProgress !== null && (
                <div className="bg-white/10 rounded-xl p-3 space-y-1.5 animate-fadeIn">
                  <div className="flex justify-between text-xs font-bold text-stone-300">
                    <span>{language === 'es' ? 'Instalando aplicación...' : 'Installing application...'}</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <div className="w-full bg-stone-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#B52A2A] h-full transition-all duration-200 rounded-full"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {installedSuccess && (
                <div className="bg-emerald-950/80 border border-emerald-500/60 rounded-xl p-3 text-xs text-emerald-200 flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>
                    {language === 'es'
                      ? '¡Aplicación Asador La Cayena lista en tu pantalla de inicio!'
                      : 'Asador La Cayena App is ready on your Home Screen!'}
                  </span>
                </div>
              )}

              {/* QR Code Quick Scan for Smartphone */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-4">
                <div className="w-16 h-16 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center">
                  {/* SVG representation of standard QR Code */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                    <rect width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="28" height="28" fill="black" />
                    <rect x="15" y="15" width="18" height="18" fill="white" />
                    <rect x="19" y="19" width="10" height="10" fill="black" />
                    <rect x="62" y="10" width="28" height="28" fill="black" />
                    <rect x="67" y="15" width="18" height="18" fill="white" />
                    <rect x="71" y="19" width="10" height="10" fill="black" />
                    <rect x="10" y="62" width="28" height="28" fill="black" />
                    <rect x="15" y="67" width="18" height="18" fill="white" />
                    <rect x="19" y="71" width="10" height="10" fill="black" />
                    <rect x="45" y="15" width="8" height="8" fill="black" />
                    <rect x="45" y="35" width="14" height="6" fill="black" />
                    <rect x="55" y="45" width="10" height="10" fill="black" />
                    <rect x="70" y="55" width="18" height="8" fill="black" />
                    <rect x="45" y="70" width="10" height="18" fill="black" />
                    <rect x="65" y="75" width="15" height="12" fill="black" />
                  </svg>
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-white block">
                    {language === 'es' ? 'Escanea con la cámara de tu móvil' : 'Scan with your smartphone camera'}
                  </span>
                  <span className="text-[11px] text-stone-400 block leading-tight">
                    {language === 'es'
                      ? 'Abre automáticamente la versión nativa en tu iPhone o Android.'
                      : 'Automatically launches the native app on your device.'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Smartphone Simulator */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* Device Switcher Toggle */}
            <div className="flex items-center gap-2 mb-3 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setDeviceFrame('iphone')}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                  deviceFrame === 'iphone' ? 'bg-[#B52A2A] text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Apple className="w-3.5 h-3.5" />
                <span>iPhone 16 Pro</span>
              </button>
              <button
                onClick={() => setDeviceFrame('android')}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                  deviceFrame === 'android' ? 'bg-[#B52A2A] text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Samsung Galaxy</span>
              </button>
            </div>

            {/* Interactive Phone Frame */}
            <div
              className={`w-full max-w-[290px] h-[480px] bg-[#12100E] border-4 ${
                deviceFrame === 'iphone' ? 'border-[#38332E] rounded-[44px]' : 'border-[#2A2724] rounded-[32px]'
              } shadow-2xl overflow-hidden relative flex flex-col justify-between p-3 select-none`}
            >
              {/* Dynamic Island / Punch Hole */}
              <div className="flex justify-center mb-2">
                {deviceFrame === 'iphone' ? (
                  <div className="w-24 h-4 bg-black rounded-full shadow-inner flex items-center justify-end px-2">
                    <div className="w-2 h-2 rounded-full bg-[#1A1A2E]" />
                  </div>
                ) : (
                  <div className="w-3.5 h-3.5 bg-black rounded-full shadow-inner" />
                )}
              </div>

              {/* In-App Screen Content */}
              <div className="flex-1 bg-[#1E1B18] rounded-2xl p-3.5 text-stone-100 flex flex-col justify-between overflow-y-auto no-scrollbar border border-white/5 space-y-3">
                {/* Header inside phone */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#B52A2A] text-white flex items-center justify-center font-bold text-[10px]">
                      LC
                    </div>
                    <span className="font-serif font-black text-xs text-[#F5F0E8] tracking-wider">
                      LA CAYENA
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#B08D57] bg-[#B08D57]/15 px-2 py-0.5 rounded-full">
                    VIP APP
                  </span>
                </div>

                {/* Tab Content inside phone */}
                {activeTab === 'loyalty' && (
                  <div className="space-y-2.5 text-center">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      {language === 'es' ? 'TARJETA DE SELLOS DIGITAL' : 'DIGITAL STAMP CARD'}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-white">
                      {loyaltyStamps === 5 
                        ? (language === 'es' ? '¡Premio desbloqueado!' : 'Reward Unlocked!') 
                        : (language === 'es' ? `${loyaltyStamps} de 5 Visitas` : `${loyaltyStamps} of 5 Visits`)}
                    </h4>

                    {/* 5 Stamps Circles */}
                    <div className="flex items-center justify-center gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((num) => {
                        const isStamped = num <= loyaltyStamps;
                        const isReward = num === 5;
                        return (
                          <div
                            key={num}
                            onClick={handleStamp}
                            className={`w-9 h-9 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all ${
                              isStamped
                                ? isReward
                                  ? 'bg-[#D4AF37] text-black shadow-lg animate-bounce'
                                  : 'bg-[#B52A2A] text-white shadow-md'
                                : 'bg-white/10 border border-white/20 text-stone-500'
                            }`}
                          >
                            {isStamped ? (
                              isReward ? <Sparkles className="w-4 h-4 text-black" /> : <Flame className="w-4 h-4 text-[#FFD700]" />
                            ) : (
                              <span className="text-[10px] font-bold">{num}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-[10px] text-stone-400">
                      {loyaltyStamps === 5
                        ? (language === 'es' ? '🎁 Tarta de Artemisa o Tapa Gourmet gratis en tu visita.' : '🎁 Free Artemisa dessert or Gourmet Tapa on your visit.')
                        : (language === 'es' ? 'Toca los círculos para simular el sellado en sala.' : 'Tap circles to test stamp validation.')}
                    </p>
                  </div>
                )}

                {activeTab === 'reserve' && (
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] font-bold text-[#B52A2A] uppercase tracking-wider block">
                      {language === 'es' ? 'RESERVA RÁPIDA 1-CLIC' : '1-TAP FAST BOOKING'}
                    </span>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/10 space-y-1.5 text-xs">
                      <div className="flex justify-between text-stone-300">
                        <span>{language === 'es' ? 'Zona:' : 'Area:'}</span>
                        <span className="font-bold text-white">{language === 'es' ? 'Salón Chimenea' : 'Fireplace Room'}</span>
                      </div>
                      <div className="flex justify-between text-stone-300">
                        <span>{language === 'es' ? 'Comensales:' : 'Guests:'}</span>
                        <span className="font-bold text-white">2 Personas</span>
                      </div>
                      <div className="flex justify-between text-stone-300">
                        <span>{language === 'es' ? 'Hora:' : 'Time:'}</span>
                        <span className="font-bold text-emerald-400">21:30 (Mesa lista)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        navigateTo('reservations');
                      }}
                      className="w-full py-2 rounded-xl bg-[#B52A2A] text-white font-bold text-xs hover:bg-[#962222] transition-colors"
                    >
                      {language === 'es' ? 'Confirmar en Web' : 'Confirm in Web'}
                    </button>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      {language === 'es' ? 'NOTIFICACIONES EN DIRECTO' : 'LIVE NOTIFICATIONS'}
                    </span>
                    <div className="space-y-1.5">
                      <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-[11px] space-y-0.5">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>🥩 Chuletón Josper</span>
                          <span className="text-[9px] text-stone-400">Ahora</span>
                        </div>
                        <p className="text-[10px] text-stone-300">
                          {language === 'es' ? 'Maduración de 45 días lista para este fin de semana.' : '45-day dry-aged cuts ready this weekend.'}
                        </p>
                      </div>

                      <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-[11px] space-y-0.5">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>🍺 Cerveza Victoria 1928</span>
                          <span className="text-[9px] text-stone-400">Hoy</span>
                        </div>
                        <p className="text-[10px] text-stone-300">
                          {language === 'es' ? 'Prueba la nueva carta de cervezas heladas.' : 'Try our new ice-cold craft beer menu.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom In-App Navigation Bar */}
                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10">
                  <button
                    onClick={() => setActiveTab('loyalty')}
                    className={`py-1 rounded-lg text-[10px] font-bold flex flex-col items-center gap-0.5 ${
                      activeTab === 'loyalty' ? 'bg-[#B52A2A] text-white' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{language === 'es' ? 'Fidelidad' : 'Loyalty'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('reserve')}
                    className={`py-1 rounded-lg text-[10px] font-bold flex flex-col items-center gap-0.5 ${
                      activeTab === 'reserve' ? 'bg-[#B52A2A] text-white' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{language === 'es' ? 'Reserva' : 'Booking'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`py-1 rounded-lg text-[10px] font-bold flex flex-col items-center gap-0.5 ${
                      activeTab === 'notifications' ? 'bg-[#B52A2A] text-white' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{language === 'es' ? 'Alertas' : 'Alerts'}</span>
                  </button>
                </div>
              </div>

              {/* Bottom Home Indicator */}
              <div className="flex justify-center pt-1.5">
                <div className="w-20 h-1 bg-white/30 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
