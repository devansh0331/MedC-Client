import { Button } from "@material-tailwind/react";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
// import logo from "../assets/logo/medclogo.png";
import logo from "../assets/logofoot.png"
import { FaCirclePlus } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";
import { BsPersonFillAdd } from "react-icons/bs";
import { BsPersonFillDash } from "react-icons/bs";
import { FaArrowsRotate } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { feedClick, handleOpen } from "../Slices/feedSlice";
function Navbar(props) {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const dispatch = useDispatch();
  const minJobs = useSelector((state) => state.feed.minJobs);
  const open = useSelector((state) => state.feed.open);

  const handleExpand = () => {
    dispatch(feedClick(!minJobs));
  };

  const handleSidebar = () => {
    dispatch(handleOpen(!open));
  };
  const handleLogoNavigate = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 h-16 flex justify-center w-screen overflow-hidden bg-white z-10 shadow-sm">
      <div className="w-full flex items-center justify-between">
        <div onClick={handleLogoNavigate} className="cursor-pointer md:ml-10">
          <img src={logo} alt="" className="w-24" />
        </div>
        {!userInfo.state && (
          <div className="flex items-center justify-end">
            <button
              className="bg-primary mr-8 text-white px-4 py-2 rounded-full shadow-md active:translate-x-0.5 active:translate-y-0.5"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        )}
        {userInfo.state && (
          <div className="flex items-center justify-between md:pr-5">
            <button className="flex items-center text-black md:border-2 md:border-black px-1 md:px-3 rounded-full py-2  mx-2">
              <FaCirclePlus className="md:w-5 md:h-5" />
              <span className="pl-2 md:block hidden">Post a Job</span>
            </button>
            <button className="w-7 h-7 mx-2">
              <FaBell className="w-5 h-5" />
            </button>
            <button className="w-7 h-7 mx-2">
              <FaMessage className="w-5 h-5" />
            </button>
            <button
              className="w-7 h-7 mx-2 lg:hidden"
              onClick={() => handleExpand()}
            >
              <FaArrowsRotate className="w-5 h-5" />
            </button>
            <button
              className="w-7 h-7 mx-2 sm:hidden"
              onClick={() => handleSidebar()}
            >
              <FiMenu className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
