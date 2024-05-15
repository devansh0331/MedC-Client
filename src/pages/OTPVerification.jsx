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
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-black mb-3 text-center">
          OTP Verification
        </h1>
        <p className="text-gray-700 mb-4">OTP have sent to your email id</p>
        <form className="w-4/5 md:w-1/5 m-auto flex flex-col justify-center items-center mt-2 mb-1">
          <div className="w-full mt-3">
            <Input
              label="One Time Password"
              type="number"
              className=""
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSubmit}
            color="#01bcf4"
            className="w-full md:w-full bg-primary text-white  rounded-full mt-6"
          >
            Verify
          </Button>
        </form>
        <p>
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
