import { Card, Carousel, Typography } from "@material-tailwind/react";
import React from "react";
import BlogBG from "../assets/BlogBG.png";
import BlogBG2 from "../assets/BlogBG2.png";
import BlogBG3 from "../assets/BlogBG3.png";
import professional from "../assets/professional.png";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";

const BlogCard = () => {
  return (
    <Card className="h-4/5 rounded-lg">
      <div className="">
        <Typography className="text-xl font-semibold m-2">New Blogs</Typography>
      </div>
      <div className="w-full h-full relative flex justify-center">
        <Carousel navigation={false} autoplay loop className="w-full h-full">
          <div className="w-full h-full">
            <img
              src={BlogBG}
              alt="blog"
              className="rounded-b-lg h-full w-full object-cover"
            />
          </div>
          <div className="w-full h-full">
            <img
              src={BlogBG2}
              alt="blog"
              className="rounded-b-lg h-full w-full object-cover"
            />
          </div>
          <div className="w-full h-full">
            <img
              src={BlogBG3}
              alt="blog"
              className="rounded-b-lg h-full w-full object-cover"
            />
          </div>
          <div className="w-full h-full">
            <img
              src={professional}
              alt="blog"
              className="rounded-b-lg h-full w-full object-cover"
            />
          </div>
        </Carousel>
      </div>
    </Card>
  );
};

export default BlogCard;
