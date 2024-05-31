import React from "react";
import profile from "../assets/profile2.png";
import { useState } from "react";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaMonument, FaRegCommentAlt } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import SinglePostCard from "./SinglePostCard";
import CreatePostPopUp from "./CreatePostPopUp";
import ReactTimeAgo from "react-time-ago";

function PostCard(props) {
  const posts = props.posts;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex flex-col w-1/2 mx-auto mt-6 border-b-2 shadow-md ">
      <div className="flex justify-evenly w-full bg-white py-4 px-2 border-b-2  items-center">
        <img
          src={profile}
          className="rounded-full h-10 md:h-11 w-10 md:w-11"
          alt="profile"
        />
        <input
          type="text"
          className="w-3/4 border-2 border-gray-500 rounded-md px-4 py-2"
          placeholder="Create Post"
          onClick={() => handleOpen()}
        />
        <CreatePostPopUp open={open} handleOpen={() => handleOpen()} />
      </div>
      <div className="flex flex-col bg-white py-2 px-2 w-full h-full overflow-y-scroll scrollbar-thin">
        {posts ? (
          posts.map((post, key) => {
            return (
              <SinglePostCard
                key={key}
                name={post.user ? post.user.name : "Unknown User"}
                description={post.description}
                likes={post.likes == {} ? post.likes.length : "0"}
                postedAt={<ReactTimeAgo date={post.createdAt} locale="en-US" />}
              />
            );
          })
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-bold text-lg">No Posts Available!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
