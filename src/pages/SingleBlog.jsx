import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import BlogCard from "../components/BlogCard";
import SingleBlogCard from "../components/SingleBlogCard";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";

const SingleBlog = () => {
  const blogId = useParams();
  const [blog, setBlog] = useState({});

  const getSingleBlog = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/blog/single-blog/get/${blogId.id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const res = await response.json();
     
      if (res.success) {
        setBlog(res.data);       
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
      <div className="flex w-full md:w-[95%] xl:w-[80%] mx-auto mt-5 justify-center gap-10 mb-5">
        <div className="w-[95%] lg:w-4/5 mx-auto">
          <SingleBlogCard blog={blog} />
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
