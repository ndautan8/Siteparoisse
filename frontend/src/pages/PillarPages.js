import { Link } from 'react-router-dom';
import { Users, Heart, BookOpen, Church, GraduationCap, Baby, Cross, MessagesSquare, Flower2, HandHeart, Stethoscope, Building2, Sparkles, Home, Phone } from 'lucide-react';

const pillarData = {
  'notre-dame-autan': {
    title: "Notre Dame d'Autan",
    subtitle: "L'identité de notre paroisse",
    description: "Découvrez qui nous sommes, notre équipe, notre organisation et notre patrimoine",
    icon: Church,
    color: "bg-blue-500",
    items: [
      {
        title: "Secrétariat & Coordonnées",
        description: "Horaires, contact et informations pratiques",
        icon: Phone,
        path: "/secretariat",
        color: "bg-slate-100",
      },
      {
        title: "Équipe Pastorale",
        description: "Prêtres, diacres et équipe d'animation pastorale",
        icon: Users,
        path: "/equipe-pastorale",
        color: "bg-blue-50",
      },
      {
        title: "Vie Économique",
        description: "Gestion financière et denier de l'Église",
        icon: Building2,
        path: "/vie-economique",
        color: "bg-amber-50",
      },
      {
        title: "Nos Clochers",
        description: "Histoire et architecture de nos églises",
        icon: Church,
        path: "/nos-clochers",
        color: "bg-indigo-50",
      },
      {
        title: "Services Transverses",
        description: "Communication et service d'accueil",
        icon: Sparkles,
        path: "/services-transverses",
        color: "bg-purple-50",
      },
    ],
  },
  'familles-jeunesse': {
    title: "Familles & Jeunesse",
    subtitle: "Pôle éducation et formation",
    description: "Accompagnement des enfants et des jeunes dans leur cheminement de foi",
    icon: Users,
    color: "bg-green-500",
    items: [
      {
        title: "Éveil à la Foi",
        description: "Pour les 3-7 ans et leurs familles",
        icon: Baby,
        path: "/eveil-foi",
        color: "bg-pink-50",
      },
      {
        title: "Catéchisme",
        description: "Du CE2 à la 6ème",
        icon: BookOpen,
        path: "/catechisme",
        color: "bg-green-50",
      },
      {
        title: "Aumônerie",
        description: "Collégiens et lycéens",
        icon: GraduationCap,
        path: "/aumonerie",
        color: "bg-blue-50",
      },
      {
        title: "Mouvements",
        description: "Scouts, MEJ, Patronage",
        icon: Users,
        path: "/mouvements",
        color: "bg-orange-50",
      },
      {
        title: "Servants d'autel & Vocations",
        description: "Service liturgique et accompagnement",
        icon: Cross,
        path: "/servants-vocations",
        color: "bg-indigo-50",
      },
    ],
  },
  'vie-spirituelle': {
    title: "Vie Spirituelle & Sacrements",
    subtitle: "Les grandes étapes de la vie chrétienne",
    description: "Recevoir les sacrements et vivre la liturgie en communauté",
    icon: Heart,
    color: "bg-rose-500",
    items: [
      {
        title: "Demander un Sacrement",
        description: "Baptême, Communion, Confirmation, Réconciliation",
        icon: Heart,
        path: "/demander-sacrement",
        color: "bg-rose-50",
      },
      {
        title: "Le Mariage",
        description: "Préparation et célébration",
        icon: Heart,
        path: "/mariage",
        color: "bg-pink-50",
      },
      {
        title: "Liturgie & Musique",
        description: "Chorale, art floral, sacristains",
        icon: Flower2,
        path: "/liturgie-musique",
        color: "bg-purple-50",
      },
      {
        title: "Funérailles",
        description: "Accompagnement des familles en deuil",
        icon: Cross,
        path: "/funerailles",
        color: "bg-slate-50",
      },
    ],
  },
  'grandir-foi': {
    title: "Grandir dans la Foi",
    subtitle: "Cheminer ensemble",
    description: "Parcours de formation et groupes de partage pour approfondir sa foi",
    icon: BookOpen,
    color: "bg-amber-500",
    items: [
      {
        title: "Parcours Alpha & Catéchuménat",
        description: "Découvrir ou redécouvrir la foi",
        icon: MessagesSquare,
        path: "/alpha-catechumenat",
        color: "bg-amber-50",
      },
      {
        title: "Groupes de Partage",
        description: "Fraternités, groupes pro, groupe biblique",
        icon: Users,
        path: "/groupes-partage",
        color: "bg-orange-50",
      },
      {
        title: "Méditation Chrétienne",
        description: "Temps de silence et de prière",
        icon: Sparkles,
        path: "/meditation",
        color: "bg-indigo-50",
      },
      {
        title: "Ressources",
        description: "Librairie, Radio Présence, liens utiles",
        icon: BookOpen,
        path: "/ressources",
        color: "bg-blue-50",
      },
    ],
  },
  'solidarite': {
    title: "Solidarité & Écoute",
    subtitle: "Vivre la charité",
    description: "Services d'accompagnement et actions de solidarité au service des plus fragiles",
    icon: HandHeart,
    color: "bg-emerald-500",
    items: [
      {
        title: "Service d'Écoute Louis et Zélie",
        description: "Présence bienveillante et accompagnement",
        icon: Heart,
        path: "/service-ecoute",
        color: "bg-rose-50",
      },
      {
        title: "Visite des Malades (SEM)",
        description: "Service évangélique des malades",
        icon: Stethoscope,
        path: "/visite-malades",
        color: "bg-blue-50",
      },
      {
        title: "Entraide",
        description: "Secours Catholique, Café Amitié, Lourdes...",
        icon: HandHeart,
        path: "/entraide",
        color: "bg-green-50",
      },
    ],
  },
};

const PillarPage = ({ pillarKey }) => {
  const data = pillarData[pillarKey];
  
  if (!data) {
    return <div>Page non trouvée</div>;
  }

  const IconComponent = data.icon;

  return (
    <div className="min-h-screen bg-paper py-24" data-testid={`pillar-page-${pillarKey}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className={`w-24 h-24 rounded-full ${data.color} flex items-center justify-center shadow-lg`}>
              <IconComponent className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-tight text-slate-deep mb-4">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl text-gold font-medium mb-4">
            {data.subtitle}
          </p>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item) => {
            const ItemIcon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="group"
                data-testid={`pillar-card-${item.path.substring(1)}`}
              >
                <div className={`${item.color} rounded-2xl p-8 h-full border-2 border-transparent hover:border-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                  <div className="flex flex-col h-full">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                      <ItemIcon className="w-8 h-8 text-gold" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="font-serif text-2xl text-slate-deep mb-3 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed flex-grow">
                      {item.description}
                    </p>
                    
                    <div className="mt-4 text-gold font-medium flex items-center space-x-2 group-hover:space-x-3 transition-all">
                      <span>En savoir plus</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PillarPage;
