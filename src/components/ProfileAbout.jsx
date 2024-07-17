import React from "react";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
const ProfileAbout = (props) => {
  return (
    <div className="w-full h-60 md:h-[28%] flex flex-col bg-white py-1 rounded-xl shadow-md">
      <div className="flex items-center justify-between pb-1 my-1 border-b-2  px-3">
        <p className="text-xl font-medium2 text-gray-700">About</p>
        {props.isExisting && (
          <button onClick={() => props.setCloseAbout(true)}>
            <FiEdit className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="w-full text-gray-700 text-sm md:text-base px-3 overflow-y-scroll scrollbar-thin">
        {props.about}
      </div>
    </div>
  );
};

export default ProfileAbout;
