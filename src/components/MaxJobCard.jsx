import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button, Card, Typography } from "@material-tailwind/react";
const MaxJobCard = () => {
  return (
    <Card className="w-full flex flex-col bg-white p-4 my-2">
      {/* POST AND ORGANIZATION */}
      <div className="flex w-full justify-between px-0 ">
        <div className="flex flex-col">
          <Typography className="text-xl text-gray-900">Senior Dentist</Typography>
          <Typography className="text-md text-gray-800">Deloitte Hospital</Typography>
        </div>
        <div className="flex">
          <IoPaperPlaneOutline className="w-6 h-6 mx-2" />
        </div>
      </div>

      {/* SALARY AND OTHER DETAILS */}
      <div className="flex flex-col text-gray-800 w-full px-2 my-1">
        <Typography className="flex items-center">
          <TiDocumentText className="w-5 h-5" />
          <span className="ml-3">1-5 Yrs Experience</span>
        </Typography>
        <Typography className="flex items-center">
          <MdOutlineLocationCity className="w-5 h-5" />
          <span className="ml-3">Jaipur</span>
        </Typography>
        <Typography className="flex items-center">
          <FaMoneyBill className="w-5 h-5" />
          <span className="ml-3">Rs. 30,000 - 45,000 /month</span>
        </Typography>
        <Typography className="flex items-center">
          <IoMdTimer className="w-5 h-5" />
          <span className="ml-3">Immediate Joining</span>
        </Typography>
        <Typography className="flex items-center">
          <FaRegCalendarAlt className="w-5 h-5" />
          <span className="ml-3">Last Date: 30 May</span>
        </Typography>
      </div>

      {/* APPLY */}
      <div className="w-full flex flex-col md:flex-row md:justify-between my-2">
        <div className="flex flex-col">
          <Typography className="text-gray-700">250 Applicants</Typography>
          <Typography className="text-gray-700">
            Posted By:{" "}
            <span className="text-blue-500 cursor-pointer">Aman Mishra</span> |
            2 Days Ago
          </Typography>
        </div>
        <div className="flex items-end gap-4">
          <Button size="sm" variant="outlined" color="blue">Save</Button>
          <Button size="sm" color="blue">Apply</Button>
        </div>
      </div>
    </Card>
  );
};

export default MaxJobCard;
