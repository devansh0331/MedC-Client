import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import {
  Button,
  Dialog,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
const EditEdu = (props) => {
  console.log("Education" + props.singleEducationData.organization);
  const handleEduEdit = () => {
    props.setOpenEduEdit(!props.openEduEdit);
  };
  const [organization, setOrganization] = useState(
    props.singleEducationData && props.singleEducationData.organization
      ? props.singleEducationData.organization
      : ""
  );
  const [course, setCourse] = useState(
    props.singleEducationData && props.singleEducationData.course
      ? props.singleEducationData.course
      : ""
  );
  const [startingMonth, setStartingMonth] = useState(
    props.singleEducationData && props.singleEducationData.startingMonth
      ? props.singleEducationData.startingMonth
      : ""
  );
  const [endingMonth, setEndingMonth] = useState(
    props.singleEducationData && props.singleEducationData.endingMonth
      ? props.singleEducationData.endingMonth
      : ""
  );

  useEffect(() => {
    setOrganization(
      props.singleEducationData && props.singleEducationData.organization
        ? props.singleEducationData.organization
        : ""
    );
    setCourse(
      props.singleEducationData && props.singleEducationData.course
        ? props.singleEducationData.course
        : ""
    );
    setStartingMonth(
      props.singleEducationData && props.singleEducationData.startingMonth
        ? props.singleEducationData.startingMonth
        : ""
    );
    setEndingMonth(
      props.singleEducationData && props.singleEducationData.endingMonth
        ? props.singleEducationData.endingMonth
        : ""
    );
  }, [props.singleEducationData]);
  const handleEducation = async () => {
    if (props.singleEducationData._id == undefined) {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/add/education`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify({
              organization,
              course,
              startingMonth,
              endingMonth,
            }),
          }
        );
        const res = await response.json();
        if (res.success) {
          props.getUserEducation();
          props.setSingleEducationData({});
          props.setToast("Education added successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to add", false);
      }
    } else {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/edit/education/${props.singleEducationData._id}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
              organization,
              course,
              startingMonth,  
              endingMonth,
            }),
          }
        );
        const res = await response.json();
        if (res.success) {
          props.getUserEducation();
          props.setSingleEducationData({});
          props.setToast("Education updated successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
      }
    }
  };

  const handleDeleteEducation = async () => {
    if (props.singleEducationData._id != undefined) {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/delete/education/${props.singleEducationData._id}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        const res = await response.json();
        console.log(res);
        console.log(res.success);
        if (res.success) {
          console.log(res.success);
          props.getUserEducation();
          // props.setSingleEducation({});
          props.setToast("Education deleted successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
      }
    } else {
      props.setToast("Failed to delete", false);
    }
  };

  return (
    <Dialog open={props.openEduEdit} handler={handleEduEdit} className="p-4">
      <div className="flex w-full justify-between items-start">
        <Typography className="text-2xl font-bold">Edit Education</Typography>
        <IoClose className="cursor-pointer w-6 h-6" onClick={handleEduEdit} />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Input
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            label="Organization"
            size=""
          />
        </div>
        <div className="col-span-2">
          <Input
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            label="Course"
            size=""
          />
        </div>

        <Input
          value={startingMonth}
          onChange={(e) => setStartingMonth(e.target.value)}
          label="Start Date"
          size=""
          type="month"
        />
        <Input
          value={endingMonth}
          onChange={(e) => setEndingMonth(e.target.value)}
          label="End Date"
          size=""
          type="month"
        />
      </div>
      <Button size="sm" color="blue" className="mt-4">
        Save
      </Button>
    </Dialog>
  );
};

export default EditEdu;
