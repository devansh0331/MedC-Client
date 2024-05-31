import React from "react";
import profile from "../assets/profile2.png";
import { useState } from "react";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import SinglePostCard from "./SinglePostCard";
import CreatePostPopUp from "./CreatePostPopUp";
function PostCard() {
  const [open, setOpen] = useState(false);
  const handleOpen=()=>{
    setOpen(!open)
  }
  return (
    <div className="flex flex-col w-2/4 mx-auto mt-6">
      <div className="flex justify-evenly w-full bg-white py-4 px-2 border-b-2 items-center">
        <img
          src={profile}
          className="rounded-full h-10 md:h-11 w-10 md:w-11"
          alt="profile"
        />
        <input
          type="text"
          className="w-3/4 border-2 border-gray-500 rounded-md px-4 py-2"
          placeholder="Create Post"
          onClick={()=>handleOpen()}
        />
        <CreatePostPopUp open={open} handleOpen={()=>handleOpen()}/>
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
