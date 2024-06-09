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

function FeedPage() {
  const navigate = useNavigate();
  const minJobs = useSelector((state) => state.feed.minJobs);
  const [open, setOpen] = useState(false);
  const { userInfo, user } = useContext(UserContext);
  const handleOpen = () => setOpen(!open);
  console.log(user._id);
  const handleLogout = (e) => {
    e.preventDefault();
    try {
      Cookies.remove("token");
      Cookies.remove("name");
      Cookies.remove("email");
      toast.success("Logged Out");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-screen h-screen  bg-background relative flex z-0">
      <SideBar
        name={userInfo.name}
        email={userInfo.email}
        handleLogout={handleLogout}
        className="z-20 absolute h-screen left-0"
        route="feed"
      />
      <div className="w-full h-full flex flex-col md:flex-row pt-16 fixed z-0 pl-16 md:pl-20">
        {!minJobs ? (
          <MaxJob className="w-full m-auto" />
        ) : (
          <PostCard className="w-full m-auto" />
        )}
        {!minJobs ? <MinPost /> : <JobCard />}
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default FeedPage;
