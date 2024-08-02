import React from "react";
import { useEffect } from "react";
import profile2 from "../assets/profile2.png";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { useState } from "react";
import EditProfile from "./EditProfile";
import altprofile from "../assets/altprofile.png";
import { FaRegEdit } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { Country, State, City } from "country-state-city";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Typography,
  Avatar,
  Button,
  Dialog,
  CardFooter,
} from "@material-tailwind/react";

import Cookies from "js-cookie";
import { SERVER_URL } from "../ServerURL";

function EditProfileNew({
  user,
  openEdit,
  setOpenEdit,
  setToast,
  getSingleUser,
}) {
  const handleOpenEdit = () => setOpenEdit();
  const CityArr = City.getCitiesOfCountry("IN");
  const StateArr = State.getStatesOfCountry("IN");
  console.log(user);
  const [resume, setResume] = useState(null);
  const [number, setNumber] = useState("");
  const [fName, setFName] = useState(user.name ? user.name.split(" ")[0] : "");
  const [lName, setLName] = useState(user.name ? user.name.split(" ")[1] : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [location, setLocation] = useState(user.location ? user.location : "");
  const [file, setFile] = useState(null);
  const [contact, setContact] = useState(
    user.contact ? parseInt(user.contact) : ""
  );
  const [linkedin, setLinkedin] = useState(user.linkedin ? user.linkedin : "");
  const [twitter, setTwitter] = useState(user.twitter ? user.twitter : "");
  const [website, setWebsite] = useState(user.website ? user.website : "");
  const handleSaveProfile = async () => {
    console.log(location);
    const formData = new FormData();
    const data = {
      name: fName + " " + lName,
      email: email,
      bio: bio,
      location: location,
      contact: contact.toString(),
      linkedin: linkedin,
      twitter: twitter,
      website: website,
    };
    console.log(data);
    formData.append("data", JSON.stringify(data));

    if (file) {
      formData.append("filepath", file);
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/social-info`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: formData,
          }
        );

        const res = await response.json();
        console.log(res);
        if (res.success) {
          getSingleUser();
          setOpenEdit();
          setToast("Profile updated successfully", true);
        }
      } catch (error) {
        setOpenEdit();
        setToast("Failed to update", false);
      }
    }

    // NO FILE
    else {
      try {
        console.log(formData.getAll("data"));
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/social-info-no-profile`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: formData,
          }
        );

        const res = await response.json();
        console.log(res);
        if (!res.success) {
          props.setToast("Failed to update", false);
        } else {
          getSingleUser();
          setOpenEdit();
          setToast("Profile updated successfully", true);
        }
      } catch (error) {
        setOpenEdit();
        setToast("Failed to update", false);
      }
    }
  };
  return (
    <Dialog
      open={openEdit}
      handler={handleOpenEdit}
      size="md"
      className="p-5 flex flex-col gap-4"
    >
      <div className="flex w-full justify-between items-start">
        <Typography className="text-2xl font-bold">Edit Profile</Typography>
        <IoClose className="cursor-pointer w-6 h-6" onClick={handleOpenEdit} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 relative border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center">
          <input
            id="file-upload"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file-upload">
            <RiGalleryFill className="w-5 h-5  absolute left-4 top-1/2 -translate-y-1/2" />{" "}
            <span className="ml-8 absolute top-1/2 -translate-y-1/2">
              {file ? file.name : "Upload Profile Picture"}
            </span>
          </label>
          <IoClose
            className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setFile(null)}
          />
        </div>
        <Input
          label="First Name"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          className="col-span-1"
        />
        <Input
          label="Last Name"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
          className="col-span-1"
        />
        <select
          className="col-span-2 border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center"
          value={location}
          onChange={(e) => {
            console.log(e.target.value);
            setLocation(e.target.value);
          }}
          size={1}
        >
          <option disabled selected>
            Location
          </option>
          {CityArr.map((city, index) => (
            <option key={index}>
              {city.name},{" "}
              {
                StateArr.filter((state) => state.isoCode === city.stateCode)[0]
                  ?.name
              }
            </option>
          ))}
        </select>
        <Input label="Email" value={email} className="col-span-1" />
        <Input
          label="Phone No"
          className="numberInput col-span-1"
          type="number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <Input
          label="LinkedIn"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="col-span-1"
        />
        <Input
          label="Twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className="col-span-1"
        />
        {/* <div className="col-span-2 relative border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center">
            <input
              id="file-upload"
              className="hidden"
              type="file"
              accept="pdf/*"
              onChange={(e) => setResume(e.target.files[0])}
            />
            <label htmlFor="file-upload">
              <IoDocumentTextSharp className="w-5 h-5  absolute left-4 top-1/2 -translate-y-1/2" />{" "}
              <span className="ml-8 absolute top-1/2 -translate-y-1/2">
                {resume ? resume.name : "Upload Resume"}
              </span>
            </label>
            <IoClose
              className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setResume(null)}
            />
          </div> */}
        <div>
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
    </Dialog>
  );
}

export default EditProfileNew;
