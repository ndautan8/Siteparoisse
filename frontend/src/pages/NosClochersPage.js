import { Link } from 'react-router-dom';
import { Church, MapPin, Map } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';
import { clochersListData, clochersData } from '@/data/clochersData';
import ClochersMap from '@/components/ClochersMap';

const NosClochersPage = () => {
  return (
    <div className="min-h-screen bg-paper" data-testid="nos-clochers-page">
      {/* Hero Section with Image */}
      <section className="relative h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://customer-assets.emergentagent.com/job_c3efae68-56d0-4924-8ecf-4f7502ce3630/artifacts/54f2vm3r_Eglise-Castanet-Tolosan.jpg"
            alt="Nos Clochers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <SocialIcons />

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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {clochersListData.map((clocher) => (
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

        {/* Interactive Map Section */}
        <section className="mb-12" data-testid="map-all-churches">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center">
                  <Map className="w-6 h-6 text-gold mr-3" />
                  <div>
                    <h2 className="font-serif text-xl text-slate-deep">Carte des 16 clochers</h2>
                    <p className="text-slate-500 text-sm">Cliquez sur une église dans la liste pour voir sa fiche</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map with all churches */}
            <div className="h-[500px] w-full relative">
              {/* Google Maps with search showing parish area */}
              <iframe
                title="Carte des églises de Notre Dame d'Autan"
                src="https://maps.google.com/maps?q=Paroisse+Notre+Dame+d'Autan,+Castanet-Tolosan,+France&z=11&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full"
              ></iframe>
              {/* Overlay with church list */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 max-h-[460px] overflow-y-auto w-72 hidden lg:block">
                <h3 className="font-serif text-sm font-medium text-slate-deep mb-3 sticky top-0 bg-white/95 pb-2 border-b">
                  Nos 16 clochers
                </h3>
                <div className="space-y-1">
                  {Object.values(clochersData).map((clocher, index) => (
                    <Link
                      key={clocher.id}
                      to={`/nos-clochers/${clocher.id}`}
                      className="flex items-start gap-2 p-2 rounded-lg hover:bg-gold/10 transition-colors group"
                    >
                      <span className="w-5 h-5 rounded-full bg-gold text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-deep group-hover:text-gold truncate">
                          {clocher.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{clocher.churchName}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

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

      {/* Citation biblique */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep italic mb-4">
            "Vous êtes le corps du Christ, et vous êtes ses membres, chacun pour sa part."
          </blockquote>
          <p className="text-gold font-medium">1 Corinthiens 12, 27</p>
        </div>
      </div>
    </div>
  );
};

export default NosClochersPage;
