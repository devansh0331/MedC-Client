import React from "react";
import { CiStar } from "react-icons/ci";
import jobBuilding from "../assets/jobBuilding.png";
import profile from "../assets/profile.png";
import SingleJobCard from "./SingleJobCard";
import MinPostCard from "./MinPostCard";
import { FaExpand } from "react-icons/fa";
import { feedClick } from "../Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";

function JobCard() {
  const dispatch = useDispatch();
  const minJobs = useSelector((state) => state.feed.minJobs);
  const handleExpand = () => {
    dispatch(feedClick(!minJobs));
    console.log(minJobs);
  };

  return (
    <div className=" lg:w-1/3 bg-inherit h-2/3 lg:flex hidden flex-col items-center mx-auto mt-6 shadow-md">
      <div className="w-full flex items-center justify-center bg-white rounded-md">
        <div className="flex w-11/12 my-1 justify-between items-center">
          <p className="text-xl w-full font-semibold">Featured Jobs</p>
          <button onClick={() => handleExpand()}>
            <FaExpand />
          </button>
        </div>
      </div>
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
    </div>
  );
}

export default JobCard;
