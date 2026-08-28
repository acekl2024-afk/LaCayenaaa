import { MediaItem, MediaCategory, MediaPlacement, QualityIssue, MenuItem } from '../types';
import { INITIAL_MENU_ITEMS } from '../data/restaurantData';

export interface AIAnalysisResult {
  detectedObjects: string[];
  suggestedCategory: MediaCategory;
  suggestedTags: string[];
  suggestedFileName: string;
  suggestedAltTextEs: string;
  suggestedAltTextEn: string;
  suggestedDescriptionEs: string;
  suggestedDescriptionEn: string;
  suggestedPlacement: MediaPlacement;
  suggestedDishId?: string;
  dishMatchConfidence: number; // 0 - 100
  needsManualDishAssignment: boolean;
  qualityScore: number;
  qualityIssues: QualityIssue[];
  isSuitableForWeb: boolean;
  aspectRatio: string;
}

export function analyzeMediaFile(
  fileName: string, 
  fileType: string, 
  fileSizeBytes: number,
  existingMedia: MediaItem[] = []
): AIAnalysisResult {
  const lowerName = fileName.toLowerCase();
  const isVideo = fileType.startsWith('video') || lowerName.endsWith('.mp4') || lowerName.endsWith('.mov');
  
  const detectedObjects: string[] = [];
  let suggestedCategory: MediaCategory = 'General Gallery';
  let suggestedPlacement: MediaPlacement = 'Gallery';
  const suggestedTags: string[] = ['asador la cayena', 'la zubia', 'granada'];
  let suggestedDishId: string | undefined = undefined;
  let dishMatchConfidence = 0;
  let needsManualDishAssignment = false;
  const qualityIssues: QualityIssue[] = [];

  // Categorization heuristics & semantic detection
  if (lowerName.includes('logo') || lowerName.includes('emblem') || lowerName.includes('marca')) {
    suggestedCategory = 'Restaurant Interior';
    suggestedPlacement = 'Home Hero';
    detectedObjects.push('Rustic wooden sign', 'Cayenne chili flames', 'Brick oven arch', 'Branding logo');
    suggestedTags.push('logo', 'branding', 'emblema', 'la cayena');
  } else if (lowerName.includes('team') || lowerName.includes('equipo') || lowerName.includes('staff') || lowerName.includes('cocinero') || lowerName.includes('camarero')) {
    suggestedCategory = 'Staff';
    suggestedPlacement = 'About Section';
    detectedObjects.push('Culinary team', 'Hospitality staff', 'Chefs in aprons', 'Dining hall');
    suggestedTags.push('equipo', 'familia', 'cocina', 'hospitalidad', 'servicio');
  } else if (lowerName.includes('josper') || lowerName.includes('grill') || lowerName.includes('brasa') || lowerName.includes('fuego') || lowerName.includes('carbon') || lowerName.includes('ember')) {
    suggestedCategory = 'Josper Grill';
    suggestedPlacement = isVideo ? 'Josper Grill Section' : 'Home Hero';
    detectedObjects.push('Josper charcoal oven', 'Live oak embers', 'Cast iron grill', '350°C Fire');
    suggestedTags.push('josper', 'carbón de encina', 'fuego', 'parrilla', 'brasas');
  } else if (lowerName.includes('terraza') || lowerName.includes('terrace') || lowerName.includes('exterior') || lowerName.includes('pergola') || lowerName.includes('jardin')) {
    suggestedCategory = 'Outdoor Terrace';
    suggestedPlacement = 'Outdoor Terrace';
    detectedObjects.push('Covered terrace', 'Wooden pergola', 'Outdoor dining tables', 'Garden atmosphere');
    suggestedTags.push('terraza', 'aire libre', 'cenas de verano', 'sierra nevada');
  } else if (lowerName.includes('chimenea') || lowerName.includes('fireplace') || lowerName.includes('hogar') || lowerName.includes('acogedor')) {
    suggestedCategory = 'Fireplace';
    suggestedPlacement = 'Fireplace Experience';
    detectedObjects.push('Burning wood fireplace', 'Cozy dining hall', 'Rustic wooden beams', 'Warm ambiance');
    suggestedTags.push('chimenea', 'calidez', 'madera', 'sobremesa');
  } else if (lowerName.includes('chuleton') || lowerName.includes('steak') || lowerName.includes('vaca') || lowerName.includes('tomahawk') || lowerName.includes('entrecot')) {
    suggestedCategory = 'Beef';
    suggestedPlacement = 'Featured Dishes';
    detectedObjects.push('Aged beef steak', 'Charcoal sear', 'Flaky sea salt', 'Marbled beef');
    suggestedTags.push('chuleton', 'vaca madurada', 'corte noble', 'josper');
    suggestedDishId = 'josper-1';
    dishMatchConfidence = 92;
  } else if (lowerName.includes('secreto') || lowerName.includes('iberico') || lowerName.includes('pluma') || lowerName.includes('presa') || lowerName.includes('pork')) {
    suggestedCategory = 'Iberian Meat';
    suggestedPlacement = 'Menu Item';
    detectedObjects.push('Iberian pork cut', 'Charcoal grill marks', 'Roasted potatoes');
    suggestedTags.push('secreto ibérico', 'cerdo de bellota', 'jugosidad');
    suggestedDishId = 'josper-3';
    dishMatchConfidence = 89;
  } else if (lowerName.includes('burger') || lowerName.includes('hamburguesa')) {
    suggestedCategory = 'Burgers';
    suggestedPlacement = 'Menu Item';
    detectedObjects.push('Smoked brioche burger', 'Aged beef patty', 'Melted cheese');
    suggestedTags.push('hamburguesa gourmet', 'brioche', 'josper');
    suggestedDishId = 'burger-1';
    dishMatchConfidence = 90;
  } else if (lowerName.includes('mojito') || lowerName.includes('cocktail') || lowerName.includes('coctel') || lowerName.includes('gin') || lowerName.includes('copa')) {
    suggestedCategory = 'Cocktails';
    suggestedPlacement = 'Cocktail Section';
    detectedObjects.push('Craft cocktail glass', 'Fresh mint leaves', 'Cayenne chili garnish', 'Ice cubes');
    suggestedTags.push('coctelería de autor', 'mojito la cayena', 'copas');
    suggestedDishId = 'cocktail-1';
    dishMatchConfidence = 94;
  } else if (lowerName.includes('salad') || lowerName.includes('ensalada') || lowerName.includes('cabra') || lowerName.includes('burrata')) {
    suggestedCategory = 'Salads';
    suggestedPlacement = 'Menu Item';
    detectedObjects.push('Fresh salad greens', 'Caramelized goat cheese', 'Walnuts and honey');
    suggestedTags.push('ensalada fresca', 'queso de cabra', 'huerta');
    suggestedDishId = 'salad-1';
    dishMatchConfidence = 88;
  } else if (lowerName.includes('champiñon') || lowerName.includes('mushroom') || lowerName.includes('tapa') || lowerName.includes('starter') || lowerName.includes('entrante')) {
    suggestedCategory = 'Starters';
    suggestedPlacement = 'Menu Item';
    detectedObjects.push('Stuffed mushrooms', 'Iberian ham cubes', 'Gratin cheese');
    suggestedTags.push('entrantes', 'champiñones rellenos', 'tapas');
    suggestedDishId = 'starter-1';
    dishMatchConfidence = 85;
  } else if (lowerName.includes('postre') || lowerName.includes('dessert') || lowerName.includes('tarta') || lowerName.includes('tiramisu') || lowerName.includes('brownie')) {
    suggestedCategory = 'Desserts';
    suggestedPlacement = 'Menu Item';
    detectedObjects.push('Artisanal dessert', 'Caramel topping', 'Sweet presentation');
    suggestedTags.push('postres caseros', 'tarta', 'dulce');
    suggestedDishId = 'dessert-1';
    dishMatchConfidence = 86;
  } else if (lowerName.includes('vino') || lowerName.includes('wine') || lowerName.includes('cava') || lowerName.includes('rioja') || lowerName.includes('ribera')) {
    suggestedCategory = 'Wine';
    suggestedPlacement = 'Restaurant Experience';
    detectedObjects.push('Wine bottle', 'Crystal glasses', 'Sommelier selection');
    suggestedTags.push('vinos', 'maridaje', 'bodega');
  } else {
    // Ambiguous food or photo
    suggestedCategory = 'Restaurant Atmosphere';
    suggestedPlacement = 'Gallery';
    detectedObjects.push('Restaurant environment', 'Ambient light', 'Dining space');
    needsManualDishAssignment = true;
  }

  // Quality heuristics
  let qualityScore = 92;
  if (fileSizeBytes < 50 * 1024) { // Less than 50KB
    qualityIssues.push('low_resolution');
    qualityScore -= 30;
  }
  if (lowerName.includes('blur') || lowerName.includes('borroso') || lowerName.includes('movido')) {
    qualityIssues.push('blurry');
    qualityScore -= 25;
  }
  if (lowerName.includes('oscura') || lowerName.includes('dark') || lowerName.includes('shadow')) {
    qualityIssues.push('poor_lighting');
    qualityScore -= 15;
  }

  // Duplicate detection
  const duplicate = existingMedia.find(m => m.fileName.toLowerCase() === lowerName || (m.fileSize === `${Math.round(fileSizeBytes/1024)} KB`));
  if (duplicate) {
    qualityIssues.push('duplicate');
    qualityScore -= 40;
  }

  const cleanBase = lowerName.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9]/gi, '_');
  const suggestedFileName = `${cleanBase}_la_cayena_${Date.now().toString().slice(-4)}.${isVideo ? 'mp4' : 'webp'}`;

  const categoryLabelsEs: Record<MediaCategory, string> = {
    'Restaurant Interior': 'Comedor interior y ambiente rústico',
    'Restaurant Exterior': 'Fachada exterior y accesos',
    'Outdoor Terrace': 'Terraza exterior ajardinada y cubierta',
    'Fireplace': 'Salón con chimenea de leña encendida',
    'Josper Grill': 'Horno de brasa Josper y fuego vivo al carbón de encina',
    'Grilled Meat': 'Carnes nobles asadas a la brasa',
    'Beef': 'Cortes madurados de vaca seleccionada a la brasa',
    'Iberian Meat': 'Cortes de cerdo ibérico 100% bellota al carbón',
    'Chicken': 'Pollo de corral y aves asadas al horno',
    'Burgers': 'Hamburguesas artesanales ahumadas al Josper',
    'Starters': 'Entrantes especiales y tapas selectas',
    'Salads': 'Ensaladas frescas con ingredientes locales',
    'Desserts': 'Postres artesanales y repostería de la casa',
    'Cocktails': 'Coctelería de autor y copas premium',
    'Beer': 'Cervezas artesanales y de barril bien tiradas',
    'Wine': 'Cava de vinos y selección D.O.',
    'Restaurant Atmosphere': 'Atmósfera gastronómica y sobremesas',
    'Staff': 'Equipo de cocina y hospitalidad de Asador La Cayena',
    'Events': 'Celebraciones, eventos y reuniones',
    'General Gallery': 'Momentos y gastronomía en Asador La Cayena'
  };

  const categoryLabelsEn: Record<MediaCategory, string> = {
    'Restaurant Interior': 'Indoor rustic dining room and atmosphere',
    'Restaurant Exterior': 'Restaurant facade and main entrance',
    'Outdoor Terrace': 'Covered outdoor garden terrace',
    'Fireplace': 'Warm wood-burning fireplace dining hall',
    'Josper Grill': 'Josper charcoal oven with live holm oak embers',
    'Grilled Meat': 'Prime grilled meats seared on oak charcoal',
    'Beef': 'Dry-aged prime beef steaks on the Josper grill',
    'Iberian Meat': '100% acorn-fed Iberian pork cuts on charcoal',
    'Chicken': 'Free-range poultry roasted over glowing embers',
    'Burgers': 'Artisanal smoked Josper beef burgers',
    'Starters': 'House specialty appetizers and shared tapas',
    'Salads': 'Fresh garden salads with local Andalusian produce',
    'Desserts': 'Artisanal desserts and handcrafted pastries',
    'Cocktails': 'Signature handcrafted cocktails and premium drinks',
    'Beer': 'Chilled draft beers and craft selections',
    'Wine': 'Curated wine cellar and regional pairings',
    'Restaurant Atmosphere': 'Gastronomic dining atmosphere and hospitality',
    'Staff': 'Culinary chefs and hospitality team of Asador La Cayena',
    'Events': 'Private celebrations and special gatherings',
    'General Gallery': 'Memorable dining moments at Asador La Cayena'
  };

  const suggestedAltTextEs = `${categoryLabelsEs[suggestedCategory]} en Asador La Cayena, La Zubia Granada`;
  const suggestedAltTextEn = `${categoryLabelsEn[suggestedCategory]} at Asador La Cayena in La Zubia Granada, Spain`;
  const suggestedDescriptionEs = `Fotografía oficial de ${categoryLabelsEs[suggestedCategory].toLowerCase()} optimizada para la web oficial.`;
  const suggestedDescriptionEn = `Official photograph of ${categoryLabelsEn[suggestedCategory].toLowerCase()} optimized for the restaurant web experience.`;

  return {
    detectedObjects,
    suggestedCategory,
    suggestedTags,
    suggestedFileName,
    suggestedAltTextEs,
    suggestedAltTextEn,
    suggestedDescriptionEs,
    suggestedDescriptionEn,
    suggestedPlacement,
    suggestedDishId,
    dishMatchConfidence,
    needsManualDishAssignment,
    qualityScore: Math.max(10, Math.min(100, qualityScore)),
    qualityIssues,
    isSuitableForWeb: qualityScore >= 70,
    aspectRatio: isVideo ? '16:9' : '3:2'
  };
}
