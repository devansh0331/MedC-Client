import React from "react";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
const ProfileAbout = (props) => {
  return (
    <div className="w-full flex flex-col bg-white py-1 px-3 rounded-xl">
      <div className="flex items-center justify-between pb-1 my-1 border-b-2">
        <p className="text-xl font-medium text-gray-700">About</p>
        <button onClick={() => props.setCloseAbout(true)}>
          <FiEdit className="w-5 h-5" />
        </button>
      </div>
      <div className="w-full text-gray-700">{props.about}</div>
    </div>
  );
};

export default ProfileAbout;
