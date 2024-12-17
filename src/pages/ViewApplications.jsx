import React, { useContext, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import JobCardSingle from "../components/JobCardSingle";
import { UserContext } from "../UserContext";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import altprofile from "../assets/altprofile.png";
import { IoLocationSharp } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import YouMayKnow from "../components/YouMayKnow";
import ProfileExpand from "../components/ProfileExpand";
import { SERVER_URL } from "../ServerURL";
import { FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const ViewApplications = () => {
  const jobId = useParams().id;
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState();
  const [applications, setApplications] = useState([]);
  const [userExpand, setUserExpand] = useState({});
  const { user, allUsers, getAllUsers, userInfo } = useContext(UserContext);
  const [jobOpen, setJobOpen] = useState(false);
  const [profileExpand, setProfileExpand] = useState(false);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [isShortListing, setIsShortListing] = useState(true);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);

  const handleProfileExpand = () => {
    setProfileExpand(!profileExpand);
  };

  const getSingleJob = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/job/single-job/${jobId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res.success) {
        setJob(res.job);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllApplications = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/userjob/get-users-job/${jobId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const res = await response.json();
      if (res.success) {
        setApplications(res.appliedUsers);
        // console.log(res.appliedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getShortlistedCandidates = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/userjob/get-shortlisted-candidates/${jobId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      const res = await response.json();
      // console.log(res)
      if(res.success){
        setShortlistedCandidates(res.data);
      }else{
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(error);
      
    }
  }

  const shortListCandidate = async () => {
    try {
      console.log("ShortList Candidate: " + candidateId + " " + candidateEmail);
      if (candidateId != "" && candidateEmail != "") {
        const response = await fetch(
          `${SERVER_URL}/userjob/shortlist-candidate/${jobId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify({ candidateId, candidateEmail }),
          }
        );
        console.log("After fetch");
        const res = await response.json();
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          console.log(res.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleJob();
  }, []);
  
  useEffect(() => {
    setUserExpand(applications[0]?.userId);
  }, [applications]);
  
  useEffect(() => {
    getAllApplications();
    getShortlistedCandidates();
  }, [jobId]);

  return (
    <div className="flex md:overflow-y-hidden z-0 bg-background h-[90vh] w-full overflow-y-scroll scrollbar-thin">
      <SideBar />
      {userInfo.state ? (
        <>
          {user?._id == job?.user?._id ? (
            <div className="flex w-[92%] lg:w-[90%] 2xl:w-[80%] mx-auto h-full gap-6 justify-center mt-5">
              <div className="lg:w-1/3 w-2/5 hidden md:block">
                <JobCardSingle job={job} route={"ViewApplications"} />
              </div>
              <div className="flex flex-col w-full lg:w-1/2 md:w-3/5">
                <Accordion
                  onClick={() => setJobOpen(!jobOpen)}
                  open={jobOpen}
                  className="bg-white mb-2 rounded-lg px-4  md:hidden"
                  icon={<FaChevronDown />}
                >
                  <AccordionHeader className="border-none">
                    {job.jobTitle}, {job.organziationName}
                  </AccordionHeader>
                  <AccordionBody>
                    <JobCardSingle job={job} route={"ViewApplications"} />
                  </AccordionBody>
                </Accordion>
                <div className=" bg-white rounded-lg px-4 py-2">
                <p className="text-2xl font-bold">Applications</p>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 overflow-visible md:overflow-y-scroll max-h-[80vh] scrollbar-thin gap-3">
                  {applications.map((user, index) => (
                    <div key={index}>
                      {user.userId.name != "" ? (
                        <Card
                          className="p-3 flex flex-col gap-3 justify-between"
                          key={index}
                        >
                          <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2 "
                          >
                            <Badge color="green" overlap="circular" invisible>
                              <Avatar
                                src={
                                  user.userId.profileURL
                                    ? user.userId.profileURL
                                    : altprofile
                                }
                                alt="altprofile"
                                size="xl"
                                className="w-24 h-24 mx-auto"
                              />
                            </Badge>
                            <Typography className="text-lg mt-2">
                              {user?.userId.name ? user.userId.name : "Anonymous"}
                            </Typography>
                          </CardHeader>
                          {user.userId.location || user.userId.bio ? (
                            <CardBody className="m-0 p-0 border-b-2 rounded-none pb-2">
                              {user.userId.bio && (
                                <Typography className="flex items-center">
                                  <BsBuildingsFill />
                                  <span className="ml-1">
                                    {user.userId.bio}
                                  </span>
                                </Typography>
                              )}
                              {user.userId.location && (
                                <Typography className="flex items-center">
                                  <IoLocationSharp />
                                  <span className="ml-1">
                                    {user.userId.location}
                                  </span>
                                </Typography>
                              )}
                            </CardBody>
                          ) : null}
                          <CardFooter className="m-0 p-0 mx-auto">
                            <Button
                              size="sm"
                              className="px-2 py-1 font-light rounded-md hidden xl:block"
                              color="light-blue"
                              onClick={() => setUserExpand(user.userId)}
                            >
                              Show Details
                            </Button>
                            <Button
                              size="sm"
                              className="px-2 py-1 font-light rounded-md xl:hidden block"
                              color="light-blue"
                              onClick={() => {
                                setUserExpand(user.userId);
                                handleProfileExpand();
                              }}
                            >
                              Show Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ) : null}
                    </div>
                  ))}
                </div>
                </div>
                <div className=" bg-white rounded-lg px-4 py-2">
                <p className="text-2xl font-bold">Shortlisted</p>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 overflow-visible md:overflow-y-scroll max-h-[80vh] scrollbar-thin gap-3">
                  {shortlistedCandidates.map((user, index) => (
                    <div key={index}>
                      {user.userId.name != "" ? (
                        <Card
                          className="p-3 flex flex-col gap-3 justify-between"
                          key={index}
                        >
                          <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2 "
                          >
                            <Badge color="green" overlap="circular" invisible>
                              <Avatar
                                src={
                                  user.userId.profileURL
                                    ? user.userId.profileURL
                                    : altprofile
                                }
                                alt="altprofile"
                                size="xl"
                                className="w-24 h-24 mx-auto"
                              />
                            </Badge>
                            <Typography className="text-lg mt-2">
                              {user?.userId.name ? user.userId.name : "Anonymous"}
                            </Typography>
                          </CardHeader>
                          {user.userId.location || user.userId.bio ? (
                            <CardBody className="m-0 p-0 border-b-2 rounded-none pb-2">
                              {user.userId.bio && (
                                <Typography className="flex items-center">
                                  <BsBuildingsFill />
                                  <span className="ml-1">
                                    {user.userId.bio}
                                  </span>
                                </Typography>
                              )}
                              {user.userId.location && (
                                <Typography className="flex items-center">
                                  <IoLocationSharp />
                                  <span className="ml-1">
                                    {user.userId.location}
                                  </span>
                                </Typography>
                              )}
                            </CardBody>
                          ) : null}
                          <CardFooter className="m-0 p-0 mx-auto">
                            <Button
                              size="sm"
                              className="px-2 py-1 font-light rounded-md hidden xl:block"
                              color="light-blue"
                              onClick={() => setUserExpand(user.userId)}
                            >
                              Show Details
                            </Button>
                            <Button
                              size="sm"
                              className="px-2 py-1 font-light rounded-md xl:hidden block"
                              color="light-blue"
                              onClick={() => {
                                setUserExpand(user.userId);
                                handleProfileExpand();
                              }}
                            >
                              Show Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ) : null}
                    </div>
                  ))}
                </div>
                </div>
              </div>
              <div className="w-1/4 hidden xl:block">
                <ProfileExpand
                  user={userExpand}
                  isShortListing={isShortListing}
                  setCandidateEmail={setCandidateEmail}
                  setCandidateId={setCandidateId}
                  // shortListCandidate={shortListCandidate}
                  jobTitle={job.jobTitle}
                  organizationName={job.organizationName}
                  jobId={job._id}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-[80vh]">
              <Typography className="my-4 text-3xl font-semibold">
                Please Sign In to see this page
              </Typography>
              <Button onClick={() => navigate("/signin")} color="blue">
                Sign In
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[80vh]">
          <Typography className="my-4 text-3xl font-semibold">
            Please Sign In to see this page
          </Typography>
          <Button onClick={() => navigate("/signin")} color="blue">
            Sign In
          </Button>
        </div>
      )}
      <Dialog
        open={profileExpand}
        handler={handleProfileExpand}
        className="bg-transparent shadow-none"
        size="xs"
      >
        <ProfileExpand user={userExpand} />
      </Dialog>
      <Toaster position="top-right" />
    </div>
  );
};

export default ViewApplications;
