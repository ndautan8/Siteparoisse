import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, X, Phone } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// Données du curé
const cureData = {
  id: 'cure',
  name: 'Père Daniel',
  role: 'Curé de la paroisse',
  image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izar22oi_pere-daniel.webp',
  description: `Le Père Daniel est le curé de notre paroisse Notre Dame d'Autan. Ordonné prêtre il y a de nombreuses années, il guide notre communauté avec sagesse et bienveillance.

Responsable de l'ensemble de la vie paroissiale, il veille à l'animation spirituelle de notre communauté et à la coordination de tous les services pastoraux. Passionné par l'accompagnement des familles et la transmission de la foi, il est à l'écoute de tous les paroissiens.

Son ministère s'exerce particulièrement dans la célébration des sacrements, l'accompagnement des personnes en recherche spirituelle et le soutien aux équipes de bénévoles qui font vivre notre paroisse au quotidien.`
};

// Données des prêtres
const pretresData = {
  intro: `Notre paroisse a la chance d'être accompagnée par trois prêtres dévoués qui, aux côtés du curé, assurent l'animation spirituelle de notre communauté. Chacun apporte ses dons et sa sensibilité au service de tous les paroissiens.`,
  priests: [
    {
      name: 'Père Donald',
      image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/bwicpjkm_pere-donald.webp',
      description: `Le Père Donald accompagne notre communauté paroissiale avec enthousiasme et dévouement. Il est particulièrement investi dans l'accompagnement des jeunes et l'animation des temps de prière.`
    },
    {
      name: 'Père Anthony',
      image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/mrvxn6kf_pere-anthony.webp',
      description: `Le Père Anthony est un jeune prêtre dynamique qui apporte fraîcheur et énergie à notre paroisse. Il est particulièrement engagé auprès des familles et dans la préparation aux sacrements.`
    },
    {
      name: 'Père Arnaud',
      image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/parx1ojm_pere-arnaud.webp',
      description: `Le Père Arnaud est reconnu pour sa profondeur spirituelle et sa pédagogie. Il accompagne avec attention les personnes en recherche de sens et anime des groupes de formation à la foi.`
    }
  ]
};

const teamMembers = [
  {
    id: 'cure',
    title: 'Le Curé',
    name: 'Père Daniel',
    role: 'Curé de la paroisse',
    description: 'Responsable de la communauté paroissiale',
    image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izar22oi_pere-daniel.webp',
    hasModal: true
  },
  {
    id: 'pretres',
    title: 'Les Prêtres',
    name: 'Père Donald, Père Anthony, Père Arnaud',
    role: 'Au service de la communauté',
    description: 'Accompagnement spirituel et sacrements',
    images: [
      'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/bwicpjkm_pere-donald.webp',
      'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/mrvxn6kf_pere-anthony.webp',
      'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/parx1ojm_pere-arnaud.webp'
    ],
    hasModal: true
  },
  {
    id: 'diacres',
    title: 'Les Diacres',
    name: 'Diacres permanents',
    role: 'Service de la charité',
    description: 'Au service de la communauté et des plus fragiles',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    path: '/equipe-pastorale/diacres'
  },
  {
    id: 'seminaristes',
    title: 'Les Séminaristes',
    name: 'En formation',
    role: 'Futurs prêtres',
    description: 'Accompagnés par notre communauté dans leur cheminement',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    path: '/equipe-pastorale/seminaristes'
  },
  {
    id: 'eap',
    title: "L'EAP",
    name: "Équipe d'Animation Pastorale",
    role: 'Coordination pastorale',
    description: 'Laïcs engagés au service de la mission paroissiale',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
    path: '/equipe-pastorale/eap'
  }
];

const EquipePastoralePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'cure' or 'pretres'

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-paper" data-testid="equipe-pastorale-page">
      {/* Hero Section with Image */}
      <section className="relative h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/x8y0e2d8_Equipe-pastorale.png"
            alt="Équipe Pastorale"
            className="w-full h-full object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <SocialIcons />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Users className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Équipe Pastorale
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">Une équipe au service de la communauté</p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Découvrez les membres de notre équipe pastorale qui accompagnent la vie de notre paroisse
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Team Grid - 5 colonnes */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {teamMembers.map((member) => {
            const CardWrapper = member.hasModal ? 'button' : Link;
            const cardProps = member.hasModal 
              ? { onClick: () => openModal(member.id), type: 'button' }
              : { to: member.path };

            return (
              <CardWrapper
                key={member.id}
                {...cardProps}
                className="group text-left"
                data-testid={`team-card-${member.id}`}
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full border border-slate-100 flex flex-col hover:-translate-y-1">
                  {/* Photo(s) */}
                  {member.images ? (
                    // Multiple photos for "Les Prêtres"
                    <div className="grid grid-cols-3 gap-0.5 bg-slate-100">
                      {member.images.map((img, idx) => (
                        <div key={idx} className="aspect-square overflow-hidden">
                          <img 
                            src={img} 
                            alt={`Prêtre ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Single photo
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-gold text-xs font-medium mb-1 uppercase tracking-wide">{member.role}</span>
                    <h3 className="font-serif text-base text-slate-deep mb-1 group-hover:text-gold transition-colors">
                      {member.title}
                    </h3>
                    <p className="text-slate-500 text-xs mb-2 line-clamp-2">{member.description}</p>
                    
                    <div className="mt-auto flex items-center text-gold text-xs font-medium group-hover:text-gold-dark transition-colors">
                      <span>Découvrir</span>
                      <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              </CardWrapper>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
          <h2 className="font-serif text-2xl text-slate-deep mb-4">Contacter l'équipe pastorale</h2>
          <p className="text-slate-600 mb-6">
            Pour toute question ou demande, n'hésitez pas à nous contacter via le secrétariat paroissial.
          </p>
          <Link
            to="/secretariat"
            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>

      {/* Citation biblique */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep italic mb-4">
            "Comme le Père m'a envoyé, moi aussi, je vous envoie."
          </blockquote>
          <p className="text-gold font-medium">Jean 20, 21</p>
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                  
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-6 py-4 flex items-center justify-between flex-shrink-0">
                    <Dialog.Title className="font-serif text-xl text-white">
                      {modalType === 'cure' ? 'Le Curé' : 'Les Prêtres'}
                    </Dialog.Title>
                    <button
                      onClick={closeModal}
                      className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 overflow-y-auto flex-grow">
                    {modalType === 'cure' && (
                      <div className="space-y-6">
                        {/* Photo + Info */}
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="sm:w-1/3 flex-shrink-0">
                            <img 
                              src={cureData.image} 
                              alt={cureData.name}
                              className="w-full aspect-square object-cover rounded-xl"
                            />
                          </div>
                          <div className="sm:w-2/3">
                            <span className="inline-block bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium mb-3">
                              Curé de la paroisse
                            </span>
                            <h3 className="font-serif text-2xl text-slate-deep mb-2">{cureData.name}</h3>
                            <p className="text-[#93B5B7] font-medium">{cureData.role}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                          {cureData.description.split('\n\n').map((para, idx) => (
                            <p key={idx} className="text-slate-600 leading-relaxed">
                              {para}
                            </p>
                          ))}
                        </div>

                        {/* Contact */}
                        <div className="pt-4 border-t border-slate-100">
                          <p className="text-slate-600 mb-4">
                            Pour contacter le Père Daniel, vous pouvez passer par le secrétariat paroissial.
                          </p>
                          <Link
                            to="/secretariat"
                            onClick={closeModal}
                            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Contacter le secrétariat
                          </Link>
                        </div>
                      </div>
                    )}

                    {modalType === 'pretres' && (
                      <div className="space-y-6">
                        {/* Intro */}
                        <p className="text-slate-600 leading-relaxed">
                          {pretresData.intro}
                        </p>

                        {/* Priests */}
                        <div className="space-y-6">
                          {pretresData.priests.map((priest, idx) => (
                            <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                              <div className="w-20 h-20 flex-shrink-0">
                                <img 
                                  src={priest.image} 
                                  alt={priest.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-serif text-lg text-slate-deep mb-2">{priest.name}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                  {priest.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Contact */}
                        <div className="pt-4 border-t border-slate-100">
                          <p className="text-slate-600 mb-4">
                            Pour contacter nos prêtres, vous pouvez passer par le secrétariat paroissial.
                          </p>
                          <Link
                            to="/secretariat"
                            onClick={closeModal}
                            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Contacter le secrétariat
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EquipePastoralePage;
