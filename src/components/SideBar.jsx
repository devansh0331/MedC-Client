import React from "react";
import { useState } from "react";
import { TbCarouselVerticalFilled } from "react-icons/tb";
import { HiRectangleGroup } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoPowerSharp } from "react-icons/io5";

function SideBar(props) {
  const [open, setOpen] = useState(false);
  const handleopen = () => {
    setOpen(!open);
  };

  return (
    <button
      className={`h-full z-20 flex flex-col text-center justify-evenly px-5 shadow-lg bg-white ${
        open ? `w-36` : `w-14`
      }`}
      onClick={() => handleopen()}
    >
      <button className="flex items-center">
        <TbCarouselVerticalFilled className="cursor-pointer w-6 h-6" />
        <span className={`${open ? `block` : `hidden`} mx-3`}>Posts</span>
      </button>
      <button className="flex items-center">
        <HiRectangleGroup className="cursor-pointer w-6 h-6" />
        <span className={`${open ? `block` : `hidden`} mx-3`}>Jobs</span>
      </button>
      <button className="flex items-center">
        <FaBriefcase className="cursor-pointer w-6 h-6" />
        <span className={`${open ? `block` : `hidden`} mx-3`}>Hire</span>
      </button>
      <button className="flex items-center">
        <FaUserFriends className="cursor-pointer w-6 h-6" />
        <span className={`${open ? `block` : `hidden`} mx-3`}>Friends</span>
      </button>
      <button className="flex items-center">
        <IoSettingsSharp className="cursor-pointer w-6 h-6" />
        <span className={`${open ? `block` : `hidden`} mx-3`}>Settings</span>
      </button>
      <button className="flex items-center" onClick={props.handleLogout}>
      <IoPowerSharp className="cursor-pointer w-6 h-6 text-red-700" />
        <span
          className={`${open ? `block` : `hidden`} mx-3 text-red-700 font-bold`}
        >
          Logout
        </span>
      </button>
    </button>
  );
}

export default SideBar;
