import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import sslcommerceLogo from "../../assets/images/SSLCommerz-Pay-With-logo-All-Size-05.png";

const portfilioLinks = [
  { path: "#", label: "Facebook" },
  { path: "#", label: "Instagram" },
  { path: "#", label: "Youtube" },
  { path: "#", label: "Linkedin" },
];

const quickLinks = [{ path: "#", label: "Our Story" }];

const helpfulLinks = [
  { path: "#", label: "Store Locator" },
  { path: "#", label: "Contact Us" },
  { path: "#", label: "Shipping Info" },
  { path: "#", label: "Return & Exchange" },
  { path: "#", label: "Materials & Care" },
];

const Footer = () => {
  const year = new Date().getFullYear();

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

          {/* social media link */}
          <ul className="list-none ml-0 mb-0">
            <li className="leading-[30px]">
              <h2
                className="mb-6 font-semibold text-[#A9A9A9] uppercase"
                style={{ fontSize: "20px" }}
              >
                Find Us On
              </h2>
            </li>
            {portfilioLinks.map((item, index) => (
              <li
                key={index}
                className="flex items-center mt-3 transition-all duration-300 hover:text-[#ffffff] hover:translate-x-1"
              >
                <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
                <Link
                  to={item.path}
                  className="flex flex-col  text-[15px] hover:decoration-primaryColor"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

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
            copyright &#169; {year} developed by
            <strong>
              <a
                rel="noreferrer"
                href="https://classicit.com.bd"
                target="_blank"
                className="text-[#0861F2] underline hover:decoration-primaryColor"
              >
                <span>Classic It</span>
              </a>
            </strong>{" "}
            || All right reserved
          </p>
          {/* <nav className="flex gap-x-1 pb-16 md:pb-0">
            <a
              href="http://www.facebook.com/masudranawebdev"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <span className="w-10 h-10 rounded-full bg-[#1877f2] transition-all duration-500 flex items-center justify-center group-hover:-translate-y-1">
                <FaFacebookF className="text-slate-50 text-[#ffffff] transition-all duration-500" />
              </span>
            </a>
            <a
              href="http://www.linkedin.com/in/masudranawebdev"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <span className="w-10 h-10 rounded-full bg-[#1877f2] transition-all duration-500 flex items-center justify-center group-hover:-translate-y-1">
                <FaLinkedinIn className="text-slate-50 text-[#ffffff] transition-all duration-500" />
              </span>
            </a>
            <a
              href="http://www.github.com/masudranawebdev"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <span className="w-10 h-10 rounded-full bg-[#1877f2] transition-all duration-500 flex items-center justify-center group-hover:-translate-y-1">
                <FaGithub className="text-slate-50 text-[#ffffff] transition-all duration-500" />
              </span>
            </a>
            <a
              href="http://mrmasud.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <span className="w-10 h-10 rounded-full bg-[#1877f2] transition-all duration-500 flex items-center justify-center group-hover:-translate-y-1">
                <FaBriefcase className="text-slate-50 text-[#ffffff] transition-all duration-500" />
              </span>
            </a>
          </nav> */}
        </div>
      </div>
    </section>
  );
};

export default Footer;