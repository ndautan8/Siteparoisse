import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';

export const FloatingContactButton = () => {
  const location = useLocation();
  
  // Ne pas afficher sur la page d'accueil
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-3 sm:right-6 lg:right-10 z-40">
      <Link
        to="/secretariat"
        className="flex items-center justify-center bg-gold backdrop-blur-sm border-2 border-gold text-white hover:bg-gold-dark hover:border-gold-dark rounded-full w-12 h-12 sm:w-14 sm:h-14 font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        data-testid="floating-contact-button"
        title="Nous contacter"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
      </Link>
    </div>
  );
};
