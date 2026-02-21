import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import HorairesMesses from '@/pages/HorairesMesses';
import Secretariat from '@/pages/Secretariat';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import ContentPage from '@/pages/ContentPage';
import PillarPage from '@/pages/PillarPages';

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
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/horaires-messes" element={<HorairesMesses />} />
                      <Route path="/secretariat" element={<Secretariat />} />
                      
                      {/* Pillar landing pages */}
                      <Route path="/notre-dame-autan" element={<PillarPage pillarKey="notre-dame-autan" />} />
                      <Route path="/familles-jeunesse" element={<PillarPage pillarKey="familles-jeunesse" />} />
                      <Route path="/vie-spirituelle" element={<PillarPage pillarKey="vie-spirituelle" />} />
                      <Route path="/grandir-foi" element={<PillarPage pillarKey="grandir-foi" />} />
                      <Route path="/solidarite" element={<PillarPage pillarKey="solidarite" />} />
                      
                      {/* Pillar 1: Notre Dame d'Autan */}
                      <Route path="/equipe-pastorale" element={<ContentPage section="equipe" />} />
                      <Route path="/vie-economique" element={<ContentPage section="economique" />} />
                      <Route path="/nos-clochers" element={<ContentPage section="clochers" />} />
                      <Route path="/services-transverses" element={<ContentPage section="services" />} />
                      
                      {/* Pillar 2: Familles & Jeunesse */}
                      <Route path="/eveil-foi" element={<ContentPage section="eveil" />} />
                      <Route path="/catechisme" element={<ContentPage section="catechisme" />} />
                      <Route path="/aumonerie" element={<ContentPage section="aumonerie" />} />
                      <Route path="/mouvements" element={<ContentPage section="mouvements" />} />
                      <Route path="/servants-vocations" element={<ContentPage section="servants" />} />
                      
                      {/* Pillar 3: Vie Spirituelle */}
                      <Route path="/demander-sacrement" element={<ContentPage section="sacrement" />} />
                      <Route path="/mariage" element={<ContentPage section="mariage" />} />
                      <Route path="/liturgie-musique" element={<ContentPage section="liturgie" />} />
                      <Route path="/funerailles" element={<ContentPage section="funerailles" />} />
                      
                      {/* Pillar 4: Grandir dans la Foi */}
                      <Route path="/alpha-catechumenat" element={<ContentPage section="alpha" />} />
                      <Route path="/groupes-partage" element={<ContentPage section="groupes" />} />
                      <Route path="/meditation" element={<ContentPage section="meditation" />} />
                      <Route path="/ressources" element={<ContentPage section="ressources" />} />
                      
                      {/* Pillar 5: Solidarité */}
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