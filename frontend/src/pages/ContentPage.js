import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Users, Heart, BookOpen, Church, GraduationCap, Baby, Cross, MessagesSquare, 
  Flower2, HandHeart, Stethoscope, Building2, Sparkles, Music, Coffee, 
  Compass, Tent, Star, BookMarked, Radio, Tv, Globe, Home, Phone,
  HeartHandshake, Glasses, Landmark, CalendarHeart, UserCircle, Shield,
  Palmtree, Smile, Mic, PenTool, DoorOpen, FileText, Wallet, Gift, 
  CircleDollarSign, Wrench, Megaphone, UserPlus, Lightbulb, MessageCircle
} from 'lucide-react';
import FuneralsAgenda from '@/components/FuneralsAgenda';
import { SocialIcons } from '@/components/SocialIcons';
import ResourceModal from '@/components/ResourceModal';

// Citations bibliques pour chaque section
const biblicalQuotes = {
  services: { quote: "Il y a diversité de services, mais c'est le même Seigneur.", reference: "1 Corinthiens 12, 5" },
  eveil: { quote: "Laissez les enfants venir à moi.", reference: "Marc 10, 14" },
  catechisme: { quote: "Je t'ai gravé sur les paumes de mes mains.", reference: "Isaïe 49, 16" },
  aumonerie: { quote: "Que personne ne méprise ta jeunesse, mais sois un modèle pour les fidèles.", reference: "1 Timothée 4, 12" },
  mouvements: { quote: "Soyez toujours prêts à répondre à quiconque vous demande raison de l'espérance qui est en vous.", reference: "1 Pierre 3, 15" },
  servants: { quote: "Moi et ma maison, nous servirons le Seigneur.", reference: "Josué 24, 15" },
  liturgie: { quote: "Chantez au Seigneur un chant nouveau, car il a fait des merveilles.", reference: "Psaume 97, 1" },
  funerailles: { quote: "Je suis la résurrection et la vie. Celui qui croit en moi vivra.", reference: "Jean 11, 25" },
  alpha: { quote: "Venez et voyez.", reference: "Jean 1, 39" },
  groupes: { quote: "Là où deux ou trois sont rassemblés en mon nom, je suis au milieu d'eux.", reference: "Matthieu 18, 20" },
  meditation: { quote: "Le Seigneur est proche de tous ceux qui l'invoquent avec vérité.", reference: "Psaume 144, 18" },
  ressources: { quote: "Ta parole est une lampe à mes pieds, une lumière sur mon sentier.", reference: "Psaume 118, 105" },
  ecoute: { quote: "Consolez, consolez mon peuple.", reference: "Isaïe 40, 1" },
  malades: { quote: "J'étais malade, et vous m'avez visité.", reference: "Matthieu 25, 36" },
  entraide: { quote: "Portez les fardeaux les uns des autres.", reference: "Galates 6, 2" },
};

// Configuration des sections avec vignettes
const contentConfig = {
  economique: {
    title: 'Vie Économique',
    subtitle: 'Gestion financière et matérielle',
    description: 'Une gestion transparente et responsable au service de notre mission.',
    icon: Building2,
    heroImage: 'https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/lqmcs9y0_Vie-economique.png',
    items: [
      { title: 'Conseil des Finances', description: 'Gestion financière de la paroisse', icon: Wallet },
      { title: 'Commission des Travaux', description: 'Entretien de nos églises', icon: Wrench },
      { title: 'Denier de l\'Église', description: 'Soutenir la mission de l\'Église', icon: CircleDollarSign },
      { title: 'Legs et Donations', description: 'Soutenir durablement notre communauté', icon: Gift },
    ]
  },
  services: {
    title: 'Services Transverses',
    subtitle: 'Communication & accueil',
    description: 'Des équipes au service de la communication et de l\'accueil.',
    icon: Sparkles,
    heroImage: 'https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/k5e6s4rg_Services-transverses.png',
    items: [
      { title: 'Service Communication', description: 'Site web, réseaux sociaux, bulletin', icon: Megaphone },
      { title: 'Service Accueil', description: 'Accueil chaleureux des visiteurs', icon: DoorOpen },
      { title: 'Secrétariat', description: 'Gestion administrative', icon: FileText },
    ]
  },
  eveil: {
    title: 'Éveil à la Foi',
    subtitle: '3-7 ans',
    description: 'Premiers pas dans la foi chrétienne pour les tout-petits et leurs familles.',
    icon: Baby,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/6dnxwubq_Eveil-foi.png',
    items: [
      { title: 'Rencontres mensuelles', description: 'Le dimanche après la messe', icon: CalendarHeart },
      { title: 'Contes et histoires', description: 'Découvrir la Bible en s\'amusant', icon: BookOpen },
      { title: 'Chants et prières', description: 'Apprendre à prier ensemble', icon: Music },
      { title: 'Activités manuelles', description: 'Créations et bricolages', icon: PenTool },
    ]
  },
  catechisme: {
    title: 'Catéchisme',
    subtitle: 'CE2 à 6ème',
    description: 'Découvrir Jésus et grandir dans la foi en communauté.',
    icon: BookOpen,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/fd1bsyn9_Catechisme.png',
    items: [
      { title: 'CE2', description: 'Découverte de Jésus', icon: Star },
      { title: 'CM1', description: 'Préparation à la communion', icon: Heart },
      { title: 'CM2', description: 'Approfondissement', icon: BookMarked },
      { title: '6ème', description: 'Profession de foi', icon: Cross },
    ]
  },
  aumonerie: {
    title: 'Aumônerie',
    subtitle: 'Collégiens & lycéens',
    description: 'Un lieu pour les jeunes de grandir ensemble dans la foi.',
    icon: GraduationCap,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/z84pw136_Aumonerie.png',
    items: [
      { title: 'Aumônerie Collège', description: '5ème - 3ème', icon: Users },
      { title: 'Aumônerie Lycée', description: 'Seconde - Terminale', icon: GraduationCap },
      { title: 'Camps et retraites', description: 'Temps forts et activités', icon: Tent },
      { title: 'Confirmation', description: 'Préparation au sacrement', icon: Sparkles },
    ]
  },
  mouvements: {
    title: 'Mouvements de Jeunesse',
    subtitle: 'Scouts, MEJ, Patronage',
    description: 'Activités, partage et service dans un esprit chrétien.',
    icon: Compass,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/4ufmdwhr_Mouvements.png',
    items: [
      { title: 'Scouts et Guides de France', description: 'Activités de plein air, camps, service', icon: Tent },
      { title: 'MEJ', description: 'Mouvement Eucharistique des Jeunes', icon: Heart },
      { title: 'Patronage', description: 'Activités ludiques et sportives', icon: Smile },
    ]
  },
  servants: {
    title: 'Servants d\'autel & Vocations',
    subtitle: 'Service liturgique',
    description: 'Se mettre au service de la liturgie et répondre à l\'appel.',
    icon: Cross,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/vz77gtcm_Servants-vocations.png',
    items: [
      { title: 'Servants d\'autel', description: 'Service à l\'autel pendant la messe', icon: Star },
      { title: 'Formation', description: 'Apprentissage du service liturgique', icon: BookOpen },
      { title: 'Accompagnement vocations', description: 'Discernement et accompagnement', icon: Lightbulb },
    ]
  },
  mariage: {
    title: 'Le Mariage',
    subtitle: 'Préparation & célébration',
    description: 'S\'engager dans l\'amour et la fidélité, soutenu par la grâce de Dieu.',
    icon: Heart,
    items: [
      { title: 'Préparation au mariage', description: 'Parcours avec couples accompagnateurs', icon: HeartHandshake },
      { title: 'Équipes Notre-Dame', description: 'Spiritualité conjugale', icon: Users },
      { title: 'Cana', description: 'Formation à la vie de couple', icon: Heart },
      { title: 'Session CPM', description: 'Centre de Préparation au Mariage', icon: CalendarHeart },
    ]
  },
  liturgie: {
    title: 'Liturgie & Musique',
    subtitle: 'Chorale, Art Floral, Sacristains',
    description: 'Embellir les célébrations par le chant, la musique et l\'art floral.',
    icon: Music,
    heroImage: 'https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/svoox7vw_Liturgie-musique.png',
    items: [
      { title: 'Chorale paroissiale', description: 'Chants et musique liturgique', icon: Mic },
      { title: 'Art Floral', description: 'Fleurir l\'église avec beauté', icon: Flower2 },
      { title: 'Sacristains', description: 'Service discret et essentiel', icon: Cross },
      { title: 'Lecteurs', description: 'Proclamer la Parole de Dieu', icon: BookOpen },
    ]
  },
  funerailles: {
    title: 'Funérailles',
    subtitle: 'Accompagnement des familles',
    description: 'Accompagner les familles en deuil avec compassion et espérance.',
    icon: Cross,
    heroImage: 'https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/m6yxyydm_Funerailles.png',
    items: [
      { title: 'Équipe funérailles', description: 'Préparation de la célébration', icon: Users },
      { title: 'Accompagnement du deuil', description: 'Soutien et écoute', icon: Heart },
      { title: 'Messes anniversaire', description: 'Se souvenir des défunts', icon: CalendarHeart },
    ],
    detailedContent: {
      intro: `Les obsèques ne sont pas un sacrement. Mais c'est un moment fort de prière avec la famille et les amis de la personne décédée. Il est des circonstances d'âge, de souffrances, de situations particulières de décès qui pèsent durement sur l'entourage du défunt.

L'animation de la célébration est assurée par des membres de la Communauté chrétienne catholique. Cela suppose aussi une formation des personnes. Cette formation existe au niveau diocésain. Merci à toutes les personnes du Secteur de Saint-Orens qui ont suivi et continuent à suivre cette formation.

Dans la célébration d'obsèques, nous faisons mémoire de toute la vie de la personne décédée pour laquelle nous sommes rassemblés. Nous nous unissons profondément à la douleur de toute la famille et des proches par la prière de toute l'Église.

Dans la foi en la résurrection du Christ, nous exprimons notre espérance de partager un jour, en plénitude, la vie du Christ mort et ressuscité.`,
      contact: `La famille est invitée à prendre contact, le plus tôt possible, avec l'équipe des funérailles de son secteur (numéro de mobile ci-dessous) ou indirectement par les pompes funèbres. Ainsi le jour et l'heure possibles pour la célébration à l'église pourront être fixés en concertation. Si la famille souhaite une eucharistie, elle est invitée à prendre contact très rapidement avec le prêtre.`,
      equipeTitle: 'L\'équipe liturgique se charge…',
      equipeTasks: [
        'de visiter la famille pour une prière à la maison',
        'de retracer les faits importants de la vie familiale, professionnelle ou associative du défunt (normalement au cours de la visite préalable)',
        'de préparer les grandes lignes de la célébration',
        'd\'inviter expressément la famille dans tous les cas à rejoindre la communauté paroissiale du secteur, pour la messe mensuelle célébrée dans une prière commune pour les défunts du mois, le premier samedi du mois suivant, à 9 h à Saint-Orens'
      ],
      important: `Pour qu'il n'y ait pas de surprise et de malentendu sur l'horaire de la célébration, il est important que la famille ou les pompes funèbres ne fixent pas le jour et l'heure des obsèques religieuses sans concertation avec l'équipe des funérailles et le prêtre.`,
      contacts: [
        { sector: 'Secteur Saint-Orens', phone: '06 04 04 15 77' },
        { sector: 'Secteur Castanet-Tolosan', phone: '06 71 15 55 14' }
      ],
      contactNote: 'Nous vous conseillons d\'utiliser ces numéros plutôt que celui du presbytère où le prêtre ne sera pas forcément présent.',
      offrande: 'Il faut prévoir une offrande à la paroisse de 180 € pour la célébration des funérailles.'
    }
  },
  alpha: {
    title: 'Parcours Alpha & Catéchuménat',
    subtitle: 'Découvrir la foi',
    description: 'Découvrir ou redécouvrir la foi chrétienne dans un esprit de partage.',
    icon: MessagesSquare,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/epf9qipp_Alpha-catechumenat.png',
    items: [
      { title: 'Parcours Alpha', description: 'Repas, vidéo, échanges conviviaux', icon: MessageCircle },
      { title: 'Catéchuménat', description: 'Pour adultes souhaitant le baptême', icon: Cross },
      { title: 'Recommençants', description: 'Renouer avec la foi', icon: Heart },
    ]
  },
  groupes: {
    title: 'Groupes de Partage',
    subtitle: 'Fraternités & groupes',
    description: 'Échanger, prier et grandir ensemble autour de la Parole.',
    icon: Users,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/i4j1hof6_Groupes-partage.png',
    items: [
      { title: 'Fraternités', description: 'Partage de la Parole et de la vie', icon: Users },
      { title: 'Groupes Pros', description: 'Foi et monde du travail', icon: Building2 },
      { title: 'Groupe Biblique', description: 'Étude approfondie de la Bible', icon: BookOpen },
      { title: 'Groupe de prière', description: 'Prière et louange', icon: Heart },
    ]
  },
  meditation: {
    title: 'Méditation Chrétienne',
    subtitle: 'Silence & prière',
    description: 'Entrer dans le silence et la prière contemplative.',
    icon: Sparkles,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/v8c5x8z1_Meditation.png',
    items: [
      { title: 'Méditation silencieuse', description: 'Temps de silence hebdomadaire', icon: Sparkles },
      { title: 'Lectio Divina', description: 'Méditation de la Parole', icon: BookOpen },
      { title: 'Adoration', description: 'Temps devant le Saint-Sacrement', icon: Star },
    ]
  },
  ressources: {
    title: 'Ressources Spirituelles',
    subtitle: 'Pour nourrir sa foi',
    description: 'Livres, médias et outils pour approfondir votre vie spirituelle.',
    icon: BookOpen,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/h90bs88d_Ressources.png',
    items: [
      { 
        title: 'Librairie religieuse', 
        description: 'Livres, chapelets, icônes', 
        icon: BookOpen,
        modalTitle: 'Siloë-Carmel : Le nouveau souffle de la librairie chrétienne',
        modalDescription: 'Bonne nouvelle pour Toulouse ! La librairie Siloë-Carmel comble enfin le manque d\'un lieu dédié à la culture catholique et chrétienne dans notre ville. Plus qu\'une simple boutique, c\'est un véritable espace de mission et d\'échange au service de tous.',
        features: [
          { title: 'Un lieu de débat', description: 'Des ouvrages variés en phase avec les orientations pastorales de notre diocèse.' },
          { title: 'Un partenaire vivant', description: 'Présence d\'auteurs, conférences et participation aux temps forts (comme le prochain rassemblement de la Pentecôte).' },
          { title: 'Une offre complémentaire', description: 'En lien fraternel avec la Maison Mathieu et l\'Artisanat Monastique pour enrichir la culture locale.' }
        ],
        quote: 'Un lieu de culture et de foi pour faire rayonner l\'Évangile au cœur de la cité.',
        horaires: 'Du mardi au vendredi de 10h à 12h30 et de 14h à 19h • Samedi de 9h à 12h30 et de 14h à 18h',
        url: 'https://librairiesiloecarmeltoulouse.com/'
      },
      { 
        title: 'Médiathèque', 
        description: 'Films, séries, revues', 
        icon: Tv,
        modalTitle: 'Médiathèque - Films, Séries & Documentaires',
        modalDescription: 'Découvrez notre sélection de films, séries et documentaires pour nourrir votre foi et votre réflexion spirituelle.',
        sections: [
          {
            title: 'Séries incontournables',
            icon: 'tv',
            items: [
              { name: 'The Chosen (Saison 5)', description: 'La série phénomène sur la vie de Jésus continue. La saison 5, centrée sur la Semaine Sainte à Jérusalem, est sortie fin 2025 et arrive sur les écrans français (CSTAR, DVD). C\'est l\'outil d\'évangélisation n°1 actuel.' },
              { name: 'Testament : L\'histoire de Moïse', description: 'Netflix, 2024 - Une mini-série documentaire et dramatique qui retrace la vie du prophète avec un regard historique et spirituel.' },
              { name: 'House of David', description: '2025 - Une nouvelle série épique retraçant l\'ascension du roi David, produite par Jon Erwin.' }
            ]
          },
          {
            title: 'Films récents & à venir (2025-2026)',
            icon: 'film',
            items: [
              { name: 'David', description: 'Sortie France : 18 mars 2026 - Un film d\'animation épique d\'Angel Studios (ceux qui ont fait The Chosen). Un projet magnifique sur la vie du jeune berger devenu roi.' },
              { name: 'Je suis l\'Immaculée Conception', description: 'Sortie : 8 décembre 2025 - Un film de Saje Distribution parfait pour les fêtes de fin d\'année, revenant sur le message de Lourdes.' },
              { name: 'Nefarious', description: 'Sortie France : 28 mars 2025 - Un thriller spirituel percutant sur le combat entre le bien et le mal, sous la forme d\'un face-à-face entre un psychiatre et un condamné à mort possédé.' },
              { name: 'Sacré Cœur', description: '2025 - Un film dédié à la dévotion au Cœur de Jésus, actuellement mis en avant dans les réseaux de distribution chrétiens.' }
            ]
          },
          {
            title: 'Documentaires & Cinéma d\'auteur',
            icon: 'award',
            items: [
              { name: 'Les 21 : La puissance de la foi', description: 'Prix Père Jacques Hamel 2025 - Un documentaire bouleversant sur le courage des 21 martyrs coptes en Libye.' },
              { name: 'Sacerdoce', description: '2023/2024 - Un documentaire magnifique de Damien Boyer qui suit cinq prêtres dans leur quotidien. Idéal pour parler des vocations.' },
              { name: 'L\'Évangile de la Révolution', description: 'Prix "Croire au cinéma" 2026 - Une œuvre remarquée pour son approche humaniste et spirituelle.' }
            ]
          }
        ]
      },
      { 
        title: 'Sites recommandés', 
        description: 'Ressources en ligne', 
        icon: Globe,
        modalDescription: 'Une sélection de sites web de qualité pour accompagner votre cheminement spirituel et celui de votre famille.',
        items: [
          {
            name: 'Théobule',
            subtitle: 'Le chouchou des enfants (et des parents)',
            concept: 'Des vidéos courtes où des enfants commentent la Parole de Dieu, complétées par des dessins animés sur les textes bibliques.',
            why: 'C\'est très bien produit, joyeux, et visuellement très propre. C\'est parfait pour l\'éveil à la foi et le primaire.',
            url: 'https://www.theobule.org'
          },
          {
            name: 'KT42',
            subtitle: 'La "caverne d\'Alibaba" des catéchistes',
            concept: 'Un blog immense qui répertorie des milliers de ressources (jeux, montages vidéo, textes, bricolages).',
            why: 'C\'est ultra-complet. C\'est la boîte à outils idéale pour les animateurs de Catéchisme et d\'Aumônerie.',
            url: 'https://www.kt42.fr'
          },
          {
            name: 'Idées-KT',
            subtitle: 'L\'approche ludique et créative',
            concept: 'Des propositions très concrètes pour "faire" du KT autrement : jeux de l\'oie bibliques, escape games spi, bricolages.',
            why: 'Très utile pour les Mouvements de jeunesse ou le Patronage.',
            url: 'https://www.idees-kt.fr'
          },
          {
            name: 'SNCC',
            subtitle: 'La référence officielle',
            concept: 'Le site du Service National de la Catéchèse et du Catéchuménat de la Conférence des Évêques de France.',
            why: 'Pour le Catéchuménat des adultes. C\'est ici que vous trouverez les orientations officielles et des articles de fond très sérieux.',
            url: 'https://catechese.catholique.fr'
          },
          {
            name: 'ThéoDom',
            subtitle: 'Pour les ados et adultes (Format vidéo)',
            concept: 'Des mini-séries de vidéos de 5 minutes pour expliquer les grands concepts de la foi (Le Credo, les Sacrements, la Bible).',
            why: 'C\'est moderne, percutant et très bien monté. Idéal pour approfondir sa foi.',
            url: 'https://www.theodom.org'
          }
        ]
      },
      { 
        title: 'Podcasts', 
        description: 'Émissions spirituelles', 
        icon: Radio,
        modalTitle: 'Podcasts Spirituels',
        modalDescription: 'Écoutez des podcasts spirituels pour nourrir votre foi au quotidien.',
        podcasts: [
          {
            name: 'La Bible en un an',
            description: 'Le Frère Paul Adrien vous fait découvrir la Bible chaque jour.',
            url: 'https://open.spotify.com/show/0y98FVWtmiUFDw5eOMw5hI?si=fff43db9eff94ab4'
          },
          {
            name: 'PadreBlog',
            description: '3 prêtres pour vous aider à trouver la vraie vie.',
            url: 'https://open.spotify.com/show/5HOEUv0F3rc4ONsOsQ0N51?si=87c3a253304a4ef1'
          }
        ]
      },
    ]
  },
  ecoute: {
    title: 'Service d\'Écoute Louis et Zélie',
    subtitle: 'Présence bienveillante',
    description: 'Une présence bienveillante pour ceux qui traversent une épreuve.',
    icon: Heart,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/ges0bdnn_Service-ecoute.png',
    items: [
      { title: 'Écoute individuelle', description: 'Rendez-vous confidentiels', icon: UserCircle },
      { title: 'Accompagnement', description: 'Soutien dans les épreuves', icon: HeartHandshake },
      { title: 'Orientation', description: 'Vers des professionnels si besoin', icon: Compass },
    ]
  },
  malades: {
    title: 'Visite des Malades (SEM)',
    subtitle: 'Service évangélique',
    description: 'Porter la présence du Christ auprès des personnes malades et âgées.',
    icon: Stethoscope,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/b1uzu3oc_Visite-malades.png',
    items: [
      { title: 'Visites à domicile', description: 'Auprès des personnes isolées', icon: Home },
      { title: 'Visites en EHPAD', description: 'Présence en maison de retraite', icon: Building2 },
      { title: 'Communion aux malades', description: 'Porter l\'Eucharistie', icon: Heart },
      { title: 'Sacrement des malades', description: 'Sur demande', icon: Cross },
    ]
  },
  entraide: {
    title: 'Entraide et Solidarité',
    subtitle: 'Vivre la charité',
    description: 'Vivre la charité du Christ au service des plus fragiles.',
    icon: HandHeart,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/qcuurzop_Entraide.png',
    heroPosition: 'object-top',
    items: [
      { title: 'Secours Catholique', description: 'Aide matérielle et accompagnement', icon: HandHeart },
      { title: 'Café Amitié', description: 'Lieu de rencontre convivial', icon: Coffee },
      { title: 'Hospitalité de Lourdes', description: 'Pèlerinages pour personnes malades', icon: Palmtree },
      { title: 'Famille Bartimée', description: 'Accompagnement des personnes handicapées', icon: HeartHandshake },
      { title: 'Lourdes Cancer Espérance', description: 'Soutien aux malades du cancer', icon: Heart },
    ]
  },
  'equipe-detail': {
    title: 'Détail membre',
    subtitle: '',
    description: '',
    icon: Users,
    items: []
  },
  'clocher-detail': {
    title: 'Détail clocher',
    subtitle: '',
    description: '',
    icon: Church,
    items: []
  }
};

const ContentPage = ({ section }) => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const config = contentConfig[section];

  if (!config) {
    return (
      <div className="min-h-screen bg-paper py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-slate-deep mb-4">Page en construction</h1>
          <Link to="/" className="text-gold hover:text-gold-dark">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-paper" data-testid={`content-page-${section}`}>
      {/* Hero Section - if heroImage exists */}
      {config.heroImage && (
        <section className="relative h-[55vh] flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={config.heroImage}
              alt={config.title}
              className={`w-full h-full object-cover ${config.heroPosition || 'object-center'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
          </div>

          {/* Content - with padding to avoid search button overlap */}
          <div className="relative z-10 text-center text-white px-4 pt-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
              {config.title}
            </h1>
            {config.subtitle && (
              <p className="text-gold-light font-medium mb-4 text-lg">{config.subtitle}</p>
            )}
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              {config.description}
            </p>
          </div>

        <SocialIcons />
      </section>
      )}

      {/* Scroll to Agenda Button - Only for funerailles */}
      {section === 'funerailles' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 relative z-20">
          <div className="flex justify-center">
            <button
              onClick={() => {
                const agendaSection = document.getElementById('funerals-agenda');
                if (agendaSection) {
                  agendaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <CalendarHeart className="w-5 h-5 mr-2" />
              Voir l'agenda des cérémonies
            </button>
          </div>
        </div>
      )}

      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${section === 'funerailles' ? 'py-8' : 'py-16'}`}>
        {/* Header - only if no hero image */}
        {!config.heroImage && (
          <div className="text-center mb-14">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-lg">
              <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-slate-deep mb-3">
            {config.title}
          </h1>
          {config.subtitle && (
            <p className="text-gold font-medium mb-4">{config.subtitle}</p>
          )}
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            {config.description}
          </p>
        </div>
        )}

        {/* Items Grid - Vignettes avec icônes */}
        {config.items && config.items.length > 0 && (
          <>
            {/* Special layout for entraide section (5 items: 3 + 2 centered) */}
            {section === 'entraide' ? (
              <>
                {/* First row: 3 items */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {config.items.slice(0, 3).map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={index}
                        className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-slate-100 hover:border-gold/30 transition-all duration-300"
                        data-testid={`item-card-${index}`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                            <ItemIcon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-lg text-slate-deep mb-1 group-hover:text-gold transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Second row: 2 items centered */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12 lg:max-w-3xl lg:mx-auto">
                  {config.items.slice(3, 5).map((item, idx) => {
                    const index = idx + 3;
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={index}
                        className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-slate-100 hover:border-gold/30 transition-all duration-300"
                        data-testid={`item-card-${index}`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                            <ItemIcon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-lg text-slate-deep mb-1 group-hover:text-gold transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Standard layout for other sections */
              <div className={`grid grid-cols-2 ${
                ['liturgie', 'eveil', 'catechisme', 'aumonerie', 'groupes', 'ressources', 'malades'].includes(section) 
                  ? 'sm:grid-cols-2 lg:grid-cols-4' 
                  : 'sm:grid-cols-2 lg:grid-cols-3'
              } gap-6 mb-12`}>
            {config.items.map((item, index) => {
              const ItemIcon = item.icon;
              const isClickable = section === 'ressources';
              
              const cardContent = (
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <ItemIcon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg text-slate-deep mb-1 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );

              if (isClickable) {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedResource(item);
                      setIsModalOpen(true);
                    }}
                    className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-slate-100 hover:border-gold/30 transition-all duration-300 text-left w-full cursor-pointer"
                    data-testid={`item-card-${index}`}
                  >
                    {cardContent}
                  </button>
                );
              }

              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-slate-100 hover:border-gold/30 transition-all duration-300"
                  data-testid={`item-card-${index}`}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
            )}
          </>
        )}

        {/* Detailed Content Section - for pages with detailed content like funerailles */}
        {config.detailedContent && (
          <div className="mb-12 space-y-8">
            {/* Phone Contacts - First */}
            {config.detailedContent.contacts && (
              <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-xl p-8 border border-gold/20">
                <h3 className="font-serif text-xl text-slate-deep mb-6 text-center">
                  Numéros de contact pour les obsèques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {config.detailedContent.contacts.map((contact, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-6 text-center shadow-sm">
                      <p className="font-medium text-slate-deep mb-2">{contact.sector}</p>
                      <a 
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className="text-gold hover:text-gold-dark text-lg font-semibold flex items-center justify-center gap-2"
                      >
                        <Phone className="w-5 h-5" />
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
                {config.detailedContent.contactNote && (
                  <p className="text-slate-600 text-sm text-center italic">
                    {config.detailedContent.contactNote}
                  </p>
                )}
              </div>
            )}

            {/* Offrande - After contacts */}
            {config.detailedContent.offrande && (
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
                <p className="text-slate-700 font-medium">
                  {config.detailedContent.offrande}
                </p>
              </div>
            )}

            {/* Introduction */}
            {config.detailedContent.intro && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
                <div className="prose prose-slate max-w-none">
                  {config.detailedContent.intro.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-slate-600 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            {config.detailedContent.contact && (
              <div className="bg-gold/5 rounded-xl p-8 border border-gold/20">
                <p className="text-slate-700 leading-relaxed">
                  {config.detailedContent.contact}
                </p>
              </div>
            )}

            {/* Equipe Tasks */}
            {config.detailedContent.equipeTitle && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
                <h3 className="font-serif text-xl text-slate-deep mb-4">
                  {config.detailedContent.equipeTitle}
                </h3>
                <ul className="space-y-3">
                  {config.detailedContent.equipeTasks.map((task, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gold mr-3 mt-1">•</span>
                      <span className="text-slate-600">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Important Notice */}
            {config.detailedContent.important && (
              <div className="bg-amber-50 rounded-xl p-8 border border-amber-200">
                <div className="flex items-start">
                  <span className="text-amber-600 text-xl mr-3">⚠️</span>
                  <p className="text-amber-800 leading-relaxed">
                    {config.detailedContent.important}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Funerals Agenda - Only for funerailles section */}
        {section === 'funerailles' && (
          <div className="mb-16">
            <h2 id="funerals-agenda" className="font-serif text-3xl text-slate-deep mb-6 text-center">Agenda des célébrations</h2>
            <FuneralsAgenda />
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center mb-16">
          <h2 className="font-serif text-2xl text-slate-deep mb-4">Vous souhaitez en savoir plus ?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Contactez le secrétariat paroissial pour toute information complémentaire ou pour rejoindre une équipe.
          </p>
          <Link
            to="/secretariat"
            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            Contacter le secrétariat
          </Link>
        </div>

        {/* Citation biblique */}
        {biblicalQuotes[section] && (
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
            <blockquote className="font-serif text-2xl text-slate-deep italic mb-4">
              "{biblicalQuotes[section].quote}"
            </blockquote>
            <p className="text-gold font-medium">{biblicalQuotes[section].reference}</p>
          </div>
        )}
      </div>

      {/* Resource Modal */}
      <ResourceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedResource(null);
        }}
        resource={selectedResource}
      />
    </div>
  );
};

export default ContentPage;
