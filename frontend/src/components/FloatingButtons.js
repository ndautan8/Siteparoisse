import { Link } from 'react-router-dom';
import { Phone, Sun, Moon } from 'lucide-react';
import { useDarkMode } from '@/contexts/DarkModeContext';

export const FloatingButtons = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="hidden lg:flex fixed top-24 right-8 z-40 flex-row items-center gap-3">
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className={`flex items-center justify-center rounded-full w-11 h-11 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-2 ${
          isDark
            ? 'bg-slate-700 border-slate-600 text-amber-300 hover:bg-slate-600'
            : 'bg-white/90 backdrop-blur-sm border-slate-200 text-slate-600 hover:bg-slate-100'
        }`}
        title={isDark ? 'Mode clair' : 'Mode sombre'}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Contact button */}
      <Link
        to="/secretariat"
        className="flex items-center justify-center bg-gold backdrop-blur-sm border-2 border-gold text-white dark:text-slate-100 hover:bg-gold-dark hover:border-gold-dark rounded-full w-12 h-12 font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        data-testid="floating-contact-button"
        title="Nous contacter"
      >
        <Phone className="w-5 h-5" />
      </Link>
      
      {/* Donate button */}
      <Link
        to="/vie-economique"
        className="flex items-center gap-2 bg-gold backdrop-blur-sm border-2 border-gold text-white dark:text-slate-100 hover:bg-gold-dark hover:border-gold-dark rounded-full px-6 py-2.5 font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        data-testid="floating-don-button"
      >
        <span>Faire un don</span>
      </Link>
    </div>
  );
};
