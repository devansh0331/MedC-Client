import { Card, Carousel, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import BlogBG from "../assets/BlogBG.png";
import BlogBG2 from "../assets/BlogBG2.png";
import BlogBG3 from "../assets/BlogBG3.png";
import professional from "../assets/professional.png";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/blog/all-blogs`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const res = await response.json();
      if (res.success) {
        setBlogs(res.data);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Card className="h-4/5 rounded-lg">
      <div className="">
        <Typography className="text-xl font-semibold m-2">New Blogs</Typography>
      </div>
      <div className="w-full h-full relative flex justify-center">
        <Carousel autoplay loop className="w-full h-full">
          {blogs.map((blog, index) => (
            <>
              {blog.coverImage && (
                <div className="w-full h-full">
                  <img
                    src={blog?.coverImage}
                    alt="blog"
                    className="rounded-b-lg h-full w-full object-cover"
                  />
                </div>
              )}
            </>
          ))}
        </Carousel>
      </div>
    </Card>
  );
};

export default BlogCard;
