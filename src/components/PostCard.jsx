import React, { useContext, useEffect, useState } from "react";
import altprofile from "../assets/altprofile.png";
import SinglePostCard from "./SinglePostCard";
import CreatePostPopUp from "./CreatePostPopUp";
import ReactTimeAgo from "react-time-ago";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { Avatar, Card, Input } from "@material-tailwind/react";
import SinglePostSkeleton from "./SinglePostSkeleton";
import { motion, useAnimation, useScroll } from "framer-motion";

function PostCard() {
  const [open, setOpen] = useState(false);
  const { getPosts, posts, handleLike, user, userInfo } = useContext(UserContext);
  // console.log(userInfo);


  useEffect(() => {
    getPosts();

    const mainContainer = document.getElementById("posts");
    let prevScrollPos = document.getElementById("posts").scrollTop;
    
    mainContainer.onscroll = () => {
      let currentScrollPos = document.getElementById("posts").scrollTop;
      if (prevScrollPos > currentScrollPos) {
        document.getElementById("navbar").classList.remove("h-0");
        document.getElementById("sub-nav").classList.remove("-top-30");
        document.getElementById("sub-nav").classList.add("top-0");
      } else {
        document.getElementById("navbar").classList.add("h-0");
        document.getElementById("sub-nav").classList.add("-top-30");
        document.getElementById("sub-nav").classList.remove("top-0");
      }
      prevScrollPos = currentScrollPos;
    }
  }, []);

  return (
    <div
      className="w-full flex flex-col mx-auto mt-5 bg-inherit relative"
    >
      {userInfo.state && (  
      <div id="navbar" className="relative" style={{transition: "all 0.5s ease-in-out"}}>
        <Card className="flex flex-row gap-4 w-full bg-white py-2 items-center rounded-md shadow-md px-4 mb-2 top-0" id="sub-nav"
        style={{transition: "all 0.5s ease-in-out"}}>
          <Link to={`/user/${user._id}`}>
            <Avatar
              src={user.profileURL ? user.profileURL : altprofile}
              className="rounded-full h-10 md:h-11 w-10 md:w-11"
              alt="profile"
            />
          </Link>
          <input
            placeholder="Create Post"
            className="w-4/5 border-gray-500 rounded-md px-2 py-1 md:py-1 flex gap-2 justify-between border-[1px] h-10 p-2 items-center text-blue-gray-500 text-sm"
            type="text"
            onClick={() => setOpen(!open)}
            onChange={() => setOpen(!open)}
          />
          <CreatePostPopUp open={open} setOpen={setOpen} getAllPosts={getPosts} />
        </Card>
      </div>
      )}
      <div className="flex flex-col w-full h-[82vh] overflow-y-scroll scrollbar-invisible" id="posts">
        {posts.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            {/* <p className="font-bold text-lg">No Posts Available!</p> */}
            <SinglePostSkeleton />
          </div>
        ) : (
          <div className="flex flex-col w-full gap-2">
            {posts.map((post, key) => (
              <SinglePostCard
                key={key}
                post={post}
                postId={post._id}
                userId={user._id}
                parentFunction={getPosts}
              />
            ))}
          </div>
        )}
        <Toaster className="z-30 mt-20" position="top-right" />
      </div>
    </div>
  );
}

export default PostCard;