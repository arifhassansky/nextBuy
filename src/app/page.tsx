<<<<<<< HEAD
import Category from "@/components/Category/Category";
import Navbar from "@/components/Navbar/Navbar";
import Quality from "@/components/Quality/Quality";
import Slider from "@/components/Slider/Slider";

export default function Home() {
  return (
    <>
      <Navbar />
      <Slider />
      <Category />
      <Quality />
    </>
  );
=======
import Footer from '@/components/Footer/Footer';
import LatestArticlesSlider from '@/components/LatestArticlesSlider/LatestArticlesSlider';
import Navbar from '@/components/Navbar';
import ProductsCard from '@/components/productsCard/productsCard';
import Slider from '@/components/Slider';
import TechnicalSpecifications from '@/components/TechnicalSpecifications/TechnicalSpecifications';

export default function Home() {
   return (
      <>
         <Navbar />
         <Slider />
<<<<<<< HEAD
         <TechnicalSpecifications />
         <ProductsCard />
=======
         <TechnicalSpecifications/>
         <LatestArticlesSlider/>
         <Card />
>>>>>>> 94106403f3258c2737afa4ef042995b67feec5fe
         <Footer />
      </>
   );
>>>>>>> a070efd0c83466948146cdc90042c17c850f7c3b
}
