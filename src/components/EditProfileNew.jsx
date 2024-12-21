import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import profile2 from "../assets/profile2.png";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { useState } from "react";
import altprofile from "../assets/altprofile.png";
import { FaRegEdit } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import Resume from "../assets/Resume.pdf";
import { IoClose } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { IoDocumentTextSharp } from "react-icons/io5";
import { Country, State, City } from "country-state-city";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Typography,
  Button,
  Dialog,
  CardFooter,
} from "@material-tailwind/react";

import Cookies from "js-cookie";
import { SERVER_URL } from "../ServerURL";
import { BioRoles } from "./BioRoles";
import { UserContext } from "../UserContext";

function EditProfileNew({
  user,
  openEdit,
  setOpenEdit,
  setToast,
  getSingleUser,
}) {
  // LOCATION CONSTANTS
  const CityArr = City.getCitiesOfCountry("IN");
  const StateArr = State.getStatesOfCountry("IN");
  const [location, setLocation] = useState(user.location ? user.location : "");
  const [locationArray, setLocationArray] = useState([]);
  const [locSuggestionbox, setLocSuggestionbox] = useState(false);
  const [fixedLocationArray, setFixedLocationArray] = useState(location);
  const locDropDown = useRef(null);

  // BIO ROLE CONSTANTS
  const [manualBio, setManualBio] = useState(false);
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [bioRolesArray, setBioRolesArray] = useState([]);
  const [bioSuggestionbox, setBioSuggestionbox] = useState(false);
  const bioDropDown = useRef(null);

  const handleOpenEdit = () => setOpenEdit();
  const { handleUpload } = useContext(UserContext);
  const [resume, setResume] = useState(Resume);
  const [number, setNumber] = useState("");
  const [fName, setFName] = useState(user.name ? user.name.split(" ")[0] : "");
  const [lName, setLName] = useState(user.name ? user.name.split(" ")[1] : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [file, setFile] = useState(
    user.profileURL ? user.profileURL : altprofile
  );
  const [uploadedFile, setUploadedFile] = useState(null);
  const [contact, setContact] = useState(
    user.contact ? parseInt(user.contact) : ""
  );
  const [linkedin, setLinkedin] = useState(user.linkedin ? user.linkedin : "");
  const [twitter, setTwitter] = useState(user.twitter ? user.twitter : "");
  const [website, setWebsite] = useState(user.website ? user.website : "");
  const [error, setError] = useState("");

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

  // BIO ROLE FUNCTIONS
  const handleClickEvent = (event) => {
    if (bioDropDown.current && !bioDropDown.current.contains(event.target)) {
      setBioSuggestionbox(false);
    }
  };

  const bioSuggestions = (keyword) => {
    if (!keyword) setBioRolesArray([]);

    const filteredList = BioRoles.filter((item) => {
      return item.toLowerCase().includes(keyword.toLowerCase());
    });
    setBioRolesArray(filteredList);
  };

  // USE EFFECTS
  useEffect(() => {
    document.addEventListener("click", handleClickEvent2);
    return () => {
      document.removeEventListener("click", handleClickEvent2);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickEvent);
    return () => {
      document.removeEventListener("click", handleClickEvent);
    };
  }, []);

  useEffect(() => {
    buildLocationArr();
  }, []);

  // SERVER SIDE FUNCTIONS
  const handleSaveProfile = async () => {
    let fileURL = "";
    if (file) {
      fileURL = await handleUpload(file, "image");
    }else{
      fileURL = "";
    }
    const data = {
      name: fName + " " + lName,
      email: email,
      bio: bio,
      location: location,
      contact: contact.toString(),
      linkedin: linkedin,
      twitter: twitter,
      website: website,
      fileURL: file ? fileURL : "",
    };
    try {
      const response = await fetch(
        `${SERVER_URL}/auth/update-profile/social-info`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();

      if (res.success) {
        getSingleUser();
        setOpenEdit();
        setToast("Profile updated successfully", true);
      } else {
        setError(res.error);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      setOpenEdit();
      setToast("Failed to update", false);
    }
  };

  return (
    <Dialog
      open={openEdit}
      handler={handleOpenEdit}
      size="lg"
      className="overflow-y-scroll max-h-[80vh] scrollbar-thin"
    >
      <div className="flex px-4 py-2 w-full justify-between items-start">
        <Typography className="text-2xl font-bold">Edit Profile</Typography>
        <IoClose className="cursor-pointer w-6 h-6" onClick={handleOpenEdit} />
      </div>
      <div className="px-5 pb-5 flex flex-col lg:flex-row gap-4 w-full">
        <div className="lg:w-2/5 lg:flex items-center relative">
          <img
            src={uploadedFile ? URL.createObjectURL(uploadedFile) : file}
            className=" w-1/2 lg:w-full aspect-square profile-pic rounded-full mx-auto justify-start items-start flex"
          />
          <div className="w-1/2 lg:w-full aspect-square profile-pic rounded-full mx-auto absolute bg-black bg-opacity-50 flex justify-center items-center gap-6">
            <input
              id="file-upload-image"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setUploadedFile(e.target.files[0]);
                setFile(e.target.files[0]);
              }}
            />
            <label htmlFor="file-upload-image">
              <FaRegEdit
                className="w-6 h-6 text-white cursor-pointer hover:w-7 hover:h-7"
                style={{ transition: "all 0.2s ease-in-out" }}
              />
            </label>

            <AiOutlineDelete
              className="w-6 h-6 text-white cursor-pointer hover:w-7 hover:h-7"
              style={{ transition: "all 0.2s ease-in-out" }}
              onClick={() => {
                setFile(null);
                setUploadedFile(null);
              }}
            />
          </div>
        </div>
        <div className="lg:w-3/5 flex flex-col">
          <div className="flex flex-col sm:grid grid-cols-2 gap-4">
            {/* <div className="col-span-2 relative border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center">
              <input
                id="file-upload-image"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setUploadedFile(e.target.files[0]);
                  setFile(e.target.files[0]);
                }}
              />
              <label htmlFor="file-upload-image">
                <RiGalleryFill className="w-5 h-5  absolute left-4 top-1/2 -translate-y-1/2" />{" "}
                <span className="ml-8 absolute top-1/2 -translate-y-1/2">
                  {file ? "Change Profile Picture" : "Upload Profile Picture"}
                </span>
              </label>
              <IoClose
                className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setFile(null);
                  setUploadedFile(null);
                }}
              />
            </div> */}
            <input
              placeholder="First Name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              className="col-span-1 w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
            />
            <input
              placeholder="Last Name"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              className="col-span-1 w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
            />
            {/* Bio and Tagline */}
            <div className="col-span-2 relative">
              <input
                placeholder="Tagline"
                value={bio || ""}
                type="text"
                className="col-span-2 w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
                onChange={(e) => {
                  setBio(e.target.value);
                  bioSuggestions(e.target.value);
                  if (e.target.value.length > 2) setBioSuggestionbox(true);
                }}
                onKeyDown={(e) => {
                  if (bioSuggestionbox) {
                    const selectedIndex = bioRolesArray.findIndex(
                      (role) => role === bio
                    );
                    switch (e.key) {
                      case "ArrowDown":
                        const nextIndex = Math.min(
                          selectedIndex + 1,
                          bioRolesArray.length - 1
                        );
                        setBio(bioRolesArray[nextIndex]);
                        break;
                      case "ArrowUp":
                        const prevIndex = Math.max(selectedIndex - 1, 0);
                        setBio(bioRolesArray[prevIndex]);
                        break;
                      case "Enter":
                        setBioSuggestionbox(false);
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
                  setManualBio(false);
                  setBio("");
                }}
              />
              {bioSuggestionbox && (
                <div
                  ref={bioDropDown}
                  className="w-full border-[1px] border-gray-400 absolute bg-white z-10 rounded-md px-2 max-h-72 h-min overflow-y-scroll scrollbar-thin shadow-md"
                >
                  {bioRolesArray.map((role, index) => (
                    <div
                      className={`border-b-[1px] border-gray-400 cursor-default hover:bg-blue-800 hover:text-white ${
                        bio === role ? "bg-blue-800 text-white" : "" // Highlight selected role
                      }`}
                      key={index}
                      onClick={() => {
                        setBio(role);
                        setBioSuggestionbox(false);
                      }}
                    >
                      {role}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                      className={`border-b-[1px] border-gray-400 cursor-default hover:bg-blue-800 hover:text-white ${
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

            <input
              placeholder="Email"
              value={email}
              type="email"
              className="col-span-1 w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Phone No"
              className="numberInput col-span-1 w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
              type="number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <input
              placeholder="LinkedIn"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="col-span-1 w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
            />
            <input
              placeholder="Twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="col-span-1 w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
            />
            <div className="col-span-2 flex w-full justify-end">
              <Button
                onClick={() => handleSaveProfile()}
                size="sm"
                color="blue"
                className="mt-4"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      {error.length > 0 && (
        <p className="w-full text-center mb-3 text-red-600">{error}</p>
      )}
    </Dialog>
  );
}

export default EditProfileNew;
