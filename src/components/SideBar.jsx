import React, { useContext, useState } from "react";
import {
  Drawer,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";
import altprofile from "../assets/altprofile.png";
import logofoot from "../assets/logofoot.png";
import { IoImages } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaBriefcase } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { IoPowerSharp } from "react-icons/io5";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleOpen } from "../Slices/feedSlice";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../UserContext";
import { MdAdminPanelSettings } from "react-icons/md";

function SideBar() {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.feed);
  const openDrawer = () => {
    dispatch(handleOpen(true));
  };
  const closeDrawer = () => dispatch(handleOpen(false));
  const selected = "bg-blue-500 text-white";
  const navigate = useNavigate();
  const { setUserInfo, userInfo, user, adminStatus } = useContext(UserContext);
  const active = "bg-blue-500 text-white";
  const currentPage = useLocation().pathname;
  console.log(adminStatus);
  
  // console.log(currentPage);

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      Cookies.remove("token");
      Cookies.remove("name");
      Cookies.remove("email");
      setUserInfo({ state: false });
      toast.success("Logged Out");

      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <div className="fixed top-[10vh] w-16 cursor-pointer z-40 hidden lg:block">
        <Card
          className="flex flex-col items-start h-full w-full rounded-none "
          shadow={false}
        >
          <CardBody className="p-0 w-full mx-auto">
            <div className="my-1 p-2 mx-2 flex flex-col justify-between items-center h-full">
              <div
                className={`hidden lg:flex items-center justify-center px-4 py-3 rounded-md my-1 cursor-pointer border-b-2`}
              >
                <ListItemPrefix className="mx-auto">
                  <FaArrowRightFromBracket
                    className="w-6 h-6 cursor-pointer text-black"
                    role="button"
                    onClick={() => openDrawer()}
                  />
                </ListItemPrefix>
              </div>
              <div
                className={`hidden lg:flex items-center justify-center px-2 py-3 rounded-md my-1 cursor-pointer  ${currentPage.includes(`/user/${user._id}`) ? active : ""}`}
                onClick={() => navigate(`/user/${user._id}`)}
              >
                <ListItemPrefix className="mx-auto">
                  <CgProfile className="w-6 h-6" />
                </ListItemPrefix>
              </div>
              <div
                className={`hidden lg:flex items-center justify-center px-2 py-3 rounded-md my-1 cursor-pointer ${currentPage.includes("/feed") ? active : ""}`}
                onClick={() => navigate("/feed")}
              >
                <ListItemPrefix className="mx-auto">
                  <IoImages className="w-6 h-6" />
                </ListItemPrefix>
              </div>
              <div
                className={`hidden lg:flex items-center justify-center px-2 py-3 rounded-md my-1 cursor-pointer ${currentPage.includes("/jobs") ? active : ""}`}
                onClick={() => navigate("/jobs")}
              >
                <ListItemPrefix className="mx-auto">
                  <BsPersonWorkspace className="w-6 h-6" />
                </ListItemPrefix>
              </div>
              <div
                className={`hidden lg:flex items-center justify-center px-2 py-3 rounded-md my-1 cursor-pointer ${currentPage.includes("/hire") ? active : ""}`}
                onClick={() => navigate("/hire")}
              >
                <ListItemPrefix className="mx-auto">
                  <FaBriefcase className="w-6 h-6" />
                </ListItemPrefix>
              </div>
              <div
                className={`hidden lg:flex items-center justify-center px-2 py-3 rounded-md my-1 cursor-pointer ${currentPage.includes("/connections") ? active : ""}`}
                onClick={() => navigate("/connections")}
              >
                <ListItemPrefix className="mx-auto">
                  <FaUserFriends className="w-6 h-6" />
                </ListItemPrefix>
              </div>
              <div
                className={`hidden lg:flex items-center justify-center px-2 py-3 rounded-md my-1 cursor-pointer ${currentPage.includes("/postjob") ? active : ""}`}
                onClick={() => navigate("/postjob")}
              >
                <ListItemPrefix className="mx-auto">
                  <FaSquarePlus className="w-6 h-6" />
                </ListItemPrefix>
              </div>
              <div
                className={`hidden lg:flex items-center justify-center px-4 py-3 rounded-md my-1 cursor-pointer ${currentPage.includes("/settings") ? active : ""}`}
                onClick={() => navigate("/settings")}
              >
                <ListItemPrefix className="mx-auto">
                  <FaGear className="w-6 h-6" />
                </ListItemPrefix>
              </div>
              {adminStatus && (
              <div
                className={`hidden lg:flex items-center justify-center px-4 py-3 rounded-md my-1 cursor-pointer ${currentPage.includes("/admin") ? active : ""}`}
                onClick={() => navigate("/admin")}
              >
                <ListItemPrefix className="mx-auto">
                  <MdAdminPanelSettings className="w-6 h-6" />
                </ListItemPrefix>
              </div>
              )}

              <div
                className={`hidden lg:flex items-center justify-center px-4 py-3 rounded-md my-1 cursor-pointer text-red-800`}
                onClick={(e) => handleLogout(e)}
              >
                <ListItemPrefix className="mx-auto">
                  <IoPowerSharp className="w-6 h-6" />
                </ListItemPrefix>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Drawer open={open} onClose={closeDrawer}>
        <Card
          className="flex flex-col justify-between items-start h-full w-full"
          shadow={false}
        >
          <CardHeader
            shadow={false}
            floated={false}
            className="flex flex-col w-full m-0"
          >
            <div
              className={`flex items-center border-b-2 mt-4 p-4 cursor-pointer hover:bg-opacity-90 rounded-xl ${currentPage.includes(`/user/${user._id}`) ? active : ""}`}
              onClick={() => {navigate(`/user/${user._id}`);  closeDrawer();}}
            >
              <Avatar
                src={user.profileURL ? user.profileURL : altprofile}
                size="md"
              />
              <div className=" flex flex-col ml-3">
                <Typography className={`font-semibold ${currentPage.includes(`/user/${user._id}`) ? "text-white" : "text-black"}`}>
                  {userInfo.name}
                </Typography>
                {user.bio && (
                <Typography className="text-sm">{user.bio}</Typography>
                )}
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-0 w-full">
            <div className="mt-2 p-2  border-b-2 mx-2">
              <div
                className={`flex items-center px-2 py-3 rounded-md my-1 hover:bg-opacity-90 cursor-pointer ${currentPage.includes("/feed") ? active : ""}`}
                onClick={() => {
                  navigate("/feed");
                  closeDrawer();
                }}
              >
                <ListItemPrefix>
                  <IoImages className="w-6 h-6" />
                </ListItemPrefix>
                <Typography className="ml-2">Posts</Typography>
              </div>
              <div
                className={`flex items-center px-2 py-3 rounded-md my-1 hover:bg-opacity-90 cursor-pointer ${currentPage.includes("/jobs") ? active : ""}`}
                onClick={() => {
                  navigate("/jobs");
                  closeDrawer();
                }}
              >
                <ListItemPrefix>
                  <BsPersonWorkspace className="w-6 h-6" />
                </ListItemPrefix>
                <Typography className="ml-2">Jobs</Typography>
              </div>
              <div
                className={`flex items-center px-2 py-3 rounded-md my-1 hover:bg-opacity-90 cursor-pointer ${currentPage.includes("/hire") ? active : ""}`}
                onClick={() => {
                  navigate("/hire");
                  closeDrawer();
                }}
              >
                <ListItemPrefix>
                  <FaBriefcase className="w-6 h-6" />
                </ListItemPrefix>
                <Typography className="ml-2">Hire</Typography>
              </div>
              <div
                className={`flex items-center px-2 py-3 rounded-md my-1 hover:bg-opacity-90 cursor-pointer ${currentPage.includes("/connections") ? active : ""}`}
                onClick={() => {
                  navigate("/connections");
                  closeDrawer();
                }}
              >
                <ListItemPrefix>
                  <FaUserFriends className="w-6 h-6" />
                </ListItemPrefix>
                <Typography className="ml-2">Connections</Typography>
              </div>
              <div
                className={`flex items-center px-2 py-3 rounded-md my-1 hover:bg-opacity-90 cursor-pointer ${currentPage.includes("/postjob") ? active : ""}`}
                onClick={() => {
                  navigate("/postjob");
                  closeDrawer();
                }}
              >
                <ListItemPrefix>
                  <FaSquarePlus className="w-6 h-6" />
                </ListItemPrefix>
                <Typography className="ml-2">Post a Job</Typography>
              </div>
            </div>
            
            <div className="mt-2 p-2">
              <div
                className={`flex items-center px-4 py-3 rounded-md my-1 hover:bg-opacity-90 cursor-pointer ${currentPage.includes("/settings") ? active : ""}`}
                onClick={() => {
                  navigate("/settings");
                  closeDrawer();
                }}
              >
                <ListItemPrefix>
                  <FaGear className="w-6 h-6" />
                </ListItemPrefix>
                <Typography className="ml-2">Settings</Typography>
              </div>
              {adminStatus && (
              <div
                className={`flex items-center px-4 py-3 rounded-md my-1 hover:bg-opacity-90 cursor-pointer ${currentPage.includes("/admin") ? active : ""}`}
                onClick={() => {
                  navigate("/admin");
                  closeDrawer();
                }}
              >
                <ListItemPrefix>
                <MdAdminPanelSettings className="w-6 h-6" />
                </ListItemPrefix>
                <Typography className="ml-2">Admin</Typography>
              </div>
               )}
             <div
                className={`flex items-center px-4 py-3 rounded-md my-1 hover:bg-opacity-90 cursor-pointer text-red-800`}
                onClick={(e) => handleLogout(e)}
              >
                <ListItemPrefix>
                  <IoPowerSharp className="w-6 h-6" />
                </ListItemPrefix>
                <Typography className="ml-2">Log Out</Typography>
              </div>
            </div>
          
          </CardBody>
          <CardFooter className="mt-auto w-full mx-0 py-0 px-2">
            <div className="flex px-2 py-3 border-t-2">
              <img src={logofoot} alt="logofoot" className="h-14 w-24" />
            </div>
          </CardFooter>
          <Toaster position="top-right" />
        </Card>
      </Drawer>
    </>
  );
}

export default SideBar;
