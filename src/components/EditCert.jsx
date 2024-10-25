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
import { RiGalleryFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
// import { set } from "mongoose";

const EditCert = (props) => {
  const [certificate, setCertificate] = useState("");

  const [issuer, setIssuer] = useState("");

  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);

  const [check, setCheck] = useState(false);

  const handleCertificate = async () => {
    // console.log( file.length);
    if (certificate.length <= 0 || issuer.length <= 0 || description.length <= 0) {
      setCheck(true);
      setTimeout(() => {
        setCheck(false);
      }, 2000);
      console.log("First Check")
      return;
    }else{
      const formData = new FormData();
      if (
        certificate != "" &&
        issuer != "" &&
        description != ""
      ) {
        setCheck(false);
        if (props.singleCertificateData._id == undefined) {
          if (file && certificate != "" && issuer != "" && description != "") {
            const data = {
              certificate,
              issuer,
              description,
            };
            formData.append("data", JSON.stringify(data));
            formData.append("filepath", file);
            try {
              const response = await fetch(
                `${SERVER_URL}/auth/update-profile/add/certificate-with-file`,
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
              // console.log(res);
              if (res.success) {
                props.getUserCertificate();
                props.setSingleCertificateData({});
                props.handleCertEdit();
                props.setToast("Certificate added successfully", true);
              } else {
                props.setToast("Failed to add", false);
              }
            } catch (error) {
              props.setToast("Failed to add", false);
            }
          } else {
            const data = {
              certificate,
              issuer,
              description,
            };
            formData.append("data", JSON.stringify(data));
            try {
              const response = await fetch(
                `${SERVER_URL}/auth/update-profile/add/certificate`,
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                  },
                  body: formData
                }
              );
              const res = await response.json();
              // console.log("Edit Cert: ", res);
              if (res.success) {
                props.getUserCertificate();
                props.setSingleCertificateData({});
                props.handleCertEdit();
                props.setToast("Certificate added successfully", true);
              }
            } catch (error) {
              props.setToast("Failed to add", false);
            }
          }
        } else {
          console.log(certificate, issuer, description);
          
          const response = await fetch(
            `${SERVER_URL}/auth/update-profile/edit/certificate/${props.singleCertificateData._id}`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
              body: JSON.stringify({
                certificate,
                issuer,
                description,
              }),
            }
          )
          const res = await response.json();
          if (res.success) {
            props.getUserCertificate();
            props.setSingleCertificateData({});
            props.handleCertEdit();
            props.setToast("Certificate updated successfully", true);
          }else{
            props.setToast("Failed to update", false);
          }
        }
      } else {
        console.log("Second Check")
        setCheck(true);
        setTimeout(() => {
          setCheck(false);
        }, 2000);
      }
    }
  };
  const handleDeleteCertificate = async () => {
    if (props.singleCertificateData._id != undefined) {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/delete/certificate/${props.singleCertificateData._id}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        const res = await response.json();

        // console.log(res.success);
        if (res.success) {
          props.getUserCertificate();
          props.setSingleCertificateData({});
          props.handleCertEdit();
          props.setToast("Certificate deleted successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
      }
    } else {
      props.setToast("Failed to delete", false);
    }
  };

  const handleCertEdit = () => {
    setCertificate("");
    setIssuer("");
    setDescription("");
    props.setOpenCertEdit(!props.openCertEdit);
  };

  useEffect(() => {
    setCertificate(
      props.singleCertificateData && props.singleCertificateData.certificate
        ? props.singleCertificateData.certificate
        : ""
    );
    setIssuer(
      props.singleCertificateData && props.singleCertificateData.issuer
        ? props.singleCertificateData.issuer
        : ""
    );
    setDescription(
      props.singleCertificateData && props.singleCertificateData.description
        ? props.singleCertificateData.description
        : ""
    );
    setFile(
      props.singleCertificateData && props.singleCertificateData.certificateURL
        ? props.singleCertificateData.certificateURL
        : null
    );
  }, [props.singleCertificateData]);

  return (
    <Dialog open={props.openCertEdit} handler={handleCertEdit} className="p-4">
      <div className="flex w-full justify-between items-start">
        <Typography className="text-2xl font-bold">
          {certificate === "" ? "Add" : "Edit"} Certificate
        </Typography>
        <div className="flex">
          <IoClose
            className="cursor-pointer w-6 h-6"
            onClick={handleCertEdit}
          />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-4">
        <input
          value={certificate}
          onChange={(e) => setCertificate(e.target.value)}
          placeholder="Title"
          size=""
          className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
        />
        <input
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          placeholder="Issuer"
          size=""
          className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          size=""
          className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-30 p-2 rounded-md items-center text-blue-gray-500 text-sm"
        />
        {certificate === "" && (
        <div className="relative border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center">
          <input
            id="file-upload-image"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file-upload-image">
            <RiGalleryFill className="w-5 h-5  absolute left-4 top-1/2 -translate-y-1/2" />{" "}
            <span className="ml-8 absolute top-1/2 -translate-y-1/2">
              {file ? file.name : "Upload Certificate"}
            </span>
          </label>
          <IoClose
            className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setFile(null)}
          />
        </div>
        )}
      </div>
      <div className="flex justify-start items-center">
        <Button
          onClick={handleCertificate}
          size="sm"
          color="blue"
          className="mt-4"
        >
          Save
        </Button>
        <Button
          onClick={handleDeleteCertificate}
          size="sm"
          variant="outlined"
          color="red"
          className="mt-4 ml-4"
        >
          Delete
        </Button>
      </div>
      {check && (
        <Typography className="text-red-500 text-center w-full">
          All fields are mandatory
        </Typography>
      )}
    </Dialog>
  );
};

export default EditCert;
