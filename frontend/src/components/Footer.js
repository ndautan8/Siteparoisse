import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="font-serif text-xl text-white mb-4">Notre Dame d'Autan</h3>
            <p className="text-sm leading-relaxed mb-4">
              Une paroisse vivante au service de la foi et de la fraternité.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/p/Paroisse-de-Castanet-Tolosan-100070274408625/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                data-testid="footer-facebook-link"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/paroisses.saint.orens.castanet?igsh=OTYycjhmZ2UzbWVt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                data-testid="footer-instagram-link"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-white mb-4">Accès rapide</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/horaires-messes" className="hover:text-gold transition-colors">
                  Horaires des messes
                </Link>
              </li>
              <li>
                <Link to="/secretariat" className="hover:text-gold transition-colors">
                  Secrétariat
                </Link>
              </li>
              <li>
                <Link to="/demander-sacrement" className="hover:text-gold transition-colors">
                  Demander un sacrement
                </Link>
              </li>
              <li>
                <Link to="/mariage" className="hover:text-gold transition-colors">
                  Le Mariage
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Paroisse Notre Dame d'Autan<br />Castanet-Tolosan</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>05 XX XX XX XX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@notredamedautan.fr" className="hover:text-gold transition-colors">
                  contact@notredamedautan.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium text-white mb-4">Newsletter</h4>
            <p className="text-sm mb-4">
              Restez informé de nos actualités et événements
            </p>
            <a
              href="#newsletter"
              className="inline-block bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-md transition-colors text-sm font-medium"
              data-testid="newsletter-subscribe-button"
            >
              S'inscrire
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Paroisse Notre Dame d'Autan. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};