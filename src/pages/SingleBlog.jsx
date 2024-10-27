import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import BlogCard from "../components/BlogCard";
import SingleBlogCard from "../components/SingleBlogCard";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";

const SingleBlog = () => {
  const blogId = useParams().id;
  const [blog, setBlog] = useState({});

  const getSingleBlog = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/blog/single-blog/get/${blogId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const res = await response.json();

      if (res.success) {
        setBlog(res.data);
        console.log(res.data);
        
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, [blogId]);

  return (
    <div className="w-full h-[90vh] overflow-y-scroll scrollbar-thin flex bg-background">
      <SideBar />
      <div className="flex w-[80%] mx-auto gap-4 mt-5 justify-center mb-5">
        <div className="w-4/5">
          <SingleBlogCard />
        </div>
        <div className="w-56">{/* <BlogCard/> */}</div>
      </div>
    </div>
  );
};

export default SingleBlog;
