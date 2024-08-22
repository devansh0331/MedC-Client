import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import altprofile from "../assets/altprofile.png";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Card, Typography } from "@material-tailwind/react";
const MinPostCard = (props) => {
  const navigate = useNavigate();
  console.log(props);
  console.log("isliked");
  
  return (
    <Card className="w-full bg-white my-2 p-4  rounded-md">
      <div className="flex justify-between  bg-white">
        {/* NAME AND DETAILS */}
        <div className="flex items-center gap-4">
          <Link to={`/user/${props.profileId}`}>
            <Avatar
              src={props.profileURL != "" ? props.profileURL : altprofile}
              alt="profile"
              size="sm"
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/user/${props.profileId}`}>
              <Typography className="text-[17px] text-gray-900">{props.name}</Typography>
            </Link>
          </div>
        </div>
        <div className="flex items-center text-blue-500">
          <button onClick={props.handleLike}>
            {props.isLiked ? (
              <AiFillLike className="w-6 h-6" />
            ) : (
              <AiOutlineLike className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {/* POST */}
      <div className="flex flex-col w-full mt-2">
        <Typography className="min-w-full text-gray-800">
          {props.description}
          <br />
          <button
            className="text-blue-500"
            onClick={() => navigate(`/post/${props.postId}`)}
          >
            Show Post
          </button>
        </Typography>
      </div>
    </Card>
  );
};

export default MinPostCard;
