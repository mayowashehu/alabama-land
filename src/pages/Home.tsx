import { HeroSection } from '../components/sections/HeroSection';
import { StatsSection } from '../components/sections/StatsSection';
import { FeaturedListings } from '../components/sections/FeaturedListings';
import { OwnerTrustSection } from '../components/sections/OwnerTrustSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <FeaturedListings />
      <OwnerTrustSection />
      <TestimonialsSection />
    </main>
  );
}
