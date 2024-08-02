import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import { TbPigMoney } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import React from "react";

const JobCardSingle = () => {
  return (
    <Card className="bg-white w-full p-4 scrollbar-thin mb-4">

      <CardHeader
        floated={false}
        shadow={false}

        className="p-2 m-0 flex justify-between"
      >
        <div className="flex flex-col">
          <Typography className="text-2xl leading-5 tracking-wide text-black w-full font-semibold">
            Job Title, Company
          </Typography>
          <Typography className="flex text-lg text-gray-800">
            <span className="">Jaipur</span>
          </Typography>
        </div>
        <div className="flex flex-col">
          <Typography className="text-sm">250 Applicants</Typography>
          <Typography className="text-sm">
            Posted by,{" "}
            <span className="text-blue-500 cursor-pointer">Deloitte</span>
          </Typography>
        </div>
      </CardHeader>

      <CardBody className="m-0 p-0 pb-4 border-b-2">
        {/* DETAILS 1 */}
        <div className="flex text-gray-700 w-full px-5 mt-3 gap-5">
          <Typography className="flex items-center gap-1">
            <TbPigMoney className="w-4 h-4 text-black" />
            <span className="">Rs. 30,000 - 45,000 /month</span>
          </Typography>
          <Typography className="flex items-center gap-1">
            <TiDocumentText className="w-4 h-4 text-black" />
            <span className="">1-5 Yrs Experience</span>
          </Typography>
          <Typography className="flex items-center gap-1">
            <IoMdTimer className="w-4 h-4 text-black" />
            <span className="">Immediate Joining</span>
          </Typography>
        </div>

        {/* DETAILS 2 */}
        <Typography className="flex items-center px-5 py-1">
          <span className="text-sm text-gray-500">
            Last Date to apply: 30 May
          </span>
        </Typography>

        {/* APPLICATION */}
        <div className="flex text-gray-700 w-full px-3 mt-6 gap-5 items-end">
          <Button className="" size="sm" color="blue">
            Apply
          </Button>
          <Button className="" size="sm" color="blue" variant="outlined">
            Save
          </Button>
        </div>
      </CardBody>

      <CardBody className="m-0 p-0 mt-3">
        <div className="w-full py-2 px-3">
        <Typography className="text-lg text-gray-700 font-semibold">Job Description</Typography>
        <ul className="flex flex-col text-sm list-disc mx-5 mt-1" >
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
        </ul>
        </div>
        <div className="w-full py-2 px-3">
        <Typography className="text-lg text-gray-700 font-semibold">Roles and Responsibilities</Typography>
        <ul className="flex flex-col text-sm list-disc mx-5 mt-1" >
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusamus!</li>
        </ul>
        </div>
        <div className="flex text-gray-700 w-full px-3 mt-6 gap-5 items-end">
          <Button className="" size="sm" color="blue">
            Apply
          </Button>
          <Button className="" size="sm" color="blue" variant="outlined">
            Save
          </Button>
        </div>
      </CardBody>

    </Card>
  );
};

export default JobCardSingle;
