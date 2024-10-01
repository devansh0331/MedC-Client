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

const ViewApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [userExpand, setUserExpand] = useState({});
  const { allUsers, getAllUsers, userInfo } = useContext(UserContext);
  const [jobOpen, setJobOpen] = useState(false);
  const [profileExpand, setProfileExpand] = useState(false);

  const handleProfileExpand = () => {
    setProfileExpand(!profileExpand);
  };
  const getAllJobs = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/job/all-jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      // console.log(res)
      if (res.success) {
        setJobs(res.jobs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  useEffect(() => {
    setUserExpand(allUsers[0]);
  }, [allUsers]);

  useEffect(() => {
    getAllUsers();
  }, [userInfo]);

  return (
    <div className="flex md:overflow-y-hidden z-0 bg-background h-[90vh] w-full overflow-y-scroll scrollbar-thin">
      <SideBar />
      <div className="flex w-[92%] lg:w-[90%] 2xl:w-[80%] mx-auto h-full gap-6 justify-center mt-5">
        <div className="lg:w-1/3 w-2/5 hidden md:block">
          <JobCardSingle job={jobs[0]} route={"ViewApplications"} />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 md:w-3/5">
          <Accordion
            onClick={() => setJobOpen(!jobOpen)}
            open={jobOpen}
            className="bg-white mb-2 rounded-lg px-4  md:hidden"
            icon={<FaChevronDown />}
          >
            <AccordionHeader className="border-none">
              {jobs[0]?.jobTitle}, {jobs[0]?.organziationName}
            </AccordionHeader>
            <AccordionBody>
              <JobCardSingle job={jobs[0]} route={"ViewApplications"} />
            </AccordionBody>
          </Accordion>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 overflow-visible md:overflow-y-scroll max-h-[80vh] scrollbar-thin gap-3">
            {allUsers.map((user, index) => (
              <>
                {user.name != "" ? (
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
                          src={user.profileURL ? user.profileURL : altprofile}
                          alt="altprofile"
                          size="xl"
                          className="w-24 h-24 mx-auto"
                        />
                      </Badge>
                      <Typography className="text-lg mt-2">
                        {user.name}
                      </Typography>
                    </CardHeader>
                    {user.location || user.bio ? (
                      <CardBody className="m-0 p-0 border-b-2 rounded-none pb-2">
                        {user.bio && (
                          <Typography className="flex items-center">
                            <BsBuildingsFill />
                            <span className="ml-1">{user.bio}</span>
                          </Typography>
                        )}
                        {user.location && (
                          <Typography className="flex items-center">
                            <IoLocationSharp />
                            <span className="ml-1">{user.location}</span>
                          </Typography>
                        )}
                      </CardBody>
                    ) : null}
                    <CardFooter className="m-0 p-0 mx-auto">
                      <Button
                        size="sm"
                        className="px-2 py-1 font-light rounded-md hidden xl:block"
                        color="light-blue"
                        onClick={() => setUserExpand(user)}
                      >
                        Show Details
                      </Button>
                      <Button
                        size="sm"
                        className="px-2 py-1 font-light rounded-md xl:hidden block"
                        color="light-blue"
                        onClick={() => {
                          setUserExpand(user);
                          handleProfileExpand();
                        }}
                      >
                        Show Details
                      </Button>
                    </CardFooter>
                  </Card>
                ) : null}
              </>
            ))}
          </div>
        </div>
        <div className="w-1/4 hidden xl:block">
          <ProfileExpand user={userExpand} />
        </div>
      </div>
      <Dialog
        open={profileExpand}
        handler={handleProfileExpand}
        className="bg-transparent shadow-none"
        size="xs"
      >
        <ProfileExpand user={userExpand} />
      </Dialog>
    </div>
  );
};

export default ViewApplications;
