import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SideBar from "../components/SideBar";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Footer from "../components/Footer";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import { FaRegEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Contactus = () => {
  useEffect(() => {
    const topElement = document.getElementById("about");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const email = "amnumcreations@gmail.com";
  const mailContent = `<p>You have a new message from ${name}</p>` + `<p>${message}</p>` + `<p>From: ${senderEmail}</p>`;

  const sendEmail = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/userjob/contactus-mail`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify({
              candidateEmail: email,
              mailbody: mailContent,
            }),
          }
        );
        const res = await response.json();
        if (res.success) {
          toast.success("Message sent successfully");
          setName("");
          setSenderEmail("");
          setMessage("");
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        toast.error("Failed to send email");
      }
  };

  return (
    <div id="contact" className="h-[90vh] overflow-y-scroll scrollbar-thin">
      <div className="block lg:hidden">
        <SideBar />
      </div>
      <div className="flex justify-center py-10 px-10 about-main">
        <h2 className="text-[80px] lg:text-[120px] 2xl:text-[160px] font-bold text-light-blue-400 text-center drop-shadow-lg">
          Contact Us
        </h2>
      </div>
      <div className=" py-10">
        <div className="flex lg:flex-row flex-col gap-20 px-10 justify-center 2xl:w-[85%] mx-auto">
          <div className="border-2 border-blue-gray-50 rounded-lg p-4 w-[95%] lg:w-1/2 flex flex-col gap-2 bg-white mx-auto">
            <p className="text-xl lg:text-2xl font-bold text-blue-500">
              Get In Touch
            </p>
            <input
              placeholder="Name"
              type="text"
              className="bg-white w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              type="email"
              className="bg-white w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
           />
            <textarea
              placeholder="Write your message here"
              className="bg-white h-40 w-full flex gap-2 justify-between border-[1px] border-gray-400 p-2 rounded-md items-center text-blue-gray-500 text-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              size="sm"
              color="blue"
              variant="outlined"
              className="bg-white w-min mx-auto lg:mr-auto lg:ml-0"
              onClick={sendEmail}
            >
              Submit
            </Button>
          </div>
          <div className="border-2 border-blue-gray-50 rounded-lg p-4 w-[95%] lg:w-1/2 flex flex-col gap-2 bg-white mx-auto">
            <p className="text-xl lg:text-2xl font-bold text-blue-500">
              Connect with us
            </p>
            <div className="flex flex-col justify-center">
              <a href="#">
                <p className="flex items-center my-2 gap-2 cursor-pointer">
                  <IoLocationSharp className="w-5 h-5 text-gray-700" />{" "}
                  <span className="text-base text-gray-800">
                    Kolkata, India
                  </span>
                </p>
              </a>
              <a href="#">
                <p className="flex items-center my-2 gap-2 cursor-pointer">
                  <MdEmail className="w-5 h-5 text-gray-700" />{" "}
                  <span className="text-base text-gray-800">
                    abc@example.com
                  </span>
                </p>
              </a>
              <a href="#">
                <p className="flex items-center my-2 gap-2 cursor-pointer">
                  <FaPhoneAlt className="w-5 h-5 text-gray-700" />{" "}
                  <span className="text-base text-gray-800">
                    +91 00000 00000
                  </span>
                </p>
              </a>
              <a href="#">
                <p className="flex items-center my-2 gap-2 cursor-pointer">
                  <FaLinkedinIn className="w-5 h-5 text-gray-700" />{" "}
                  <span className="text-base text-gray-800">LinkedIn</span>
                </p>
              </a>
              <a href="#">
                <p className="flex items-center my-2 gap-2 cursor-pointer">
                  <FaXTwitter className="w-5 h-5 text-gray-700" />{" "}
                  <span className="text-base text-gray-800">Twitter</span>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />

    </div>
  );
};

export default Contactus;
