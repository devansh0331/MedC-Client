import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const ProfileCardSkeleton = () => {
  return (
    <Card className="min-w-80 animate-pulse p-4">
      <CardHeader
        shadow={false}
        floated={false}
        className="flex flex-col items-center m-0 pb-2 mb-2 rounded-none justify-around border-b-2"
      >
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-5"></div>
        <Typography
          as="div"
          variant="h1"
          className="mb-4 h-3 w-52 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="h1"
          className="mb-2 h-2 w-44 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col px-4 py-3 gap-2 border-b-2 mb-2">
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
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </CardBody>
      <CardBody className="flex flex-col px-4 py-3 gap-2 border-b-2 mb-2">
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
      </CardBody>
      <CardFooter className="flex px-4 py-2 mt-1 justify-center ">
        <Button      
          tabIndex={-1}
          color="gray"
          className="h-8 w-20 bg-gray-300 cursor-default shadow-none"
        >
          &nbsp;
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCardSkeleton;
