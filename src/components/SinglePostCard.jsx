import React, { useContext, useEffect } from "react";
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
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { UserContext } from "../UserContext";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import ReactTimeAgo from "react-time-ago";
import SinglePostSkeleton from "./SinglePostSkeleton";
import SignupDialog from "./SignUpDialog";

const SinglePostCard = (props) => {
  const [comm, setComm] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentbox, setCommentbox] = useState(false);
  const [menuopen, setMenuopen] = useState(false);
  const [shareBox, setShareBox] = useState(false);
  const [showText, setShowText] = useState(false);
  const { handleLike, userInfo } = useContext(UserContext);
  const post = props.post;
  const handleShareBox = () => {
    setShareBox(!shareBox);
  };
  const postId = props.postId;
  const user = props.userId;
  const [postMenu, setPostMenu] = useState(false);
  const navigate = useNavigate();
  const [editBox, setEditBox] = useState(false);
  const [editPost, setEditPost] = useState("");
  const [postdescp, setPostDescp] = useState(post?.description);
  const [deletePost, setDeletePost] = useState(false);
  const [archivePost, setArchivePost] = useState(false);
  const [postContent, setPostContent] = useState(
    post?.description?.substring(0, 100)
  );
  const [postReadMore, setPostReadMore] = useState(
    post?.description?.length > 100
  );
  const [isLiked, setIsLiked] = useState(
    post?.likes && user && post?.likes[user]
  );
  const [postLoading, setPostLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(false);
  const [signUpDialog, setSignUpDialog] = useState(false);

  const handleSignUpDialog = () => {
    setSignUpDialog(!signUpDialog);
  };

  const handleImagePreview = () => {
    setImagePreview(!imagePreview);
  };

  useEffect(() => {
    if (post) {
      setPostLoading(false);
    }
  });
  const handleDeletePostBox = () => {
    setDeletePost(!deletePost);
  };

  const handleArchivePostBox = () => {
    setArchivePost(!archivePost);
  };

  const handleEditBox = () => {
    setEditBox(!editBox);
  };
  const menuHandle = () => {
    setMenuopen(!menuopen);
  };

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

  const handleEditPost = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/post/update-post/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ description: postdescp }),
      });
      const res = await response.json();
      if (!res.success) {
        toast.error("Failed to edit post due to: ", res.error);
      } else {
        toast.success("Post edited successfully", true);
        props.parentFunction();
        setEditBox(false);
      }
    } catch (error) {
      toast.error("Failed to edit post due to: ", res.error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/post/delete-post/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const res = await response.json();
      if (!res.success) {
        toast.error("Failed to delete post due to: ", res.error);
      } else {
        props.parentFunction();
        toast.success("Post deleted successfully", true);
        setDeletePost(false);
      }
    } catch (error) {
      toast.error("Failed to delete post due to: ", res.error);
    }
  };

  const handleArchivePost = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/archive-post-by-user/${postId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const res = await response.json();
      console.log(res);

      if (!res.success) {
        toast.error("Failed to archive post due to: ", res.error);
        console.log(res);
      } else {
        toast.success("Post archived successfully", true);
        setArchivePost(false);
        props.parentFunction();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestorePost = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/restore-post-by-user/${postId}`,
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
        toast.error("Failed to restore post due to: ", res.error);
      } else {
        toast.success("Post restored successfully", true);
        props.parentFunction();
      }
    } catch (error) {
      toast.error("Failed to restore post due to: ", res.error);
    }
  };

  const postUrl = `${window.location.origin}/post/${props.postId}`;
  const copyUrl = async () => {
    try {
      const postUrl = `${window.location.origin}/post/${props.postId}`;
      await navigator.clipboard.writeText(postUrl);
      setShowText(true);
      setTimeout(() => {
        setShowText(false);
      }, 1000);
    } catch (error) {
      console.error("Error copying URL:", error);
    }
  };

  const noOfLikes = post?.likes ? Object.keys(post?.likes).length : 0;

  return (
    <>
      {postLoading ? (
        <SinglePostSkeleton />
      ) : (
        <Card className="w-full p-4 mx-auto">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-0 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="">
                <Avatar
                  src={`${
                    post?.user?.profileURL ? post?.user?.profileURL : altprofile
                  }`}
                  alt="profile"
                  size="lg"
                  className="cursor-pointer"
                  onClick={() => navigate(`/user/${post?.user?._id}`)}
                />
              </div>
              <div
                className="ml-4 cursor-pointer"
                onClick={() => navigate(`/user/${post?.user?._id}`)}
              >
                <Typography className="text-sm md:text-base font-bold text-gray-900">
                  {post?.user?.name}
                </Typography>
                {post?.user?.bio && (
                  <Typography className="text-xs md:text-[14px] text-gray-700">
                    {post?.user?.bio}
                  </Typography>
                )}
              </div>
            </div>
            <div className="ml-auto flex flex-col-reverse md:flex-row items-end md:items-start md:gap-2">
              <Typography className="text-xs md:text-base">
                {post?.createdAt && (
                  <ReactTimeAgo
                    date={new Date(post?.createdAt)}
                    locale="en-US"
                  />
                )}
              </Typography>
              {user === post?.user?._id && (
                <Typography className="text-sm md:text-base text-gray-900 md:text-gray-700">
                  <Menu placement="bottom-start">
                    <MenuHandler>
                      <button>
                        <HiOutlineDotsHorizontal className="cursor-pointer w-5 h-5 md:w-6 md:h-6" />
                      </button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem onClick={handleEditBox}>Edit</MenuItem>
                      {post?.userArchived ? (
                        <MenuItem onClick={() => handleRestorePost()}>
                          Restore
                        </MenuItem>
                      ) : (
                        <MenuItem onClick={handleArchivePostBox}>
                          Archive
                        </MenuItem>
                      )}
                      <MenuItem onClick={handleDeletePostBox}>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </Typography>
              )}
            </div>
          </CardHeader>
          <CardBody className="m-0 p-0 z-0">
            {postContent && (
              <Typography className="py-4 px-2 text-gray-800 cursor-pointer">
                <span onClick={() => navigate(`/post/${props.postId}`)}>
                  {postContent}
                </span>
                {postReadMore && (
                  <>
                    <span>... </span>
                    <span
                      className="text-blue-500"
                      onClick={() => {
                        setPostContent(post?.description);
                        setPostReadMore(false);
                      }}
                    >
                      Read More
                    </span>
                  </>
                )}
              </Typography>
            )}
            {post?.fileURL && (
              <img
                src={post?.fileURL}
                alt="post"
                className="w-full rounded-md my-2 object-contain mx-auto cursor-pointer"
                onClick={handleImagePreview}
              />
            )}
            <div className="flex items-center px-6 py-4 gap-6 justify-between">
              <div
                className="flex items-center gap-1">
                {isLiked ? (
                  <AiFillLike
                    className="w-5 h-5 text-blue-600 active:animate-like cursor-pointer"
                    onClick={() => {
                      if(userInfo.state){
                        handleLike(postId);
                        props.parentFunction();
                        setIsLiked(false);
                      }else{
                        setSignUpDialog(true);
                      }
                    }}
                  /> 
                ) : (
                  <AiOutlineLike
                    className="w-5 h-5 text-blue-600 active:animate-like cursor-pointer"
                    onClick={() => {
                      if(userInfo.state){
                        handleLike(postId);
                        props.parentFunction();
                        setIsLiked(true);
                      }else{
                        setSignUpDialog(true);
                      }
                    }}
                  />
                )}
                <Typography className="text-base text-gray-800 flex gap-1">
                  <span>{noOfLikes}</span>
                  <span className="xs:block hidden">
                    {noOfLikes === 1 ? "Like" : "Likes"}
                  </span>
                </Typography>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  if(userInfo.state){
                    getComments(true);
                    setCommentbox(!commentbox);
                  }else{
                    setSignUpDialog(true);
                  }
                 
                }}
              >
                <FaRegCommentAlt className="w-5 h-5 text-blue-600" />
                <Typography className="text-base text-gray-800 flex gap-1 items-center">
                  {comments.length > 0 && comments.length}{" "}
                  <span className="xs:block hidden">
                    {comments.length === 1 ? "Comment" : "Comments"}
                  </span>
                </Typography>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleShareBox}
              >
                <IoPaperPlaneOutline className="w-5 h-5 text-blue-600" />
                <Typography className="text-base text-gray-800">
                  <span className="xs:block hidden">Share</span>
                </Typography>
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

          {/* EDIT POST POPUP */}
          <Dialog
            open={editBox}
            handler={handleEditBox}
            size="sm"
            className="z-40"
          >
            <DialogHeader className="p-4 m-0">
              <Typography className="text-xl font-semibold text-gray-900">
                Edit Post
              </Typography>
            </DialogHeader>
            <DialogBody>
              <Typography className="text-base font-normal text-gray-700">
                <Textarea
                  label="Description"
                  value={postdescp}
                  onChange={(e) => setPostDescp(e.target.value)}
                />
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

          {/* DELETE CONFIRMATION POPUP */}
          <Dialog
            size="xs"
            open={deletePost}
            handler={handleDeletePostBox}
            className=""
          >
            <DialogBody className="flex flex-col">
              <Typography className="text-gray-800 text-lg mb-8">
                Are you sure you want to delete this post?
              </Typography>
              <div className="flex justify-between">
                <Button
                  color="blue"
                  variant="outlined"
                  size="sm"
                  onClick={handleDeletePostBox}
                >
                  Cancel
                </Button>
                <Button
                  color="blue"
                  size="sm"
                  onClick={() => handleDeletePost()}
                >
                  Delete
                </Button>
              </div>
            </DialogBody>
          </Dialog>

          {/* ARCHIVE CONFIRMATION POPUP */}
          <Dialog
            size="xs"
            open={archivePost}
            handler={handleArchivePostBox}
            className=""
          >
            <DialogBody className="flex flex-col">
              <Typography className="text-gray-800 text-lg mb-8">
                Are you sure you want to archive this post?
              </Typography>
              <div className="flex justify-between">
                <Button
                  color="blue"
                  variant="outlined"
                  size="sm"
                  onClick={handleArchivePostBox}
                >
                  Cancel
                </Button>
                <Button
                  color="blue"
                  size="sm"
                  onClick={() => handleArchivePost()}
                >
                  Archive
                </Button>
              </div>
            </DialogBody>
          </Dialog>

          {/* SHARE POST POPUP */}
          <Dialog open={shareBox} handler={handleShareBox} size="xs">
            <DialogHeader>
              <Typography className="text-xl font-semibold text-gray-900">
                Share Post
              </Typography>
            </DialogHeader>
            <DialogBody className="px-6 py-2 flex justify-between w-full">
              <a
                href={`https://www.facebook.com/sharer.php?u=${postUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="">
                  <FaFacebook className="w-8 h-8 text-[#316FF6]" />
                </button>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${props.description}`}
                target="_blank"
                rel="noreferrer"
                className=""
              >
                <button className="">
                  <FaSquareXTwitter className="w-8 h-8 text-black" />
                </button>
              </a>
              <a
                href={`http://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${props.description}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="">
                  <FaLinkedin className="w-8 h-8 text-[#0077B5]" />
                </button>
              </a>
              <a
                href={`https://wa.me/?text=${postUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="">
                  <FaSquareWhatsapp className="w-8 h-8 text-[#25D366]" />
                </button>
              </a>
              <button className="" onClick={() => copyUrl()}>
                <FaCopy className="w-8 h-7 text-gray-700" />
              </button>
            </DialogBody>
            <Typography
              className={`text-base font-normal text-gray-800 text-center pb-2 ${
                showText ? "opacity-100" : "opacity-0"
              }`}
              style={{ transition: "opacity 0.5s ease-in-out" }}
            >
              Link Copied
            </Typography>
          </Dialog>

          {/* IMAGE PREVIEW */}
          <Dialog open={imagePreview} handler={handleImagePreview} className="bg-transparent border-none shadow-none" >
            {post?.fileURL && (
              <img
                src={post?.fileURL}
                alt="post"
                className="rounded-md my-auto object-contain mx-auto"
              />
            )}
          </Dialog>
          <Toaster position="top-right" className="z-50" />

          {/* SIGN UP POP UP */}
          <SignupDialog
            open={signUpDialog} 
            handler={handleSignUpDialog}
            />
        </Card>
      )}
    </>
  );
};

export default SinglePostCard;
