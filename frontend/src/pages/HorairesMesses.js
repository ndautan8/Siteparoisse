import { useEffect, useState } from 'react';
import { Clock, MapPin, Bell } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const HorairesMesses = () => {
  const [massTimes, setMassTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMassTimes();
  }, []);

  const fetchMassTimes = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/mass-times`);
      setMassTimes(response.data);
    } catch (error) {
      console.error('Error fetching mass times:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper" data-testid="mass-times-page">
      {/* Hero Section with Image */}
      <div className="relative h-[55vh] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <img
          src="https://customer-assets.emergentagent.com/job_5166d458-aa97-495f-97c0-2fdcfaf2d885/artifacts/dzqa5mxr_Horaires-messes.png"
          alt="Horaires des Messes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center shadow-xl backdrop-blur-sm">
                <Bell className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-tight text-white mb-4" data-testid="page-title">
              Horaires des Messes
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-white/90 max-w-2xl mx-auto">
              Venez rejoindre notre communauté pour célébrer l'eucharistie
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {loading ? (
          <p className="text-center text-slate-500">Chargement...</p>
        ) : massTimes.length === 0 ? (
          <div className="text-center bg-white rounded-xl p-12 shadow-sm">
            <p className="text-slate-500" data-testid="no-mass-times">Les horaires des messes seront bientôt disponibles.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {massTimes.map((mass) => (
              <div
                key={mass.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                data-testid={`mass-time-${mass.id}`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-serif text-2xl text-slate-deep mb-2">{mass.day}</h3>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{mass.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end space-y-1">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{mass.location}</span>
                    </div>
                    <span className="text-sm text-gold font-medium">{mass.mass_type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HorairesMesses;