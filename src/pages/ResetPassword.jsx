import { Button, Input } from "@material-tailwind/react";

import React, { useState } from "react";
import { SERVER_URL } from "../ServerURL";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Function to sending otp and reset password

    try {
      const data = await fetch(`${SERVER_URL}/otp/sendOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
      <div className="w-10/12 md:w-2/5 m-auto h-full flex flex-col items-center justify-center">
      <p className="w-full text-4xl tracking-wide text-center font-black mb-6 mt-4 font-open leading-custom">
            Reset Password
          </p>
        <p className="text-gray-700 mb-4">OTP will be send to your email id</p>
        <div className="flex flex-col my-2 w-1/2">
            <label
              htmlFor="email"
              className="text-sm font-medium tracking-wider text-gray-700"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="text-sm font-medium text-gray-800 p-2 border border-gray-600 rounded-sm"
              placeholder="Email"
            />
          </div>
          <Button
            onClick={handleSubmit}
            color="#01bcf4"
            className="w-1/2 bg-primary text-white  rounded-full mt-4"
          >
            Send OTP
          </Button>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default ResetPassword;
