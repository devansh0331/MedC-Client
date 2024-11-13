import { Typography } from "@material-tailwind/react";
import React from "react";

const JobCardSkeleton = () => {
  return (
    <div className="w-full p-4 my-2 bg-white rounded-lg  animate-pulse">
      <div className="flex w-full justify-between px-0 ">
        <div className="flex flex-col">
          <Typography
            as="div"
            variant="h1"
            className="mb-3 h-4 w-60 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="h1"
            className="mb-4 h-3 w-52 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
      <div className="flex flex-col w-full px-2 my-1 gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
          <div className="h-2 w-64 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
          <div className="h-2 w-64 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
          <div className="h-2 w-64 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
          <div className="h-2 w-64 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
          <div className="h-2 w-64 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
          <div className="h-2 w-64 rounded-full bg-gray-300"></div>
        </div>
      </div>
      <div className="flex justify-between px-0 mt-4 items-center">
        <div className="flex flex-col gap-2">
          <div className="h-2 w-32 rounded-full bg-gray-300"></div>
          <div className="h-2 w-60 rounded-full bg-gray-300"></div>
        </div>
       <div className="flex flex-row gap-4">
            <div className="h-8 w-20 rounded-md bg-gray-300"></div>
            <div className="h-8 w-20 rounded-md bg-gray-300"></div>
       </div>
       </div>
    </div>
  );
};

export default JobCardSkeleton;
