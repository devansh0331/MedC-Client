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

  const { getPosts, userId, posts, handleLike } = useContext(UserContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="w-1/3 bg-white h-2/3  overflow-y-scroll scrollbar-thin flex flex-col items-center px-6 py-3 mx-auto mt-6 shadow-md">
      <div className="flex w-full justify-between items-center">
        <p className="text-xl w-full border-b-2 font-semibold">New Posts</p>
        <button onClick={() => handleExpand()}>
          <FaExpand />
        </button>
      </div>
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
              isLiked={post.likes && userId && post.likes[userId]}
              handleLike={() => handleLike(post._id)}
              postId={post._id}
            />
          )
      )}
    </div>
  );
};

export default MinPost;
