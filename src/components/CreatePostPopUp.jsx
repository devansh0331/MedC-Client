import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import { SERVER_URL } from "../ServerURL";
import toast, { Toaster } from "react-hot-toast";
import { RiGalleryFill } from "react-icons/ri";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UserContext } from "../UserContext";

function CreatePostPopUp(props) {
  const [audience, setAudience] = useState("Everyone");
  const [post, setPost] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserID] = useState("");
  const { handleUpload, secureURL, setSecureURL } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const handleOpen = () => {
    props.setOpen(!props.open);
  };

  const handleSubmit = async () => {
    setLoader(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      try {
        const fileURL = await handleUpload(file, "image");
        setSecureURL(fileURL);
        if (fileURL.length > 0) {
          const response = await fetch(`${SERVER_URL}/post/create-post`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              audience: audience,
              description: post,
              fileURL: fileURL,
            }),
          });
          // console.log(response);
          const result = await response.json();
          // console.log(response);
          if (response.ok) {
            toast.success("Post created successfully:");
            setPost("");
            setFile(null);
            props.getAllPosts();
            handleOpen();
          } else {
            console.error("Failed to create post:", result.error);
            toast.error("Failed to create post");
          }
        } else {
          console.error("Failed to create post:");
          toast.error("Failed to create post");
        }
      } catch (error) {
        console.error("Error creating post");
        toast.error("Failed to create post");
      }
    } else {
      const response = await fetch(`${SERVER_URL}/post/create-post`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audience: audience,
          description: post,
        }),
      });
      // console.log(response);
      const result = await response.json();
      // console.log(response);
      if (response.ok) {
        toast.success("Post created successfully:");
        setPost("");
        setFile(null);
        props.getAllPosts();
        handleOpen();
      }
    }
    setLoader(false);
  };

  const handleAudienceChange = (event) => {
    setAudience(event.target.value);
  };
  return (
    <Dialog open={props.open} size="lg" handler={handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader className="flex items-center justify-between w-full px-6">
          {" "}
          <Typography className="mb-1 text-xl font-bold">
            Create a post{" "}
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 cursor-pointer"
            onClick={() => {
              setPost("");
              setFile(null);
              handleOpen();
            }}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </DialogHeader>
      </div>
      <div className="relative">
        <DialogBody className="m-0 b p-0 px-6">
          <div className="grid">
            <textarea
              placeholder="Share Your experience"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              required
              className="h-48 overflow-y-scroll w-full flex gap-2 justify-between border-[1px] border-gray-400 p-2 rounded-md items-center text-blue-gray-500 text-sm"
            ></textarea>
          </div>

          <div className="flex flex-col my-1">
            <label className="text-gray-700 text-sm">Upload File</label>
            <div className="relative">
              <input
                id="file-upload"
                className="hidden"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label
                htmlFor="file-upload"
                className="border-2 profilepic border-gray-400 rounded-md px-3 py-0.5 w-full h-full text-sm text-gray-700 flex items-center cursor-pointer"
              >
                <RiGalleryFill className="w-5 h-5" />{" "}
                <span className="ml-2">{file ? file.name : "Upload File"}</span>
              </label>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="gray"
            onClick={() => {
              handleOpen();
              setPost("");
              setFile(null);
            }}
          >
            cancel
          </Button>
          <Button
            onClick={() => handleSubmit()}
            className=" bg-primary text-white  rounded-full "
          >
            Post
          </Button>
          <Toaster position="top-right" />
        </DialogFooter>
        {loader && (
          <div className="w-full h-full absolute bg-white opacity-80 top-0 flex justify-center items-center">
            <div class="loader"></div>
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default CreatePostPopUp;
