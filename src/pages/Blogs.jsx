import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Card, Typography } from "@material-tailwind/react";
import BlogBG from "../assets/BlogBG.png";
import BlogBG2 from "../assets/BlogBG2.png";
import BlogBG3 from "../assets/BlogBG3.png";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const navigate = useNavigate();
  const Blogs = [
    { img: BlogBG, color: "rgba(76, 175, 80, 0.8)", text: "black" },
    { img: BlogBG3, color: "rgba(255, 91, 0, 0.9)", text: "white" },
    { img: BlogBG2, color: "rgba(53, 74, 33, 0.8)", text: "white" },
    { img: BlogBG3, color: "rgba(255, 91, 0, 0.9)", text: "white" },
  ];

  return (
    <div className="w-full h-[90vh] overflow-y-scroll scrollbar-thin flex bg-background">
      <SideBar />
      <div className="w-[80%] grid grid-cols-4 mx-auto h-full gap-10 justify-center mt-5">
        {Blogs.map((blog, index) => (
          <Card
            key={index}
            className="w-56 h-[500px] flex flex-col justify-start relative mx-auto cursor-pointer"
            onMouseEnter={() => setHoveredCardIndex(index)}
            onMouseLeave={() => setHoveredCardIndex(null)}
            onClick={() => navigate("/blog/:id")}
          >
            <img
              src={blog.img}
              className="rounded-lg h-full w-full object-cover"
            />
            <div
              className={`p-2  bg-opacity-85 absolute rounded-lg bottom-0`}
              style={{
                transition: "all 0.5s ease-in-out",
                backgroundColor: `${blog.color}`,
              }}
            >
              <Typography className={`text-xl font-semibold text-${blog.text}`}>
                Lorem ipsum dolor sit amet.{" "}
              </Typography>
              <Typography
                className={`text-sm text-${blog.text}`}
                style={{
                  transition: "height 0.5s ease-in-out",
                  height: hoveredCardIndex === index ? "120px" : "0",
                  overflow: "hidden",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt distinctio dolor iusto? Laborum tempora quo consequatur
                fugit doloribus eius reiciendis iusto ipsam illum ipsum
                officiis, temporibus iure nobis recusandae natus?
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
