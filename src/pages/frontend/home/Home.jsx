import Slider from "../../../components/frontend/ui/slider/Slider";
import PopularCategory from "./PopularCategory";
import ProductSale from "./ProductSale";


const Home = () => {


  return (
    <main className="">
      <Slider />
      <PopularCategory />
      <ProductSale/>
      {/* <Category /> */}
      {/* <section className="py-5 lg:py-10">
        <ArrivalTopProducts />
        <ArrivalBottomProducts />
      </section>
      <CategorySlider />
      <section>
        <SubCategory />
        <CollectionTopCategory />
        <CollectionCategory />
      </section> */}
    </main>
  );
};

export default Home;
