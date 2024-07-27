import React from "react";
import MaxJobCard from "./MaxJobCard";
import { IoMdSearch } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import { FaExpand } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Button, Card, Input } from "@material-tailwind/react";
const MaxJob = () => {
  return (
    <Card className="w-full flex flex-col mx-auto mt-5 py-1 bg-white rounded-md shadow-md">
      <Card className="w-full flex flex-row items-center justify-center gap-3 px-3 py-2 rounded-md">
        <Input
        label="Search Jobs"
        icon={<IoMdSearch />}
        />
        <Input
        label="Location"
        icon={<GrLocation />}
        />
        <Button size="sm" color="blue">Search</Button>
      </Card>
      <div className="w-full h-screen overflow-y-scroll scrollbar-thin bg-background">
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
        <MaxJobCard />
      </div>
    </Card>
  );
};

export default MaxJob;
