import { useEffect } from "react";
import AlsoLikeProducts from "../../../components/frontend/ui/alsoLikeProducts/AlsoLikeProducts";
import ProductDetails from "../../../components/frontend/ui/details/ProductDetails";
import RelatedProducts from "../../../components/frontend/ui/relatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import Header from "../../../shared/header/Header";

const DetailsPage = () => {
  const { slug } = useParams();
  const { data: product = [] } = useQuery({
    queryKey: [`/api/v1/product/${slug}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product/${slug}`);
      const data = await res.json();
      return data;
    },
  }); // get All Product

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white pb-10">
      <div className="sticky top-0 bg-primaryColor z-30">
        <Header />
      </div>
      <ProductDetails product={product} />
      <section>
        <RelatedProducts
          relatedId={product?.data?.related}
          color={product?.data?.colorId?.color}
        />
      </section>
      <section className="py-10 bg-[#F0F0F0] rounded-lg border mt-20 mb-10 mx-5">
        <AlsoLikeProducts />
      </section>
    </main>
  );
};

export default DetailsPage;
