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
} from "@material-tailwind/react";
import SinglePostCard from "../components/SinglePostCard";
import altprofile from "../assets/altprofile.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const AdminPostCard = () => {
  return (
    <Card className="p-4">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 p-0 flex items-center justify-between"
      >
        <div className="flex items-center">
          <div className="">
            <Avatar
              src={altprofile}
              alt="profile"
              size="lg"
              className="cursor-pointer"
              onClick={() => navigate(`/user/:id`)}
            />
          </div>
          <div
            className="ml-4 cursor-pointer"
            onClick={() => navigate(`/user/:id`)}
          >
            <Typography className="text-sm md:text-base font-bold text-gray-900">
              John Doe
            </Typography>
            <Typography className="text-xs md:text-[14px]  font-bold font-serif text-gray-700">
              Developer
            </Typography>
          </div>
        </div>
        <div className="ml-auto flex flex-col-reverse md:flex-row items-end md:items-start md:gap-2">
          <Typography className="text-xs md:text-base">2 days ago</Typography>
        </div>
      </CardHeader>
      <CardBody className="m-0 p-0 z-0">
        <Typography
          className="py-4 px-2 text-gray-800 cursor-pointer"
          onClick={() => navigate(`/post/:id`)}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem sit,
          earum nostrum vero est pariatur alias aut maiores eveniet unde esse
          distinctio a vitae incidunt?
        </Typography>
        <img
          src={jobBuilding}
          alt="post"
          className="w-full rounded-md my-2 object-contain mx-auto"
        />
      </CardBody>
      <CardFooter className="m-0 mt-2 p-0 flex justify-end">
        <div>
            <Button size="sm" color="red">Remove Post</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminPostCard;
