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

  const { getPosts, userId, user, posts, handleLike, userInfo } = useContext(UserContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Card className="w-full bg-inherit h-2/3 flex-col items-center mx-auto mt-5 shadow-md lg:flex hidden">
      <Card className="w-full flex items-center justify-center bg-white rounded-md">
        <div className="flex w-11/12 my-1 justify-between items-center cursor-pointer" onClick={()=> navigate('/feed')}>
          <Typography className="text-xl w-full font-semibold">New Posts</Typography>
          <button>
            <FaExpand />
          </button>
        </div>
      </Card>

      <div className="overflow-y-scroll scrollbar-thin w-full h-full flex flex-col items-center">
        {posts.map((post, key) => (
          <MinPostCard
            post={post}
            key={key}
            handleLike={handleLike}
            userId={userId}
            user={user}
          />
        ))}
      </div>
    </Card>
  );
};

export default MinPost;
