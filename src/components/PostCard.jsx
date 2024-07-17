import React, { useContext, useEffect, useState } from "react";
import altprofile from "../assets/altprofile.png";
import SinglePostCard from "./SinglePostCard";
import CreatePostPopUp from "./CreatePostPopUp";
import ReactTimeAgo from "react-time-ago";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

function PostCard() {
  const [open, setOpen] = useState(false);
  const { getPosts, posts, handleLike, user } = useContext(UserContext);

  useEffect(() => {
    getPosts();
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="w-11/12 flex flex-col md:w-4/5 xl:w-2/5  mx-auto mt-6  bg-inherit  ">
      <div className="flex  justify-evenly w-full bg-white py-2 items-center rounded-md shadow-md">
        <Link to={`/user/${user._id}`}>
          <img
            src={user.profileURL ? user.profileURL : altprofile}
            className="rounded-full h-10 md:h-11 w-10 md:w-11"
            alt="profile"
          />
        </Link>
        <input
          type="text"
          className="w-4/5 border-2 border-gray-500 rounded-md px-2 py-1 md:py-1"
          placeholder="Create Post"
          onClick={handleOpen}
        />
        <CreatePostPopUp
          open={open}
          handleOpen={handleOpen}
          getAllPosts={getPosts}
        />
      </div>
      <div className="flex flex-col w-full h-screen md:h-full overflow-y-scroll scrollbar-thin">
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
              profileId={post.user && post.user._id ? post.user._id : ""}
              description={post.description}
              likes={post.likes ? Object.keys(post.likes).length : "0"}
              isLiked={post.likes && user._id && post.likes[user._id]}
              postedAt={<ReactTimeAgo date={post.createdAt} locale="en-US" />}
              handleLike={() => handleLike(post._id)}
              postId={post._id}
              userId={user._id}
            />
          ))
        )}
        <Toaster className="z-30 mt-20" position="top-right" />
      </div>
    </div>
  );
}

export default PostCard;
