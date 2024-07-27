import React, { useEffect } from "react";
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
import { Country, State, City }  from 'country-state-city';
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

const ProfileCard = (props) => {
  const [check, setCheck] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const CityArr = City.getCitiesOfCountry("IN");
  const StateArr = State.getStatesOfCountry("IN");
  const handleOpenProfile = () => setOpenProfile(!openProfile);
  const handleOpenEdit = () => setOpenEdit(!openEdit);
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);
  const [number, setNumber] = useState("");

  const handleNumber = (num) => {
    if (num.length <= 10) {
      setNumber(num);
    }
  }
  return (
    <>
      <Card className="min-w-80 bg-white p-4 h-min">
        <div
          className="flex justify-end pt-2 px-2 -mt-4 -mr-4  cursor-pointer"
          onClick={handleOpenEdit}
        >
          <FaRegEdit />
        </div>
        <div className="flex flex-col">
          <CardHeader
            className="flex flex-col items-center m-0 pb-2 mb-2 rounded-none justify-around border-b-2"
            floated={false}
            shadow={false}
            color="transparent"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <Avatar
              src={altprofile}
              size="xl"
              className="mb-3 cursor-pointer w-24 h-24"
              alt="profile"
              onClick={handleOpenProfile}
            />
            <div className="flex flex-col items-center">
            <Typography className="text-lg font-semibold">John Doe</Typography>
            <Typography className="text-md">Developer</Typography>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col px-4 py-1 border-b-2">
            <div className="flex flex-row gap-1 items-center mb-1">
              <IoLocationSharp className="text-gray-700" />
              <Typography className="ml-2">Bhilai, Chattissgarh</Typography>
            </div>
            <div className="flex flex-row gap-1 items-center mb-1">
              <MdEmail className="text-gray-700" />
              <Typography className="ml-2">johndoe@gmail.com</Typography>
            </div>
            <div className="flex flex-row gap-1 items-center mb-1">
              <FaPhoneAlt className="text-gray-700" />
              <Typography className="ml-2">+91 123456789</Typography>
            </div>
            <div className="flex flex-row gap-1 items-center mb-1">
              <FaLinkedinIn className="text-gray-700" />
              <Typography className="ml-2">linkedin</Typography>
            </div>
            <div className="flex flex-row gap-1 items-center mb-1">
              <FaXTwitter className="text-gray-700" />
              <Typography className="ml-2">twitter</Typography>
            </div>
          </CardBody>
          <CardBody className="flex flex-col px-4 py-2 border-b-2">
            <div className="flex flex-row gap-1 items-center mb-1 justify-between">
              <Typography className="">Saved Jobs</Typography>
              <Typography className="text-base text-white bg-blue-500 px-2 rounded-full" >38</Typography>
            </div>
            <div className="flex flex-row gap-1 items-center mb-1 justify-between">
              <Typography className="text-base">Posted Jobs</Typography>
              <Typography className="text-base text-white bg-blue-500 px-2 rounded-full" >08</Typography>
            </div>
            <div className="flex flex-row gap-1 items-center mb-1 justify-between">
              <Typography className="text-base">Applied Jobs</Typography>
              <Typography className="text-base text-white bg-blue-500 px-2 rounded-full" >30</Typography>
            </div>
          </CardBody>
          <CardFooter className="flex px-4 py-2 justify-between mt-2">
            <Button variant="outlined" size="sm" color="blue">Resume</Button>
            <Button variant="filled" size="sm" color="blue">Connect</Button>
          </CardFooter>
        </div>
      </Card>

      {/* OPEN PROFILE PICTURE */}
      <Dialog
        open={openProfile}
        handler={handleOpenProfile}
        className="flex justify-between p-4 gap-4 items-center border-8 border-blue-400"
        size="sm"
      >
        <img
          src={altprofile}
          className="w-1/2 h-full rounded-full"
          alt="profile"
        />
        <div className="w-full flex flex-col justify-center items-center">
          <Typography className="text-3xl font-bold">John Doe</Typography>
          <Typography className="text-2xl">Developer</Typography>
        </div>
      </Dialog>

      {/* EDIT PROFILE */}
      <Dialog
        open={openEdit}
        handler={handleOpenEdit}
        size="md"
        className="p-5 flex flex-col gap-4"
      >
        <div className="flex w-full justify-between items-start">
          <Typography className="text-2xl font-bold">Edit Profile</Typography>
          <IoClose
            className="cursor-pointer w-6 h-6"
            onClick={handleOpenEdit}
          />
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
              <IoClose className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setFile(null)} />
          </div>
          <Input label="First Name" className="col-span-1" />
          <Input label="Last Name" className="col-span-1" />
          <select className="col-span-2 border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center" size={1} >
            <option disabled selected>Location</option>
            {CityArr.map((city, index) => (
              <option key={index}>{city.name}, {StateArr.filter((state) => state.isoCode === city.stateCode)[0]?.name}</option>
            ))}
          </select>
          <Input label="Email" className="col-span-1" />
          <Input label="Phone No" className="numberInput col-span-1" type="number" value={number} onChange={(e) => handleNumber(e.target.value)} />
          <Input label="LinkedIn" className="col-span-1" />
          <Input label="Twitter" className="col-span-1" />
          <div className="col-span-2 relative border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center">
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
              <IoClose className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setResume(null)} />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileCard;
