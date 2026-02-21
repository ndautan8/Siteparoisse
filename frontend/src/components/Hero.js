import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/secretariat"
            className="bg-white text-slate-700 hover:bg-slate-50 rounded-full px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            data-testid="contact-button"
          >
            Nous contacter
          </Link>
          <Link
            to="/horaires-messes"
            className="bg-gold hover:bg-gold-dark text-white rounded-full px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            data-testid="hero-mass-times-button"
          >
            Voir les horaires
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