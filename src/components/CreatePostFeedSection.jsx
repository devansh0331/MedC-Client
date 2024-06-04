import { Input } from "@material-tailwind/react";
import React from "react";
import altprofile from "../assets/altprofile.png";

function CreatePostFeedSection(props) {
  return (
    <div className="w-full flex  items-center justify-evenly p-6 shadow-md">
      <div>
        <img
          src={props.profileURL != "" ? props.profileURL : altprofile}
          alt=""
          className="rounded-full h-12 md:h-16 w-12 md:w-16 object-cover object-center"
        />
      </div>
      <div className="w-full pl-3 md:pl-0 md:w-5/6" onClick={props.handleOpen}>
        <Input
          type="text"
          placeholder='Post as "Devansh Shrivastava"'
          className="w-full !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
          labelProps={{
            className: "hidden",
          }}

          // containerProps={{ className: "min-w-[100px]" }}
        />
      </div>
    </div>
  );
}

export default CreatePostFeedSection;
