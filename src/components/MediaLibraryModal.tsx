import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MediaItem, 
  MediaCategory, 
  MediaPlacement, 
  MediaType, 
  QualityIssue 
} from '../types';
import { MEDIA_CATEGORIES } from '../data/mediaLibraryData';
import { analyzeMediaFile, AIAnalysisResult } from '../services/aiMediaAnalysis';
import { googleBusinessMediaService } from '../services/googleBusinessMediaService';
import { INITIAL_MENU_ITEMS } from '../data/restaurantData';
import { 
  X, 
  Upload, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  Film, 
  Image as ImageIcon, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Edit3, 
  Plus, 
  ExternalLink, 
  RefreshCw, 
  Layers, 
  Tag, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  SlidersHorizontal,
  FolderSync,
  HelpCircle,
  Play,
  Volume2,
  VolumeX,
  MapPin
} from 'lucide-react';

export const MediaLibraryModal: React.FC = () => {
  const { 
    isMediaLibraryOpen, 
    setIsMediaLibraryOpen, 
    mediaList, 
    addMediaItem, 
    updateMediaItem, 
    deleteMediaItem, 
    assignPlacement, 
    assignDishImage, 
    approveStagedMedia, 
    rejectStagedMedia,
    activePlacements,
    dishImageOverrides,
    language,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'review' | 'videos' | 'categories' | 'placements' | 'gbp'>('all');
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analyzingStep, setAnalyzingStep] = useState<string>('');
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  
  // GBP Sync state
  const [isGbpConnecting, setIsGbpConnecting] = useState(false);
  const [isGbpConnected, setIsGbpConnected] = useState(false);
  const [gbpFetching, setGbpFetching] = useState(false);
  const [stagedGbpItems, setStagedGbpItems] = useState<MediaItem[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isMediaLibraryOpen) return null;

  // Filtered list
  const filteredList = mediaList.filter(item => {
    // Tab filter
    if (activeTab === 'review' && !item.needsReview && (item.qualityIssues?.length || 0) === 0) return false;
    if (activeTab === 'videos' && item.mediaType !== 'video') return false;
    if (activeTab === 'categories' && selectedCategory !== 'all' && item.category !== selectedCategory) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.fileName.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
      const matchAlt = item.altText.toLowerCase().includes(q) || (item.altTextEn && item.altTextEn.toLowerCase().includes(q));
      return matchName || matchCat || matchTags || matchAlt;
    }
    return true;
  });

  const reviewNeededCount = mediaList.filter(m => m.needsReview || (m.qualityIssues && m.qualityIssues.length > 0)).length;
  const videoCount = mediaList.filter(m => m.mediaType === 'video').length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    processFiles(Array.from(files));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const processFiles = (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(10);
    setAnalyzingStep(language === 'es' ? 'Leyendo metadatos y optimizando resolución...' : 'Reading metadata & optimizing resolution...');

    setTimeout(() => {
      setUploadProgress(45);
      setAnalyzingStep(language === 'es' ? 'IA analizando escena, brasas Josper, iluminación y entorno...' : 'AI analyzing scene, Josper embers, lighting and composition...');

      setTimeout(() => {
        setUploadProgress(85);
        setAnalyzingStep(language === 'es' ? 'Generando textos SEO bilingües y sugiriendo ubicaciones...' : 'Generating bilingual SEO texts and suggesting placements...');

        setTimeout(() => {
          files.forEach(file => {
            const isVideo = file.type.startsWith('video');
            const analysis = analyzeMediaFile(file.name, file.type, file.size, mediaList);
            const objectUrl = URL.createObjectURL(file);

            const newItem: MediaItem = {
              id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              fileName: analysis.suggestedFileName,
              mediaType: isVideo ? 'video' : 'image',
              url: objectUrl,
              thumbnailUrl: objectUrl,
              posterUrl: isVideo ? objectUrl : undefined,
              width: isVideo ? 1920 : 2048,
              height: isVideo ? 1080 : 1365,
              fileSize: `${Math.round(file.size / 1024)} KB`,
              category: analysis.suggestedCategory,
              tags: analysis.suggestedTags,
              altText: analysis.suggestedAltTextEs,
              altTextEn: analysis.suggestedAltTextEn,
              description: analysis.suggestedDescriptionEs,
              descriptionEn: analysis.suggestedDescriptionEn,
              uploadDate: new Date().toISOString().split('T')[0],
              active: analysis.isSuitableForWeb,
              usedIn: [analysis.suggestedPlacement],
              suggestedPlacement: analysis.suggestedPlacement,
              suggestedDishId: analysis.suggestedDishId,
              needsReview: !analysis.isSuitableForWeb || analysis.needsManualDishAssignment,
              qualityIssues: analysis.qualityIssues,
              qualityScore: analysis.qualityScore,
              duration: isVideo ? '0:35' : undefined,
              aspectRatio: analysis.aspectRatio,
              source: 'admin_upload'
            };

            addMediaItem(newItem);
            if (analysis.isSuitableForWeb) {
              assignPlacement(analysis.suggestedPlacement, newItem);
            }
          });

          setIsUploading(false);
          setUploadProgress(100);
          showToast(language === 'es' ? 'Archivos subidos y analizados con IA exitosamente' : 'Files uploaded and analyzed with AI successfully');
        }, 600);
      }, 700);
    }, 600);
  };

  const handleConnectGbp = async () => {
    setIsGbpConnecting(true);
    await googleBusinessMediaService.connectGoogleBusinessProfile();
    setIsGbpConnecting(false);
    setIsGbpConnected(true);
    showToast(language === 'es' ? 'Conexión con Perfil de Empresa Google establecida' : 'Google Business Profile connected');
  };

  const handleFetchGbpMedia = async () => {
    setGbpFetching(true);
    const media = await googleBusinessMediaService.fetchBusinessMedia('loc_la_zubia_cayena_01');
    setStagedGbpItems(media);
    setGbpFetching(false);
    showToast(language === 'es' ? '2 fotos verificadas encontradas en Google Business' : '2 verified photos found in Google Business queue');
  };

  const handleImportGbpItem = (item: MediaItem) => {
    addMediaItem(item);
    setStagedGbpItems(prev => prev.filter(i => i.id !== item.id));
    showToast(language === 'es' ? 'Elemento añadido al área de revisión' : 'Item added to review area');
  };

  const PLACEMENT_OPTIONS: { id: MediaPlacement; labelEs: string; labelEn: string; icon: string }[] = [
    { id: 'Home Hero', labelEs: 'Portada / Hero Principal', labelEn: 'Home Hero Background', icon: 'Flame' },
    { id: 'Outdoor Terrace', labelEs: 'Terraza Exterior', labelEn: 'Outdoor Terrace Section', icon: 'Sun' },
    { id: 'Fireplace Experience', labelEs: 'Salón Chimenea', labelEn: 'Fireplace Dining Experience', icon: 'Flame' },
    { id: 'Josper Grill Section', labelEs: 'Sección Parrilla Josper', labelEn: 'Josper Grill Section', icon: 'Flame' },
    { id: 'About Section', labelEs: 'Historia y Equipo (Sobre Nosotros)', labelEn: 'About & Story Section', icon: 'Users' },
    { id: 'Cocktail Section', labelEs: 'Coctelería y Copas', labelEn: 'Cocktails Section', icon: 'Wine' },
    { id: 'Featured Dishes', labelEs: 'Platos Destacados', labelEn: 'Featured Dishes', icon: 'Sparkles' },
    { id: 'Gallery', labelEs: 'Galería General', labelEn: 'Gallery Collection', icon: 'Image' },
    { id: 'Reservation Page', labelEs: 'Página de Reservas', labelEn: 'Reservation Page Hero', icon: 'Calendar' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-hidden">
      <div className="bg-[#1E1B18] text-[#F5F0E8] w-full max-w-6xl h-[92vh] max-h-[900px] rounded-2xl shadow-2xl border border-[#B08D57]/40 flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-[#151311]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B52A2A]/20 border border-[#B08D57]/50 flex items-center justify-center text-[#B08D57]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-lg sm:text-xl text-[#F5F0E8]">
                  {language === 'es' ? 'Biblioteca de Medios Oficial & IA' : 'Official Media Library & AI Hub'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#B08D57] text-[10px] font-bold uppercase tracking-wider">
                  Asador La Cayena
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {language === 'es' 
                  ? 'Gestiona fotografías y vídeos oficiales, análisis de calidad por IA y asignaciones a la web' 
                  : 'Manage official photos & videos, AI quality analysis, and site placements'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B52A2A] hover:bg-[#9c2424] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#B52A2A]/20"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'es' ? 'Subir Foto / Vídeo' : 'Upload Media'}</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              multiple 
              accept="image/*,video/*" 
              className="hidden" 
            />
            <button
              onClick={() => setIsMediaLibraryOpen(false)}
              className="p-2 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Upload Processing Banner */}
        {isUploading && (
          <div className="bg-[#2A231D] border-b border-[#B08D57]/40 p-4 animate-pulse">
            <div className="max-w-xl mx-auto space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#B08D57] font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin text-[#B08D57]" />
                  {analyzingStep}
                </span>
                <span className="font-bold text-[#F5F0E8]">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#B52A2A] to-[#B08D57] transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs & Search Controls */}
        <div className="px-6 py-3 bg-[#191714] border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'all' 
                  ? 'bg-[#B08D57] text-[#1E1B18] font-bold shadow-sm' 
                  : 'bg-stone-800/60 hover:bg-stone-800 text-stone-300'
              }`}
            >
              {language === 'es' ? 'Todo' : 'All'} ({mediaList.length})
            </button>

            <button
              onClick={() => setActiveTab('review')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'review' 
                  ? 'bg-amber-500 text-black font-bold shadow-sm' 
                  : 'bg-stone-800/60 hover:bg-stone-800 text-stone-300'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'es' ? 'Revisión Sugerida' : 'Review Recommended'}</span>
              {reviewNeededCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-600 text-white text-[10px] font-bold">
                  {reviewNeededCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'videos' 
                  ? 'bg-[#B08D57] text-[#1E1B18] font-bold shadow-sm' 
                  : 'bg-stone-800/60 hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Vídeos' : 'Videos'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-stone-700 text-stone-300 text-[10px]">
                {videoCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'categories' 
                  ? 'bg-[#B08D57] text-[#1E1B18] font-bold shadow-sm' 
                  : 'bg-stone-800/60 hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Categorías' : 'Categories'}</span>
            </button>

            <button
              onClick={() => setActiveTab('placements')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'placements' 
                  ? 'bg-[#B08D57] text-[#1E1B18] font-bold shadow-sm' 
                  : 'bg-stone-800/60 hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Ubicaciones Web' : 'Site Placements'}</span>
            </button>

            <button
              onClick={() => setActiveTab('gbp')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'gbp' 
                  ? 'bg-blue-500 text-white font-bold shadow-sm' 
                  : 'bg-stone-800/60 hover:bg-stone-800 text-blue-300'
              }`}
            >
              <FolderSync className="w-3.5 h-3.5" />
              <span>Google Business Profile Sync</span>
            </button>
          </div>

          <div className="relative min-w-[200px] w-full sm:w-auto">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'es' ? 'Buscar fotos, platos o tags...' : 'Search media, dishes or tags...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#B08D57]"
            />
          </div>
        </div>

        {/* Categories Chips Bar (when activeTab === 'categories') */}
        {activeTab === 'categories' && (
          <div className="px-6 py-2.5 bg-[#171412] border-b border-stone-800 flex items-center gap-2 overflow-x-auto text-[11px]">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-md transition-all shrink-0 ${
                selectedCategory === 'all' ? 'bg-[#B08D57] text-black font-bold' : 'bg-stone-800 text-stone-400'
              }`}
            >
              {language === 'es' ? 'Todas las Categorías' : 'All Categories'}
            </button>
            {MEDIA_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md transition-all shrink-0 ${
                  selectedCategory === cat ? 'bg-[#B08D57] text-black font-bold' : 'bg-stone-800 text-stone-300 hover:text-white'
                }`}
              >
                {cat} ({mediaList.filter(m => m.category === cat).length})
              </button>
            ))}
          </div>
        )}

        {/* Main Content Area */}
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Sub-view: Google Business Profile Sync Tab */}
          {activeTab === 'gbp' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-[#241F1B] rounded-2xl p-6 border border-[#B08D57]/30 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                      <FolderSync className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white">
                        Sincronización Oficial de Google Business Profile
                      </h3>
                      <p className="text-xs text-stone-300">
                        {language === 'es' 
                          ? 'Importa de forma autorizada fotografías oficiales aprobadas en la ficha de Google'
                          : 'Import verified official photos from your Google Business Profile'}
                      </p>
                    </div>
                  </div>

                  {!isGbpConnected ? (
                    <button
                      onClick={handleConnectGbp}
                      disabled={isGbpConnecting}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-2"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isGbpConnecting ? 'animate-spin' : ''}`} />
                      <span>{isGbpConnecting ? 'Conectando...' : 'Conectar Google Business'}</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Conectado: Asador La Cayena
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-xs space-y-2 text-stone-300">
                  <div className="flex items-center gap-2 font-semibold text-[#B08D57]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Flujo de Aprobación Seguro:</span>
                  </div>
                  <p>
                    {language === 'es'
                      ? 'Las fotos de Google Business NO se publican automáticamente en la web en vivo. Se importan a la zona de "Revisión Sugerida" para que el restaurante apruebe la calidad y asigne su ubicación web.'
                      : 'Google Business photos are NOT auto-published. They enter the "Review Recommended" staging area for owner approval and placement assignment.'}
                  </p>
                </div>

                {isGbpConnected && (
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={handleFetchGbpMedia}
                      disabled={gbpFetching}
                      className="px-5 py-2.5 rounded-xl bg-[#B08D57] hover:bg-[#997845] text-black font-bold text-xs transition-all flex items-center gap-2"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${gbpFetching ? 'animate-spin' : ''}`} />
                      <span>{gbpFetching ? 'Buscando fotos...' : 'Consultar Nuevas Fotos en Ficha'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Staged Items Ready to Import */}
              {stagedGbpItems.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-base text-[#F5F0E8]">
                    Fotos Encontradas en Google Business (Pendientes de Importar):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stagedGbpItems.map(item => (
                      <div key={item.id} className="bg-[#241F1B] rounded-xl p-4 border border-stone-800 space-y-3">
                        <img 
                          src={item.url} 
                          alt={item.altText} 
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="text-xs space-y-1">
                          <span className="font-semibold text-white block">{item.fileName}</span>
                          <span className="text-stone-400 block">{item.category} • {item.fileSize}</span>
                        </div>
                        <button
                          onClick={() => handleImportGbpItem(item)}
                          className="w-full py-2 rounded-lg bg-[#B52A2A] hover:bg-[#9c2424] text-white font-semibold text-xs transition-all"
                        >
                          Importar a Biblioteca para Revisión
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-view: Site Placements Manager */}
          {activeTab === 'placements' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-white">
                  {language === 'es' ? 'Asignación de Medios a Secciones Web' : 'Website Placements Overview'}
                </h3>
                <p className="text-xs text-stone-400">
                  {language === 'es' 
                    ? 'Supervisa qué fotografía o vídeo oficial se muestra actualmente en cada sección clave del Asador.' 
                    : 'Inspect which official media item is currently rendering on each section of the site.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PLACEMENT_OPTIONS.map(pl => {
                  const currentUrl = activePlacements[pl.id] || mediaList.find(m => m.active && m.usedIn?.includes(pl.id))?.url;
                  const currentMedia = mediaList.find(m => m.url === currentUrl);

                  return (
                    <div key={pl.id} className="bg-[#241F1B] rounded-2xl p-4 border border-stone-800 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-[#F5F0E8]">
                            {language === 'es' ? pl.labelEs : pl.labelEn}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] text-[#B08D57] font-semibold">
                            {pl.id}
                          </span>
                        </div>

                        <div className="h-44 rounded-xl overflow-hidden bg-black/40 border border-stone-800 relative group">
                          {currentUrl ? (
                            <img 
                              src={currentUrl} 
                              alt={pl.labelEs} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs">
                              {language === 'es' ? 'Sin imagen asignada' : 'No image assigned'}
                            </div>
                          )}

                          {currentMedia?.mediaType === 'video' && (
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold flex items-center gap-1">
                              <Film className="w-3 h-3 text-[#B08D57]" />
                              <span>{currentMedia.duration || 'VIDEO'}</span>
                            </div>
                          )}
                        </div>

                        {currentMedia && (
                          <div className="text-[11px] text-stone-400 truncate">
                            <span className="text-stone-300 font-semibold">{currentMedia.fileName}</span>
                            <span className="block text-[10px] text-stone-500">{currentMedia.category}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('all');
                          showToast(language === 'es' ? `Selecciona una foto para asignar a ${pl.labelEs}` : `Pick a photo to assign to ${pl.labelEn}`);
                        }}
                        className="w-full py-2 rounded-xl bg-stone-800 hover:bg-[#B08D57] hover:text-black text-stone-300 text-xs font-semibold transition-all border border-stone-700 flex items-center justify-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{language === 'es' ? 'Cambiar Imagen de Sección' : 'Swap Section Image'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sub-view: Media Grid (All, Review, Videos, Categories) */}
          {(activeTab === 'all' || activeTab === 'review' || activeTab === 'videos' || activeTab === 'categories') && (
            <div>
              {/* Quality Review Notice when on Review Tab */}
              {activeTab === 'review' && (
                <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 block text-sm">
                      {language === 'es' ? 'Área de Control de Calidad e Inspección IA' : 'AI Quality & Inspection Recommended Area'}
                    </span>
                    <p className="mt-1 text-amber-200/90 leading-relaxed">
                      {language === 'es'
                        ? 'La IA analiza resolución, desenfoques, duplicados o iluminación. Nada se borra automáticamente: puedes inspeccionar, aprobar con un clic para publicarlo o descartarlo.'
                        : 'AI flags low-resolution, blur, duplicates, or staging items. Nothing is auto-deleted: approve in one click to publish or discard.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Grid */}
              {filteredList.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <ImageIcon className="w-12 h-12 text-stone-600 mx-auto" />
                  <p className="text-sm text-stone-400">
                    {language === 'es' ? 'No se encontraron elementos en esta vista' : 'No media items found in this view'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredList.map(item => (
                    <div 
                      key={item.id}
                      className="bg-[#241F1B] rounded-2xl overflow-hidden border border-stone-800 hover:border-[#B08D57]/60 transition-all shadow-lg flex flex-col justify-between group"
                    >
                      {/* Media Preview Box */}
                      <div className="relative h-44 bg-black/40 overflow-hidden">
                        {item.mediaType === 'video' ? (
                          <div className="w-full h-full relative">
                            <img 
                              src={item.posterUrl || item.thumbnailUrl} 
                              alt={item.altText}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-[#B52A2A]/90 text-white flex items-center justify-center shadow-lg">
                                <Play className="w-4 h-4 ml-0.5" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold">
                              {item.duration || '0:35'}
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={item.thumbnailUrl || item.url} 
                            alt={item.altText} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}

                        {/* Top Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[#B08D57] text-[10px] font-bold">
                            {item.category}
                          </span>
                        </div>

                        {/* Quality & Review Badge */}
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          {item.qualityIssues && item.qualityIssues.length > 0 ? (
                            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-bold flex items-center gap-1 shadow-md">
                              <AlertTriangle className="w-3 h-3" />
                              <span>{item.qualityScore}%</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-bold shadow-md">
                              {item.qualityScore}% Score
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info & Metadata */}
                      <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs text-[#F5F0E8] truncate" title={item.fileName}>
                            {item.fileName}
                          </h4>
                          <p className="text-[11px] text-stone-400 line-clamp-2" title={item.altText}>
                            {item.altText}
                          </p>
                        </div>

                        {/* Placements Pill */}
                        <div className="pt-1 flex flex-wrap gap-1">
                          {item.usedIn && item.usedIn.length > 0 ? (
                            item.usedIn.map((pl, idx) => (
                              <span 
                                key={idx} 
                                className="px-1.5 py-0.5 rounded bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#B08D57] text-[9px] font-semibold"
                              >
                                {pl}
                              </span>
                            ))
                          ) : (
                            <span className="text-[10px] text-stone-500 italic">
                              {language === 'es' ? 'No asignado a portada' : 'Unassigned'}
                            </span>
                          )}
                        </div>

                        {/* Card Action Controls */}
                        <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-1">
                          <button
                            onClick={() => setSelectedMedia(item)}
                            className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-[#B08D57] hover:text-black text-stone-300 text-[11px] font-semibold transition-all flex items-center justify-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>{language === 'es' ? 'Inspeccionar' : 'Inspect'}</span>
                          </button>

                          {/* Quick Placement Dropdown */}
                          <div className="relative group/menu">
                            <button className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px]">
                              <SlidersHorizontal className="w-3.5 h-3.5" />
                            </button>
                            <div className="absolute right-0 bottom-full mb-1 hidden group-hover/menu:block w-48 bg-[#171412] border border-[#B08D57]/40 rounded-xl p-1.5 shadow-2xl z-30 text-[11px] space-y-1">
                              <span className="px-2 py-1 text-[10px] text-stone-500 font-bold uppercase block">
                                {language === 'es' ? 'Asignar a Sección:' : 'Assign to section:'}
                              </span>
                              {PLACEMENT_OPTIONS.slice(0, 5).map(opt => (
                                <button
                                  key={opt.id}
                                  onClick={() => {
                                    assignPlacement(opt.id, item);
                                    showToast(`${item.fileName} asignado a ${opt.labelEs}`);
                                  }}
                                  className="w-full text-left px-2 py-1 rounded hover:bg-[#B08D57] hover:text-black transition-colors"
                                >
                                  {opt.labelEs}
                                </button>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              deleteMediaItem(item.id);
                              showToast(language === 'es' ? 'Elemento eliminado' : 'Item removed');
                            }}
                            className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-red-900/60 text-stone-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info & Drag helper */}
        <div className="px-6 py-3 bg-[#151311] border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B08D57]" />
            <span>
              {language === 'es' 
                ? 'Arrastra fotos o vídeos aquí para procesarlos con IA.' 
                : 'Drag and drop photos or videos here for AI processing.'}
            </span>
          </div>
          <span className="text-stone-500">
            {mediaList.length} {language === 'es' ? 'elementos en biblioteca' : 'total items in library'}
          </span>
        </div>

      </div>

      {/* Detailed Media Inspector Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1E1B18] text-[#F5F0E8] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-[#B08D57]/40 flex flex-col overflow-hidden">
            
            <div className="px-6 py-3.5 border-b border-stone-800 flex items-center justify-between bg-[#151311]">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base text-white truncate max-w-md">
                  {selectedMedia.fileName}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#B08D57]/20 text-[#B08D57] text-xs font-semibold">
                  {selectedMedia.category}
                </span>
              </div>
              <button 
                onClick={() => setSelectedMedia(null)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Visual Media Box */}
              <div className="md:col-span-6 space-y-4">
                <div className="rounded-xl overflow-hidden bg-black/60 border border-stone-800 max-h-[360px] flex items-center justify-center">
                  {selectedMedia.mediaType === 'video' ? (
                    <video 
                      src={selectedMedia.url} 
                      controls 
                      muted 
                      className="w-full h-full max-h-[360px] object-cover"
                    />
                  ) : (
                    <img 
                      src={selectedMedia.url} 
                      alt={selectedMedia.altText} 
                      className="w-full h-full max-h-[360px] object-contain"
                    />
                  )}
                </div>

                <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800 text-xs grid grid-cols-2 gap-2 text-stone-300">
                  <div><strong className="text-stone-400">Resolución:</strong> {selectedMedia.width}x{selectedMedia.height}</div>
                  <div><strong className="text-stone-400">Tamaño:</strong> {selectedMedia.fileSize}</div>
                  <div><strong className="text-stone-400">Tipo:</strong> {selectedMedia.mediaType.toUpperCase()}</div>
                  <div><strong className="text-stone-400">Fecha:</strong> {selectedMedia.uploadDate}</div>
                </div>

                {/* AI Quality Report Box */}
                <div className="p-4 bg-[#241F1B] rounded-xl border border-[#B08D57]/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#B08D57] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Análisis de Calidad IA
                    </span>
                    <span className="font-bold px-2 py-0.5 rounded bg-[#B08D57] text-black">
                      {selectedMedia.qualityScore}%
                    </span>
                  </div>

                  {selectedMedia.qualityIssues && selectedMedia.qualityIssues.length > 0 ? (
                    <div className="space-y-1">
                      <span className="text-[11px] text-amber-300 font-semibold block">Observaciones detectadas:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedMedia.qualityIssues.map((iss, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-semibold">
                            {iss.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Resolución y balance de iluminación óptimos para la web.
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Placements & Metadata Editor */}
              <div className="md:col-span-6 space-y-4 text-xs">
                {/* One-click Placement Action */}
                <div className="p-4 bg-[#241F1B] rounded-xl border border-stone-800 space-y-3">
                  <span className="font-serif font-bold text-sm text-[#F5F0E8] block">
                    {language === 'es' ? 'Asignar a Sección Web' : 'Assign to Web Section'}
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {PLACEMENT_OPTIONS.map(pl => (
                      <button
                        key={pl.id}
                        onClick={() => {
                          assignPlacement(pl.id, selectedMedia);
                          showToast(`${selectedMedia.fileName} aplicado a ${pl.labelEs}`);
                        }}
                        className={`p-2 rounded-lg text-left transition-all border ${
                          selectedMedia.usedIn?.includes(pl.id)
                            ? 'bg-[#B08D57] text-black font-bold border-[#B08D57]'
                            : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700'
                        }`}
                      >
                        <span className="block truncate">{pl.labelEs}</span>
                      </button>
                    ))}
                  </div>

                  {/* Assign to Dish Selector */}
                  <div className="pt-2 border-t border-stone-800 space-y-1.5">
                    <label className="text-stone-400 font-semibold block">
                      {language === 'es' ? 'Asignar como foto de plato de la carta:' : 'Assign to menu dish:'}
                    </label>
                    <select
                      value={selectedMedia.suggestedDishId || ''}
                      onChange={(e) => {
                        const dishId = e.target.value;
                        if (dishId) {
                          assignDishImage(dishId, selectedMedia);
                          showToast(`Foto asignada al plato del menú`);
                        }
                      }}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#B08D57]"
                    >
                      <option value="">-- Seleccionar plato de la carta --</option>
                      {INITIAL_MENU_ITEMS.map(dish => (
                        <option key={dish.id} value={dish.id}>
                          {dish.name} ({dish.category}) - {dish.price}€
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Alt Text & SEO */}
                <div className="space-y-3">
                  <div>
                    <label className="text-stone-400 font-semibold block mb-1">
                      Alt Text SEO (Español):
                    </label>
                    <textarea
                      rows={2}
                      value={selectedMedia.altText}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedMedia(prev => prev ? { ...prev, altText: val } : null);
                        updateMediaItem(selectedMedia.id, { altText: val });
                      }}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div>
                    <label className="text-stone-400 font-semibold block mb-1">
                      Alt Text SEO (English):
                    </label>
                    <textarea
                      rows={2}
                      value={selectedMedia.altTextEn || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedMedia(prev => prev ? { ...prev, altTextEn: val } : null);
                        updateMediaItem(selectedMedia.id, { altTextEn: val });
                      }}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  {/* Category Selector */}
                  <div>
                    <label className="text-stone-400 font-semibold block mb-1">
                      Categoría:
                    </label>
                    <select
                      value={selectedMedia.category}
                      onChange={(e) => {
                        const val = e.target.value as MediaCategory;
                        setSelectedMedia(prev => prev ? { ...prev, category: val } : null);
                        updateMediaItem(selectedMedia.id, { category: val });
                      }}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#B08D57]"
                    >
                      {MEDIA_CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Approve & Close Buttons */}
                <div className="pt-4 flex items-center justify-between gap-3">
                  {selectedMedia.needsReview && (
                    <button
                      onClick={() => {
                        approveStagedMedia(selectedMedia.id);
                        setSelectedMedia(null);
                        showToast(language === 'es' ? 'Elemento aprobado para la web' : 'Item approved for live web');
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{language === 'es' ? 'Aprobar Calidad' : 'Approve Media'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedMedia(null)}
                    className="ml-auto px-5 py-2 rounded-xl bg-[#B08D57] hover:bg-[#997845] text-black font-bold text-xs"
                  >
                    {language === 'es' ? 'Guardar y Cerrar' : 'Save & Close'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
