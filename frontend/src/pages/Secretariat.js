import { MapPin, Phone, Mail, Clock, Home, User } from 'lucide-react';
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Introduction - Corinne */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 mb-12">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-gold/10 p-3 rounded-lg">
              <User className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-deep mb-4">Votre accueil au secrétariat</h2>
            </div>
          </div>
          <div className="text-slate-600 space-y-4 leading-relaxed">
            <p>
              <strong className="text-slate-deep">Corinne</strong> vous accueille et reçoit vos demandes concernant les sacrements, 
              prises de rendez-vous avec un prêtre, certificats de baptême ou de confirmation, les intentions de messes.
            </p>
            <p>
              Elle peut aussi vous renseigner sur la vie de la paroisse, vous mettre en relation avec les différents 
              services qui l'animent.
            </p>
            <p className="font-medium text-slate-deep">
              N'hésitez donc pas à lui téléphoner ou à venir la rencontrer pendant ses permanences.
            </p>
          </div>
        </div>

        {/* Two Parish Centers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Centre paroissial de Saint-Orens */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            <h3 className="font-serif text-xl text-slate-deep mb-6 pb-3 border-b border-slate-100">
              Centre paroissial de Saint-Orens
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-2.5 rounded-lg flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Téléphone</p>
                  <a href="tel:0561005169" className="text-slate-deep font-medium hover:text-gold transition-colors">
                    05 61 00 51 69
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-2.5 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Adresse</p>
                  <a
                    href="https://maps.google.com/?q=Place+du+Souvenir+31650+Saint-Orens-de-Gameville"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-gold transition-colors underline decoration-dotted underline-offset-2"
                  >
                    Place du Souvenir<br />
                    (derrière l'église)<br />
                    31650 Saint-Orens-de-Gameville
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-2.5 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">Horaires de permanence</p>
                  <ul className="text-slate-600 space-y-1">
                    <li><span className="font-medium text-slate-deep">Lundi :</span> 9h30 – 12h</li>
                    <li><span className="font-medium text-slate-deep">Mardi :</span> 9h30 – 12h</li>
                    <li><span className="font-medium text-slate-deep">Jeudi :</span> 16h30 – 19h</li>
                    <li><span className="font-medium text-slate-deep">Vendredi :</span> 9h30 – 12h</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Centre paroissial de Castanet */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            <h3 className="font-serif text-xl text-slate-deep mb-6 pb-3 border-b border-slate-100">
              Centre paroissial de Castanet
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-2.5 rounded-lg flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Téléphone</p>
                  <a href="tel:0561277685" className="text-slate-deep font-medium hover:text-gold transition-colors">
                    05 61 27 76 85
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-2.5 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Adresse</p>
                  <a
                    href="https://maps.google.com/?q=14bis+rue+Louis+Canitrot+31320+Castanet-Tolosan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-gold transition-colors underline decoration-dotted underline-offset-2"
                  >
                    14bis rue Louis Canitrot<br />
                    31320 Castanet-Tolosan
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-2.5 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">Horaires de permanence</p>
                  <ul className="text-slate-600 space-y-1">
                    <li><span className="font-medium text-slate-deep">Lundi :</span> 14h – 16h30</li>
                    <li><span className="font-medium text-slate-deep">Mardi :</span> 14h – 16h30</li>
                    <li><span className="font-medium text-slate-deep">Jeudi :</span> 10h – 12h30</li>
                    <li><span className="font-medium text-slate-deep">Vendredi :</span> 13h30 – 16h</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Contact */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 mb-12">
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-gold/10 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-gold" />
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-1">Vous pouvez également nous contacter par email</p>
              <a 
                href="mailto:contact@notredamedautan.fr" 
                className="text-lg font-medium text-gold hover:text-gold-dark transition-colors"
                data-testid="contact-email-link"
              >
                contact@notredamedautan.fr
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <h2 className="font-serif text-2xl md:text-3xl text-slate-deep mb-6">Nous écrire</h2>
          <form className="space-y-6" data-testid="contact-form">
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Sujet</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                data-testid="contact-subject-input"
              />
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
