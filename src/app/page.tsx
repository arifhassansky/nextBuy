import Footer from '@/components/Footer/Footer';
import LatestArticlesSlider from '@/components/LatestArticlesSlider/LatestArticlesSlider';
import Navbar from '@/components/Navbar';
import Slider from '@/components/Slider';
import TechnicalSpecifications from '@/components/TechnicalSpecifications/TechnicalSpecifications';
import Card from '@/components/ui/Card/Card';

export default function Home() {
   return (
      <>
         <Navbar />
         <Slider />
         <TechnicalSpecifications/>
         <LatestArticlesSlider/>
         <Card />
         <Footer />
      </>
   );
}
