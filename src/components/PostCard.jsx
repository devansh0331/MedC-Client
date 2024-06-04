import React, { useContext, useEffect, useState } from "react";
import altprofile from "../assets/altprofile.png";
import SinglePostCard from "./SinglePostCard";
import CreatePostPopUp from "./CreatePostPopUp";
import ReactTimeAgo from "react-time-ago";
import { SERVER_URL } from "../ServerURL";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../UserContext";

function PostCard() {
  const [open, setOpen] = useState(false);
  const { getPosts, userId, posts, handleLike, getUser, user } =
    useContext(UserContext);

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);
  useEffect(() => {
    getUser();
    console.log(posts);
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col w-1/2 mx-auto mt-6 border-b-2 shadow-md ">
      <div className="flex justify-evenly w-full bg-white py-4 px-2 border-b-2 items-center">
        <img
          src={user.profileURL ? user.profileURL : altprofile}
          className="rounded-full h-10 md:h-11 w-10 md:w-11"
          alt="profile"
        />
        <input
          type="text"
          className="w-3/4 border-2 border-gray-500 rounded-md px-4 py-2"
          placeholder="Create Post"
          onClick={handleOpen}
        />
        <CreatePostPopUp
          open={open}
          handleOpen={handleOpen}
          getAllPosts={getPosts}
        />
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
              img={post.fileURL == "" ? null : post.fileURL}
              name={post.user ? post.user.name : "Unknown User"}
              profileURL={
                post.user && post.user.profileURL ? post.user.profileURL : ""
              }
              description={post.description}
              likes={post.likes ? Object.keys(post.likes).length : "0"}
              isLiked={post.likes && userId && post.likes[userId]}
              postedAt={<ReactTimeAgo date={post.createdAt} locale="en-US" />}
              handleLike={() => handleLike(post._id)}
              postId={post._id}
            />
          ))
        )}
        <Toaster className="z-30 mt-20" position="top-right" />
      </div>
    </div>
  );
}

export default PostCard;
