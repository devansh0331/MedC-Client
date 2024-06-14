import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
const MaxJobCard = () => {
  return (
    <div className="w-full flex flex-col bg-white p-2 mx-auto border-b-2 my-2 rounded-md">
      {/* POST AND ORGANIZATION */}
      <div className="flex w-full justify-between px-0 md:px-5 my-2">
        <div className="flex flex-col">
          <p className="text-xl font-medium1">Senior Dentist</p>
          <p className="text-gray-600 font-normal">Deloitte Hospital</p>
        </div>
        <div className="flex">
          <IoPaperPlaneOutline className="w-6 h-6 mx-2" />
        </div>
      </div>

      {/* SALARY AND OTHER DETAILS */}
      <div className="flex flex-col text-gray-700 w-full md:px-5 my-2">
        <div className="flex items-center">
          <TiDocumentText className="w-5 h-5" />
          <span className="ml-3">1-5 Yrs Experience</span>
        </div>
        <div className="flex items-center">
          <MdOutlineLocationCity className="w-5 h-5" />
          <span className="ml-3">Jaipur</span>
        </div>
        <div className="flex items-center">
          <FaMoneyBill className="w-5 h-5" />
          <span className="ml-3">Rs. 30,000 - 45,000 /month</span>
        </div>
        <div className="flex items-center">
          <IoMdTimer className="w-5 h-5" />
          <span className="ml-3">Immediate Joining</span>
        </div>
        <div className="flex items-center">
          <FaRegCalendarAlt className="w-5 h-5" />
          <span className="ml-3">Last Date: 30 May</span>
        </div>
      </div>

      {/* APPLY */}
      <div className="w-full flex flex-col md:flex-row md:justify-between md:px-5 my-2">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">250 Applicants</p>
          <p className="text-sm text-gray-500">
            Posted By:{" "}
            <span className="text-blue-400 cursor-pointer">Aman Mishra</span> |
            2 Days Ago
          </p>
        </div>
        <div className="flex md:justify-evenly mt-2 md:mt-0 gap-2 md:gap-0 ">
          <button className="bg-primary text-white px-4 py-1 rounded-lg mx-2 shadow-md text-sm md:text-base">
            Apply
          </button>
          <button className="bg-white border-2 border-primary text-primary px-4 mx-2 py-1 rounded-lg shadow-md text-sm md:text-base">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaxJobCard;
