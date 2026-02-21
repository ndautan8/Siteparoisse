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

      {/* Don Button - Top Right */}
      <div className="absolute top-4 sm:top-6 right-3 sm:right-6 lg:right-10 xl:right-16 z-20">
        <Link
          to="/vie-economique"
          className="bg-gold backdrop-blur-sm border-2 border-gold text-white hover:bg-gold-dark hover:border-gold-dark rounded-full px-4 sm:px-6 py-2 sm:py-2.5 font-medium transition-all duration-300 shadow-lg text-sm sm:text-base"
          data-testid="don-button"
        >
          Faire un don
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-16 sm:pt-20">
        <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-tight mb-6" data-testid="hero-title">
          Bienvenue à<br />
          Notre Dame d'Autan
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed" data-testid="hero-subtitle">
          Une communauté paroissiale vivante et accueillante,
          <br className="hidden sm:block" />
          au service de la foi et de la fraternité.
        </p>

        {/* Primary Actions - En bas */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/secretariat"
            className="bg-white border-2 border-white text-slate-700 hover:bg-slate-50 rounded-full px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            data-testid="contact-button"
          >
            Nous contacter
          </Link>
          <Link
            to="/je-suis-nouveau"
            className="bg-gold border-2 border-gold hover:bg-gold-dark hover:border-gold-dark text-white rounded-full px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            data-testid="hero-nouveau-button"
          >
            Je suis nouveau
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