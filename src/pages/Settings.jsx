import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { FaRegEdit } from "react-icons/fa";
import altprofile from "../assets/altprofile.png";
import {
  Button,
  Card,
  Typography,
  CardBody,
  CardFooter,
  Avatar,
  CardHeader,
} from "@material-tailwind/react";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import SignUpDialog from "../components/SignUpDialog";


const Settings = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpenSignUp = () => setOpenSignUp(!openSignUp);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[90vh] flex bg-background">
      <SideBar />
      <div className="flex w-full gap-8 justify-center mt-5">
        <Card className="px-6 py-4 w-3/5 flex gap-4 h-[80vh]"> 
            <Typography className="text-3xl font-semibold text-gray-900">
              Settings
            </Typography>
            <div className="flex h-full">
            <div className="flex flex-col h-full justify-between w-3/5 pr-6 border-r-2">
              <div className="">
                <div className="flex justify-between text-gray-800 py-2 border-b-2">
                  <Typography className="text-md">Connections</Typography>
                  <Typography className="text-md">400</Typography>
                </div>
                <div className="flex justify-between text-gray-800 py-2 border-b-2">
                  <Typography className="text-md">Posts</Typography>
                  <Typography className="text-md">400</Typography>
                </div>
                <div className="flex justify-between text-gray-800 py-2 border-b-2">
                  <Typography className="text-md">Jobs Applied</Typography>
                  <Typography className="text-md">400</Typography>
                </div>
                <div className="flex justify-between text-gray-800 py-2 border-b-2">
                  <Typography className="text-md">Jobs Posted</Typography>
                  <Typography className="text-md">400</Typography>
                </div>
                <div className="flex justify-between text-gray-800 py-2 cursor-pointer" onClick={() => navigate("/archivedPosts")}>
                  <Typography className="text-md">Archived Posts</Typography>
                  <Typography className="text-md"></Typography>
                </div>
              </div>
              <div className="flex flex-col mt-10">
                <Button
                  variant="outlined"
                  color="blue"
                  className=" my-3"
                >
                  Reset Password
                </Button>
                <Button
                  variant="outlined"
                  color="red"
                  className=" my-3"
                >
                  Deactivate Account
                </Button>
              </div>
            </div> 
            <div className="flex flex-col h-full w-2/5 pl-6">
            <Typography className="text-md text-gray-800 my-1 underline cursor-pointer">Privacy Policy</Typography>
            <Typography className="text-md text-gray-800 my-1 underline cursor-pointer">About Us</Typography>
            <Typography className="text-md text-gray-800 my-1 underline cursor-pointer">Terms and Conditions</Typography>
            <Typography className="text-md text-gray-800 my-1 underline cursor-pointer">Contact Us</Typography>
            </div> 
            </div>
      <Button onClick={handleOpenSignUp}>open</Button>
        </Card>
      </div>
      <SignUpDialog open={openSignUp} handler={handleOpenSignUp}/>
    </div>
  );
};

export default Settings;
