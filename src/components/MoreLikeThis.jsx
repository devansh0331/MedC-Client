import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import SingleJobCard from "./SingleJobCard";
import { SERVER_URL } from "../ServerURL";
const MoreLikeThis = (props) => {
  const [jobs, setJobs] = useState([]);
  const getAllJobs = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/job/all-jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res.success) {
        setJobs(res.jobs);
        // Remove the props.jobId from the jobs array
        const filteredJobs = res.jobs.filter((job) => job._id !== props.jobId);
        setJobs(filteredJobs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, [props.jobId]);

  return (
    <Card className="bg-inherit h-2/3 lg:flex hidden flex-col items-center mx-auto shadow-none">
      <Card className="w-full flex items-center justify-center bg-white rounded-md">
        <div className="flex w-11/12 my-1 justify-between items-center">
          <Typography className="text-xl w-full font-semibold">
            More Like This
          </Typography>
        </div>
      </Card>
      <div className="w-full overflow-y-scroll scrollbar-thin flex flex-col items-center">
        {jobs.map((job) => (
          <SingleJobCard job={job} key={job._id} />
        ))}
      </div>
    </Card>
  );
};

export default MoreLikeThis;
