import { Button } from "@material-tailwind/react";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import logo from "../assets/logo/medc-logo.png";
import { FaCirclePlus } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";

function Navbar(props) {
  const navigate = useNavigate();
  const {userInfo} = useContext(UserContext);



  const handleLogoNavigate = (e) => {
    e.preventDefault();
    navigate("/");
  };


  return (
    <nav className="fixed top-0 h-16 flex justify-center w-screen overflow-hidden bg-white z-10 shadow-sm">
      <div className="w-full flex items-center justify-between">
        <div onClick={handleLogoNavigate} className="cursor-pointer ml-10">
          <img src={logo} alt="" className="w-5/6" />
        </div>
        {!userInfo.state && (
          <div className="flex items-center justify-end">
            <button className="bg-primary mr-8 text-white px-4 py-2 rounded-full shadow-md active:translate-x-0.5 active:translate-y-0.5">
              Sign Up
            </button>
          </div>
        )}
        {userInfo.state && (
          <div className="flex items-center justify-between pr-5">
            <button className="flex items-center text-black border-2 border-black px-3 py-2 rounded-full mx-2">
            <FaCirclePlus />
             <span className="pl-2">Post a Job</span>
            </button>
            <button className="w-7 h-7 mx-2">
            <FaBell className="w-5 h-5" />
            </button>
            <button className="w-7 h-7 mx-2">
            <FaMessage className="w-5 h-5" />
            </button>
          </div>
        )}
       </div>
    </nav>
  );
}

export default Navbar;