import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { SERVER_URL } from "../ServerURL";
import { useNavigate } from "react-router-dom";
import mainIllus from "../assets/mainIllus.png";
import whyus1 from "../assets/whyus1.png";
import whyus2 from "../assets/whyus2.png";
import whyus3 from "../assets/whyus3.png";
import whyus4 from "../assets/whyus4.png";
import professional from "../assets/professional.png";
import jobs from "../assets/jobs.png";
import logofoot from "../assets/logofoot.png";


function HomePage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [blue, setBlue] = useState(false);
  const [white, setWhite] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${SERVER_URL}/auth/is-user`, {
      credentials: "include",
    }).then((res) =>
      res.json().then((res) => {
        {
          console.log("Home: " + res);
          if (res == true) navigate("/feed");
          // else {
          //   Cookies.remove("token");
          //   navigate("/signup");
          // }
        }
      })
    );
  }, []);

  return (
    <div className="w-full h-full flex flex-col box-border overflow-x-hidden">
      {/* MAIN HOME */}
      <div className="w-screen h-full flex box-border">
        <div className="w-1/2 h-4/5 flex flex-col p-4 pt-40 pl-10 box-border">
          <h1 className="text-6xl">
            Connecting Careers, <br /> Healing Lives
          </h1>
          <p className="text-gray-700 text-2xl mt-5">
            Interact with the best Medical Professionals, and <br /> make your
            presence in the Medical Community
          </p>
          <div className=" mt-10">
            <button className="bg-primary text-xl text-white px-6 py-2 mr-5 rounded-full shadow-lg active:translate-x-0.5 active:translate-y-0.5">
              Get Started
            </button>
            <button className="border-2 border-primary text-xl text-primary mx-5 px-6 py-2 rounded-full shadow-lg active:translate-x-0.5 active:translate-y-0.5 hover:bg-primary hover:text-white">
              Learn More
            </button>
          </div>
        </div>
        <div className="w-1/2 h-full box-border p-4">
          <img src={mainIllus} alt="mainillus" className="w-full h-full"></img>
        </div>
      </div>
      {/* POSTER */}
      <div className="w-full h-screen flex box-border">
        <div
          className={`w-1/2 h-full text-7xl text-white hover:text-primary flex justify-end items-center pr-3 ${
            blue ? "second" : "first"
          }`}
          onMouseEnter={() => setBlue(true)}
          onMouseLeave={() => setBlue(false)}
          style={{ transition: "color 0.5s, background-image 0.7s" }}
        >
          <div className="text-right">
            <p>From aspiration</p>
            <p className="">your medical</p>{" "}
          </div>
        </div>
        <div
          className={`w-1/2 h-full text-7xl text-primary hover:text-white flex justify-start pl-3 items-center pr-3 first2 ${
            white ? "second2" : "first2"
          }`}
          onMouseEnter={() => setWhite(true)}
          onMouseLeave={() => setWhite(false)}
          style={{ transition: "color 0.5s, background-image 0.7s" }}
        >
          <div className="text-left">
            <p>to achievements,</p>
            <p className="">network awaits</p>{" "}
          </div>
        </div>
      </div>
      {/* WHY MEDC */}
      <div className="flex flex-col my-5">
        <h1 className="text-4xl text-center mt-10 mb-5">Why MedC?</h1>
        <div className="flex">
          <div className="w-1/4 flex flex-col items-center  p-5">
            <div className=" w-2/3 h-full flex flex-col items-center border-2 border-gray-200 rounded-3xl shadow-md p-4">
              <img src={whyus1} alt="whyus1" className="w-full" />
              <p className="text-center font-semibold mt-1">
                Vast community <br /> of health sector
              </p>
            </div>
          </div>
          <div className="w-1/4 flex flex-col items-center  p-5">
            <div className=" w-2/3 h-full flex flex-col items-center border-2 border-gray-200 rounded-3xl shadow-md p-4">
              <img src={whyus2} alt="whyus1" className="w-full" />
              <p className="text-center font-semibold mt-1">
              Strengthen your <br /> business with right
              <br /> people
              </p>
            </div>
          </div>
          <div className="w-1/4 flex flex-col items-center  p-5">
            <div className=" w-2/3 h-full flex flex-col items-center border-2 border-gray-200 rounded-3xl shadow-md p-4">
              <img src={whyus3} alt="whyus1" className="w-full" />
              <p className="text-center font-semibold mt-1">
              Tonnes of<br/> opportunities.
              </p>
            </div>
          </div>
          <div className="w-1/4 flex flex-col items-center  p-5">
            <div className=" w-2/3 h-full flex flex-col items-center border-2 border-gray-200 rounded-3xl shadow-md p-4">
              <img src={whyus4} alt="whyus1" className="w-full" />
              <p className="text-center font-semibold mt-1">
              Make global <br /> connections
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* JOBS AND HIRE */}
      <div className="w-full my-10">
        <div className="w-full h-96 flex">
          <div className="w-1/2 h-72 justify-end flex ">
            <img src={jobs} alt="job" className="w-3/5 mr-5"/>
          </div>
          <div className="text-left ml-5">
            <p className="text-5xl">Search yourself <br/><span className="text-white">The Best Jobs</span></p>
            <p className="text-gray-800">Get your dream job at your dream location.<br/>Connect with up to date medical world.</p>
            <button className="bg-blue1 border-2 py-1 px-3 mt-8 rounded-full text-xl text-white">Learn More</button>
          </div>
        </div>
        <div className="w-full h-96 bg-blue1 -mt-80"></div>
        <div className="w-full mx-auto justify-center h-96 flex -mt-24">
          <div className="text-right  mr-5 w-1/2 self-right">
          <p className="text-5xl leading-custom">Find A <br/><span className="text-white">Professional</span></p>
          <p className="text-gray-800">Find a perfect suit for the job openings<br/> in your business</p>
            <button className="bg-blue1 border-2 py-1 px-3 mt-8 rounded-full text-xl text-white">Learn More</button>
          </div>
          <div className="w-1/2 h-72 justify-start flex ">
            <img src={professional} alt="professional" className="w-3/5 ml-5" />
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div className="w-full flex flex-col bg-background pt-8 px-5">
        <div className="w-full flex">
          <div className="w-2/5">
            <img src={logofoot} alt="logofoot" className="w-1/3"></img>
          </div>
          <div className="w-3/5 flex">
            <div className="w-1/3">
              <p className="text-lg font-medium">Services</p>
              <p className="text-gray-600">Hire talent</p>
              <p className="text-gray-600">Community</p>
              <p className="text-gray-600">Post a job</p>
              <p className="text-gray-600">Find job</p>
            </div>
            <div className="w-1/3">
              <p className="text-lg font-medium">Help</p>
              <p className="text-gray-600">About Us</p>
              <p className="text-gray-600">FAQ</p>
              <p className="text-gray-600">Privacy Policy</p>
            </div>
            <div className="w-1/3">
              <p className="text-lg font-medium">Contact Us</p>
              <p className="text-gray-600">contact@medc.in</p>
              <p className="text-gray-600">Community</p>
              <p className="text-gray-600">+91 00000 00000</p>
            </div>
          </div>
        </div>
        <div className="w-11/12 text-center mt-8 text-sm text-gray-700 border-t-2 border-gray-300  mx-auto p-1">Copyright  &#169; MedC 2024. All Rights Reserved</div>
      </div>
    </div>
  );
}

export default HomePage;
