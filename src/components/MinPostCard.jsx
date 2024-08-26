import React, { useContext } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import altprofile from "../assets/altprofile.png";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Card, Typography } from "@material-tailwind/react";
import { UserContext } from "../UserContext";
const MinPostCard = (props) => {
  const navigate = useNavigate();
  const {handleLike, user} = useContext(UserContext)
  const post = props.post;

  return (
    <Card className="w-full bg-white my-2 p-4  rounded-md">
      <div className="flex justify-between  bg-white">
        {/* NAME AND DETAILS */}
        <div className="flex items-center gap-4">
          <Link to={`/user/${post.user._id}`}>
            <Avatar
              src={post.user.profileURL != "" ? post.user.profileURL : altprofile}
              alt="profile"
              size="sm"
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/user/${post.user.profileId}`}>
              <Typography className="text-[17px] text-gray-900">{post.user.name}</Typography>
            </Link>
          </div>
        </div>
        <div className="flex items-center text-blue-500">
          <button>
            {post.likes && user._id && post.likes[user._id] ? (
              <AiFillLike className="w-6 h-6 cursor-pointer" onClick={() => handleLike(post._id)} />
            ) : (
              <AiOutlineLike className="w-6 h-6 cursor-pointer" onClick={() => handleLike(post._id)} />
            )}
          </button>
        </div>
      </div>
      {/* POST */}
      <div className="flex flex-col w-full mt-2">
        <Typography className="min-w-full text-gray-800">
          {post.description}
          <br />
          <button
            className="text-blue-500"
            onClick={() => navigate(`/post/${post._id}`)}
          >
            Show Post
          </button>
        </Typography>
      </div>
    </Card>
  );
};

export default MinPostCard;
