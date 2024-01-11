import ProductDetails from "../../../components/frontend/ui/details/ProductDetails";
import RelatedProducts from "../../../components/frontend/ui/relatedProducts/RelatedProducts";

const DetailsPage = () => {
  return (
    <main className="bg-white pb-10">
      <ProductDetails />
      <section className="py-10 bg-[#F0F0F0] rounded-lg border mt-20 mb-10 mx-5">
        <RelatedProducts />
      </section>
    </main>
  );
};

export default DetailsPage;
