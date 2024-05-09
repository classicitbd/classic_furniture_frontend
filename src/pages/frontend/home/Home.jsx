import Slider from "../../../components/frontend/ui/slider/Slider";
import CategoryWiseProduct from "./CategoryWiseProduct";
import NewArrival from "./NewArrival";
import PopularCategory from "./PopularCategory";

const Home = () => {
  return (
    <main className="">
      <Slider />
      <PopularCategory className="mt-6" />
      <NewArrival />
      <CategoryWiseProduct />
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
