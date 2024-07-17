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
  );
}

export default SideBar;
