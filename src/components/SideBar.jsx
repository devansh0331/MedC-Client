import React from "react";
import profile from "../assets/profile3.png";
import { FaEdit } from "react-icons/fa";

function SideBar() {
  return (
    <div className="relative w-full mb-4 md:mb:0 shadow-none md:shadow-md py-3 px-6">
      <div className="relative flex flex-col items-center justify-evenly py-3">
        <img
          src={profile}
          alt=""
          className="rounded-full h-64 md:h-20 w-64 md:w-20 object-cover object-center cursor-pointer"
        />

        <p className="font-bold text-2xl md:text-lg leading-1 pt-2">
          Devansh Shrivastava
        </p>
        <p className="text-grayText leading-3 text-base md:text-sm">
          Developer | Learner | Explorer
        </p>
      </div>
      <hr />
      <div className=" text-sm  text-center  py-3">
        <p className="font-semibold">
          Connections: <span className="font-normal">500+</span>{" "}
        </p>
        <p className="font-semibold">
          Followers: <span className="font-normal">153k</span>
        </p>
        <p className="font-semibold">
          Impressions: <span className="font-normal">587k</span>
        </p>
      </div>
      <div className="absolute right-2 top-2">
        <FaEdit className="text-2xl md:text-xl" />
      </div>
    </div>
  );
}

export default SideBar;
