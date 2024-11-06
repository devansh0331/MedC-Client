import React, { useState } from "react";
import SideBar from "../components/SideBar";
import {
  Card,
  List,
  ListItem,
  Typography,
  CardHeader,
  Avatar,
  Menu,
  MenuHandler,
  CardBody,
  MenuList,
  MenuItem,
  CardFooter,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import SinglePostCard from "../components/SinglePostCard";
import altprofile from "../assets/altprofile.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../ServerURL";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import ReactTimeAgo from "react-time-ago";

const AdminPostCard = (props) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);
  const navigate = useNavigate();
  const post = props.post;

  const handleRemovePost = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/admin/post/deletebyadmin/${props.postId}`,{
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const res = await response.json();
      if (res.success) {
        setOpen(false);
        props.parentFunction();
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleRestorePost = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/post/restore-post-by-user/${props.postId}`,{
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const res = await response.json();
      if (res.success) {
        setOpen(false);
        props.parentFunction();
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/post/delete-post/${props.postId}`,{
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const res = await response.json();
      if (res.success) {
        setDeleteOpen(false);
        props.parentFunction();
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card className="h-fit p-4">
        {post.userArchived &&(
          <p className="text-green-500 mb-2">*Archived by the User</p>
        )}
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 p-0 flex items-center justify-between"
        >
          <div className="flex items-center">
            <div className="">
              <img
                src={`${post.user.profileURL ? post.user.profileURL : altprofile}`}
                alt="profile"
                className="cursor-pointer rounded-full h-14 w-14"
                onClick={() => navigate(`/user/${post.user._id}`)}
              />
            </div>
            <div
              className="ml-4 cursor-pointer"
              onClick={() => navigate(`/user/${post.user._id}`)}
            >
              <Typography className="text-sm md:text-base font-bold text-gray-900">
                {post.user.name ? post.user.name : "Unknown User"}
              </Typography>
              {post.bio && (
                <Typography className="text-xs md:text-[14px] text-gray-800 font-serif">
                  {props.bio}
                </Typography>
              )}
            </div>
          </div>
          <div className="ml-auto flex flex-col-reverse md:flex-row items-end md:items-start md:gap-2">
            <Typography className="text-xs md:text-base">
              
              {post.createdAt ? (<ReactTimeAgo date={post.createdAt} locale="en-US" />) : "Unknown Date"}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="m-0 p-0 z-0">
          <Typography
            className="py-4 px-2 text-gray-800 cursor-pointer"
            onClick={() => navigate(`/post/${props.postId}`)}
          >
            {post.description}
          </Typography>
          {post.fileURL && (
            <img
            src={post.fileURL}
            alt="post"
            className="w-full rounded-md my-2 object-contain mx-auto"
            />
          )}
        </CardBody>
        <CardFooter className="m-0 mt-2 p-0 flex justify-end">
          <div>
            {post.archived && (
              <div className="flex gap-2">
              <Button size="sm" color="red" onClick={handleDeleteOpen}>
                Delete
              </Button>
              <Button size="sm" color="green" onClick={handleRestorePost}>
                Restore
              </Button>
              </div>
            )}
            {!post.archived && (
              <Button size="sm" color="red" onClick={handleOpen}>
              Remove Post
            </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader className="m-0 py-2 px-4">Remove Post</DialogHeader>
        <DialogBody className="text-base py-2 px-4">
          Are you sure you want to remove this post?
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <Button variant="text" color="red" size="sm" onClick={handleRemovePost}>
            Remove
          </Button>
          <Button
            variant="text"
            color="blue"
            size="sm"
            className="py-1"
            onClick={handleOpen}
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={deleteOpen} handler={handleDeleteOpen} size="xs">
        <DialogHeader className="m-0 py-2 px-4">Remove Post</DialogHeader>
        <DialogBody className="text-base py-2 px-4">
          Are you sure you want to delete this post permanently?
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <Button variant="text" color="red" size="sm" onClick={handleDeletePost}>
            Delete
          </Button>
          <Button
            variant="text"
            color="blue"
            size="sm"
            className="py-1"
            onClick={handleDeleteOpen}
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
      <Toaster position="top-right" />
    </>
  );
};

export default AdminPostCard;
