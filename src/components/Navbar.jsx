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
  const [signnedIn, setSignnedIn] = useState(false);


  const handleLogoNavigate = (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(()=>{
    if(userInfo.state){
      setSignnedIn(true);
      console.log(signnedIn);
    }
  })

  return (
    <nav className="fixed top-0 flex justify-center w-screen overflow-hidden bg-transparent z-10">
      <div className="w-11/12 flex items-center justify-between">
        <div onClick={handleLogoNavigate} className="cursor-pointer">
          <img src={logo} alt="" className="w-5/6" />
        </div>
        {!signnedIn && (
          <div className="flex items-center justify-end">
            <button className="bg-primary text-white px-4 py-2 rounded-full shadow-md active:translate-x-0.5 active:translate-y-0.5">
              Sign Up
            </button>
          </div>
        )}
        {signnedIn && (
          <div className="flex items-center justify-between w-1/5">
            <button className="flex items-center text-black border-2 border-black px-3 py-2 rounded-full">
            <FaCirclePlus />
             <span className="pl-2">Post a Job</span>
            </button>
            <button className="w-7 h-7">
            <FaBell className="w-5 h-5" />
            </button>
            <button className="w-7 h-7">
            <FaMessage className="w-5 h-5" />
            </button>
          </div>
        )}
       </div>
    </nav>
  );
}

export default Navbar;