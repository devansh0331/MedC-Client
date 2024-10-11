import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import { TbPigMoney } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { HiHomeModern } from "react-icons/hi2";
import React, { useState } from "react";

const JobCardSingle = (props) => {
  const job = props.job;

  return (
    <div
      className={`bg-white w-full p-4 max-h-[80vh] flex flex-col justify-start mb-4 rounded-xl ${
        props.route === "ViewApplications"
          ? "md:overflow-y-scroll scrollbar-invisible overflow-visible"
          : "overflow-y-scroll scrollbar-invisible"
      }`}
    >
      <div
        className={`p-2 m-0 flex justify-between gap-2 ${
          props.route === "ViewApplications"
            ? "flex-col"
            : " flex-col sm:flex-row lg:flex-col 2xl:flex-row"
        }`}
      >
        <div className="flex flex-col">
          <Typography className="text-2xl tracking-wide text-black w-full font-semibold">
            {job?.jobTitle ? job.jobTitle : "N/A"},{" "}
            {job?.organziationName ? job?.organziationName : ""}
          </Typography>
          <Typography className="flex text-lg text-gray-800">
            <span className="">
              {job?.location ? job.location : job?.organizationName}
            </span>
          </Typography>
        </div>
        <div className="flex flex-col">
          <Typography className="text-sm">{job?.noOfApplications} Applicants</Typography>
          <Typography className="text-sm">
            Posted by,{" "}
            <span className="text-blue-500 cursor-pointer">
              {job?.user?.name ? job.user?.name : "N/A"}
            </span>
          </Typography>
        </div>
      </div>

      <CardBody className="m-0 p-0 pb-4 border-b-2">
        {/* DETAILS 1 */}
        <div
          className={`flex ${
            props.route === "ViewApplications"
              ? "flex-col gap-1"
              : "flex-col sm:flex-row lg:flex-col 2xl:flex-row gap-2 sm:gap-5 lg:gap-2 2xl:gap-5"
          } text-gray-700 w-full px-5 mt-3 `}
        >
          <Typography className="flex items-center gap-1">
            <TbPigMoney className="w-5 h-5 text-black" />
            <span className="">
              {job?.salaryRange ? job.salaryRange : "N/A"}
            </span>
          </Typography>
          <Typography className="flex items-center gap-1">
            <FaUserGraduate className="w-5 h-5 text-black" />
            <span className="">{job?.requiredQualification ? job.requiredQualification : "N/A"}</span>
          </Typography>
          <Typography className="flex items-center gap-1">
            <IoMdTimer className="w-5 h-5 text-black" />
            <span className="">{job?.employementType ? job.employementType : "N/A"}</span>
          </Typography>
          <Typography className="flex items-center gap-1">
            <TiDocumentText className="w-5 h-5 text-black" />
            <span className="">
              {job?.minExperience ? job.minExperience : "N/A"}
            </span>
          </Typography>
        </div>

        {/* DETAILS 2 */}
        <Typography className="flex items-center px-5 pt-3 2xl:pt-1 ">
          <span className="text-sm text-gray-700">
            Last Date to apply: {job?.lastDateToApply ?  props.job.lastDateToApply.split("T")[0] : "N/A"}
          </span>
        </Typography>

        {/* APPLICATION */}
        {props.route === "ViewApplications" ? (
          <></>
        ) : (
          <div className="flex text-gray-700 w-full px-3 mt-6 gap-5 items-end">
            <Button
              className=""
              size="sm"
              color="blue"
            >
              Apply
            </Button>
            <Button className="" size="sm" color="blue" variant="outlined">
              Save
            </Button>
          </div>
        )}
      </CardBody>

      <div className="m-0 p-0 mt-3">
        <div className="w-full py-2 px-3">
          <p className="flex flex-col text-sm list-disc mx-5 mt-1" dangerouslySetInnerHTML={{ __html: job?.description ? job.description : "N/A" }}>
          </p>
        </div>

        {props.route === "ViewApplications" ? (
          <></>
        ) : (
          <div className="flex text-gray-700 w-full px-3 mt-6 gap-5 items-end">
            <Button
              className=""
              size="sm"
              color="blue"
            >
              Apply
            </Button>
            <Button className="" size="sm" color="blue" variant="outlined">
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCardSingle;
