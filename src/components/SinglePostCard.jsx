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
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { UserContext } from "../UserContext";

const SinglePostCard = (props) => {
  const [comm, setComm] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentbox, setCommentbox] = useState(false);
  const [menuopen, setMenuopen] = useState(false);
  // const { getPosts, posts, handleLike, user } = useContext(UserContext);
  // const currUserId =
  const postId = props.postId;
  const user = props.userId;
  const [postMenu, setPostMenu] = useState(false);
  const navigate = useNavigate();
  const [editBox, setEditBox] = useState(false);
  const [editPost, setEditPost] = useState("");
  const [postdescp, setPostDescp] = useState(props.description);
  const handleEditBox = () => {
    setEditBox(!editBox);
  }
  const menuHandle = () => {
    setMenuopen(!menuopen);
  };

  // useEffect(() => {});
  const getComments = async (comm) => {
    if (comm == true) {
      try {
        const response = await fetch(
          `${SERVER_URL}/post/single-post/comment/all/${postId}`,
          { method: "GET" }
        );

        const res = await response.json();

        if (!res.success) {
          setComments([]);
          console.log(res.error);
        } else {
          setComments(res.data);
          // console.log(res.data);
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

  const handleEditPost = async() => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/update-post/${postId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({ description: postdescp }),
        }
      )
      const res = await response.json();
      if (!res.success) {
        toast.error("Failed to edit post due to: ", res.error);
      } else {
        toast.success("Post edited successfully", true);
        props.getUserPosts();
        setEditBox(false);
      }

    } catch (error) {
      toast.error("Failed to edit post due to: ", res.error);
    }
  };

  const handleDeletePost = async() => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/delete-post/${postId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      const res = await response.json();
      if (!res.success) {
        toast.error("Failed to delete post due to: ", res.error);
      } else {
        props.getUserPosts();
        toast.success("Post deleted successfully", true);
      }
    } catch (error) {
      toast.error("Failed to delete post due to: ", res.error);      
    }
  };

  return (
    <Card className="w-full p-4 my-2 mx-auto">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 p-0 flex items-center justify-between"
      >
        <div className="flex items-center">
          <div className="">
            <Avatar
              src={props.profileURL ? props.profileURL : altprofile}
              alt="profile"
              size="lg"
              className="cursor-pointer"
              onClick={() => navigate(`/user/${props.profileId}`)}
            />
          </div>
          <div
            className="ml-4 cursor-pointer"
            onClick={() => navigate(`/user/${props.profileId}`)}
          >
            <Typography className="text-sm md:text-base font-bold text-gray-900">
              {props.name}
            </Typography>
            {props.bio && (
              <Typography className="text-xs md:text-[14px]  font-bold font-serif text-gray-700">
                {props.bio}
              </Typography>
            )}
          </div>
        </div>
        <div className="ml-auto flex flex-col-reverse md:flex-row items-end md:items-start md:gap-2">
          <Typography className="text-xs md:text-base">
            {props.postedAt}
          </Typography>
          {user === props.profileId && (
            <Typography className="text-sm md:text-base text-gray-900 md:text-gray-700">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <button>
                    <HiOutlineDotsHorizontal className="cursor-pointer  w-4 h-4 md:w-6 md:h-6" />
                  </button>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={handleEditBox}>Edit</MenuItem>
                  <MenuItem onClick={() => handleDeletePost()}>Delete</MenuItem>
                </MenuList>
              </Menu>
            </Typography>
          )}
        </div>
      </CardHeader>
      <CardBody className="m-0 p-0 z-0">
        {props.description && (
          <Typography className="py-4 px-2 text-gray-800">
            {props.description}
          </Typography>
        )}
        {props.img && (
          <img
            src={props.img}
            // src="https://res.cloudinary.com/dn7l5h2gk/image/upload/v1717411078/l9tx5dc0bkuqyn1zuw5l.jpg"
            alt="post"
            className="w-full rounded-md my-2 object-contain mx-auto bg-black"
          />
        )}
        <div className="flex items-center px-6 py-4 gap-6 justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => props.handleLike()}
          >
            {props.isLiked ? (
              <AiFillLike className="w-5 h-5 text-blue-600" />
            ) : (
              <AiOutlineLike className="w-5 h-5 text-blue-600" />
            )}
            <Typography className="text-base text-gray-800">
              {props.likes} {props.likes === 1 ? "Like" : "Likes"}
            </Typography>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              getComments(true);
              setCommentbox(!commentbox);
            }}
          >
            <FaRegCommentAlt className="w-5 h-5 text-blue-600" />
            <Typography className="text-base text-gray-800">
              {comments.length > 0 && comments.length} Comments
            </Typography>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <IoPaperPlaneOutline className="w-5 h-5 text-blue-600" />
            <Typography className="text-base text-gray-800">Share</Typography>
          </div>
        </div>
      </CardBody>
      {commentbox && (
        <CardFooter className="m-0 px-2 py-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addComment();
            }}
            className="flex justify-between items-center relative"
          >
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              label="Add Comment"
            />
            <Typography
              onClick={() => addComment()}
              className="text-base absolute right-4 cursor-pointer text-blue-500"
            >
              Post
            </Typography>
          </form>
          <div className="w-full grid grid-cols-1 gap-2 my-4">
            {comments.length > 0 && (
              <>
                {comments.map((commentDetail, key) => (
                  <div className="flex justify-between text-black rounded-md bg-background items-center  p-2 px-2">
                    <div className="flex items-start">
                      <Avatar
                        src={
                          commentDetail.userId.profileURL
                            ? commentDetail.userId.profileURL
                            : altprofile
                        }
                        alt="profile"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() =>
                          navigate(`/user/${commentDetail.userId._id}`)
                        }
                      />
                      <div className="ml-2">
                        <Typography
                          className="text-xs font-semibold cursor-pointer"
                          onClick={() =>
                            navigate(`/user/${commentDetail.userId._id}`)
                          }
                        >
                          {commentDetail.userId.name}
                        </Typography>
                        <Typography>{commentDetail.comment}</Typography>
                      </div>
                    </div>
                    {user == commentDetail.userId._id && (
                      <Typography>
                        <RiDeleteBin6Line
                          className="cursor-pointer"
                          onClick={() => deleteComment(commentDetail._id)}
                        />
                      </Typography>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </CardFooter>
      )}
      <Toaster position="top-right" />

      {/* EDIT POST POPUP */}
      <Dialog open={editBox} handler={handleEditBox} size="sm">
        <DialogHeader 
        className="p-4 m-0">
          <Typography className="text-xl font-semibold text-gray-900">Edit Post</Typography>
          </DialogHeader>
          <DialogBody>
            <Typography className="text-base font-normal text-gray-700">
              <Textarea label="Description" value={postdescp} onChange={(e) => setPostDescp(e.target.value)} />
            </Typography>
          </DialogBody>
          <DialogFooter className="">
            <Button
              variant="outlined"
              size="sm"
              color="blue"
              onClick={() => handleEditBox()}
              className="mr-4"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              size="sm"
              color="blue"
              onClick={() => handleEditPost()}
            >
              <span>Save</span>
            </Button>
          </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default SinglePostCard;
