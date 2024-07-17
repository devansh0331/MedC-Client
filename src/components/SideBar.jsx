import React, { useState } from "react";
import { Drawer,
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

function SideBar() {
  const [openSideBar, setOpenSideBar] = useState(true);
  const openDrawer = () => setOpenSideBar(true);
  const closeDrawer = () => setOpenSideBar(false);
  return (
   <>
    <div
      onClick={() => handleopen()}
      className={`z-20 absolute ${
        open ? "backdrop-blur-sm w-screen h-screen" : "h-screen"
      }`}
    >
      <button
        className={`h-full z-10 flex flex-col px-4 shadow-lg bg-white ${
          open ? `w-auto transition-all duration-1000` : `w-16 hidden sm:flex`
        }`}
      >
        <div className="flex flex-col justify-evenly h-full items-start mt-20">
          {profile && (
            <button
              className="w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white"
              onClick={() => {
                navigate("/feed");
              }}
            >
              <MdHome className="cursor-pointer w-7 h-7" />
              <span className={`${open ? `block` : `hidden`} mx-3`}>Home</span>
            </button>
          )}
          {!profile && (
            <button
              className={`w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 ${
                open ? "" : "hover:bg-gray-900 hover:text-white"
              }`}
            >
              {!open && <BsPersonCircle className="cursor-pointer w-6 h-6" />}
              <span
                onClick={() => navigate(`/user/${props.userId}`)}
                className={`${open ? `block` : `hidden`}`}
              >
                <ProfileCard
                  profileURL={user.profileURL}
                  // contact={user.contact ? user.contact : ""}
                  // location={user.location ? user.location : ""}
                  name={user.name ? user.name : ""}
                  email={user.email ? user.email : ""}
                  bio={user.bio ? user.bio : ""}
                  // linkedin={
                  //   user.linkedin ? "/" + user.linkedin.split("/")[4] : ""
                  // }
                  // twitter={user.twitter ? "/" + user.twitter.split("/")[3] : ""}
                  // website={user.website ? user.website : ""}
                  route={false}
                />
              </span>
            </button>
          )}
          <button
            className="w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white"
            onClick={() => {
              navigate("/hire");
            }}
          >
            <FaBriefcase className="cursor-pointer w-6 h-6" />
            <span className={`${open ? `block` : `hidden`} mx-3`}>Hire</span>
          </button>
          <button
            className="w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white"
            onClick={() => {
              handleopen();
              navigate("/connections");
            }}
          >
            <FaUserFriends className="cursor-pointer w-6 h-6" />
            <span className={`${open ? `block` : `hidden`} mx-3`}>
              Connections
            </span>
          </button>
          <button className="w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white">
            <IoSettingsSharp className="cursor-pointer w-6 h-6" />
            <span className={`${open ? `block` : `hidden`} mx-3`}>
              Settings
            </span>
          </button>
          <button
            className="w-full flex items-center justify-start py-1 px-2 rounded-md text-gray-900 "
            onClick={props.handleLogout}
          >
            <IoPowerSharp className="cursor-pointer w-6 h-6 text-red-700" />
            <span
              className={`${
                open ? `block` : `hidden`
              } mx-3 text-red-700 font-semibold`}
            >
              Logout
            </span>
          </button>
        </div>
      </button>
    </div>
    <>
    <button onClick={openDrawer} className="mt-20 h-20 bg-black p-3 text-white cursor-pointer z-10">Open</button>
    <Drawer open={openSideBar} onClose={closeDrawer} >
      <Card className="" 
        shadow={false}
        floated={false}>
        <CardHeader 
        shadow={false}
        floated={false}
        className="flex flex-col">
          <div className="border-b-2">
          <img src={logofoot} alt="logofoot" className="h-16 w-28 mb-4"/>
          </div>
          <div className="flex items-center mt-4 border-b-2 pb-4">
          <Avatar src={altprofile} size="md"/>
          <div className=" flex flex-col ml-3">
          <Typography className="text-black font-semibold">John Doe</Typography>
          <Typography className="text-sm">Developer</Typography>
          </div>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <List className=" mt-2">
            <ListItem className="">
              <ListItemPrefix>
              <IoImages className="w-6 h-6" />
              </ListItemPrefix>
              <Typography className="ml-2">Posts</Typography>
            </ListItem>
            <ListItem className="">
              <ListItemPrefix>
              <BsPersonWorkspace className="w-6 h-6" />
              </ListItemPrefix>
              <Typography className="ml-2">Jobs</Typography>
            </ListItem>
            <ListItem className="">
              <ListItemPrefix>
              <FaBriefcase className="w-6 h-6" />
              </ListItemPrefix>
              <Typography className="ml-2">Hire</Typography>
            </ListItem>
            <ListItem className="">
              <ListItemPrefix>
              <FaUserFriends className="w-6 h-6" />
              </ListItemPrefix>
              <Typography className="ml-2">Connections</Typography>
            </ListItem>
            <ListItem className="">
              <ListItemPrefix>
              <FaSquarePlus className="w-6 h-6" />
              </ListItemPrefix>
              <Typography className="ml-2">Post a Job</Typography>
            </ListItem>
          </List>
        </CardBody>
      </Card>
    </Drawer>
    </>
    </>
  );
}

export default SideBar;
