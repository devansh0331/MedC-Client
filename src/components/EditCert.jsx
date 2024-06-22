import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";

const EditCert = (props) => {
  const [certificate, setCertificate] = useState(
    props.singleCertificateData && props.singleCertificateData.certificate
      ? props.singleCertificateData.certificate
      : ""
  );

  const [issuer, setIssuer] = useState(
    props.singleCertificateData && props.singleCertificateData.issuer
      ? props.singleCertificateData.issuer
      : ""
  );

  const [description, setDescription] = useState(
    props.singleCertificateData && props.singleCertificateData.description
      ? props.singleCertificateData.description
      : ""
  );

  const handleCertificate = async () => {
    console.log(certificate, issuer, description);
    if (props.singleCertificateData._id == undefined) {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/add/certificate`,
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
        );
        const res = await response.json();
        console.log("Edit Cert: ", res);
        if (res.success) {
          props.getUserCertificate();
          props.setToast("Certificate added successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to add", false);
      }
    } else {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/edit/certificate/${props.singleCertificateData._id}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              certificate,
              issuer,
              description,
            }),
          }
        );
        const res = await response.json();
        if (res.success) {
          props.getUserCertificate();
          props.setSingleCertificate({});
          props.setToast("Certificate updated successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
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

        console.log(res.success);
        if (res.success) {
          console.log(res.success);
          props.getUserCertificate();
          props.setToast("Certificate deleted successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
      }
    } else {
      props.setToast("Failed to delete", false);
    }
  };

  return (
    <div className="w-screen h-screen z-100 bg-dialogueBg flex">
      <div className="w-2/5 h-3/5 mx-auto mt-24 bg-white rounded-2xl flex flex-col p-3 justify-evenly">
        <div className="flex justify-between mx-4 mt-2">
          <p className="text-lg text-gray-700 font-medium">Edit Certificate</p>
          <button onClick={() => props.setEditCert(false)}>
            <MdClose className="w-6 h-6 text-gray-700 font-medium" />
          </button>
        </div>
        <div className="flex flex-col mx-4 my-1">
          <div className="flex flex-col my-1">
            <label className="text-gray-700 text-md">Certificate</label>
            <input
              value={certificate}
              onChange={(e) => setCertificate(e.target.value)}
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-2/3"
            />
          </div>
          <div className="flex flex-col h-1/2 my-1">
            <label className="text-gray-700 text-md">Issuer</label>
            <input
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-full"
            />
          </div>
          <div className="flex flex-col my-1">
            <label className="text-gray-700 text-md">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-16"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mx-4 mt-2">
            <button
              className="text-red-400 border-2 border-red-400 px-3 py-1 rounded-md"
              onClick={() => {
                handleDeleteCertificate();
                props.setEditCert(false);
              }}
            >
              Delete
            </button>
          </div>
          <div className="mx-4 mt-2">
            <button
              className="text-primary border-2 border-primary px-3 py-1 rounded-md"
              onClick={() => props.setEditCert(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleCertificate();
                props.setEditCert(false);
              }}
              className="text-white bg-primary px-3 py-1 rounded-md ml-3"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCert;
