import { Link } from 'react-router-dom';
import { Church, Phone, Users, Building2, Sparkles, Music, Cross } from 'lucide-react';

const sections = [
  {
    id: 'secretariat',
    title: 'Secrétariat & Coordonnées',
    subtitle: 'Contact & horaires',
    description: 'Horaires d\'ouverture, contact et informations pratiques',
    icon: Phone,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
    path: '/secretariat'
  },
  {
    id: 'equipe',
    title: 'Équipe Pastorale',
    subtitle: 'Curé, prêtres, diacres',
    description: 'Découvrez les membres de notre équipe pastorale',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
    path: '/equipe-pastorale'
  },
  {
    id: 'economique',
    title: 'Vie Économique',
    subtitle: 'Gestion & denier',
    description: 'Gestion financière transparente et responsable',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600',
    path: '/vie-economique'
  },
  {
    id: 'clochers',
    title: 'Nos Clochers',
    subtitle: '16 églises à découvrir',
    description: 'Un patrimoine architectural témoin de la foi de nos ancêtres',
    icon: Church,
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=600',
    path: '/nos-clochers'
  },
  {
    id: 'services',
    title: 'Services Transverses',
    subtitle: 'Communication & accueil',
    description: 'Équipes au service de la communication et de l\'accueil',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600',
    path: '/services-transverses'
  },
  {
    id: 'liturgie',
    title: 'Service Liturgie et Musique',
    subtitle: 'Chants & célébrations',
    description: 'Animer et embellir les célébrations liturgiques par la musique et le chant',
    icon: Music,
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600',
    path: '/liturgie-musique'
  },
  {
    id: 'funerailles',
    title: 'Service Funérailles',
    subtitle: 'Accompagnement & recueillement',
    description: 'Accompagner les familles dans les moments de deuil avec compassion',
    icon: Cross,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600',
    path: '/funerailles'
  }
];

const NotreDameAutanPage = () => {
  return (
    <div className="min-h-screen bg-paper py-20" data-testid="notre-dame-autan-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-lg">
              <Church className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-slate-deep mb-4">
            Notre Dame d'Autan
          </h1>
          <p className="text-gold font-medium mb-4">L'identité de notre paroisse</p>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Découvrez qui nous sommes, notre équipe, notre organisation et notre patrimoine
          </p>
        </div>

        {/* Sections Grid - 4 colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Link
                key={section.id}
                to={section.path}
                className="group"
                data-testid={`section-card-${section.id}`}
              >
                <article className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 h-full border border-slate-100 flex flex-col hover:-translate-y-1">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-gold" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <span className="text-gold text-sm font-medium mb-1">{section.subtitle}</span>
                  <h3 className="font-serif text-lg text-slate-deep mb-2 group-hover:text-gold transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                    {section.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-gold text-sm font-medium group-hover:text-gold-dark transition-colors">
                    <span>Découvrir</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-16 bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-2xl text-slate-deep mb-4">Une paroisse vivante</h2>
              <p className="text-slate-600 leading-relaxed">
                La paroisse Notre Dame d'Autan regroupe 16 clochers et une communauté vivante et accueillante. 
                Notre mission est d'annoncer l'Évangile et d'accompagner chacun dans sa vie de foi.
              </p>
            </div>
            <div className="text-center md:text-right">
              <Link
                to="/horaires-messes"
                className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Horaires des messes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotreDameAutanPage;
