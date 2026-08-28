import { 
  MenuItem, 
  MenuCategory, 
  Order, 
  Reservation, 
  SeatingPreference
} from '../types';
import { INITIAL_MENU_ITEMS, MENU_CATEGORIES, OPENING_HOURS, RESTAURANT_INFO } from '../data/restaurantData';

const MENU_STORAGE_KEY = 'asador_lacayena_menu';
const ORDERS_STORAGE_KEY = 'asador_lacayena_orders';
const RESERVATIONS_STORAGE_KEY = 'asador_lacayena_reservations';

// Initialize local storage if needed
function getStoredMenu(): MenuItem[] {
  try {
    const data = localStorage.getItem(MENU_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading stored menu', e);
  }
  return INITIAL_MENU_ITEMS;
}

function getStoredOrders(): Order[] {
  try {
    const data = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading stored orders', e);
  }
  return [];
}

function getStoredReservations(): Reservation[] {
  try {
    const data = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading stored reservations', e);
  }
  return [];
}

export const apiService = {
  // Menu APIs
  async getMenu(): Promise<MenuItem[]> {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 80));
    return getStoredMenu();
  },

  async getCategories(): Promise<MenuCategory[]> {
    return MENU_CATEGORIES;
  },

  async toggleItemAvailability(itemId: string, available: boolean): Promise<MenuItem[]> {
    const menu = getStoredMenu();
    const updated = menu.map(item => item.id === itemId ? { ...item, available } : item);
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  // Reservation Availability & Time Slot Generation
  async getAvailableTimeSlots(dateString: string, guests: number): Promise<{ lunch: string[]; dinner: string[]; isClosed: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    if (!dateString) {
      return { lunch: [], dinner: [], isClosed: false };
    }

    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday, 2 is Tuesday, etc.

    // Monday (1) is closed
    if (dayOfWeek === 1) {
      return { lunch: [], dinner: [], isClosed: true };
    }

    let lunchSlots: string[] = [];
    let dinnerSlots: string[] = [];

    // Tuesday (2): Dinner only
    if (dayOfWeek === 2) {
      dinnerSlots = ['20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];
    }
    // Wednesday (3), Thursday (4), Friday (5), Saturday (6): Lunch & Dinner
    else if (dayOfWeek >= 3 && dayOfWeek <= 6) {
      lunchSlots = ['13:00', '13:30', '14:00', '14:30', '15:00'];
      dinnerSlots = ['20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];
    }
    // Sunday (0): Lunch only
    else if (dayOfWeek === 0) {
      lunchSlots = ['13:00', '13:30', '14:00', '14:30', '15:00'];
    }

    return { lunch: lunchSlots, dinner: dinnerSlots, isClosed: false };
  },

  async createReservation(data: Omit<Reservation, 'id' | 'reservationNumber' | 'createdAt' | 'status'>): Promise<Reservation> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const datePrefix = data.date.replace(/-/g, '').slice(2);
    const reservationNumber = `LCY-RES-${datePrefix}-${randomNum}`;

    const newReservation: Reservation = {
      ...data,
      id: `res_${Date.now()}`,
      reservationNumber,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const existing = getStoredReservations();
    const updated = [newReservation, ...existing];
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(updated));

    return newReservation;
  },

  async createOrder(data: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `LCY-ORD-${randomNum}`;

    const newOrder: Order = {
      ...data,
      id: `ord_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const existing = getStoredOrders();
    const updated = [newOrder, ...existing];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));

    return newOrder;
  },

  async getReservationById(idOrNumber: string): Promise<Reservation | null> {
    const list = getStoredReservations();
    return list.find(r => r.id === idOrNumber || r.reservationNumber === idOrNumber) || null;
  },

  async getOrderById(idOrNumber: string): Promise<Order | null> {
    const list = getStoredOrders();
    return list.find(o => o.id === idOrNumber || o.orderNumber === idOrNumber) || null;
  },

  async getAllReservations(): Promise<Reservation[]> {
    return getStoredReservations();
  },

  async getAllOrders(): Promise<Order[]> {
    return getStoredOrders();
  },

  // Utilities for WhatsApp and Calendar
  generateWhatsAppReservationLink(res: Reservation): string {
    const text = encodeURIComponent(
      `¡Hola Asador La Cayena! Quisiera confirmar mi reserva:\n` +
      `📌 Reserva: ${res.reservationNumber}\n` +
      `📅 Fecha: ${res.date} a las ${res.time}\n` +
      `👥 Comensales: ${res.guests}\n` +
      `📍 Preferencia: ${res.seatingPreference}\n` +
      `👤 Nombre: ${res.customer.name} (${res.customer.phone})\n` +
      (res.specialRequests ? `📝 Peticiones: ${res.specialRequests}\n` : '') +
      (res.preOrderedItems && res.preOrderedItems.length > 0 
        ? `🍽️ Platos pre-seleccionados: ${res.preOrderedItems.map(i => `${i.quantity}x ${i.item.name}`).join(', ')}\n` 
        : '')
    );
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`;
  },

  generateGoogleCalendarUrl(res: Reservation): string {
    const [year, month, day] = res.date.split('-');
    const [hours, minutes] = res.time.split(':');
    
    // Create start and end date (assume 2 hours duration)
    const startDate = `${year}${month}${day}T${hours}${minutes}00`;
    const endHour = String(Number(hours) + 2).padStart(2, '0');
    const endDate = `${year}${month}${day}T${endHour}${minutes}00`;

    const title = encodeURIComponent(`Reserva en Asador La Cayena (${res.guests} comensales)`);
    const details = encodeURIComponent(
      `Reserva: ${res.reservationNumber}\nComensales: ${res.guests}\nZona: ${res.seatingPreference}\nTeléfono Asador: ${RESTAURANT_INFO.phone}\nDirección: ${RESTAURANT_INFO.address}`
    );
    const location = encodeURIComponent(RESTAURANT_INFO.address);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  },

  generateIcsCalendarFile(res: Reservation): string {
    const [year, month, day] = res.date.split('-');
    const [hours, minutes] = res.time.split(':');
    const start = `${year}${month}${day}T${hours}${minutes}00`;
    const endHour = String(Number(hours) + 2).padStart(2, '0');
    const end = `${year}${month}${day}T${endHour}${minutes}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Asador La Cayena//Reservations//ES',
      'BEGIN:VEVENT',
      `UID:${res.reservationNumber}@asadorlacayena.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:Reserva en Asador La Cayena (${res.guests} comensales)`,
      `DESCRIPTION:Reserva: ${res.reservationNumber}\\nComensales: ${res.guests}\\nZona: ${res.seatingPreference}\\nTeléfono: ${RESTAURANT_INFO.phone}`,
      `LOCATION:${RESTAURANT_INFO.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
  }
};
