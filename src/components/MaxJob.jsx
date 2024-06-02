import React from "react";
import MaxJobCard from "./MaxJobCard";
import { IoSearchSharp } from "react-icons/io5";
const MaxJob = () => {
  return (
    <div className="flex flex-col w-2/4 mx-auto mt-6 py-2 bg-white">
      <div className="w-full flex flex-col border-b-2 pb-2">
      <div className="flex items-center px-5 justify-between">
        <div className="w-3/5 mr-4 flex items-center">
          <input
            className="relative w-full border-2 border-gray-400 px-3 py-1 rounded-full mx-4"
            placeholder={`Search Jobs`}
          />
          <IoSearchSharp className=" text-gray-500 h-5 -ml-12 w-5 relative z-10" />
        </div>
        <div className="w-2/5 flex">
        <button className="w-full border-2 text-md border-primary text-primary my-2 px-3 py-1 mx-2 rounded-full">
          All Filters
        </button>
        <button className="w-full border-2 text-md bg-primary border-primary text-white my-2 px-3 py-1 mx-2 rounded-full">
          Search
        </button>
        </div>
      </div>
      {/* <div className="flex w-11/12 mx-auto">
        <p className="text-sm border-gray-400 border-2 rounded-full w-1/4 mx-2 py-1 text-center text-gray-500 font-medium px-5 mt-2">Location</p>
        <p className="text-sm border-gray-400 border-2 rounded-full w-1/4 mx-2 py-1 text-center text-gray-500 font-medium px-5 mt-2">Category</p>
        <p className="text-sm border-gray-400 border-2 rounded-full w-1/4 mx-2 py-1 text-center text-gray-500 font-medium px-5 mt-2">Skills</p>
        <p className="text-sm border-gray-400 border-2 rounded-full w-1/4 mx-2 py-1 text-center text-gray-500 font-medium px-5 mt-2">Date Posted  </p>
      </div> */}
      </div>
      <div className="overflow-y-scroll scrollbar-thin ">
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
      </div>
    </div>
  );
};

export default MaxJob;
