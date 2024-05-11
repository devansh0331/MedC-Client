import { Button, Input } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

function SignInPage() {
  return (
    <div className="w-screen">
      <div className="w-full h-4/5 mt-12 flex flex-col items-center justify-center">
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
          <div className="w-full mt-5">
            <Input label="Work Email" className="" />
          </div>
          <div className="w-full mt-3">
            <Input label="Password" className="" />
          </div>
          <Button
            color="#01bcf4"
            className="w-full md:w-full bg-primary text-white  rounded-full mt-6"
          >
            Sign In with Email
          </Button>
        </form>
        <Link className="mt-2 text-sm text-primary">Forgot your password?</Link>
      </div>
    </div>
  );
}

export default SignInPage;
