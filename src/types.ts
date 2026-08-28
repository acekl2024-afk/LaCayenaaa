export type Language = 'es' | 'en';

export type CategoryId = 
  | 'all'
  | 'appetisers'
  | 'salads'
  | 'starters'
  | 'meats'
  | 'fish'
  | 'pizzas'
  | 'desserts'
  | 'beers'
  | 'wines';

export interface MenuCategory {
  id: CategoryId;
  nameEs: string;
  nameEn: string;
  icon: string;
  descriptionEs?: string;
  descriptionEn?: string;
}

export type MeatDoneness = 'rare' | 'medium_rare' | 'medium' | 'medium_well' | 'well_done';
export type SpiceLevel = 'mild' | 'medium' | 'hot';

export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  priceDetails?: string; // e.g., "per unit", "300g", "for 2"
  category: CategoryId;
  image: string;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  spicy?: boolean;
  grilled?: boolean;
  featured?: boolean;
  popular?: boolean;
  allergens?: string[];
  minQuantity?: number; // e.g., 2 for stuffed mushrooms
  supportsMeatDoneness?: boolean;
  supportsSpiceLevel?: boolean;
  available?: boolean;
  abv?: string; // e.g. "4.80% Vol."
  origin?: string; // e.g. "Málaga, España"
  formats?: { label: string; price: number }[];
  tastingNotesEs?: string;
  tastingNotesEn?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleEs: string;
  titleEn: string;
  excerptEs: string;
  excerptEn: string;
  contentEs: string;
  contentEn: string;
  coverImage: string;
  category: 'carnes-josper' | 'guia-granada' | 'cervezas-maridaje' | 'pizzas-artesanas' | 'postres-artemisa' | 'eventos-celebraciones';
  categoryLabelEs: string;
  categoryLabelEn: string;
  tags: string[];
  author: string;
  authorRole: string;
  publishedDate: string;
  readingTimeMinutes: number;
  keywords: string[];
  faq?: { questionEs: string; questionEn: string; answerEs: string; answerEn: string }[];
}

export interface SelectedCustomizations {
  meatDoneness?: MeatDoneness;
  spiceLevel?: SpiceLevel;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  customizations?: SelectedCustomizations;
  itemTotal: number;
}

export type OrderType = 'pickup' | 'delivery' | 'dinein_preorder';
export type PaymentMethod = 'card' | 'cash_pickup' | 'cash_delivery' | 'bizum';

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  postalCode?: string;
  deliveryNotes?: string;
  allergies?: string;
  specialInstructions?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  orderType: OrderType;
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  desiredTime: string;
  desiredDate: string;
  status: OrderStatus;
  notes?: string;
}

export type SeatingPreference = 'indoor' | 'terrace' | 'fireplace' | 'no_preference';
export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Reservation {
  id: string;
  reservationNumber: string;
  createdAt: string;
  guests: number;
  date: string;
  time: string;
  seatingPreference: SeatingPreference;
  specialRequests?: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  preOrderedItems?: CartItem[];
  preOrderTotal?: number;
  status: ReservationStatus;
}

export interface OpeningHourSlot {
  dayEs: string;
  dayEn: string;
  lunch?: string;
  dinner?: string;
  closed?: boolean;
}

export interface GalleryItem {
  id: string;
  titleEs: string;
  titleEn: string;
  category: 'all' | 'food' | 'grill' | 'cocktails' | 'restaurant' | 'terrace';
  imageUrl: string;
  descriptionEs: string;
  descriptionEn: string;
}

export interface GoogleReview {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  relativeTime: string;
  relativeTimeEn: string;
  textEs: string;
  textEn: string;
  highlightCategory?: 'meats' | 'pizzas' | 'desserts' | 'service' | 'terrace';
  isLocalGuide?: boolean;
  googleMapsUrl?: string;
}

export type MediaCategory = 
  | 'Restaurant Interior'
  | 'Restaurant Exterior'
  | 'Outdoor Terrace'
  | 'Fireplace'
  | 'Josper Grill'
  | 'Grilled Meat'
  | 'Beef'
  | 'Iberian Meat'
  | 'Chicken'
  | 'Burgers'
  | 'Starters'
  | 'Salads'
  | 'Desserts'
  | 'Cocktails'
  | 'Beer'
  | 'Wine'
  | 'Restaurant Atmosphere'
  | 'Staff'
  | 'Events'
  | 'General Gallery';

export type MediaType = 'image' | 'video';

export type MediaPlacement = 
  | 'Home Hero'
  | 'About Section'
  | 'Josper Grill Section'
  | 'Featured Dishes'
  | 'Cocktail Section'
  | 'Outdoor Terrace'
  | 'Fireplace Experience'
  | 'Restaurant Experience'
  | 'Gallery'
  | 'Menu Item'
  | 'Reservation Page'
  | 'Footer Background';

export type QualityIssue = 
  | 'duplicate'
  | 'near_duplicate'
  | 'blurry'
  | 'low_resolution'
  | 'poor_lighting'
  | 'unsuitable';

export interface MediaItem {
  id: string;
  fileName: string;
  mediaType: MediaType;
  url: string;
  thumbnailUrl?: string;
  posterUrl?: string;
  width: number;
  height: number;
  fileSize: string;
  category: MediaCategory;
  tags: string[];
  altText: string;
  altTextEn?: string;
  description: string;
  descriptionEn?: string;
  uploadDate: string;
  active: boolean;
  usedIn: string[];
  suggestedPlacement?: MediaPlacement;
  suggestedDishId?: string;
  needsReview?: boolean;
  qualityIssues?: QualityIssue[];
  qualityScore?: number; // 0 - 100
  duration?: string; // for videos e.g. "0:42"
  aspectRatio?: string;
  source?: 'official_upload' | 'google_business_sync' | 'admin_upload';
}

export interface GoogleBusinessLocation {
  id: string;
  locationName: string;
  address: string;
  mediaCount: number;
  isConnected: boolean;
}

export interface GoogleBusinessMediaService {
  connectGoogleBusinessProfile: () => Promise<boolean>;
  listBusinessLocations: () => Promise<GoogleBusinessLocation[]>;
  fetchBusinessMedia: (locationId: string) => Promise<MediaItem[]>;
  importSelectedMedia: (mediaIds: string[]) => Promise<MediaItem[]>;
  syncNewMedia: () => Promise<{ imported: number; stagedForReview: number }>;
}
