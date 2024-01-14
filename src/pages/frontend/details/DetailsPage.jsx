import { useEffect } from "react";
import AlsoLikeProducts from "../../../components/frontend/ui/alsoLikeProducts/AlsoLikeProducts";
import ProductDetails from "../../../components/frontend/ui/details/ProductDetails";
import RelatedProducts from "../../../components/frontend/ui/relatedProducts/RelatedProducts";

const DetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="bg-white pb-10">
      <ProductDetails />
      <section className="py-10 bg-[#F0F0F0] rounded-lg border mb-10 sm:mx-5">
        <RelatedProducts />
      </section>
      <section className="py-10 bg-[#F0F0F0] rounded-lg border mt-20 mb-10 mx-5">
        <AlsoLikeProducts />
      </section>
    </main>
  );
};

export default DetailsPage;
