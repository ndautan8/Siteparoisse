import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CATEGORY_COLORS = {
  Liturgie: 'bg-violet-100 text-violet-700',
  Communauté: 'bg-amber-100 text-amber-700',
  Jeunesse: 'bg-sky-100 text-sky-700',
  Solidarité: 'bg-rose-100 text-rose-700',
  Formation: 'bg-emerald-100 text-emerald-700',
};

export const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/events`);
        setEvents(res.data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return null;
  if (events.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50/50" data-testid="upcoming-events-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-gold font-medium text-sm tracking-widest uppercase mb-3">
            A venir
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-deep mb-4" data-testid="upcoming-events-title">
            Prochains événements
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-md transition-shadow duration-300 flex gap-4"
              data-testid={`upcoming-event-${event.id}`}
            >
              {/* Date badge */}
              <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gold/10 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-gold leading-none">
                  {format(parseISO(event.date), 'd')}
                </span>
                <span className="text-[10px] text-gold/70 uppercase font-medium">
                  {format(parseISO(event.date), 'MMM', { locale: fr })}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1">
                  <h3 className="font-medium text-slate-900 leading-tight line-clamp-1 flex-1">
                    {event.title}
                  </h3>
                  <span className={`flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[event.category] || 'bg-slate-100 text-slate-600'}`}>
                    {event.category}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/agenda"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-medium transition-colors group"
            data-testid="see-all-events-link"
          >
            <span>Voir tout l'agenda</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
