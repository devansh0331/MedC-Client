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
  Button,
} from "@material-tailwind/react";
import SinglePostCard from "../components/SinglePostCard";
import altprofile from "../assets/altprofile.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import AdminPostCard from "../components/AdminPostCard";
import UserCardAdmin from "../components/UserCardAdmin";
import BlogBG from "../assets/BlogBG.png";
import BlogBG2 from "../assets/BlogBG2.png";
import BlogBG3 from "../assets/BlogBG3.png";
import { useNavigate } from "react-router-dom";

const Admin = (props) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const Blogs = [
    { img: BlogBG, color: "rgba(76, 175, 80, 0.8)", text: "black" },
    { img: BlogBG3, color: "rgba(255, 91, 0, 0.9)", text: "white" },
    { img: BlogBG2, color: "rgba(53, 74, 33, 0.8)", text: "white" },
    { img: BlogBG3, color: "rgba(255, 91, 0, 0.9)", text: "white" },
  ];
  return (
    <div className="w-full h-[90vh] flex flex-row bg-background overflow-y-hidden">
      <SideBar />
      <div className="mt-5 w-[80%] mx-auto flex flex-row gap-4">
        <Card className="w-min h-min">
          <List className="p-2 ">
            <div
              onClick={() => setActive(0)}
              className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                active === 0
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Live Posts
            </div>
            <div
              onClick={() => setActive(1)}
              className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                active === 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Archived Posts
            </div>
            <div
              onClick={() => setActive(2)}
              className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                active === 2
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Profiles
            </div>
            <div
              onClick={() => setActive(3)}
              className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                active === 3
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Blogs
            </div>
            <div
              onClick={() => setActive(4)}
              className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                active === 4
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              Reports
            </div>
          </List>
        </Card>
        <Card className="w-full h-full">
          {active === 0 && (
            <div className="p-4">
              <div className="z-10 bg-white w-full">
              <Typography className="text-xl text-gray-700 ">
                Live Posts
              </Typography>
              </div>
              <div className="w-full h-[75vh] overflow-y-scroll scrollbar-thin">
              <div className="w-1/2 mx-auto">
                <AdminPostCard />
                <AdminPostCard />
                <AdminPostCard />
                <AdminPostCard />
              </div>
              </div>
            </div>
          )}
          {active === 1 && (
            <div className="p-4">
              <div className="z-10 bg-white w-full">
              <Typography className="text-xl text-gray-700 ">
                Archived Posts
              </Typography>
              </div>
              <div className="w-full h-[75vh] overflow-y-scroll scrollbar-thin">

              <div className="w-1/2 mx-auto">
                <AdminPostCard />
                <AdminPostCard />
                <AdminPostCard />
                <AdminPostCard />
              </div>
              </div>
            </div>
          )}
          {active === 2 && (
            <div className="p-4">
              <div className="z-10 bg-white w-full">
              <Typography className="text-xl text-gray-700 ">
                Users
              </Typography>
              </div>
              <div className="w-full h-[70vh] overflow-y-scroll scrollbar-thin">
              <div className=" grid grid-cols-3 w-3/4 mx-auto">
                <UserCardAdmin />
                <UserCardAdmin />
                <UserCardAdmin />
                <UserCardAdmin />
                <UserCardAdmin />
                <UserCardAdmin />
                <UserCardAdmin />
                <UserCardAdmin />
                <UserCardAdmin />
                <UserCardAdmin />
                <UserCardAdmin />
                <UserCardAdmin />
              </div>
              </div>
            </div>
          )}
          {active === 3 && (
            <div className="p-4">
              <div className="flex justify-between z-10 bg-white w-full">
              <Typography className="text-xl text-gray-700 ">
                Blogs
              </Typography>
              <button
                className="mb-2 border-[1px] rounded-md border-blue-500 font-[600] text-blue-500 text-[12px] py-1 px-2 tracking-wider"
                onClick={() => navigate("/create-blog")}
              >
                CREATE BLOG
              </button>
              </div>
              <div className="w-full h-[70vh] overflow-y-scroll scrollbar-thin">
              <div className=" grid grid-cols-3 gap-4 mx-auto mt-2">
                {Blogs.map((blog, index) => (
                  <Card
                    key={index}
                    className="w-56 h-[500px] flex flex-col justify-start relative mx-auto cursor-pointer"
                    onMouseEnter={() => setHoveredCardIndex(index)}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                    onClick={() => navigate("/blog/:id")}
                  >
                    <img
                      src={blog.img}
                      className="rounded-lg h-full w-full object-cover"
                    />
                    <div
                      className={`p-2  bg-opacity-85 absolute rounded-lg bottom-0`}
                      style={{
                        transition: "all 0.5s ease-in-out",
                        backgroundColor: `${blog.color}`,
                      }}
                    >
                      <Typography
                        className={`text-xl font-semibold text-${blog.text}`}
                      >
                        Lorem ipsum dolor sit amet.{" "}
                      </Typography>
                      <Typography
                        className={`text-sm text-${blog.text}`}
                        style={{
                          transition: "height 0.5s ease-in-out",
                          height: hoveredCardIndex === index ? "120px" : "0",
                          overflow: "hidden",
                        }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deserunt distinctio dolor iusto? Laborum tempora quo
                        consequatur fugit doloribus eius reiciendis iusto ipsam
                        illum ipsum officiis, temporibus iure nobis recusandae
                        natus?
                      </Typography>
                    </div>
                  </Card>
                ))}
              </div>
              </div>
            </div>
          )}
          {active === 4 && (
            <div className="p-4">
              <div className="z-10 bg-white w-full">
              <Typography className="text-xl text-gray-700 ">
                Reports
              </Typography>
              </div>
              <div className="w-full h-[70vh] overflow-y-scroll scrollbar-thin">
              <div className="grid grid-cols-2 gap-4 mx-auto">
                <Card className="p-2">
                  <div className="flex items-center gap-2 my-1">
                    <Avatar src={altprofile} size="sm" />
                    <Typography className="text-lg text-gray-800">
                      User Name
                    </Typography>
                  </div>
                  <Typography className="text-base text-gray-700">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="blue"
                    className="mt-2 w-min"
                  >
                    Visit
                  </Button>
                </Card>
                <Card className="p-2">
                  <div className="flex items-center gap-2 my-1">
                    <Avatar src={altprofile} size="sm" />
                    <Typography className="text-lg text-gray-800">
                      User Name
                    </Typography>
                  </div>
                  <Typography className="text-base text-gray-700">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="blue"
                    className="mt-2 w-min"
                  >
                    Visit
                  </Button>
                </Card>
                <Card className="p-2">
                  <div className="flex items-center gap-2 my-1">
                    <Avatar src={altprofile} size="sm" />
                    <Typography className="text-lg text-gray-800">
                      User Name
                    </Typography>
                  </div>
                  <Typography className="text-base text-gray-700">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="blue"
                    className="mt-2 w-min"
                  >
                    Visit
                  </Button>
                </Card>
                <Card className="p-2">
                  <div className="flex items-center gap-2 my-1">
                    <Avatar src={altprofile} size="sm" />
                    <Typography className="text-lg text-gray-800">
                      User Name
                    </Typography>
                  </div>
                  <Typography className="text-base text-gray-700">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="blue"
                    className="mt-2 w-min"
                  >
                    Visit
                  </Button>
                </Card>
                <Card className="p-2">
                  <div className="flex items-center gap-2 my-1">
                    <Avatar src={altprofile} size="sm" />
                    <Typography className="text-lg text-gray-800">
                      User Name
                    </Typography>
                  </div>
                  <Typography className="text-base text-gray-700">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="blue"
                    className="mt-2 w-min"
                  >
                    Visit
                  </Button>
                </Card>
              </div>
              </div>
            </div>
          )}
        </Card>
      </div>
      
    </div>
  );
};

export default Admin;

