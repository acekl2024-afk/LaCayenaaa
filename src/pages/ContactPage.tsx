import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO, OPENING_HOURS } from '../data/restaurantData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  Flame 
} from 'lucide-react';
import { GoogleReviewsSection } from '../components/GoogleReviewsSection';

export const ContactPage: React.FC = () => {
  const { language, showToast, tr } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitted(true);
    showToast(
      language === 'es' ? 'Mensaje enviado correctamente. Te responderemos muy pronto.' : 'Message sent successfully. We will reply shortly.',
      'success'
    );
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#F5F0E8] pt-32 sm:pt-36 pb-28">
      {/* Banner */}
      <div className="bg-[#1E1B18] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#B08D57]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B52A2A]/20 border border-[#B52A2A]/40 text-[#C55A2A] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'ENCUÉNTRANOS & CONTACTA' : 'FIND & CONTACT US'}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F0E8]">
            {tr.nav.contact}
          </h1>
          <p className="text-sm text-stone-300 max-w-xl mx-auto">
            {language === 'es'
              ? 'Estamos a tu disposición para reservas de grupos, eventos especiales o cualquier consulta.'
              : 'We are at your service for group reservations, private events, or any inquiries.'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Info & Hours (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Restaurant Info Card */}
            <div className="bg-[#1E1B18] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#B08D57]/30 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">ASADOR LA CAYENA</span>
                <h3 className="font-serif text-2xl font-bold mt-1 text-[#F5F0E8]">La Zubia, Granada</h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B52A2A] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-white block">{RESTAURANT_INFO.address}</span>
                    <span className="text-stone-400">18140 La Zubia, Granada, España</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B52A2A] shrink-0" />
                  <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="hover:text-[#B08D57] transition-colors font-medium">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B52A2A] shrink-0" />
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#B08D57] transition-colors break-all">
                    {RESTAURANT_INFO.email}
                  </a>
                </div>
              </div>

              {/* Quick WhatsApp & Call Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                    language === 'es' ? 'Hola Asador La Cayena, me gustaría hacer una consulta.' : 'Hello Asador La Cayena, I would like to make an inquiry.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Directo</span>
                </a>

                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{language === 'es' ? 'Abrir en Google Maps' : 'Open in Google Maps'}</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
                <Clock className="w-5 h-5 text-[#B52A2A]" />
                <h4>{tr.footer.hoursTitle}</h4>
              </div>

              <div className="space-y-2 text-xs text-stone-700">
                {OPENING_HOURS.map((h, idx) => (
                  <div key={idx} className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="font-semibold text-stone-800">
                      {language === 'es' ? h.dayEs : h.dayEn}
                    </span>
                    <span className={h.closed ? 'text-[#B52A2A] font-bold' : 'text-stone-600'}>
                      {h.closed
                        ? (language === 'es' ? 'Cerrado' : 'Closed')
                        : (h.lunch && h.dinner ? `${h.lunch} / ${h.dinner}` : h.lunch || h.dinner)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Contact Form (Col 6-12) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-200">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    {language === 'es' ? '¡Mensaje Recibido!' : 'Message Received!'}
                  </h3>
                  <p className="text-sm text-stone-600 max-w-sm mx-auto">
                    {language === 'es'
                      ? 'Gracias por contactar con Asador La Cayena. Nos pondremos en contacto contigo a la mayor brevedad.'
                      : 'Thank you for reaching out to Asador La Cayena. We will get back to you as soon as possible.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#1E1B18] text-white text-xs font-semibold"
                  >
                    {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#B52A2A]">
                      {language === 'es' ? 'FORMULARIO DE CONTACTO' : 'CONTACT FORM'}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                      {language === 'es' ? 'Envíanos un mensaje' : 'Send us a message'}
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {tr.orderFlow.fullName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Manuel Ramos"
                        className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D57]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {tr.orderFlow.email} *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="manuel@ejemplo.com"
                          className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {tr.orderFlow.phone}
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+34 600 000 000"
                          className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {language === 'es' ? 'Motivo de consulta' : 'Reason for inquiry'}
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D57]"
                      >
                        <option value="general">{language === 'es' ? 'Consulta General' : 'General Inquiry'}</option>
                        <option value="events">{language === 'es' ? 'Eventos & Celebraciones' : 'Events & Celebrations'}</option>
                        <option value="groups">{language === 'es' ? 'Reserva para Grupos Grandes' : 'Large Group Booking'}</option>
                        <option value="feedback">{language === 'es' ? 'Sugerencias / Opiniones' : 'Feedback / Suggestions'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {language === 'es' ? 'Mensaje' : 'Message'} *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={language === 'es' ? 'Cuéntanos en qué podemos ayudarte...' : 'Tell us how we can help you...'}
                        className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#B08D57]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#B52A2A] to-[#C55A2A] hover:from-[#9c2424] hover:to-[#b04f24] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#B52A2A]/30 transition-all transform active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>{language === 'es' ? 'Enviar Consulta' : 'Send Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Google Reviews and Business Profile */}
        <div className="mt-12">
          <GoogleReviewsSection />
        </div>
      </div>
    </div>
  );
};
