import React, { useContext, useEffect, useState, useRef } from "react";
import SideBar from "../components/SideBar";
import {
  Card,
  Typography,
  Navbar,
  Button,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Chip,
  ListItemSuffix,
} from "@material-tailwind/react";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import YouMayKnow from "../components/YouMayKnow";
import { UserContext } from "../UserContext";
import { FaUserFriends } from "react-icons/fa";
import { CgCommunity } from "react-icons/cg";
import { FaUserClock } from "react-icons/fa";
import { MdPresentToAll } from "react-icons/md";
import SinglePeopleCardHorizontal from "../components/SinglePeopleCardHorizontal";
import { Toaster, toast } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import { GrLocation } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { City, State } from "country-state-city";

const Connections = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [pendingCount, setPendingCount] = useState(0);
  const [connectionsCount, setConnectionsCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const {
    getAllUsers,
    allUsers,
    sendRequest,
    checkFriendStatus,
    acceptRequest,
    userInfo,
  } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [connectionsData, setConnectionsData] = useState([]);
  const [pendingRequestsData, setPendingRequestsData] = useState([]);
  const [sentRequestsData, setSentRequestsData] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState(allUsers);

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

  // REQUEST FUNCTIONS

  const getPendingRequests = async () => {
    try {
      setData([]);
      const res = await fetch(`${SERVER_URL}/user/received-requests`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        // toast.error(data.error);
        setMessage(data.error);
        // console.log(message);
      } else {
        setPendingRequestsData(data.data);
      }
      setPendingCount(data.data ? data.data.length : 0);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };
  const getSentRequests = async () => {
    try {
      setData([]);
      const res = await fetch(`${SERVER_URL}/user/sent-requests`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        // toast.error(data.error);
        setMessage(data.error);
        console.log(data);
      } else {
        setSentRequestsData(data.data);
        setSentCount(data.data?.length);
        // console.log(data);
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };
  const getConnections = async () => {
    try {
      setData([]);
      const res = await fetch(`${SERVER_URL}/user/connections`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        // toast.error(data.error);
        setMessage(data.error);
        console.log(message);
      } else {
        setConnectionsData(data.data);
        setConnectionsCount(data.data?.length);
        // console.log(data);
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // LOCATION FUNCTIONS
  const handleClickOutsideLocation = (event) => {
    if (locationRef.current && !locationRef.current.contains(event.target))
      setLocationBox(false);
  };
  
  const buildLocationArray = () => {
    let arr = [];
    for (let i = 0; i < CityArr?.length; i++) {
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
      .slice(0, words?.length - 1)
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
    for (let i = 0; i < allUsers?.length; i++) {
      if (allUsers[i].name === undefined) continue;
      if (!arr.includes(allUsers[i].name)) {
        arr.push(allUsers[i].name);
      }
    }
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

  // FILTER PROFILES
  const handleFilterProfiles = () => {
    setActiveTab("Community");
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
      });
    } else if (selectedKeyword.length === 0 && selectedLocation.length !== 0) {
      selectedLocation.map((location) => {
        arr.push(
          allUsers.filter((user) =>
            user.location?.toLowerCase().includes(location?.toLowerCase())
          )
        );
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
        });
      });
    }
    setFilteredUsers(arr.flat());
    if (filteredUsers.length == 0) {
      setMessage("No users found!!");
    }
  };

  // USE EFFECTS

  useEffect(() => {
    getAllUsers();
    setFilteredUsers(allUsers);
  }, [userInfo]);

  useEffect(() => {
    buildKeywordArray();
    setFilteredUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    if (CityArr && StateArr) { 
      buildLocationArray();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideLocation);
    document.addEventListener("click", handleClickOutsideKeyword);
  }, []);

  const setToast = (msg, success) => {
    if (success) {
      toast.success(msg);
    } else toast.error(msg);
  };

  useEffect(() => {
    getPendingRequests();
    getSentRequests();
    getConnections();
  }, []);

  // SCROLL NAVBAR FUNCTION
  useEffect(() => {
    const mainContainer = document.getElementById("posts");
    if (mainContainer) {
      let prevScrollPos = mainContainer.scrollTop;
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
    }
  }, []);

  return (
    <div className="flex overflow-hidden bg-background h-[90vh]">
      <div className="">
        <SideBar className="" />
      </div>
      {userInfo.state ? (
        <div className="flex w-[95%] lg:w-[88%] gap-6 justify-center mx-auto">
          <Card
            shadow={false}
            floated={false}
            className="mt-4 h-40 hidden lg:block"
          >
            <List className=" bg-white rounded-lg mr-2">
              <ListItem
                selected={activeTab === "Pending"}
                onClick={() => {
                  getPendingRequests();
                  setActiveTab("Pending");
                }}
              >
                <ListItemPrefix>
                  <FaUserClock />
                </ListItemPrefix>
                <Typography className="mr-2">Pending Invites</Typography>
                <ListItemSuffix>
                  <Chip color="teal" size="sm" value={pendingCount} />
                </ListItemSuffix>
              </ListItem>
              <ListItem
                selected={activeTab === "Connections"}
                onClick={() => {
                  getConnections();
                  setActiveTab("Connections");
                }}
              >
                <ListItemPrefix>
                  <FaUserFriends />
                </ListItemPrefix>
                <Typography className="mr-2">Connections</Typography>
                <ListItemSuffix>{connectionsCount}</ListItemSuffix>
              </ListItem>
              <ListItem
                selected={activeTab === "Sent"}
                onClick={() => {
                  getSentRequests();
                  setActiveTab("Sent");
                }}
              >
                <ListItemPrefix>
                  <MdPresentToAll />
                </ListItemPrefix>
                <Typography className="mr-2">Sent requests</Typography>
                <ListItemSuffix>{sentCount}</ListItemSuffix>
              </ListItem>
              <ListItem
                selected={activeTab === "Community"}
                onClick={() => {
                  getSentRequests();
                  setActiveTab("Community");
                }}
              >
                <ListItemPrefix>
                  <CgCommunity />
                </ListItemPrefix>
                <Typography className="mr-2">Community</Typography>
              </ListItem>
            </List>
          </Card>
          <div className="xl:w-3/6 lg:w-4/6 md:w-5/6 w-full mt-4">
            <div className="" id="navbar">
              <Card
                className="flex flex-col md:flex-row rounded-md items-center z-10 px-3 py-2"
                id="sub-nav"
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
                      handleFilterKeyword(
                        e.target.value.split("|").pop().trim()
                      );
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
                    <div className="absolute bg-white rounded-lg  max-h-96 overflow-y-scroll scrollbar-thin w-full">
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
                  onClick={() => {
                    setActiveTab("Community");
                    handleFilterProfiles();
                  }}
                >
                  Search
                </button>
              </Card>
            </div>

            <div
              className="p-2 bg-gray-100 justify-between block lg:hidden"
              style={{ transition: "all 0.5s ease" }}
            >
              <div className="flex w-full justify-between mx-auto">
                <div
                  className={`flex px-2 py-1 w-1/3 mx-1 ${
                    activeTab === "Pending" ? "shadow-md bg-white" : ""
                  } justify-center items-center rounded-md cursor-pointer`}
                  onClick={() => setActiveTab("Pending")}
                >
                  <Typography className="text-gray-700 text-sm">
                    Pending
                  </Typography>
                </div>
                <div
                  className={`flex px-2 py-1 w-1/3 mx-1 ${
                    activeTab === "Connections" ? "shadow-md bg-white" : ""
                  } justify-center items-center rounded-md cursor-pointer`}
                  onClick={() => setActiveTab("Connections")}
                >
                  <Typography className="text-gray-700 text-sm">
                    Connections
                  </Typography>
                </div>
                <div
                  className={`flex px-2 py-1 w-1/3 mx-1 ${
                    activeTab === "Sent" ? "shadow-md bg-white" : ""
                  } justify-center items-center rounded-md cursor-pointer`}
                  onClick={() => setActiveTab("Sent")}
                >
                  <Typography className="text-gray-700 text-sm">
                    Requests
                  </Typography>
                </div>
                <div
                  className={`flex px-2 py-1 w-1/3 mx-1 ${
                    activeTab === "Community" ? "shadow-md bg-white" : ""
                  } justify-center items-center rounded-md cursor-pointer`}
                  onClick={() => setActiveTab("Community")}
                >
                  <Typography className="text-gray-700 text-sm">
                    Community
                  </Typography>
                </div>
              </div>
            </div>

            <div
              className="flex flex-col max-h-[80vh] overflow-y-scroll scrollbar-thin w-full mt-1 z-0"
              id="posts"
            >
              {activeTab == "Pending" && (
                <>
                  {pendingRequestsData.length == 0 ? (
                    <div className="Connections my-2 flex flex-row p-4 bg-white rounded-lg">
                      {message}
                    </div>
                  ) : (
                    pendingRequestsData.map((user) => (
                      <>
                        <SinglePeopleCardHorizontal
                          activeTab={activeTab}
                          user={user}
                          sendRequest={sendRequest}
                          acceptRequest={acceptRequest}
                          setToast={setToast}
                          getConnections={getConnections}
                          getPendingRequests={getPendingRequests}
                          getSentRequests={getSentRequests}
                        />
                      </>
                    ))
                  )}
                </>
              )}
              {activeTab == "Connections" && (
                <>
                  {connectionsData.length == 0 ? (
                    <div className="Connections my-2 flex flex-row p-4  bg-white rounded-lg">
                      {message}
                    </div>
                  ) : (
                    connectionsData.map((user) => (
                      <>
                        <SinglePeopleCardHorizontal
                          activeTab={activeTab}
                          user={user}
                          sendRequest={sendRequest}
                          acceptRequest={acceptRequest}
                          setToast={setToast}
                          getConnections={getConnections}
                          getPendingRequests={getPendingRequests}
                          getSentRequests={getSentRequests}
                        />
                      </>
                    ))
                  )}
                </>
              )}
              {activeTab == "Sent" && (
                <>
                  {sentRequestsData.length == 0 ? (
                    <div className="Connections my-2 flex flex-row p-4  bg-white rounded-lg">
                      {message}
                    </div>
                  ) : (
                    sentRequestsData.map((user) => (
                      <>
                        <SinglePeopleCardHorizontal
                          activeTab={activeTab}
                          user={user}
                          sendRequest={sendRequest}
                          acceptRequest={acceptRequest}
                          setToast={setToast}
                          getConnections={getConnections}
                          getPendingRequests={getPendingRequests}
                          getSentRequests={getSentRequests}
                        />
                      </>
                    ))
                  )}
                </>
              )}
              {activeTab == "Community" && (
                <>
                  {filteredUsers.length == 0 ? (
                    <div className="Connections my-2 flex flex-row p-4 bg-white rounded-lg">
                      No users found!!
                    </div>
                  ) : (
                    filteredUsers.map((user) => (
                      <>
                        <SinglePeopleCardHorizontal
                          activeTab={activeTab}
                          user={user}
                          sendRequest={sendRequest}
                          acceptRequest={acceptRequest}
                          setToast={setToast}
                          getConnections={getConnections}
                          getPendingRequests={getPendingRequests}
                          getSentRequests={getSentRequests}
                        />
                      </>
                    ))
                  )}
                </>
              )}
            </div>
          </div>

          <div className="w-80 mt-4 xl:block hidden">
            <YouMayKnow data={allUsers} />
          </div>
          <Toaster position="top-right" />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[80vh]">
          <Typography className="my-4 text-3xl font-semibold">
            Please Sign In to see this page
          </Typography>
          <Button onClick={() => navigate("/signin")} color="blue">
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default Connections;
