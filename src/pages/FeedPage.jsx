import React, { useEffect, useState, useContext } from "react";
import PostCard from "../components/PostCard";
import CreatePostFeedSection from "../components/CreatePostFeedSection";
import JobCard from "../components/JobCard";
import { SERVER_URL } from "../ServerURL";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import CreatePostPopUp from "../components/CreatePostPopUp";
import SideBar from "../components/SideBar";
import MinPost from "../components/MinPost";
import { useSelector } from "react-redux";
import { feedClick } from "../Slices/feedSlice";
import MaxJob from "../components/MaxJob";
import Cookies from "js-cookie";
import { UserContext } from "../UserContext";
import { Button, Drawer } from "@material-tailwind/react";
import BlogCard from "../components/BlogCard";

function FeedPage() {
  const navigate = useNavigate();
  const minJobs = useSelector((state) => state.feed.minJobs);
  const [open, setOpen] = useState(false);
  const { userInfo, user, setUserInfo } = useContext(UserContext);
  const handleOpen = () => setOpen(!open);
  const [openSide, setOpenSide] = useState(false);

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
    <div className="w-full flex h-[90vh] bg-background overflow-y-hidden">
      <SideBar
        name={userInfo.name}
        email={userInfo.email}
        handleLogout={handleLogout}
        className="left-0 sm:block hidden"
        route="feed"
        userId={user._id}
      />
      <div className="flex mx-auto gap-4 justify-center">
        <div className="hidden 2xl:block w-56 cursor-pointer mt-5" onClick={() => navigate("/blogs")}>
          <BlogCard/>
        </div>
        <div className="w-[95%] sm:w-[90%] md:w-[500px] mx-auto">
          <PostCard />
        </div>
        <div className="hidden lg:block w-[350px]">
          <JobCard />
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
