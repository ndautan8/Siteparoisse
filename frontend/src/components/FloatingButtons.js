import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

export const FloatingButtons = () => {

  return (
    <div className="hidden lg:flex fixed top-24 right-8 z-40 flex-row items-center gap-4">
      {/* Contact button */}
      <Link
        to="/secretariat"
        className="flex items-center justify-center bg-gold backdrop-blur-sm border-2 border-gold text-white hover:bg-gold-dark hover:border-gold-dark rounded-full w-12 h-12 font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        data-testid="floating-contact-button"
        title="Nous contacter"
      >
        <Phone className="w-5 h-5" />
      </Link>
      
      {/* Donate button - always visible */}
      <Link
        to="/vie-economique"
        className="flex items-center gap-2 bg-gold backdrop-blur-sm border-2 border-gold text-white hover:bg-gold-dark hover:border-gold-dark rounded-full px-6 py-2.5 font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        data-testid="floating-don-button"
      >
        <span>Faire un don</span>
      </Link>
    </div>
  );
};
