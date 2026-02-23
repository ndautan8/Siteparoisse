import { MapPin, Phone, Mail, Clock, Home } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';

const Secretariat = () => {
  return (
    <div className="min-h-screen bg-paper" data-testid="secretariat-page">
      {/* Hero Section with Image */}
      <section className="relative h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/03c30vdd_Secretariat.png"
            alt="Secrétariat"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <SocialIcons />

        {/* Content - with padding to avoid search button overlap */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Home className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Secrétariat & Contact
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Nous sommes à votre écoute pour toute demande ou renseignement
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-start space-x-4">
              <div className="bg-gold/10 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-medium text-slate-deep mb-2">Adresse</h3>
                <p className="text-slate-600">
                  Paroisse Notre Dame d'Autan<br />
                  Place de l'Église<br />
                  31320 Castanet-Tolosan
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-start space-x-4">
              <div className="bg-gold/10 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-medium text-slate-deep mb-2">Téléphone</h3>
                <p className="text-slate-600">05 XX XX XX XX</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-start space-x-4">
              <div className="bg-gold/10 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-medium text-slate-deep mb-2">Email</h3>
                <a href="mailto:contact@notredamedautan.fr" className="text-gold hover:text-gold-dark transition-colors">
                  contact@notredamedautan.fr
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-start space-x-4">
              <div className="bg-gold/10 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-medium text-slate-deep mb-2">Horaires d'ouverture</h3>
                <p className="text-slate-600">
                  Mardi au Vendredi<br />
                  9h00 - 12h00 / 14h00 - 17h00
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <h2 className="font-serif text-2xl md:text-3xl text-slate-deep mb-6">Nous contacter</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  data-testid="contact-email-input"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea
                rows="5"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                data-testid="contact-message-input"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-lg font-medium transition-colors"
              data-testid="contact-submit-button"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </div>

      {/* Citation biblique */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep italic mb-4">
            "Quoi que vous fassiez, faites-le de tout votre cœur, comme pour le Seigneur."
          </blockquote>
          <p className="text-gold font-medium">Colossiens 3, 23</p>
        </div>
      </div>
    </div>
  );
};

export default Secretariat;