import { Link } from 'react-router-dom';
import { Building2, Heart, FileText, Users, Wrench } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';

const VieEconomiquePage = () => {
  return (
    <div className="min-h-screen bg-paper" data-testid="vie-economique-page">
      {/* Hero Section with Image */}
      <section className="relative h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
            alt="Vie Économique"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Building2 className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Vie Économique
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">Transparence et responsabilité</p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Une gestion financière au service de la mission de l'Église
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Section principale: Soutenir la paroisse - MISE EN VALEUR */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-slate-deep mb-4">Soutenir la paroisse</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Votre générosité permet à notre communauté de poursuivre sa mission d'évangélisation et de service
            </p>
          </div>

          {/* Cartes Donner - Grid 2 colonnes */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
            {/* Denier de l'Église */}
            <div className="bg-gradient-to-br from-gold/20 to-gold/10 rounded-2xl p-8 border-2 border-gold shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-serif text-2xl text-slate-deep mb-3 text-center">Denier de l'Église</h3>
              <p className="text-slate-600 text-center mb-6 leading-relaxed">
                Contribution annuelle essentielle pour la vie et la mission de l'Église. 
                Le Denier permet de financer les salaires des prêtres, la formation des séminaristes et les œuvres pastorales.
              </p>
              <div className="text-center">
                <a
                  href="https://donner.catholique.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Faire un don en ligne
                </a>
              </div>
            </div>

            {/* Legs et Donations */}
            <div className="bg-gradient-to-br from-gold/20 to-gold/10 rounded-2xl p-8 border-2 border-gold shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-serif text-2xl text-slate-deep mb-3 text-center">Legs et Donations</h3>
              <p className="text-slate-600 text-center mb-6 leading-relaxed">
                Transmettre votre patrimoine à l'Église est un acte de foi et de générosité qui permet de soutenir 
                durablement la mission évangélisatrice et les œuvres caritatives.
              </p>
              <div className="text-center">
                <Link
                  to="/secretariat"
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>

          {/* Info complémentaire */}
          <div className="bg-white rounded-xl p-6 border border-gold/20 text-center">
            <p className="text-slate-600 text-sm">
              💡 <strong>Avantage fiscal :</strong> Vos dons au Denier de l'Église ouvrent droit à une réduction d'impôt de 66% 
              (dans la limite de 20% du revenu imposable).
            </p>
          </div>
        </div>

        {/* Section secondaire: Comprendre le fonctionnement */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-slate-deep mb-4">Comprendre le fonctionnement</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Transparence et engagement au service de la communauté paroissiale
            </p>
          </div>

          {/* Cartes Fonctionnement - Grid 2 colonnes */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {/* Conseil des Finances */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-gold" strokeWidth={1.5} />
              </div>
              <span className="text-gold text-sm font-medium mb-1">Gestion financière</span>
              <h3 className="font-serif text-xl text-slate-deep mb-3">Conseil des Finances</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Composé de bénévoles, le conseil des finances accompagne le curé dans la gestion financière de la paroisse. 
                Il veille à la transparence des comptes et à l'utilisation responsable des ressources.
              </p>
            </div>

            {/* Commission Travaux */}
            <div className="bg-gold/5 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-gold/20 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7 text-gold" strokeWidth={1.5} />
              </div>
              <span className="text-gold text-sm font-medium mb-1">Entretien du patrimoine</span>
              <h3 className="font-serif text-xl text-slate-deep mb-3">Commission Travaux</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cette commission coordonne les travaux d'entretien et de rénovation de nos 16 églises et bâtiments paroissiaux. 
                Elle assure la préservation de notre patrimoine architectural et cultuel.
              </p>
            </div>
          </div>
        </div>

        {/* Citation biblique */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep italic mb-4">
            "Que chacun donne comme il a résolu en son cœur, sans tristesse ni contrainte, car Dieu aime celui qui donne avec joie."
          </blockquote>
          <p className="text-gold font-medium">2 Corinthiens 9, 7</p>
        </div>
      </div>
    </div>
  );
};

export default VieEconomiquePage;
