import { useEffect, useState, useCallback } from 'react';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    if (news.length <= 3 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (news.length - 2));
    }, 4000);

    return () => clearInterval(interval);
  }, [news.length, isHovered]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/news?published_only=true`);
      setNews(response.data.slice(0, 9));
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  };

  const nextSlide = useCallback(() => {
    if (news.length <= 3) return;
    setCurrentIndex((prev) => (prev + 1) % (news.length - 2));
  }, [news.length]);

  const prevSlide = useCallback(() => {
    if (news.length <= 3) return;
    setCurrentIndex((prev) => (prev - 1 + (news.length - 2)) % (news.length - 2));
  }, [news.length]);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-slate-50" data-testid="news-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="w-12 h-12 bg-gold/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white via-white to-slate-50/50 overflow-hidden" data-testid="news-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-gold font-medium text-sm tracking-widest uppercase mb-3">
            Notre communauté
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-slate-deep mb-4" data-testid="news-title">
            Actualités
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mb-5"></div>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Découvrez les dernières nouvelles de notre communauté paroissiale
          </p>
        </div>

        {news.length === 0 ? (
          <p className="text-center text-slate-500" data-testid="no-news">Aucune actualité pour le moment.</p>
        ) : (
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Carousel Container */}
            <div className="overflow-hidden px-2">
              <div 
                className="flex transition-transform duration-700 ease-out gap-6"
                style={{ transform: `translateX(-${currentIndex * (100 / 3 + 2)}%)` }}
              >
                {news.map((item) => (
                  <article
                    key={item.id}
                    className="w-full md:w-[calc(33.333%-16px)] flex-shrink-0 group"
                    data-testid={`news-card-${item.id}`}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-slate-100/80">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                            <span className="font-serif text-5xl text-gold/30">N</span>
                          </div>
                        )}
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Category Badge */}
                        {item.category && (
                          <div className="absolute top-3 left-3">
                            <span className="inline-block bg-gold/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                              {item.category}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        {/* Date */}
                        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-3">
                          <Calendar className="w-3.5 h-3.5 text-gold" />
                          <span>{formatDate(item.created_at)}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl text-slate-deep mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Content Preview */}
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                          {item.content}
                        </p>

                        {/* CTA Button */}
                        <button className="inline-flex items-center space-x-2 text-gold hover:text-gold-dark text-sm font-medium transition-all duration-300 group/btn mt-auto">
                          <span>Lire la suite</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {news.length > 3 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-gold hover:shadow-xl transition-all duration-300 z-10 border border-slate-100"
                  aria-label="Actualité précédente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-gold hover:shadow-xl transition-all duration-300 z-10 border border-slate-100"
                  aria-label="Actualité suivante"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {news.length > 3 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                {Array.from({ length: Math.max(1, news.length - 2) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'w-8 h-2 bg-gold'
                        : 'w-2 h-2 bg-slate-300 hover:bg-gold/50'
                    }`}
                    aria-label={`Aller au groupe ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Auto-play indicator */}
            {news.length > 3 && !isHovered && (
              <div className="flex justify-center mt-4">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></div>
                  <span>Défilement automatique</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
