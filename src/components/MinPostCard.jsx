import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import profile from "../assets/profile2.png";
const MinPostCard = (props) => {
  return (
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
            <p className="text-black font-normal text-md">{props.name}</p>
          </div>
        </div>
        <div className="flex items-center">
          <button onClick={props.handleLike}>
            {props.isLiked ? (
              <AiFillLike className="w-5 h-5 mr-4" />
            ) : (
              <AiOutlineLike className="w-5 h-5 mr-4" />
            )}
          </button>
        </div>
      </div>
      {/* POST */}
      <div className="flex flex-col w-full mt-1">
        <p className=" min-w-full text-md text-gray-700">
          {props.description}
          <br />
          <button className=" text-blue-500">Show Post</button>
        </p>
      </div>
    </div>
  );
};

export default MinPostCard;
