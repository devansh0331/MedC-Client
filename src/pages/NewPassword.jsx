import React from "react";
import { Button, Input } from "@material-tailwind/react";

function NewPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Function to create new password
  };
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
            <Input label="New Password" className="" />
          </div>
          <div className="w-full mt-3">
            <Input label="Confirm Password" className="" />
          </div>
          <Button
            onClick={handleSubmit}
            color="#01bcf4"
            className="w-full md:w-full bg-primary text-white  rounded-full mt-6"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
