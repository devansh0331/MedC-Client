import React, { useEffect } from "react";
import profile2 from "../assets/profile2.png";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { useState } from "react";
import EditProfile from "./EditProfile";
import altprofile from "../assets/altprofile.png";

const ProfileCard = (props) => {
  const [check, setCheck] = useState(false);
  

  return (
    <div
      className={`bg-white pt-4 md:pt-6 nd:pb-2 rounded-xl flex flex-col items-center w-full sm:w-auto ${
        props.profile ? `px-4 md:px-8 shadow-md` : `px-4 `
      }`}
    >
      <img
        src={props.profileURL ? props.profileURL : altprofile}
        className="rounded-full h-20 w-20"
      />
      <div className="flex flex-col mx-auto my-2 h-auto pb-2 border-b-2">
        <div className="text-md font-semibold mx-auto mb-1">{props.name}</div>
        {props.bio && (
          <div className="text-sm mx-auto text-gray-700">{props.bio}</div>
        )}
      </div>
      <div className="flex flex-col md:mx-auto my-2 h-auto">
        {props.location && (
          <div className="text-sm flex items-center text-gray-700 my-1">
            <IoLocationSharp className="w-4 h-4 mr-3" />
            {props.location}
          </div>
        )}
        {props.contact && (
          <div className="text-sm flex items-center text-gray-700 my-1">
            <FaPhoneAlt className="w-4 h-4 mr-3" />
            {props.contact}
          </div>
        )}
        {props.email && (
          <div className="text-sm flex items-center text-gray-700 my-1">
            <MdEmail className="w-4 h-4 mr-3" />
            {props.email}
          </div>
        )}
        {props.linkedin && (
          <div className="text-sm flex items-center text-gray-700 my-1">
            <FaLinkedinIn className="w-4 h-4 mr-3" />
            {props.linkedin}
          </div>
        )}
        {props.twitter && (
          <div className="text-sm flex items-center text-gray-700 my-1">
            <FaXTwitter className="w-4 h-4 mr-3" />
            {props.twitter}
          </div>
        )}
        {props.website && (
          <div className="text-sm flex items-center text-gray-700 my-1">
            <FaLink className="w-4 h-4 mr-3" />
            {props.website}
          </div>
        )}
        {props.profile && (
          <button
            className="mx-auto text-blue-600 underline my-2"
            onClick={() => props.setClose(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
