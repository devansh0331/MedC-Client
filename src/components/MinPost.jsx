import React, { useContext, useEffect } from "react";
import MinPostCard from "./MinPostCard";
import { FaExpand } from "react-icons/fa";
import { feedClick } from "../Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../UserContext";
import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const MinPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const minJobs = useSelector((state) => state.feed.minJobs);
  const handleExpand = () => {
    dispatch(feedClick(!minJobs));
  };

  const { getPosts, userId, user, posts, handleLike } = useContext(UserContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Card className="w-full bg-inherit h-2/3 flex-col items-center mx-auto mt-5 shadow-md lg:flex hidden">
      <Card className="w-full flex items-center justify-center bg-white rounded-md">
        <div className="flex w-11/12 my-1 justify-between items-center">
          <Typography className="text-xl w-full font-semibold">New Posts</Typography>
          <button onClick={()=> navigate('/feed')}>
            <FaExpand />
          </button>
        </div>
      </Card>

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
                profileId={post.user && post.user._id ? post.user._id : ""}
                description={post.description}
                isLiked={post.likes && user._id && post.likes[user._id]}
                handleLike={() => handleLike(post._id)}
                postId={post._id}
              />
            )
        )}
      </div>
    </Card>
  );
};

export default MinPost;
