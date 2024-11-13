import React, { useContext, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import PostJobCard from "../components/PostJobCard";
import { UserContext } from "../UserContext";
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../ServerURL";

const EditJob = () => { 
    const { userInfo } = useContext(UserContext);
    const [job, setJob] = useState([]);
    const navigate = useNavigate();
    const jobId = useParams().id;

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

    useEffect(() => {
        getSingleJob();
    }, [jobId]);

  return (
    <div className="w-full flex bg-background md:h-[90vh] overflow-hidden">
      <SideBar/>
      {userInfo.state ? (
        <div className="flex w-full gap-4 justify-center overflow-y-scroll scrollbar-thin h-[90vh] mb-5">
          <div className="w-[98%] lg:w-[85%]  my-5">
            <PostJobCard jobId={jobId} route="Edit" />
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
    </div>
  )
}

export default EditJob
