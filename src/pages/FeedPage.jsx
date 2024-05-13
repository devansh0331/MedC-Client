import React from "react";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

function FeedPage() {
  return (
    <div className="w-screen h-screen  bg-offWhite ">
      <div className="w-full h-full flex items-start justify-between pt-24 px-3">
        <div className="hidden md:block">Sidebar</div>
        <div className="w-full md:w-7/12 h-full grid grid-cols-1 gap-4 overflow-y-scroll">
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
        <div className="hidden md:block">Job Alert</div>
      </div>
    </div>
  );
}

export default FeedPage;
