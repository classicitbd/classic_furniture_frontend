import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import SliderImage from "../../../components/dashboard/Slider/SliderImage";
import SliderTable from "../../../components/dashboard/Slider/SliderTable";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import BigSpinner from "../../../shared/loader/BigSpinner";

const Slider = () => {
  const {
    data: sliders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/api/v1/slider"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/slider`);
      const data = await res.json();
      return data;
    },
  }); // get all slider

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div className="">
      {/* Slider Page Navbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Slider</h3>
        <div className="flex items-center gap-2">
          <Link to="/admin">
            <p>
              <PiHouseBold size={25} color="#3EA2FA" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link to="/admin/slider">
            <p className="font-semibold">Slider</p>
          </Link>
        </div>
      </div>

      {/* Show Slider */}
      <SliderImage sliders={sliders} />

      {/* Show all image in a table */}
      <SliderTable sliders={sliders} refetch={refetch} />
    </div>
  );
};

export default Slider;
