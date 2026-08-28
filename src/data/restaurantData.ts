import { MenuItem, MenuCategory, OpeningHourSlot, GalleryItem, GoogleReview } from '../types';

import laCayenaOriginalLogo from '../assets/images/la_cayena_logo_1787777620877.jpg';
import laCayenaTeam from '../assets/images/la_cayena_team_1787777635061.jpg';
import josperGrillImg from '../assets/images/josper_grill_flames_1787777649259.jpg';
import terraceImg from '../assets/images/restaurant_terrace_1787777662831.jpg';
import fireplaceImg from '../assets/images/fireplace_dining_1787777679027.jpg';

export const RESTAURANT_IMAGES = {
  logo: laCayenaOriginalLogo,
  team: laCayenaTeam,
  josperGrill: josperGrillImg,
  terrace: terraceImg,
  fireplace: fireplaceImg
};

export const RESTAURANT_INFO = {
  name: 'Asador La Cayena',
  subtitle: 'Asador - Pizzería',
  taglineEs: 'El fuego. El sabor. La experiencia.',
  taglineEn: 'Fire. Flavor. Experience.',
  descriptionEs: 'Sabores auténticos, ingredientes de primera calidad, horno Josper de carbón de encina y pizzas artesanas en el corazón de La Zubia, Granada.',
  descriptionEn: 'Authentic flavours, premium ingredients, oak charcoal Josper grill and artisan pizzas in the heart of La Zubia, Granada.',
  address: 'Cam. Gójar, nº42, 18140 La Zubia, Granada, Spain',
  street: 'Cam. Gójar, nº42',
  city: 'La Zubia',
  province: 'Granada',
  postalCode: '18140',
  country: 'España',
  phone: '+34 958 04 04 38',
  phoneRaw: '+34958040438',
  whatsappNumber: '34958040438',
  email: 'asadorlacayena@gmail.com',
  coordinates: {
    lat: 37.1215,
    lng: -3.5855
  },
  googleBusinessUrl: 'https://share.google/Ccpmv3mNFAxVaCsOG',
  googleReviewUrl: 'https://share.google/Ccpmv3mNFAxVaCsOG',
  googleMapsUrl: 'https://share.google/Ccpmv3mNFAxVaCsOG',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Asador+La+Cayena,+Cam.+G%C3%B3jar,+42,+18140+La+Zubia,+Granada',
  officialDigitalMenuUrl: 'https://cartadigital.barmanagerapp.com/site/index/show/ASADORLACAYENA',
  social: {
    instagram: 'https://www.instagram.com/asadorlacayena/',
    facebook: 'https://www.facebook.com/cayena.restaurante/',
    tripadvisor: 'https://tripadvisor.es'
  }
};

export const OPENING_HOURS: OpeningHourSlot[] = [
  {
    dayEs: 'Lunes',
    dayEn: 'Monday',
    closed: true
  },
  {
    dayEs: 'Martes',
    dayEn: 'Tuesday',
    dinner: '20:30 – 23:30'
  },
  {
    dayEs: 'Miércoles',
    dayEn: 'Wednesday',
    lunch: '13:00 – 16:00',
    dinner: '20:30 – 23:30'
  },
  {
    dayEs: 'Jueves',
    dayEn: 'Thursday',
    lunch: '13:00 – 16:00',
    dinner: '20:30 – 23:30'
  },
  {
    dayEs: 'Viernes',
    dayEn: 'Friday',
    lunch: '13:00 – 16:00',
    dinner: '20:30 – 23:30'
  },
  {
    dayEs: 'Sábado',
    dayEn: 'Saturday',
    lunch: '13:00 – 16:00',
    dinner: '20:30 – 23:30'
  },
  {
    dayEs: 'Domingo',
    dayEn: 'Sunday',
    lunch: '13:00 – 16:00'
  }
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'appetisers',
    nameEs: 'Aperitivos y Conservas',
    nameEn: 'Appetisers & Preserves',
    icon: 'Sparkles',
    descriptionEs: 'Gildas, torreznos de Soria, quesos curados y conservas gourmet seleccionadas.',
    descriptionEn: 'Gildas, Soria pork rashers, cured cheeses and selected gourmet preserves.'
  },
  {
    id: 'salads',
    nameEs: 'Ensaladas',
    nameEn: 'Salads',
    icon: 'Salad',
    descriptionEs: 'Frescura, huerta granadina y combinaciones equilibradas con aliños de la casa.',
    descriptionEn: 'Fresh garden produce, vibrant combinations and house dressings.'
  },
  {
    id: 'starters',
    nameEs: 'Entrantes y Raciones',
    nameEn: 'Starters & Portions',
    icon: 'Utensils',
    descriptionEs: 'Huevos rotos, flores de alcachofa, caracoles a la brasa, croquetas y raciones para compartir.',
    descriptionEn: 'Broken eggs, artichoke flowers, grilled snails, croquettes and sharing portions.'
  },
  {
    id: 'meats',
    nameEs: 'Carnes a la Brasa Josper',
    nameEn: 'Meats on Josper Grill',
    icon: 'Flame',
    descriptionEs: 'Todas nuestras carnes se cocinan en horno Josper de carbón de encina y van acompañadas de patatas fritas caseras y pimientos de Padrón.',
    descriptionEn: 'All our meats are cooked on a Josper oak charcoal grill and are accompanied by homemade fries and Padrón peppers.'
  },
  {
    id: 'fish',
    nameEs: 'Pescados',
    nameEn: 'Fish',
    icon: 'Fish',
    descriptionEs: 'Lomo de bacalao gratinado y lubina fresca a la brasa.',
    descriptionEn: 'Gratinated cod loin and fresh grilled sea bass.'
  },
  {
    id: 'pizzas',
    nameEs: 'Pizzas Artesanas',
    nameEn: 'Artisan Pizzas',
    icon: 'Pizza',
    descriptionEs: 'Masa casera de larga fermentación, ingredientes frescos y horneado crujiente.',
    descriptionEn: 'Homemade slow-fermented dough, fresh toppings and crisp crust.'
  },
  {
    id: 'desserts',
    nameEs: 'Postres Caseros',
    nameEn: 'Homemade Desserts',
    icon: 'Cake',
    descriptionEs: 'Tartas caseras Artemisa (#artemisahomemadecakes), coulant, sorbetes y vinos dulces.',
    descriptionEn: 'Artemisa homemade cakes (#artemisahomemadecakes), coulant, sorbets and sweet dessert wines.'
  },
  {
    id: 'beers',
    nameEs: 'Cervezas',
    nameEn: 'Beers',
    icon: 'Beer',
    descriptionEs: 'Cervezas Alhambra de Granada bien frías (Reserva 1925, Roja, Especial, Sin Alcohol) y de barril.',
    descriptionEn: 'Chilled Granada Alhambra beers (Reserva 1925, Red Bock, Especial, Non-Alcoholic) and draft beers.'
  },
  {
    id: 'wines',
    nameEs: 'Vinos y Copas',
    nameEn: 'Wines & Drinks',
    icon: 'Wine',
    descriptionEs: 'D.O. Rioja, Ribera del Duero, vinos de Granada, sangría de la casa y combinados.',
    descriptionEn: 'Rioja, Ribera del Duero, local Granada mountain wines, signature sangria and spirits.'
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // 1. APPETISERS AND PRESERVES (Aperitivos y Conservas)
  // ==========================================
  {
    id: 'app-gilda-matrimonio',
    name: 'Gilda Matrimonio Extra',
    nameEn: 'Gilda Extra Marriage',
    description: 'Con piparras, aceitunas, anchoas y boquerones en vinagre de primera calidad.',
    descriptionEn: 'With piparras peppers, olives, anchovies and whitebait.',
    price: 2.75,
    priceDetails: '2,75€/ud',
    category: 'appetisers',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allergens: ['Pescado', 'Sulfitos'],
    available: true
  },
  {
    id: 'app-torreznos-soria',
    name: 'Torreznos de Soria',
    nameEn: 'Torreznos from Soria',
    description: 'Crujientes por fuera y tiernos por dentro, elaborados siguiendo la tradición soriana.',
    descriptionEn: 'Crispy outer crust and tender, succulent core from Soria pork belly.',
    price: 10.75,
    category: 'appetisers',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    featured: true,
    allergens: ['Gluten', 'Soja'],
    available: true
  },
  {
    id: 'app-queso-manchego-curado',
    name: 'Queso Manchego Curado de Leche Cruda de Oveja',
    nameEn: "Cured Raw Sheep's Milk Manchego Cheese",
    description: 'Queso manchego artesano curado elaborado con leche cruda de oveja, acompañado de regañás.',
    descriptionEn: 'Accompanied by scolding (traditional Andalusian regañás artisan flatbread).',
    price: 14.00,
    priceDetails: 'Media: 10,00€ | Entera: 14,00€',
    category: 'appetisers',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    allergens: ['Lácteos', 'Gluten'],
    available: true
  },
  {
    id: 'app-anchoas-aceite',
    name: 'Anchoas del Cantábrico 0’0 en Aceite (8 uds)',
    nameEn: "Cantabrian Anchovies 0'0 (8 units) in Oil",
    description: 'Lomos seleccionados de anchoa del Cantábrico 0’0 en aceite de oliva, acompañadas de pan tostado y tomate rallado.',
    descriptionEn: 'Accompanied by toasted bread and grated tomato.',
    price: 20.00,
    priceDetails: '8 unidades',
    category: 'appetisers',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    allergens: ['Pescado', 'Gluten'],
    available: true
  },
  {
    id: 'app-anchoas-mantequilla',
    name: 'Anchoas del Cantábrico 0’0 en Mantequilla (8 uds)',
    nameEn: "Cantabrian Anchovies 0'0 (8 units) in Butter",
    description: 'Anchoas supremas del Cantábrico 0’0 afinadas en mantequilla artesanal, acompañadas de pan tostado y tomate rallado.',
    descriptionEn: 'Accompanied by toasted bread and grated tomato.',
    price: 24.00,
    priceDetails: '8 unidades',
    category: 'appetisers',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80',
    allergens: ['Pescado', 'Lácteos', 'Gluten'],
    available: true
  },
  {
    id: 'app-ostras-escabeche',
    name: 'Ostras en Escabeche Peperete',
    nameEn: 'Pickled Pepperette Oysters',
    description: 'Conserva gourmet selecta de ostras en suave escabeche artesano.',
    descriptionEn: 'Gourmet canned pickled oysters in artisan marinade.',
    price: 18.10,
    category: 'appetisers',
    image: 'https://images.unsplash.com/photo-1614961908595-5f6ca95aa5e9?auto=format&fit=crop&w=800&q=80',
    allergens: ['Moluscos', 'Sulfitos'],
    available: true
  },
  {
    id: 'app-zamburinas-gallegas',
    name: 'Zamburiñas en Salsa al Estilo Gallego',
    nameEn: 'Galician-Style Peppered Variety',
    description: 'Zamburiñas seleccionadas en salsa tradicional gallega de pimentón y cebolla confitada.',
    descriptionEn: 'Galician-style seasoned scallops / zamburiñas in rich traditional sauce.',
    price: 16.75,
    category: 'appetisers',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    allergens: ['Moluscos', 'Sulfitos'],
    available: true
  },
  {
    id: 'app-huevas-merluza',
    name: 'Medallones de Huevas de Merluza en Aceite Picante (Real Conservera Española)',
    nameEn: 'Hake Roe Medallions in Spicy Oil Royal Spanish Cannery',
    description: 'Medallones de huevas de merluza de la prestigiosa Real Conservera Española en fino aceite de oliva con toque picante.',
    descriptionEn: 'Hake roe medallions in spicy olive oil by Royal Spanish cannery (Real Conservera Española).',
    price: 13.80,
    category: 'appetisers',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    allergens: ['Pescado'],
    available: true
  },
  {
    id: 'app-mejillones-escabeche',
    name: 'Mejillones en Escabeche 10/12',
    nameEn: 'Pickled Mussels 10/12',
    description: 'Mejillones gigantes de las rías gallegas en escabeche tradicional (10 a 12 piezas).',
    descriptionEn: 'Large Galician gourmet pickled mussels (10/12 pieces).',
    price: 17.25,
    category: 'appetisers',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    allergens: ['Moluscos', 'Sulfitos'],
    available: true
  },

  // ==========================================
  // 2. SALADS (Ensaladas)
  // ==========================================
  {
    id: 'salad-cesar',
    name: 'Ensalada César',
    nameEn: 'Caesar Salad',
    description: 'Lechuga romana, pollo a la brasa, bacon crujiente, huevo cocido, queso parmesano, picatostes y salsa César.',
    descriptionEn: 'Romaine lettuce, chicken, bacon, hard-boiled egg, Parmesan cheese, croutons, and Caesar dressing.',
    price: 13.95,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allergens: ['Lácteos', 'Huevo', 'Gluten', 'Mostaza'],
    available: true
  },
  {
    id: 'salad-mixta',
    name: 'Ensalada Mixta',
    nameEn: 'Mixed Salad',
    description: 'Mezclum de lechugas, tomate, atún, zanahoria, huevo, maíz, aceitunas negras, cebolla roja y pepino.',
    descriptionEn: 'Mixed greens, tomato, tuna, carrot, egg, corn, black olives, red onion and cucumber.',
    price: 13.50,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    allergens: ['Pescado', 'Huevo'],
    available: true
  },
  {
    id: 'salad-queso-cabra',
    name: 'Ensalada de Queso de Cabra',
    nameEn: 'Goat Cheese Salad',
    description: 'Mezclum de lechugas, nueces, manzana, orejones y medallón de queso de cabra a la plancha.',
    descriptionEn: 'Mixed lettuce, walnuts, apple, dried apricots and grilled goat cheese.',
    price: 13.00,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    allergens: ['Lácteos', 'Frutos de cáscara'],
    available: true
  },
  {
    id: 'salad-tomates-ajo',
    name: 'Tomates Aliñados con Ajo',
    nameEn: 'Garlic Tomatoes',
    description: 'Tomates seleccionados de la huerta local, ajo picado fresco y aceite de oliva virgen extra.',
    descriptionEn: 'Locally sourced tomatoes, garlic and extra virgin olive oil.',
    price: 12.95,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    available: true
  },

  // ==========================================
  // 3. STARTERS AND PORTIONS (Entrantes y Raciones)
  // ==========================================
  {
    id: 'starter-flores-alcachofa',
    name: 'Flores de Alcachofa con Jamón Ibérico',
    nameEn: 'Artichoke Flowers with Iberian Ham',
    description: 'Flores de alcachofa confitadas y pasadas por la brasa con virutas crujientes de jamón ibérico.',
    descriptionEn: 'Confit and grilled artichoke flowers crowned with crisp Iberian acorn-fed ham.',
    price: 16.95,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    glutenFree: true,
    featured: true,
    popular: true,
    available: true
  },
  {
    id: 'starter-huevos-rotos-jamon',
    name: 'Huevos Rotos con Jamón',
    nameEn: 'Broken Eggs with Ham',
    description: 'Huevos de corral fritos sobre patatas caseras y jamón ibérico.',
    descriptionEn: 'Free-range fried eggs over homemade fries with sliced Iberian ham.',
    price: 14.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allergens: ['Huevo', 'Gluten'],
    available: true
  },
  {
    id: 'starter-huevos-rotos-gulas-gambas',
    name: 'Huevos Rotos con Gulas y Gambas al Ajillo',
    nameEn: 'Broken Eggs with Baby Eels and Garlic Prawns',
    description: 'Huevos de corral sobre patatas caseras con gulas del norte y gambas salteadas al ajillo.',
    descriptionEn: 'Free-range eggs over homemade fries with baby eels and garlic prawns.',
    price: 16.00,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allergens: ['Crustáceos', 'Pescado', 'Huevo', 'Gluten'],
    available: true
  },
  {
    id: 'starter-croquetas-jamon',
    name: 'Croquetas Caseras de Jamón Ibérico',
    nameEn: 'Homemade Ham Croquettes',
    description: 'Croquetas artesanas súper melosas con taquitos de jamón ibérico y rebozado fino y crujiente.',
    descriptionEn: 'Creamy traditional Iberian ham croquettes with crisp coating.',
    price: 2.85,
    priceDetails: '2,85€/ud',
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    available: true
  },
  {
    id: 'starter-caracoles-brasa',
    name: 'Caracoles a la Brasa (Especialidad de la Casa)',
    nameEn: 'Grilled Snails (Our Signature Dish)',
    description: 'Nuestro plato estrella: caracoles cocinados a las brasas de encina con su aderezo secreto de especias y alioli casero.',
    descriptionEn: 'Our signature dish — seasoned grilled snails cooked over oak embers with aioli.',
    price: 14.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    grilled: true,
    featured: true,
    popular: true,
    allergens: ['Moluscos', 'Huevo'],
    available: true
  },
  {
    id: 'starter-platano-cochinita-pibil',
    name: 'Plátano Macho con Cochinita Pibil',
    nameEn: 'Cochinita Pibil Plantains',
    description: 'Plátano macho frito con ingrediente secreto al estilo yucateco, guacamole fresco y cebolla roja encurtida.',
    descriptionEn: 'Fried plantain with Yucatecan-style secret ingredient, guacamole, and pickled red onion.',
    price: 15.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    glutenFree: true,
    available: true
  },
  {
    id: 'starter-nachos',
    name: 'Nachos La Cayena',
    nameEn: 'Nachos',
    description: 'Totopos crujientes de maíz con pollo, bacon, queso cheddar fundido y guacamole fresco casero.',
    descriptionEn: 'With chicken, bacon, cheddar, and guacamole.',
    price: 14.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80',
    allergens: ['Lácteos'],
    available: true
  },
  {
    id: 'starter-gyozas-pollo',
    name: 'Gyozas Caseras de Pollo',
    nameEn: 'Homemade Chicken Gyozas',
    description: 'Gyozas caseras rellenas de pollo y verduras finamente picadas, marcadas a la plancha con salsa dipping.',
    descriptionEn: 'Handmade chicken gyozas pan-seared with dipping sauce.',
    price: 15.95,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten', 'Soja', 'Sésamo'],
    available: true
  },
  {
    id: 'starter-wok-asiatico',
    name: 'Wok Asiático con Fideos, Pollo, Anacardos y Verduras',
    nameEn: 'Asian Wok with Noodles, Chicken, Cashews and Vegetables',
    description: 'Wok salteado al fuego vivo con fideos asiáticos, pollo marinado, verduras crujientes y anacardos tostados.',
    descriptionEn: 'Stir-fried Asian noodles with chicken, cashews, and fresh seasonal vegetables.',
    price: 15.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten', 'Frutos de cáscara', 'Soja'],
    available: true
  },
  {
    id: 'starter-verduras-brasa-cabra',
    name: 'Verduras a la Brasa con Queso de Cabra',
    nameEn: 'Grilled Vegetables with Goat Cheese',
    description: 'Parrillada de verduras de temporada a la brasa Josper coronada con medallón de queso de cabra.',
    descriptionEn: 'Seasonal garden vegetables grilled over oak charcoal with warm goat cheese medallion.',
    price: 16.25,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    glutenFree: true,
    grilled: true,
    allergens: ['Lácteos'],
    available: true
  },
  {
    id: 'starter-chicken-fingers',
    name: 'Fingers de Pollo con Salsa Miel y Mostaza',
    nameEn: 'Chicken Fingers',
    description: 'Tiras crujientes de solomillo de pollo caseras acompañadas de patatas fritas y salsa de miel y mostaza.',
    descriptionEn: 'With potatoes and honey mustard sauce.',
    price: 12.95,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten', 'Huevo', 'Mostaza'],
    available: true
  },
  {
    id: 'starter-champinones-rellenos',
    name: 'Champiñones Rellenos de Jamón y Gambas Gratinados',
    nameEn: 'Mushrooms Stuffed with Ham and Prawns with Aioli',
    description: 'Gratinados con alioli sobre cama de aguacates frescos (Mínimo 2 unidades).',
    descriptionEn: 'Gratinéed on a bed of avocados (Minimum 2 units).',
    price: 3.50,
    priceDetails: '3,50€/ud (Mín. 2 uds)',
    minQuantity: 2,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    allergens: ['Crustáceos', 'Huevo', 'Lácteos'],
    available: true
  },
  {
    id: 'starter-papas-arrugadas',
    name: 'Papas Arrugadas con Mojo Picón',
    nameEn: 'Wrinkled Potatoes',
    description: 'Papas arrugadas tradicionales a la sal marina acompañadas de mojo picón casero.',
    descriptionEn: 'With spicy mojo sauce.',
    price: 10.75,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1518013034458-30b0ee243591?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    spicy: true,
    available: true
  },

  // ==========================================
  // 4. MEATS (Carnes a la Brasa - Horno Josper)
  // ==========================================
  {
    id: 'meat-contramuslo-pollo',
    name: 'Contramuslo de Pollo Deshuesado a la Brasa',
    nameEn: 'Boneless Chicken Thigh',
    description: 'Pollo deshuesado súper jugoso a la brasa Josper. Elige tu nivel de picante (suave, medio, picante). Servido con patatas fritas caseras y pimientos de Padrón.',
    descriptionEn: 'Choose spice level (mild, medium, hot). Cooked on Josper oak charcoal grill with homemade fries and Padrón peppers.',
    price: 15.50,
    category: 'meats',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    glutenFree: true,
    grilled: true,
    popular: true,
    supportsSpiceLevel: true,
    allergens: ['Mostaza y huevo en la salsa servida aparte'],
    available: true
  },
  {
    id: 'meat-parrillada-iberica-2',
    name: 'Parrillada Ibérica para 2 Personas (600g)',
    nameEn: 'Iberian Grill for 2',
    description: '200g de secreto ibérico, 200g de presa ibérica y 200g de lagarto ibérico a las brasas Josper. Acompañado de patatas caseras y pimientos de Padrón.',
    descriptionEn: '200g of secreto, 200g of presa and 200g of Iberian lizard (lagarto). Served with homemade fries and Padrón peppers.',
    price: 41.00,
    priceDetails: 'Para 2 personas (600g)',
    category: 'meats',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    glutenFree: true,
    grilled: true,
    featured: true,
    popular: true,
    supportsMeatDoneness: true,
    allergens: ['Mostaza y huevo en la salsa servida aparte'],
    available: true
  },
  {
    id: 'meat-solomillo-angus',
    name: 'Solomillo de Angus (300g)',
    nameEn: 'Angus Sirloin (300gr)',
    description: '300g de solomillo de ternera Angus a la brasa de encina, máxima terneza con patatas caseras y pimientos de Padrón.',
    descriptionEn: '300g premium Angus sirloin steak grilled over oak charcoal, accompanied by homemade fries and Padrón peppers.',
    price: 30.00,
    priceDetails: '300g',
    category: 'meats',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    glutenFree: true,
    grilled: true,
    featured: true,
    popular: true,
    supportsMeatDoneness: true,
    allergens: ['Mostaza y huevo en la salsa servida aparte'],
    available: true
  },
  {
    id: 'meat-entrecot-ternera',
    name: 'Lomo Alto de Ternera / Beef Ribeye (300g)',
    nameEn: 'Beef Ribeye 300 gr',
    description: '300g de lomo alto / entrecot de ternera con veteado perfecto a la brasa Josper, servido con patatas fritas y pimientos de Padrón.',
    descriptionEn: '300g aged beef ribeye grilled over hot oak coals with sea salt, homemade fries and Padrón peppers.',
    price: 23.50,
    priceDetails: '300g',
    category: 'meats',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    glutenFree: true,
    grilled: true,
    popular: true,
    supportsMeatDoneness: true,
    allergens: ['Mostaza y huevo en la salsa servida aparte'],
    available: true
  },
  {
    id: 'meat-costillar-americano',
    name: 'Costillar de Cerdo Estilo Americano',
    nameEn: 'American-Style Pork Ribs',
    description: 'Costillar de cerdo asado y glaseado con salsa BBQ americana, terminado en el horno de brasas. Con patatas caseras.',
    descriptionEn: 'Tender pork ribs slow-cooked and glazed with American BBQ sauce, finished on the Josper grill.',
    price: 18.50,
    category: 'meats',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    grilled: true,
    popular: true,
    allergens: ['Mostaza', 'Huevo', 'Gluten'],
    available: true
  },
  {
    id: 'meat-presa-iberica',
    name: 'Presa Ibérica de Bellota',
    nameEn: 'Iberian Acorn-Fed Present',
    description: 'Corte noble de presa ibérica de bellota jugosa y llena de sabor, asada al punto en horno Josper con patatas y pimientos.',
    descriptionEn: 'Acorn-fed Iberian presa cut with exceptional tenderness and juicy flavor, served with fries and peppers.',
    price: 22.95,
    category: 'meats',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    glutenFree: true,
    grilled: true,
    supportsMeatDoneness: true,
    allergens: ['Mostaza y huevo en la salsa servida aparte'],
    available: true
  },
  {
    id: 'meat-secreto-iberico',
    name: 'Secreto Ibérico',
    nameEn: 'Iberian Secret',
    description: 'Clásico secreto ibérico veteado y crujiente por fuera, fundente por dentro, cocinado al carbón de encina.',
    descriptionEn: 'Classic marbled Iberian secreto grilled over hot coals with sea salt crystals, fries and peppers.',
    price: 19.95,
    category: 'meats',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    glutenFree: true,
    grilled: true,
    supportsMeatDoneness: true,
    allergens: ['Mostaza y huevo en la salsa servida aparte'],
    available: true
  },
  {
    id: 'meat-puntas-solomillo-cabrales',
    name: 'Puntas de Solomillo con Salsa Cabrales',
    nameEn: 'Sirloin Tips with Cabrales Sauce',
    description: 'Tiernas puntas de solomillo de ternera en cremosa reducción de queso azul Asturiano de Cabrales con patatas.',
    descriptionEn: 'Tender beef sirloin tips sautéed in a rich Asturian Cabrales blue cheese reduction with fries.',
    price: 16.95,
    category: 'meats',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    allergens: ['Lácteos', 'Mostaza', 'Huevo'],
    available: true
  },
  {
    id: 'meat-burger-buey-premium',
    name: 'Hamburguesa de Buey Premium',
    nameEn: 'Premium Beef Burger',
    description: 'Queso cheddar, bacon crujiente, mayonesa de sriracha, pan brioche tierno y patatas fritas caseras.',
    descriptionEn: 'Cheddar cheese, bacon, sriracha mayonnaise, brioche bread and homemade fries.',
    price: 13.95,
    category: 'meats',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allergens: ['Gluten', 'Lácteos', 'Huevo', 'Mostaza', 'Sésamo'],
    available: true
  },

  // ==========================================
  // 5. FISH (Pescados)
  // ==========================================
  {
    id: 'fish-lomo-bacalao',
    name: 'Lomo de Bacalao Gratinado',
    nameEn: 'Cod Loin',
    description: 'Lomo de bacalao confitado con suave salsa de puerros y queso gratinado al horno.',
    descriptionEn: 'With leek sauce and gratinated cheese.',
    price: 18.95,
    category: 'fish',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    allergens: ['Pescado', 'Lácteos'],
    available: true
  },
  {
    id: 'fish-lubina-brasa',
    name: 'Lubina a la Brasa',
    nameEn: 'Lubina a la Brasa (Grilled Sea Bass)',
    description: 'Lubina fresca entera abierta y cocinada a la brasa Josper con carbón de encina, acompañada de ensalada fresca.',
    descriptionEn: 'Fresh whole sea bass grilled over oak charcoal on the Josper with fresh side salad.',
    price: 17.95,
    category: 'fish',
    image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=800&q=80',
    glutenFree: true,
    grilled: true,
    allergens: ['Pescado'],
    available: true
  },

  // ==========================================
  // 6. PIZZAS (Pizzas Artesanas)
  // ==========================================
  {
    id: 'pizza-prosciutto',
    name: 'Pizza Prosciutto',
    nameEn: 'Prosciutto',
    description: 'Tomate, mozzarella fundida y jamón cocido.',
    descriptionEn: 'Tomato, mozzarella, ham.',
    price: 11.95,
    priceDetails: '11,95€/ud',
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten', 'Lácteos'],
    available: true
  },
  {
    id: 'pizza-carbonara',
    name: 'Pizza Carbonara',
    nameEn: 'Carbonara',
    description: 'Mozzarella, nata/crema, huevo, champiñones, bacon y cebolla (sin tomate).',
    descriptionEn: 'Mozzarella, cream, egg, mushrooms, bacon and onion (without tomato).',
    price: 14.00,
    priceDetails: '14,00€/ud',
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    available: true
  },
  {
    id: 'pizza-tropical',
    name: 'Pizza Tropical',
    nameEn: 'Tropical',
    description: 'Tomate, mozzarella, jamón cocido y piña.',
    descriptionEn: 'Tomatoes, mozzarella, ham and pineapple.',
    price: 12.00,
    priceDetails: '12,00€/ud',
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten', 'Lácteos'],
    available: true
  },
  {
    id: 'pizza-farmer-campesina',
    name: 'Pizza Farmer (Campesina)',
    nameEn: 'Farmer',
    description: 'Tomate, mozzarella, pollo, maíz, bacon crujiente y salsa barbacoa.',
    descriptionEn: 'Tomato, mozzarella, chicken, corn, bacon, and barbecue sauce.',
    price: 12.75,
    priceDetails: '12,75€/ud',
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allergens: ['Gluten', 'Lácteos'],
    available: true
  },
  {
    id: 'pizza-padua',
    name: 'Pizza Padua',
    nameEn: 'Padua',
    description: 'Tomate, mozzarella, queso de cabra y verduras asadas.',
    descriptionEn: 'Tomato, mozzarella, goat cheese and grilled vegetables.',
    price: 12.75,
    priceDetails: '12,75€/ud',
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    allergens: ['Gluten', 'Lácteos'],
    available: true
  },
  {
    id: 'pizza-shrimps-gambas',
    name: 'Pizza Shrimps (Gambas)',
    nameEn: 'Shrimps',
    description: 'Tomate, mozzarella, gambas al ajillo y surimi.',
    descriptionEn: 'Tomato, mozzarella, prawns garlic and surimi.',
    price: 13.75,
    priceDetails: '13,75€/ud',
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten', 'Lácteos', 'Crustáceos', 'Pescado'],
    available: true
  },
  {
    id: 'pizza-rimini',
    name: 'Pizza Rimini',
    nameEn: 'Rimini',
    description: 'Tomate, mozzarella, rúcula, parmesano, tomate cherry, crema balsámica y jamón reserva.',
    descriptionEn: 'Tomato, mozzarella, arugula, parmesan, cherry tomato, balsamic cream and reserve ham.',
    price: 13.95,
    priceDetails: '13,95€/ud',
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=800&q=80',
    popular: true,
    featured: true,
    allergens: ['Gluten', 'Lácteos'],
    available: true
  },
  {
    id: 'pizza-4-seasons',
    name: 'Pizza 4 Seasons (4 Estaciones)',
    nameEn: '4 Seasons',
    description: 'Tomate, mozzarella, jamón, champiñones, gambas, atún y aceitunas.',
    descriptionEn: 'Tomato, mozzarella, ham, mushrooms, prawns, tuna and olives.',
    price: 13.75,
    priceDetails: '13,75€/ud',
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten', 'Lácteos', 'Crustáceos', 'Pescado'],
    available: true
  },
  {
    id: 'pizza-cayenne-especial',
    name: 'Pizza Cayenne (Especial de la Casa)',
    nameEn: 'Cayenne',
    description: 'Tomate, mozzarella, carne picada de vacuno, pollo, chile habanero y salsa barbacoa.',
    descriptionEn: 'Tomato, mozzarella, beef, chicken, habanero chili and BBQ sauce.',
    price: 14.25,
    priceDetails: '14,25€/ud',
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    spicy: true,
    featured: true,
    popular: true,
    allergens: ['Gluten', 'Lácteos'],
    available: true
  },
  {
    id: 'pizza-truffle-trufa',
    name: 'Pizza Truffle (Trufa Negra)',
    nameEn: 'Truffle',
    description: 'Mozzarella, crema de trufa negra, champiñones y queso parmesano (sin tomate).',
    descriptionEn: 'Mozzarella, truffle cream, mushrooms and Parmesan (without tomato).',
    price: 13.75,
    priceDetails: '13,75€/ud',
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    popular: true,
    allergens: ['Gluten', 'Lácteos'],
    available: true
  },
  {
    id: 'pizza-4-cheeses-quesos',
    name: 'Pizza 4 Quesos',
    nameEn: '4 Cheeses',
    description: 'Tomate, mozzarella, Roquefort, Parmesano y queso de cabra.',
    descriptionEn: 'Tomato, mozzarella, Roquefort, Parmesan and goat cheese.',
    price: 12.95,
    priceDetails: '12,95€/ud',
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    allergens: ['Gluten', 'Lácteos'],
    available: true
  },

  // ==========================================
  // 7. HOMEMADE DESSERTS (Postres Caseros - Artemisa Homemade Cakes)
  // ==========================================
  {
    id: 'dessert-cookie-cake',
    name: 'Tarta de Galleta de la Abuela (Artemisa)',
    nameEn: 'Cookie Cake',
    description: 'Capas de galleta tradicional con suave crema y chocolate artesanal de nuestra repostería Artemisa.',
    descriptionEn: 'Traditional artisan layered cookie, cream and rich chocolate cake.',
    price: 6.50,
    priceDetails: '6,50€/ud',
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    popular: true,
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    available: true
  },
  {
    id: 'dessert-chocolate-coulant',
    name: 'Coulant de Chocolate con Helado de Vainilla',
    nameEn: 'Chocolate Coulant with Vanilla Ice Cream',
    description: 'Bizcocho tibio de chocolate puro con corazón fundente y bola de helado artesano de vainilla.',
    descriptionEn: 'Warm chocolate lava cake with molten center served with Madagascar vanilla ice cream.',
    price: 6.50,
    priceDetails: '6,50€/ud',
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    popular: true,
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    available: true
  },
  {
    id: 'dessert-guinness-cake',
    name: 'Tarta de Cerveza Guinness (Artemisa)',
    nameEn: 'Guinness Beer Cake',
    description: 'Tarta húmeda de chocolate negro infusionada con cerveza negra Guinness y frosting de crema de queso.',
    descriptionEn: 'Rich, moist dark chocolate cake infused with Guinness stout and cream cheese frosting.',
    price: 6.50,
    priceDetails: '6,50€/ud',
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: true,
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    available: true
  },
  {
    id: 'dessert-cheesecake-pistachio',
    name: 'Tarta de Queso con Pistachos (Artemisa)',
    nameEn: 'Cheesecake with Pistachios',
    description: 'Cremosa tarta de queso horneada bañada con auténtica crema de pistachos tostados.',
    descriptionEn: 'Creamy baked artisan cheesecake topped with roasted pistachio cream.',
    price: 7.00,
    priceDetails: '7,00€/ud',
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: true,
    popular: true,
    allergens: ['Gluten', 'Lácteos', 'Huevo', 'Frutos de cáscara'],
    available: true
  },
  {
    id: 'dessert-mojito-sorbet',
    name: 'Sorbete de Mojito con Ron Havana Club',
    nameEn: 'Mojito Sorbet with Havana Club Rum',
    description: 'Refrescante sorbete de lima natural y hierbabuena fresca — disponible con o sin alcohol Havana Club.',
    descriptionEn: 'Refreshing lime and mint sorbet — available with or without alcohol.',
    price: 7.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    available: true
  },
  {
    id: 'dessert-px-glass',
    name: 'Copa de Vino Dulce Pedro Ximénez',
    nameEn: 'PX Sweet Wine Glass',
    description: 'Copa de vino dulce de uva Pedro Ximénez envejecida en roble, con notas a pasas e higos.',
    descriptionEn: 'Glass of aged Pedro Ximénez sweet dessert wine.',
    price: 3.60,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    allergens: ['Sulfitos'],
    available: true
  },
  {
    id: 'dessert-tokai-glass',
    name: 'Copa de Grand Tokai Terroir Selection',
    nameEn: 'Copa de Grand Tokai Terroir Selection',
    description: 'Vino dulce húngaro Grand Tokaji Terroir Selection (dulce, equilibrado y no empalagoso).',
    descriptionEn: 'Hungarian sweet wine (sweet but not cloying).',
    price: 4.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80',
    allergens: ['Sulfitos'],
    available: true
  },

  // ==========================================
  // 8. BEERS (Cervezas & Beer Menu)
  // ==========================================
  {
    id: 'beer-victoria-malaga',
    name: 'Victoria (Málaga)',
    nameEn: 'Victoria (An Exquisite Taste From Malaga)',
    description: 'Elaborada con ingredientes 100% naturales. Cerveza equilibrada y altamente refrescante gracias a su amargor moderado y el arroz utilizado en su elaboración tradicional.',
    descriptionEn: 'Made from 100% natural ingredients, this is a balanced and highly refreshing beer thanks to its restrained bitterness and the rice used in the brewing process.',
    price: 3.30,
    priceDetails: 'Botella 33cl: 3,30€ | Copa: 3,20€',
    category: 'beers',
    abv: '4.80% Vol.',
    origin: 'Málaga, Andalucía',
    formats: [
      { label: '33cl', price: 3.30 },
      { label: 'Copa / Cup', price: 3.20 }
    ],
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80',
    featured: true,
    popular: true,
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-victoria-pasos-largos',
    name: 'Victoria Pasos Largos (Con Limón)',
    nameEn: 'Victoria Pasos Largos (Beer with Lemon)',
    description: 'En recuerdo del último bandolero andaluz. Cerveza con limón con ingredientes 100% naturales, elaborada con cerveza Victoria y limón natural. La exquisita cerveza con limón de Málaga.',
    descriptionEn: 'Memories of the last Andalusian bandit. A lemonade beer with only 100% natural ingredients made with Victoria beer and lemon. Malaga’s exquisite lemonade beer.',
    price: 3.30,
    priceDetails: 'Botella 33cl: 3,30€',
    category: 'beers',
    abv: '3.20% Vol.',
    origin: 'Málaga, Andalucía',
    formats: [
      { label: '33cl', price: 3.30 }
    ],
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-turia-marzen',
    name: 'Turia (Märzen / Tostada)',
    nameEn: 'Turia (Brown Ale / Amber Lager)',
    description: 'Cerveza tostada estilo lager de tono ámbar rojizo. La malta tostada le otorga un sabor tostado característico y aromático sin resultar pesada. Notas cítricas y frescura ideal para carnes a la brasa.',
    descriptionEn: 'Turia is an amber lager-style beer with a reddish tinge. The roasted malt gives it a distinctive toasty flavour, but does not make it a strong beer. Its citric notes and freshness make Turia the perfect match for Spanish cuisine.',
    price: 3.30,
    priceDetails: 'Copa / Cup: 3,30€',
    category: 'beers',
    abv: '5.40% Vol.',
    origin: 'Valencia, España',
    formats: [
      { label: 'Copa / Cup', price: 3.30 }
    ],
    image: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=800&q=80',
    featured: true,
    popular: true,
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-victoria-sin',
    name: 'Victoria 0,0% (Sin Alcohol)',
    nameEn: 'Victoria 0.0% (Lager-Style Alcohol-Free Beer)',
    description: 'Cerveza sin alcohol altamente refrescante con un brillante color ámbar. El proceso utilizado para eliminar el alcohol restituye los aromas de la cerveza, manteniendo todo su sabor y bouquet.',
    descriptionEn: 'A highly refreshing beer with a brilliant amber colour. The process used to remove the alcohol restores the aromas of the beer, maintaining all its taste and bouquet.',
    price: 3.30,
    priceDetails: 'Botella 33cl: 3,30€',
    category: 'beers',
    abv: '0.00% Vol.',
    origin: 'Málaga, Andalucía',
    formats: [
      { label: '33cl', price: 3.30 }
    ],
    image: 'https://images.unsplash.com/photo-1608270199182-3d5f47a61d19?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-free-damm-tostada',
    name: 'Free Damm Tostada 0,0%',
    nameEn: 'Free Damm Tostada (Non-Alcoholic Amber Lager 0.0%)',
    description: 'Cerveza 0,0% con todos los matices y aromas de las maltas tostadas: notas de café, cacao, cereal torrefacto y caramelo.',
    descriptionEn: 'A 0.0% beer with all the flavours of toasted malts: coffee, cocoa, toasted malts and caramel.',
    price: 3.30,
    priceDetails: 'Botella 33cl: 3,30€',
    category: 'beers',
    abv: '0.00% Vol.',
    origin: 'Barcelona, España',
    formats: [
      { label: '33cl', price: 3.30 }
    ],
    image: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-voll-damm',
    name: 'Voll-Damm (Doble Malta)',
    nameEn: 'Voll-Damm (Double Malt)',
    description: 'El doble de malta le otorga el doble de sabor, más aroma y más cuerpo. Elaborada con ingredientes 100% naturales. Cerveza legendaria con carácter e intensidad inigualable.',
    descriptionEn: 'Twice the malt gives it more flavour, more aroma and more body. 100% natural ingredients.',
    price: 3.30,
    priceDetails: 'Botella 33cl: 3,30€ | Doble: 3,50€',
    category: 'beers',
    abv: '7.20% Vol.',
    origin: 'Barcelona, España',
    formats: [
      { label: '33cl', price: 3.30 },
      { label: 'Doble', price: 3.50 }
    ],
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80',
    featured: true,
    popular: true,
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-alhambra-1925',
    name: 'Cerveza Alhambra Reserva 1925 (Verde)',
    nameEn: 'Alhambra Reserva 1925 (33cl Bottle)',
    description: 'El gran icono cervecero de Granada. Cerveza extra de fermentación lenta, notas de caramelo tostado, cuerpo redondo y botella tallada artesanal (6.4% vol).',
    descriptionEn: 'Granada’s iconic green bottle amber lager. Slow fermented, full-bodied with caramelized malt notes (6.4% ABV).',
    price: 3.60,
    priceDetails: 'Tercio 33cl (6.4%)',
    category: 'beers',
    abv: '6.40% Vol.',
    origin: 'Granada, Andalucía',
    image: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?auto=format&fit=crop&w=800&q=80',
    featured: true,
    popular: true,
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-alhambra-roja',
    name: 'Alhambra Reserva Roja (Bock)',
    nameEn: 'Alhambra Reserva Roja (Bock 33cl)',
    description: 'Cerveza bock intensa de tonos cobrizos y espuma densa, notas a cereal tostado y regaliz (7.2% vol).',
    descriptionEn: 'Intense red bock beer from Granada with deep copper tones, toasted malt and licorice hints (7.2% ABV).',
    price: 3.80,
    priceDetails: 'Tercio 33cl (7.2%)',
    category: 'beers',
    abv: '7.20% Vol.',
    origin: 'Granada, Andalucía',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-alhambra-barril-cana',
    name: 'Caña de Barril Alhambra Especial',
    nameEn: 'Draft Beer Alhambra Especial (Glass)',
    description: 'Cerveza de barril recién tirada con corona de espuma cremosa y bien fría.',
    descriptionEn: 'Fresh draft Alhambra Especial served cold with thick creamy foam.',
    price: 2.50,
    priceDetails: 'Caña 25cl',
    category: 'beers',
    abv: '5.40% Vol.',
    origin: 'Granada, Andalucía',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-alhambra-barril-tubo',
    name: 'Doble de Barril Alhambra Especial',
    nameEn: 'Draft Beer Alhambra Especial (Large)',
    description: 'Vaso doble de barril bien frío con espuma sedosa.',
    descriptionEn: 'Large cold draft glass with dense silky foam.',
    price: 3.20,
    priceDetails: 'Doble 35cl',
    category: 'beers',
    abv: '5.40% Vol.',
    origin: 'Granada, Andalucía',
    image: 'https://images.unsplash.com/photo-1586999768265-24af89630739?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-alhambra-barril-jarra',
    name: 'Jarra de Cerveza de Barril (50cl)',
    nameEn: 'Beer Pitcher / Jarra (50cl)',
    description: 'Jarra de medio litro de cerveza Alhambra Especial de barril helada.',
    descriptionEn: '50cl ice-cold Alhambra draft beer pitcher.',
    price: 4.50,
    priceDetails: 'Jarra 50cl',
    category: 'beers',
    abv: '5.40% Vol.',
    origin: 'Granada, Andalucía',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-alhambra-radler',
    name: 'Alhambra Radler con Limón Natural',
    nameEn: 'Alhambra Radler with Natural Lemon',
    description: 'Cerveza Alhambra Especial mezclada con auténtico zumo natural de limón.',
    descriptionEn: 'Alhambra Especial blended with natural Mediterranean lemon juice.',
    price: 3.00,
    priceDetails: '33cl',
    category: 'beers',
    abv: '3.00% Vol.',
    origin: 'Granada, Andalucía',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-alhambra-sin',
    name: 'Alhambra 0,0% Sin Alcohol',
    nameEn: 'Alhambra 0.0% Non-Alcoholic',
    description: 'Todo el sabor y carácter de Alhambra con cero graduación alcohólica.',
    descriptionEn: 'Full malt aroma and crisp taste with 0.0% alcohol.',
    price: 2.80,
    priceDetails: '33cl (0.0%)',
    category: 'beers',
    abv: '0.00% Vol.',
    origin: 'Granada, Andalucía',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-artesana-granada-ipa',
    name: 'Cerveza Artesana IPA de Granada',
    nameEn: 'Granada Local Craft IPA',
    description: 'Cerveza artesanal elaborada en Granada con lúpulos aromáticos y notas cítricas y resinosas.',
    descriptionEn: 'Local Granada craft India Pale Ale with vibrant citrus and resinous hop aromatics.',
    price: 4.20,
    priceDetails: '33cl (6.0%)',
    category: 'beers',
    abv: '6.00% Vol.',
    origin: 'Granada, Andalucía',
    image: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=800&q=80',
    allergens: ['Gluten'],
    available: true
  },
  {
    id: 'beer-sin-gluten',
    name: 'Cerveza Especial Sin Gluten (Gluten-Free)',
    nameEn: 'Gluten-Free Beer (33cl)',
    description: 'Cerveza apta para celíacos certificada sin gluten, fresca y equilibrada.',
    descriptionEn: 'Certified gluten-free beer with authentic lager malt flavor.',
    price: 3.20,
    priceDetails: '33cl',
    category: 'beers',
    abv: '5.00% Vol.',
    origin: 'España',
    image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=800&q=80',
    glutenFree: true,
    available: true
  },

  // ==========================================
  // 9. WINES & DRINKS (Vinos y Bebidas)
  // ==========================================
  {
    id: 'wine-ribera-roble',
    name: 'Ribera del Duero Roble (Copa / Botella)',
    nameEn: 'Ribera del Duero Roble',
    description: '100% Tempranillo con crianza en barrica. Fruta roja madura con notas de vainilla y tostados.',
    descriptionEn: '100% Tempranillo aged in oak. Ripe red fruit with delicate vanilla and oak nuances.',
    price: 3.80,
    priceDetails: 'Copa 3,80€ | Botella 21,00€',
    category: 'wines',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    allergens: ['Sulfitos'],
    available: true
  },
  {
    id: 'wine-granada-local',
    name: 'Vino Tinto D.O.P. Granada Crianza',
    nameEn: 'Granada Local Crianza Red Wine',
    description: 'Vino de altura de las faldas de Sierra Nevada. Syrah y Tempranillo con mineralidad y cuerpo.',
    descriptionEn: 'High-altitude mountain wine from Sierra Nevada slopes. Syrah & Tempranillo blend with great structure.',
    price: 4.00,
    priceDetails: 'Copa 4,00€ | Botella 23,50€',
    category: 'wines',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
    featured: true,
    allergens: ['Sulfitos'],
    available: true
  },
  {
    id: 'wine-rueda-verdejo',
    name: 'Rueda Verdejo Blanco',
    nameEn: 'Rueda Verdejo White Wine',
    description: 'Aromático, fresco y afrutado con notas de hinojo y fruta tropical.',
    descriptionEn: 'Aromatic, crisp and vibrant with hints of fennel and fresh tropical fruit.',
    price: 3.50,
    priceDetails: 'Copa 3,50€ | Botella 19,00€',
    category: 'wines',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80',
    allergens: ['Sulfitos'],
    available: true
  },
  {
    id: 'wine-sangria-lacayena',
    name: 'Sangría Especial La Cayena (Jarra)',
    nameEn: 'La Cayena Signature Sangria (Pitcher)',
    description: 'Vino tinto de la tierra, maceración de frutas de temporada, canela y toque cítrico.',
    descriptionEn: 'Local red wine, seasonal macerated fruit, cinnamon and citrus notes.',
    price: 12.50,
    priceDetails: 'Jarra 1L',
    category: 'wines',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allergens: ['Sulfitos'],
    available: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-team',
    titleEs: 'El Equipo de Asador La Cayena',
    titleEn: 'The Asador La Cayena Team',
    category: 'restaurant',
    imageUrl: RESTAURANT_IMAGES.team,
    descriptionEs: 'La pasión, dedicación y calidez humana de nuestra familia de cocina y sala.',
    descriptionEn: 'The passion, craftsmanship and warm hospitality of our kitchen and front-of-house family.'
  },
  {
    id: 'gal-1',
    titleEs: 'Brasas al Carbón de Encina Josper',
    titleEn: 'Josper Oak Charcoal Embers',
    category: 'grill',
    imageUrl: RESTAURANT_IMAGES.josperGrill,
    descriptionEs: 'La magia del fuego y el control milimétrico de la temperatura en nuestro horno Josper.',
    descriptionEn: 'The magic of real fire and precision heat in our Josper charcoal oven.'
  },
  {
    id: 'gal-3',
    titleEs: 'Terraza Exterior Cubierta y Climatizada',
    titleEn: 'Covered Outdoor Garden Terrace',
    category: 'terrace',
    imageUrl: RESTAURANT_IMAGES.terrace,
    descriptionEs: 'Disfruta de las noches andaluzas al aire libre bajo las estrellas y la brisa de La Zubia.',
    descriptionEn: 'Enjoy Andalusian evenings under the starry skies and fresh mountain air of La Zubia.'
  },
  {
    id: 'gal-4',
    titleEs: 'Ambiente Cálido Junto a la Chimenea',
    titleEn: 'Warm Fireplace Atmosphere',
    category: 'restaurant',
    imageUrl: RESTAURANT_IMAGES.fireplace,
    descriptionEs: 'Madera natural, fuego reconfortante y un salón diseñado para inolvidables sobremesas.',
    descriptionEn: 'Natural timber, comforting glowing fire and a dining hall made for memorable conversations.'
  },
  {
    id: 'gal-2',
    titleEs: 'Chuletón y Cortes Madurados',
    titleEn: 'Prime Aged Cuts & Steaks',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    descriptionEs: 'Carne jugosa, corte perfecto y sellado crujiente al punto exacto.',
    descriptionEn: 'Juicy meat, perfect marbled cut and caramelized outer crust.'
  },
  {
    id: 'gal-5',
    titleEs: 'Flores de Alcachofa y Tapas Ibéricas',
    titleEn: 'Artichoke Flowers & Tapas',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    descriptionEs: 'Platos tradicionales elaborados con producto de temporada y toque gourmet.',
    descriptionEn: 'Traditional Andalusian recipes made with seasonal produce and refined presentation.'
  },
  {
    id: 'gal-6',
    titleEs: 'Pizzas Artesanas y Postres Artemisa',
    titleEn: 'Artisan Pizzas & Artemisa Cakes',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    descriptionEs: 'Pizzas con masa casera y repostería artesanal horneada con cariño.',
    descriptionEn: 'Hand-stretched artisan pizzas and cakes baked with homemade care.'
  },
  {
    id: 'gal-7',
    titleEs: 'Costillar Americano Glaseado',
    titleEn: 'Glazed American Ribs',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1200&q=80',
    descriptionEs: 'Maceración lenta de 24 horas y ahumado suave que se deshace en la boca.',
    descriptionEn: 'Slow 24-hour marinade and tender wood smoking that melts in the mouth.'
  }
];

export const EXPERIENCE_CARDS = [
  {
    id: 'josper',
    titleEs: 'Parrilla Josper de Encina',
    titleEn: 'Josper Oak Charcoal Grill',
    descriptionEs: 'Horno y brasa combinados a más de 350°C. Sabor inconfundible, sellado perfecto y jugosidad extrema en cada bocado.',
    descriptionEn: 'Oven and grill combined at 350°C+. Unmistakable oak smoke aroma, flawless sear and juicy tenderness.',
    icon: 'Flame',
    image: RESTAURANT_IMAGES.josperGrill
  },
  {
    id: 'terrace',
    titleEs: 'Terraza Exterior Ajardinada',
    titleEn: 'Spacious Outdoor Terrace',
    descriptionEs: 'Disfruta de la brisa de La Zubia y vistas cercanas a Sierra Nevada en un espacio al aire libre amplio y acogedor.',
    descriptionEn: 'Enjoy the pleasant breeze of La Zubia and outdoor dining in our spacious, welcoming garden terrace.',
    icon: 'Sun',
    image: RESTAURANT_IMAGES.terrace
  },
  {
    id: 'pizzas',
    titleEs: 'Pizzas Artesanales al Horno',
    titleEn: 'Handcrafted Stone-Baked Pizzas',
    descriptionEs: 'Masa de fermentación lenta, ingredientes frescos y combinaciones únicas como nuestra Pizza Cayenne o Trufa.',
    descriptionEn: 'Slow-fermented artisan crusts, fresh mozzarella and unique creations like our signature Cayenne and Truffle pizzas.',
    icon: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fireplace',
    titleEs: 'Ambiente Cálido y Chimenea',
    titleEn: 'Warm Fireplace Atmosphere',
    descriptionEs: 'Un refugio gastronómico con chimenea, maderas nobles y hospitalidad andaluza para sentirte como en casa.',
    descriptionEn: 'A gastronomic retreat with warm fireplace, authentic woods and heartfelt Andalusian hospitality.',
    icon: 'Sparkles',
    image: RESTAURANT_IMAGES.fireplace
  }
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    authorName: 'Carlos M. Fernández',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    relativeTime: 'Hace 1 semana',
    relativeTimeEn: '1 week ago',
    textEs: '¡Espectacular experiencia! El chuletón madurado al horno Josper es de los mejores que he probado en toda Granada. La carne mantequilla pura con ese toque a carbón de encina. El trato del equipo de 10, y la tarta casera de queso de Artemisa sublime. ¡Repetiremos seguro!',
    textEn: 'Spectacular experience! The aged ribeye steak in the Josper oven is among the best I have tasted in Granada. Pure buttery meat with that authentic oak charcoal aroma. The team hospitality is 10/10, and Artemisa homemade cheesecake is sublime!',
    highlightCategory: 'meats',
    isLocalGuide: true,
    googleMapsUrl: 'https://share.google/Ccpmv3mNFAxVaCsOG'
  },
  {
    id: 'rev-2',
    authorName: 'Laura Gutiérrez P.',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    relativeTime: 'Hace 2 semanas',
    relativeTimeEn: '2 weeks ago',
    textEs: 'Cenamos en la terraza y estuvimos de maravilla. Pedimos la pizza Cayenne, flores de alcachofa y secreto ibérico a la brasa. Todo abundante, sabroso y con un precio más que justo. Nos encantó ver el buen rollo que transmite todo el equipo.',
    textEn: 'We had dinner on the terrace and had a wonderful time. We ordered the Cayenne pizza, artichoke flowers and grilled Iberian pork. Everything generous, delicious and fairly priced. Loved the genuine warmth of the entire team!',
    highlightCategory: 'pizzas',
    isLocalGuide: true,
    googleMapsUrl: 'https://share.google/Ccpmv3mNFAxVaCsOG'
  },
  {
    id: 'rev-3',
    authorName: 'Francisco Javier Sánchez',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    relativeTime: 'Hace 3 semanas',
    relativeTimeEn: '3 weeks ago',
    textEs: 'Uno de los grandes secretos gastronómicos de La Zubia. Si te gusta la carne a la brasa de verdad, este es tu sitio. Las patatas caseras con los pimientos de padrón y la salsa que ponen están increíbles. Además el salón interior con la chimenea es súper acogedor.',
    textEn: 'One of the best culinary gems in La Zubia. If you love real charcoal-grilled meat, this is your place. The homemade fries with padrón peppers are incredible. Plus the indoor dining room with the fireplace is super cozy.',
    highlightCategory: 'meats',
    isLocalGuide: false,
    googleMapsUrl: 'https://share.google/Ccpmv3mNFAxVaCsOG'
  },
  {
    id: 'rev-4',
    authorName: 'Elena Ramos Vidal',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    relativeTime: 'Hace 1 mes',
    relativeTimeEn: '1 month ago',
    textEs: 'Vinimos en familia a celebrar un cumpleaños y salimos encantados. Los entrantes riquísimos (las croquetas de jamón y el provolone), las pizzas artesanales con masa fina y crujiente, y las tartas de Artemisa Homemade Cakes para el postre fueron el broche de oro.',
    textEn: 'We came as a family to celebrate a birthday and were delighted. Delicious starters (ham croquettes and provolone), artisan crispy pizzas, and the Artemisa homemade cakes for dessert were the perfect finale.',
    highlightCategory: 'desserts',
    isLocalGuide: true,
    googleMapsUrl: 'https://share.google/Ccpmv3mNFAxVaCsOG'
  },
  {
    id: 'rev-5',
    authorName: 'Miguel Ángel Torres',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    relativeTime: 'Hace 1 mes',
    relativeTimeEn: '1 month ago',
    textEs: 'Comida de calidad superior y atención impecable. Tomamos una Alhambra Reserva 1925 bien fría con una tapa generosa, y luego entrecot y tomahawk a la brasa. Punto de cocción perfecto. Muy recomendable reservar con antelación.',
    textEn: 'Top quality food and impeccable attention. We enjoyed ice-cold Alhambra Reserva 1925 with generous tapas, followed by grilled sirloin and tomahawk. Perfect doneness. Highly recommend booking in advance.',
    highlightCategory: 'service',
    isLocalGuide: true,
    googleMapsUrl: 'https://share.google/Ccpmv3mNFAxVaCsOG'
  },
  {
    id: 'rev-6',
    authorName: 'Sophie Bernard',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    relativeTime: 'Hace 2 meses',
    relativeTimeEn: '2 months ago',
    textEs: 'Lugar fantástico en La Zubia. Ambiente auténtico, servicio rápido y muy amable. Las carnes al Josper tienen un sabor inigualable. Gran variedad de cervezas Alhambra y vinos de la tierra. 100% recomendado.',
    textEn: 'Fantastic spot in La Zubia. Authentic atmosphere, fast and friendly service. The Josper meats have an unmatched smoky taste. Great selection of Alhambra beers and local Granada wines. 100% recommended.',
    highlightCategory: 'service',
    isLocalGuide: false,
    googleMapsUrl: 'https://share.google/Ccpmv3mNFAxVaCsOG'
  }
];
