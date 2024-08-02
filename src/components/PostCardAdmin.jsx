import React, { useEffect } from "react";
import { useState } from "react";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { SERVER_URL } from "../ServerURL";
import altprofile from "../assets/altprofile.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import Cookies from "js-cookie";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";

const PostCardAdmin = (props) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);


  return (
    <>
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
      </CardBody>
      <CardFooter className="m-0 px-2 py-0 w-full"> 
        <div className="flex justify-end items-center relative">
          <Button size="sm" color="red" className="" variant="outlined" onClick={handleOpen}>Remove Post</Button>
        </div>
      </CardFooter>
    </Card>

    {/* REASON DIALOG */}
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader className="text-gray-800 m-0 pb-2">Remove Post</DialogHeader>
       <DialogBody className="m-0 pt-2">
        <Typography className="text-gray-800 text-lg">
        Choose the reason why you want to remove this post.
        </Typography>
        <div className="w-full p-3 text-[16px] text-gray-700">
            <div className="flex items-center">
                <input id="default-radio-1" type="radio" name="reason"/>
                <label className="ml-3" htmlFor="default-radio-1">Inappropriate content</label>
            </div>
            <div className="flex items-center">
                <input id="default-radio-2" type="radio" name="reason"/>
                <label className="ml-3" htmlFor="default-radio-2">Inappropriate content</label>
            </div>
            <div className="flex items-center">
                <input id="default-radio-3" type="radio" name="reason"/>
                <label className="ml-3" htmlFor="default-radio-3">Inappropriate content</label>
            </div>
        </div>
       </DialogBody>
       <DialogFooter className="flex gap-4">
        <Button variant="outlined" color="blue" onClick={handleOpen}  size='sm' className="">
          Cancel
        </Button>
        <Button variant="" color="blue" onClick={handleOpen} size='sm' >
          Remove Post
        </Button>
       </DialogFooter>
    </Dialog>
    </>
  );
};

export default PostCardAdmin;
