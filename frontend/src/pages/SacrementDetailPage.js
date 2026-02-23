import { useParams, Link } from 'react-router-dom';
import { Droplets, Heart, Sparkles, HandHeart, Cross, ArrowLeft, Phone, Mail } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';

// Citations bibliques pour chaque sacrement
const biblicalQuotes = {
  'bapteme': { quote: "Tu es mon fils bien-aimé ; en toi, j'ai mis tout mon amour.", reference: "Marc 1, 11" },
  'premiere-communion': { quote: "Moi, je suis le pain de la vie. Celui qui vient à moi n'aura jamais faim.", reference: "Jean 6, 35" },
  'confirmation': { quote: "L'Esprit Saint descendra sur vous, et vous recevrez une force.", reference: "Actes 1, 8" },
  'reconciliation': { quote: "Tes péchés sont pardonnés, va en paix.", reference: "Luc 7, 48" },
  'mariage': { quote: "Que l'homme ne sépare pas ce que Dieu a uni.", reference: "Matthieu 19, 6" },
  'malades': { quote: "Le Seigneur est mon berger : je ne manque de rien.", reference: "Psaume 22, 1" }
};

const sacrementsData = {
  'bapteme': {
    title: 'Le Baptême',
    subtitle: 'Devenir enfant de Dieu',
    icon: Droplets,
    image: 'https://customer-assets.emergentagent.com/job_c9a89358-b983-4f0b-8ec4-b48d0db621c4/artifacts/gj75c74d_Bapteme.png',
    intro: 'Le baptême est le premier des sacrements. Il nous fait entrer dans la famille de Dieu et nous ouvre les portes de la vie éternelle.',
    sections: [
      {
        title: 'Pour les enfants',
        content: 'Le baptême des petits enfants (0-3 ans) est célébré après une préparation des parents. Plusieurs rencontres sont prévues avec l\'équipe de préparation au baptême pour approfondir le sens de ce sacrement et préparer la célébration.'
      },
      {
        title: 'Pour les enfants en âge scolaire',
        content: 'Les enfants de plus de 3 ans qui n\'ont pas été baptisés peuvent recevoir le baptême après une préparation adaptée à leur âge, souvent en lien avec le catéchisme.'
      },
      {
        title: 'Pour les adultes (Catéchuménat)',
        content: 'Les adultes qui souhaitent recevoir le baptême suivent un parcours appelé catéchuménat. Ce chemin de foi dure généralement deux ans et culmine lors de la Veillée Pascale.'
      }
    ],
    steps: [
      'Contacter le secrétariat paroissial',
      'Rencontre avec l\'équipe de préparation',
      'Sessions de préparation (2 à 3 rencontres)',
      'Choix du parrain et de la marraine',
      'Célébration du baptême'
    ]
  },
  'premiere-communion': {
    title: 'La Première Communion',
    subtitle: 'Recevoir le Corps du Christ',
    icon: Heart,
    image: 'https://customer-assets.emergentagent.com/job_5166d458-aa97-495f-97c0-2fdcfaf2d885/artifacts/jrek2lhj_Premiere-communion.png',
    intro: 'La première communion est le moment où l\'enfant reçoit pour la première fois le Corps du Christ dans l\'Eucharistie.',
    sections: [
      {
        title: 'Préparation au catéchisme',
        content: 'La préparation à la première communion se fait dans le cadre du catéchisme. Après au moins deux années de catéchisme, l\'enfant peut demander à recevoir ce sacrement.'
      },
      {
        title: 'Une démarche personnelle',
        content: 'L\'enfant doit exprimer lui-même son désir de communier. C\'est une étape importante dans sa vie de foi, qu\'il franchit accompagné de sa famille et de la communauté.'
      },
      {
        title: 'La retraite de communion',
        content: 'Avant la célébration, les enfants participent à une retraite pour se préparer spirituellement à ce grand jour.'
      }
    ],
    steps: [
      'Inscription au catéchisme',
      'Deux années de catéchisme minimum',
      'Demande de l\'enfant',
      'Retraite de préparation',
      'Célébration de la première communion'
    ]
  },
  'confirmation': {
    title: 'La Confirmation',
    subtitle: 'Recevoir l\'Esprit Saint',
    icon: Sparkles,
    image: 'https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/e13l6wpl_Confirmation.png',
    intro: 'La confirmation est le sacrement qui achève l\'initiation chrétienne. Par ce sacrement, le baptisé reçoit la plénitude des dons de l\'Esprit Saint.',
    sections: [
      {
        title: 'Pour les jeunes',
        content: 'Les jeunes (généralement en 3ème ou lycée) peuvent demander la confirmation après une préparation spécifique qui dure environ une année.'
      },
      {
        title: 'Pour les adultes',
        content: 'Les adultes baptisés qui n\'ont pas été confirmés peuvent recevoir ce sacrement après une préparation adaptée.'
      },
      {
        title: 'Les dons de l\'Esprit',
        content: 'Par la confirmation, le chrétien reçoit les sept dons de l\'Esprit Saint : sagesse, intelligence, conseil, force, science, piété et crainte de Dieu.'
      }
    ],
    steps: [
      'Demande auprès du secrétariat ou de l\'aumônerie',
      'Année de préparation',
      'Choix d\'un parrain ou d\'une marraine de confirmation',
      'Retraite de préparation',
      'Célébration par l\'évêque'
    ]
  },
  'reconciliation': {
    title: 'La Réconciliation',
    subtitle: 'Le pardon de Dieu',
    icon: HandHeart,
    image: 'https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/qhnerpwc_Reconciliation-confession.png',
    intro: 'Le sacrement de réconciliation (ou confession) nous permet de recevoir le pardon de Dieu et de nous réconcilier avec lui et avec l\'Église.',
    sections: [
      {
        title: 'Se préparer',
        content: 'Avant de recevoir ce sacrement, il est bon de prendre un temps de prière et d\'examen de conscience pour reconnaître ses péchés devant Dieu.'
      },
      {
        title: 'La confession',
        content: 'Dans le secret de la confession, le prêtre accueille le pénitent au nom du Christ. Il écoute, conseille et donne l\'absolution au nom de Dieu.'
      },
      {
        title: 'Première confession',
        content: 'Les enfants préparent leur première confession dans le cadre du catéchisme, généralement avant leur première communion.'
      }
    ],
    steps: [
      'Prendre un temps d\'examen de conscience',
      'Se présenter aux permanences ou prendre rendez-vous',
      'Confession individuelle avec un prêtre',
      'Recevoir l\'absolution',
      'Accomplir la pénitence donnée par le prêtre'
    ]
  },
  'mariage': {
    title: 'Le Mariage',
    subtitle: 'S\'unir dans l\'amour du Christ',
    icon: Heart,
    image: 'https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/5tik9jhg_Mariage.png',
    intro: 'Le mariage chrétien est un sacrement par lequel un homme et une femme s\'engagent l\'un envers l\'autre pour toute leur vie, avec la grâce de Dieu.',
    sections: [
      {
        title: 'Préparation au mariage',
        content: 'La préparation au mariage dure plusieurs mois et comprend des rencontres avec des couples accompagnateurs et un prêtre ou diacre. C\'est un temps pour approfondir votre relation et votre foi.'
      },
      {
        title: 'Les piliers du mariage',
        content: 'Le mariage chrétien repose sur quatre piliers : la liberté, la fidélité, l\'indissolubilité et l\'ouverture à la vie.'
      },
      {
        title: 'Après le mariage',
        content: 'Des mouvements comme les Équipes Notre-Dame ou Cana accompagnent les couples mariés dans leur vie conjugale et spirituelle.'
      }
    ],
    steps: [
      'Contacter le secrétariat au moins 6 mois à l\'avance',
      'Rencontre avec un prêtre ou diacre',
      'Préparation avec des couples accompagnateurs',
      'Constitution du dossier de mariage',
      'Célébration du mariage'
    ]
  },
  'malades': {
    title: 'Le Sacrement des Malades',
    subtitle: 'Force et réconfort',
    icon: Cross,
    image: 'https://customer-assets.emergentagent.com/job_c9a89358-b983-4f0b-8ec4-b48d0db621c4/artifacts/3dt57dtp_Sacreement-des-malades.png',
    intro: 'Le sacrement des malades apporte réconfort, force et paix aux personnes gravement malades, âgées ou en fin de vie.',
    sections: [
      {
        title: 'Qui peut le recevoir ?',
        content: 'Toute personne gravement malade, âgée ou en danger de mort peut recevoir ce sacrement. Il n\'est pas réservé aux derniers instants de la vie.'
      },
      {
        title: 'Les effets du sacrement',
        content: 'Ce sacrement apporte la grâce de l\'Esprit Saint pour le réconfort, la paix et le courage. Il unit la souffrance du malade à celle du Christ.'
      },
      {
        title: 'Célébration communautaire',
        content: 'Une fois par an, une célébration communautaire du sacrement des malades est organisée dans la paroisse.'
      }
    ],
    steps: [
      'Contacter le secrétariat ou un prêtre',
      'Visite du prêtre au domicile ou à l\'hôpital',
      'Célébration du sacrement (onction et prières)',
      'Possibilité de recevoir l\'Eucharistie'
    ]
  }
};

const SacrementDetailPage = () => {
  const { sacrementId } = useParams();
  const sacrement = sacrementsData[sacrementId];

  if (!sacrement) {
    return (
      <div className="min-h-screen bg-paper py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-slate-deep mb-4">Page non trouvée</h1>
          <Link to="/demander-sacrement" className="text-gold hover:text-gold-dark">
            Retour aux sacrements
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = sacrement.icon;

  return (
    <div className="min-h-screen bg-paper" data-testid={`sacrement-detail-${sacrementId}`}>
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px]">
        <img
          src={sacrement.image}
          alt={sacrement.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/demander-sacrement" 
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux sacrements
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="font-serif text-4xl md:text-5xl text-white">{sacrement.title}</h1>
                <p className="text-gold text-lg">{sacrement.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
          <p className="text-lg text-slate-700 leading-relaxed">{sacrement.intro}</p>
        </div>

        {/* Sections */}
        <div className="space-y-6 mb-12">
          {sacrement.sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-serif text-2xl text-slate-deep mb-3">{section.title}</h2>
              <p className="text-slate-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 mb-12">
          <h2 className="font-serif text-2xl text-slate-deep mb-6">Les étapes de la démarche</h2>
          <ol className="space-y-4">
            {sacrement.steps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-medium mr-4">
                  {index + 1}
                </span>
                <span className="text-slate-700 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center mb-16">
          <h2 className="font-serif text-2xl text-slate-deep mb-4">Faire une demande</h2>
          <p className="text-slate-600 mb-6">
            Pour toute demande concernant ce sacrement, contactez le secrétariat paroissial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/secretariat"
              className="inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contacter le secrétariat
            </Link>
          </div>
        </div>

        {/* Citation biblique */}
        {biblicalQuotes[sacrementId] && (
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
            <blockquote className="font-serif text-2xl text-slate-deep italic mb-4">
              "{biblicalQuotes[sacrementId].quote}"
            </blockquote>
            <p className="text-gold font-medium">{biblicalQuotes[sacrementId].reference}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SacrementDetailPage;
