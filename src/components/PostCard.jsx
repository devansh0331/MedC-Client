import React, { useEffect, useState } from "react";
import profile from "../assets/profile2.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaMonument, FaRegCommentAlt } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import SinglePostCard from "./SinglePostCard";
import CreatePostPopUp from "./CreatePostPopUp";
import ReactTimeAgo from "react-time-ago";
import { SERVER_URL } from "../ServerURL";
import toast, { Toaster } from "react-hot-toast";

function PostCard() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/post/all-posts`, {
        credentials: "include",
      });
      const res = await response.json();
      if (!res.success) {
        toast.error(res.error);
      } else {
        setPosts(res.data);
        setUserId(res.userId.id);
      }
    } catch (error) {
      toast.error("Failed to fetch posts");
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLike = async (postId) => {
    try {
      const res = await fetch(`${SERVER_URL}/post/single-post/like/${postId}`, {
        method: "POST",
        credentials: "include",
      });
      const parsedRes = await res.json();
      if (!parsedRes.success) {
        toast.error(parsedRes.error);
      } else {
        getData();
      }
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  return (
    <div className="flex flex-col w-1/2 mx-auto mt-6 border-b-2 shadow-md ">
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
          onClick={handleOpen}
        />
        <CreatePostPopUp open={open} handleOpen={handleOpen} />
      </div>
      <div className="flex flex-col bg-white py-2 px-2 w-full h-full overflow-y-scroll scrollbar-thin">
        {posts.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-bold text-lg">No Posts Available!</p>
          </div>
        ) : (
          posts.map((post, key) => (
            <SinglePostCard
              key={key}
              name={post.user ? post.user.name : "Unknown User"}
              description={post.description}
              likes={post.likes ? Object.keys(post.likes).length : "0"}
              isLiked={post.likes && userId && post.likes[userId]}
              postedAt={<ReactTimeAgo date={post.createdAt} locale="en-US" />}
              handleLike={() => handleLike(post._id)}
            />
          ))
        )}
        <Toaster className="z-30 mt-20" position="top-right" />
      </div>
    </div>
  );
}

export default PostCard;
