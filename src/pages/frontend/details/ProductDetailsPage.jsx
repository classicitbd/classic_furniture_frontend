import { useEffect } from "react";
import ProductDetails from "../../../components/frontend/ui/productDetails/ProductDetails";

export default function ProductDetailsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <ProductDetails />
    </>
  );
}
