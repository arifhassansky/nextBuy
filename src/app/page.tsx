import Category from "@/components/Category/Category";
import Footer from "@/components/Footer/Footer";
import LatestArticlesSlider from "@/components/LatestArticlesSlider/LatestArticlesSlider";
import ResponsiveNavbar from "@/components/megamenu/ResponsiveNavbar";
import Navbar from "@/components/Navbar/Navbar";
import ProductsCard from "@/components/productsCard/productsCard";
import Quality from "@/components/Quality/Quality";
import Slider from "@/components/Slider/Slider";
import TechnicalSpecifications from "@/components/TechnicalSpecifications/TechnicalSpecifications";

export default function Home() {
  return (
    <>
      <Navbar />

      <Slider />
      <Category />
      <Quality />
      <TechnicalSpecifications />
      <ProductsCard />
      <LatestArticlesSlider />
      {/* <ProductsCard /> */}
      <Footer />
    </>
  );
}
