import React from "react";
import profile from "../assets/profile2.png";
import hacking from "../assets/hacking.jpg";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";

function PostCard() {
  return (
    <div className="w-full flex flex-col items-center px-6 py-3 shadow-md">
      <div className="w-full flex items-start justify-between py-3">
        {/* USER INFO */}
        <div className="flex items-center">
          <img
            src={profile}
            alt=""
            className="rounded-full h-10 md:h-12 w-10 md:w-12 object-cover object-center cursor-pointer"
          />
          <div className="pl-3 flex flex-col items-start justify-start">
            <h3 className="text-base font-bold leading-4">
              Devansh Shrivastava
            </h3>
            <p className="text-grayText text-sm">Technology</p>
          </div>
        </div>
        <div className="flex text-grayText">
          <p className="text-sm pr-3">4h ago</p>
          <p className="text-sm">
            <BsThreeDots className="cursor-pointer" />
          </p>
        </div>
      </div>

      {/* POST CONTENT */}
      <div>
        <p className="text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Exercitationem laborum non enim quo minus, suscipit adipisci, odio
          tempora obcaecati excepturi quos accusantium a voluptates. Iste
          ducimus voluptatibus reprehenderit accusamus sequi?
        </p>

        <img src={hacking} alt="" className="rounded-lg h-90 w-50 my-3" />
      </div>

      {/* LIKES COMMMENTS AND SHARE SECTION */}
      <div className="w-full h-full py-3">
        <div className="w-full md:w-1/2 flex items-center text-base  justify-between ">
          <p className="flex items-center justify-center">
            <AiOutlineLike className="text-lg " /> &nbsp; 5 Likes
          </p>
          <p className="flex items-center justify-center ">
            <FaRegCommentAlt className="text-lg" /> &nbsp; 5 Comments
          </p>
          <p className="flex items-center justify-center ">
            <TbShare3 className="text-lg" /> &nbsp; Share
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
