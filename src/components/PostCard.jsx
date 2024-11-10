import React, { useContext, useEffect, useState } from "react";
import altprofile from "../assets/altprofile.png";
import SinglePostCard from "./SinglePostCard";
import CreatePostPopUp from "./CreatePostPopUp";
import ReactTimeAgo from "react-time-ago";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { Card, Input } from "@material-tailwind/react";
import SinglePostSkeleton from "./SinglePostSkeleton";
import { motion, useAnimation, useScroll } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { SERVER_URL } from "../ServerURL";

function PostCard() {
  const [open, setOpen] = useState(false);
  const { getPosts, handleLike, user, userInfo } = useContext(UserContext);
  // console.log(userInfo);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState();

  useEffect(() => {
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
    };
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  const fetchInitialPosts = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/newposts/posts`);
      const res = await response.json();
      console.log("Call");
      console.log(res);
      setPosts(res);
    } catch (error) {
      console.error("Failed to fetch posts");
    }
  };
  async function getData() {
    fetch(`${SERVER_URL}/newposts/posts?page=${page}`)
      .then((response) => response.json())
      .then((data) => setPosts((prev) => [...prev, ...data]))
      .catch((err) => console.log(err));
  }
  const fetchMoreData = () => setPage((prev) => prev + 1);

  const updateCurrentData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/newposts/posts?page=${page}`);
      const data = await response.json();

      // setPosts()
      setPosts((prevPosts) => [...prevPosts, ...data]);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };
  return (
    <div className="flex flex-col flex-wrap max-w-[100vw] mx-auto mt-5 bg-inherit">
      {userInfo.state && (
        <div
          id="navbar"
          className="relative"
          style={{ transition: "all 0.5s ease-in-out" }}
        >
          <Card
            className="flex flex-row gap-4 w-full bg-white py-2 items-center rounded-md shadow-md px-4 mb-2 top-0"
            id="sub-nav"
            style={{ transition: "all 0.5s ease-in-out" }}
          >
            <Link to={`/user/${user._id}`}>
              <img
                src={user.profileURL ? user.profileURL : altprofile}
                className="rounded-full h-10 md:h-11 w-10 md:w-11 profile-pic"
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
            <CreatePostPopUp
              open={open}
              setOpen={setOpen}
              getAllPosts={() => {
                setPosts([]);
                setPage(1);
                getData();
              }}
            />
          </Card>
        </div>
      )}
      <div
        className="flex flex-col w-full h-[82vh] overflow-y-scroll overflow-auto scrollbar-invisible overflow-x-hidden"
        id="posts"
      >
        {posts.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            {/* <p className="font-bold text-lg">No Posts Available!</p> */}
            <SinglePostSkeleton />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<div>Loading...</div>}
            scrollableTarget="posts"
            className="flex flex-col w-full gap-2"
          >
            {posts.map((post, key) => (
              <SinglePostCard
                key={key}
                post={post}
                postId={post._id}
                userId={user._id}
                parentFunction={() => {
                  setPosts([]);
                  setPage(1);
                  getData();
                }}
              />
            ))}
          </InfiniteScroll>
        )}
        <Toaster className="z-30 mt-20" position="top-right" />
      </div>
    </div>
  );
}

export default PostCard;
