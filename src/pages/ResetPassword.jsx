import { Button, Input } from "@material-tailwind/react";

import React from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-black mb-3 text-center">
          Reset Password
        </h1>
        <p className="text-gray-700 mb-4">OTP will be send to your email id</p>
        <form className="w-4/5 md:w-1/5 m-auto flex flex-col justify-center items-center mt-2 mb-1">
          <div className="w-full mt-3">
            <Input label="Email" className="" />
          </div>
          <Button
            color="#01bcf4"
            className="w-full md:w-full bg-primary text-white  rounded-full mt-6"
          >
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
