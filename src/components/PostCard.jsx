import React from "react";
import profile from "../assets/profile2.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import SinglePostCard from "./SinglePostCard";
function PostCard() {
  return (
    <div className="flex flex-col w-2/4 mx-auto mt-6">
      <div className="flex justify-around w-full bg-white py-4 px-2 border-b-2">
        <img
          src={profile}
          className="rounded-full h-10 md:h-12 w-10 md:w-12"
          alt="profile"
        />
        <input
          type="text"
          className="w-3/4 border-2 border-gray-500 rounded-md px-4"
          placeholder="Create Post"
        />
      </div>
      <div className="flex flex-col bg-white py-2 px-2 w-full overflow-y-scroll scrollbar-thin">
        <SinglePostCard/>
        <SinglePostCard/>
        <SinglePostCard/>
        <SinglePostCard/>
        <SinglePostCard/>        
      </div>
    </div>
  );
}

export default PostCard;
