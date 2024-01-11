import Category from "../../../components/frontend/ui/category/Category";
import Slider from "../../../components/frontend/ui/slider/Slider";

import ArrivalBottomProducts from "../../../components/frontend/ui/arrivalProducts/ArrivalBottomProducts";
import ArrivalTopProducts from "../../../components/frontend/ui/arrivalProducts/ArrivalTopProducts";
import SubCategory from "../../../components/frontend/ui/subCategory/SubCategory";
import CollectionCategory from "../../../components/frontend/ui/collectionCategory/CollectionCategory";
import CollectionTopCategory from "../../../components/frontend/ui/collectionCategory/CollectionTopCategory";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="">
      <Slider />
      <Category />
      <section>
        <ArrivalTopProducts />
        <ArrivalBottomProducts />
      </section>
      <section>
        <SubCategory />
        <CollectionTopCategory />
        <CollectionCategory />
      </section>
    </main>
  );
};

export default Home;
