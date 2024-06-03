import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FaBriefcase } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoPowerSharp } from "react-icons/io5";
import ProfileCard from "./ProfileCard";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { UserContext } from "../UserContext";
function SideBar(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  const { userInfo, user, getUser } = useContext(UserContext);

  useEffect(() => {
    if (props.route === "profile") {
      setProfile(true);
    }

    if (props.route === "feed") {
      getUser();
      setProfile(false);
    }
  }, []);

  const handleopen = () => {
    setOpen(!open);
  };

  return (
    <button
      className={`h-full z-10 flex flex-col px-4 shadow-lg bg-white ${
        open ? `w-auto` : `w-16`
      }`}
      onClick={() => handleopen()}
    >
      <div className="flex flex-col justify-around h-full items-start mt-20">
        {profile && (
          <button
            className="flex items-center justify-center ml-1 text-gray-800"
            onClick={() => navigate("/feed")}
          >
            <MdHome className="cursor-pointer w-7 h-7" />
            <span className={`${open ? `block` : `hidden`} mx-3`}>Home</span>
          </button>
        )}
        {!profile && (
          <button
            className="flex items-center justify-center ml-1 text-gray-800"
            onClick={() => navigate("/profile")}
          >
            {!open && <BsPersonCircle className="cursor-pointer w-6 h-6" />}
            <span className={`${open ? `block` : `hidden`}`}>
              <ProfileCard
                contact={user.contact ? user.contact : ""}
                location={user.location ? user.location : ""}
                name={user.name ? user.name : ""}
                email={user.email ? user.email : ""}
                bio={user.bio ? user.bio : ""}
                linkedin={user.linkedin ? user.linkedin : ""}
                route={false}
              />
            </span>
          </button>
        )}
        <button className="flex items-center justify-center ml-1 text-gray-800 -mt-8">
          <FaBriefcase className="cursor-pointer w-6 h-6" />
          <span className={`${open ? `block` : `hidden`} mx-3`}>Hire</span>
        </button>
        <button className="flex items-center justify-center ml-1 text-gray-800">
          <FaUserFriends className="cursor-pointer w-6 h-6" />
          <span className={`${open ? `block` : `hidden`} mx-3`}>Friends</span>
        </button>
        <button className="flex items-center justify-center ml-1 text-gray-800">
          <IoSettingsSharp className="cursor-pointer w-6 h-6" />
          <span className={`${open ? `block` : `hidden`} mx-3`}>Settings</span>
        </button>
        <button
          className="flex items-center justify-center ml-1 text-gray-800"
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
