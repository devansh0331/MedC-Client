import { Button, Input } from "@material-tailwind/react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import emaillogo from "../assets/emaillogo.png";
import google from "../assets/google.png";
import { SERVER_URL } from "../ServerURL";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function SignInPage() {
  // useNavigate Initialization
  const navigate = useNavigate();

  // useState Initialization

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Function to signin
    if (!email || !password) {
      toast.error("All credentials are mandatory");
    } else {
      try {
        const response = await fetch(`${SERVER_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const parsedResponse = await response.json();

        if (parsedResponse.user) {
          const parsedName = await parsedResponse.user.name;
          const parsedEmail = await parsedResponse.user.email;

          console.log("Token: " + parsedResponse.token);
          console.log("User: " + parsedEmail + " " + parsedName);
          Cookies.set("name", parsedName, {
            expires: 7,
          });
          Cookies.set("email", parsedEmail, {
            expires: 7,
          });
          Cookies.set("token", parsedResponse.token, {
            expires: 7,
          });
          toast.success("Logged In Successfully");
          setTimeout(() => {
            navigate("/feed");
            location.reload();
          }, 2000);
        } else {
          toast.error("Server Message: " + parsedResponse.msg);
        }
      } catch (error) {
        toast.error("Client Error: " + error);
      }
    }
  };
  return (
    <div className="w-screen h-screen">
      <div className="w-1/5 m-auto h-full flex flex-col items-center justify-center">
      <p className="w-full text-4xl tracking-wide text-center font-black mb-6 mt-4 font-open leading-custom">
            Sign In
      </p>
      <button className="w-full rounded-full mb-3 flex items-center border border-1 border-gray-500 py-2 px-3">
            <img src={emaillogo} alt="email" className="h-7 w-7" />
            <p className="text-center text-base font-medium w-full">
              Continue with Email
            </p>
          </button>
          <button className="w-full rounded-full mb-3 flex items-center border border-1 border-gray-500 py-2 px-3">
            <img src={google} alt="google" className="h-7 w-7" />
            <p className="text-center text-base w-full">Continue with Google</p>
          </button>
          <div className="line-with-text w-full">
            <span className="line"></span>
            <span className="text-word">or</span>
            <span className="line"></span>
          </div>
        <div className="w-full">
        <div className="flex flex-col my-2">
            <label
              htmlFor="email"
              className="text-sm font-medium tracking-wider text-gray-700"
            >
              Work Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="text-sm font-medium text-gray-800 p-2 border border-gray-600 rounded-sm"
              placeholder="Work email"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="text-sm font-medium tracking-wider text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="text-sm font-medium text-gray-800 p-2 border border-gray-600 rounded-sm w-full pr-10"
                placeholder="Password"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            color="#01bcf4"
            className="w-full md:w-full bg-primary text-white  rounded-full mt-4"
          >
            Sign In
          </Button>
        </div>
        <Link to="/reset-password" className="mt-2 text-sm text-primary">
          Forgot your password?
        </Link>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default SignInPage;
