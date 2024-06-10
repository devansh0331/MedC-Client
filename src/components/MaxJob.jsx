import React from "react";
import MaxJobCard from "./MaxJobCard";
import { IoMdSearch } from "react-icons/io";
import { FaExpand } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
const MaxJob = () => {
  return (
    <div className="w-11/12 flex flex-col md:w-2/4 mx-auto mt-6 py-1 bg-white rounded-md shadow-md">
      <div className="w-full flex flex-col">
        <div className=" flex flex-col md:flex-row items-center px-2 md:px-5 justify-between">
          <div className="w-full md:w-4/5 md:mr-4 flex items-center">
            <input
              className="relative w-full border-2 border-gray-500 px-3 py-1 rounded-full"
              placeholder={`Find a Job`}
            />
            <button className=" bg-gray-500 text-white my-2 p-1 rounded-full flex items-center justify-center relative -ml-8 z-10">
            <IoMdSearch className="w-5 h-5" />
            </button>
          </div>
        
            <button className="w-1/5 text-md border-primary border-2 bg-primary text-white my-2 px-2 justify-center py-1 rounded-full flex items-center">
            <IoFilter className="w-4 h-4 mr-2"/><span>Filters</span> 
            </button>
            
         
        </div>
      </div>
      <div className="w-full h-screen overflow-y-scroll scrollbar-thin bg-background">
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
