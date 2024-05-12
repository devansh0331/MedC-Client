import { Button, Input } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import signup from "../assets/signup.png";

function SignUpPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Function to signup
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
                <Input label="First Name" className="" />
              </div>
              <div className="w-full  mt-3 md:mt-5">
                <Input label="Last Name" className="" />
              </div>
            </div>
            <div className="w-full mt-3">
              <Input label="Work Email" className="" />
            </div>
            <div className="w-full mt-3">
              <Input label="Password" className="" />
            </div>
            <Button
              onClick={handleSubmit}
              color="#01bcf4"
              className="w-full md:w-full bg-primary text-white  rounded-full mt-6"
            >
              Continue with Email
            </Button>
          </form>
          <Link to="/reset-password" className="mt-2 text-sm text-primary">
            Forgot your password?
          </Link>
        </div>
        <div className="hidden h-screen w-full bg-offWhite md:flex items-center justify-center  md:flex-1">
          <div className="md:h-full md:w-4/5 md:flex md:flex-col md:items-center md:justify-center">
            <img src={signup} alt="" />
            <p className="font-extrabold text-xl text-center">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
