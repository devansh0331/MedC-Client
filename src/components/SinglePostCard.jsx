import React from "react";

import profile from "../assets/profile3.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";

const SinglePostCard = (props) => {
  return (
    <div>
      <div className="w-3/4 m-auto border-b-2 pb-4 py-2 mt-4">
        {/* NAME AND DETAILS */}
        <div className="flex justify-between">
          <div className="flex">
            <img
              src={profile}
              alt="profile"
              className="rounded-full h-10 md:h-12 w-10 md:w-12"
            />
            <div className="flex flex-col ml-4">
              <p className="text-black font-semibold text-md">{props.name}</p>
              <p className="text-gray-600 font-normal text-md">Technology</p>
            </div>
          </div>
          {/* TIME INFO */}
          <div className="flex items-center">
            <p className="text-gray-600 font-normal text-md">
              {props.postedAt}
            </p>
            <HiOutlineDotsHorizontal className="text-gray-600 ml-4 w-6 h-6" />
          </div>
        </div>

        {/* POST */}
        <div className="flex flex-col w-full py-4">
          <p className="text-md  text-gray-900">
            {props.description}
            <br />
            {props.readMore && (
              <button className="text-blue-500">Read More</button>
            )}
          </p>
          {props.img && (
            <img
              src={jobBuilding}
              className="my-4 w-72 h-72 mx-auto bg-gray-100 p-3 rounded-md"
            ></img>
          )}

          {/* LIKE AND COMMENT INFO */}
          <div className="flex justify-evenly pt-4">
            <div
              onClick={props.handleLike}
              className="flex items-center cursor-pointer"
            >
              {props.isLiked ? (
                <AiFillLike className="w-5 h-5 mr-4" />
              ) : (
                <AiOutlineLike className="w-5 h-5 mr-4" />
              )}{" "}
              {props.likes} {props.likes == 0 ? "Like" : "Likes"}
            </div>
            <div className="flex items-center cursor-pointer">
              <FaRegCommentAlt className="w-4 h-4 mr-4" /> {props.comments}{" "}
              Comments
            </div>
            <div className="flex items-center cursor-pointer">
              <IoPaperPlaneOutline className="w-4 h-4 mr-4" /> Share
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostCard;
