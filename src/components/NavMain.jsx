import { Badge, Button, Card, List, ListItem, Navbar, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import logofoot from "../assets/logofoot.png";
import { FaRegBell } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { RiMenuFold2Line } from "react-icons/ri";
import { handleOpen } from "../Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import altprofile from "../assets/altprofile.png";

const NavMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = useSelector((state) => state.feed.open);
  const { user, userInfo } = useContext(UserContext);
  const [openNotification, setOpenNotification] = useState(false);
  const notificationRef = useRef(null);

  const handleClickEvent = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setOpenNotification(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("click", handleClickEvent);
    return () => {
      document.removeEventListener("click", handleClickEvent);
    };
  }, []);

  const handleExpand = () => {
    console.log(open);
    dispatch(handleOpen(!open));
  };
  return (
    <Navbar className="sticky top-0 z-20 max-w-full rounded-none px-2 py-2 lg:px-8 lg:py-2 border-0 text-gray-800 h-[10vh] flex items-center">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <img
          src={logofoot}
          alt="logo"
          className="h-12 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center gap-4">
          {!userInfo.state && (
            <Button
              className="rounded-full"
              size="sm"
              color="light-blue"
              onClick={() => navigate(`/signup`)}
            >
              Sign Up
            </Button>
          )}
          {userInfo.state && 
          <>
          {/* <div 
          ref={notificationRef} 
          className="flex items-center relative">
          <Badge
          overlap="circular"
          invisible={false}
          color="light-blue"
          className="cursor-pointer"
          >
            <FaRegBell className="w-6 h-6 cursor-pointer" onClick={() => setOpenNotification(!openNotification)} />
          </Badge>
          {openNotification && 
          <Card 
          className="absolute top-6 -right-1 w-80 max-h-80 overflow-y-scroll scrollbar-thin bg-gray-50">
            <List className="">
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
              <ListItem className="">Lorem ipsum dolor sit amet.</ListItem>
            </List>
          </Card>
          }
          </div> */}
          </>
          }
          {userInfo.state && (
            <img
              src={`${user?.profileURL}` ? user?.profileURL : altprofile}
              className="w-8 h-8 rounded-full cursor-pointer profile-pic"
              onClick={() => navigate(`/user/${user?._id}`)}
            />
          )}
          {userInfo.state && (
            <RiMenuFold2Line
              className="w-6 h-6 mx-2 block lg:hidden cursor-pointer"
              onClick={handleExpand}
            />
          )}
          {/* <FaRegMessage className="w-6 h-6 mx-2" /> */}
        </div>
      </div>
    </Navbar>
  );
};

export default NavMain;
