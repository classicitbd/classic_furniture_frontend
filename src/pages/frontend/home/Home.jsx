import Slider from "../../../components/frontend/ui/slider/Slider";
import CategoryWiseProduct from "./CategoryWiseProduct";
import PopularCategory from "./PopularCategory";
import ProductSale from "./ProductSale";


const Home = () => {


  return (
    <main className="">
      <Slider />
      <PopularCategory className="mt-6" />
      <ProductSale/>
      <CategoryWiseProduct/>
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
