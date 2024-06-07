import React from "react";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
const ProfileAbout = (props) => {
  return (
    <div className="w-full h-full md:h-1/3 flex flex-col bg-white py-1 px-3 rounded-xl shadow-md">
      <div className="flex items-center justify-between pb-1 my-1 border-b-2">
        <p className="text-xl font-medium text-gray-700">About</p>
        <button onClick={() => props.setCloseAbout(true)}>
          <FiEdit className="w-5 h-5" />
        </button>
      </div>
      <div className="w-full text-gray-700 text-sm md:text-base overflow-y-scroll scrollbar-thin">
        {props.about}
      </div>
    </div>
  );
};

export default ProfileAbout;
