import Category from "../../../components/frontend/ui/category/Category";
import Slider from "../../../components/frontend/ui/slider/Slider";

import ArrivalBottomProducts from "../../../components/frontend/ui/arrivalProducts/ArrivalBottomProducts";
import ArrivalTopProducts from "../../../components/frontend/ui/arrivalProducts/ArrivalTopProducts";
import SubCategory from "../../../components/frontend/ui/subCategory/SubCategory";
import CollectionCategory from "../../../components/frontend/ui/collectionCategory/CollectionCategory";
import CollectionTopCategory from "../../../components/frontend/ui/collectionCategory/CollectionTopCategory";
import { useEffect, useState } from "react";
import Header from "../../../shared/header/Header";
import CategorySlider from "../../../components/frontend/ui/slider/CategorySlider";

const Home = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isScrolled = scrollTop > 100;

      setIsHeaderFixed(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // useEffect will run once when the component mounts

  return (
    <main className="">
      {/* <Navbar /> */}
      <div
        className={`${
          isHeaderFixed
            ? "sticky bg-primaryColor"
            : "fixed hover:bg-primaryColor"
        } top-0 transition-all duration-500 ease-in-out z-30 w-full `}
      >
        <Header />
      </div>
      <Slider />
      <Category />
      <section>
        <ArrivalTopProducts />
        <ArrivalBottomProducts />
      </section>
      <CategorySlider />
      <section>
        <SubCategory />
        <CollectionTopCategory />
        <CollectionCategory />
      </section>
    </main>
  );
};

export default Home;
