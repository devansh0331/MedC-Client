import React, { useContext, useState } from "react";
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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import SignUpDialog from "../components/SignUpDialog";
import { UserContext } from "../UserContext";


const Settings = () => {
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const {user} = useContext(UserContext);
  
  const handleDeleteConfirmation = () => setOpenDeleteConfirmation(!openDeleteConfirmation);
  const handleOpenSignUp = () => setOpenSignUp(!openSignUp);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[90vh] flex bg-background">
      <SideBar />
      <div className="flex w-full gap-8 justify-center mt-5">
        <Card className="px-6 py-4 w-[90%] lg:w-3/5 flex gap-4 md:h-[80vh]"> 
            <Typography className="text-3xl font-semibold text-gray-900">
              Settings
            </Typography>
            <div className="flex h-full">
            <div className="flex flex-col h-full justify-between w-full md:w-4/5 md:pr-6">
            <div className="flex flex-col h-full justify-between w-full lg:w-2/3">
              <div className="">
                <div className="flex justify-between text-gray-800 py-2 border-b-2 cursor-pointer"  onClick={() => navigate(`/user/${user._id}`)}>
                  <Typography className="text-md">Profile</Typography>
                </div>
                <div className="flex justify-between text-gray-800 py-2 border-b-2 cursor-pointer"  onClick={() => navigate("/connections")}>
                  <Typography className="text-md">Connections</Typography>
                </div>
                <div className="flex justify-between text-gray-800 py-2 border-b-2 cursor-pointer" onClick={() => navigate(`/user/${user._id}`)}>
                  <Typography className="text-md">Posts</Typography>
                </div>
                <div className="flex justify-between text-gray-800 py-2 border-b-2 cursor-pointer md:hidden" onClick={() => navigate(`/about`)}>
                  <Typography className="text-md">About Us</Typography>
                </div>
                <div className="flex justify-between text-gray-800 py-2 border-b-2 cursor-pointer md:hidden" onClick={() => navigate(`/faq`)}>
                  <Typography className="text-md">FAQ</Typography>
                </div>
                <div className="flex justify-between text-gray-800 py-2 border-b-2 cursor-pointer md:hidden" onClick={() => navigate(`/user/${user._id}`)}>
                  <Typography className="text-md">Privacy Policy</Typography>
                </div>
                <div className="flex justify-between text-gray-800 py-2 border-b-2 cursor-pointer md:hidden" onClick={() => navigate(`/user/${user._id}`)}>
                  <Typography className="text-md">Contact Us</Typography>
                </div>
                {/* <div className="flex justify-between text-gray-800 py-2 border-b-2">
                  <Typography className="text-md">Jobs Applied</Typography>
                  <Typography className="text-md">400</Typography>
                </div>
                <div className="flex justify-between text-gray-800 py-2 border-b-2">
                  <Typography className="text-md">Jobs Posted</Typography>
                  <Typography className="text-md">400</Typography>
                </div> */}
                <div className="flex justify-between text-gray-800 py-2 cursor-pointer" onClick={() => navigate("/archivedPosts")}>
                  <Typography className="text-md">Archived Posts</Typography>
                  <Typography className="text-md"></Typography>
                </div>
              </div>
              <div className="flex flex-col mt-10">
                <Button
                  variant="outlined"
                  color="blue"
                  className="my-2"
                  onClick={() => navigate('/new-password')}
                >
                  Reset Password
                </Button>
                <Button
                  variant="outlined"
                  color="red"
                  className="my-2"
                  onClick={handleDeleteConfirmation}
                >
                  Deactivate Account
                </Button>
              </div>
            </div>
            </div> 
            <div className="md:flex flex-col h-full w-2/5 lg:w-1/5 md:pl-6 md:border-l-2 hidden">
            <Typography className="text-md text-gray-600 my-1 underline cursor-pointer" onClick={() => navigate(`/about`)}>About Us</Typography>
            <Typography className="text-md text-gray-600 my-1 underline cursor-pointer" onClick={() => navigate(`/faq`)}>FAQ</Typography>
            <Typography className="text-md text-gray-600 my-1 underline cursor-pointer">Privacy Policy</Typography>
            <Typography className="text-md text-gray-600 my-1 underline cursor-pointer" onClick={() => navigate(`/contactus`)}>Contact Us</Typography>
            </div> 
            </div>
      {/* <Button onClick={handleOpenSignUp}>open</Button> */}
        </Card>
      </div>
      <SignUpDialog open={openSignUp} handler={handleOpenSignUp}/>

      <Dialog open={openDeleteConfirmation} handler={handleDeleteConfirmation} size="sm">
          <DialogHeader className="m-0">Delete your account?</DialogHeader>
          <DialogBody 
          className="text-lg text-black p-0 px-4">
            <p className="text-red-700 text-sm">*This action cannot be undone. All the information related to your account will be deleted permanently.</p>
          </DialogBody>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outlined"
              color="blue"
              size="sm"
              onClick={handleDeleteConfirmation}
              className=""
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant=""
              size="sm"
              color="red"
              onClick={handleDeleteConfirmation}
            >
              <span>Delete</span>
            </Button>
          </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Settings;
