import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const Hero = () => {
  const [showJeVeuxMenu, setShowJeVeuxMenu] = useState(false);

  const jeVeuxOptions = [
    { label: 'Aller à la messe', path: '/horaires-messes' },
    { label: 'Demander le baptême', path: '/demander-sacrement' },
    { label: 'Recevoir la confirmation', path: '/demander-sacrement' },
    { label: 'Faire ma première communion', path: '/demander-sacrement' },
    { label: 'Rejoindre Alpha', path: '/alpha-catechumenat' },
    { label: 'Rejoindre un petit groupe', path: '/groupes-partage' },
    { label: 'Servir dans la paroisse', path: '/servants-vocations' },
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center" data-testid="hero-section">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://customer-assets.emergentagent.com/job_c3efae68-56d0-4924-8ecf-4f7502ce3630/artifacts/54f2vm3r_Eglise-Castanet-Tolosan.jpg"
          alt="Église Notre Dame d'Autan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-tight mb-6" data-testid="hero-title">
          Bienvenue à<br />
          Notre Dame d'Autan
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed" data-testid="hero-subtitle">
          Une communauté paroissiale vivante et accueillante,
          <br className="hidden sm:block" />
          au service de la foi et de la fraternité.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            to="/secretariat"
            className="bg-white border-2 border-white text-slate-700 hover:bg-slate-50 rounded-full px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            data-testid="contact-button"
          >
            Nous contacter
          </Link>
          <Link
            to="/demander-sacrement"
            className="bg-gold border-2 border-gold hover:bg-gold-dark hover:border-gold-dark text-white rounded-full px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            data-testid="hero-sacrement-button"
          >
            Demander un sacrement
          </Link>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
          {/* Je veux - Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowJeVeuxMenu(!showJeVeuxMenu)}
              className="bg-white/90 backdrop-blur-sm border-2 border-white text-slate-700 hover:bg-white rounded-full px-6 py-2.5 font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg"
              data-testid="je-veux-button"
            >
              <span>Je veux...</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showJeVeuxMenu ? 'rotate-180' : ''}`} />
            </button>

            {showJeVeuxMenu && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50">
                {jeVeuxOptions.map((option) => (
                  <Link
                    key={option.path + option.label}
                    to={option.path}
                    className="block px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-gold transition-colors text-left"
                    onClick={() => setShowJeVeuxMenu(false)}
                    data-testid={`je-veux-${option.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Je suis nouveau */}
          <Link
            to="/equipe-pastorale"
            className="bg-white/90 backdrop-blur-sm border-2 border-white text-slate-700 hover:bg-white rounded-full px-6 py-2.5 font-medium transition-all duration-300 shadow-lg"
            data-testid="nouveau-button"
          >
            Je suis nouveau
          </Link>

          {/* Don */}
          <Link
            to="/vie-economique"
            className="bg-gold/90 backdrop-blur-sm border-2 border-gold text-white hover:bg-gold rounded-full px-6 py-2.5 font-medium transition-all duration-300 shadow-lg"
            data-testid="don-button"
          >
            Faire un don
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  );
};