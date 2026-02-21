import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Church, Heart, Users, BookOpen, HandHeart } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const menuItems = [
    {
      title: "Notre Dame d'Autan",
      icon: Church,
      path: '/notre-dame-autan',
      items: [
        { label: 'Secrétariat & Coordonnées', path: '/secretariat' },
        { label: 'Équipe Pastorale', path: '/equipe-pastorale' },
        { label: 'Vie Économique', path: '/vie-economique' },
        { label: 'Nos Clochers', path: '/nos-clochers' },
        { label: 'Services Transverses', path: '/services-transverses' },
        { label: 'Service Liturgie et Musique', path: '/liturgie-musique' },
        { label: 'Service Funérailles', path: '/funerailles' },
      ],
    },
    {
      title: 'Familles & Jeunesse',
      icon: Users,
      path: '/familles-jeunesse',
      items: [
        { label: 'Éveil à la Foi', path: '/eveil-foi' },
        { label: 'Catéchisme', path: '/catechisme' },
        { label: 'Aumônerie', path: '/aumonerie' },
        { label: 'Mouvements (Scouts, MEJ, Patronage)', path: '/mouvements' },
        { label: "Servants d'autel & Vocations", path: '/servants-vocations' },
      ],
    },
    {
      title: 'Vie Spirituelle & Sacrements',
      icon: Heart,
      path: '/vie-spirituelle',
      items: [
        { label: 'Demander un sacrement', path: '/demander-sacrement' },
        { label: 'Baptême', path: '/sacrements/bapteme' },
        { label: 'Première Communion', path: '/sacrements/premiere-communion' },
        { label: 'Confirmation', path: '/sacrements/confirmation' },
        { label: 'Réconciliation', path: '/sacrements/reconciliation' },
        { label: 'Mariage', path: '/sacrements/mariage' },
        { label: 'Sacrement des Malades', path: '/sacrements/malades' },
      ],
    },
    {
      title: 'Grandir dans la Foi',
      icon: BookOpen,
      path: '/grandir-foi',
      items: [
        { label: 'Parcours Alpha & Catéchuménat', path: '/alpha-catechumenat' },
        { label: 'Groupes de partage', path: '/groupes-partage' },
        { label: 'Méditation chrétienne', path: '/meditation' },
        { label: 'Ressources', path: '/ressources' },
      ],
    },
    {
      title: 'Solidarité & Écoute',
      icon: HandHeart,
      path: '/solidarite',
      items: [
        { label: "Service d'écoute Louis et Zélie", path: '/service-ecoute' },
        { label: 'Visite des malades (SEM)', path: '/visite-malades' },
        { label: 'Entraide', path: '/entraide' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/50" data-testid="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" data-testid="logo-link">
            <img
              src="https://customer-assets.emergentagent.com/job_c3efae68-56d0-4924-8ecf-4f7502ce3630/artifacts/34n0n91l_Notre-Dame-d-Autan.png"
              alt="Notre Dame d'Autan"
              className="h-14 w-auto"
            />
            <span className="font-serif text-xl md:text-2xl text-slate-deep hidden sm:block">
              Notre Dame d'Autan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" data-testid="desktop-nav">
            {menuItems.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => {
                  if (closeTimeout) clearTimeout(closeTimeout);
                  setActiveDropdown(item.title);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => setActiveDropdown(null), 150);
                  setCloseTimeout(timeout);
                }}
              >
                <Link
                  to={item.path}
                  className="px-4 py-2 text-slate-700 hover:text-gold font-medium transition-colors flex items-center space-x-2"
                  data-testid={`menu-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>

                {activeDropdown === item.title && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50"
                    onMouseEnter={() => {
                      if (closeTimeout) clearTimeout(closeTimeout);
                    }}
                    onMouseLeave={() => {
                      const timeout = setTimeout(() => setActiveDropdown(null), 150);
                      setCloseTimeout(timeout);
                    }}
                  >
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-gold transition-colors"
                        data-testid={`submenu-${subItem.path.substring(1)}`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button + Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/horaires-messes"
              className="hidden sm:block bg-gold hover:bg-gold-dark text-white font-serif tracking-wide px-6 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              data-testid="mass-times-button"
            >
              HORAIRES DES MESSES
            </Link>

            {/* Mobile CTA - Shorter text */}
            <Link
              to="/horaires-messes"
              className="sm:hidden bg-gold hover:bg-gold-dark text-white font-serif text-sm px-4 py-2 rounded-md shadow-md"
              data-testid="mass-times-button-mobile"
            >
              HORAIRES
            </Link>

            <button
              className="lg:hidden text-slate-700 hover:text-gold p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100" data-testid="mobile-menu">
            {menuItems.map((item) => (
              <div key={item.title} className="mb-4">
                <div className="font-medium text-slate-700 mb-2 flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </div>
                <div className="pl-6 space-y-1">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className="block py-1 text-slate-600 hover:text-gold transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};