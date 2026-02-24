import { X, ExternalLink, Clock, Tv, Film, Award, Headphones, Phone, MapPin, Users, Calendar, Heart, Church, Lightbulb, CheckCircle2, HandHeart, BookOpen, Info, Star, MessageSquare, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ResourceModal = ({ isOpen, onClose, resource }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !resource) return null;

  const getSectionIcon = (iconName) => {
    switch(iconName) {
      case 'tv': return Tv;
      case 'film': return Film;
      case 'award': return Award;
      default: return Film;
    }
  };

  const entraideContent   = resource.entraideContent;
  const alphaContent      = resource.alphaContent;
  const groupeContent     = resource.groupeContent;
  const meditationContent = resource.meditationContent;
  const eveilContent      = resource.eveilContent;
  const mejContent        = resource.mejContent;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header fixe ── */}
        <div className="flex-shrink-0 rounded-t-2xl overflow-hidden">
          <div className="p-6 flex items-center justify-between bg-gradient-to-r from-[#93B5B7] to-[#7da4a6]">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                {resource.icon && <resource.icon className="w-6 h-6 text-white" />}
              </div>
              <h2 className="font-serif text-xl md:text-2xl text-white leading-tight">
                {resource.modalTitle || resource.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0 ml-3"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* ── Zone scrollable ── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Description principale — encadré rose poudré */}
          {resource.modalDescription && (
            <div className="rounded-xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-4 text-slate-700 leading-relaxed text-[15px]">
              {resource.modalDescription}
            </div>
          )}

          {/* ══════════════════════════════════════
              ALPHA CONTENT
          ══════════════════════════════════════ */}
          {alphaContent && (
            <div className="space-y-4">
              {/* Format / Déroulement */}
              {alphaContent.format && (
                <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-5 py-2.5 flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold text-sm">Déroulement</span>
                  </div>
                  <div className="bg-white px-5 py-4">
                    <p className="text-slate-600 leading-relaxed text-[15px]">{alphaContent.format}</p>
                  </div>
                </div>
              )}

              {/* Pour qui */}
              {alphaContent.pour_qui && (
                <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-5 py-2.5 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold text-sm">Pour qui ?</span>
                  </div>
                  <div className="bg-white px-5 py-4">
                    <p className="text-slate-600 leading-relaxed text-[15px]">{alphaContent.pour_qui}</p>
                  </div>
                </div>
              )}

              {/* Contact */}
              {alphaContent.contact && (
                <div className="rounded-xl bg-white border border-slate-100 shadow-sm p-4 flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#93B5B7]/15 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#7da4a6]" />
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{alphaContent.contact}</p>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════
              GROUPE CONTENT
          ══════════════════════════════════════ */}
          {groupeContent && (
            <div className="space-y-6">
              {groupeContent.description && (
                <div className="relative pl-5 border-l-[3px] border-[#93B5B7]/60">
                  <p className="text-slate-600 leading-[1.85] text-[15px]">{groupeContent.description}</p>
                </div>
              )}

              {groupeContent.spiritualite && (
                <p className="text-slate-600 leading-[1.85] text-[15px]">{groupeContent.spiritualite}</p>
              )}

              {groupeContent.points && groupeContent.points.length > 0 && (
                <ul className="space-y-3 pl-1">
                  {groupeContent.points.map((point, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-slate-600 text-[15px] leading-[1.75]">
                      <span className="text-[#93B5B7] mt-1 flex-shrink-0">✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {groupeContent.principe && (
                <p className="text-slate-600 leading-[1.85] text-[15px]">{groupeContent.principe}</p>
              )}

              {groupeContent.mission && (
                <div className="rounded-2xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#93B5B7]/15 flex items-center justify-center mt-0.5">
                    <Star className="w-4 h-4 text-[#7da4a6]" />
                  </div>
                  <p className="text-slate-700 font-medium leading-[1.85]">{groupeContent.mission}</p>
                </div>
              )}

              {groupeContent.paragraphes && groupeContent.paragraphes.map((para, idx) => (
                <p key={idx} className="text-slate-600 leading-[1.85] text-[15px]">{para}</p>
              ))}

              {groupeContent.invitation && (
                <div className="rounded-xl bg-white border-l-4 border-[#93B5B7] border border-slate-100 p-5 shadow-sm">
                  <p className="text-slate-600 italic text-[15px] leading-[1.85]">{groupeContent.invitation}</p>
                </div>
              )}

              {groupeContent.explication && (
                <p className="text-slate-600 leading-[1.85] text-[15px]">{groupeContent.explication}</p>
              )}

              {groupeContent.mysteres && groupeContent.mysteres.length > 0 && (
                <div className="space-y-3">
                  {groupeContent.mysteres.map((mystere, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                      <div className="bg-gradient-to-r from-[#93B5B7]/20 to-[#93B5B7]/10 px-4 py-3">
                        <h4 className="font-semibold text-slate-deep text-sm">{mystere.titre}</h4>
                      </div>
                      <div className="bg-white px-4 py-4">
                        <p className="text-slate-600 text-sm leading-[1.75]">{mystere.contenu}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {groupeContent.temps_priere && groupeContent.temps_priere.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#93B5B7]" />
                    <h4 className="font-semibold text-slate-deep text-sm uppercase tracking-wide">Les temps de prière</h4>
                  </div>
                  {groupeContent.temps_priere.map((temps, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                      <div className="bg-gradient-to-r from-[#93B5B7]/20 to-[#93B5B7]/10 px-4 py-3">
                        <h5 className="font-semibold text-slate-deep text-sm">{temps.titre}</h5>
                      </div>
                      <div className="bg-white px-4 py-4">
                        <p className="text-slate-600 text-sm leading-[1.75]">{temps.contenu}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {groupeContent.horaires && groupeContent.horaires.length > 0 && (
                <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-5 py-3 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold text-sm">Nous rejoindre</span>
                  </div>
                  <div className="bg-white px-5 py-5">
                    <ul className="space-y-3">
                      {groupeContent.horaires.map((horaire, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-slate-600 text-[15px] leading-[1.75]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#93B5B7] flex-shrink-0 mt-2"></span>
                          <span>{horaire}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {groupeContent.rejoindre && (
                <p className="text-slate-600 font-medium text-[15px] leading-[1.85]">{groupeContent.rejoindre}</p>
              )}

              {groupeContent.antennes && groupeContent.antennes.length > 0 && (
                <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-5 py-3 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold text-sm">Contacts locaux</span>
                  </div>
                  <div className="bg-white px-5 py-5">
                    <ul className="space-y-3">
                      {groupeContent.antennes.map((antenne, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-slate-600 text-[15px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#93B5B7] flex-shrink-0"></span>
                          <span>{antenne}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {groupeContent.contact && (
                <div className="rounded-xl bg-white border border-slate-100 shadow-sm p-5 flex items-center space-x-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#93B5B7]/15 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#7da4a6]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Contact</p>
                    <a href={`mailto:${groupeContent.contact}`} className="text-[#7da4a6] hover:text-[#93B5B7] font-medium text-[15px] transition-colors">
                      {groupeContent.contact}
                    </a>
                  </div>
                </div>
              )}

              {groupeContent.citation && (
                <div className="relative rounded-2xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-6 overflow-hidden">
                  <div className="absolute top-2 left-3 text-[#93B5B7]/20 font-serif text-6xl leading-none select-none">"</div>
                  <p className="relative z-10 text-slate-700 italic leading-[1.85] text-[15px] pl-3">{groupeContent.citation}</p>
                </div>
              )}

              {groupeContent.citations && groupeContent.citations.map((cit, idx) => (
                <div key={idx} className="relative rounded-2xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-6 overflow-hidden">
                  <div className="absolute top-2 left-3 text-[#93B5B7]/20 font-serif text-6xl leading-none select-none">"</div>
                  <p className="relative z-10 text-slate-700 italic leading-[1.85] text-[15px] pl-3">{cit}</p>
                </div>
              ))}

              {groupeContent.url && (
                <a href={groupeContent.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] hover:opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  En savoir plus
                </a>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════
              MEDITATION CONTENT
          ══════════════════════════════════════ */}
          {meditationContent && (
            <div className="space-y-4">

              {/* Paragraphes — avec léger accent gauche */}
              {meditationContent.paragraphes && meditationContent.paragraphes.map((para, idx) => (
                <div key={idx} className="relative pl-4 border-l-[3px] border-[#93B5B7]/50">
                  <p className="text-slate-600 leading-relaxed text-[15px]">{para}</p>
                </div>
              ))}

              {/* Intro */}
              {meditationContent.intro && (
                <div className="rounded-xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-4">
                  <p className="text-slate-600 italic leading-relaxed text-[15px]">{meditationContent.intro}</p>
                </div>
              )}

              {/* Piliers de la Lectio Divina */}
              {meditationContent.piliers && (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-serif text-lg text-slate-deep">{meditationContent.piliers.titre}</h3>
                    <p className="text-slate-500 italic text-sm mt-1">{meditationContent.piliers.sousTitre}</p>
                  </div>
                  {meditationContent.piliers.etapes.map((etape, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                      <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-5 py-2.5 flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{idx + 1}</span>
                        <h4 className="font-semibold text-white text-sm">{etape.nom}</h4>
                      </div>
                      <div className="bg-white px-5 py-3">
                        <p className="text-slate-600 text-sm leading-relaxed">{etape.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pourquoi pratiquer */}
              {meditationContent.pourquoi && (
                <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-[#93B5B7]/20 to-[#93B5B7]/10 px-5 py-3">
                    <h4 className="font-serif text-base text-slate-deep">{meditationContent.pourquoi.titre}</h4>
                    <p className="text-slate-500 text-sm mt-1">{meditationContent.pourquoi.description}</p>
                  </div>
                  <div className="bg-white px-5 py-3">
                    <ul className="space-y-2">
                      {meditationContent.pourquoi.points.map((point, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5 text-slate-600 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#93B5B7] mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Anecdote */}
              {meditationContent.anecdote && (
                <div className="rounded-xl bg-[#93B5B7]/8 border border-[#93B5B7]/20 p-4 flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-[#7da4a6] mt-0.5 flex-shrink-0" />
                  <p className="text-slate-600 text-sm italic leading-relaxed">
                    <span className="font-semibold not-italic text-slate-700">Le saviez-vous ? </span>
                    {meditationContent.anecdote}
                  </p>
                </div>
              )}

              {/* Comment commencer */}
              {meditationContent.commencer && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#93B5B7]" />
                    <h4 className="font-serif text-base text-slate-deep">{meditationContent.commencer.titre}</h4>
                  </div>
                  <p className="text-slate-500 text-sm">{meditationContent.commencer.description}</p>
                  <div className="space-y-2">
                    {meditationContent.commencer.conseils.map((conseil, idx) => (
                      <div key={idx} className="flex items-start space-x-3 bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                        <span className="w-6 h-6 rounded-full bg-[#93B5B7]/15 flex items-center justify-center text-[#7da4a6] font-bold text-xs flex-shrink-0">{idx + 1}</span>
                        <p className="text-slate-600 text-sm leading-relaxed">{conseil}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Horaires d'adoration */}
              {meditationContent.horaires && meditationContent.horaires.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#93B5B7]" />
                    <h4 className="font-semibold text-slate-deep text-sm uppercase tracking-wide">Horaires d'adoration</h4>
                  </div>
                  {meditationContent.horaires.map((item, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                      <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-5 py-2.5 flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-white" />
                        <span className="text-white font-semibold text-sm">{item.lieu}</span>
                      </div>
                      <div className="bg-white px-5 py-3">
                        <p className="text-slate-600 text-sm">{item.horaire}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Conclusion */}
              {meditationContent.conclusion && (
                <div className="relative rounded-2xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-5 overflow-hidden">
                  <div className="absolute top-2 left-3 text-[#93B5B7]/20 font-serif text-6xl leading-none select-none">"</div>
                  <p className="relative z-10 text-slate-700 font-medium italic leading-relaxed pl-3">{meditationContent.conclusion}</p>
                </div>
              )}

              {/* Bouton vers les clochers */}
              {meditationContent.boutonClochers && (
                <Link to="/nos-clochers" onClick={onClose}
                  className="inline-flex items-center bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] hover:opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <Church className="w-5 h-5 mr-2" />
                  Horaires de nos églises
                </Link>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════
              ÉVEIL À LA FOI CONTENT
          ══════════════════════════════════════ */}
          {eveilContent && (
            <div className="space-y-5">

              {/* Paragraphes */}
              {eveilContent.paragraphes && eveilContent.paragraphes.map((para, idx) => (
                <div key={idx} className="relative pl-4 border-l-[3px] border-[#93B5B7]/50">
                  <p className="text-slate-600 leading-relaxed text-[15px]">{para}</p>
                </div>
              ))}

              {/* Contact */}
              {eveilContent.contact && (
                <div className="rounded-xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-4 flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#7da4a6] mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700 font-medium">{eveilContent.contact}</p>
                </div>
              )}

              {/* Lieux et horaires */}
              {eveilContent.lieux && eveilContent.lieux.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#93B5B7]" />
                    <h4 className="font-semibold text-slate-deep text-sm uppercase tracking-wide">Rencontres 2025-2026</h4>
                  </div>
                  {eveilContent.lieux.map((lieu, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                      <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-5 py-2.5 flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-white" />
                        <span className="text-white font-semibold text-sm">À {lieu.ville}</span>
                      </div>
                      <div className="bg-white px-5 py-4 space-y-2">
                        <div className="flex items-start space-x-2">
                          <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-600 text-sm">{lieu.horaire}</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-600 text-sm">{lieu.adresse}</p>
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100">
                          <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Dates</p>
                          <p className="text-slate-700 text-sm font-medium">{lieu.dates}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════
              MEJ CONTENT
          ══════════════════════════════════════ */}
          {mejContent && (
            <div className="space-y-5">

              {/* Paragraphes */}
              {mejContent.paragraphes && mejContent.paragraphes.map((para, idx) => (
                <div key={idx} className="relative pl-4 border-l-[3px] border-[#93B5B7]/50">
                  <p className="text-slate-600 leading-relaxed text-[15px]">{para}</p>
                </div>
              ))}

              {/* Tranches d'âge */}
              {mejContent.tranches && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#93B5B7]" />
                    <h4 className="font-serif text-base text-slate-deep">{mejContent.tranches.titre}</h4>
                  </div>
                  <div className="space-y-2">
                    {mejContent.tranches.groupes.map((groupe, idx) => (
                      <div key={idx} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                        <div className="bg-gradient-to-r from-[#93B5B7]/20 to-[#93B5B7]/10 px-5 py-3 flex items-center justify-between">
                          <span className="font-semibold text-slate-deep text-sm">{groupe.nom}</span>
                          <span className="text-[#7da4a6] text-sm font-medium">{groupe.age}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lien externe */}
              {mejContent.lienExterne && (
                <a 
                  href={mejContent.lienExterne.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] hover:opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {mejContent.lienExterne.texte}
                </a>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════
              RESSOURCES — Sections (Médiathèque)
          ══════════════════════════════════════ */}
          {resource.sections && resource.sections.length > 0 && (
            <div className="space-y-5">
              {resource.sections.map((section, sectionIndex) => {
                const SectionIcon = getSectionIcon(section.icon);
                return (
                  <div key={sectionIndex} className="space-y-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-[#93B5B7]/15 flex items-center justify-center">
                        <SectionIcon className="w-3.5 h-3.5 text-[#7da4a6]" />
                      </div>
                      <h3 className="font-serif text-base text-slate-deep">{section.title}</h3>
                    </div>
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                        <div className="bg-gradient-to-r from-[#93B5B7]/20 to-[#93B5B7]/10 px-4 py-2.5">
                          <h4 className="font-semibold text-slate-deep text-sm">{item.name}</h4>
                        </div>
                        <div className="bg-white px-4 py-3">
                          <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* ══════════════════════════════════════
              RESSOURCES — Features (Librairie)
          ══════════════════════════════════════ */}
          {resource.features && resource.features.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#93B5B7]" />
                <h3 className="font-semibold text-slate-deep text-sm uppercase tracking-wide">Ce que vous y trouverez</h3>
              </div>
              {resource.features.map((feature, index) => (
                <div key={index} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-[#93B5B7]/20 to-[#93B5B7]/10 px-4 py-2.5">
                    <h4 className="font-semibold text-slate-deep text-sm">{feature.title}</h4>
                  </div>
                  <div className="bg-white px-4 py-3">
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quote (Librairie) */}
          {resource.quote && (
            <div className="relative rounded-2xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-5 overflow-hidden">
              <div className="absolute top-2 left-3 text-[#93B5B7]/20 font-serif text-6xl leading-none select-none">"</div>
              <p className="relative z-10 text-slate-700 italic leading-relaxed text-[15px] pl-3">{resource.quote}</p>
            </div>
          )}

          {/* Horaires (Librairie) */}
          {resource.horaires && (
            <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-5 py-2.5 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-white font-semibold text-sm">Horaires d'ouverture</span>
              </div>
              <div className="bg-white px-5 py-3">
                <p className="text-slate-600 text-sm">{resource.horaires}</p>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              RESSOURCES — Items (Sites web)
          ══════════════════════════════════════ */}
          {resource.items && resource.items.length > 0 && (
            <div className="space-y-3">
              {resource.items.map((item, index) => (
                <div key={index} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-[#93B5B7]/20 to-[#93B5B7]/10 px-4 py-2.5 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-deep text-sm">{item.name}</h3>
                    {item.subtitle && <span className="text-xs text-[#7da4a6] font-medium italic">{item.subtitle}</span>}
                  </div>
                  <div className="bg-white px-4 py-3 space-y-2">
                    {item.concept && (
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold text-slate-700">Le concept : </span>{item.concept}
                      </p>
                    )}
                    {item.why && (
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold text-slate-700">Pourquoi l'aimer : </span>{item.why}
                      </p>
                    )}
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-[#7da4a6] hover:text-[#93B5B7] text-sm font-medium transition-colors mt-1">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        {item.url.replace('https://', '').replace('http://', '')}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══════════════════════════════════════
              RESSOURCES — Podcasts
          ══════════════════════════════════════ */}
          {resource.podcasts && resource.podcasts.length > 0 && (
            <div className="space-y-3">
              {resource.podcasts.map((podcast, index) => (
                <div key={index} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-5 py-2.5 flex items-center space-x-2">
                    <Headphones className="w-4 h-4 text-white" />
                    <h3 className="font-semibold text-white text-sm">{podcast.name}</h3>
                  </div>
                  <div className="bg-white px-5 py-4 flex items-center justify-between gap-4">
                    <p className="text-slate-600 text-sm leading-relaxed flex-1">{podcast.description}</p>
                    <a href={podcast.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center bg-[#1DB954] hover:bg-[#17a34a] text-white px-4 py-2 rounded-full font-medium text-sm transition-colors shadow-md hover:shadow-lg flex-shrink-0">
                      <Headphones className="w-3.5 h-3.5 mr-1.5" />
                      Écouter
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══════════════════════════════════════
              ENTRAIDE CONTENT
          ══════════════════════════════════════ */}
          {entraideContent && (
            <div className="space-y-4">

              {entraideContent.intro && (
                <div className="relative pl-5 border-l-[3px] border-[#93B5B7]/60">
                  <p className="text-slate-600 leading-relaxed text-[15px]">{entraideContent.intro}</p>
                </div>
              )}

              {entraideContent.mission && (
                <div className="rounded-2xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-5 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#93B5B7]/15 flex items-center justify-center mt-0.5">
                    <HandHeart className="w-5 h-5 text-[#7da4a6]" />
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium text-[15px]">{entraideContent.mission}</p>
                </div>
              )}

              {entraideContent.actions && (
                <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-4 h-4 text-[#93B5B7]" />
                    <h4 className="font-semibold text-slate-deep text-sm uppercase tracking-wide">Nos actions</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[15px]">{entraideContent.actions}</p>
                </div>
              )}

              {entraideContent.aide && (
                <div className="rounded-2xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-5">
                  <div className="flex items-center space-x-2 mb-3">
                    <Heart className="w-4 h-4 text-[#93B5B7]" />
                    <h4 className="font-semibold text-slate-deep text-sm uppercase tracking-wide">Aide matérielle</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[15px]">{entraideContent.aide}</p>
                </div>
              )}

              {entraideContent.revue && (
                <div className="flex items-start space-x-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                  <BookOpen className="w-4 h-4 text-[#93B5B7] mt-0.5 flex-shrink-0" />
                  <p className="text-slate-500 text-sm italic leading-relaxed">{entraideContent.revue}</p>
                </div>
              )}

              {entraideContent.temoignage && !entraideContent.projet && (
                <div className="relative rounded-2xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-6 overflow-hidden">
                  <div className="absolute top-3 left-4 text-[#93B5B7]/20 font-serif text-7xl leading-none select-none">"</div>
                  <p className="relative z-10 text-slate-700 italic leading-relaxed text-[15px] pl-4">{entraideContent.temoignage}</p>
                </div>
              )}

              {entraideContent.teams && entraideContent.teams.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#93B5B7]" />
                    <h4 className="font-semibold text-slate-deep text-sm uppercase tracking-wide">Nos équipes locales</h4>
                  </div>
                  {entraideContent.teams.map((team, index) => (
                    <div key={index} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                      <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-5 py-3 flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <h5 className="font-semibold text-white text-sm">{team.name}</h5>
                      </div>
                      <div className="bg-white p-5 space-y-3">
                        <p className="text-slate-600 text-sm leading-relaxed">{team.description}</p>
                        <div className="flex flex-wrap gap-3">
                          {team.phone && (
                            <a href={`tel:${team.phone}`} className="inline-flex items-center space-x-1.5 bg-[#93B5B7]/15 hover:bg-[#93B5B7]/25 text-[#7da4a6] font-medium text-sm px-3 py-1.5 rounded-full transition-colors">
                              <Phone className="w-3.5 h-3.5" />
                              <span>{team.phone}</span>
                            </a>
                          )}
                          {team.responsables && (
                            <span className="inline-flex items-center bg-slate-100 text-slate-500 text-xs px-3 py-1.5 rounded-full">
                              ✦ {team.responsables}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {entraideContent.delegation && (
                <div className="rounded-2xl bg-gradient-to-br from-[#93B5B7] to-[#7da4a6] p-5 text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Info className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-white text-sm">{entraideContent.delegation.name}</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2 text-white/80">
                      <MapPin className="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{entraideContent.delegation.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-white/70 flex-shrink-0" />
                      <a href={`tel:${entraideContent.delegation.phone}`} className="text-sm text-white font-medium hover:text-white/80 transition-colors">
                        {entraideContent.delegation.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {(entraideContent.lieu || entraideContent.permanences) && (
                <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  {entraideContent.lieu && (
                    <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-5 py-3 flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-white" />
                      <span className="text-white font-medium text-sm">{entraideContent.lieu}</span>
                    </div>
                  )}
                  {entraideContent.permanences && (
                    <div className="bg-white px-5 py-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Calendar className="w-4 h-4 text-[#93B5B7]" />
                        <h4 className="font-semibold text-slate-deep text-sm uppercase tracking-wide">Permanences</h4>
                      </div>
                      <ul className="space-y-2">
                        {entraideContent.permanences.map((perm, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-slate-600 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#93B5B7] flex-shrink-0"></span>
                            <span>{perm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {entraideContent.projet && (
                <div className="space-y-3">
                  <div className="rounded-2xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-5">
                    <h3 className="font-serif text-base text-slate-deep mb-2">{entraideContent.projet.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-[15px]">{entraideContent.projet.description}</p>
                  </div>
                  {entraideContent.projet.objectifs && (
                    <div className="space-y-2">
                      {entraideContent.projet.objectifs.map((obj, idx) => (
                        <div key={idx} className="flex items-start space-x-3 bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#93B5B7] mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 text-sm leading-relaxed">{obj}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {entraideContent.temoignage && entraideContent.projet && (
                <div className="relative rounded-2xl bg-gradient-to-br from-[#fdf6f5] to-[#f9f1ef] border border-[#93B5B7]/20 p-6 overflow-hidden">
                  <div className="absolute top-3 left-4 text-[#93B5B7]/20 font-serif text-7xl leading-none select-none">"</div>
                  <p className="relative z-10 text-slate-700 italic leading-relaxed text-[15px] pl-4">{entraideContent.temoignage}</p>
                </div>
              )}

              {entraideContent.comment && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-[#93B5B7]" />
                    <h3 className="font-semibold text-slate-deep text-sm uppercase tracking-wide">{entraideContent.comment.title}</h3>
                  </div>
                  {entraideContent.comment.activites.map((act, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                      <div className="bg-gradient-to-r from-[#93B5B7]/20 to-[#93B5B7]/10 px-5 py-2.5">
                        <h4 className="font-semibold text-slate-deep text-sm">{act.nom}</h4>
                      </div>
                      <div className="bg-white px-5 py-3">
                        <p className="text-slate-600 text-sm leading-relaxed">{act.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {entraideContent.contacts && entraideContent.contacts.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-[#93B5B7]" />
                    <h3 className="font-semibold text-slate-deep text-sm uppercase tracking-wide">Contacts</h3>
                  </div>
                  {entraideContent.contacts.map((contact, idx) => (
                    <div key={idx} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#93B5B7]/15 flex items-center justify-center font-bold text-[#7da4a6] text-sm">
                        {contact.nom.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-deep text-sm">{contact.nom}</p>
                        <a href={`tel:${contact.phone}`} className="text-[#7da4a6] hover:text-[#93B5B7] font-medium text-sm transition-colors">{contact.phone}</a>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">{contact.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {entraideContent.contact && !entraideContent.contacts && (
                <div className="rounded-xl bg-white border border-slate-100 shadow-sm p-4 flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#93B5B7]/15 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#7da4a6]" />
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">{entraideContent.contact}</p>
                </div>
              )}

              {entraideContent.citationEveque && (
                <div className="rounded-2xl bg-gradient-to-br from-[#93B5B7] to-[#7da4a6] p-6 text-white relative overflow-hidden">
                  <div className="absolute top-4 right-5 text-white/10 font-serif text-8xl leading-none select-none">"</div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Church className="w-5 h-5 text-white/80 flex-shrink-0" />
                    <span className="text-white/80 text-xs uppercase tracking-widest font-semibold">Parole de l'Archevêque</span>
                  </div>
                  <p className="text-white/90 text-sm italic leading-relaxed relative z-10">{entraideContent.citationEveque}</p>
                </div>
              )}

              {entraideContent.url && (
                <a href={entraideContent.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] hover:opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  En savoir plus
                </a>
              )}
            </div>
          )}

          {/* Lien externe simple */}
          {resource.url && !resource.items && !entraideContent && !groupeContent && (
            <a href={resource.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] hover:opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <ExternalLink className="w-5 h-5 mr-2" />
              Visiter le site
            </a>
          )}
        </div>

        {/* ── Footer fixe ── */}
        <div className="flex-shrink-0 rounded-b-2xl bg-slate-50 border-t border-slate-200 p-4 flex justify-end">
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
