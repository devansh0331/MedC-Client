import { Button, Card, Typography } from "@material-tailwind/react";
import React from "react";
import BlogBg from "../assets/BlogBG.png";

const SingleBlogCard = (props) => {
  return (
    <>
      <Card className="flex flex-col mx-auto" shadow={false}>
        <div className="">
          <img
            src={`${props?.blog?.coverImage}`}
            alt=""
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className=" p-4 pl-6">
          <Typography className="text-[42px] font-semibold text-gray-900">
            {props?.blog?.title}
          </Typography>
          <Typography className="text-lg text-gray-800 no-twp p-4" dangerouslySetInnerHTML={{__html: props?.blog?.content}}>
          </Typography>
        </div>
      </Card>
      {props.route === ""
       &&
      <div className="w-full flex justify-end pb-4 bg-white items-center px-4 gap-2">
        <Button className="" size="sm" color="blue" variant="outlined">
          Edit
        </Button>
        <Button className="" color="red" variant="outlined" size="sm">
          Delete
        </Button>
      </div>
       }
    </>
  );
};

export default SingleBlogCard;
