import Category from "../../../components/frontend/ui/category/Category";
import Slider from "../../../components/frontend/ui/slider/Slider";

import ArrivalBottomProducts from "../../../components/frontend/ui/arrivalProducts/ArrivalBottomProducts";
import ArrivalTopProducts from "../../../components/frontend/ui/arrivalProducts/ArrivalTopProducts";
import SubCategory from "../../../components/frontend/ui/subCategory/SubCategory";

const Home = () => {
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
      </section>
    </main>
  );
};

export default Home;
