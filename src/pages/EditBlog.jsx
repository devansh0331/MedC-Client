import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../ServerURL";
import { useEffect } from "react";
import Cookies from "js-cookie";
import SideBar from "../components/SideBar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { RiGalleryFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import ReactQuill from "react-quill";
import toast, { Toaster } from "react-hot-toast";
import SingleBlogCard from "../components/SingleBlogCard";

const EditBlog = () => {
  const [active, setActive] = useState(0);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const blogId = useParams();
  const [blog, setBlog] = useState({});
  const modules = {
    toolbar: [
      // [{ header: "1" }, { header: "2" }],
      // [{ size: [] }],
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

  const getSingleBlog = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/blog/single-blog/get/${blogId.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const res = await response.json();

      if (res.success) {
        setBlog(res.data);
        setTitle(res.data.title);
        setDescription(res.data.content);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  let blogPreview = {
    title: title,
    content: description,
    coverImage: blog.coverImage,
  };

  const editBlog = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/blog/single-blog/edit/${blogId.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({title, content: description})
        }
      );
      const res = await response.json();
      
      if(res.success){
        toast.success(res.message);
        setTitle("");
        setDescription("");
        getSingleBlog();
      }else{
        toast.error(res.error);
      }
    } catch (error) {
        toast.error(error);
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, [blogId]);

  return (
    <div>
      <div className="w-full h-[90vh] overflow-y-scroll scrollbar-thin flex bg-background pb-5">
        <SideBar />
        <div className="flex flex-col w-[95%] lg:w-4/5 xl:w-3/5 my-5 mx-auto pb-5">
          <div className="">
            {active === 0 && (
              <Card className="flex flex-col">
                <div className="w-full h-64 rounded-lg relative bg-gray-300 hidden md:block">
                  <>
                    <img
                      src={`${blog.coverImage}`}
                      alt="profile"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </>
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
            {active === 1 && (
              <Card className="pb-4">
                <SingleBlogCard blog={blogPreview} />
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
          {active === 0 && (
            <button
              className="bg-primary text-white px-3 py-2 mt-3 rounded-lg w-full"
              onClick={() => editBlog()}
            >
              Update
            </button>
          )}
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default EditBlog;
