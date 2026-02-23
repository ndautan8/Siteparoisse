import { X, ExternalLink, Clock, Tv, Film, Award, Headphones, Phone, MapPin, Users, Calendar, Heart, Church, Lightbulb, Quote, CheckCircle2, HandHeart, BookOpen, Info, Star } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  // Helper function to get section icon
  const getSectionIcon = (iconName) => {
    switch(iconName) {
      case 'tv': return Tv;
      case 'film': return Film;
      case 'award': return Award;
      default: return Film;
    }
  };

  // Check if this is an entraide content
  const entraideContent = resource.entraideContent;
  
  // Check if this is an alpha content
  const alphaContent = resource.alphaContent;
  
  // Check if this is a groupe content
  const groupeContent = resource.groupeContent;
  
  // Check if this is a meditation content
  const meditationContent = resource.meditationContent;

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

          {/* Sections (for médiathèque with series, films, docs) */}
          {resource.sections && resource.sections.length > 0 && (
            <div className="space-y-6">
              {resource.sections.map((section, sectionIndex) => {
                const SectionIcon = getSectionIcon(section.icon);
                return (
                  <div key={sectionIndex} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <SectionIcon className="w-5 h-5 text-gold" />
                      <h3 className="font-serif text-lg text-slate-deep">{section.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                          <h4 className="font-semibold text-slate-deep mb-1">{item.name}</h4>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
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

          {/* Alpha Content (for parcours alpha, catéchuménat, recommençants) */}
          {alphaContent && (
            <div className="space-y-5">
              {/* Format */}
              {alphaContent.format && (
                <div className="bg-slate-50 rounded-xl p-5">
                  <p className="text-slate-600 leading-relaxed">{alphaContent.format}</p>
                </div>
              )}

              {/* Pour qui */}
              {alphaContent.pour_qui && (
                <div className="bg-gold/5 rounded-xl p-5 border border-gold/20">
                  <h4 className="font-semibold text-slate-deep mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gold" />
                    Pour qui ?
                  </h4>
                  <p className="text-slate-600 leading-relaxed">{alphaContent.pour_qui}</p>
                </div>
              )}

              {/* Contact */}
              {alphaContent.contact && (
                <div className="bg-slate-50 rounded-xl p-5 flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <p className="text-slate-600">{alphaContent.contact}</p>
                </div>
              )}
            </div>
          )}

          {/* Groupe Content (for groupes de partage/prière) */}
          {groupeContent && (
            <div className="space-y-5">
              {/* Description */}
              {groupeContent.description && (
                <p className="text-slate-600 leading-relaxed">{groupeContent.description}</p>
              )}

              {/* Spiritualité */}
              {groupeContent.spiritualite && (
                <p className="text-slate-600 leading-relaxed">{groupeContent.spiritualite}</p>
              )}

              {/* Points (liste à puces) */}
              {groupeContent.points && groupeContent.points.length > 0 && (
                <ul className="space-y-2 pl-2">
                  {groupeContent.points.map((point, idx) => (
                    <li key={idx} className="text-slate-600 flex items-start">
                      <span className="text-gold mr-2 mt-1 flex-shrink-0">✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Principe */}
              {groupeContent.principe && (
                <p className="text-slate-600 leading-relaxed">{groupeContent.principe}</p>
              )}

              {/* Mission */}
              {groupeContent.mission && (
                <div className="bg-gold/5 rounded-xl p-5 border border-gold/20">
                  <p className="text-slate-deep font-medium">{groupeContent.mission}</p>
                </div>
              )}

              {/* Paragraphes supplémentaires */}
              {groupeContent.paragraphes && groupeContent.paragraphes.map((para, idx) => (
                <p key={idx} className="text-slate-600 leading-relaxed">{para}</p>
              ))}

              {/* Invitation */}
              {groupeContent.invitation && (
                <div className="bg-slate-50 rounded-xl p-5 border-l-4 border-gold">
                  <p className="text-slate-600 italic">{groupeContent.invitation}</p>
                </div>
              )}

              {/* Contact email */}
              {groupeContent.contact && (
                <div className="bg-slate-50 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-deep mb-0.5">Contact</p>
                    <a href={`mailto:${groupeContent.contact}`} className="text-gold hover:text-gold-dark font-medium transition-colors">
                      {groupeContent.contact}
                    </a>
                  </div>
                </div>
              )}

              {/* Citation unique */}
              {groupeContent.citation && (
                <blockquote className="border-l-4 border-gold pl-4 py-2 italic text-slate-600 bg-gold/5 rounded-r-lg">
                  {groupeContent.citation}
                </blockquote>
              )}

              {/* Citations multiples */}
              {groupeContent.citations && groupeContent.citations.map((cit, idx) => (
                <blockquote key={idx} className="border-l-4 border-gold pl-4 py-2 italic text-slate-600 bg-gold/5 rounded-r-lg">
                  {cit}
                </blockquote>
              ))}

              {/* Explication */}
              {groupeContent.explication && (
                <p className="text-slate-600 leading-relaxed">{groupeContent.explication}</p>
              )}

              {/* Mystères du Rosaire */}
              {groupeContent.mysteres && groupeContent.mysteres.length > 0 && (
                <div className="space-y-3">
                  {groupeContent.mysteres.map((mystere, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-deep mb-1">{mystere.titre}</h4>
                      <p className="text-sm text-slate-600">{mystere.contenu}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Temps de prière (Équipes du Rosaire) */}
              {groupeContent.temps_priere && groupeContent.temps_priere.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg text-slate-deep">Les temps de prière :</h4>
                  {groupeContent.temps_priere.map((temps, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-4">
                      <h5 className="font-semibold text-gold mb-1">{temps.titre}</h5>
                      <p className="text-sm text-slate-600">{temps.contenu}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Horaires */}
              {groupeContent.horaires && groupeContent.horaires.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-5">
                  <h4 className="font-semibold text-slate-deep mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gold" />
                    Vous pouvez nous rejoindre :
                  </h4>
                  <ul className="space-y-2">
                    {groupeContent.horaires.map((horaire, idx) => (
                      <li key={idx} className="text-slate-600 flex items-start">
                        <span className="text-gold mr-2">•</span>
                        {horaire}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rejoindre */}
              {groupeContent.rejoindre && (
                <p className="text-slate-600 font-medium">{groupeContent.rejoindre}</p>
              )}

              {/* Antennes */}
              {groupeContent.antennes && groupeContent.antennes.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-5">
                  <h4 className="font-semibold text-slate-deep mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gold" />
                    Contacts locaux :
                  </h4>
                  <ul className="space-y-2">
                    {groupeContent.antennes.map((antenne, idx) => (
                      <li key={idx} className="text-slate-600 flex items-start">
                        <span className="text-gold mr-2">•</span>
                        {antenne}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* URL */}
              {groupeContent.url && (
                <a
                  href={groupeContent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  En savoir plus
                </a>
              )}
            </div>
          )}

          {/* Meditation Content */}
          {meditationContent && (
            <div className="space-y-5">
              {/* Paragraphes */}
              {meditationContent.paragraphes && meditationContent.paragraphes.map((para, idx) => (
                <p key={idx} className="text-slate-600 leading-relaxed">{para}</p>
              ))}

              {/* Intro (Lectio Divina) */}
              {meditationContent.intro && (
                <p className="text-slate-600 leading-relaxed">{meditationContent.intro}</p>
              )}

              {/* Piliers de la Lectio Divina */}
              {meditationContent.piliers && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-slate-deep">{meditationContent.piliers.titre}</h3>
                  <p className="text-slate-600 italic">{meditationContent.piliers.sousTitre}</p>
                  <div className="space-y-3">
                    {meditationContent.piliers.etapes.map((etape, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gold mb-1">{etape.nom}</h4>
                        <p className="text-sm text-slate-600">{etape.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pourquoi pratiquer */}
              {meditationContent.pourquoi && (
                <div className="bg-gold/5 rounded-xl p-5 border border-gold/20">
                  <h4 className="font-serif text-lg text-slate-deep mb-2">{meditationContent.pourquoi.titre}</h4>
                  <p className="text-slate-600 mb-3">{meditationContent.pourquoi.description}</p>
                  <ul className="space-y-1">
                    {meditationContent.pourquoi.points.map((point, idx) => (
                      <li key={idx} className="text-slate-600 flex items-start text-sm">
                        <span className="text-gold mr-2">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Anecdote */}
              {meditationContent.anecdote && (
                <div className="bg-slate-50 rounded-xl p-4 flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 italic">Le saviez-vous ? {meditationContent.anecdote}</p>
                </div>
              )}

              {/* Comment commencer */}
              {meditationContent.commencer && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg text-slate-deep">{meditationContent.commencer.titre}</h4>
                  <p className="text-slate-600">{meditationContent.commencer.description}</p>
                  <ol className="space-y-2">
                    {meditationContent.commencer.conseils.map((conseil, idx) => (
                      <li key={idx} className="text-slate-600 flex items-start text-sm">
                        <span className="text-gold font-bold mr-2">{idx + 1}.</span>
                        {conseil}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Horaires d'adoration */}
              {meditationContent.horaires && meditationContent.horaires.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg text-slate-deep flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gold" />
                    Horaires d'adoration
                  </h4>
                  {meditationContent.horaires.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-4">
                      <h5 className="font-semibold text-slate-deep mb-1">{item.lieu}</h5>
                      <p className="text-sm text-slate-600">{item.horaire}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Conclusion */}
              {meditationContent.conclusion && (
                <p className="text-slate-600 leading-relaxed font-medium">{meditationContent.conclusion}</p>
              )}

              {/* Bouton vers les clochers */}
              {meditationContent.boutonClochers && (
                <Link
                  to="/nos-clochers"
                  onClick={onClose}
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  <Church className="w-5 h-5 mr-2" />
                  Horaires de nos églises
                </Link>
              )}
            </div>
          )}

          {/* Podcasts list */}
          {resource.podcasts && resource.podcasts.length > 0 && (
            <div className="space-y-4">
              {resource.podcasts.map((podcast, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-5 hover:bg-slate-100 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Headphones className="w-6 h-6 text-gold" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-serif text-lg text-slate-deep mb-1">{podcast.name}</h3>
                      <p className="text-sm text-slate-600 mb-3">{podcast.description}</p>
                      <a
                        href={podcast.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-md hover:shadow-lg"
                      >
                        <Headphones className="w-4 h-4 mr-2" />
                        Écouter le podcast
                      </a>
                    </div>
                  </div>
                </div>
              ))}
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

          {/* Entraide Content (for solidarity items) */}
          {entraideContent && (
            <div className="space-y-6">
              {/* Intro text */}
              {entraideContent.intro && (
                <p className="text-slate-600 leading-relaxed">{entraideContent.intro}</p>
              )}

              {/* Mission */}
              {entraideContent.mission && (
                <p className="text-slate-600 leading-relaxed">{entraideContent.mission}</p>
              )}

              {/* Temoignage simple */}
              {entraideContent.temoignage && !entraideContent.projet && (
                <blockquote className="border-l-4 border-gold pl-4 py-2 italic text-slate-600 bg-gold/5 rounded-r-lg">
                  {entraideContent.temoignage}
                </blockquote>
              )}

              {/* Actions */}
              {entraideContent.actions && (
                <p className="text-slate-600 leading-relaxed">{entraideContent.actions}</p>
              )}

              {/* Aide */}
              {entraideContent.aide && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-600">{entraideContent.aide}</p>
                  </div>
                </div>
              )}

              {/* Revue */}
              {entraideContent.revue && (
                <p className="text-sm text-slate-600">{entraideContent.revue}</p>
              )}

              {/* Teams (Secours Catholique) */}
              {entraideContent.teams && entraideContent.teams.length > 0 && (
                <div className="space-y-4">
                  {entraideContent.teams.map((team, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-deep mb-2 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gold" />
                        {team.name}
                      </h4>
                      <p className="text-sm text-slate-600 mb-3">{team.description}</p>
                      {team.phone && (
                        <p className="text-sm text-slate-600 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gold" />
                          {team.phone}
                        </p>
                      )}
                      {team.responsables && (
                        <p className="text-sm text-slate-500 mt-1">Responsables : {team.responsables}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Delegation */}
              {entraideContent.delegation && (
                <div className="bg-gold/5 rounded-xl p-4 border border-gold/20">
                  <h4 className="font-semibold text-slate-deep mb-2">{entraideContent.delegation.name}</h4>
                  <p className="text-sm text-slate-600 flex items-center mb-1">
                    <MapPin className="w-4 h-4 mr-2 text-gold" />
                    {entraideContent.delegation.address}
                  </p>
                  <p className="text-sm text-slate-600 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gold" />
                    {entraideContent.delegation.phone}
                  </p>
                </div>
              )}

              {/* Lieu et Permanences (Café Amitié) */}
              {entraideContent.lieu && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-deep mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gold" />
                    Lieu
                  </h4>
                  <p className="text-sm text-slate-600">{entraideContent.lieu}</p>
                </div>
              )}

              {entraideContent.permanences && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-deep mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gold" />
                    Permanences
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {entraideContent.permanences.map((perm, idx) => (
                      <li key={idx}>• {perm}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Projet (Bartimée) */}
              {entraideContent.projet && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-slate-deep">{entraideContent.projet.title}</h3>
                  <p className="text-slate-600">{entraideContent.projet.description}</p>
                  {entraideContent.projet.objectifs && (
                    <ul className="space-y-2">
                      {entraideContent.projet.objectifs.map((obj, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-600">
                          <span className="text-gold mr-2">•</span>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Témoignage avec projet */}
              {entraideContent.temoignage && entraideContent.projet && (
                <blockquote className="border-l-4 border-gold pl-4 py-2 italic text-slate-600 bg-gold/5 rounded-r-lg">
                  {entraideContent.temoignage}
                </blockquote>
              )}

              {/* Comment (Bartimée) */}
              {entraideContent.comment && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-slate-deep">{entraideContent.comment.title}</h3>
                  <div className="space-y-3">
                    {entraideContent.comment.activites.map((act, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-4">
                        <h4 className="font-semibold text-slate-deep mb-1">{act.nom}</h4>
                        <p className="text-sm text-slate-600">{act.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contacts (multiple) */}
              {entraideContent.contacts && entraideContent.contacts.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-serif text-lg text-slate-deep">Contacts</h3>
                  {entraideContent.contacts.map((contact, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-4 flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-deep">{contact.nom} : {contact.phone}</p>
                        <p className="text-sm text-slate-600">{contact.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Single contact */}
              {entraideContent.contact && !entraideContent.contacts && (
                <div className="bg-slate-50 rounded-xl p-4 flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <p className="text-slate-600">{entraideContent.contact}</p>
                </div>
              )}

              {/* Citation évêque */}
              {entraideContent.citationEveque && (
                <blockquote className="border-l-4 border-gold pl-4 py-3 text-sm italic text-slate-600 bg-gold/5 rounded-r-lg">
                  {entraideContent.citationEveque}
                </blockquote>
              )}

              {/* URL */}
              {entraideContent.url && (
                <a
                  href={entraideContent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  En savoir plus
                </a>
              )}
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
