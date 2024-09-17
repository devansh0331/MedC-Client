import React from 'react'
import logofoot from "../assets/logofoot.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col bg-background pt-8 px-5">
        <div className="w-full flex md:flex-row flex-col justify-center items-center md:items-start md:justify-start">
          <div className="md:w-2/5 flex justify-center items-center md:items-start md:justify-start  my-3">
            <img
              src={logofoot}
              alt="logofoot"
              className="w-2/3 sm:w-1/3 mx-auto"
            ></img>
          </div>
          <div className="w-3/5 flex md:flex-row flex-col justify-center items-center md:items-start md:justify-start">
            <div className="sm:w-1/3 flex flex-col items-center md:items-start">
              <button className="text-lg font-medium  my-3">Services</button>
              <button
                className="text-gray-600"
                onClick={() => navigate("/hire")}
              >
                Hire talent
              </button>
              <button
                className="text-gray-600"
                onClick={() => navigate("/feed")}
              >
                Community
              </button>
              <button
                className="text-gray-600"
                onClick={() => navigate("/postjob")}
              >
                Post a job
              </button>
              <button
                className="text-gray-600"
                onClick={() => navigate("/jobs")}
              >
                Find job
              </button>
            </div>
            <div className="sm:w-1/3 flex flex-col items-center md:items-start">
              <button className="text-lg font-medium  my-3">Help</button>
              <button
                className="text-gray-600"
                onClick={() => navigate("/about#about")}
              >
                About Us
              </button>
              <button
                className="text-gray-600"
                onClick={() => navigate("/faq#faq")}
              >
                FAQ
              </button>
              <button
                className="text-gray-600"
                onClick={() => navigate("/privacypolicy")}
              >
                Privacy Policy
              </button>
            </div>
            <div className="sm:w-1/3 flex flex-col items-center md:items-start">
              <button className="text-lg font-medium  my-3">Contact Us</button>
              <button
                className="text-gray-600"
                onClick={() => navigate("/contact")}
              >
                contact@medc.in
              </button>
              <button
                className="text-gray-600"
                onClick={() => navigate("/contact")}
              >
                +91 00000 00000
              </button>
            </div>
          </div>
        </div>
        <div className="w-11/12 text-center mt-8 text-sm text-gray-700 border-t-2 border-gray-300  mx-auto p-1">
          Copyright &#169; MedC 2024. All Rights Reserved
        </div>
      </div>
  )
}

export default Footer
