import ShippingInfo from "../../../components/frontend/ui/shippingInfo/ShippingInfo";
import Header from "../../../shared/header/Header";

const ShippingInfoPage = () => {
  return (
    <div>
      <div className="sticky top-0 bg-primaryColor z-30">
        <Header />
      </div>
      <div className="py-10 w-full md:w-[768px] px-4 md:px-0 mx-auto">
        <ShippingInfo />
      </div>
    </div>
  );
};

export default ShippingInfoPage;
