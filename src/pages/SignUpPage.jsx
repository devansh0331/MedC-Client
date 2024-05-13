import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../assets/signup.png";
import { Toaster, toast } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";

function SignUpPage() {
  // useNavigate Initialization
  const navigate = useNavigate();

  // useState Initialization
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="w-screen h-screen">
      <div className="w-full h-full flex  items-center justify-center md:justify-between">
        <div className="w-full h-full flex flex-1 flex-col items-center justify-center">
          {" "}
          <h1 className="w-full md:w-2/5 text-4xl md:text-5xl text-center font-black mb-6">
            Start Hiring with MEDC
          </h1>
          <Button
            color="black"
            variant="outlined"
            className="w-4/5 md:w-2/5 rounded-full mb-3"
          >
            Continue with email
          </Button>
          <Button
            color="black"
            variant="outlined"
            className="w-4/5 md:w-2/5 text-black rounded-full mb-3"
          >
            Continue with Google
          </Button>
          <p>or</p>
          <form className="w-4/5 md:w-3/5  flex flex-col justify-center items-center mt-2 mb-0">
            <div className="w-full md:grid grid-cols-2 md:gap-4 mt-0 m-0">
              <div className="w-full  mt-5">
                <Input
                  type="text"
                  label="First Name"
                  className=""
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="w-full  mt-3 md:mt-5">
                <Input
                  type="text"
                  label="Last Name"
                  className=""
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </div>
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
              Continue with Email
            </Button>
          </form>
          {/* <Link to="/reset-password" className="mt-2 text-sm text-primary"> */}
          {/* </Link> */}
          <div className="w-4/5 md:w-3/5 mt-2 ">
            <p className=" text-sm text-center">
              Password must be minimum of 8 characters which includes a
              character, a number and a special symbol
            </p>
          </div>
        </div>
        <div className="hidden h-screen w-full bg-offWhite md:flex items-center justify-center  md:flex-1">
          <div className="md:h-full md:w-4/5 md:flex md:flex-col md:items-center md:justify-center">
            <img src={signup} alt="" />
            <p className="font-extrabold text-xl text-center">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            </p>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default SignUpPage;
