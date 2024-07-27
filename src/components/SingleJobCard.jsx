import React from "react";
import { CiStar } from "react-icons/ci";
import alt from "../assets/altprofile.png";
import { Avatar, Card, Typography } from "@material-tailwind/react";
const SingleJobCard = () => {
  return (
    <Card className="w-full bg-white my-2 p-4">
      <div className="w-full flex items-center justify-between ">
        <div className="flex gap-3 items-center justify-center">
          <Avatar
            src={alt}
            alt=""
            size="sm"
          />
          <Typography className="text-[17px] font-medium">Senior Dentist</Typography>
        </div>

        {/* SAVE JOB */}
        <div className="flex items-center justify-center">
          <CiStar className="w-6 h-6  " />
        </div>
      </div>

      {/* LOCATION */}
      <div className="w-full flex items-center justify-start pt-1">
        <Typography className="text-base">Deloitte Hospital, Hyderabad</Typography>
      </div>

      {/* SALARY AND DURATION OF JOB POSTING */}
      <div className="w-full flex items-center justify-between text-gray-600 text-sm">
        {/* SALARY */}
        <div>
          <Typography>Rs. 2,000 - 5,000 / Hourly</Typography>
        </div>

        {/* DURATION OF JOB POSTING */}
        <Typography>27d</Typography>
      </div>
    </Card>
  );
};

export default SingleJobCard;
