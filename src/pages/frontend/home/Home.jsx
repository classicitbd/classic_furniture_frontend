import Category from "../../../components/frontend/ui/category/Category";
import Slider from "../../../components/frontend/ui/slider/Slider";

import ArrivalBottomProducts from "../../../components/frontend/ui/arrivalProducts/ArrivalBottomProducts";
import ArrivalTopProducts from "../../../components/frontend/ui/arrivalProducts/ArrivalTopProducts";
import SubCategory from "../../../components/frontend/ui/subCategory/SubCategory";
import CollectionCategory from "../../../components/frontend/ui/collectionCategory/CollectionCategory";
import CollectionTopCategory from "../../../components/frontend/ui/collectionCategory/CollectionTopCategory";
// import Header from "../../../shared/header/Header";
import CategorySlider from "../../../components/frontend/ui/slider/CategorySlider";
// import TopHeader from "../../../shared/header/TopHeader";


const Home = () => {
  

  return (
    <main className="">
      {/* <div className="hidden lg:block">
        <TopHeader />
      </div>
      <div
      >
        <Header />
      </div> */}
      <Slider />
      <Category />
      <section className="py-5 lg:py-10">
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
