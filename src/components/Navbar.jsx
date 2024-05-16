import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/medc-logo.png";

function Navbar(props) {
  const navigate = useNavigate();

  const handleLogoNavigate = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <nav className="fixed  top-0 flex justify-center w-screen overflow-hidden bg-white z-10">
      <div className="w-11/12 flex items-center justify-between">
        <div onClick={handleLogoNavigate} className="cursor-pointer">
          <img src={logo} alt="" className="w-5/6" />
        </div>
        <div className="flex items-center justify-end">
          {props.route == "signup" && (
            <Button
              id="signup"
              onClick={() => navigate("/signup")}
              variant="outlined"
              className="rounded-full"
            >
              Sign Up
            </Button>
          )}
          {props.route == "signin" && (
            <Button
              id="signin"
              onClick={() => navigate("/signin")}
              variant="outlined"
              className="rounded-full"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
