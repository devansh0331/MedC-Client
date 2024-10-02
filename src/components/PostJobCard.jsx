import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Switch,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import JobCardSingle from "./JobCardSingle";
import { Country, State, City } from "country-state-city";

const PostJobCard = () => {
  const [options, setOptions] = useState("");
  const [acceptingResponses, setAcceptingResponses] = useState(true);
  const [joiningPeriod, setJoiningPeriod] = useState("");
  const [joiningPeriodManual, setJoiningPeriodManual] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(false);
  const modules = {
    toolbar: [
      // [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline"],
      [
        // { list: "ordered" },
        { list: "bullet" },
        // { indent: "-1" },
        // { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    // clipboard: {
    //   // toggle to add extra line breaks when pasting HTML:
    //   matchVisual: false,
    // },
  };
  const CityArr = City.getCitiesOfCountry("IN");
  const StateArr = State.getStatesOfCountry("IN");
  const [location, setLocation] = useState("");

  return (
    <div className="bg-white p-4 w-full h-full rounded-lg overflow-y-visible">
      <div className="w-full flex flex-col md:flex-row h-full gap-6 mb-5">
        <div className="md:pr-4 flex flex-col gap-3 w-full md:w-2/5 md:border-r-2 h-full justify-between">
          <div className="flex flex-col gap-3 md: scrollbar-invisible">
            <Typography className="text-2xl text-black">
              Enter Job Details
            </Typography>
            {/* Job Title */}
            <Input label="Job Title" className="w-full" />
            {/* Company Name */}
            <Input label="Company Name" className="w-full" />
            {/* Location */}
            <select
              className="col-span-2 border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center text-blue-gray-500 text-sm"
              disabled={false}
              value={location}
              onChange={(e) => {
                // console.log(e.target.value);
                setLocation(e.target.value);
              }}
              size={1}
            >
              <option selected disabled value={""} key={0}>
                Location
              </option>
              {CityArr.map((city, index) => (
                <option key={index}>
                  {city.name},{" "}
                  {
                    StateArr.filter(
                      (state) => state.isoCode === city.stateCode
                    )[0]?.name
                  }
                </option>
              ))}
            </select>
            {/* Salary */}
            <div className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm">
              <span className="">Rs.</span>
              <input
                type="number"
                placeholder="Minimum"
                className="no-spinner w-[30%] active:border-none"
              />
              <span className="flex items-center">-</span>
              <input
                type="number"
                placeholder="Maximum (0 for fixed salary)"
                className="no-spinner w-[40%] active:border-none"
              />
              <select className="">
                <option>Yearly</option>
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
            </div>
            {/* Educational requirement */}
            <Input label="Educational requirement" className="w-full" />
            {/* Employment type */}
            <select className="col-span-2 border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center text-blue-gray-500 text-sm">
              <option selected disabled value={""} key={0}>
                Employment Type
              </option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
            </select>
            {/* Experience requirement */}
            <Input
              type="number"
              label="Minimum Experience"
              className="no-spinner"
            />
            {/* Last Date to apply */}
            <Input label="Last Date to Apply" type="date" />
            <Switch
              color="blue"
              checked={acceptingResponses}
              onChange={() => setAcceptingResponses(!acceptingResponses)}
              label="Accept Responses"
            />
          </div>
          <div className="w-full md:flex gap-4 hidden">
            <Button
              size="sm"
              color="blue"
              variant="outlined"
              onClick={() => setPreview(!preview)}
            >
              {preview ? "Edit" : "Preview"}
            </Button>
            <Button size="sm" color="blue">
              Post
            </Button>
          </div>
        </div>
        <div className="m-0 p-0 w-full md:w-3/5  scrollbar-invisible h-full">
        {preview ? (
          <div className="m-0 p-0 w-full ">
            <JobCardSingle />
          </div>
        ) : (
          <div className="m-0 p-0 md:pl-4 flex flex-col gap-3 h-full">
            <Typography className="text-2xl text-black">
              Enter Job Description
            </Typography>
            <ReactQuill
              className="react-quill h-[400px] md:h-4/5"
              modules={modules}
              value={description}
              placeholder="Enter Job Description"
              onChange={(newValue) => setDescription(newValue)}
            />
          </div>
        )}
        <div className="w-full flex gap-4 justify-start items-start pb-4 md:hidden">
            <Button
              size="sm"
              color="blue"
              variant="outlined"
              onClick={() => setPreview(!preview)}
            >
              {preview ? "Edit" : "Preview"}
            </Button>
            <Button size="sm" color="blue">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobCard;
