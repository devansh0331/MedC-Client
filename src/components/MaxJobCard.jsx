import React, { useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
import Resume from "../assets/Resume.pdf";
import { IoClose } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";

const MaxJobCard = (props) => {
  const [resume, setResume] = useState(Resume);
  const navigate = useNavigate();
  const [openResumeDialog, setOpenResumeDialog] = useState(false);

  const handleResumeDialog = () => {
    setOpenResumeDialog(!openResumeDialog);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      setResume(null);
      alert("Please select a PDF file!");
      return;
    }
    setResume(selectedFile);
  };

  const handleResumeDownload = () => {
    const pdfUrl = resume;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${props.user.name} Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <Card className="w-full flex flex-col bg-white p-4 my-2">
      {/* POST AND ORGANIZATION */}
      <div className="flex w-full justify-between px-0 cursor-pointer"
       onClick={() => navigate(`/job/${props.job._id}`)}
       >
        <div className="flex flex-col">
          <Typography className="text-xl text-gray-900">{props.job?.jobTitle ? props.job.jobTitle : "N/A"}</Typography>
          <Typography className="text-md text-gray-800">{props.job?.organziationName ? props.job.organziationName : "N/A"}</Typography>
        </div>
        <div className="flex">
          <IoPaperPlaneOutline className="w-6 h-6 mx-2" />
        </div>
      </div>

      {/* SALARY AND OTHER DETAILS */}
      <div className="flex flex-col text-gray-800 w-full px-2 my-1">
        <Typography className="flex items-center">
          <TiDocumentText className="w-5 h-5" />
          <span className="ml-3">{props.job?.experience ? props.job.experience : "N/A"} Experience</span>
        </Typography>
        <Typography className="flex items-center">
          <MdOutlineLocationCity className="w-5 h-5" />
          <span className="ml-3">{props.job?.location ? props.job.location : "N/A"}</span>
        </Typography>
        <Typography className="flex items-center">
          <FaMoneyBill className="w-5 h-5" />
          <span className="ml-3">{props.job?.salaryRange ? props.job.salaryRange : "N/A"}</span>
        </Typography>
        <Typography className="flex items-center">
          <IoMdTimer className="w-5 h-5" />
          <span className="ml-3">{props.job?.workTiming ? props.job.workTiming : "N/A"}</span>
        </Typography>
        {props.job?.requiredQualification && <Typography className="flex items-center">
          <FaGraduationCap className="w-5 h-5" />
          <span className="ml-3">{props.job?.requiredQualification ? props.job.requiredQualification : "N/A"}</span>
        </Typography>}
        <Typography className="flex items-center">
          <FaRegCalendarAlt className="w-5 h-5" />
          <span className="ml-3">31 August 2024</span>
        </Typography>
      </div>

      {/* APPLY */}
      <div className="w-full flex flex-col md:flex-row md:justify-between mt-2 md:mt-0 md:my-2">
        {props.parent === 'Posted' &&
        <>
        <div className="flex flex-col">
          <Typography className="text-gray-700">250 Applicants</Typography>
          <Typography className="text-gray-700">
           Posted 2 Days Ago
          </Typography>
        </div>
        <div className="flex md:justify-end items-end gap-4 mt-2 md:mt-0">
          <Button size="sm" variant="outlined" color="blue">Edit</Button>
          <Button size="sm" color="blue" onClick={() => navigate(`/job/:id/applications`)}>View</Button>
        </div>
        </>
      }
      {props.parent !== 'Posted' &&
      <>
        <div className="flex flex-col">
          <Typography className="text-gray-700">250 Applicants</Typography>
          <Typography className="text-gray-700">
            Posted By:{" "}
            <span className="text-blue-500 cursor-pointer">Aman Mishra</span> |
            2 Days Ago
          </Typography>
        </div>
        <div className="flex md:justify-end items-end gap-4 mt-2 md:mt-0">
          <Button size="sm" variant="outlined" color="blue">Save</Button>
          <Button size="sm" color="blue" onClick={handleResumeDialog}>Apply</Button>
        </div>
      </>
      }
      </div>

       {/* RESUME SELECTOR */}
       <Dialog open={openResumeDialog} handler={handleResumeDialog} size="sm">
        <DialogHeader>Select Resume</DialogHeader>
        <DialogBody className="flex flex-col">
          <div className="my-1 border-[1px] border-gray-400 w-full sm:w-2/3 p-2 rounded-md flex items-center justify-between">
            {Resume.length > 20 ? Resume.slice(0, 20) + "..." : Resume}
            <FaFileDownload
              className="w-5 h-5 cursor-pointer"
              onClick={() => handleResumeDownload()}
            />
          </div>
          <div className="my-1 border-[1px] border-gray-400 w-full sm:w-2/3 p-2 rounded-md flex items-center justify-between">
            {Resume.length > 20 ? Resume.slice(0, 20) + "..." : Resume}
            <FaFileDownload
              className="w-5 h-5 cursor-pointer"
              onClick={() => handleResumeDownload()}
            />
          </div>
          <div className="my-1 border-[1px] border-gray-400 w-full sm:w-2/3 p-2 rounded-md flex items-center justify-between">
            {Resume.length > 20 ? Resume.slice(0, 20) + "..." : Resume}
            <FaFileDownload
              className="w-5 h-5 cursor-pointer"
              onClick={() => handleResumeDownload()}
            />
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <Button
            size="sm"
            variant="outlined"
            color="blue"
            onClick={handleResumeDialog}
          >
            Cancel
          </Button>
          <Button size="sm" color="blue">
            Apply
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default MaxJobCard;