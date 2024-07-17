import { Navbar } from "@material-tailwind/react";
import React from "react";
import logofoot from "../assets/logofoot.png";
import { FaRegBell } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { RiMenuFold2Line } from "react-icons/ri";
import { handleOpen } from "../Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";

const NavMain = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.feed.open);
    const handleExpand = () => {
        console.log(open);
      dispatch(handleOpen(!open));
    };
  return (
    <Navbar className="sticky top-0 z-20 max-w-full rounded-none px-2 py-2 lg:px-8 lg:py-2 border-0 text-gray-800">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <img src={logofoot} alt="logo" className="h-12" />
        <div className="flex items-center justify-between">
          <FaRegBell className="w-6 h-6 mx-2" />
          <FaRegMessage className="w-6 h-6 mx-2" />
          <RiMenuFold2Line className="w-6 h-6 mx-2 block lg:hidden" onClick={handleExpand} />
        </div>
      </div>
    </Navbar>
  );
};

export default NavMain;
