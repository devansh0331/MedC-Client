import {
  Card,
  CardHeader,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import MaxJobCard from "../components/MaxJobCard";
import SideBar from "../components/SideBar";
import MoreLikeThis from "../components/MoreLikeThis";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../ServerURL";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";

const Saves = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const getSavedJobs = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/userjob/get-saved-jobs/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const res = await response.json();
      if (res.success) {
        setSavedJobs(res.savedJobs);
        console.log(res.savedJobs);
      }
      if (!res.success) {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAppliedJobs = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/userjob/get-applied-jobs/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const res = await response.json();
      if (res.success) {
        setAppliedJobs(res.appliedJobs);
      }else{
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);  
    }
  }

  const getPostedJobs = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/userjob/get-posted-job/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const res = await response.json();
      if (res.success) {
        setPostedJobs(res.postedJobs);
      }else{
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedJobs();
    getAppliedJobs();
    getPostedJobs();
    console.log(postedJobs);
    
  }, [user._id]);

  return (
    <div className="flex overflow-y-hidden bg-background h-[90vh]">
      <SideBar />
      <div className="w-[75%] flex gap-4 justify-center mt-5 mx-auto">
        <Card className="h-min">
          <List className="w-1/4">
            <ListItem
              className={`${
                activeItem === 0
                  ? "font-semibold bg-gray-100"
                  : "font-normal text-gray-600"
              }`}
              onClick={() => setActiveItem(0)}
            >
              Saved Jobs
            </ListItem>
            <ListItem
              className={`${
                activeItem === 1
                  ? "font-semibold bg-gray-100"
                  : "font-normal text-gray-600"
              }`}
              onClick={() => setActiveItem(1)}
            >
              Applied Jobs
            </ListItem>
            <ListItem
              className={`${
                activeItem === 2
                  ? "font-semibold bg-gray-100"
                  : "font-normal text-gray-600"
              }`}
              onClick={() => setActiveItem(2)}
            >
              Posted Jobs
            </ListItem>
          </List>
        </Card>
        <Card className="w-2/4 bg-inherit">
          <Typography className="text-2xl font-semibold text-gray-800 flex items-center py-2 px-3 m-0 bg-white rounded-lg">
            {activeItem == 0
              ? "Saved Jobs"
              : activeItem == 1
              ? "Applied Jobs"
              : "Posted Jobs"}
          </Typography>
          <div className=" overflow-y-scroll scrollbar-thin">
            {activeItem == 0 && (
              <>
                {savedJobs?.map((job) => (
                  <MaxJobCard parent="Saved" job={job.jobId} parentFunction={getSavedJobs} />
                ))}
              </>
            )}
            {activeItem == 1 && (
              <>
                {appliedJobs?.map((job, index) => (
                  <MaxJobCard parent="Applied" job={job.jobId} key={index} parentFunction={getAppliedJobs} />
                ))}
              </>
            )}
            {activeItem == 2 && (
              <>
                {postedJobs?.map((job, index) => (
                  <MaxJobCard parent="Posted" job={job.jobId} key={index} parentFunction={getPostedJobs} />
                ))}
              </>
            )}
          </div>
        </Card>
        <div className="w-2/6">
          <MoreLikeThis className="" />
        </div>
      </div>
    </div>
  );
};

export default Saves;
