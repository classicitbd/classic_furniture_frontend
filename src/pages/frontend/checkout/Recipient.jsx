// import react icons
import { IoHomeOutline } from "react-icons/io5";
import { IoBriefcaseOutline } from "react-icons/io5";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { CiEdit, CiHeart } from "react-icons/ci";
import { PiAddressBook } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import RecipientForm from "./RecipientForm";
import { useEffect, useState } from "react";
import { setCookie } from "../../../utils/cookie-storage";
import { SlPhone } from "react-icons/sl";
import VerifyModal from "../../../components/common/modal/VerifyModal";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  useOtpVerifyMutation,
  useResendOtpMutation,
} from "../../../redux/feature/auth/authApi";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const options = [
  {
    label: "Pathao",
    value: "pathao",
  },
  {
    label: "Sundarban Courier",
    value: "sundarban-courier",
  },
  {
    label: "SA Paribahan",
    value: "sa-paribahan",
  },
];

const Recipient = ({
  addressUpdate,
  setAddressUpdate,
  user,
  setUser,
  setDivision,
  setDistrict,
  district,
  division,
  setCurior,
  curior,
  addNote,
  setAddNote,
}) => {
  const [loading, setLoading] = useState(false);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);

  const { handleSubmit, reset } = useForm();

  const [otpVeriy, { isLoading }] = useOtpVerifyMutation();
  const [resendOtp] = useResendOtpMutation();
  const navigate = useNavigate();

  const { data: informations = [], refetch } = useQuery({
    queryKey: [`/api/v1/getMe/${user?.phone}`],
    queryFn: async () => {
      // Check if user?.phone is defined before making the query
      if (!user?.phone) {
        // Handle the case where user?.phone is undefined or null
        return [];
      }

      const res = await fetch(`${BASE_URL}/getMe/${user.phone}`);
      const data = await res.json();
      return data;
    },
  });

  const handleVerify = async () => {
    try {
      setLoading(true);
      const otp = OTPinput.join("");
      if (!otp || otp.length < 4) {
        toast.error("Must be provide OTP !");
        return;
      }
      const data = {
        phone: user?.phone,
        otp,
      };
      const res = await otpVeriy(data);

      if (res?.data?.success) {
        setCookie("user", JSON.stringify({ ...user, verify: true }));
        setAddressUpdate(!addressUpdate);
        setUser({ ...user, verify: true });
        toast.success(res?.data?.message, {
          autoClose: 1,
        });
        navigate(`/checkout`);
        reset();
      } else if (res?.error?.status === 400) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error("otp verified error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      if (disable) return;
      const data = {
        phone: user?.phone,
      };
      const res = await resendOtp(data);
      if (res?.data?.data?.success) {
        setDisable(true);
        toast.info(res?.data?.data?.message);
        setTimer(60);
      }
    } catch (error) {
      console.error("resend otp error", error);
    }
  };

  const handleInputChange = (index, value) => {
    const newOTPinput = [...OTPinput];
    newOTPinput[index] = value;
    setOTPinput(newOTPinput);

    // Automatically move to the next input field if the current field is not the last one
    if (index < newOTPinput.length - 1 && value !== "") {
      document.getElementById(`otpInput-${index + 1}`).focus();
    }
  };

  const handleInputKeyDown = (index, e) => {
    // Move to the previous input field on backspace if the current field is empty
    if (e.key === "Backspace" && index > 0 && OTPinput[index] === "") {
      document.getElementById(`otpInput-${index - 1}`).focus();
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); // each count lasts for a second
    // cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  useEffect(() => {
    setCookie("curior", JSON.stringify(curior));
  }, [curior]);

  return (
    <div className="px-5 md:px-10">
      <div className="flex items-center gap-7">
        <p className="bg-primaryColor text-textColor h-8 w-8 rounded-full flex justify-center items-center font-bold">
          1
        </p>
        <h2 className="text-xl font-semibold tracking-normal leading-5">
          Recipient
        </h2>
      </div>
      <div className="flex justify-between">
        <p className="py-5 font-semibold tracking-tight">Delivery Address</p>
        {user && (
          <div>
            {addressUpdate ? (
              <button
                onClick={() => setAddressUpdate(!addressUpdate)}
                className="flex items-center gap-1 text-[#549AFC]"
              >
                <span>Cancel</span>
              </button>
            ) : (
              <button
                onClick={() => setAddressUpdate(!addressUpdate)}
                className="flex items-center gap-1 text-[#549AFC]"
              >
                <CiEdit />
                <span>Edit</span>
              </button>
            )}
          </div>
        )}
      </div>
      {!user || addressUpdate ? (
        <RecipientForm
          setDivision={setDivision}
          setDistrict={setDistrict}
          district={district}
          division={division}
          setUser={setUser}
          userData={user}
          refetch={refetch}
          setAddressUpdate={setAddressUpdate}
          addressUpdate={addressUpdate}
        />
      ) : (
        <div>
          <table className="divide-y-2 divide-gray-200 bg-white text-sm mb-10">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 flex items-center gap-1">
                  <CiUser />
                  <span>Name</span>
                </td>
                <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                  {user?.name}
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 flex items-center gap-1">
                  <SlPhone />
                  <span>Phone</span>
                </td>

                <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                  {user?.phone}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 flex items-center gap-1">
                  <PiAddressBook />
                  <span>Address</span>
                </td>
                <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                  {informations?.data?.address}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 flex items-center gap-1">
                  <PiAddressBook />
                  <span>Division</span>
                </td>
                <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                  {informations?.data?.division}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 flex items-center gap-1">
                  <PiAddressBook />
                  <span>District</span>
                </td>
                <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                  {informations?.data?.district}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 flex items-center gap-1">
                  <CiLocationOn />
                  <span>Delivery Point</span>
                </td>

                <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                  {user?.deliveryPoint ? user?.deliveryPoint : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <fieldset className="mb-5">
        <legend className="mb-2">Add Note</legend>

        <div className="text-center flex items-center gap-5">
          <div onClick={() => setAddNote("home")}>
            <input
              className="peer sr-only"
              id="home"
              type="radio"
              tabIndex="-1"
              name="payment"
            />

            <label
              htmlFor="home"
              className={`w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:bg-success-400 flex justify-between items-center ${
                addNote === "home" && "bg-success-400"
              }`}
              tabIndex="0"
            >
              <span className="text-sm">
                <IoHomeOutline
                  className={`${addNote === "home" && "text-textColor"}`}
                />
              </span>
            </label>
            <p>Home</p>
          </div>

          <div onClick={() => setAddNote("work")}>
            <input
              className="peer sr-only"
              id="work"
              type="radio"
              tabIndex="-1"
              name="payment"
            />

            <label
              htmlFor="work"
              className={`w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:bg-success-400 flex justify-between items-center ${
                addNote === "work" && "bg-success-400"
              }`}
              tabIndex="0"
            >
              <span className="text-sm">
                <IoBriefcaseOutline
                  className={`${addNote === "work" && "text-textColor"}`}
                />
              </span>
            </label>
            <p>Work</p>
          </div>
          <div onClick={() => setAddNote("partner")}>
            <input
              className="peer sr-only"
              id="partner"
              type="radio"
              tabIndex="-1"
              name="payment"
            />

            <label
              htmlFor="partner"
              className={`w-full rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-black peer-checked:bg-success-400 flex justify-center items-center ${
                addNote === "partner" && "bg-success-400"
              }`}
              tabIndex="0"
            >
              <span className="flex justify-center items-center">
                <CiHeart
                  className={`text-xl ${
                    addNote === "partner" && "text-textColor"
                  }`}
                />
              </span>
            </label>
            <p>Partner</p>
          </div>
        </div>
      </fieldset>

      <div className="flex items-center gap-3">
        <div className="w-full">
          <label htmlFor="city" className="label block mb-2">
            <strong className="label-text">Curior Service</strong>
            <span className="text-error-300">*</span>
          </label>

          <Select
            name="curior-service"
            options={options}
            defaultValue={{ value: curior, label: curior }}
            onChange={(e) => setCurior(e.value)}
          />
        </div>
      </div>

      <div className="mb-10 flex flex-col gap-3 mt-5">
        <h2>
          <strong>Delivery Charge </strong>
          <span className="text-error-300">*</span>
        </h2>
        <p>Inside Dhaka ৳100</p>
        <p>Outside Dhaka ৳160</p>
      </div>

      <p className="text-sm">
        For urgent delivery, please contact{" "}
        <span className="text-blue-500">+88*********16</span> (11AM-10PM) or
        reach to our social media platform{" "}
        <span className="text-blue-500">Facebook/ Instagram</span>
      </p>

      {user && !user?.verify && (
        <VerifyModal isOpen={!user?.verify}>
          <div className="p-6">
            <div className="w-full">
              <div className="mx-auto flex w-full max-w-md flex-col ">
                <div className="flex flex-col items-center justify-center text-center space-y-2 mb-5">
                  <div className="font-semibold text-3xl">
                    <p className="text-textColor">Phone Number Verification</p>
                  </div>
                  <div className="flex flex-row text-sm font-medium text-textColor">
                    <p>
                      We have sent a code to your Phone Number {user?.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <form onSubmit={handleSubmit(handleVerify)}>
                    <div className="flex flex-col space-y-7">
                      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div key={index} className="w-16 h-16">
                            <input
                              maxLength="1"
                              id={`otpInput-${index}`}
                              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                              onChange={(e) =>
                                handleInputChange(index, e.target.value)
                              }
                              onKeyDown={(e) => handleInputKeyDown(index, e)}
                            ></input>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col space-y-5">
                        <div>
                          <button className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-opacity-100 hover:bg-opacity-80 bg-success-300 border-none text-white text-sm shadow-sm">
                            {loading || isLoading ? (
                              <MiniSpinner />
                            ) : (
                              "Verify Account"
                            )}
                          </button>
                        </div>

                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                          <p>Did not receive code?</p>{" "}
                          <a
                            className={`flex flex-row items-center ${
                              disable
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-textColor cursor-pointer underline"
                            }`}
                            onClick={() => handleResend()}
                          >
                            {disable
                              ? `Resend OTP in ${timerCount}s`
                              : "Resend OTP"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </VerifyModal>
      )}
    </div>
  );
};

export default Recipient;
