import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  Calendar, 
  ArrowRight, 
  Tag, 
  Flame, 
  Beer, 
  Cake, 
  Pizza, 
  MapPin, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Share2
} from 'lucide-react';
import { handleImageError } from '../utils/imageFallbacks';

export const BlogPage: React.FC = () => {
  const { language, navigateTo, setSelectedBlogPostSlug } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelEs: 'Todos los Artículos', labelEn: 'All Articles', icon: BookOpen },
    { id: 'carnes-josper', labelEs: 'Carnes & Horno Josper', labelEn: 'Meats & Josper Grill', icon: Flame },
    { id: 'guia-granada', labelEs: 'Guía de Granada & La Zubia', labelEn: 'Granada & La Zubia Guide', icon: MapPin },
    { id: 'cervezas-maridaje', labelEs: 'Cervezas & Maridajes', labelEn: 'Beers & Pairings', icon: Beer },
    { id: 'pizzas-artesanas', labelEs: 'Pizzas Artesanales', labelEn: 'Artisan Pizzas', icon: Pizza },
    { id: 'postres-artemisa', labelEs: 'Postres & Artemisa', labelEn: 'Desserts & Artemisa', icon: Cake },
    { id: 'eventos-celebraciones', labelEs: 'Eventos & Celebraciones', labelEn: 'Events & Parties', icon: Sparkles },
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      if (selectedCategory !== 'all' && post.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (post.titleEs.toLowerCase().includes(q) || post.titleEn.toLowerCase().includes(q));
        const excerptMatch = (post.excerptEs.toLowerCase().includes(q) || post.excerptEn.toLowerCase().includes(q));
        const keywordMatch = post.keywords.some(k => k.toLowerCase().includes(q));
        const tagMatch = post.tags.some(t => t.toLowerCase().includes(q));
        return titleMatch || excerptMatch || keywordMatch || tagMatch;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  const handlePostClick = (slug: string) => {
    if (setSelectedBlogPostSlug) {
      setSelectedBlogPostSlug(slug);
    }
    navigateTo('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="blog-page-root" className="min-h-screen bg-[#FDFBF7] text-[#1E1B18] pt-28 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B52A2A]/10 border border-[#B52A2A]/30 text-[#B52A2A] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Blog Gastronómico & Guía de La Zubia' : 'Culinary Blog & Granada Guide'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1E1B18] leading-tight">
            {language === 'es' ? (
              <>
                Secretos del Fuego, <span className="text-[#B52A2A]">Horno Josper</span> y Sabores de Granada
              </>
            ) : (
              <>
                Secrets of the Fire, <span className="text-[#B52A2A]">Josper Grill</span> & Granada Gastronomy
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {language === 'es'
              ? 'Artículos, guías gastronómicas, maridajes de cervezas y vinos, rutas por Sierra Nevada y los secretos de nuestras carnes a la brasa en La Zubia.'
              : 'Culinary guides, beer and wine pairings, hiking routes around Sierra Nevada, and the craft behind our charcoal-grilled meats in La Zubia.'}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-10 space-y-4">
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'es' ? 'Buscar artículos (chuletón, Josper, cervezas, rutas, tartas...)' : 'Search articles (dry aged, Josper, craft beer, hiking, cakes...)'}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#B52A2A] focus:border-transparent text-sm shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-700"
              >
                {language === 'es' ? 'Borrar' : 'Clear'}
              </button>
            )}
          </div>

          {/* Categories Pill Scroller */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 px-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'bg-[#1E1B18] text-white shadow-md'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-xs'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B08D57]' : 'text-stone-500'}`} />
                  <span>{language === 'es' ? cat.labelEs : cat.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Featured Hero Article (shown when no search filter active) */}
        {!searchQuery && selectedCategory === 'all' && (
          <div 
            onClick={() => handlePostClick(featuredPost.slug)}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-full relative overflow-hidden bg-stone-900">
              <img
                src={featuredPost.coverImage}
                alt={language === 'es' ? featuredPost.titleEs : featuredPost.titleEn}
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, 'meats')}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#B52A2A] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                  {language === 'es' ? 'Artículo Destacado' : 'Featured Article'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span className="font-bold text-[#B08D57] uppercase tracking-wider">
                    {language === 'es' ? featuredPost.categoryLabelEs : featuredPost.categoryLabelEn}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredPost.readingTimeMinutes} min {language === 'es' ? 'lectura' : 'read'}</span>
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1E1B18] group-hover:text-[#B52A2A] transition-colors leading-tight">
                  {language === 'es' ? featuredPost.titleEs : featuredPost.titleEn}
                </h2>

                <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                  {language === 'es' ? featuredPost.excerptEs : featuredPost.excerptEn}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  <span>{featuredPost.author}</span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B52A2A] group-hover:translate-x-1 transition-transform">
                  <span>{language === 'es' ? 'Leer artículo completo' : 'Read full article'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1B18] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#B52A2A]" />
              <span>
                {selectedCategory === 'all' 
                  ? (language === 'es' ? 'Todos los Artículos y Guías' : 'All Articles & Guides')
                  : (language === 'es' ? `Artículos de ${categories.find(c => c.id === selectedCategory)?.labelEs}` : `${categories.find(c => c.id === selectedCategory)?.labelEn} Articles`)}
              </span>
            </h2>
            <span className="text-xs font-semibold text-stone-500">
              {filteredPosts.length} {language === 'es' ? 'publicaciones' : 'posts'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const title = language === 'es' ? post.titleEs : post.titleEn;
              const excerpt = language === 'es' ? post.excerptEs : post.excerptEn;
              const catLabel = language === 'es' ? post.categoryLabelEs : post.categoryLabelEn;

              return (
                <article
                  key={post.id}
                  onClick={() => handlePostClick(post.slug)}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Cover image */}
                    <div className="h-52 w-full overflow-hidden bg-stone-100 relative">
                      <img
                        src={post.coverImage}
                        alt={title}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, 'meats')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[#1E1B18]/85 text-[#F5F0E8] text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                          {catLabel}
                        </span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{post.publishedDate}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{post.readingTimeMinutes} min</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg font-bold text-[#1E1B18] group-hover:text-[#B52A2A] transition-colors leading-snug line-clamp-2">
                        {title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                        {excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[10px] font-medium bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md"
                          >
                            <Tag className="w-2.5 h-2.5 text-stone-400" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Read More Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 font-medium truncate max-w-[150px]">
                      {post.author}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#B52A2A] group-hover:translate-x-1 transition-transform">
                      <span>{language === 'es' ? 'Leer más' : 'Read more'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="py-16 text-center space-y-4 bg-white rounded-3xl p-8 border border-stone-200">
            <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-800">
              {language === 'es' ? 'No se encontraron artículos' : 'No articles found'}
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {language === 'es'
                ? 'Prueba con otros términos de búsqueda como "Josper", "carne", "cervezas" o "La Zubia".'
                : 'Try searching with other terms such as "Josper", "steaks", "beers" or "La Zubia".'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="py-2.5 px-5 rounded-xl bg-[#1E1B18] text-white text-xs font-bold hover:bg-[#B52A2A] transition-colors"
            >
              {language === 'es' ? 'Ver todos los artículos' : 'View all articles'}
            </button>
          </div>
        )}

        {/* Bottom CTA Banner (Reservations & Pre-Orders) */}
        <section className="bg-[#1E1B18] rounded-3xl p-8 sm:p-12 text-white border border-[#B08D57]/40 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B08D57]">
              {language === 'es' ? 'ASADOR LA CAYENA • LA ZUBIA, GRANADA' : 'ASADOR LA CAYENA • LA ZUBIA, GRANADA'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F0E8]">
              {language === 'es' ? '¿Listo para Probar el Auténtico Fuego del Horno Josper?' : 'Ready to Experience True Josper Charcoal Mastery?'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              {language === 'es'
                ? 'Reserva tu mesa en nuestro salón con chimenea o en nuestra terraza climatizada a solo 10 minutos de Granada.'
                : 'Book your table in our cozy fireplace room or climate-controlled terrace just 10 minutes from Granada.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('reservations')}
              className="px-6 py-3 rounded-xl bg-[#B52A2A] hover:bg-[#962222] text-white text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95"
            >
              {language === 'es' ? 'Reservar Mesa Ahora' : 'Book a Table Now'}
            </button>
            <button
              onClick={() => navigateTo('menu')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold transition-all"
            >
              {language === 'es' ? 'Ver Carta & Pre-Pedido' : 'View Menu & Pre-Order'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
