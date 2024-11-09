import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import altprofile from "../assets/altprofile.png";
import { IoLocationSharp } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const UserCardAdmin = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const mailBody = document.getElementById("mailBody")?.innerHTML;
  const [reason, setReason] = useState("");
  const user = props.user;

  console.log(user);
  
  const deactivateUser = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/admin/deactivate-account/${user._id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({userEmail: user.email, mailbody: mailBody }),
      });
      const res = await response.json();
      if (res.success) {
        setOpen(false);
        props.parentFunction();
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="p-3 m-3 cursor-pointer">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2"
        onClick={() => {
          navigate(`/user/${user._id}`);
        }}
      >
        <img
          src={user.profileURL ? user.profileURL : altprofile}
          alt="altprofile"
          size="xl"
          className="w-24 h-24 mx-auto profile-pic rounded-full "
        />
        <Typography className="text-lg mt-2">
          {user.name ? user.name : "Unknown User"}
        </Typography>
        <Typography className="text-sm font-serif">
          {user.bio ? user.bio : "New User"}
        </Typography>
      </CardHeader>
      <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
        <Typography className="flex items-center">
          <IoLocationSharp />
          <span className="ml-1">
            {user.location ? user.location : "India"}
          </span>
        </Typography>
      </CardBody>
      <CardFooter className="m-0 p-0 mt-3 mx-auto">
        <Button
          size="sm"
          className="px-2 py-1 font-light rounded-md"
          variant="outlined"
          color="red"
          onClick={handleOpen}
        >
          Delete User
        </Button>
      </CardFooter>

      {/* DELETE DIALOG */}
      <Dialog open={open} handler={handleOpen} size="">
        <DialogHeader className="text-gray-800 m-0 pb-2">
          Delete User
        </DialogHeader>
        <DialogBody className="m-0 pt-2">
          <Typography className="text-gray-800 text-lg">
            Send user the following mail as a reason for deleting their account:
          </Typography>
          <p id="mailBody" className="w-full p-2 mt-2 border rounded-md h-52">
            Dear {user.name},
            <br />
            We are writing this to inform you that your account has been removed
            from the MedC job portal due to {reason}.
          <br/> 
          If you have any queries or concerns, please do not hesitate to contact us at medcofficalsupport.com.
            <br />
            <br />
            Best regards,
            <br />
            MedC Team
          </p>
          <input
            id="reason"
            type="text"
            placeholder="Reason for deleting account"
            className="w-full p-2 mt-2 border rounded-md"
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogBody>
        <DialogFooter className="flex gap-4">
          <Button
            variant="outlined"
            color="blue"
            onClick={handleOpen}
            size="sm"
            className=""
          >
            Cancel
          </Button>
          <Button variant="" color="blue" onClick={deactivateUser} size="sm">
            Delete User
          </Button>
        </DialogFooter>
      </Dialog>
      <Toaster position="top-right" />
    </Card>
  );
};

export default UserCardAdmin;
