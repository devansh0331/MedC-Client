import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
const ProfileAbout = (props) => {
  return (
    <Card className="">
      <div className="flex justify-end pt-2 px-2 m-0 cursor-pointer"><FaRegEdit /></div>
   <Card className="flex min-w-96 bg-white p-4">
    <CardHeader
     className="flex m-0 w-full rounded-none"
     floated={false}
     shadow={false}
     color="transparent"
     animate={{
      mount: { scale: 1, y: 0 },
      unmount: { scale: 0.9, y: -100 },
     }}
    >
      <Typography className="text-lg font-semibold border-b-2 w-full">About</Typography>
     </CardHeader>
     <CardBody className="flex w-full m-0 p-0 overflow-scroll">
      {props.about}
     </CardBody>
   </Card>
    </Card>
  );
};

export default ProfileAbout;
