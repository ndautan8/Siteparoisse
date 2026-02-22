import { Link } from 'react-router-dom';
import { Users, User, BookOpen, Heart } from 'lucide-react';

const teamMembers = [
  {
    id: 'cure',
    title: 'Le Curé',
    name: 'Père Jean-Marie Dupont',
    role: 'Curé de la paroisse',
    description: 'Responsable de la communauté paroissiale',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    path: '/equipe-pastorale/cure'
  },
  {
    id: 'pretres',
    title: 'Les Prêtres',
    name: 'Prêtres auxiliaires',
    role: 'Au service de la communauté',
    description: 'Accompagnement spirituel et sacrements',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    path: '/equipe-pastorale/pretres'
  },
  {
    id: 'diacres',
    title: 'Les Diacres',
    name: 'Diacres permanents',
    role: 'Service de la charité',
    description: 'Au service de la communauté et des plus fragiles',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    path: '/equipe-pastorale/diacres'
  },
  {
    id: 'seminaristes',
    title: 'Les Séminaristes',
    name: 'En formation',
    role: 'Futurs prêtres',
    description: 'Accompagnés par notre communauté dans leur cheminement',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    path: '/equipe-pastorale/seminaristes'
  },
  {
    id: 'eap',
    title: "L'EAP",
    name: "Équipe d'Animation Pastorale",
    role: 'Coordination pastorale',
    description: 'Laïcs engagés au service de la mission paroissiale',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
    path: '/equipe-pastorale/eap'
  }
];

const EquipePastoralePage = () => {
  return (
    <div className="min-h-screen bg-paper" data-testid="equipe-pastorale-page">
      {/* Hero Section with Image */}
      <section className="relative h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/x8y0e2d8_Equipe-pastorale.png"
            alt="Équipe Pastorale"
            className="w-full h-full object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        {/* Content - with padding to avoid search button overlap */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Users className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Équipe Pastorale
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">Une équipe au service de la communauté</p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Découvrez les membres de notre équipe pastorale qui accompagnent la vie de notre paroisse
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Team Grid - 5 colonnes */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {teamMembers.map((member) => (
            <Link
              key={member.id}
              to={member.path}
              className="group"
              data-testid={`team-card-${member.id}`}
            >
              <article className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 h-full border border-slate-100 flex flex-col hover:-translate-y-1">
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-gold" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <span className="text-gold text-sm font-medium mb-1">{member.role}</span>
                <h3 className="font-serif text-lg text-slate-deep mb-2 group-hover:text-gold transition-colors">
                  {member.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {member.description}
                </p>
                
                <div className="mt-4 flex items-center text-gold text-sm font-medium group-hover:text-gold-dark transition-colors">
                  <span>Découvrir</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
          <h2 className="font-serif text-2xl text-slate-deep mb-4">Contacter l'équipe pastorale</h2>
          <p className="text-slate-600 mb-6">
            Pour toute question ou demande, n'hésitez pas à nous contacter via le secrétariat paroissial.
          </p>
          <Link
            to="/secretariat"
            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>

      {/* Citation biblique */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep italic mb-4">
            "Comme le Père m'a envoyé, moi aussi, je vous envoie."
          </blockquote>
          <p className="text-gold font-medium">Jean 20, 21</p>
        </div>
      </div>
    </div>
  );
};

export default EquipePastoralePage;
