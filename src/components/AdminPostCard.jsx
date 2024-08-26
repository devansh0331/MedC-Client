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

const AdminPostCard = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();

  return (
    <>
      <Card className="h-fit p-4">
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
                {props.name ? props.name : "Unknown User"}
              </Typography>
              {props.bio && (
                <Typography className="text-xs md:text-[14px] text-gray-800">
                  {props.bio}
                </Typography>
              )}
            </div>
          </div>
          <div className="ml-auto flex flex-col-reverse md:flex-row items-end md:items-start md:gap-2">
            <Typography className="text-xs md:text-base">
              {props.postedAt ? props.postedAt : "Unknown Date"}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="m-0 p-0 z-0">
          <Typography
            className="py-4 px-2 text-gray-800 cursor-pointer"
            onClick={() => navigate(`/post/${props.postId}`)}
          >
            {props.description}
          </Typography>
          <img
            src={props.img ? props.img : jobBuilding}
            alt="post"
            className="w-full rounded-md my-2 object-contain mx-auto"
          />
        </CardBody>
        <CardFooter className="m-0 mt-2 p-0 flex justify-end">
          <div>
            <Button size="sm" color="red" onClick={handleOpen}>
              Remove Post
            </Button>
          </div>
        </CardFooter>
        {/* 2 days ago */}
      </Card>

      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader className="m-0 py-2 px-4">Remove Post</DialogHeader>
        <DialogBody className="text-base py-2 px-4">
          Are you sure you want to remove this post?
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <Button variant="text" color="red" size="sm" onClick={handleOpen}>
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
    </>
  );
};

export default AdminPostCard;
