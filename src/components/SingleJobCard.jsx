// MINIMIZED JOB CARD
import React from "react";
import { CiStar } from "react-icons/ci";
import alt from "../assets/altprofile.png";
import { Avatar, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const SingleJobCard = (props) => {
  const navigate = useNavigate()
  const job = props.job;
  return (
    <Card className="w-full bg-white my-2 p-4 cursor-pointer" onClick={() => navigate(`/job/${job._id}`)}>
      <div className="w-full flex items-center justify-between ">
        <div className="flex gap-3 items-center justify-center">
          <Typography className="text-[19px] font-medium text-gray-900">{job?.jobTitle? job.jobTitle : "N/A"}</Typography>
        </div>
        {/* SAVE JOB */}
        <div className="flex items-center justify-center">
          <CiStar className="w-6 h-6" />
        </div>
      </div>

      {/* LOCATION */}
      <div className="w-full flex items-center justify-start pt-2">
        <Typography className="text-base text-gray-800">{job?.organziationName ? job?.organziationName : job?.location}</Typography>
      </div>

      {/* SALARY AND DURATION OF JOB POSTING */}
      <div className="w-full flex items-center justify-between text-gray-700 text-sm">
        {/* SALARY */}
        <div>
          <Typography>{job?.salaryRange}</Typography>
        </div>
      </div>
    </Card>
  );
};

export default SingleJobCard;
