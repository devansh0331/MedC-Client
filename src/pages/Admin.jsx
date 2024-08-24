import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Card, List, ListItem, Typography, CardHeader, Avatar, Menu, MenuHandler, CardBody, MenuList, MenuItem } from "@material-tailwind/react";
import SinglePostCard from "../components/SinglePostCard";
import altprofile from "../assets/altprofile.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import AdminPostCard from "../components/AdminPostCard";

const Admin = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="w-full h-[90vh] flex flex-row bg-background overflow-y-hidden">
      <SideBar />
      <div className="mt-5 w-[80%] mx-auto flex flex-row gap-4">
        <Card className="w-min h-min">
          <List className="p-2 ">
            <div
              onClick={() => setActive(0)}
              className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-200 ${
                active === 0
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Live Posts
            </div>
            <div
              onClick={() => setActive(1)}
              className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-200 ${
                active === 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Archived Posts
            </div>
            <div
              onClick={() => setActive(2)}
              className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-200 ${
                active === 2
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Profiles
            </div>
            <div
              onClick={() => setActive(3)}
              className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-200 ${
                active === 3
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Blogs
            </div>
          </List>
        </Card>
        <Card className="w-full h-full overflow-y-scroll scrollbar-thin relative">
          {active === 0 && (
            <div className="p-4">
              <Typography className="text-xl text-gray-700 fixed">
                Live Posts
              </Typography>
              <div className="w-1/2 mx-auto mt-8">
              <AdminPostCard />
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Admin;
