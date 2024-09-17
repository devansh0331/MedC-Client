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
  const { getPosts, posts, handleLike, user } = useContext(UserContext);
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();

  useEffect(() => {
    getPosts();
    const threshold = 100; // Adjust this threshold as needed

    scrollY.onChange((latest) => {
      if (latest > threshold) {
        navAnimation.set("hidden"); // Hide nav when scrolled past threshold
      } else {
        navAnimation.set("visible"); // Show nav when scrolled back above threshold
      }
    });
  }, [scrollY, getPosts]);

  return (
    <div
      className="w-full flex flex-col mx-auto mt-5 bg-inherit h-[82vh] overflow-y-scroll scrollbar-invisible"
      id="posts"
    >
      <motion.div
        id="postsnav"
        animate={navAnimation}
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -80, opacity: 0 }, // Adjust y offset and opacity as needed
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className=""
      >
        <Card className="flex flex-row gap-4 w-full bg-white py-2 items-center rounded-md shadow-md px-4">
          <Link to={`/user/${user._id}`}>
            <Avatar
              src={user.profileURL ? user.profileURL : altprofile}
              className="rounded-full h-10 md:h-11 w-10 md:w-11"
              alt="profile"
            />
          </Link>
          <Input
            type="text"
            className="w-4/5 border-2 border-gray-500 rounded-md px-2 py-1 md:py-1"
            label="Create Post"
            onClick={() => setOpen(!open)}
            onChange={() => setOpen(!open)}
          />
          <CreatePostPopUp open={open} setOpen={setOpen} getAllPosts={getPosts} />
        </Card>
      </motion.div>
      <div className="flex flex-col w-full">
        {posts.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            {/* <p className="font-bold text-lg">No Posts Available!</p> */}
            <SinglePostSkeleton />
          </div>
        ) : (
          <>
            {posts.map((post, key) => (
              <SinglePostCard
                key={key}
                post={post}
                postId={post._id}
                userId={user._id}
                parentFunction={getPosts}
              />
            ))}
          </>
        )}
        <Toaster className="z-30 mt-20" position="top-right" />
      </div>
    </div>
  );
}

export default PostCard;