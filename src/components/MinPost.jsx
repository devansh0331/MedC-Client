import React, { useContext, useEffect } from "react";
import MinPostCard from "./MinPostCard";
import { FaExpand } from "react-icons/fa";
import { feedClick } from "../Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../UserContext";
const MinPost = () => {
  const dispatch = useDispatch();
  const minJobs = useSelector((state) => state.feed.minJobs);
  const handleExpand = () => {
    dispatch(feedClick(!minJobs));
    console.log(minJobs);
  };

  const { getPosts, userId, user, posts, handleLike } = useContext(UserContext);

  console.log(userId);
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="w-1/3 bg-inherit h-2/3 flex flex-col items-center mx-auto mt-6 shadow-md">
      <div className="w-full bg-white flex justify-center items-center rounded-md">
      <div className="flex justify-between items-center w-11/12  py-1">
        <p className="text-xl w-full font-semibold">New Posts</p>
        <button onClick={() => handleExpand()}>
          <FaExpand />
        </button>
      </div>
      </div>

      <div className="overflow-y-scroll scrollbar-thin w-full h-full flex flex-col items-center">
      {posts.map(
        (post, key) =>
          post.fileURL == "" && (
              <MinPostCard
                key={key}
                name={post.user ? post.user.name : "Unknown User"}
                profileURL={
                  post.user && post.user.profileURL ? post.user.profileURL : ""
                }
                description={post.description}
                isLiked={post.likes && user._id && post.likes[user._id]}
                handleLike={() => handleLike(post._id)}
                postId={post._id}
              />
              )
              )}
            </div>
    </div>
  );
};

export default MinPost;
