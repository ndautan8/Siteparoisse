import { Link } from 'react-router-dom';

export const FloatingDonateButton = () => {
  return (
    <div className="fixed top-24 right-3 sm:right-6 lg:right-10 z-40">
      <Link
        to="/vie-economique"
        className="flex items-center gap-2 bg-gold backdrop-blur-sm border-2 border-gold text-white hover:bg-gold-dark hover:border-gold-dark rounded-full px-4 sm:px-6 py-2 sm:py-2.5 font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
        data-testid="floating-don-button"
      >
        <span>Faire un don</span>
      </Link>
    </div>
  );
};
