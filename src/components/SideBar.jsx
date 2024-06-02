import React from "react";
import { useState } from "react";
import { TbCarouselVerticalFilled } from "react-icons/tb";
import { HiRectangleGroup } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoPowerSharp } from "react-icons/io5";
import ProfileCard from "./ProfileCard";

function SideBar(props) {
  const [open, setOpen] = useState(false);
  const handleopen = () => {
    setOpen(!open);
  };

  return (
    <button
      className={`h-full z-20 flex flex-col px-5 shadow-lg bg-white ${
        open ? `w-auto` : `w-14`
      }`}
      onClick={() => handleopen()}
    >
      <div className="mt-20 ">
        <span className={`${open ? `block` : `hidden`}`}>
          {" "}
          <ProfileCard name={props.name} email={props.email} />
        </span>
      </div>
      <div className="flex flex-col justify-around h-full items-start">
        <button className="flex items-center justify-center ml-2 text-gray-800">
          <FaBriefcase className="cursor-pointer w-6 h-6" />
          <span className={`${open ? `block` : `hidden`} mx-3`}>Hire</span>
        </button>
        <button className="flex items-center justify-center ml-2 text-gray-800">
          <FaUserFriends className="cursor-pointer w-6 h-6" />
          <span className={`${open ? `block` : `hidden`} mx-3`}>Friends</span>
        </button>
        <button className="flex items-center justify-center ml-2 text-gray-800">
          <IoSettingsSharp className="cursor-pointer w-6 h-6" />
          <span className={`${open ? `block` : `hidden`} mx-3`}>Settings</span>
        </button>
        <button
          className="flex items-center justify-center ml-2 text-gray-800"
          onClick={props.handleLogout}
        >
          <IoPowerSharp className="cursor-pointer w-6 h-6 text-red-700" />
          <span
            className={`${
              open ? `block` : `hidden`
            } mx-3 text-red-700 font-bold`}
          >
            Logout
          </span>
        </button>
      </div>
    </button>
  );
}

export default SideBar;
