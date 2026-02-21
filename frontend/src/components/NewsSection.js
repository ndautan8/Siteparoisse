import { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/news?published_only=true`);
      setNews(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-white" data-testid="news-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500">Chargement...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white" data-testid="news-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-slate-deep mb-4" data-testid="news-title">
            Actualités
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Découvrez les dernières nouvelles de notre communauté paroissiale
          </p>
        </div>

        {news.length === 0 ? (
          <p className="text-center text-slate-500" data-testid="no-news">Aucune actualité pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
                data-testid={`news-card-${item.id}`}
              >
                {item.image_url && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.created_at)}</span>
                    {item.category && (
                      <>
                        <span>•</span>
                        <span className="text-gold font-medium">{item.category}</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl text-slate-deep mb-3 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 line-clamp-3 mb-4">{item.content}</p>
                  <button className="flex items-center space-x-2 text-gold hover:text-gold-dark font-medium transition-colors">
                    <span>Lire la suite</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};