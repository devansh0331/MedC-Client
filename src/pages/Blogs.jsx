import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const Blogs = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const navigate = useNavigate();
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
    <div className="w-full h-[90vh] overflow-y-scroll scrollbar-thin flex bg-background pb-5">
      <SideBar />
      <div className="w-[80%] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto gap-10 justify-center my-5 mb-5">
        {blogs.map((blog, index) => (
          <>
            {blog.coverImage && (
              <Card
                key={index}
                className="h-64 flex flex-col justify-start relative mx-auto cursor-pointer"
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                <img
                  src={blog.coverImage}
                  className="rounded-lg h-full w-full object-cover"
                />
                <div
                  className={`p-2 bg-opacity-85 absolute rounded-lg bottom-0 bg-white`}
                  style={{
                    transition: "all 0.5s ease-in-out",
                  }}
                >
                  <Typography
                    className={`text-base lg:text-xl font-semibold text-gray-900`}
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    className={`text-sm text-gray-700`}
                    style={{
                      transition: "height 0.5s ease-in-out",
                      height: hoveredCardIndex === index ? "120px" : "0",
                      overflow: "hidden",
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></Typography>
                </div>
              </Card>
            )}
          </>
        ))}
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Blogs;
