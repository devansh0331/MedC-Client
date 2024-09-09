import React from "react";
import { Avatar, Card, Typography } from "@material-tailwind/react";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
const SinglePostSkeleton = () => {
  return (
    <Card className="w-full animate-pulse p-4 my-2">
      <div className="w-full flex h-auto items-center justify-between">
        <div className="flex items-center">
          <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
          <Typography
            as="div"
            variant="h1"
            className="h-3 w-56 rounded-full bg-gray-300 ml-4"
          >
            &nbsp;
          </Typography>
        </div>
        <Typography
          as="div"
          variant="paragraph"
          className="h-3 w-10 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </div>
      <div className="py-4 px-2">
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-full rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-full rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-full rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      </div>
      <div className="w-full h-72 bg-gray-300 rounded-lg"></div>
      <div className="flex items-center px-6 py-4 gap-6 justify-between">
        <div className="text-gray-300"><AiFillLike className="w-5 h-5"/></div>
        <div className="text-gray-300"><FaRegCommentAlt className="w-5 h-5"/></div>
        <div className="text-gray-300"><IoPaperPlaneOutline className="w-5 h-5"/></div>
      </div>
    </Card>
  );
};

export default SinglePostSkeleton;
