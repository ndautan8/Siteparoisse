import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Filter } from 'lucide-react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CATEGORIES = [
  { value: '', label: 'Tous' },
  { value: 'Liturgie', label: 'Liturgie' },
  { value: 'Communauté', label: 'Communauté' },
  { value: 'Jeunesse', label: 'Jeunesse' },
  { value: 'Solidarité', label: 'Solidarité' },
  { value: 'Formation', label: 'Formation' },
];

const CATEGORY_COLORS = {
  Liturgie: 'bg-violet-100 text-violet-700',
  Communauté: 'bg-amber-100 text-amber-700',
  Jeunesse: 'bg-sky-100 text-sky-700',
  Solidarité: 'bg-rose-100 text-rose-700',
  Formation: 'bg-emerald-100 text-emerald-700',
};

const AgendaPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    fetchEvents();
  }, [activeCategory]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory) params.append('category', activeCategory);
      const res = await axios.get(`${BACKEND_URL}/api/events?${params}`);
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatEventDate = (dateStr) => {
    try {
      return format(parseISO(dateStr), "EEEE d MMMM yyyy", { locale: fr });
    } catch {
      return dateStr;
    }
  };

  // Group events by month
  const groupedEvents = events.reduce((acc, event) => {
    const monthKey = format(parseISO(event.date), 'MMMM yyyy', { locale: fr });
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(event);
    return acc;
  }, {});

  return (
    <div data-testid="agenda-page">
      <SEO
        title="Agenda"
        description="Agenda de la paroisse Notre Dame d'Autan. Retrouvez tous les événements, messes spéciales, temps forts et activités de la communauté."
      />

      {/* Hero */}
      <section className="relative h-[40vh] md:h-[45vh] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-[#d0ada6]/30 via-slate-900 to-slate-900"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4" data-testid="agenda-title">
            Agenda paroissial
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Les prochains événements de notre communauté
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <FadeIn>
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2" data-testid="agenda-filters">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                data-testid={`filter-${cat.value || 'all'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Events List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : events.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20" data-testid="no-events">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Aucun événement à venir pour le moment.</p>
              <p className="text-slate-400 text-sm mt-2">Revenez bientôt pour découvrir nos prochains temps forts !</p>
            </div>
          </FadeIn>
        ) : (
          Object.entries(groupedEvents).map(([month, monthEvents]) => (
            <FadeIn key={month}>
              <div className="mb-10">
                <h2 className="font-serif text-2xl text-slate-deep capitalize mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-gold rounded-full"></span>
                  {month}
                </h2>
                <div className="space-y-4">
                  {monthEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-md transition-shadow duration-300 flex gap-5"
                      data-testid={`event-card-${event.id}`}
                    >
                      {/* Date badge */}
                      <div className="flex-shrink-0 w-14 text-center">
                        <div className="text-3xl font-bold text-gold leading-none">
                          {format(parseISO(event.date), 'd')}
                        </div>
                        <div className="text-xs text-slate-500 uppercase mt-1">
                          {format(parseISO(event.date), 'MMM', { locale: fr })}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h3 className="font-medium text-slate-900 text-lg leading-tight">
                            {event.title}
                          </h3>
                          <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[event.category] || 'bg-slate-100 text-slate-600'}`}>
                            {event.category}
                          </span>
                        </div>
                        {event.description && (
                          <p className="text-slate-600 text-sm leading-relaxed mb-2">
                            {event.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {event.time}{event.end_time ? ` - ${event.end_time}` : ''}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatEventDate(event.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))
        )}
      </div>
    </div>
  );
};

export default AgendaPage;
