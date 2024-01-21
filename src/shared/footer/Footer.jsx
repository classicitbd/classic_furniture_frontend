import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import sslcommerceLogo from "../../assets/images/SSLCommerz-Pay-With-logo-All-Size-05.png";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/baseURL";

const quickLinks = [{ path: "/about-us", label: "Our Story" }];

const helpfulLinks = [
  { path: "/contact", label: "Contact Us" },
  { path: "/shipping-info", label: "Shipping Info" },
  { path: "/return-exchange", label: "Return & Exchange" },
  { path: "/materials-care", label: "Materials & Care" },
];

const Footer = () => {
  const { data: footerData = [] } = useQuery({
    queryKey: ["socialMedia"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = res.json();
      return data;
    },
  });
  return (
    <section className="bg-[#000000] text-[#A9A9A9] border-t-[2px] border-[#A9A9A9]">
      <div className="container pt-10">
        {/* footer top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {/* helpful links */}
          <ul className="list-none ml-0 mb-0">
            <li className="leading-[30px] font-[500]">
              <h2
                className="mb-6 text-[#A9A9A9] uppercase"
                style={{ fontSize: "20px" }}
              >
                Need Help?
              </h2>
            </li>
            <li className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1">
              <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
              <Link
                to={footerData?.data[0]?.location}
                target="_blank"
                className="flex flex-col text-[15px] hover:decoration-primaryColor"
              >
                Store Locator
              </Link>
            </li>
            {helpfulLinks.map((item, index) => (
              <li
                key={index}
                className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1"
              >
                <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
                <Link
                  to={item.path}
                  className="flex flex-col text-[15px] hover:decoration-primaryColor"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* company */}
          <ul className="list-none ml-0 mb-0">
            <li className="leading-[30px] font-[500]">
              <h2
                className="mb-6 text-[#A9A9A9] uppercase"
                style={{ fontSize: "20px" }}
              >
                The Company
              </h2>
            </li>
            {quickLinks.map((item, index) => (
              <li
                key={index}
                className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1"
              >
                <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
                <Link
                  to={item.path}
                  className="flex flex-col text-[15px] hover:decoration-primaryColor"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ------ social media link ------ start */}
          <ul className="list-none ml-0 mb-0">
            <li className="leading-[30px]">
              <h2
                className="mb-6 font-semibold text-[#A9A9A9] uppercase"
                style={{ fontSize: "20px" }}
              >
                Find Us On
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
                to={`${footerData?.data[0]?.youTube}`}
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                Youtube
              </Link>
            </li>
          </ul>

          {/* ------ social media link ------ end */}

          {/* payment gateway */}
          <div className="md:col-span-2 pr-10">
            <Link
              className="mb-6 font-semibold text-[#A9A9A9] uppercase"
              style={{ fontSize: "20px" }}
              to={"/"}
            >
              Classic It
            </Link>
            <p className="text-[16px] leading-5 font-[400] mt-4 tracking-tighter">
              We are provide our website all sslcommerce payment system in buy
              any product easily. Welcome to Classic It.
            </p>
            <div>
              <img src={sslcommerceLogo} alt="sslcommerceLogo" />
            </div>
          </div>
        </div>

        {/* footer bottom */}
        <div className="border-t mt-5 border-bgray-400 flex flex-col md:flex-row justify-center items-center pt-5 md:pb-16 lg:pb-5 gap-3">
          <p className="text-[16px] text-center md:text-left leading-7 font-[400]">
            {footerData?.data[0]?.copyRight}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
