import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/baseURL";
import { BiSolidMap } from "react-icons/bi";
import { TbClockPause } from "react-icons/tb";
import { FaUmbraco } from "react-icons/fa";
import sslcommerceLogo from "../../assets/images/SSLCommerz-Pay-With-logo-All-Size-05.png";
const quickLinks = [
  // { path: "/about-us", label: "Our Story" },
  { path: "/refund-policy", label: "Refund Policy" },
  { path: "/cancellation-policy", label: "Cancellation Policy" },
  { path: "/term-&-condition", label: "Terms & Condition" },
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/return-policy", label: "Return policy" },
];

// const helpfulLinks = [
//   { path: "/store-locator", label: "Store Locator" },
//   { path: "/about-us", label: "About Us" },
// ];

const Footer = () => {
  const { data: footerData = [], isLoading } = useQuery({
    queryKey: ["siteSetting"],

    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = res.json();
      return data;
    },
  });
  console.log(footerData);
  const handleEmailClick = () => {
    window.location.href = `mailto:masudranainfo99@gmail.com`;
  };

  if (isLoading) {
    return null;
  }

  return (
    <section className="bg-primaryDeepColor text-textColor border-t-[2px] border-secondary ">
      <div className=" es_container mx-auto md:px-20 xl:px-0 px-5 pt-6 lg:pb-0 md:pb-6  sm:pb-20 pb-20">
        {/* footer top */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 px-6 gap-2 md:grid-cols-4 xl:grid-cols-6 py-6">
          {/* helpful links */}
          <ul className="list-none ml-0 mb-0">
            <li className="leading-[30px] font-[500]">
              <h2
                className="mb-3 lg:mb-6 text-secondary uppercase"
                style={{ fontSize: "20px" }}
              >
                Need Help
              </h2>
            </li>
            {/* <li className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1">
              <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
            </li> */}

            <li className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1">
              <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
              <Link
                to={`${footerData?.data[0]?.location}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col text-[15px] hover:decoration-primaryColor"
              >
                Store Location
              </Link>
            </li>
            <li className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1">
              <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>

          {/* company */}
          <ul className="list-none ml-0 mb-0">
            <li className="leading-[30px] font-[500]">
              <h2
                className="mb-3 lg:mb-6 text-secondary uppercase"
                style={{ fontSize: "20px" }}
              >
                The Company
              </h2>
            </li>
            {quickLinks?.map((item, index) => (
              <li
                key={index}
                className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1"
              >
                <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
                <Link
                  to={item?.path}
                  className="flex flex-col text-[15px] hover:decoration-primaryColor"
                >
                  {item?.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Goal */}
          {/* <ul className="list-none ml-0 mb-0">
            <li className="leading-[30px] font-[500]">
              <h2
                className="mb-3 lg:mb-6 text-secondary uppercase"
                style={{ fontSize: "20px" }}
              >
                The Goal
              </h2>
            </li>
            {quickLinks?.map((item, index) => (
              <li
                key={index}
                className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1"
              >
                <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
                <Link
                  to={item?.path}
                  className="flex flex-col text-[15px] hover:decoration-primaryColor"
                >
                  {item?.label}
                </Link>
              </li>
            ))}
          </ul> */}

          <div className=" ">
            <h2
              className="mb-3 lg:mb-6 text-secondary uppercase"
              style={{ fontSize: "20px" }}
            >
              Contact Details
            </h2>
            <ul className="flex flex-col gap-y-1 list-none mt-5">
              <li className="flex items-center gap-3 mb-2">
                <span>
                  <BiSolidMap className="text-xl text-secondary" />
                </span>
                <span className="text-[14px] leading-4 font-[300]">
                  <strong>Address: </strong>
                  <span>{footerData?.data[0]?.address}</span>
                </span>
              </li>
              <li className="flex items-center gap-3 mb-2">
                <span>
                  <TfiHeadphoneAlt className="text-xl text-secondary" />
                </span>
                <h3 className="text-[14px] leading-4 font-[300]">
                  <strong>Call Us: </strong>
                  <span>{footerData?.data[0]?.emergency_contact}</span>
                </h3>
              </li>
              <li className="flex items-center gap-3 mb-2">
                <span>
                  <SiMinutemailer className="text-xl text-secondary" />
                </span>
                <h3
                  onClick={handleEmailClick}
                  className="text-[14px] leading-4 font-[300]"
                >
                  <strong>Email: </strong>
                  <span>{footerData?.data[0]?.email}</span>
                </h3>
              </li>
              <li className="flex items-center gap-3">
                <span>
                  <TbClockPause className="text-xl text-secondary" />
                </span>
                <h3 className="text-[14px] leading-4 font-[300]">
                  <strong>Hours: </strong>
                  <span>{footerData?.data[0]?.start_close}</span>
                </h3>
              </li>
              <li className="flex items-center gap-3 mt-1">
                <span>
                  <FaUmbraco className="text-xl text-secondary" />
                </span>
                <h3 className="text-[14px] leading-4 font-[300]">
                  <strong>TIN: </strong>
                  <span className="ml-1">{footerData?.data[0]?.tin}</span>
                </h3>
              </li>
            </ul>
          </div>
          {/* ------ social media link ------ start */}
          <ul className="list-none ml-0 mb-0">
            <li className="leading-[30px]">
              <h2
                className="mb-3 lg:mb-6 text-secondary uppercase"
                style={{ fontSize: "20px" }}
              >
                Find us on
              </h2>
            </li>

            <li className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1">
              <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
              <Link
                to={`${footerData?.data[0]?.facebook}`}
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                FaceBook
              </Link>
            </li>
            <li className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1">
              <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
              <Link
                to={`${footerData?.data[0]?.instagram}`}
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                Instagram
              </Link>
            </li>
            <li className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1">
              <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
              <Link
                to={`${footerData?.data[0]?.watsapp}`}
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                WhatsApp
              </Link>
            </li>

            <li className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1">
              <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
              <Link
                to={`${footerData?.data[0]?.you_tube}`}
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                Youtube
              </Link>
            </li>
          </ul>

          {/* ------ social media link ------ end */}

          {/* payment gateway */}

          <div className=" xl:col-span-2 lg:-col-span-1 md:col-span-4 sm:col-span-2 col-span-1 pt-6 ">
            <img
              className="sm:h-[220px] lg:h-[260px] xl:h-auto w-full"
              // src="https://traack.com.bd/assets/SSLCommerz-Pay-With-logo-All-Size-05-IaTT5Yxn.png"
              src={sslcommerceLogo}
              alt=""
            />
          </div>
        </div>
        {/* <div className="es_container mx-auto md:px-20 xl:px-0 px-5 w-full">
          <img
            className=" h-[80px] md:h-[220px]"
            alt=""
          />
        </div> */}

        {/* footer bottom */}
        <div className="border-t mt-5 border-bgray-400 flex flex-col md:flex-row justify-center items-center pt-5 md:pb-16 lg:pb-5 gap-3 es_container mx-auto md:px-20 xl:px-0 px-5">
          <p className="text-[15px] text-center md:text-left leading-7 font-[200]">
            copyright © 2024 {footerData?.data[0]?.title} developed by{" "}
            <Link
              target="_blank"
              to={`https://classicit.com.bd`}
              className="text-[#f4f6f8] underline"
            >
              Classic IT
            </Link>{" "}
            || All right reserved
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
