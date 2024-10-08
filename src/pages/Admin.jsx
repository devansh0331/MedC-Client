import React, { useContext, useEffect, useState } from "react";
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
import { toast, Toaster } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import { SingleReportBox } from "../components/SingleReportBox";
import { UserContext } from "../UserContext";
import ReactTimeAgo from "react-time-ago";

const Admin = (props) => {
  const [active, setActive] = useState(0);
  const [reports, setReports] = useState();
  const [singleReport, setSingleReport] = useState();
  const [reportProfileName, setReportProfileName] = useState("");
  const [reportProfileId, setReportProfileId] = useState("");
  const navigate = useNavigate();
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const { getPosts, posts, getAllUsers, allUsers, adminStatus } = useContext(UserContext);

  const Blogs = [
    { img: BlogBG, color: "rgba(76, 175, 80, 0.8)", text: "black" },
    { img: BlogBG3, color: "rgba(255, 91, 0, 0.9)", text: "white" },
    { img: BlogBG2, color: "rgba(53, 74, 33, 0.8)", text: "white" },
    { img: BlogBG3, color: "rgba(255, 91, 0, 0.9)", text: "white" },
  ];
  const [reportBoxOpen, setReportBoxOpen] = useState(false);

  const handleReportBoxOpen = () => {
    setReportBoxOpen(!reportBoxOpen);
  };

  const getReportedProfiles = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/report/all-reports`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const parsedRes = await res.json();
      if (!parsedRes.success) {
        console.error(parsedRes.error);
      } else {
        console.log(parsedRes.data[0]);
        setReports(await parsedRes.data);
      }
    } catch (error) {
      console.error("Failed to get profiles");
    }
  };

  useEffect(() => {
    getPosts();
    if(!adminStatus){
      navigate("/");
    }
  }, []);
console.log(adminStatus);

  return (
    <>
    {!adminStatus ? (
      <div>You are not an Admin</div>
    ) : (
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
                onClick={async () => {
                  await getAllUsers();
                  setActive(2);
                }}
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
                onClick={() => {
                  getReportedProfiles();
                  setActive(4);
                }}
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
                  <div className="grid grid-cols-2 w-4/5 gap-5 justify-evenly mx-auto">
                    {posts.map((post, key) => (
                      <AdminPostCard
                        key={key}
                        img={post.fileURL == "" ? null : post.fileURL}
                        name={
                          post.user && post.user.name
                            ? post.user.name
                            : "Unknown User"
                        }
                        bio={post.user && post.user.bio ? post.user.bio : "User"}
                        profileURL={
                          post.user && post.user.profileURL
                            ? post.user.profileURL
                            : ""
                        }
                        profileId={
                          post.user && post.user._id ? post.user._id : ""
                        }
                        description={post.description}
                        postedAt={
                          <ReactTimeAgo date={post.createdAt} locale="en-US" />
                        }
                        postId={post._id}
                      />
                    ))}
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
                    {allUsers.length > 0 &&
                      allUsers.map((user, key) => (
                        <UserCardAdmin
                          name={user.name ? user.name : null}
                          bio={user.bio ? user.bio : null}
                          profileURL={user.profileURL ? user.profileURL : null}
                          profileId={user._id ? user._id : null}
                          location={user.location ? user.location : null}
                          key={key}
                        />
                      ))}
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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Deserunt distinctio dolor iusto? Laborum tempora
                            quo consequatur fugit doloribus eius reiciendis iusto
                            ipsam illum ipsum officiis, temporibus iure nobis
                            recusandae natus?
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
                    {reports &&
                      reports.map((profile, key) => (
                        <Card className="p-2">
                          <div
                            key={key}
                            className="flex items-center justify-between gap-2 my-1"
                          >
                            <div className="flex items-center">
                              <Avatar
                                src={
                                  profile.userId.profileURL
                                    ? profile.userId.profileURL
                                    : altprofile
                                }
                                onClick={() =>
                                  navigate(`/user/${profile.userId._id}`)
                                }
                                size="lg"
                                className="cursor-pointer"
                              />
                              <div className="flex flex-col items-start ml-3 ">
                                <Typography
                                  onClick={() =>
                                    navigate(`/user/${profile.userId._id}`)
                                  }
                                  className="text-base text-gray-900 hover:underline cursor-pointer"
                                >
                                  {profile.userId.name}
                                </Typography>
                                <Typography className="text-gray-800 italic">
                                  {profile.userId.bio}
                                </Typography>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-end">
                              <Typography className="text-base text-red-500">
                                Report Count:{" "}
                                {profile.reportedBy
                                  ? Object.keys(profile.reportedBy).length
                                  : "0"}
                              </Typography>
                              <div className="flex justify-between items-center">
                                {/* <Typography className="text-sm text-blue-500 italic font-semibold cursor-pointer hover:underline">
                                  Visit Profile
                                </Typography> */}
                                <Typography
                                  onClick={async () => {
                                    setReportProfileName(profile.userId.name);
                                    setReportProfileId(profile._id);
  
                                    handleReportBoxOpen();
                                  }}
                                  className="text-sm text-blue-500 italic font-semibold cursor-pointer ml-3 hover:underline"
                                >
                                  Check Status
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
  
        {reportBoxOpen && (
          <SingleReportBox
            open={reportBoxOpen}
            // handleOpen={handleReportBoxOpen}
            setOpen={setReportBoxOpen}
            singleReport={singleReport}
            name={reportProfileName}
            id={reportProfileId}
          />
        )}
  
        <Toaster position="top-right" />
      </div>
    )}
    </>
  );
};

export default Admin;
