import { Hero } from '@/components/Hero';
import { NewsSection } from '@/components/NewsSection';

const HomePage = () => {
  return (
    <div data-testid="home-page">
      <Hero />
      <NewsSection />
    </div>
  );
};

export default HomePage;