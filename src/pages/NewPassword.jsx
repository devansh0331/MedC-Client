import React, { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import { useNavigate, useSearchParams } from "react-router-dom";

function NewPassword() {
  const navigate = useNavigate();

  const [serarchParams] = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Function to create new password
    if (!password || !confirmPassword) toast.error("All fields are mandatory!");
    if (password != confirmPassword) toast.error("Password does not match!");
    else {
      try {
        const _id = serarchParams.get("_id");
        const data = await fetch(`${SERVER_URL}/auth/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, password }),
        });
        const res = await data.json();

        if (res.success) {
          toast.success(res.message);
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-black mb-3 text-center">
          Create a New Password
        </h1>
        <p className="md:w-1/4 text-center text-gray-700 mb-4">
          Minimum of 8 characters which includes a character, a number and a
          special symbol
        </p>
        <form className="w-4/5 md:w-1/5 m-auto flex flex-col justify-center items-center mt-2 mb-1">
          <div className="w-full mt-3">
            <Input
              label="New Password"
              className=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full mt-3">
            <Input
              label="Confirm Password"
              className=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSubmit}
            color="#01bcf4"
            className="w-full md:w-full bg-primary text-white  rounded-full mt-6"
          >
            Submit
          </Button>
        </form>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default NewPassword;
