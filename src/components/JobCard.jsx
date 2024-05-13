import React from "react";
import { CiStar } from "react-icons/ci";
import jobBuilding from "../assets/jobBuilding.png";

function JobCard() {
  return (
    <div className="w-full flex flex-col items-center px-6 py-3">
      {/* JOB PROFILE */}
      <div className="w-full flex items-center justify-between ">
        <div className="flex items-center justify-center">
          <img
            src={jobBuilding}
            alt=""
            className="rounded-full h-6 md:h-8 w-6 md:w-8 object-cover object-center cursor-pointer"
          />
          <h3 className="text-base pl-2">Senior Dentist : Job Profile</h3>
        </div>

        {/* SAVE JOB */}
        <div className="flex items-center justify-center">
          <CiStar className="text-2xl" />
        </div>
      </div>

      {/* LOCATION */}
      <div className="w-full flex items-center justify-start pt-1">
        <p className="text-grayText text-base">Deloitte Hospital, Hyderabad</p>
      </div>

      {/* SALARY AND DURATION OF JOB POSTING */}
      <div className="w-full flex items-center justify-between text-grayText text-base">
        {/* SALARY */}
        <div>
          <p>Rs. 2,000 - 5,000 / Hourly</p>
        </div>

        {/* DURATION OF JOB POSTING */}
        <div>27d</div>
      </div>
    </div>
  );
}

export default JobCard;
