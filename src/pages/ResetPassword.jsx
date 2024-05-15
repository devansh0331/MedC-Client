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
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-black mb-3 text-center">
          Reset Password
        </h1>
        <p className="text-gray-700 mb-4">OTP will be send to your email id</p>
        <form className="w-4/5 md:w-1/5 m-auto flex flex-col justify-center items-center mt-2 mb-1">
          <div className="w-full mt-3">
            <Input
              label="Email"
              type="email"
              className=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSubmit}
            color="#01bcf4"
            className="w-full md:w-full bg-primary text-white  rounded-full mt-6"
          >
            Send OTP
          </Button>
        </form>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default ResetPassword;
