import React, { useEffect } from "react";
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
  const [activateOpen, setActivateOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleActivateOpen = () => setActivateOpen(!activateOpen);
  const handleAdminOpen = () => setAdminOpen(!adminOpen);
  const navigate = useNavigate();
  const user = props.user;
  const [mailBody2, setMailBody2] = useState(`Dear ${user.name},
            <br />
            <br />
            We are writing this to inform you that your account has been
            activated at the MedC job portal.
            You can now log in to your account with your previous credentials.
            <br />
            If you have any queries or concerns, please do not hesitate to
            contact us at medcofficalsupport.com.
            <br />
            <br />
            Best regards,
            <br />
            MedC Team`);
  const [reason, setReason] = useState("");
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  // console.log(user._id);

  const deactivateUser = async () => {
    const mailBody = document.getElementById("mailBody")?.innerHTML;
    try {
      const response = await fetch(
        `${SERVER_URL}/admin/deactivate-account/${user._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: user.email, mailbody: mailBody }),
        }
      );
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

  const activateUser = async () => {
    // console.log(user.email, mailBody2);
    try {
      const response = await fetch(
        `${SERVER_URL}/admin/activate-account/${user._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: user.email, mailbody: mailBody2 }),
        }
      );
      const res = await response.json();
      console.log(res);

      if (res.success) {
        setActivateOpen(false);
        props.parentFunction();
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserAdmin = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/admin/is-user-admin/${user._id}`,
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
        setIsUserAdmin(true);
      } else {
        setIsUserAdmin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserAdmin();
  }, [user]);

  const addAdmin = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/admin/add/${user._id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res.success) {
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
    <div className="p-3 m-3 cursor-pointer z-0 bg-white rounded-lg">
      {user.isUserDeactivated && (
        <p className="text-red-500 mb-1">*Deactivated by User</p>
      )}
      <div
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
      </div>
      <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
        <Typography className="flex items-center">
          <IoLocationSharp />
          <span className="ml-1">
            {user.location ? user.location : "India"}
          </span>
        </Typography>
      </CardBody>
      <CardFooter className="m-0 p-0 mt-3 mx-auto flex gap-3 justify-evenly">
        {user.isDeactivated ? (
          <Button
            size="sm"
            className="px-2 py-1 font-light rounded-md"
            variant=""
            color="green"
            onClick={handleActivateOpen}
          >
            Activate
          </Button>
        ) : (
          <Button
            size="sm"
            className="px-2 py-1 font-light rounded-md"
            variant="outlined"
            color="red"
            onClick={handleOpen}
          >
            Delete User
          </Button>
        )}
        {isUserAdmin ? (
          <Button size="sm" color="black" variant="outlined" className="">
            Remove Admin
          </Button>
        ) : (
          <Button size="sm" color="blue" onClick={handleAdminOpen}>
            Add Admin
          </Button>
        )}
      </CardFooter>

      {/* DELETE DIALOG */}
      <Dialog
        open={open}
        handler={handleOpen}
        size=""
        className="h-[80vh] overflow-y-scroll scrollbar-invisible"
      >
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
            <br />
            If you have any queries or concerns, please do not hesitate to
            contact us at medcofficalsupport.com.
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
            value={reason}
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

      {/* ACTIVATE DIALOG */}
      <Dialog
        open={activateOpen}
        handler={handleActivateOpen}
        size=""
        className="max-h-[80vh] overflow-y-scroll scrollbar-invisible"
      >
        <DialogHeader className="text-gray-800 m-0 pb-2">
          Activate User
        </DialogHeader>
        <DialogBody className="m-0 pt-2">
          <Typography className="text-gray-800 text-lg">
            Send user the following mail as an acknowledgement for activating
            their account:
          </Typography>
          <p id="mailBody2" className="w-full p-2 mt-2 border rounded-md h-52">
            Dear {user.name},
            <br />
            <br />
            We are writing this to inform you that your account has been
            activated at the MedC job portal. You can now log in to your account
            with your previous credentials.
            <br />
            If you have any queries or concerns, please do not hesitate to
            contact us at medcofficalsupport.com.
            <br />
            <br />
            Best regards,
            <br />
            MedC Team
          </p>
        </DialogBody>
        <DialogFooter className="flex gap-4">
          <Button
            variant="outlined"
            color="blue"
            onClick={handleActivateOpen}
            size="sm"
            className=""
          >
            Cancel
          </Button>
          <Button variant="" color="blue" onClick={activateUser} size="sm">
            Activate User
          </Button>
        </DialogFooter>
      </Dialog>
      <Toaster position="top-right" />

      {/* MAKE ADMIN DIALOG */}
      <Dialog open={adminOpen} handler={handleAdminOpen}>
        <DialogHeader className="text-gray-800 m-0 pb-2">
          Make Admin
        </DialogHeader>
        <DialogBody className="m-0 pt-2">
          <Typography className="text-gray-800 text-lg">
            Are you sure you want to add this user as an admin?
          </Typography>
        </DialogBody>
        <DialogFooter className="flex gap-4">
          <Button
            variant="outlined"
            color="blue"
            onClick={handleAdminOpen}
            size="sm"
            className=""
          >
            Cancel
          </Button>
          <Button variant="" color="blue" onClick={addAdmin} size="sm">
            Add Admin
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default UserCardAdmin;
