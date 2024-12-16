import React, { useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { FaFileDownload } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { useState } from "react";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { UserContext } from "../UserContext";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const ResumeDialog = (props) => {
  const { user, handleUpload } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [allfiles, setAllFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlefileDownload = (resumeFile, resumeName) => {
    const pdfUrl = resumeFile;
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = pdfUrl;
    link.download = `${resumeName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      setFile(null);
      alert("Please select a PDF file!");
      return;
    }
    setFile(selectedFile);
  };

  const getAllFiles = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/userResume/get-resume`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const res = await response.json();
      if (res.success) {
        // reverse the array
        res.data.reverse();
        setAllFiles(res.data);
        setSelectedFile(res.data[0]?._id);
        setSelectedFileName(res.data[0]?.resumeName);
        // console.log(res.data);
        
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getAllResume = async () => {
  //     try {
  //       const response = await fetch(`${SERVER_URL}/userResume/get-all-resume`, {
  //         method: "GET",
  //         headers: {
  //           // "Content-Type": "application/json",
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //       });
  //       const res = await response.json();
  //       console.log("res", res);
  //       if (res.success) {
  //         setAllFiles(res.data);
  //       } else {
  //         console.log(res.error);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleUploadfile = async () => {
    if (!file) {
      setError("Please select a file");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    if (file) {
      const fileURL = await handleUpload(file, "image");
      // console.log(file);
      const data = {
        fileURL,
        fileName: file.name,
      };
      try {
        const response = await fetch(`${SERVER_URL}/userResume/add-resume`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const res = await response.json();
        if (res.success) {
          getAllFiles();
          // setSelectedFile(allfiles[0]?._id);
          setFile(null);
          setSuccess(res.message);
          setTimeout(() => {
            setSuccess("");
          }, 1000);
        } else {
          setError(res.error);
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      } catch (error) {
        setError(error.message || "Error uploading resume");
      }
    }
  };

  const handlefileDelete = async (id) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/userResume/remove-resume/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const res = await response.json();
      console.log("res", res);
      if (res.success) {
        setSuccess(res.message);
        setTimeout(() => {
          setSuccess("");
        }, 1000);
        getAllFiles();
      } else {
        setError(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJobApplication = async () => {
    if (!selectedFile) {
      setError("Please select a file");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      // userId, jobId, userResumeId
      try {
        const response = await fetch(`${SERVER_URL}/userJob/apply-job`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            userId: user._id,
            userResumeId: selectedFile,
            jobId: props?.jobId,
          }),
        });

        const res = await response.json();
        if (res.success) {
          props.handler();
          props.checkIfApplied();
          setSuccess(res.message);
          toast.success(res.message);
          setTimeout(() => {
            setSuccess("");
          }, 1000);
        } else {
          setError(res.error);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    getAllFiles();
  }, [user]);

  return (
    <Dialog open={props.open} handler={props.handler} size="sm">
      <DialogHeader className="py-2 px-4 pt-2">{props.title}</DialogHeader>
      <DialogBody className="flex flex-col py-0 px-4 m-0">
        <p className="text-black">Your uploaded resumes</p>
        <div className="mb-4 max-h-24 overflow-y-scroll scrollbar-thin">
          {allfiles?.length > 0 &&
            allfiles.map((file, index) => (
              <div
                key={index}
                className={`my-1 w-full sm:w-2/3 p-2 rounded-md flex items-center justify-between cursor-pointer ${
                  selectedFile === file._id
                    ? `${
                        props.route === "Apply"
                          ? "border-2 border-blue-400 text-blue-400"
                          : "border-[1px] border-gray-400"
                      }`
                    : "border-[1px] border-gray-400"
                }`}
                onClick={() => {setSelectedFile(file._id), setSelectedFileName(file.resumeName)}}
              >
                <p>{file.resumeName}</p>
                <div className="flex gap-1">
                  <FaFileDownload
                    className="w-5 h-5 cursor-pointer"
                    onClick={() =>
                      handlefileDownload(file.resumeURL, file.resumeName)
                    }
                  />
                  <MdDelete
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handlefileDelete(file._id)}
                  />
                </div>
                
              </div>
            ))}
        </div>
        <p className="">Upload a New Resume</p>
        <div className="relative mt-1 border-[1px] border-dashed border-gray-400 w-full h-24 p-2 rounded-md flex items-center justify-center cursor-pointer">
          <div className="flex w-full h-full items-center justify-center">
          <input
            id="file-upload"
            className="hidden"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="flex gap-1">
            <IoDocumentTextSharp className="w-5 h-5" />{" "}
            <span className="">
              {file ? file.name : "Upload file"}
            </span>
          </label>
          </div>
          <IoClose
            className="w-4 h-4 absolute right-1 top-1 cursor-pointer text-gray-600"
            onClick={() => setFile(null)}
          />
        </div>
      </DialogBody>
      <DialogFooter className="flex gap-2 w-full flex-col">
          <Button
            size="sm"
            color={`${file ? "blue" : "blue-gray"}`}
            onClick={handleUploadfile}
            className=" w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
            variant={`${props.route === "Apply" ? "outlined" : "filled"}`}
            disabled={!file}
          >
            Upload Resume
          </Button>
        <Button
          size="sm"
          variant="outlined"
          color="blue"
          onClick={props.handler}
          className={`${props.route === "Apply" ? "hidden" : "block"} w-full`}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          color="blue"
          onClick={handleJobApplication}
          variant="outlined"
          className={`${props.route === "Apply" ? "block" : "hidden"} w-full`}
        >
          Apply with <span className="text-gray-700">{selectedFileName}</span>
        </Button>
      </DialogFooter>
      <div
        className={`text-red-500 w-full text-center mb-2 ${
          error.length < 0 ? "hidden" : "block"
        }`}
      >
        {error}
      </div>
      <div
        className={`text-green-500 w-full text-center mb-2 ${
          success.length < 0 ? "hidden" : "block"
        }`}
      >
        {success}
      </div>
    </Dialog>
  );
};

export default ResumeDialog;
