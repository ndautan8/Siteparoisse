import { X, ExternalLink, Clock } from 'lucide-react';
import { useEffect } from 'react';

const ResourceModal = ({ isOpen, onClose, resource }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/30" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gold/20 p-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              {resource.icon && <resource.icon className="w-6 h-6 text-gold" />}
            </div>
            <h2 className="font-serif text-2xl text-slate-deep">{resource.modalTitle || resource.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {resource.modalDescription && (
            <div className="text-slate-600 leading-relaxed">
              {resource.modalDescription}
            </div>
          )}

          {/* Features list (for librairie, etc.) */}
          {resource.features && resource.features.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-slate-deep">Ce que vous y trouverez :</h3>
              {resource.features.map((feature, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-deep mb-1">{feature.title}</h4>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Quote */}
          {resource.quote && (
            <blockquote className="border-l-4 border-gold pl-4 py-2 italic text-slate-600 bg-gold/5 rounded-r-lg">
              "{resource.quote}"
            </blockquote>
          )}

          {/* Horaires */}
          {resource.horaires && (
            <div className="flex items-start space-x-3 bg-slate-50 rounded-xl p-4">
              <Clock className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-deep mb-1">Horaires d'ouverture</h4>
                <p className="text-sm text-slate-600">{resource.horaires}</p>
              </div>
            </div>
          )}

          {/* Items list (for sites recommandés) */}
          {resource.items && resource.items.length > 0 && (
            <div className="space-y-4">
              {resource.items.map((item, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                  <h3 className="font-serif text-lg text-slate-deep mb-2">{item.name}</h3>
                  {item.subtitle && (
                    <p className="text-sm text-gold font-medium mb-2">{item.subtitle}</p>
                  )}
                  {item.concept && (
                    <p className="text-sm text-slate-600 mb-2">
                      <strong>Le concept :</strong> {item.concept}
                    </p>
                  )}
                  {item.why && (
                    <p className="text-sm text-slate-600 mb-3">
                      <strong>Pourquoi l'aimer :</strong> {item.why}
                    </p>
                  )}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gold hover:text-gold-dark text-sm font-medium transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      {item.url.replace('https://', '').replace('http://', '')}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Single link */}
          {resource.url && !resource.items && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Visiter le site
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full font-medium transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
