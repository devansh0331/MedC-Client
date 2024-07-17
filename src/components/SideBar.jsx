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
import { useSelector, useDispatch } from "react-redux";
import { handleOpen } from "../Slices/feedSlice";
function SideBar(props) {
  const open = useSelector((state) => state.feed.open);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  const { userInfo, user } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.route === "profile") {
      setProfile(true);
    }

    if (props.route === "feed") {
      // getUser();
      setProfile(false);
    }
  }, []);

  const handleopen = () => {
    dispatch(handleOpen(!open));
  };

  return (
    <div
      onClick={() => handleopen()}
      className={`z-20 absolute ${
        open ? "backdrop-blur-sm w-screen h-screen" : "h-screen"
      }`}
    >
      <button
        className={`h-full z-10 flex flex-col px-4 shadow-lg bg-white ${
          open ? `w-auto transition-all duration-1000` : `w-16 hidden sm:flex`
        }`}
      >
        <div className="flex flex-col justify-evenly h-full items-start mt-20">
          {profile && (
            <button
              className="w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white"
              onClick={() => {
                navigate("/feed");
              }}
            >
              <MdHome className="cursor-pointer w-7 h-7" />
              <span className={`${open ? `block` : `hidden`} mx-3`}>Home</span>
            </button>
          )}
          {!profile && (
            <button
              className={`w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 ${
                open ? "" : "hover:bg-gray-900 hover:text-white"
              }`}
            >
              {!open && <BsPersonCircle className="cursor-pointer w-6 h-6" />}
              <span
                onClick={() => navigate(`/user/${props.userId}`)}
                className={`${open ? `block` : `hidden`}`}
              >
                <ProfileCard
                  profileURL={user.profileURL}
                  // contact={user.contact ? user.contact : ""}
                  // location={user.location ? user.location : ""}
                  name={user.name ? user.name : ""}
                  email={user.email ? user.email : ""}
                  bio={user.bio ? user.bio : ""}
                  // linkedin={
                  //   user.linkedin ? "/" + user.linkedin.split("/")[4] : ""
                  // }
                  // twitter={user.twitter ? "/" + user.twitter.split("/")[3] : ""}
                  // website={user.website ? user.website : ""}
                  route={false}
                />
              </span>
            </button>
          )}
          <button
            className="w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white"
            onClick={() => {
              navigate("/hire");
            }}
          >
            <FaBriefcase className="cursor-pointer w-6 h-6" />
            <span className={`${open ? `block` : `hidden`} mx-3`}>Hire</span>
          </button>
          <button
            className="w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white"
            onClick={() => {
              handleopen();
              navigate("/connections");
            }}
          >
            <FaUserFriends className="cursor-pointer w-6 h-6" />
            <span className={`${open ? `block` : `hidden`} mx-3`}>
              Connections
            </span>
          </button>
          <button className="w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white">
            <IoSettingsSharp className="cursor-pointer w-6 h-6" />
            <span className={`${open ? `block` : `hidden`} mx-3`}>
              Settings
            </span>
          </button>
          <button
            className="w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 "
            onClick={props.handleLogout}
          >
            <IoPowerSharp className="cursor-pointer w-6 h-6 text-red-700" />
            <span
              className={`${
                open ? `block` : `hidden`
              } mx-3 text-red-700 font-semibold`}
            >
              Logout
            </span>
          </button>
        </div>
      </button>
    </div>
  );
}

export default SideBar;
