import { Link } from 'react-router-dom';
import { Church, MapPin } from 'lucide-react';

const clochers = [
  {
    id: 'auzeville-tolosane',
    name: 'Auzeville-Tolosane',
    description: 'Église paroissiale au cœur du village',
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=400'
  },
  {
    id: 'auzielle',
    name: 'Auzielle',
    description: 'Chapelle historique du XIIe siècle',
    image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400'
  },
  {
    id: 'belberaud',
    name: 'Belberaud',
    description: 'Église romane au patrimoine remarquable',
    image: 'https://images.unsplash.com/photo-1508669232496-137b159c1cdb?w=400'
  },
  {
    id: 'castanet-tolosan',
    name: 'Castanet-Tolosan',
    description: 'Église principale de Notre Dame d\'Autan',
    image: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=400'
  },
  {
    id: 'corronsac',
    name: 'Corronsac',
    description: 'Petite église de charme au cadre paisible',
    image: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?w=400'
  },
  {
    id: 'deyme',
    name: 'Deyme',
    description: 'Église villageoise accueillante',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'
  },
  {
    id: 'escalquens',
    name: 'Escalquens',
    description: 'Belle église au clocher caractéristique',
    image: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=400'
  },
  {
    id: 'labege',
    name: 'Labège',
    description: 'Église moderne et dynamique',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400'
  },
  {
    id: 'lauzerville',
    name: 'Lauzerville',
    description: 'Chapelle rurale au charme authentique',
    image: 'https://images.unsplash.com/photo-1504697570352-47c3bbc60b1a?w=400'
  },
  {
    id: 'mervilla',
    name: 'Mervilla',
    description: 'Petite église au cœur de la campagne',
    image: 'https://images.unsplash.com/photo-1517638851339-a711cfcf3279?w=400'
  },
  {
    id: 'odars',
    name: 'Odars',
    description: 'Église pittoresque avec vue panoramique',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400'
  },
  {
    id: 'pechabou',
    name: 'Pechabou',
    description: 'Église au patrimoine préservé',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400'
  },
  {
    id: 'pompertuzat',
    name: 'Pompertuzat',
    description: 'Belle église avec son clocher-mur',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400'
  },
  {
    id: 'rebigue',
    name: 'Rebigue',
    description: 'Chapelle intimiste et recueillie',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  },
  {
    id: 'saint-orens-gameville',
    name: 'Saint-Orens-de-Gameville',
    description: 'Église paroissiale principale',
    image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400'
  },
  {
    id: 'saint-orens-catala',
    name: 'Saint-Orens (Catala)',
    description: 'Chapelle Notre-Dame de Catala',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400'
  }
];

const NosClochersPage = () => {
  return (
    <div className="min-h-screen bg-paper" data-testid="nos-clochers-page">
      {/* Hero Section with Image */}
      <section className="relative h-[50vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://customer-assets.emergentagent.com/job_c3efae68-56d0-4924-8ecf-4f7502ce3630/artifacts/54f2vm3r_Eglise-Castanet-Tolosan.jpg"
            alt="Nos Clochers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        {/* Content - with padding to avoid search button overlap */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Church className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Nos Clochers
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">16 églises et chapelles à découvrir</p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Notre paroisse Notre Dame d'Autan regroupe 16 clochers, témoins de la foi de nos communautés
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Churches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {clochers.map((clocher) => (
            <Link
              key={clocher.id}
              to={`/nos-clochers/${clocher.id}`}
              className="group"
              data-testid={`clocher-card-${clocher.id}`}
            >
              <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 h-full border border-slate-100">
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={clocher.image}
                    alt={clocher.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center text-white text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{clocher.name}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-serif text-lg text-slate-deep mb-1 group-hover:text-gold transition-colors">
                    {clocher.name}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{clocher.description}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-2xl text-slate-deep mb-4">Un patrimoine vivant</h2>
              <p className="text-slate-600 mb-4">
                Chaque clocher de notre paroisse possède son histoire, son architecture et sa communauté. 
                Ces édifices sont les témoins de la foi de nos ancêtres et continuent d'accueillir 
                les célébrations et les moments forts de la vie chrétienne.
              </p>
              <p className="text-slate-600">
                Cliquez sur chaque église pour découvrir son histoire, ses horaires de messe et ses particularités.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-serif text-xl text-slate-deep mb-3">Horaires des messes</h3>
              <p className="text-slate-600 text-sm mb-4">
                Les messes sont célébrées dans différentes églises selon un planning établi.
              </p>
              <Link
                to="/horaires-messes"
                className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Voir les horaires
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NosClochersPage;
