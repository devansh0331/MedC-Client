import React, { useEffect } from "react";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import JobCard from "../components/JobCard";
import { SERVER_URL } from "../ServerURL";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function FeedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${SERVER_URL}/auth/is-user`, { credentials: "include" }).then(
      (res) =>
        res.json().then((res) => {
          console.log(res);
          if (res != true) {
            toast.error(res);
            navigate("/signin");
          }
        })
    );
  }, []);
  return (
    <div className="w-screen h-screen  bg-offWhite ">
      <div className="w-full h-full flex items-start justify-between pt-24 px-3">
        {/* SIDEBAR */}
        <div className="hidden md:block">Sidebar</div>

        {/* POSTS FEED */}
        <div className="w-full md:w-8/12 h-full grid grid-cols-1 gap-4 overflow-y-scroll">
          <div className="bg-white rounded-md">
            <CreatePost />
          </div>
          <div className="bg-white rounded-md">
            <PostCard />
          </div>
          <div className="bg-white rounded-md">
            <PostCard />
          </div>
          <div className="bg-white rounded-md">
            <PostCard />
          </div>
          <div className="bg-white rounded-md">
            <PostCard />
          </div>
        </div>

        {/* JOBS FOR YOU */}
        <div className="hidden md:grid grid-cols-1 w-3/12 h-4/5 max-h-1/2 bg-white rounded-md">
          <div className="p-6">
            <h1 className="text-3xl font-extrabold">Jobs For You</h1>
          </div>
          <hr />
          <div className="md:grid grid-cols-1  overflow-y-scroll">
            <div className="">
              <JobCard />
              <hr className="mx-3" />
            </div>
            <div className="">
              <JobCard />
              <hr className="mx-3" />
            </div>
            <div>
              <JobCard />
              <hr className="mx-3" />
            </div>
            <div>
              <JobCard />
              <hr className="mx-3" />
            </div>
            <div>
              <JobCard />
              <hr className="mx-3" />
            </div>
            <div>
              <JobCard />
              <hr className="mx-3" />
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-lg text-center text-primary">View all</h1>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default FeedPage;