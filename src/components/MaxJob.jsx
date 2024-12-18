import React, { useEffect, useRef, useState } from "react";
import MaxJobCard from "./MaxJobCard";
import { IoMdSearch } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import { FaExpand } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Button, Card, Input } from "@material-tailwind/react";
import { SERVER_URL } from "../ServerURL";
import { City, State } from "country-state-city";
import JobCardSkeleton from "./JobCardSkeleton";

const MaxJob = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [location, setLocation] = useState("");
  const CityArr = City.getCitiesOfCountry("IN");
  const StateArr = State.getStatesOfCountry("IN");
  const [fixedLocationArray, setFixedLocationArray] = useState([]);
  const [locationArray, setLocationArray] = useState([]);
  const [locationBox, setLocationBox] = useState(false);
  const locationRef = useRef(null);

  const [keyword, setKeyword] = useState("");
  const [fixedKeywordArray, setFixedKeywordArray] = useState([]);
  const [keywordArray, setKeywordArray] = useState([]);
  const [keywordBox, setKeywordBox] = useState(false);
  const keywordRef = useRef(null);

  // LOCATION FUNCTIONS
  const handleClickOutsideLocation = (event) => {
    if (locationRef.current && !locationRef.current.contains(event.target))
      setLocationBox(false);
  };

  const buildLocationArray = () => {
    let arr = [];
    for (let i = 0; i < CityArr.length; i++) {
      arr.push(
        `${CityArr[i].name}, ${
          StateArr.filter((state) => state.isoCode === CityArr[i].stateCode)[0]
            ?.name
        }`
      );
    }
    setFixedLocationArray(arr);
    // setLocationArray(arr);
  };

  const handleFilterLocation = (word) => {
    const value = word.toLowerCase();
    setLocationArray(
      value === ""
        ? fixedLocationArray
        : fixedLocationArray.filter((item) =>
            item.toLowerCase().startsWith(value)
          )
    );
  };

  const setLocationFunc = (item) => {
    const words = location.split("|").map((word) => word.trim());
    const newLocation = words
      .slice(0, words.length - 1)
      .concat(item.trim())
      .join(" | ");
    setLocation(`${newLocation} |`);
  };

  // KEYWORD FUNCTIONS
  const handleClickOutsideKeyword = (event) => {
    if (keywordRef.current && !keywordRef.current.contains(event.target))
      setKeywordBox(false);
  };

  const buildKeywordArray = () => {
    let arr = [];
    for (let i = 0; i < jobs.length; i++) {
      arr.push(jobs[i].jobTitle.trim());
    }
    arr.sort();
    setFixedKeywordArray(arr);
  };

  const handleFilterKeyword = (word) => {
    const value = word.toLowerCase();
    setKeywordArray(
      value === ""
        ? fixedKeywordArray
        : fixedKeywordArray.filter((item) =>
            item.toLowerCase().startsWith(value)
          )
    );
  };

  const setKeywordFunc = (item) => {
    const words = keyword.split("|").map((word) => word.trim());
    const newKeyword = words
      .slice(0, words.length - 1)
      .concat(item.trim())
      .join(" | ");
    setKeyword(`${newKeyword} |`);
  };

  // GET ALL JOBS
  const getAllJobs = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/job/all-jobs`, {
        method: "GET",
      });
      const res = await response.json();
      // console.log(res)
      if (res.success) {
        setJobs(res.jobs.reverse());
        setFilteredJobs(res.jobs);
        buildKeywordArray();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER JOBS
  const handleFilterJobs = () => {
    if (keyword.length == 0 && location.length == 0) {
      setFilteredJobs(jobs);
      return;
    }
    const selectedKeyword = keyword
      .split("|")
      .map((word) => word.trim())
      .filter((item) => item !== "");
    const selectedLocation = location
      .split("|")
      .map((word) => word.trim())
      .filter((item) => item !== "");
    let arr = [];
    if (selectedKeyword.length === 0 && selectedLocation.length === 0) {
      setFilteredJobs(jobs);
    } else if (selectedKeyword.length !== 0 && selectedLocation.length === 0) {
      selectedKeyword.map((keyword) => {
        arr.push(
          jobs.filter((job) =>
            job.jobTitle.toLowerCase().includes(keyword.toLowerCase())
          )
        );
        // setFilteredJobs(jobs.filter(job => job.jobTitle.toLowerCase().includes(keyword.toLowerCase())));
      });
    } else if (selectedKeyword.length === 0 && selectedLocation.length !== 0) {
      selectedLocation.map((location) => {
        arr.push(
          jobs.filter((job) =>
            job.location.toLowerCase().includes(location.toLowerCase())
          )
        );
        // setFilteredJobs(jobs.filter(job => job.location.toLowerCase().includes(location.toLowerCase())));
      });
    } else if (selectedKeyword.length !== 0 && selectedLocation.length !== 0) {
      selectedKeyword.map((keyword) => {
        selectedLocation.map((location) => {
          arr.push(
            jobs.filter(
              (job) =>
                job.jobTitle.toLowerCase().includes(keyword.toLowerCase()) &&
                job.location.toLowerCase().includes(location.toLowerCase())
            )
          );
          // setFilteredJobs(jobs.filter(job => job.jobTitle.toLowerCase().includes(keyword.toLowerCase()) && job.location.toLowerCase().includes(location.toLowerCase())));
        });
      });
    }
    setFilteredJobs(arr.flat());
  };

  // USE EFFECTS
  useEffect(() => {
    getAllJobs();
  }, []);

  useEffect(() => {
    buildLocationArray();
  }, []);

  useEffect(() => {
    buildKeywordArray();
  }, [jobs]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideLocation);
    document.addEventListener("click", handleClickOutsideKeyword);
  }, []);

  // SCROLL NAVBAR FUNCTION
  useEffect(() => {
    const mainContainer = document.getElementById("posts");
    let prevScrollPos = document.getElementById("posts").scrollTop;

    mainContainer.onscroll = () => {
      let currentScrollPos = document.getElementById("posts").scrollTop;
      if (prevScrollPos > currentScrollPos) {
        document.getElementById("navbar").classList.remove("h-0");
        document.getElementById("sub-nav").classList.remove("-top-30");
        document.getElementById("sub-nav").classList.add("top-0");
      } else {
        document.getElementById("navbar").classList.add("h-0");
        document.getElementById("sub-nav").classList.add("-top-30");
        document.getElementById("sub-nav").classList.remove("top-0");
      }
      prevScrollPos = currentScrollPos;
    };
  });

  return (
    <Card className="w-full flex flex-col mx-auto mt-5 py-1 bg-white rounded-md shadow-md">
      <div className="" id="navbar" style={{ transition: "all 0.5s ease" }}>
        <Card
          className="w-full min-w-96 flex flex-col md:flex-row items-center justify-center gap-3 px-3 py-2 rounded-md"
          id="sub-nav"
          style={{ transition: "all 0.5s ease" }}
        >
          {/* KEYWORD FILTER */}
          <div className="w-full md:w-1/2 relative" ref={keywordRef}>
            <input
              placeholder="Search Jobs"
              icon={<IoMdSearch />}
              onChange={(e) => {
                if (e.target.value.length > 2) {
                  setKeywordBox(true);
                }
                setKeyword(e.target.value);
                handleFilterKeyword(e.target.value.split("|").pop().trim());
              }}
              value={keyword}
              className="relative w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
            />
            {keywordBox && (
              <div className="absolute bg-white z-10 rounded-lg  max-h-96 overflow-y-scroll scrollbar-thin w-full">
                {keywordArray.map((keyword, key) => (
                  <div
                    f
                    key={key}
                    className="px-2 py-1 border-b-[1px] border-gray-300 cursor-pointer"
                    onClick={() => {
                      setKeywordFunc(keyword);
                      setKeywordBox(false);
                    }}
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* LOCATION FILTER */}
          <div ref={locationRef} className="w-full md:w-1/2 relative">
            <input
              placeholder="Location"
              icon={<GrLocation />}
              onChange={(e) => {
                if (e.target.value.length > 2) {
                  setLocationBox(true);
                }
                setLocation(e.target.value);
                handleFilterLocation(e.target.value.split("|").pop().trim());
              }}
              value={location}
              className="relative w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
            />
            {locationBox && (
              <div className="absolute bg-white z-10 rounded-lg  max-h-96 overflow-y-scroll scrollbar-thin w-full">
                {locationArray.map((location) => (
                  <div
                    f
                    key={location}
                    className="px-2 py-1 border-b-[1px] border-gray-300 cursor-pointer"
                    onClick={() => {
                      setLocationFunc(location);
                      setLocationBox(false);
                    }}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* SEARCH BUTTON */}
          <button
            className="select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => handleFilterJobs()}
          >
            Search
          </button>
        </Card>
      </div>
      <div
        className="w-full h-[75vh] overflow-y-scroll scrollbar-thin bg-background"
        id="posts"
      >
        {filteredJobs.length === 0 ? (
          <>
            <JobCardSkeleton />
          </>
        ) : (
          <>
            {filteredJobs.map((job) => (
              <MaxJobCard key={job._id} job={job} parentFunction={getAllJobs} />
            ))}
          </>
        )}
      </div>
    </Card>
  );
};

export default MaxJob;
