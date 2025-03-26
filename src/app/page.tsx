import Footer from "@/components/Footer/Footer";
import LatestArticlesSlider from "@/components/LatestArticlesSlider/LatestArticlesSlider";
import Navbar from "@/components/Navbar";
import ProductsCard from "@/components/productsCard/productsCard";
import Slider from "@/components/Slider/Slider";
import TechnicalSpecifications from "@/components/TechnicalSpecifications/TechnicalSpecifications";
// import  from "@/components/ui/Card/Card";

export default function Home() {
  return (
    <>
      <Navbar />
      <Slider />

      <TechnicalSpecifications />
      <ProductsCard />

      <LatestArticlesSlider />
      <ProductsCard />
      <Footer />
    </>
  );
}
