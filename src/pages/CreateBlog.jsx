import React, { useRef, useState } from "react";
import SingleBlogCard from "../components/SingleBlogCard";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { RiGalleryFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import ReactQuill from "react-quill";
import SideBar from "../components/SideBar";
import toast, { Toaster } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";

const CreateBlog = () => {
  const [active, setActive] = useState(0);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const modules = {
    toolbar: [
      // [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline"],
      [
        // { list: "ordered" },
        { list: "bullet" },
        // { indent: "-1" },
        // { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    // clipboard: {
    //   // toggle to add extra line breaks when pasting HTML:
    //   matchVisual: false,
    // },
  };
  const fileUploadRef = useRef(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const postBlog = async () => {
    if (!file || !title || !description) {
      console.log(file, title, description);
      
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const formData = new FormData();
      const data = { title: title, content: description };
      formData.append("data", JSON.stringify(data));
      if (file) {
        formData.append("filepath", file);
      }
      const response = await fetch(`${SERVER_URL}/blog/single-blog/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: formData,
      });
      const res = await response.json();

      if (res.success) {
        toast.success(res.message);
        setFile(null);
        setTitle("");
        setDescription("");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full h-[90vh] overflow-y-scroll scrollbar-thin flex bg-background pb-5">
      <SideBar />
      <div className="w-3/5 my-5 mx-auto">
        {active === 0 && (
          <Card className="flex flex-row">
            <div className="w-56 h-[500px] rounded-lg relative bg-gray-300">
              {file ? (
                <>
                  <img
                    src={URL.createObjectURL(file)} 
                    alt="profile"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <IoMdCloseCircle
                    className="w-7 h-7 absolute top-2 right-2 cursor-pointer text-gray-800"
                    onClick={() => setFile(null)}
                  />
                </>
              ) : (
                <div className="relative p-4">
                  <input
                    id="file-upload"
                    className="hidden"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label
                    htmlFor="file-upload"
                    className="profilepic px-3 py-0.5 w-full h-full text-base text-gray-700 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <RiGalleryFill className="w-5 h-5" />
                    Upload File
                  </label>
                </div>
              )}
            </div>

            <div className="p-4 w-full h-full">
              <input
                placeholder="Blog Title"
                className="text-[40px] h-[50px] w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div>
                <ReactQuill
                  className="react-quill h-full mt-2 rounded-lg"
                  modules={modules}
                  value={description}
                  placeholder="Enter Job Description"
                  onChange={(newValue) => setDescription(newValue)}
                />
              </div>
              <div className="w-full flex justify-end">
                <Button
                  className="bg-primary text-white px-3 py-1 mt-2 rounded-lg"
                  onClick={() => setActive(1)}
                >
                  Preview
                </Button>
              </div>
            </div>
          </Card>
        )}
        <Button
          className="bg-primary text-white px-3 py-2 mt-3 rounded-lg w-full"
          onClick={() => postBlog()}
        >
          Post
        </Button>
        {active === 1 && (
          <Card className="pb-4">
            <SingleBlogCard />
            <div className="w-full flex justify-end">
              <Button
                className="bg-primary text-white px-3 py-2 mt-3 rounded-lg mr-4"
                onClick={() => setActive(0)}
              >
                Edit
              </Button>
            </div>
          </Card>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default CreateBlog;
