import React, { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../components/SideBar";
import {
  Card,
  List,
  ListItem,
  Typography,
  CardHeader,
  Avatar,
  Menu,
  MenuHandler,
  CardBody,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import SinglePostCard from "../components/SinglePostCard";
import altprofile from "../assets/altprofile.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import AdminPostCard from "../components/AdminPostCard";
import UserCardAdmin from "../components/UserCardAdmin";
import BlogBG from "../assets/BlogBG.png";
import BlogBG2 from "../assets/BlogBG2.png";
import BlogBG3 from "../assets/BlogBG3.png";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import { SingleReportBox } from "../components/SingleReportBox";
import { UserContext } from "../UserContext";
import ReactTimeAgo from "react-time-ago";
import { IoMdSearch } from "react-icons/io";

const Admin = (props) => {
  const [active, setActive] = useState(0);
  const [reports, setReports] = useState();
  const [singleReport, setSingleReport] = useState();
  const [reportProfileName, setReportProfileName] = useState("");
  const [reportProfileId, setReportProfileId] = useState("");
  const navigate = useNavigate();
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [menuOpen, setMenuOpen] = useState(true);
  const {
    getPosts,
    posts,
    userInfo,
    getAllUsers,
    allUsers,
    adminStatus,
    adminArchivedPosts,
    setAdminArchivedPosts,
    getAdminArchivedPosts,
  } = useContext(UserContext);
  const [reportBoxOpen, setReportBoxOpen] = useState(false);
  const [deactivatedUsers, setDeactivatedUsers] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);

  // KEYWORD VARIABLES
  const [keyword, setKeyword] = useState("");
  const [fixedKeywordArray, setFixedKeywordArray] = useState([]);
  const [keywordArray, setKeywordArray] = useState([]);
  const [keywordBox, setKeywordBox] = useState(false);
  const keywordRef = useRef(null);
  const [filteredUsers, setFilteredUsers] = useState(allUsers);

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
    if (keyword.length == 0) {
      setFilteredUsers(allUsers);
      return;
    }
    const selectedKeyword = keyword
      .split("|")
      .map((word) => word.trim())
      .filter((item) => item !== "");
    let arr = [];
    if (selectedKeyword.length === 0) {
      setFilteredUsers(allUsers);
    } else {
      selectedKeyword.map((keyword) => {
        arr.push(
          allUsers.filter((user) =>
            user.name?.toLowerCase().includes(keyword?.toLowerCase())
          )
        );
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
    buildKeywordArray();
    setFilteredUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideKeyword);
  }, []);

  const handleReportBoxOpen = () => {
    setReportBoxOpen(!reportBoxOpen);
  };

  const getAllBlogs = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/blog/all-blogs`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const res = await response.json();
      if (res.success) {
        setBlogs(res.data);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/blog/single-blog/delete/${blogId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const res = await response.json();
      if (res.success) {
        toast.success("Blog deleted successfully");
        getAllBlogs();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDeactivatedUsers = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/admin/deactivated-accounts`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const parsedRes = await res.json();
      if (!parsedRes.success) {
        console.error(parsedRes.error);
      } else {
        setDeactivatedUsers(await parsedRes.data);
      }
    } catch (error) {
      console.error("Failed to get profiles");
    }
  };

  const getReportedProfiles = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/report/all-reports`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const parsedRes = await res.json();
      if (!parsedRes.success) {
        console.error(parsedRes.error);
      } else {
        // console.log(parsedRes.data[0]);
        setReports(await parsedRes.data);
      }
    } catch (error) {
      console.error("Failed to get profiles");
    }
  };

  const getAllAdmin = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/admin/get-all-admins`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        }
      })
      const parsedRes = await res.json();
      if (!parsedRes.success) {
        console.error(parsedRes.error);
      } else {
        setAllAdmins(await parsedRes.data);
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getPosts();
    if (!adminStatus) {
      navigate("/");
    }
  }, []);
  
  useEffect(() => {
    getAllAdmin();
    getAllBlogs();
    getAllUsers();
    getAdminArchivedPosts();
    getDeactivatedUsers();
  }, []);

  return (
    <>
      {!adminStatus ? (
        <div>You are not an Admin</div>
      ) : (
        <div className="w-full h-[90vh] flex flex-row bg-background overflow-y-hidden">
          <SideBar />
          <div className="mt-5 w-[95%] lg:w-[85%] xl:w-[80%] mx-auto flex flex-col lg:flex-row gap-1 lg:gap-4">
            <Card className="w-full lg:w-min h-min m-0">
              <CardBody
                className="px-4 py-2 flex justify-between lg:hidden cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <p>Menu</p>
              </CardBody>
            </Card>
            <Card
              className={`w-full lg:w-min h-min ${
                menuOpen ? "block" : "hidden lg:block"
              }`}
            >
              <List className="p-2 ">
                <div
                  onClick={() => {setActive(0); setMenuOpen(false);}}
                  className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                    active === 0
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  Live Posts
                </div>
                <div
                  onClick={() => {setActive(1); setMenuOpen(false);}}
                  className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                    active === 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  Archived Posts
                </div>
                <div
                  onClick={async () => {
                    await getAllUsers();
                    setActive(2); 
                    setMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                    active === 2
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  Profiles
                </div>
                <div
                  onClick={() => {setActive(3); setMenuOpen(false);}}
                  className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                    active === 3
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  Blogs
                </div>
                <div
                  onClick={() => {
                    getReportedProfiles();
                    setActive(4);
                    setMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                    active === 4
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  Reports
                </div>
                <div
                  onClick={() => {
                    getReportedProfiles();
                    setActive(5);
                    setMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                    active === 5
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  Deactivated Accounts
                </div>
                <div
                  onClick={() => {
                    setActive(6);
                    setMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 ${
                    active === 6
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  Admin Controls
                </div>
              </List>
            </Card>

            <Card className="w-full h-full">
              {active === 0 && (
                <div className="p-4">
                  <div className="z-10 bg-white w-full">
                    <Typography className="text-xl text-gray-700 ">
                      Live Posts
                    </Typography>
                  </div>
                  <div className="w-full h-[75vh] overflow-y-scroll scrollbar-thin overflow-x-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-11/12 gap-5 justify-evenly mx-auto">
                      {posts.map((post, key) => (
                        <AdminPostCard
                          key={key}
                          postId={post._id}
                          post={post}
                          parentFunction={getPosts}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {active === 1 && (
                <div className="p-4">
                  <div className="z-10 bg-white w-full">
                    <Typography className="text-xl text-gray-700 ">
                      Archived Posts
                    </Typography>
                  </div>
                  <div className="w-full h-[75vh] overflow-y-scroll scrollbar-thin">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-11/12 gap-5 justify-evenly mx-auto">
                      {adminArchivedPosts.map((post, key) => (
                        <AdminPostCard
                          key={key}
                          postId={post._id}
                          post={post}
                          parentFunction={getAdminArchivedPosts}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {active === 2 && (
                <div className="p-4">
                  <div className="z-10 bg-white w-full flex justify-between items-center">
                    <Typography className="text-xl text-gray-700 ">
                      Users
                    </Typography>
                    <div className="w-3/4 md:w-1/2 flex gap-2">
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
                          <div className="absolute bg-white  rounded-lg  max-h-96 overflow-y-scroll scrollbar-thin w-full z-10">
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
                      {/* SEARCH BUTTON */}
                      <button
                        type="button"
                        className="select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  my-1 md:my-0"
                        onClick={() => handleFilterProfiles()}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-[70vh] overflow-y-scroll scrollbar-thin z-0">
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 w-11/12 mx-auto z-0">
                      {filteredUsers?.length > 0 &&
                        filteredUsers?.map((user, key) => (
                          <UserCardAdmin
                            user={user}
                            key={key}
                            parentFunction={getAllUsers}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              )}
              {active === 3 && (
                <div className="p-4">
                  <div className="flex justify-between z-10 bg-white w-full">
                    <Typography className="text-xl text-gray-700 ">
                      Blogs
                    </Typography>
                    <button
                      className="mb-2 border-[1px] rounded-md border-blue-500 font-[600] text-blue-500 text-[12px] py-1 px-2 tracking-wider"
                      onClick={() => navigate("/create-blog")}
                    >
                      CREATE BLOG
                    </button>
                  </div>
                  <div className="w-full h-[80vh] overflow-y-scroll scrollbar-thin">
                    <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto mt-2">
                      {blogs.map((blog, index) => (
                        <div key={index}>
                          {blog.coverImage && (
                            <Card
                              key={index}
                              className="w-56 h-[450px] flex flex-col justify-start relative mx-auto cursor-pointer"
                              onMouseEnter={() => setHoveredCardIndex(index)}
                              onMouseLeave={() => setHoveredCardIndex(null)}
                            >
                              <div className="flex items-center gap-2 mx-auto w-full justify-center mt-2 z-20 cursor-text absolute">
                                <Button
                                  size="sm"
                                  color="blue"
                                  onClick={() =>
                                    navigate(`/blog/edit/${blog._id}`)
                                  }
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  color="red"
                                  onClick={() => deleteBlog(blog._id)}
                                >
                                  Delete
                                </Button>
                              </div>
                              <img
                                src={blog.coverImage}
                                className="rounded-lg h-full w-full object-cover"
                                onClick={() => navigate(`/blog/${blog._id}`)}
                              />
                              <div
                                className={`p-2 bg-opacity-85 absolute rounded-lg bottom-0 bg-white w-full`}
                                style={{
                                  transition: "all 0.5s ease-in-out",
                                }}
                              >
                                <Typography className={`text-xl font-semibold`}>
                                  {blog.title}
                                </Typography>
                                <Typography
                                  className={`text-sm`}
                                  style={{
                                    transition: "height 0.5s ease-in-out",
                                    height:
                                      hoveredCardIndex === index
                                        ? "120px"
                                        : "0",
                                    overflow: "hidden",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: blog.content,
                                  }}
                                ></Typography>
                              </div>
                            </Card>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {active === 4 && (
                <div className="p-4">
                  <div className="z-10 bg-white w-full">
                    <Typography className="text-xl text-gray-700 ">
                      Reports
                    </Typography>
                  </div>
                  <div className="w-full h-[70vh] overflow-y-scroll scrollbar-thin">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
                      {reports &&
                        reports.map((profile, key) => (
                          <Card className="p-2">
                            <div
                              key={key}
                              className="flex items-center justify-between gap-2 my-1"
                            >
                              <div className="flex items-center">
                                <Avatar
                                  src={
                                    profile.userId.profileURL
                                      ? profile.userId.profileURL
                                      : altprofile
                                  }
                                  onClick={() =>
                                    navigate(`/user/${profile.userId._id}`)
                                  }
                                  size="lg"
                                  className="cursor-pointer"
                                />
                                <div className="flex flex-col items-start ml-3 ">
                                  <Typography
                                    onClick={() =>
                                      navigate(`/user/${profile.userId._id}`)
                                    }
                                    className="text-base text-gray-900 hover:underline cursor-pointer"
                                  >
                                    {profile.userId.name}
                                  </Typography>
                                  <Typography className="text-gray-800 italic">
                                    {profile.userId.bio}
                                  </Typography>
                                </div>
                              </div>
                              <div className="flex flex-col items-end justify-end">
                                <Typography className="text-base text-red-500">
                                  Report Count:{" "}
                                  {profile.reportedBy
                                    ? Object.keys(profile.reportedBy).length
                                    : "0"}
                                </Typography>
                                <div className="flex justify-between items-center">
                                  {/* <Typography className="text-sm text-blue-500 italic font-semibold cursor-pointer hover:underline">
                                  Visit Profile
                                </Typography> */}
                                  <Typography
                                    onClick={async () => {
                                      setReportProfileName(profile.userId.name);
                                      setReportProfileId(profile._id);

                                      handleReportBoxOpen();
                                    }}
                                    className="text-sm text-blue-500 italic font-semibold cursor-pointer ml-3 hover:underline"
                                  >
                                    Check Status
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                </div>
              )}
              {active === 5 && (
                <div className="p-4">
                  <div className="z-10 bg-white w-full">
                    <Typography className="text-xl text-gray-700 ">
                      Deactivated Accounts
                    </Typography>
                  </div>
                  <div className="w-full h-[70vh] overflow-y-scroll scrollbar-thin">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mx-auto">
                      {deactivatedUsers &&
                        deactivatedUsers.map((user, key) => (
                          <UserCardAdmin
                            key={key}
                            user={user}
                            parentFunction={getDeactivatedUsers}
                            parentFunction2={getAllUsers}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              )}
              {active === 6 && (
                <div className="p-4">
                  <div className="z-10 bg-white w-full">
                    <Typography className="text-xl text-gray-700 ">
                      Admin Controls
                    </Typography>
                  </div>
                  <div className="w-full h-[70vh] overflow-y-scroll scrollbar-thin">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mx-auto">
                      {allAdmins &&
                        allAdmins.map((user, key) => (
                          <UserCardAdmin
                            key={key}
                            user={user.userId}
                            parentFunction={getAllAdmin}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {reportBoxOpen && (
            <SingleReportBox
              open={reportBoxOpen}
              // handleOpen={handleReportBoxOpen}
              setOpen={setReportBoxOpen}
              singleReport={singleReport}
              name={reportProfileName}
              id={reportProfileId}
            />
          )}

          <Toaster position="top-right" />
        </div>
      )}
    </>
  );
};

export default Admin;
{
  /* <div className="flex justify-between h-min lg:hidden">
              <div
                onClick={() => setActive(0)}
                className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 w-full text-center ${
                  active === 0
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                Live
              </div>
              <div
                onClick={() => setActive(1)}
                className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 w-full text-center ${
                  active === 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                Archived
              </div>
              <div
                onClick={async () => {
                  await getAllUsers();
                  setActive(2);
                }}
                className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 w-full text-center ${
                  active === 2
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                Profiles
              </div>
              <div
                onClick={() => setActive(3)}
                className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 w-full text-center ${
                  active === 3
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                Blogs
              </div>
              <div
                onClick={() => {
                  getReportedProfiles();
                  setActive(4);
                }}
                className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 w-full text-center ${
                  active === 4
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                Reports
              </div>
              <div
                onClick={() => {
                  getReportedProfiles();
                  setActive(5);
                }}
                className={`px-3 py-2 rounded-md my-1 cursor-pointer hover:bg-blue-50 hover:text-gray-800 w-full text-center ${
                  active === 5
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                Deactivated
              </div>
            </div> */
}
