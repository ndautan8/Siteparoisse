import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Church, Heart, Users, BookOpen, HandHeart, ChevronDown, Phone, Search } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [showJeVeuxMenu, setShowJeVeuxMenu] = useState(false);
  const [openMobileSections, setOpenMobileSections] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Search data - all searchable pages
  const searchablePages = [
    { title: 'Accueil', path: '/', keywords: 'accueil bienvenue paroisse' },
    { title: 'Horaires des messes', path: '/horaires-messes', keywords: 'messe horaires dimanche semaine' },
    { title: 'Secrétariat & Coordonnées', path: '/secretariat', keywords: 'contact téléphone adresse secrétariat' },
    { title: "Notre Dame d'Autan", path: '/notre-dame-autan', keywords: 'paroisse identité' },
    { title: 'Équipe Pastorale', path: '/equipe-pastorale', keywords: 'prêtre curé diacre équipe' },
    { title: 'Vie Économique', path: '/vie-economique', keywords: 'denier don finances' },
    { title: 'Nos Clochers', path: '/nos-clochers', keywords: 'églises clochers patrimoine' },
    { title: 'Services Transverses', path: '/services-transverses', keywords: 'communication accueil' },
    { title: 'Familles & Jeunesse', path: '/familles-jeunesse', keywords: 'famille jeunes enfants' },
    { title: 'Éveil à la Foi', path: '/eveil-foi', keywords: 'éveil foi petits enfants' },
    { title: 'Catéchisme', path: '/catechisme', keywords: 'catéchisme enfants communion' },
    { title: 'Aumônerie', path: '/aumonerie', keywords: 'aumônerie collège lycée jeunes' },
    { title: 'Mouvements de Jeunesse', path: '/mouvements', keywords: 'scouts MEJ patronage' },
    { title: "Servants d'autel & Vocations", path: '/servants-vocations', keywords: 'servants autel vocations' },
    { title: 'Demander un Sacrement', path: '/demander-sacrement', keywords: 'sacrement baptême mariage' },
    { title: 'Baptême', path: '/sacrements/bapteme', keywords: 'baptême sacrement' },
    { title: 'Première Communion', path: '/sacrements/premiere-communion', keywords: 'communion eucharistie' },
    { title: 'Confirmation', path: '/sacrements/confirmation', keywords: 'confirmation sacrement' },
    { title: 'Réconciliation', path: '/sacrements/reconciliation', keywords: 'confession réconciliation pardon' },
    { title: 'Mariage', path: '/sacrements/mariage', keywords: 'mariage sacrement' },
    { title: 'Sacrement des Malades', path: '/sacrements/malades', keywords: 'malades onction sacrement' },
    { title: 'Liturgie & Musique', path: '/liturgie-musique', keywords: 'liturgie musique chorale' },
    { title: 'Funérailles', path: '/funerailles', keywords: 'funérailles obsèques décès' },
    { title: 'Grandir dans la Foi', path: '/grandir-foi', keywords: 'foi formation spiritualité' },
    { title: 'Parcours Alpha', path: '/alpha-catechumenat', keywords: 'alpha catéchuménat découvrir foi' },
    { title: 'Groupes de partage', path: '/groupes-partage', keywords: 'groupes partage fraternité' },
    { title: 'Méditation chrétienne', path: '/meditation', keywords: 'méditation prière silence' },
    { title: 'Ressources', path: '/ressources', keywords: 'ressources livres médias' },
    { title: 'Solidarité & Écoute', path: '/solidarite', keywords: 'solidarité écoute entraide' },
    { title: "Service d'écoute", path: '/service-ecoute', keywords: 'écoute accompagnement' },
    { title: 'Visite des malades', path: '/visite-malades', keywords: 'malades visite SEM' },
    { title: 'Entraide', path: '/entraide', keywords: 'entraide secours catholique' },
  ];

  const filteredResults = searchQuery.length > 1 
    ? searchablePages.filter(page => 
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.keywords.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSearchSelect = (path) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(path);
  };

  // Toggle mobile section
  const toggleMobileSection = (sectionTitle) => {
    setOpenMobileSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  // Block body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const jeVeuxOptions = [
    { label: 'Aller à la messe', path: '/horaires-messes' },
    { label: 'Demander le baptême', path: '/sacrements/bapteme' },
    { label: 'Recevoir la confirmation', path: '/sacrements/confirmation' },
    { label: 'Faire ma première communion', path: '/sacrements/premiere-communion' },
    { label: 'Me marier à l\'église', path: '/sacrements/mariage' },
    { label: 'Rejoindre Alpha', path: '/alpha-catechumenat' },
    { label: 'Rejoindre un petit groupe', path: '/groupes-partage' },
  ];

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
      title: 'Demander un Sacrement',
      icon: Heart,
      path: '/demander-sacrement',
      items: [
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
    <>
      <header className="sticky top-0 bg-white border-b border-slate-200" style={{ zIndex: 50 }} data-testid="main-header">
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
            {/* Je veux... Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout) clearTimeout(closeTimeout);
                setShowJeVeuxMenu(true);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => setShowJeVeuxMenu(false), 150);
                setCloseTimeout(timeout);
              }}
            >
              <button
                className="px-4 py-2 text-gold hover:text-gold-dark font-medium transition-colors flex items-center space-x-2"
                data-testid="menu-je-veux"
              >
                <span>Je veux...</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showJeVeuxMenu ? 'rotate-180' : ''}`} />
              </button>

              {showJeVeuxMenu && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50"
                  onMouseEnter={() => {
                    if (closeTimeout) clearTimeout(closeTimeout);
                  }}
                  onMouseLeave={() => {
                    const timeout = setTimeout(() => setShowJeVeuxMenu(false), 150);
                    setCloseTimeout(timeout);
                  }}
                >
                  {jeVeuxOptions.map((option) => (
                    <Link
                      key={option.path + option.label}
                      to={option.path}
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-gold transition-colors"
                      onClick={() => setShowJeVeuxMenu(false)}
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

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

          {/* CTA Buttons Desktop + Mobile action buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop: Horaires des messes button in header */}
            <Link
              to="/horaires-messes"
              className="hidden lg:block bg-gold hover:bg-gold-dark text-white font-medium px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              data-testid="mass-times-button"
            >
              Horaires des messes
            </Link>

            {/* Mobile: Search + Phone + Donate + Horaires buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Search button - mobile only */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 bg-gold/10 hover:bg-gold/20 rounded-full transition-colors"
                title="Rechercher"
              >
                <Search className="w-5 h-5 text-gold" />
              </button>

              {/* Phone button - mobile only */}
              <Link
                to="/secretariat"
                className="p-2 bg-gold/10 hover:bg-gold/20 rounded-full transition-colors"
                title="Nous contacter"
              >
                <Phone className="w-5 h-5 text-gold" />
              </Link>
              
              {/* Donate button - mobile only */}
              <Link
                to="/vie-economique"
                className="px-3 py-2 bg-gold hover:bg-gold-dark text-white rounded-full text-sm font-medium transition-colors"
              >
                Faire un don
              </Link>

              {/* Horaires button - mobile */}
              <Link
                to="/horaires-messes"
                className="px-3 py-2 bg-gold hover:bg-gold-dark text-white rounded-full text-sm font-medium transition-colors whitespace-nowrap"
                data-testid="mass-times-button-mobile"
              >
                Horaires
              </Link>
            </div>

            {/* Mobile Menu Toggle */}

            <button
              className="lg:hidden text-slate-700 hover:text-gold p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white shadow-2xl overflow-y-auto" 
          style={{ zIndex: 10000 }}
          data-testid="mobile-menu"
        >
          <div className="py-4 px-4">
            {/* Je veux... menu on mobile */}
            <div className="mb-4 border-b border-slate-200 pb-4">
              <button
                onClick={() => toggleMobileSection('je-veux')}
                className="w-full flex items-center justify-between font-medium text-gold mb-2"
              >
                <span>Je veux...</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${openMobileSections.includes('je-veux') ? 'rotate-180' : ''}`}
                />
              </button>
              {openMobileSections.includes('je-veux') && (
                <div className="pl-4 space-y-1 mt-2">
                {jeVeuxOptions.map((option) => (
                  <Link
                    key={option.path + option.label}
                    to={option.path}
                    className="block py-1 text-slate-600 hover:text-gold transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {option.label}
                  </Link>
                ))}
                </div>
              )}
            </div>

            {menuItems.map((item) => (
              <div key={item.title} className="mb-4 border-b border-slate-200 pb-4">
                <div className="flex items-center justify-between">
                  <Link
                    to={item.path}
                    className="flex items-center space-x-2 font-medium text-slate-700 hover:text-gold transition-colors flex-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </Link>
                  <button
                    onClick={() => toggleMobileSection(item.title)}
                    className="p-2 hover:bg-slate-50 rounded transition-colors"
                  >
                    <ChevronDown 
                      className={`w-4 h-4 text-slate-600 transition-transform ${openMobileSections.includes(item.title) ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
                {openMobileSections.includes(item.title) && (
                  <div className="pl-6 space-y-1 mt-2">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className="block py-1 text-slate-600 hover:text-gold transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      </header>

      {/* Search Button - Overlapping the header (hidden on mobile) */}
      <div className="hidden md:block fixed left-1/2 transform -translate-x-1/2 top-[52px] z-[60]" data-testid="search-button-container">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="w-11 h-11 rounded-full bg-white hover:bg-slate-50 text-gold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5 border border-slate-200"
          data-testid="search-button"
          aria-label="Rechercher sur le site"
        >
          <Search className="w-5 h-5 text-gold" />
        </button>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 z-[55]"
            onClick={() => setIsSearchOpen(false)}
          />
          
          {/* Search Panel */}
          <div className="fixed left-1/2 transform -translate-x-1/2 top-[120px] z-[60] w-full max-w-lg px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-4 border border-slate-200">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher une page, un service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-slate-700"
                  autoFocus
                  data-testid="search-input"
                />
              </div>
              
              {/* Search Results */}
              {filteredResults.length > 0 && (
                <div className="mt-4 space-y-1">
                  {filteredResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchSelect(result.path)}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-gold/10 transition-colors flex items-center gap-3"
                      data-testid={`search-result-${idx}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                        <Search className="w-4 h-4 text-gold" />
                      </div>
                      <span className="text-slate-700">{result.title}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchQuery.length > 1 && filteredResults.length === 0 && (
                <div className="mt-4 text-center py-6 text-slate-500">
                  Aucun résultat pour "{searchQuery}"
                </div>
              )}

              {/* Quick Links when empty */}
              {searchQuery.length < 2 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-3">Recherches populaires</p>
                  <div className="flex flex-wrap gap-2">
                    {['Horaires', 'Baptême', 'Mariage', 'Contact'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-gold/10 hover:text-gold transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};