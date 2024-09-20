import { Button, Dialog, DialogBody, DialogHeader, Input } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import emaillogo from "../assets/emaillogo.png";
import professional from "../assets/professional.png";
import { Toaster, toast } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { UserContext } from "../UserContext";

function SignUpDialog(props) {
  // useNavigate Initialization
  const navigate = useNavigate();

  const { getUser } = useContext(UserContext);

  // useState Initialization
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bool, setBool] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        toast.success(parsedResponse.message);
        getUser();
        setTimeout(() => {
          navigate("/feed");
          // location.reload();
          props.handler();
        }, 2000);
      } else {
        toast.error("Server Error: " + parsedResponse.error);
      }
    } catch (error) {
      toast.error("Client Error: " + error);
    }
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    // Function to signup
    if (!fname || !lname || !email || !password) {
      toast.error("All credentials are mandatory");
    } else {
      try {
        const name = fname + " " + lname;
        const response = await fetch(`${SERVER_URL}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const parsedResponse = await response.json();
        console.log(parsedResponse);
        if (parsedResponse.success == false) {
          toast.error(parsedResponse.error);
        } else {
          toast.success("Account Created Successfully...");
          setTimeout(() => {
            navigate("/signin");
            props.handler();
          }, 2000);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };
  return (
    <Dialog open={props.open} handler={props.handler} size="sm">
          <DialogHeader className="">
            Sign Up to MedC
          </DialogHeader>
        <DialogBody>
          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={(res) => {
                signInWithGoogle(res.credential);
              }}
            />
          </div>
          <div className="line-with-text w-full">
            <span className="line"></span>
            <span className="text-word">or</span>
            <span className="line"></span>
          </div>
              <div className="flex my-0 w-full gap-2">
                <div className="flex flex-col my-2 w-full">
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
                <div className="flex flex-col my-2 w-full">
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
        </DialogBody>
    </Dialog>
  );
}

export default SignUpDialog;
