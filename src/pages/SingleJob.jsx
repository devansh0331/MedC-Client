import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import JobCard from "../components/JobCard";
import MoreLikeThis from "../components/MoreLikeThis";
import SingleJobCard from "../components/SingleJobCard";
import JobCardSingle from "../components/JobCardSingle";
// import JobNav from '../components/JobNav'
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../ServerURL";

const SingleJob = (props) => {
  const jobId = useParams();
  const [job, setJob] = useState([]);
  const [isArchived, setIsArchived] = useState(false);

  const getSingleJob = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/job/single-job/${jobId.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res.success) {
        setJob(res.job);
        setIsArchived(res.job.archived);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleJob();
    // console.log(jobId.id)
  }, [jobId]);

  return (
    <div className="w-full h-[90vh] flex bg-background overflow-y-hidden">
      <SideBar />
      <div className="flex w-[95%] 2xl:w-[90%] mx-auto h-full gap-6 justify-center mt-5">
        <div className="w-full lg:w-2/4 xl:w-3/5 flex flex-col gap-3">
          <div className="overflow-y-scroll scrollbar-thin flex flex-col gap-3 mb-5">
            {/* <JobNav/> */}
            {isArchived ? (
              <div className="w-full flex items-center justify-center">
                <h1 className="text-2xl font-semibold text-light-blue-400">
                  This job is not longer available.
                </h1>
              </div>
            ) : (
              <JobCardSingle job={job} parentFunction={getSingleJob} />
            )}
          </div>
        </div>
        <div className="w-96 hidden lg:block lg:w-80">
          <MoreLikeThis jobId={jobId.id} />
        </div>
      </div>
    </div>
  );
};

export default SingleJob;
