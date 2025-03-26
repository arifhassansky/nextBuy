import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar';
import Slider from '@/components/Slider';
import TechnicalSpecifications from '@/components/TechnicalSpecifications/TechnicalSpecifications';

export default function Home() {
   return (
      <>
         <Navbar />
         <Slider />
         <TechnicalSpecifications/>
         <Footer />
      </>
   );
}
