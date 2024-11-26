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
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import JobCardSingle from "./JobCardSingle";
import { Country, State, City } from "country-state-city";
import { UserContext } from "../UserContext";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const PostJobCard = (props) => {
  const [jobTitle, setJobTitle] = useState("");
  const [organziationName, setOrganziationName] = useState("");
  const [location, setLocation] = useState("");
  const [minimumSalary, setMinimumSalary] = useState(0);
  const [maximumSalary, setMaximumSalary] = useState(0);
  const [salaryType, setSalaryType] = useState("Yearly");
  const [requiredQualification, setRequiredQualification] = useState("");
  const [employementType, setEmployementType] = useState("");
  const [minExperience, setMinExperience] = useState();
  const [lastDateToApply, setLastDateToApply] = useState("");
  const [description, setDescription] = useState("");
  const [acceptingResponses, setAcceptingResponses] = useState(true);

  const [preview, setPreview] = useState(false);
  const { user } = useContext(UserContext);
  const modules = {
    toolbar: [
      // [{ header: "1" }, { header: "2" }],
      // [{ size: [] }],
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

  // LOCATION CONSTANTS
  const CityArr = City.getCitiesOfCountry("IN");
  const StateArr = State.getStatesOfCountry("IN");
  const [locationArray, setLocationArray] = useState([]);
  const [locSuggestionbox, setLocSuggestionbox] = useState(false);
  const [fixedLocationArray, setFixedLocationArray] = useState(location);
  const locDropDown = useRef(null);

  const job = {
    user: user,
    jobTitle: jobTitle,
    organziationName: organziationName,
    location: location,
    minimumSalary: minimumSalary,
    maximumSalary: maximumSalary,
    salaryType: salaryType,
    requiredQualification: requiredQualification,
    employementType: employementType,
    minExperience: minExperience,
    lastDateToApply: lastDateToApply,
    description: description,
    noOfApplications: 0,
  };

  // LOCATION FUNCTIONS
  const buildLocationArr = () => {
    let locationSuggestionsArr = [];
    for (let i = 0; i < CityArr.length; i++) {
      locationSuggestionsArr.push(
        `${CityArr[i].name}, ${
          StateArr.filter((state) => state.isoCode === CityArr[i].stateCode)[0]
            ?.name
        }`
      );
    }
    setFixedLocationArray(locationSuggestionsArr);
    setLocationArray(locationSuggestionsArr);
  };

  const handleClickEvent2 = (event) => {
    if (locDropDown.current && !locDropDown.current.contains(event.target)) {
      setLocSuggestionbox(false);
    }
  };

  const locationSuggestions = (keyword) => {
    if (keyword.length == 0) setLocationArray([]);
    const filteredList = fixedLocationArray.filter((item) => {
      return item.toLowerCase().startsWith(keyword.toLowerCase());
    });
    setLocationArray(filteredList);
  };

  // USE EFFECTS
  useEffect(() => {
    document.addEventListener("click", handleClickEvent2);
    return () => {
      document.removeEventListener("click", handleClickEvent2);
    };
  }, []);

  useEffect(() => {
    buildLocationArr();
  }, []);

  const handlePostJob = async () => {
    if (
      Number(minimumSalary) > Number(maximumSalary) &&
      Number(maximumSalary) != 0
    ) {
      toast.error("Minimum salary cannot be greater than maximum salary");
      return;
    }
    if (
      jobTitle == "" ||
      organziationName == "" ||
      location == "" ||
      minimumSalary == "" ||
      maximumSalary == "" ||
      requiredQualification == "" ||
      employementType == "" ||
      minExperience == "" ||
      lastDateToApply == "" ||
      description == ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const response = await fetch(`${SERVER_URL}/job/create-job`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          user,
          jobTitle,
          organziationName,
          location,
          minimumSalary,
          maximumSalary,
          salaryType,
          requiredQualification,
          employementType,
          minExperience,
          lastDateToApply,
          description,
          archived: !acceptingResponses,
          userArchived: !acceptingResponses,
        }),
      });

      const data = await response.json();
      // console.log(data);
      if (!data.success) {
        console.log(data.error);
      } else {
        setJobTitle("");
        setOrganziationName("");
        setLocation("");
        setMinimumSalary("");
        setMaximumSalary("");
        setSalaryType("Yearly");
        setRequiredQualification("");
        setEmployementType("");
        setMinExperience();
        setLastDateToApply("");
        setDescription("");
        toast.success("Job posted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditJob = async () => {
    if (minimumSalary > maximumSalary && maximumSalary != 0) {
      toast.error("Minimum salary cannot be greater than maximum salary");
      return;
    }
    try {
      const response = await fetch(
        `${SERVER_URL}/job/edit-job/${props.jobId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            jobTitle,
            organziationName,
            location,
            minimumSalary,
            maximumSalary,
            salaryType,
            requiredQualification,
            employementType,
            minExperience,
            lastDateToApply,
            description,
            archived: !acceptingResponses,
            userArchived: !acceptingResponses,
          }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        console.log(data.error);
      } else {
        setJobTitle("");
        setOrganziationName("");
        setLocation("");
        setMinimumSalary(0);
        setMaximumSalary(0);
        setSalaryType("Yearly");
        setRequiredQualification("");
        setEmployementType("");
        setMinExperience(0);
        setLastDateToApply("");
        setDescription("");
        setAcceptingResponses(false);
        toast.success("Job edited successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleJob = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/job/single-job/${props.jobId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      if (res.success) {
        setJobTitle(res.job.jobTitle);
        setOrganziationName(res.job.organziationName);
        setLocation(res.job.location);
        setMinimumSalary(res.job.minimumSalary);
        setMaximumSalary(res.job.maximumSalary);
        setSalaryType(res.job.salaryType);
        setRequiredQualification(res.job.requiredQualification);
        setEmployementType(res.job.employementType);
        setMinExperience(res.job.minExperience);
        setLastDateToApply(res.job.lastDateToApply);
        setDescription(res.job.description);
        setAcceptingResponses(!res.job.archived);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (props.route == "Edit") {
      getSingleJob();
    }
  }, [props.jobId]);

  return (
    <div className="bg-white p-4 w-full h-full rounded-lg overflow-y-visible">
      <div className="w-full flex flex-col md:flex-row h-full gap-6 mb-5">
        <div className="md:pr-4 flex flex-col gap-3 w-full md:w-2/5 md:border-r-2 h-full justify-between">
          <div className="flex flex-col gap-3 md: scrollbar-invisible">
            <Typography className="text-2xl text-black">
              Enter Job Details
            </Typography>
            {/* Job Title */}
            <input
              placeholder="Job Title"
              className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
              onChange={(e) => setJobTitle(e.target.value)}
              value={jobTitle}
            />
            {/* Company Name */}
            <input
              placeholder="Company Name"
              className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
              onChange={(e) => setOrganziationName(e.target.value)}
              value={organziationName}
            />
            {/* Location */}
            <div className="col-span-2 relative">
              <input
                placeholder="Location"
                value={location || ""}
                type="text"
                className="col-span-2 w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
                onChange={(e) => {
                  setLocation(e.target.value);
                  locationSuggestions(e.target.value);
                  if (e.target.value.length > 2) setLocSuggestionbox(true);
                }}
                onKeyDown={(e) => {
                  if (locSuggestionbox) {
                    const selectedIndex = locationArray.findIndex(
                      (role) => role === location
                    );
                    switch (e.key) {
                      case "ArrowDown":
                        const nextIndex = Math.min(
                          selectedIndex + 1,
                          locationArray.length - 1
                        );
                        setLocation(locationArray[nextIndex]);
                        break;
                      case "ArrowUp":
                        const prevIndex = Math.max(selectedIndex - 1, 0);
                        setLocation(locationArray[prevIndex]);
                        break;
                      case "Enter":
                        setLocSuggestionbox(false);
                        break;
                      default:
                        break;
                    }
                  }
                }}
              />
              <IoClose
                className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setLocSuggestionbox(false);
                  setLocation("");
                }}
              />
              {locSuggestionbox && (
                <div
                  ref={locDropDown}
                  className="w-full border-[1px] border-gray-400 absolute bg-white z-10 rounded-md px-2 max-h-72 h-min overflow-y-scroll scrollbar-thin shadow-md"
                >
                  {locationArray.map((locationWord, index) => (
                    <div
                      className={`text-sm text-gray-600 border-b-[1px] border-gray-400 cursor-default hover:bg-blue-800 hover:text-white ${
                        location === locationWord
                          ? "bg-blue-800 text-white"
                          : "" // Highlight selected role
                      }`}
                      key={index}
                      onClick={() => {
                        setLocation(locationWord);
                        setLocSuggestionbox(false);
                      }}
                    >
                      {locationWord}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Salary */}
            <div className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm">
              <span className="">Rs.</span>
              <input
                type="number"
                placeholder="Minimum"
                className="no-spinner w-[30%] active:border-none"
                onChange={(e) => {
                  setMinimumSalary(e.target.value);
                }}
                value={minimumSalary}
              />
              <span className="flex items-center">-</span>
              <input
                type="number"
                placeholder="Maximum (0 for fixed salary)"
                className="no-spinner w-[40%] active:border-none"
                onChange={(e) => {
                  setMaximumSalary(e.target.value);
                }}
                value={maximumSalary}
              />
              <select
                className=""
                onChange={(e) => {
                  setSalaryType(e.target.value);
                }}
                value={salaryType}
              >
                <option>Yearly</option>
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
            </div>
            {/* Educational requirement */}
            <input
              placeholder="Educational requirement"
              className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
              onChange={(e) => setRequiredQualification(e.target.value)}
              value={requiredQualification}
            />
            {/* Employment type */}
            <select
              className="col-span-2 border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center text-blue-gray-500 text-sm"
              onChange={(e) => setEmployementType(e.target.value)}
              value={employementType}
            >
              <option selected disabled value={""} key={0}>
                Employment Type
              </option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
            </select>
            {/* Experience requirement */}
            <div className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm">
              <input
                type="number"
                placeholder="Minimum Experience"
                className="no-spinner h-full w-full"
                onChange={(e) => {
                  setMinExperience(e.target.value);
                }}
                value={minExperience}
              />
              <p>Years</p>
            </div>
            {/* Last Date to apply */}
            <div className="flex items-center border-gray-400 border-[1px] h-10 p-2 rounded-md">
              <span className="flex-1 text-blue-gray-500 text-sm">
                Last Date to apply
              </span>
              <input
                placeholder="Last Date to Apply"
                className="w-full  flex-1   items-center border-[1px] border-gray-400 rounded-md  text-blue-gray-500 text-sm"
                type="date"
                onChange={(e) => setLastDateToApply(e.target.value)}
                value={lastDateToApply}
              />
            </div>
            {/* Accepting responses */}
            <div className="flex justify-between w-full items-center">
              <Switch
                color="blue"
                checked={acceptingResponses}
                onChange={() => setAcceptingResponses(!acceptingResponses)}
                label="Accept Responses"
              />
              <div className="md:flex gap-4 hidden">
                <Button
                  size="sm"
                  color="blue"
                  variant="outlined"
                  onClick={() => setPreview(!preview)}
                >
                  {preview ? "Edit" : "Preview"}
                </Button>
                {props.route === "Edit" ? (
                  <Button
                    size="sm"
                    color="blue"
                    onClick={() => handleEditJob()}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    color="blue"
                    onClick={() => handlePostJob()}
                  >
                    Post
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="m-0 p-0 w-full md:w-3/5  scrollbar-invisible h-full">
          {preview ? (
            <div className="m-0 p-0 w-full ">
              <JobCardSingle job={job} />
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
            {props.route === "Edit" ? (
              <Button size="sm" color="blue" onClick={() => handleEditJob()}>
                Update
              </Button>
            ) : (
              <Button size="sm" color="blue" onClick={() => handlePostJob()}>
                Post Job
              </Button>
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default PostJobCard;
