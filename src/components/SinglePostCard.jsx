import React from 'react'

import profile from "../assets/profile2.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";

const SinglePostCard = () => {
  return (
    <div>
        <div className="w-3/4 m-auto border-b-2 pb-4 mt-4">
            {/* NAME AND DETAILS */}
          <div className="flex justify-between">
            <div className="flex">
              <img
                src={profile}
                alt="profile"
                className="rounded-full h-10 md:h-12 w-10 md:w-12"
              />
              <div className="flex flex-col ml-4">
                <p className="text-black font-semibold text-md">
                  Devansh Shrivastava
                </p>
                <p className="text-gray-600 font-normal text-md">Technology</p>
              </div>
            </div>
            {/* TIME INFO */}
            <div className="flex items-center">
              <p className="text-gray-600 font-normal text-md">4 hrs ago</p>
              <HiOutlineDotsHorizontal className="text-gray-600 ml-4 w-6 h-6" />
            </div>
          </div>

          {/* POST */}
          <div className="flex flex-col w-full mt-4">
            <p className="text-md text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit.{" "}
              <button className="text-blue-500">Read More</button>
            </p>
            <img
              src={jobBuilding}
              className="my-4 w-72 h-72 mx-auto bg-gray-100 p-3 rounded-md"
            ></img>

            {/* LIKE AND COMMENT INFO */}
            <div className="flex justify-evenly">
              <div className="flex items-center">
                <AiFillLike className="w-5 h-5 mr-4" /> 1k Likes
              </div>
              <div className="flex items-center">
                <FaRegCommentAlt className="w-5 h-5 mr-4" /> 24 Comments
              </div>
              <div className="flex items-center">
                <IoPaperPlaneOutline className="w-5 h-5 mr-4" /> Share
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SinglePostCard
