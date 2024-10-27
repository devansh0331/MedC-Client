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
import toast, { Toaster } from "react-hot-toast";

const ResumeDialog = (props) => {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [allfiles, setAllFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

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
          // "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const res = await response.json();
      // console.log("res", res);
      if (res.success) {
        setAllFiles(res.data);
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
      toast.error("Please select a file");
      return;
    }
    const formData = new FormData();
    if (file) {
      formData.append("filepath", file);
      // console.log(formData);

      try {
        const response = await fetch(`${SERVER_URL}/userResume/add-resume`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: formData,
        });

        const res = await response.json();
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          getAllFiles();
          setFile(null);
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        console.error(error); // Log the actual error for debugging
        toast.error(error.message || "Error uploading resume"); // Use error message if available, otherwise a fallback message
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
        toast.success(res.message);
        getAllFiles();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
// console.log(props?.jobId)
// console.log("resume",selectedFile);

  const handleJobApplication = async () => {
    if(!selectedFile){
      setError("Please select a file");
      setTimeout(() => {
        setError("");
      },2000)
    }else{
      // userId, jobId, userResumeId
      try {
        const response = await fetch(`${SERVER_URL}/userJob/apply-job`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            userId: user._id,
            userResumeId: selectedFile,
            jobId: props?.jobId
          }),
        })

        const res = await response.json();
        if(res.success){
          props.handler();
          props.checkIfApplied();
          toast.success(res.message);
        }else{
          setError(res.error);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    getAllFiles();
    // getAllResume();
  }, [user]);

  return (
    <Dialog open={props.open} handler={props.handler} size="sm">
      <DialogHeader className="py-2 px-4 pt-2">{props.title}</DialogHeader>
      <DialogBody className="flex flex-col py-0 px-4 m-0">
        <div className="mb-4">
          {allfiles?.length > 0 &&
            allfiles.map((file, index) => (
              <div
                key={index}
                className={`my-1 w-full sm:w-2/3 p-2 rounded-md flex items-center justify-between cursor-pointer ${
                  selectedFile === file._id 
                    ? `${props.route === "Apply" ? "border-2 border-blue-400 text-blue-400" : "border-[1px] border-gray-400" }` 
                    : "border-[1px] border-gray-400"
                }`}
                onClick={() => setSelectedFile(file._id)}
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
        <p className="">Upload New Resume</p>
        <div className="mt-1 relative border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center">
          <input
            id="file-upload"
            className="hidden"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="">
            <IoDocumentTextSharp className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" />{" "}
            <span className="ml-8 absolute top-1/2 -translate-y-1/2">
              {file ? file.name : "Upload file"}
            </span>
          </label>
          <IoClose
            className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setFile(null)}
          />
        </div>
      </DialogBody>
      <DialogFooter className="flex gap-2">
        <Button
          size="sm"
          variant="outlined"
          color="blue"
          onClick={props.handler}
          className={`${props.route === "Apply" ? "hidden" : "block"}`}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          color="blue"
          onClick={handleUploadfile}
          variant={`${props.route === "Apply" ? "outlined" : "filled"}`}
        >
          Upload
        </Button>
        <Button
          size="sm"
          color="blue"
          onClick={handleJobApplication}
          className={`${props.route === "Apply" ? "block" : "hidden"}`}
        >
          Apply
        </Button>
      </DialogFooter>
      <div className={`text-red-500 w-full text-center mb-2 ${error === "" ? "hidden" : "block"}`}>{error}</div>
    </Dialog>
  );
};

export default ResumeDialog;
