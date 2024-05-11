import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function OTPVerification() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-black mb-3 text-center">
          OTP Verification
        </h1>
        <p className="text-gray-700 mb-4">OTP have sent to your email id</p>
        <form className="w-4/5 md:w-1/5 m-auto flex flex-col justify-center items-center mt-2 mb-1">
          <div className="w-full mt-3">
            <Input label="One Time Password" className="" />
          </div>
          <Button
            color="#01bcf4"
            className="w-full md:w-full bg-primary text-white  rounded-full mt-6"
          >
            Verify
          </Button>
        </form>
        <p>
          Didn't receive code? &nbsp;
          <Link className="mt-2 text-sm text-primary">Resend Code</Link>
        </p>
      </div>
    </div>
  );
}

export default OTPVerification;
