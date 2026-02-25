import { useParams, Link } from 'react-router-dom';
import { Droplets, Heart, Sparkles, HandHeart, Cross, ArrowLeft, Phone, ChevronRight, Calendar, Users, BookOpen } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';

// Citations bibliques pour chaque sacrement
const biblicalQuotes = {
  'bapteme': { quote: "Tu es mon fils bien-aimé ; en toi, j'ai mis tout mon amour.", reference: "Marc 1, 11" },
  'premiere-communion': { quote: "Moi, je suis le pain de la vie. Celui qui vient à moi n'aura jamais faim.", reference: "Jean 6, 35" },
  'confirmation': { quote: "Vous allez recevoir une Force, celle de l'Esprit saint, qui descendra sur vous.", reference: "Actes 1, 8" },
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
    intro: 'Premier des sacrements, le baptême est le fondement de toute la vie chrétienne, la porte qui ouvre l\'accès aux autres sacrements. Par le baptême nous sommes libérés du péché et régénérés comme filles et fils de Dieu ; nous devenons membres du Christ et de son Église, témoins de sa Bonne Nouvelle.',
    introSecondary: 'Baptiser (du grec "baptizein") signifie "plonger" ou "immerger" ; la plongée dans l\'eau signifie l\'ensevelissement du catéchumène dans la mort du Christ d\'où il sort par la résurrection avec lui, comme nouvelle créature.',
    sections: [
      {
        title: 'Baptême des petits enfants',
        paragraphs: [
          'Faire baptiser un petit enfant est un acte important pour les parents. Elle engage leur foi et celles des parrains et marraines. Cette démarche demande réflexion et préparation.',
          'Les parents s\'adressent au presbytère, le plus tôt possible. Le prêtre et les parents font le point sur les motivations de la demande et sur ses conséquences. Ils déterminent ensemble une date de célébration.',
          'Les parents participent ensuite à des rencontres de réflexion et de préparation.',
          'Quelques jours avant le baptême, les parents rencontrent à nouveau le prêtre pour organiser la célébration.'
        ],
        highlight: 'Responsables des rencontres : Florie et Vianney Languille'
      },
      {
        title: 'Baptême des enfants en âge scolaire',
        paragraphs: [
          'Les parents qui le souhaitent peuvent demander le baptême pour leur enfant en âge scolaire, quand l\'enfant le désire. Pour cela, il faut contacter un prêtre de la paroisse ou le catéchiste de l\'enfant.',
          'La préparation se fait en trois étapes : accueil et signe de la croix, rite pénitentiel au cours de messes pour les enfants et leurs familles, puis baptême.',
          'Avant chaque étape une rencontre est organisée avec les parents pour approfondir le sens de la démarche. Le baptême est préparé avec le prêtre, les parents et l\'enfant.'
        ]
      },
      {
        title: 'Baptême des adultes',
        paragraphs: [
          'Les adultes qui demandent le baptême sont invités à le préparer par un cheminement qui dure souvent deux ans, mais qui peut être plus rapide ou plus long en fonction des situations.',
          'Le candidat est accompagné individuellement par des baptisés de la paroisse, en lien avec le prêtre et le service diocésain du catéchuménat.',
          'Le baptême est le plus souvent célébré dans la nuit de Pâques, fête de la Résurrection. Il peut être accompagné des deux autres sacrements de l\'initiation chrétienne, la confirmation et l\'Eucharistie.'
        ]
      }
    ],
    steps: [
      'Contacter le secrétariat paroissial',
      'Rencontre avec un prêtre',
      'Sessions de préparation',
      'Choix du parrain et de la marraine',
      'Célébration du baptême'
    ]
  },
  'premiere-communion': {
    title: 'La Première Communion',
    subtitle: 'Recevoir le Corps du Christ',
    icon: Heart,
    image: 'https://customer-assets.emergentagent.com/job_5166d458-aa97-495f-97c0-2fdcfaf2d885/artifacts/jrek2lhj_Premiere-communion.png',
    intro: 'Les « premières communions » se déroulent en mai et juin.',
    sections: [
      {
        title: 'Pour les enfants',
        paragraphs: [
          'Les enfants qui en sont à leur troisième année de catéchisme peuvent demander à recevoir le sacrement de l\'eucharistie. Cela se passe plutôt en CM2, mais peut se demander à tout âge. La demande est à faire en début d\'année.',
          'Une première rencontre concerne uniquement les parents. Au cours d\'une soirée nous présentons l\'itinéraire que vont vivre les enfants.',
          'Pour ce qui est la cérémonie elle-même, le père Daniel propose aux parents une rencontre pour expliquer le sacrement de l\'eucharistie.',
          'Une rencontre de relecture est organisée après la cérémonie, un dimanche matin, avant la messe des familles.'
        ],
        bulletPoints: [
          'Trois rencontres le dimanche matin avant les messes des familles',
          'Une matinée pour se préparer et vivre le sacrement de la réconciliation',
          'Une journée de retraite avec les parents'
        ],
        bulletTitle: 'Les enfants suivent une préparation spécifique :'
      },
      {
        title: 'Pour les adultes',
        paragraphs: [
          'Vous avez été baptisé enfant mais n\'avez jamais fait votre première communion ? Sachez qu\'il n\'y a pas d\'âge pour recevoir l\'Eucharistie et nourrir sa vie spirituelle.',
          'Cette démarche est une belle étape de foi qui se prépare sereinement. Nous vous proposons un accompagnement adapté à votre vie d\'adulte pour redécouvrir le sens de ce sacrement, approfondir la Bible et échanger sur vos questions.',
          'Chaque parcours respecte votre rythme et vos attentes. Si vous ressentez cet appel ou souhaitez simplement des informations, n\'hésitez pas à nous contacter pour une rencontre informelle. Vous êtes les bienvenus !'
        ]
      }
    ],
    steps: [
      'Inscription au catéchisme (3ème année minimum)',
      'Rencontre avec les parents',
      'Sessions de préparation',
      'Journée de retraite avec les parents',
      'Célébration de la première communion'
    ]
  },
  'confirmation': {
    title: 'La Confirmation',
    subtitle: 'Recevoir l\'Esprit Saint',
    icon: Sparkles,
    image: 'https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/e13l6wpl_Confirmation.png',
    intro: 'La Confirmation vient achever la grâce du Baptême. Ce sacrement est conféré aux personnes, jeunes et adultes, qui ont mûrement réfléchi à leur vie de Foi et à leur engagement dans le monde et dans l\'Eglise.',
    introSecondary: 'Par la confirmation, le chrétien reçoit les sept dons de l\'Esprit pour fortifier sa foi et décider de témoigner de l\'Évangile auprès des autres.',
    sections: [
      {
        title: 'Un cheminement accompagné',
        paragraphs: [
          'Parce qu\'il s\'agit d\'une étape marquante de la vie chrétienne, la réception de ce sacrement demande un temps de préparation et de discernement.'
        ]
      },
      {
        title: 'Pour les jeunes',
        paragraphs: [
          'Les collégiens et lycéens se préparent au sein de l\'aumônerie de l\'enseignement public ou de leur établissement.',
          'C\'est un lieu d\'échange et de partage pour grandir ensemble dans la foi.'
        ]
      },
      {
        title: 'Pour les adultes',
        icon: '🕊️',
        paragraphs: [
          'Il n\'y a pas d\'âge pour être confirmé ! Un parcours adapté est proposé aux adultes (baptisés ou non) pour redécouvrir les fondements de la foi et se préparer à recevoir ce souffle nouveau.',
          'Ce temps de préparation est une parenthèse de réflexion pour mieux comprendre l\'action de Dieu dans sa vie avant de s\'engager avec confiance.'
        ]
      }
    ],
    steps: [
      'Demande auprès du secrétariat ou de l\'aumônerie',
      'Année de préparation',
      'Sessions de préparation',
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
    practicalInfo: {
      title: 'Permanences',
      content: 'Chaque vendredi soir, après la messe de 18h30, à Saint-Orens et Castanet.'
    },
    sections: [
      {
        title: 'Recevoir le Pardon de Dieu',
        icon: '💜',
        paragraphs: [
          'Recevoir le Pardon de Dieu est une démarche qui peut se faire de deux manières :'
        ],
        bulletPoints: [
          'Au cours d\'une célébration communautaire, avant Noël et Pâques, en consultant le calendrier pour connaître la date',
          'En rencontrant individuellement un prêtre, en prenant rendez-vous'
        ]
      },
      {
        title: 'Se préparer',
        icon: '📖',
        paragraphs: [
          'Avant de recevoir ce sacrement, il est bon de prendre un temps de prière et d\'examen de conscience pour reconnaître ses péchés devant Dieu.'
        ]
      },
      {
        title: 'Première confession',
        icon: '🌟',
        paragraphs: [
          'Les enfants préparent leur première confession dans le cadre du catéchisme, généralement avant leur première communion.'
        ]
      }
    ],
    steps: [
      'Prendre un temps d\'examen de conscience',
      'Se présenter aux permanences (vendredi après 18h30) ou prendre rendez-vous',
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
    intro: 'Le mariage à l\'église est un évènement majeur de votre vie de couple. Aussi sa préparation nécessite-t-elle du temps et il est donc nécessaire de s\'y prendre au moins une année avant le jour J.',
    introSecondary: 'Le mariage chrétien suppose de votre part à tous les 2 une décision libre et qui vous lie POUR LA VIE. Vous allez vous préparer à recevoir le sacrement du mariage et l\'équipe chargée de l\'accompagnement des futurs mariés vous aidera à réfléchir ensemble à cet engagement que vous allez prendre devant Dieu.',
    sections: [
      {
        title: 'La préparation',
        icon: '💒',
        paragraphs: [
          'Dans un premier temps, vous contacterez le secrétariat du secteur paroissial pour planifier un rendez-vous avec le prêtre de la paroisse. Il vous guidera dans votre discernement.',
          'Puis, vous partagerez deux journées et une soirée avec d\'autres couples qui, comme vous, sont dans cette démarche de cheminement vers le mariage.',
          'La célébration du mariage est finalisée avec le prêtre qui sera témoin de votre mariage.'
        ]
      },
      {
        title: 'Informations pratiques',
        icon: '📋',
        paragraphs: [],
        infoBox: {
          offrande: '200 €',
          responsables: 'Françoise et Jean-François Léturgie'
        }
      }
    ],
    steps: [
      'Contacter le secrétariat au moins 1 an à l\'avance',
      'Rencontre avec un prêtre',
      'Sessions de préparation',
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
        icon: '🙏',
        paragraphs: [
          'Toute personne gravement malade, âgée ou en danger de mort peut recevoir ce sacrement. Il n\'est pas réservé aux derniers instants de la vie.'
        ]
      },
      {
        title: 'Les effets du sacrement',
        icon: '💫',
        paragraphs: [
          'Ce sacrement apporte la grâce de l\'Esprit Saint pour le réconfort, la paix et le courage. Il unit la souffrance du malade à celle du Christ.'
        ]
      },
      {
        title: 'Célébration communautaire',
        icon: '⛪',
        paragraphs: [
          'Une fois par an, une célébration communautaire du sacrement des malades est organisée dans la paroisse.'
        ]
      }
    ],
    steps: [
      'Contacter le secrétariat ou un prêtre',
      'Visite du prêtre au domicile ou à l\'hôpital',
      'Sessions de préparation',
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
      <div className="relative h-[45vh] min-h-[350px]">
        <img
          src={sacrement.image}
          alt={sacrement.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        
        <SocialIcons />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/demander-sacrement" 
              className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux sacrements
            </Link>
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-xl shadow-gold/20">
                <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="font-serif text-4xl md:text-5xl text-white mb-1">{sacrement.title}</h1>
                <p className="text-gold-light text-lg font-light">{sacrement.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Intro Card */}
        <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 mb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full"></div>
          <div className="relative">
            <p className="text-lg text-slate-700 leading-relaxed">{sacrement.intro}</p>
            {sacrement.introSecondary && (
              <p className="text-slate-600 leading-relaxed mt-4">{sacrement.introSecondary}</p>
            )}
          </div>
        </div>

        {/* Practical Info Banner (for Reconciliation) */}
        {sacrement.practicalInfo && (
          <div className="bg-gradient-to-r from-gold to-gold-dark rounded-2xl p-6 mb-10 shadow-lg shadow-gold/20">
            <div className="flex items-center justify-center space-x-4 text-white">
              <Calendar className="w-6 h-6" />
              <div className="text-center">
                <p className="font-medium text-lg">{sacrement.practicalInfo.title}</p>
                <p className="text-white/90">{sacrement.practicalInfo.content}</p>
              </div>
            </div>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-6 mb-12">
          {sacrement.sections.map((section, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Section Header */}
              <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{section.icon}</span>
                  <h2 className="font-serif text-xl text-slate-deep">{section.title}</h2>
                </div>
              </div>
              
              {/* Section Content */}
              <div className="p-6">
                {section.paragraphs && section.paragraphs.map((para, pIndex) => (
                  <p key={pIndex} className="text-slate-600 leading-relaxed mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
                
                {/* Bullet Points */}
                {section.bulletTitle && (
                  <p className="text-slate-700 font-medium mt-4 mb-3">{section.bulletTitle}</p>
                )}
                {section.bulletPoints && (
                  <ul className="space-y-2 mt-3">
                    {section.bulletPoints.map((point, bIndex) => (
                      <li key={bIndex} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-gold mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-slate-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* Highlight Box */}
                {section.highlight && (
                  <div className="mt-4 bg-gold/10 rounded-xl p-4 border-l-4 border-gold">
                    <p className="text-slate-700 font-medium">{section.highlight}</p>
                  </div>
                )}
                
                {/* Info Box (for Mariage) */}
                {section.infoBox && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl p-5 text-center">
                      <p className="text-sm text-slate-500 mb-1">Offrande à la paroisse</p>
                      <p className="text-2xl font-serif text-slate-deep">{section.infoBox.offrande}</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-5 text-center border border-slate-100">
                      <p className="text-sm text-slate-500 mb-1">Responsables</p>
                      <p className="text-slate-deep font-medium">{section.infoBox.responsables}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 mb-12 shadow-xl">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-serif text-2xl text-white">Les étapes de la démarche</h2>
          </div>
          <div className="space-y-4">
            {sacrement.steps.map((step, index) => (
              <div key={index} className="flex items-center group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark text-white flex items-center justify-center font-semibold mr-4 shadow-lg shadow-gold/30 group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <div className="flex-grow bg-white/5 rounded-xl px-5 py-3 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <span className="text-white/90">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 text-center mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5"></div>
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/20">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-serif text-2xl text-slate-deep mb-3">Prêt à commencer ?</h2>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Pour toute demande concernant ce sacrement, notre équipe est là pour vous accompagner.
            </p>
            <Link
              to="/secretariat"
              className="inline-flex items-center justify-center bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5 mr-2" />
              Contacter le secrétariat
            </Link>
          </div>
        </div>

        {/* Citation biblique */}
        {biblicalQuotes[sacrementId] && (
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4 text-9xl font-serif text-white">"</div>
              <div className="absolute bottom-4 right-4 text-9xl font-serif text-white rotate-180">"</div>
            </div>
            <div className="relative">
              <blockquote className="font-serif text-2xl md:text-3xl text-white italic mb-6 leading-relaxed">
                {biblicalQuotes[sacrementId].quote}
              </blockquote>
              <div className="inline-block bg-gold/20 px-4 py-2 rounded-full">
                <p className="text-gold font-medium">{biblicalQuotes[sacrementId].reference}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SacrementDetailPage;
