import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Cross } from 'lucide-react';

const FuneralsAgenda = () => {
  const [funerals, setFunerals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFunerals = async () => {
      try {
        const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${backendUrl}/api/funerals`);
        if (response.ok) {
          const data = await response.json();
          setFunerals(data);
        }
      } catch (error) {
        console.error('Error fetching funerals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFunerals();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 text-center">
        <p className="text-slate-500">Chargement de l'agenda...</p>
      </div>
    );
  }

  if (funerals.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 text-center">
        <Cross className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500">Aucune cérémonie prévue pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {funerals.map((funeral) => (
        <div
          key={funeral.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-serif text-xl text-slate-deep mb-3 flex items-center gap-2">
                <Cross className="w-5 h-5 text-gold" />
                {funeral.deceased_name}
              </h3>
              
              <div className="space-y-2 text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{formatDate(funeral.funeral_date)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{funeral.funeral_time}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{funeral.location}</span>
                </div>
              </div>
            </div>
            
            <div className="md:text-right">
              <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium">
                {funeral.ceremony_type}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FuneralsAgenda;
