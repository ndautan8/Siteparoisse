import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import HomePage from '@/pages/HomePage';
import HorairesMesses from '@/pages/HorairesMesses';
import Secretariat from '@/pages/Secretariat';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import ContentPage from '@/pages/ContentPage';

// New pillar pages with cards
import NotreDameAutanPage from '@/pages/NotreDameAutanPage';
import FamillesJeunessePage from '@/pages/FamillesJeunessePage';
import VieSpirituelePage from '@/pages/VieSpirituelePage';
import GrandirFoiPage from '@/pages/GrandirFoiPage';
import SolidaritePage from '@/pages/SolidaritePage';

// Sub-pages with cards
import EquipePastoralePage from '@/pages/EquipePastoralePage';
import NosClochersPage from '@/pages/NosClochersPage';
import DemanderSacrementPage from '@/pages/DemanderSacrementPage';
import SacrementDetailPage from '@/pages/SacrementDetailPage';
import JeSuisNouveauPage from '@/pages/JeSuisNouveauPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Admin routes without header/footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Public routes with header/footer */}
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <FloatingButtons />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/horaires-messes" element={<HorairesMesses />} />
                      <Route path="/secretariat" element={<Secretariat />} />
                      <Route path="/je-suis-nouveau" element={<JeSuisNouveauPage />} />
                      
                      {/* Pillar landing pages with cards */}
                      <Route path="/notre-dame-autan" element={<NotreDameAutanPage />} />
                      <Route path="/familles-jeunesse" element={<FamillesJeunessePage />} />
                      <Route path="/vie-spirituelle" element={<VieSpirituelePage />} />
                      <Route path="/grandir-foi" element={<GrandirFoiPage />} />
                      <Route path="/solidarite" element={<SolidaritePage />} />
                      
                      {/* Pillar 1: Notre Dame d'Autan - Sub-pages */}
                      <Route path="/equipe-pastorale" element={<EquipePastoralePage />} />
                      <Route path="/equipe-pastorale/:memberId" element={<ContentPage section="equipe-detail" />} />
                      <Route path="/vie-economique" element={<ContentPage section="economique" />} />
                      <Route path="/nos-clochers" element={<NosClochersPage />} />
                      <Route path="/nos-clochers/:clocherId" element={<ContentPage section="clocher-detail" />} />
                      <Route path="/services-transverses" element={<ContentPage section="services" />} />
                      
                      {/* Pillar 2: Familles & Jeunesse - Sub-pages */}
                      <Route path="/eveil-foi" element={<ContentPage section="eveil" />} />
                      <Route path="/catechisme" element={<ContentPage section="catechisme" />} />
                      <Route path="/aumonerie" element={<ContentPage section="aumonerie" />} />
                      <Route path="/mouvements" element={<ContentPage section="mouvements" />} />
                      <Route path="/servants-vocations" element={<ContentPage section="servants" />} />
                      
                      {/* Pillar 3: Vie Spirituelle - Sub-pages */}
                      <Route path="/demander-sacrement" element={<DemanderSacrementPage />} />
                      <Route path="/sacrements/:sacrementId" element={<SacrementDetailPage />} />
                      <Route path="/mariage" element={<ContentPage section="mariage" />} />
                      <Route path="/liturgie-musique" element={<ContentPage section="liturgie" />} />
                      <Route path="/funerailles" element={<ContentPage section="funerailles" />} />
                      
                      {/* Pillar 4: Grandir dans la Foi - Sub-pages */}
                      <Route path="/alpha-catechumenat" element={<ContentPage section="alpha" />} />
                      <Route path="/groupes-partage" element={<ContentPage section="groupes" />} />
                      <Route path="/meditation" element={<ContentPage section="meditation" />} />
                      <Route path="/ressources" element={<ContentPage section="ressources" />} />
                      
                      {/* Pillar 5: Solidarité - Sub-pages */}
                      <Route path="/service-ecoute" element={<ContentPage section="ecoute" />} />
                      <Route path="/visite-malades" element={<ContentPage section="malades" />} />
                      <Route path="/entraide" element={<ContentPage section="entraide" />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;