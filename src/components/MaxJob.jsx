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
        <button className="select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Search</button>
      </Card>
      <div className="w-full h-[75vh] overflow-y-scroll scrollbar-thin bg-background">
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
