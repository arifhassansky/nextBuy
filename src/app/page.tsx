import Footer from '@/components/Footer/Footer';
import LatestArticlesSlider from '@/components/LatestArticlesSlider/LatestArticlesSlider';
import Navbar from '@/components/Navbar';
import Slider from '@/components/Slider';
import TechnicalSpecifications from '@/components/TechnicalSpecifications/TechnicalSpecifications';

export default function Home() {
   return (
      <>
         <Navbar />
         <Slider />
         <TechnicalSpecifications/>
         <LatestArticlesSlider/>
         <Footer />
      </>
   );
}
