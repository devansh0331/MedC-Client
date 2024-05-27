import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../assets/signup.png";
import emaillogo from "../assets/emaillogo.png";
import google from "../assets/google.png";
import { Toaster, toast } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignUpPage() {
  // useNavigate Initialization
  const navigate = useNavigate();

  // useState Initialization
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Function to signup
    if (!fname || !lname || !email || !password) {
      toast.error("All credentials are mandatory");
    } else {
      try {
        const name = fname + " " + lname;
        const response = await fetch(`${SERVER_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const parsedResponse = await response.json();
        console.log(parsedResponse);
        if (parsedResponse.name == name) {
          toast.success("Account Created Successfully...");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          toast.error("Server Error: " + parsedResponse);
        }
      } catch (error) {
        toast.error("Client Error: " + error);
      }
    }
  };
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="w-1/2 h-full flex flex-col items-center justify-center mt-4">
        <div className="w-2/5">
          <p className="w-full text-4xl tracking-wide text-center font-black mb-6 mt-4 font-open leading-custom">
            Start Hiring <br /> With MEDC
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
          <div className="line-with-text">
            <span className="line"></span>
            <span className="text-word">or</span>
            <span className="line"></span>
          </div>

          <div className="flex my-0">
            <div className="flex flex-col my-2 mr-2">
              <label
                htmlFor="fname"
                className="text-sm font-medium tracking-wider text-gray-700"
              >
                First Name
              </label>
              <input
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                id="fname"
                className="text-sm font-medium text-gray-800 p-2 border w-full border-gray-600 rounded-sm"
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="lname"
                className="text-sm font-medium tracking-wider text-gray-700"
              >
                Last Name
              </label>
              <input
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                id="lname"
                className="text-sm font-medium text-gray-800 p-2 border w-full border-gray-600 rounded-sm"
                placeholder="Last Name"
              />
            </div>
          </div>
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
            Create Account
          </Button>
        </div>
      </div>
      <div className="bg-offWhite w-1/2 h-full flex flex-col items-center justify-center">
        <div className="md:h-full md:w-4/5 md:flex md:flex-col md:items-center md:justify-center">
          <img src={signup} alt="" />
          <p className="font-extrabold text-xl text-center">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          </p>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default SignUpPage;
