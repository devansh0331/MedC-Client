import React from "react";
import { CiStar } from "react-icons/ci";
import jobBuilding from "../assets/jobBuilding.png";
import profile from "../assets/profile.png";
import SingleJobCard from "./SingleJobCard";
import MinPostCard from "./MinPostCard";
import { FaExpand } from "react-icons/fa";
import { feedClick } from "../Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function JobCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const minJobs = useSelector((state) => state.feed.minJobs);
  const handleExpand = () => {
    dispatch(feedClick(!minJobs));
    console.log(minJobs);
  };

  return (
    <Card className=" bg-inherit h-2/3 lg:flex hidden flex-col items-center mx-auto mt-5 shadow-md">
      <Card className="w-full flex items-center justify-center bg-white rounded-md">
        <div className="flex w-11/12 my-1 justify-between items-center">
          <Typography className="text-xl w-full font-semibold">Featured Jobs</Typography>
          <button onClick={()=> navigate('/jobs')}>
            <FaExpand />
          </button>
        </div>
      </Card>
      <div className="w-full overflow-y-scroll scrollbar-thin flex flex-col items-center">
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
      </div>
    </Card>
  );
}

export default JobCard;
