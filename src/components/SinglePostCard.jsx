import React, { useEffect } from "react";
import { useState } from "react";
import profile from "../assets/profile.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { SERVER_URL } from "../ServerURL";
import altprofile from "../assets/altprofile.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Input
} from "@material-tailwind/react";

const SinglePostCard = (props) => {
  const [comm, setComm] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const postId = props.postId;
  const user = props.userId;
  const [postMenu, setPostMenu] = useState(false);

  useEffect(() => {});
  const getComments = async (comm) => {
    if (comm == true) {
      try {
        const response = await fetch(
          `${SERVER_URL}/post/single-post/comment/all/${postId}`,
          { method: "GET" }
        );

        const res = await response.json();

        if (!res.success) {
          console.log(res.error);
        } else {
          setComments(res.data);
          setCommentsCount(res.data.length);
        }
      } catch (error) {
        console.error("Failed to fetch comments");
      }
    }
  };

  const addComment = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/single-post/comment/post/${postId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({ comment }),
        }
      );

      const res = await response.json();
      if (!res.success) {
        console.log("Failed to comment due to: ", res.error);
      } else {
        setComment("");
        getComments(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/single-post/comment/delete/${commentId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const res = await response.json();
      if (!res.success) {
        console.log("Failed to delete comment due to: ", res.error);
      } else {
        getComments(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Card className="w-full p-4 my-2">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 p-0 flex items-center justify-between"
      >
        <div className="flex items-center">
          <div className="">
            <Avatar src={altprofile} alt="profile" size="lg" />
          </div>
          <div className="ml-4">
            <Typography className="text-base font-bold">John Doe</Typography>
            <Typography>Developer</Typography>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <Typography className="text-base">2 hours ago</Typography>
          <Typography className="text-base">
            <HiOutlineDotsHorizontal className="cursor-pointer w-6 h-6" />
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="m-0 p-0">
        <Typography className="py-4 px-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          placeat unde at inventore vero aperiam quod aliquam nemo vitae,
          repellat cum deserunt assumenda quaerat necessitatibus reiciendis
          totam magnam asperiores odio?
        </Typography>
        <img
          src={jobBuilding}
          alt="jobBuilding"
          className="w-72 h-7w-72 rounded-md my-2"
        />
        <div className="flex items-center px-6 py-4 gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <AiOutlineLike className="w-5 h-5 text-blue-600" />
            <Typography className="text-base text-gray-800">2 Likes</Typography>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <FaRegCommentAlt className="w-5 h-5 text-blue-600" />
            <Typography className="text-base text-gray-800">2 Comments</Typography>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <IoPaperPlaneOutline className="w-5 h-5 text-blue-600" />
            <Typography className="text-base text-gray-800">2 Likes</Typography>
          </div>
        </div>
      </CardBody>
      <CardFooter className="m-0 px-2 py-0">
        <div className="flex justify-between items-center relative">
          <Input label="Add Comment" />
          <Typography className="text-base absolute right-4 cursor-pointer text-blue-500">Post</Typography>
        </div>
        <div className="flex justify-between items-center my-2 px-2">
          <Typography>This is a comment</Typography>
          <Typography><RiDeleteBin6Line/></Typography>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SinglePostCard;
