import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../ServerURL";
import { Toaster, toast } from "react-hot-toast";

function OTPVerification() {
  const navigate = useNavigate();

  const [serarchParams] = useSearchParams();

  const [otp, setOtp] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Function to verify otp
    try {
      const _id = serarchParams.get("_id");

      const data = await fetch(`${SERVER_URL}/otp/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, otp }),
      });

      const res = await data.json();
      console.log("OTP Verification log: " + res);
      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          navigate(`/new-password?_id=${_id}`);
        }, 2000);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleResendCode = async (e) => {
    e.preventDefault();
    // Function to sending otp and reset password

    try {
      const _id = serarchParams.get("_id");
      const data = await fetch(`${SERVER_URL}/otp/resendOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      const res = await data.json();
      console.log(res);

      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          navigate(`/otp-verification?_id=${res._id}`);
        }, 2000);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Client Error: " + error);
    }
  };

  return (
    <div className="w-screen h-[90vh]">
      <div className="w-10/12 md:w-2/5 m-auto h-full flex flex-col items-center justify-center">
        <p className="w-full text-4xl tracking-wide text-center font-black mb-6 mt-4 font-open leading-custom">
        OTP Verification
          </p>
        <p className="text-gray-700 mb-4">OTP have been sent to your email id</p>
        <div className="flex flex-col mt-6 w-1/2">
        <label
              htmlFor="otp"
              className="text-sm font-medium tracking-wider text-gray-700 self-start"
            >
              One Time Password
            </label>
            <input
              type="number"
              id="otp"
              className="no-spinner text-sm w-full font-medium text-gray-800 p-2 border border-gray-600 rounded-sm"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>
          <button
            onClick={handleSubmit}
            color="#01bcf4"
            className="w-full md:w-1/2 bg-primary text-white  rounded-full mt-6 py-2"
          >
            Verify
          </button>
        <p className="text-gray-700 text-sm mt-2">
          Didn't receive code? &nbsp;
          <Link
            className="mt-2 text-sm text-primary"
            onClick={handleResendCode}
          >
            Resend Code
          </Link>
        </p>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default OTPVerification;
