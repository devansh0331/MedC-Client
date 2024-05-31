import React from "react";
import MaxJobCard from "./MaxJobCard";
import { IoSearchSharp } from "react-icons/io5";
const MaxJob = () => {
  return (
    <div className="flex flex-col w-2/4 mx-auto mt-6 py-2 bg-white">
      <div className="flex items-center px-5 border-b-2 pb-2">
        <div className="w-3/4 mr-2 flex items-center">
          <input
            className="relative w-full border-2 border-gray-400  px-3 py-1 rounded-md mx-4"
            placeholder={`Search Jobs`}
          />
          <IoSearchSharp className=" text-gray-500 h-5 -ml-12 w-5 relative z-10" />
        </div>
        <button className="w-1/5 border-2 text-md border-primary text-primary my-2 px-3 py-1 mx-4 rounded-full">
          Filters
        </button>
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
