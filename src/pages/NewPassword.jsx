import React, { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function NewPassword() {
  const navigate = useNavigate();

  const [serarchParams] = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordsec, setShowPasswordsec] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilitysec = () => {
    setShowPasswordsec(!showPasswordsec);
  };


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
    <div className="w-screen h-[90vh] overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="w-full text-4xl tracking-wide text-center font-black mb-3 mt-2 font-open leading-custom">
        Create a New Password
          </p>
        <p className="w-3/5 md:w-1/4 text-center text-gray-700 mb-4">
          Minimum of 8 characters which includes a character, a number and a
          special symbol
        </p>
        <div className="w-3/5 md:w-1/5 m-auto flex flex-col justify-center items-center mt-2 mb-1">
         <div className="relative w-full">
            <label
              htmlFor="newpassword"
              className="text-sm font-medium tracking-wider text-gray-700"
            >
              New Password
            </label>
            <div className="relative">
              <input
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                id="newpassword"
                className="text-sm font-medium text-gray-800 p-2 border border-gray-600 rounded-sm w-full pr-10"
                placeholder="Password"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <div className="relative w-full">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium tracking-wider text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPasswordsec ? "text" : "password"}
                id="confirmPassword"
                className="text-sm font-medium text-gray-800 p-2 border border-gray-600 rounded-sm w-full pr-10"
                placeholder="Password"
                required
              />
              <span
                onClick={togglePasswordVisibilitysec}
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              >
                <FontAwesomeIcon icon={showPasswordsec ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>


          <Button
            onClick={handleSubmit}
            color="#01bcf4"
            className="w-full md:w-full bg-primary text-white  rounded-full mt-6"
          >
            Change Password
          </Button>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default NewPassword;
