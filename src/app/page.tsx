<<<<<<< HEAD

import Footer from '@/components/Footer/Footer';
import LatestArticlesSlider from '@/components/LatestArticlesSlider/LatestArticlesSlider';
import Navbar from '@/components/Navbar';
import ProductsCard from '@/components/productsCard/ProductsCard';
// import ProductsCard from '@/components/productsCard/productsCard';
import Slider from '@/components/Slider/Slider';
// import Slider from '@/components/Slider';
import TechnicalSpecifications from '@/components/TechnicalSpecifications/TechnicalSpecifications';

export default function Home() {
   return (
      <>
         <Navbar />
         <Slider />
         <TechnicalSpecifications />
         <ProductsCard />
         <LatestArticlesSlider />
         <Footer />
      </>
   );
=======
import Category from "@/components/Category/Category";
import Footer from "@/components/Footer/Footer";
import LatestArticlesSlider from "@/components/LatestArticlesSlider/LatestArticlesSlider";
import NewsletterSection from "@/components/NewsletterSection/NewsletterSection";
import ProductsCard from "@/components/productsCard/ProductsCard";
import Quality from "@/components/Quality/Quality";
import Slider from "@/components/Slider/Slider";
import TechnicalSpecifications from "@/components/TechnicalSpecifications/TechnicalSpecifications";

export default function Home() {
  return (
    <>
      <Slider />
      <Category />
      <Quality />
      <TechnicalSpecifications />
      <ProductsCard />
      <LatestArticlesSlider />
      <NewsletterSection/>
      {/* <ProductsCard /> */}
      <Footer />
    </>
  );
>>>>>>> 61fc69e5a1f494987d96ed82a4bd334699aa153e
}
