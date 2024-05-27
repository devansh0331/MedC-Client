import React, { useEffect, useState } from "react";
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
import { feedClick } from '../Slices/feedSlice';
import MaxJob from "../components/MaxJob";

function FeedPage() {
  const navigate = useNavigate();
  const minJobs = useSelector((state)=> state.feed.minJobs)
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    fetch(`${SERVER_URL}/auth/is-user`, { credentials: "include" }).then(
      (res) =>
        res.json().then((res) => {
          console.log(res);
          if (res != true) {
            toast.error(res);
            navigate("/signin");
          }
        })
    );
  }, []);
  return (
    <div className="w-screen h-screen  bg-background relative flex z-0">
      <SideBar className="z-20 absolute h-screen left-0" /> 
      <div className="w-full h-full flex flex-col md:flex-row pt-16 fixed z-0 pl-20">
        {!minJobs? <MaxJob className="w-full m-auto"/> : <PostCard className="w-full m-auto"/>}
        {!minJobs ? <MinPost/> : <JobCard/>}
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default FeedPage;
