import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useOtpVerifyMutation,
  useResendOtpMutation,
} from "../../redux/feature/auth/authApi";
import { getPhoneNumber } from "../../utils/get-email";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import MiniSpinner from "../../shared/loader/MiniSpinner";

const Verified = () => {
  const [loading, setLoading] = useState(false);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const path = useLocation();
  const { handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [otpVerify, { isLoading }] = useOtpVerifyMutation();
  const [resendOtp] = useResendOtpMutation();

  const phone = getPhoneNumber(path?.search);

  const handleVerify = async () => {
    try {
      setLoading(true);
      const otp = OTPinput.join("");
      const data = {
        user_phone: phone,
        user_otp: otp,
      };
      const res = await otpVerify(data);
      if (res?.data?.success) {
        toast.success(res?.data?.message, {
          autoClose: 1,
        });
        navigate(`/sign-in`);
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
        user_phone: phone,
      };
      const res = await resendOtp(data);
      if (res?.data?.success) {
        setDisable(true);
        toast.info(res?.data?.message);
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

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-md rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Phone Number Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your Phone Number {phone}</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit(handleVerify)}>
              <div className="flex flex-col space-y-16">
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
                    <button className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-success-300 border-none text-white text-sm shadow-sm">
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
                      className={`flex flex-row items-center ${disable
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-blue-500 cursor-pointer underline"
                        }`}
                      onClick={() => handleResend()}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verified;
