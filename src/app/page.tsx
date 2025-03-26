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
}
