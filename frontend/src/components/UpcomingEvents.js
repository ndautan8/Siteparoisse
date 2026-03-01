import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, X, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import LocationLink from '@/components/LocationLink';

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
  const [selectedEvent, setSelectedEvent] = useState(null);

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
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-md hover:border-gold/30 transition-all duration-300 flex gap-4 text-left cursor-pointer"
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
                  <h3 className="font-medium text-slate-900 leading-tight line-clamp-2 flex-1 break-words">
                    {event.title}
                  </h3>
                  <span className={`flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[event.category] || 'bg-slate-100 text-slate-600'}`}>
                    {event.category}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 break-words overflow-wrap-anywhere">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.time}{event.end_time ? ` - ${event.end_time}` : ''}
                  </span>
                  <span className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <LocationLink location={event.location} iconClassName="w-3 h-3" showIcon={true} className="text-xs" />
                  </span>
                </div>
                <div className="flex justify-end mt-2">
                  <span
                    className="inline-flex items-center gap-1 text-xs font-medium text-gold hover:text-gold-dark transition-all duration-300 group/btn"
                  >
                    <span className="group-hover/btn:font-bold transition-all duration-300">Détails</span>
                    <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/agenda"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:border-gold hover:text-gold transition-all duration-300 text-sm font-medium"
            data-testid="see-all-events-link"
          >
            <Calendar className="w-4 h-4" />
            <span>Voir tout l'agenda</span>
          </Link>
        </div>
      </div>

      {/* Event Detail Modal - Portal to body to avoid stacking context issues */}
      {selectedEvent && createPortal(
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center px-4 pt-20 pb-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] p-5 text-white relative">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/20 mb-2`}>
                {selectedEvent.category}
              </span>
              <h3 className="font-serif text-xl font-semibold leading-tight">
                {selectedEvent.title}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto overflow-x-hidden max-h-[50vh]">
              {/* Date & Time */}
              <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="capitalize">
                    {format(parseISO(selectedEvent.date), 'EEEE d MMMM yyyy', { locale: fr })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>{selectedEvent.time}{selectedEvent.end_time ? ` - ${selectedEvent.end_time}` : ''}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <LocationLink location={selectedEvent.location} iconClassName="w-4 h-4 text-gold" showIcon={true} />
                </div>
              </div>

              {/* Description */}
              {selectedEvent.description ? (
                <div className="text-slate-600 leading-relaxed prose prose-sm max-w-none break-words"
                  dangerouslySetInnerHTML={{ __html: selectedEvent.description.replace(/&nbsp;/g, ' ') }}
                />
              ) : (
                <p className="text-slate-400 italic text-sm">Pas de description disponible.</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-between items-center">
              <Link
                to="/agenda"
                className="text-sm text-gold hover:text-gold-dark font-medium transition-colors"
                onClick={() => setSelectedEvent(null)}
              >
                Voir tout l'agenda →
              </Link>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full text-sm font-medium transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
