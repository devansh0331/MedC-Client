import React, { useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SideBar from "../components/SideBar";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Footer from "../components/Footer";

const Contactus = () => {
  useEffect(() => {
    const topElement = document.getElementById("about");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
            <Input
              label="Name"
              type="text"
              placeholder="Name"
              className="bg-white"
            />
            <Input
              label="Email"
              type="email"
              placeholder="Email"
              className="bg-white"
            />
            <Textarea
              label="Write your message here"
              placeholder=""
              className="bg-white h-40"
            />
            <Button
              size="sm"
              color="blue"
              variant="outlined"
              className="bg-white w-min mx-auto lg:mr-auto lg:ml-0"
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

      <Footer />
    </div>
  );
};

export default Contactus;
