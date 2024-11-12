import { Card, Carousel, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/blog/all-blogs`, {
        method: "GET",
        // credentials: "include",
        // headers: {
        //   Authorization: `Bearer ${Cookies.get("token")}`,
        // },
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
    <Card className="h-96 rounded-lg">
      <div className="">
        <Typography className="text-xl font-semibold m-2">New Blogs</Typography>
      </div>
      <div className="w-full h-full relative flex justify-center">
        <Carousel autoplay loop className="w-full h-full">
          {blogs.map((blog, index) => (
            <div key={index} className="w-full h-full">
              {blog.coverImage && (
                <div className="w-full h-full">
                  <img
                    src={blog?.coverImage}
                    alt="blog"
                    className="rounded-b-lg h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </Card>
  );
};

export default BlogCard;
