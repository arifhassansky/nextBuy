import Category from "@/components/Category/Category";
import Footer from "@/components/Footer/Footer";
import LatestArticlesSlider from "@/components/LatestArticlesSlider/LatestArticlesSlider";
import NewsletterSection from "@/components/NewsletterSection/NewsletterSection";
import ProductsCard from "@/components/productsCard/ProductsCard";
import Quality from "@/components/Quality/Quality";
import Slider from "@/components/Slider/Slider";
import TechnicalSpecifications from "@/components/TechnicalSpecifications/TechnicalSpecifications";

export default function Home() {
  console.log(process.env.NEXTAUTH_URL);
  return (
    <>
      <Slider />
      <Category />
      <Quality />
      <TechnicalSpecifications />
      <ProductsCard />
      <LatestArticlesSlider />
      <NewsletterSection />
      {/* <ProductsCard /> */}
      <Footer />
    </>
  );
}
