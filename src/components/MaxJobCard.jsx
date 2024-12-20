import React, { useContext, useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
import Resume from "../assets/Resume.pdf";
import { IoClose } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";
import { FaUserGraduate } from "react-icons/fa6";
import { UserContext } from "../UserContext";
import { MdManageHistory } from "react-icons/md";
import SignUpDialog from "./SignUpDialog";
import { SERVER_URL } from "../ServerURL";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import ResumeApplyDialog from "./ResumeApplyDialog";
import ResumeDialog from "./ResumeDialog";

const MaxJobCard = (props) => {
  const [resume, setResume] = useState(Resume);
  const [openResumeDialog, setOpenResumeDialog] = useState(false);
  const [shareBox, setShareBox] = useState(false);
  const [showText, setShowText] = useState(false);
  const [signUpBox, setSignUpBox] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const { user, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOpenApplyDialog = () => {
    setOpenApplyDialog(!openApplyDialog);
  };

  const handleShareBox = () => {
    setShareBox(!shareBox);
  };

  const handleSignUpBox = () => {
    setSignUpBox(!signUpBox);
  };

  const handleSaveJob = async () => {
    if (!userInfo.state) {
      setSignUpBox(true);
    } else {
      try {
        const response = await fetch(`${SERVER_URL}/userjob/save-job`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            userId: user._id,
            jobId: props.job._id,
          }),
        });

        const res = await response.json();
        if (res.success) {
          // console.log(res);
          toast.success(res.message);
          props.parentFunction();
          checkIfSaved();
        } else {
          // console.log(res);
          toast.error(res.error);
        }
      } catch (error) {
        console.error("Error saving job:", error);
      }
    }
  };

  const handleUnsaveJob = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/userjob/unsave-job`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          userId: user._id,
          jobId: props.job._id,
        }),
      });

      const res = await response.json();
      if (res.success) {
        // console.log(res);
        toast.success(res.message);
        props.parentFunction();
        checkIfSaved();
      } else {
        // console.log(res);
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const checkIfSaved = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/userjob/check-saved-job`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          userId: user._id,
          jobId: props.job._id,
        }),
      });
      const res = await response.json();

      if (res.success) {
        setIsSaved(res.isSaved);
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.error("Error checking if job is saved:", error);
    }
  };

  const copyUrl = async () => {
    try {
      const jobUrl = `${window.location.origin}/job/${props?.job?._id}`;
      await navigator.clipboard.writeText(jobUrl);
      setShowText(true);
      setTimeout(() => {
        setShowText(false);
      }, 1000);
    } catch (error) {
      console.error("Error copying URL:", error);
    }
  };

  const checkIfApplied = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/userjob/check-application`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          userId: user._id,
          jobId: props.job._id,
        }),
      });
      const res = await response.json();
      if (res.success) {
        setIsApplied(res.isApplied);
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.error("Error checking if job is applied:", error);
    }
  };

  const deleteApplication = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/userjob/delete-application`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          userId: user._id,
          jobId: props.job._id,
        }),
      });
      const res = await response.json();
      if (res.success) {
        checkIfApplied();
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };
  
    useEffect(() => {
      checkIfSaved();
      checkIfApplied();
      // console.log(props.job);
    }, [props?.job?._id, user?._id]);

  const jobUrl = `${window.location.origin}/job/${props?.job?._id}`;

  return (
    <>
      <Card className="w-full flex flex-col bg-white p-4 my-2">
        {/* POST AND ORGANIZATION */}
        <div className="flex w-full justify-between px-0">
          <div
            className="flex flex-col cursor-pointer"
            onClick={() => navigate(`/job/${props.job._id}`)}
          >
            <Typography className="text-xl text-gray-900">
              {props.job?.jobTitle ? props.job.jobTitle : "N/A"}
            </Typography>
            <Typography className="text-md text-gray-800">
              {props.job?.organziationName ? props.job.organziationName : "N/A"}
            </Typography>
          </div>
          <div className="flex cursor-pointer" onClick={handleShareBox}>
            <IoPaperPlaneOutline className="w-6 h-6 mx-2" />
          </div>
        </div>

        {/* SALARY AND OTHER DETAILS */}
        <div className="flex flex-col text-gray-800 w-full px-2 my-1">
        <Typography className="flex items-center">
            <TbPigMoney className="w-5 h-5" />
            <span className="ml-3">
            Rs. {props.job?.minimumSalary ? props.job.minimumSalary : "N/A"}{" "}
                {props.job?.maximumSalary ? "- Rs. " + props.job.maximumSalary : ""}{" "}
                {props.job?.salaryType ? props.job.salaryType : "N/A"}
            </span>
          </Typography>
          {props.job?.requiredQualification && (
            <Typography className="flex items-center">
              <FaUserGraduate className="w-5 h-5" />
              <span className="ml-3">
                {props.job?.requiredQualification
                  ? props.job.requiredQualification
                  : "N/A"}
              </span>
            </Typography>
          )}
          <Typography className="flex items-center">
            <IoMdTimer className="w-5 h-5" />
            <span className="ml-3">
              {props.job?.employementType ? props.job.employementType : "N/A"}
            </span>
          </Typography>
          <Typography className="flex items-center">
            <MdManageHistory className="w-5 h-5" />
            <span className="ml-3">
            {props.job?.minExperience === 0
                  ? "Fresher"
                  : `${props.job?.minExperience === 1 ? props.job.minExperience + " Year" : props.job.minExperience + " Years"}`} 
            </span>
          </Typography>
          <Typography className="flex items-center">
            <MdOutlineLocationCity className="w-5 h-5" />
            <span className="ml-3">
              {props.job?.location ? props.job.location : "N/A"}
            </span>
          </Typography> 
          <Typography className="flex items-center">
            <FaRegCalendarAlt className="w-5 h-5" />
            <span className="ml-3">{props.job?.lastDateToApply ? props.job.lastDateToApply.split("T")[0] : "N/A"}</span>
          </Typography>
        </div>

        {/* APPLY */}
        <div className="w-full flex flex-col sm:flex-row sm:justify-between mt-2 md:mt-0 md:my-2">
          {props.parent === "Posted" && (
            <>
              <div className="flex flex-col">
                <Typography className="text-gray-700">
                  {props.job?.noOfApplications ? props.job.noOfApplications : 0} {props.job?.noOfApplications === 1 ? "Application" : "Applications"}
                </Typography>
              </div>
              <div className="flex md:justify-end items-end gap-4 mt-2 md:mt-0">
                <Button size="sm" variant="outlined" color="blue" onClick={()=> navigate(`/user-saves/job-edit/${props?.job._id}`)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="blue"
                  onClick={() => navigate(`/job/${props?.job._id}/applications`)}
                >
                  View Applications
                </Button>
              </div>
            </>
          )}
          {props.parent !== "Posted" && (
            <>
              <div className="flex flex-col">
                <Typography className="text-gray-700">
                  {props.job?.noOfApplications ? props.job.noOfApplications : 0} Applicants
                </Typography>
                <Typography className="text-gray-700">
                  Posted By:{" "}
                  <span className="text-blue-500 cursor-pointer">
                    {props.job?.user?.name ? props.job.user.name : "Unknown"}
                  </span>{" "}
                </Typography>
              </div>

              <div className="flex md:justify-end items-end gap-4 mt-2 md:mt-0">
                {isSaved ? (
                  <>
                    <Button
                      size="sm"
                      variant="outlined"
                      color="black"
                      onClick={handleUnsaveJob}
                    >
                      Unsave
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outlined"
                      color="blue"
                      onClick={handleSaveJob}
                    >
                      Save
                    </Button>
                  </>
                )}
                {isApplied ? (
                  <div className="flex md:justify-end items-end gap-4 mt-2 md:mt-0">
                    <Button size="sm" variant="" color="red" onClick={() => deleteApplication()}>
                      Withdraw
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    color="blue"
                    onClick={handleOpenApplyDialog}
                  >
                    Apply
                  </Button>
                )}
              </div>
            </>
          )}
        </div>

        {/* SHARE ON SOCIALS */}
        <Dialog open={shareBox} handler={handleShareBox} size="xs">
          <DialogHeader>
            <Typography className="text-xl font-semibold text-gray-900">
              Share Post
            </Typography>
          </DialogHeader>
          <DialogBody className="px-6 py-2 flex justify-between w-full">
            <a
              href={`https://www.facebook.com/sharer.php?u=${jobUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="">
                <FaFacebook className="w-8 h-8 text-[#316FF6]" />
              </button>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${jobUrl}&text=${props.job?.jobTitle}`}
              target="_blank"
              rel="noreferrer"
              className=""
            >
              <button className="">
                <FaSquareXTwitter className="w-8 h-8 text-black" />
              </button>
            </a>
            <a
              href={`http://www.linkedin.com/shareArticle?mini=true&url=${jobUrl}&title=${props.job?.jobTitle}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="">
                <FaLinkedin className="w-8 h-8 text-[#0077B5]" />
              </button>
            </a>
            <a
              href={`https://wa.me/?text=${jobUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="">
                <FaSquareWhatsapp className="w-8 h-8 text-[#25D366]" />
              </button>
            </a>
            <button className="" onClick={() => copyUrl()}>
              <FaCopy className="w-8 h-7 text-gray-700" />
            </button>
          </DialogBody>
          <Typography
            className={`text-base font-normal text-gray-800 text-center pb-2 ${
              showText ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s ease-in-out" }}
          >
            Link Copied
          </Typography>
        </Dialog>

        {/* SIGN UP DIALOG */}
        <SignUpDialog open={signUpBox} handler={handleSignUpBox} />

        <Toaster position="top-right" reverseOrder={false} />
      </Card>

      {/* APPLICATION DIALOG */}
      <ResumeDialog
        open={openApplyDialog}
        handler={handleOpenApplyDialog}
        jobId={props.job?._id}
        title={`Apply for ${props.job?.jobTitle}`}
        route="Apply"
        checkIfApplied={checkIfApplied}
      />
    </>
  );
};

export default MaxJobCard;
