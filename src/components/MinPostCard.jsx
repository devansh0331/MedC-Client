import React from 'react'
import { AiFillLike } from "react-icons/ai";
import profile from "../assets/profile2.png";
const MinPostCard = () => {
  return (
    <div>
      <div className="w-full m-auto border-b-2 pb-4 mt-4">
          <div className="flex justify-between">
            {/* NAME AND DETAILS */}
            <div className="flex">
              <img
                src={profile}
                alt="profile"
                className="rounded-full h-6 md:h-7 w-6 md:w-7"
              />
              <div className="flex flex-col ml-2">
                <p className="text-black font-normal text-md">
                  Devansh Shrivastava
                </p>
              </div>
            </div>
            <div className="flex items-center">
            <button>
                <AiFillLike className="w-5 h-5" />
            </button>
            </div>
          </div>
          {/* POST */}
          <div className="flex flex-col w-full mt-1">
            <p className="text-md text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit.{' '}
              <button className="text-blue-500">Show Post</button>
            </p>
          </div>
        </div>
    </div>
  )
}

export default MinPostCard
