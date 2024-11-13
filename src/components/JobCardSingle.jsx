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
import { IoMdTimer } from "react-icons/io";
import { TbPigMoney } from "react-icons/tb";
import { FaUserGraduate } from "react-icons/fa6";
import { MdManageHistory } from "react-icons/md";
import React, { useContext, useState, useEffect } from "react";
import Resume from "../assets/Resume.pdf";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import ResumeDialog from "./ResumeDialog";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

const JobCardSingle = (props) => {
  const job = props.job;
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
  const [salaryView, setSalaryView] = useState(false);
  const [qualificationView, setQualificationView] = useState(false);
  const [employmentTypeView, setEmploymentTypeView] = useState(false);
  const [experienceView, setExperienceView] = useState(false);

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
    <div
      className={`bg-white w-full p-4 max-h-[80vh] flex flex-col justify-start mb-4 rounded-xl ${
        props.route === "ViewApplications"
          ? "md:overflow-y-scroll scrollbar-invisible overflow-visible"
          : "overflow-y-scroll scrollbar-invisible"
      }`}
    >
      <div
        className={`relative p-2 m-0 flex justify-between gap-2 ${
          props.route === "ViewApplications"
            ? "flex-col"
            : " flex-col md:flex-row lg:flex-col 2xl:flex-row"
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
        <div className="flex gap-2 items-start mr-8">
          <div className="flex flex-col">
            <Typography className="text-sm">
              {job?.noOfApplications} Applicants
            </Typography>
            <Typography className="text-sm">
              Posted by,{" "}
              <span className="text-blue-500 cursor-pointer">
                {job?.user?.name ? job.user?.name : "N/A"}
              </span>
            </Typography>
          </div>
          <button className="absolute top-2 right-2" onClick={handleShareBox}>
            <IoPaperPlaneOutline className="w-6 h-6" />
          </button>
        </div>
      </div>

      <CardBody className="m-0 p-0 pb-4 border-b-2">
        {/* DETAILS 1 */}
        <div
          className={`flex ${
            props.route === "ViewApplications"
              ? "flex-col gap-1"
              : "flex-col md:flex-row lg:flex-col 2xl:flex-row gap-2 md:gap-5 lg:gap-2 2xl:gap-5"
          } text-gray-700 w-full px-5 mt-3 relative`}
        >
          {/* SALARY RANGE */}
          <div className="">
            <Typography
              className="flex items-center gap-1"
              onMouseEnter={() => setSalaryView(true)}
              onMouseLeave={() => setSalaryView(false)}
            >
              <TbPigMoney className="w-5 h-5 text-black" />
              <span className="">
                Rs. {job?.minimumSalary ? job.minimumSalary : "N/A"}{" "}
                {job?.maximumSalary ? "- Rs. " + job.maximumSalary : ""}{" "}
                {job?.salaryType ? job.salaryType : "N/A"}
              </span>
            </Typography>
            <p
              className={`bg-gray-200 px-2 py-1 rounded-md text-[14px] absolute ${
                salaryView ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
              style={{ transition: "opacity 0.2s ease-in-out" }}
            >
              Salary Range: Rs. {job?.minimumSalary ? job.minimumSalary : "N/A"}{" "}
              {job?.maximumSalary ? "- Rs. " + job.maximumSalary : ""}{" "}
              {job?.salaryType ? job.salaryType : "N/A"}
            </p>
          </div>

          {/* EMPLOYMENT TYPE */}
          <div className="">
            <Typography
              className="flex items-center gap-1"
              onMouseEnter={() => setEmploymentTypeView(true)}
              onMouseLeave={() => setEmploymentTypeView(false)}
            >
              <IoMdTimer className="w-5 h-5 text-black" />
              <span className="">
                {job?.employementType ? job.employementType : "N/A"}
              </span>
            </Typography>
            <p
              className={`bg-gray-200 px-2 py-1 rounded-md text-[14px] absolute ${
                employmentTypeView ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
              style={{ transition: "opacity 0.2s ease-in-out" }}
            >
              Employment Type:{" "}
              {job?.employementType ? job.employementType : "N/A"}
            </p>
          </div>

          {/* REQUIRED QUALIFICATION */}
          <div className="">
            <Typography
              className="flex items-center gap-1"
              onMouseEnter={() => setQualificationView(true)}
              onMouseLeave={() => setQualificationView(false)}
            >
              <FaUserGraduate className="w-5 h-5 text-black" />
              <span className="">
                {job?.requiredQualification ? job.requiredQualification : "N/A"}
              </span>
            </Typography>
            <p
              className={`bg-gray-200 px-2 py-1 rounded-md text-[14px] absolute ${
                qualificationView ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
              style={{ transition: "opacity 0.2s ease-in-out" }}
            >
              Required Qualification:{" "}
              {job?.requiredQualification ? job.requiredQualification : "N/A"}
            </p>
          </div>

          {/* MINIMUM EXPERIENCE */}
          <div>
            <Typography
              className="flex items-center gap-1"
              onMouseEnter={() => setExperienceView(true)}
              onMouseLeave={() => setExperienceView(false)}
            >
              <MdManageHistory className="w-5 h-5 text-black" />
              <span className="">
                {job?.minExperience === 0
                  ? "Fresher"
                  : `${
                      job?.minExperience === 1
                        ? "1 Year"
                        : job.minExperience + " Years"
                    }`}
              </span>
            </Typography>
            <p
              className={`bg-gray-200 px-2 py-1 rounded-md text-[14px] absolute ${
                experienceView ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
              style={{ transition: "opacity 0.2s ease-in-out" }}
            >
              Minimum Experience:{" "}
              {job?.minExperience === 0
                ? "Fresher"
                : `${
                    job?.minExperience === 1
                      ? "1 Year"
                      : job.minExperience + " Years"
                  }`}
            </p>
          </div>
        </div>

        {/* DETAILS 2 */}
        <Typography className="flex items-center px-5 pt-3 2xl:pt-1">
          <span className="text-sm text-gray-700">
            Last Date to apply:{" "}
            {job?.lastDateToApply
              ? props.job.lastDateToApply.split("T")[0]
              : "N/A"}
          </span>
        </Typography>

        {/* APPLICATION */}
        {props.route === "ViewApplications" ? (
          <></>
        ) : (
          // <div className="">
          //   <Button
          //     className=""
          //     size="sm"
          //     color="blue"
          //   >
          //     Apply
          //   </Button>
          //   <Button className="" size="sm" color="blue" variant="outlined">
          //     Save
          //   </Button>
          // </div>
          <div className="flex text-gray-700 w-full px-3 mt-6 gap-5 items-end">
            {isApplied ? (
              <div className="flex md:justify-end items-end gap-4 mt-2 md:mt-0">
                <Button
                  size="sm"
                  color="red"
                  onClick={() => deleteApplication()}
                >
                  Withdraw
                </Button>
              </div>
            ) : (
              <Button size="sm" color="blue" onClick={handleOpenApplyDialog}>
                Apply
              </Button>
            )}

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
          </div>
        )}
      </CardBody>

      <div className="m-0 p-0 mt-3">
        <div className="w-full py-2 px-3">
          <Typography className="text-lg font-semibold">Description</Typography>
          <div
            className="no-twp"
            dangerouslySetInnerHTML={{
              __html: job?.description ? job.description : "N/A",
            }}
          ></div>
        </div>

        {props.route === "ViewApplications" ? (
          <></>
        ) : (
          <div className="flex text-gray-700 w-full px-3 mt-6 gap-5 items-end">
            {isApplied ? (
              <div className="flex md:justify-end items-end gap-4 mt-2 md:mt-0">
                <Button
                  size="sm"
                  color="red"
                  onClick={() => deleteApplication()}
                >
                  Withdraw
                </Button>
              </div>
            ) : (
              <Button size="sm" color="blue" onClick={handleOpenApplyDialog}>
                Apply
              </Button>
            )}

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
          </div>
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

      {/* RESUME APPLY */}
      <ResumeDialog
        open={openApplyDialog}
        handler={handleOpenApplyDialog}
        jobId={props.job?._id}
        title="Select a Resume"
        route="Apply"
        checkIfApplied={checkIfApplied}
      />

      <Toaster position="top-right" />
    </div>
  );
};

export default JobCardSingle;
