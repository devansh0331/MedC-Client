import { Button, Input } from "@material-tailwind/react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../ServerURL";

function SignInPage() {
  // useNavigate Initialization
  const navigate = useNavigate();

  // useState Initialization

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          toast.error("Server Message: " + parsedResponse);
        }
      } catch (error) {
        toast.error("Client Error: " + error);
      }
    }
  };
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-black mb-6">Sign In</h1>
        <Button
          color="black"
          variant="outlined"
          className="w-4/5 md:w-1/5 rounded-full mb-3"
        >
          Continue with email
        </Button>
        <Button
          color="black"
          variant="outlined"
          className="w-4/5 md:w-1/5 text-black rounded-full mb-3"
        >
          Continue with Google
        </Button>
        <p>or</p>
        <form className="w-4/5 md:w-1/5 m-auto flex flex-col justify-center items-center mt-2 mb-1">
          <div className="w-full mt-3">
            <Input
              type="email"
              label="Work Email"
              className=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full mt-3">
            <Input
              type="password"
              label="Password"
              className=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSubmit}
            color="#01bcf4"
            className="w-full md:w-full bg-primary text-white  rounded-full mt-6"
          >
            Sign In with Email
          </Button>
        </form>
        <Link to="/reset-password" className="mt-2 text-sm text-primary">
          Forgot your password?
        </Link>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default SignInPage;
