import React, { useContext, useEffect, useState } from "react";
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
import { FaUserClock } from "react-icons/fa";
import { MdPresentToAll } from "react-icons/md";
import SinglePeopleCardHorizontal from "../components/SinglePeopleCardHorizontal";
import { Toaster, toast } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";

const Connections = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const {
    getAllUsers,
    allUsers,
    sendRequest,
    checkFriendStatus,
    acceptRequest,
  } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

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
        toast.error(data.error);
        setMessage(data.error);
        console.log(message);
      } else {
        setData(data.data);
        console.log(data);
      }
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
        toast.error(data.error);
        setMessage(data.error);
        console.log(message);
      } else {
        setData(data.data);
        console.log(data);
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
        toast.error(data.error);
        setMessage(data.error);
        console.log(message);
      } else {
        setData(data.data);
        console.log(data);
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const setToast = (msg, success) => {
    if (success) {
      toast.success(msg);
    } else toast.error(msg);
  };

  useEffect(() => {
    getPendingRequests();
    getAllUsers();
  }, []);
  console.log("All Users: ", allUsers);

  return (
    <div className="flex overflow-hidden bg-background">
      <div className="z-40">
        <SideBar className="" />
      </div>
      <div className="flex w-full gap-6 justify-center">
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
                <Chip color="teal" size="sm" value="10" />
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
              <ListItemSuffix>100</ListItemSuffix>
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
              <ListItemSuffix>100</ListItemSuffix>
            </ListItem>
          </List>
        </Card>
        <div className="xl:w-3/6 lg:w-4/6 w-5/6 mt-4 ">
          <div className="search">
            <Navbar
              className="flex md:flex-row flex-col items-center justify-center "
              fullWidth
              shadow
            >
              <div className="relative flex md:w-3/5 w-full mr-0 md:mr-2 ">
                <Input
                  type="search"
                  placeholder=""
                  className="pl-9 placeholder:text-blue-gray-100"
                  label="Search"
                  size="sm"
                  icon={<IoMdSearch />}
                />
              </div>
              <div className="relative flex md:w-2/5 w-full mr-0 md:mr-2 mt-2 md:mt-0 ">
                <Input
                  type="search"
                  placeholder="Search Location"
                  className="lg:pl-9 pl-2 placeholder:text-blue-gray-100 "
                  label="Search Location"
                  size="sm"
                  icon={<IoLocationSharp />}
                />
              </div>
              <button className="select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Search
              </button>
            </Navbar>
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
                    Sent Invites
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col max-h-[80vh] overflow-y-scroll scrollbar-thin w-full mt-1">
            {data.length == 0 ? (
              <Card className="Connections my-2 flex flex-row p-4">
                {message}
              </Card>
            ) : (
              data.map((user) => (
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
          </div>
        </div>
        <div className="w-80 mt-4 xl:block hidden">
          <YouMayKnow data={allUsers} />
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default Connections;
