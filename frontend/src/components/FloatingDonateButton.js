import { Link } from 'react-router-dom';

export const FloatingDonateButton = () => {
  return (
    <div className="hidden lg:flex fixed top-24 right-[58px] z-40 justify-center">
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
