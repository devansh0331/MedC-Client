import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Navbar,
  Button,
  Input,
  CardFooter,
  Badge,
  Dialog,
} from "@material-tailwind/react";
import altprofile from "../assets/altprofile.png";
import { IoLocationSharp } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
// import YouMayKnow from "../components/YouMayKnow";
import ProfileExpand from "../components/ProfileExpand";
import SideBar from "../components/SideBar";
import { UserContext } from "../UserContext";
import { GrLocation } from "react-icons/gr";
import { City, State } from "country-state-city";

const Hire = () => {
  const { allUsers, getAllUsers, userInfo } = useContext(UserContext);
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [userExpand, setUserExpand] = useState({});
  const [profileExpand, setProfileExpand] = useState(false);

  // LOCATION VARIABLES
  const [location, setLocation] = useState("");
  const CityArr = City.getCitiesOfCountry("IN");
  const StateArr = State.getStatesOfCountry("IN");
  const [fixedLocationArray, setFixedLocationArray] = useState([]);
  const [locationArray, setLocationArray] = useState([]);
  const [locationBox, setLocationBox] = useState(false);
  const locationRef = useRef(null);

  // KEYWORD VARIABLES
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
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].name === undefined) continue;
      if (!arr.includes(allUsers[i].name)) {
        arr.push(allUsers[i].name);
      }
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

  const handleProfileExpand = () => {
    setProfileExpand(!profileExpand);
  };

  // FILTER PROFILES
  const handleFilterProfiles = () => {
    if (keyword.length == 0 && location.length == 0) {
      setFilteredUsers(allUsers);
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
      setFilteredUsers(allUsers);
    } else if (selectedKeyword.length !== 0 && selectedLocation.length === 0) {
      selectedKeyword.map((keyword) => {
        arr.push(
          allUsers.filter((user) =>
            user.name?.toLowerCase().includes(keyword?.toLowerCase())
          )
        );
        // setFilteredUsers(allUsers.filter(user => user.name?.toLowerCase().includes(keyword?.toLowerCase())));
      });
    } else if (selectedKeyword.length === 0 && selectedLocation.length !== 0) {
      selectedLocation.map((location) => {
        arr.push(
          allUsers.filter((user) =>
            user.location?.toLowerCase().includes(location?.toLowerCase())
          )
        );
        // setFilteredUsers(allUsers.filter(user => user.location?.toLowerCase().includes(location?.toLowerCase())));
      });
    } else if (selectedKeyword.length !== 0 && selectedLocation.length !== 0) {
      selectedKeyword.map((keyword) => {
        selectedLocation.map((location) => {
          arr.push(
            allUsers.filter(
              (user) =>
                user.name?.toLowerCase().includes(keyword?.toLowerCase()) &&
                user.location?.toLowerCase().includes(location?.toLowerCase())
            )
          );
          // setFilteredUsers(allUsers.filter(user => user.name?.toLowerCase().includes(keyword?.toLowerCase()) && user.location?.toLowerCase().includes(location?.toLowerCase())));
        });
      });
    }
    setFilteredUsers(arr.flat());
  };

  // USE EFFECTS

  useEffect(() => {
    getAllUsers();
    setFilteredUsers(allUsers);
  }, [userInfo]);

  useEffect(() => {
    setUserExpand(allUsers[0]);
    buildKeywordArray();
    setFilteredUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    buildLocationArray();
  }, [CityArr]);

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
        document.getElementById("navbar").classList.remove("hidden");
        document.getElementById("sub-nav").classList.remove("-top-30");
        document.getElementById("sub-nav").classList.add("top-0");
      } else {
        document.getElementById("navbar").classList.add("hidden");
        document.getElementById("sub-nav").classList.add("-top-30");
        document.getElementById("sub-nav").classList.remove("top-0");
      }
      prevScrollPos = currentScrollPos;
    };
  },[]);

  return (
    <div className="flex overflow-y-hidden  bg-background overflow-x-hidden h-[90vh]">
      <SideBar route="feed" />
      <div className="flex 2xl:w-[75%] xl:w-[85%] w-[90%] mx-auto ">
        <div className="w-full lg:w-4/6 m-auto mt-4 mx-2 ">
          <div className="" id="navbar" style={{transition: "all 0.5s ease"}}>
            <Card
              className="flex flex-col md:flex-row rounded-md items-center z-10 px-3 py-2"
              id="sub-nav"
              style={{transition: "all 0.5s ease"}}
            >
              {/* SEARCH NAME */}
              <div
                ref={keywordRef}
                className="relative w-full md:w-3/5 mr-2 my-1 md:my-0 "
              >
                <input
                  placeholder="Search"
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
                  <div className="absolute bg-white  rounded-lg  max-h-96 overflow-y-scroll scrollbar-thin w-full">
                    {keywordArray.map((keyword, key) => (
                      <div
                        key={key}
                        className="px-2 py-1 bg-white border-b-[1px] border-gray-300 cursor-pointer text-gray-600 text-sm"
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
              {/* SEARCH LOCATION */}
              <div
                ref={locationRef}
                className="relative w-full md:w-3/5 mr-2 my-1 md:my-0 "
              >
                <input
                  placeholder="Location"
                  icon={<GrLocation />}
                  onChange={(e) => {
                    if (e.target.value.length > 2) {
                      setLocationBox(true);
                    }
                    setLocation(e.target.value);
                    handleFilterLocation(
                      e.target.value.split("|").pop().trim()
                    );
                  }}
                  value={location}
                  className="relative w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
                />
                {locationBox && (
                  <div className="absolute bg-white  rounded-lg  max-h-96 overflow-y-scroll scrollbar-thin w-full">
                    {locationArray.map((location) => (
                      <div
                        key={location}
                        className="px-2 py-1 border-b-[1px] border-gray-300 cursor-pointer text-gray-600 text-sm "
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
                type="button"
                className="select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  my-1 md:my-0"
                onClick={() => handleFilterProfiles()}
              >
                Search
              </button>
            </Card>
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-3 w-full mt-1 overflow-y-scroll max-h-[75vh] scrollbar-thin  z-0"
            id="posts"
          >
            {filteredUsers.map((user, index) => (
              <>
                {user?.name != "" ? (
                  <div
                    className="p-3 m-3 flex flex-col gap-3 justify-between bg-white rounded-lg"
                    key={index}
                  >
                    <div className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2 ">
                      <img
                        src={user?.profileURL ? user?.profileURL : altprofile}
                        alt="altprofile"
                        className="w-24 h-24  rounded-full profile-pic"
                      />
                      <Typography className="text-lg mt-2">
                        {user?.name ? user?.name : "Anonymous"}
                      </Typography>
                    </div>
                    {user?.location || user?.bio ? (
                      <CardBody className="m-0 p-0 border-b-2 rounded-none pb-2">
                        {user?.bio && (
                          <Typography className="flex items-center">
                            <BsBuildingsFill />
                            <span className="ml-1">{user?.bio}</span>
                          </Typography>
                        )}
                        {user?.location && (
                          <Typography className="flex items-center">
                            <IoLocationSharp />
                            <span className="ml-1">{user?.location}</span>
                          </Typography>
                        )}
                      </CardBody>
                    ) : null}
                    <CardFooter className="m-0 p-0 mx-auto">
                      <Button
                        size="sm"
                        className="px-2 py-1 font-light rounded-md hidden lg:block cursor-pointer"
                        color="light-blue"
                        onClick={() => setUserExpand(user)}
                      >
                        Show Details
                      </Button>
                      <Button
                        size="sm"
                        className="px-2 py-1 font-light rounded-md lg:hidden block cursor-pointer"
                        color="light-blue"
                        onClick={() => {
                          setUserExpand(user);
                          handleProfileExpand();
                        }}
                      >
                        Show Details
                      </Button>
                    </CardFooter>
                  </div>
                ) : null}
              </>
            ))}
          </div>
        </div>
        <div className="hidden lg:block w-2/6 mt-4 mx-2">
          <ProfileExpand user={userExpand} />
        </div>
      </div>
      <Dialog
        open={profileExpand}
        handler={handleProfileExpand}
        className="bg-transparent shadow-none"
        size="xs"
      >
        <ProfileExpand user={userExpand} />
      </Dialog>
    </div>
  );
};

export default Hire;
