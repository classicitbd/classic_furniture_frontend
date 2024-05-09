// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import Loader from "../../../common/Loader/Loader";
// import ProductHighlightSection from "../../../components/Frontend/ProductDetailsPage/ProductHighlightSection";
// import RightSideShoppingSection from "../../../components/Frontend/ProductDetailsPage/RightSideShoppingSection";
// import ProductAccordion from "../../../components/Frontend/ProductDetailsPage/ProductAccordion";
// import SuggestProduct from "../../../components/Frontend/ProductDetailsPage/SuggestProduct";
// import RelatedProducts from "../../../components/Frontend/ProductDetailsPage/RelatedProducts";
// import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";

// const ProductDetailsPage = () => {
//   const { id } = useParams();
//   const [singleProduct, setSingleProduct] = useState({});
//   const [isLoading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     fetch(`https://dummyjson.com/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.error) {
//           setSingleProduct({});

//           toast.error("Sorry! Product is not available.");
//         } else {
//           setSingleProduct(data);
//         }
//         setLoading(false);
//       });
//   }, [id]);

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <section>
//       <div className="max-w-[1300px] mx-auto my-8  bg-white p-5  ">
//         <div className="grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-7 ">
//           <div className=" lg:col-span-2 md:col-span-2 sm:col-span-1  col-span-1 ">
//             <div className="">
//               <div className="border border-gray-200 p-2">
//                 <img
//                   className=" w-full lg:h-[382px]  md:h-[272px] sm:h-[353px]"
//                   src={selectedImage ? selectedImage : singleProduct.thumbnail}
//                   alt="product"
//                 />
//               </div>

//               <div className="flex flex-wrap my-2 ">
//                 {singleProduct.images &&
//                   singleProduct.images.map((image, index) => (
//                     <img
//                       key={index}
//                       src={image}
//                       alt={`image-${index}`}
//                       className={`h-16 w-16 border  p-1 mr-2 my-2 ${
//                         selectedImage === image
//                           ? "border-ftPrimaryColor"
//                           : "border-gray-200"
//                       }`}
//                       onClick={() => setSelectedImage(image)}
//                     />
//                   ))}
//               </div>
//             </div>
//           </div>

//           {/* Name price and buy add to cart section  */}
//           <div className="lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-1 px-4 ">
//             <ProductHighlightSection singleProduct={singleProduct} />
//           </div>

//           {/*--------- right sidebar -------- */}
//           <div className="lg:col-span-2 md:col-span-2 sm:col-span-3  col-span-1 px-4 ">
//             <RightSideShoppingSection singleProduct={singleProduct} />
//           </div>
//         </div>
//         {/* Accordion*/}

//         <div className="grid lg:grid-cols-7 md:grid-5 grid-cols-1 gap-2 my-10">
//           <div className="lg:col-span-5 md:col-span-3 col-span-1">
//             <ProductAccordion singleProduct={singleProduct} />
//           </div>

//           <div className="lg:col-span-2 md:col-span-2 col-span-1">
//             <SuggestProduct />
//           </div>
//         </div>
//       </div>

//       {/* Related Product */}

//       <div className="max-w-[1300px] mx-auto mt-16 mb-4  bg-white p-4 rounded-lg  ">
//         <p className="text-ftPrimaryColor font-bold">RELETED PRODUCT:</p>
//       </div>
//       {/* Related Product card */}
//       <div className="max-w-[1300px] mx-auto my-16   ">
//         <RelatedProducts />
//       </div>
//     </section>
//   );
// };

// export default ProductDetailsPage;

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const { data: product = [], isLoading } = useQuery({
    queryKey: [`/api/v1/product/${slug}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product/${slug}`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <MiniSpinner />;
  }
  return (
    <div>
      <h1 className="text-3xl">Name: {product?.data?.product_name}</h1>
    </div>
  );
};

export default ProductDetailsPage;
