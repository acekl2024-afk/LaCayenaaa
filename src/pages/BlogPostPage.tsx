import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS } from '../data/blogData';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { BlogPost } from '../types';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  Check, 
  Flame, 
  Tag, 
  HelpCircle, 
  BookOpen, 
  ChevronRight, 
  Phone, 
  MapPin, 
  UtensilsCrossed, 
  MessageSquare
} from 'lucide-react';
import { handleImageError } from '../utils/imageFallbacks';

export const BlogPostPage: React.FC = () => {
  const { language, navigateTo, selectedBlogPostSlug, setSelectedBlogPostSlug } = useApp();
  const [copied, setCopied] = useState<boolean>(false);

  const currentSlug = selectedBlogPostSlug || BLOG_POSTS[0].slug;
  const post = BLOG_POSTS.find((p) => p.slug === currentSlug) || BLOG_POSTS[0];

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t)))).slice(0, 3);

  const title = language === 'es' ? post.titleEs : post.titleEn;
  const content = language === 'es' ? post.contentEs : post.contentEn;
  const excerpt = language === 'es' ? post.excerptEs : post.excerptEn;
  const categoryLabel = language === 'es' ? post.categoryLabelEs : post.categoryLabelEn;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`${title} - Asador La Cayena: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleRelatedClick = (slug: string) => {
    if (setSelectedBlogPostSlug) {
      setSelectedBlogPostSlug(slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="blog-post-page-root" className="min-h-screen bg-[#FDFBF7] text-[#1E1B18] pt-28 pb-20">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
        <button
          onClick={() => navigateTo('blog')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#B52A2A] hover:text-[#8B2500] transition-colors py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'es' ? 'Volver a todos los artículos' : 'Back to all articles'}</span>
        </button>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Area */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#B52A2A]/15 text-[#B52A2A] text-xs font-bold uppercase tracking-wider">
              {categoryLabel}
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{post.publishedDate}</span>
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{post.readingTimeMinutes} min {language === 'es' ? 'de lectura' : 'read'}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B18] tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-serif italic border-l-4 border-[#B08D57] pl-4 py-1">
            {excerpt}
          </p>

          {/* Author info and share buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-stone-200/80 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E1B18] text-[#F5F0E8] flex items-center justify-center font-bold text-sm">
                <Flame className="w-5 h-5 text-[#B08D57]" />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm text-stone-900 block">{post.author}</span>
                <span className="text-[11px] text-stone-500">{post.authorRole} • Asador La Cayena</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={shareViaWhatsApp}
                className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Compartir por WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Compartir enlace"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? (language === 'es' ? '¡Copiado!' : 'Copied!') : (language === 'es' ? 'Compartir' : 'Share')}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-10 border border-stone-200 bg-stone-900 max-h-[480px]">
          <img
            src={post.coverImage}
            alt={title}
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e, 'meats')}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-md space-y-6 text-stone-800 leading-relaxed">
          {content.split('\n\n').map((block, idx) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            // Heading 1
            if (trimmed.startsWith('# ')) {
              return (
                <h1 key={idx} className="font-serif text-2xl sm:text-3xl font-black text-[#1E1B18] pt-4 pb-2 border-b border-stone-100">
                  {trimmed.replace('# ', '')}
                </h1>
              );
            }

            // Heading 2
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-[#1E1B18] pt-6 pb-2 text-[#B52A2A]">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            // Heading 3
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-serif text-lg font-bold text-[#2A2421] pt-3 pb-1">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            // Horizontal Divider
            if (trimmed === '---') {
              return <hr key={idx} className="border-stone-200 my-6" />;
            }

            // Bullet list item
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              const items = trimmed.split('\n').map(line => line.replace(/^[-*]\s+/, ''));
              return (
                <ul key={idx} className="space-y-2 my-4 pl-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-stone-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B52A2A] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            // Standard Paragraph
            return (
              <p key={idx} className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                {trimmed}
              </p>
            );
          })}

          {/* FAQ Section if defined */}
          {post.faq && post.faq.length > 0 && (
            <div className="mt-10 pt-8 border-t border-stone-200 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#1E1B18] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#B08D57]" />
                <span>{language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}</span>
              </h3>

              <div className="space-y-3">
                {post.faq.map((item, fIdx) => (
                  <div key={fIdx} className="bg-[#FAF6F0] rounded-2xl p-4 sm:p-5 border border-[#E8DFC8]">
                    <h4 className="font-bold text-sm text-[#1E1B18] mb-1.5">
                      {language === 'es' ? item.questionEs : item.questionEn}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {language === 'es' ? item.answerEs : item.answerEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Keywords & Tags Cloud */}
          <div className="mt-8 pt-6 border-t border-stone-100">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
              {language === 'es' ? 'Palabras Clave & Categorías Relacionadas:' : 'Keywords & Related Tags:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((kw, kIdx) => (
                <span
                  key={kIdx}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 text-xs font-medium"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Restaurant Contact & Reservation Box */}
        <div className="mt-10 bg-[#1E1B18] rounded-3xl p-6 sm:p-8 text-white border border-[#B08D57]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B08D57]">
              {language === 'es' ? 'Ven a Probarlo en Persona' : 'Taste It in Person'}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F0E8]">
              {language === 'es' ? 'Reserva Tu Mesa en Asador La Cayena' : 'Book Your Table at Asador La Cayena'}
            </h3>
            <p className="text-xs text-stone-300 flex items-center justify-center sm:justify-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>{RESTAURANT_INFO.address}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('reservations')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#B52A2A] hover:bg-[#962222] text-white text-xs font-bold shadow-md transition-all text-center"
            >
              {language === 'es' ? 'Reservar Mesa' : 'Book a Table'}
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Related Articles Carousel */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1B18] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#B52A2A]" />
              <span>{language === 'es' ? 'Artículos Relacionados que Podrían Interesarte' : 'Related Articles You Might Enjoy'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => {
                const relTitle = language === 'es' ? rel.titleEs : rel.titleEn;
                const relCat = language === 'es' ? rel.categoryLabelEs : rel.categoryLabelEn;
                return (
                  <div
                    key={rel.id}
                    onClick={() => handleRelatedClick(rel.slug)}
                    className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-36 overflow-hidden bg-stone-100">
                        <img
                          src={rel.coverImage}
                          alt={relTitle}
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageError(e, 'meats')}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-bold text-[#B08D57] uppercase tracking-wider block">
                          {relCat}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#1E1B18] group-hover:text-[#B52A2A] transition-colors leading-snug line-clamp-2">
                          {relTitle}
                        </h4>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs text-[#B52A2A] font-bold">
                      <span>{language === 'es' ? 'Leer' : 'Read'}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
