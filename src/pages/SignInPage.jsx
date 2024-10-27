import { Button } from "@material-tailwind/react";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import emaillogo from "../assets/emaillogo.png";
import { SERVER_URL } from "../ServerURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../UserContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function SignInPage() {
  // useNavigate Initialization
  const navigate = useNavigate();

  // useState Initialization

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bool, setBool] = useState(false);

  // const { loginWithRedirect } = useAuth0();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { getUser } = useContext(UserContext);

  const signInWithGoogle = async (token) => {
    console.log(token);
    try {
      const response = await fetch(`${SERVER_URL}/auth/signin-with-google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      if (parsedResponse.success == true) {
        const parsedName = await parsedResponse.user.name;
        const parsedEmail = await parsedResponse.user.email;

        console.log("Token: " + parsedResponse.token);
        console.log("User: " + parsedEmail + " " + parsedName);
        Cookies.set("name", parsedName, { expires: 365 });
        Cookies.set("email", parsedEmail, { expires: 365 });
        Cookies.set("token", parsedResponse.token, { expires: 365 });
        toast.success("Logged In Successfully");
        getUser();
        setTimeout(() => {
          navigate("/feed");
          // location.reload();
        }, 2000);
      } else {
        toast.error(parsedResponse);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleSubmit = async () => {
    // e.preventDefault();
    // Function to signin
    if (!email || !password) {
      toast.error("All credentials are mandatory");
    } else {
      try {
        const response = await fetch(`${SERVER_URL}/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${}`
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const parsedResponse = await response.json();
        console.log(parsedResponse);
        if (parsedResponse.success == false) {
          console.log(parsedResponse.message);
          toast.error(parsedResponse.message);
        } else {
          const parsedName = await parsedResponse.user.name;
          const parsedEmail = await parsedResponse.user.email;

          console.log("Token: " + parsedResponse.token);
          console.log("User: " + parsedEmail + " " + parsedName);
          Cookies.set("name", parsedName, { expires: 365 });
          Cookies.set("email", parsedEmail, { expires: 365 });
          Cookies.set("token", parsedResponse.token, { expires: 365 });
          toast.success("Logged In Successfully");
          getUser();
          setTimeout(() => {
            navigate("/feed");
            // location.reload();
          }, 1000);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };
  return (
    <div className="w-screen h-[90vh]">
      <div className="w-10/12 md:w-2/5 lg:w-1/5 m-auto h-full flex flex-col items-center justify-center">
        <p className="w-full text-4xl tracking-wide text-center font-black mb-6 mt-4 font-open leading-custom">
          Sign In
        </p>
        <div className="my-3">
          <GoogleLogin
            onSuccess={(res) => {
              let parsedResponse = jwtDecode(res.credential);
              signInWithGoogle(res.credential);
            }}
            className="w-full rounded-full my-3 flex items-center border border-1 border-gray-500 py-2 px-3"
          />
        </div>
        <div className="line-with-text w-full">
          <span className="line"></span>
          <span className="text-word">or</span>
          <span className="line"></span>
        </div>
        {/* <button className="w-full rounded-full mb-3 flex items-center border border-1 border-gray-500 py-2 px-3">
          <img src={emaillogo} alt="email" className="h-7 w-7" />
          <p
            onClick={() => setBool(!bool)}
            className="text-center text-base font-medium w-full"
          >
            Continue with Email
          </p>
        </button> */}
      
        {/* <img src={google} alt="google" className="h-7 w-7" />
          <p className="text-center text-base w-full">Continue with Google</p> */}
        {/* </GoogleLogin> */}  
            <div className="w-full">
              <div className="flex flex-col my-2">
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
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
          
        {/* {bool && (
        )} */}
        <p className="text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <button className="text-primary" onClick={() => navigate("/signup")} id="signup">
            Sign Up
          </button>
        </p>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default SignInPage;
