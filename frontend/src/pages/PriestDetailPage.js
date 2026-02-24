import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Users } from 'lucide-react';

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
  id: 'pretres',
  title: 'Les Prêtres',
  intro: `Notre paroisse a la chance d'être accompagnée par trois prêtres dévoués qui, aux côtés du curé, assurent l'animation spirituelle de notre communauté. Chacun apporte ses dons et sa sensibilité au service de tous les paroissiens.`,
  priests: [
    {
      name: 'Père Donald',
      image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/bwicpjkm_pere-donald.webp',
      description: `Le Père Donald accompagne notre communauté paroissiale avec enthousiasme et dévouement. Il est particulièrement investi dans l'accompagnement des jeunes et l'animation des temps de prière. Sa joie communicative et son écoute attentive en font un pasteur apprécié de tous.`
    },
    {
      name: 'Père Anthony',
      image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/mrvxn6kf_pere-anthony.webp',
      description: `Le Père Anthony est un jeune prêtre dynamique qui apporte fraîcheur et énergie à notre paroisse. Formé à l'écoute et à l'accompagnement spirituel, il est particulièrement engagé auprès des familles et dans la préparation aux sacrements. Son sourire et sa disponibilité sont un témoignage vivant de la joie de l'Évangile.`
    },
    {
      name: 'Père Arnaud',
      image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/parx1ojm_pere-arnaud.webp',
      description: `Le Père Arnaud est un prêtre au service de notre communauté, reconnu pour sa profondeur spirituelle et sa pédagogie. Il accompagne avec attention les personnes en recherche de sens et anime des groupes de formation à la foi. Son engagement pastoral se manifeste particulièrement dans l'accompagnement des catéchumènes et la préparation au mariage.`
    }
  ]
};

const PriestDetailPage = ({ type }) => {
  
  // Page du curé
  if (type === 'cure') {
    return (
      <div className="min-h-screen bg-paper" data-testid="cure-detail-page">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-end">
          <div className="absolute inset-0 bg-gradient-to-br from-[#93B5B7] to-[#7da4a6]"></div>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <Link 
              to="/equipe-pastorale" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'équipe pastorale
            </Link>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              {/* Photo */}
              <div className="md:w-1/3">
                <div className="aspect-square md:h-full">
                  <img 
                    src={cureData.image} 
                    alt={cureData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="md:w-2/3 p-8 md:p-10">
                <span className="inline-block bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Curé de la paroisse
                </span>
                
                <h1 className="font-serif text-4xl text-slate-deep mb-2">
                  {cureData.name}
                </h1>
                
                <p className="text-[#93B5B7] font-medium text-lg mb-6">
                  {cureData.role}
                </p>

                <div className="prose prose-slate max-w-none">
                  {cureData.description.split('\n\n').map((para, idx) => (
                    <p key={idx} className="text-slate-600 leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Contact */}
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <h3 className="font-serif text-lg text-slate-deep mb-4">Prendre contact</h3>
                  <p className="text-slate-600 mb-4">
                    Pour contacter le Père Daniel, vous pouvez passer par le secrétariat paroissial.
                  </p>
                  <Link
                    to="/secretariat"
                    className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contacter le secrétariat
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Page des prêtres
  if (type === 'pretres') {
    return (
      <div className="min-h-screen bg-paper" data-testid="pretres-detail-page">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-end">
          <div className="absolute inset-0 bg-gradient-to-br from-[#93B5B7] to-[#7da4a6]"></div>
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <Link 
              to="/equipe-pastorale" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'équipe pastorale
            </Link>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-16">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#93B5B7]/10 flex items-center justify-center mr-4">
                <Users className="w-7 h-7 text-[#93B5B7]" />
              </div>
              <div>
                <h1 className="font-serif text-3xl text-slate-deep">Les Prêtres</h1>
                <p className="text-[#93B5B7] font-medium">Au service de la communauté</p>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              {pretresData.intro}
            </p>
          </div>

          {/* Priests Grid */}
          <div className="space-y-8">
            {pretresData.priests.map((priest, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                  {/* Photo */}
                  <div className="md:w-1/3">
                    <div className="aspect-square md:h-full">
                      <img 
                        src={priest.image} 
                        alt={priest.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="md:w-2/3 p-8 flex flex-col justify-center">
                    <h2 className="font-serif text-2xl text-slate-deep mb-4">
                      {priest.name}
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      {priest.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 text-center">
            <h3 className="font-serif text-xl text-slate-deep mb-4">Prendre contact</h3>
            <p className="text-slate-600 mb-6">
              Pour contacter nos prêtres, vous pouvez passer par le secrétariat paroissial.
            </p>
            <Link
              to="/secretariat"
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contacter le secrétariat
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Page non trouvée
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-3xl text-slate-deep mb-4">Page non trouvée</h1>
        <Link to="/equipe-pastorale" className="text-gold hover:text-gold-dark">
          Retour à l'équipe pastorale
        </Link>
      </div>
    </div>
  );
};

export default PriestDetailPage;
