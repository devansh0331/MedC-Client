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
      <div className="w-screen h-full flex box-border md:flex-row flex-col justify-center items-center mt-20 md:mt-5">
        <div className="md:w-1/2 w-10/12 h-4/5 flex flex-col p-4 box-border md:items-start items-center ">
          <h1 className="xl:text-6xl lg:text-5xl text-4xl md:text-left text-center">
            Connecting Careers, <br /> Healing Lives
          </h1>
          <p className="text-gray-700 xl:text-2xl lg:text-xl text-base mt-5 md:text-left text-center">
            Interact with the best Medical Professionals, and <br /> make your
            presence in the Medical Community
          </p>
          <div className="mt-10 lg:text-xl text-base flex justify-between">
            <button className="bg-primary text-white px-3 md:px-6 py-2 mr-5 rounded-full shadow-lg active:translate-x-0.5 active:translate-y-0.5"
            onClick={() => navigate("/signup")}>
              Get Started
            </button>
            <button className="border-2 border-primary text-primary mx-5 px-3 md:px-6 py-2 rounded-full shadow-lg active:translate-x-0.5 active:translate-y-0.5 hover:bg-primary hover:text-white"
            style={{transition: "color 0.5s, background-color 0.5s"}}
            onClick={() => navigate(window.location.href="#jobs")}>
              Learn More
            </button>
          </div>
        </div>
        <div className="w-1/2 h-full box-border flex justify-center items-center ">
          <img src={mainIllus} alt="mainillus" className="w-full h-full m-auto"></img>
        </div>
      </div>
      {/* POSTER */}
      <div className="lg:block hidden">
      <div className="w-full h-screen flex box-border">
        <div
          className={`w-1/2 h-full text-5xl xl:text-7xl text-white hover:text-primary flex justify-end items-center pr-3 ${
            blue ? "first2" : "first"
          }`}
          onMouseEnter={() => setBlue(true)}
          onMouseLeave={() => setBlue(false)}
          style={{ transition: "all 1s" }}
        >
          <div className="text-right">
            <p>From aspiration</p>
            <p className="">your medical</p>{" "}
          </div>
        </div>
        <div
          className={`w-1/2 h-full text-5xl xl:text-7xl text-primary  flex justify-start pl-3 items-center pr-3 first2 ${
            blue ? "second2" : "second" 
          }`}
          style={{ transition: "all 1s" }}
        >
          <div className="text-left">
            <p>to achievements,</p>
            <p className="">network awaits</p>{" "}
          </div>
        </div>
      </div>
      </div>       
      {/* WHY MEDC */}
      <div className="flex flex-col justify-evenly mt-20 mb-20 m-auto items-center">
        <h1 className=" text-3xl md:text-4xl text-center mb-14 font-semibold">Why <span className="text-primary">MedC?</span></h1>
        <div className="flex lg:flex-row flex-col justify-center items-center">
          <div className="flex md:flex-row flex-col justify-center items-center w-full">
          <div className="lg:w-full md:w-2/5 w-10/12 flex flex-col items-center  p-5">
            <div className="xl:w-2/3 h-full flex flex-col justify-evenly items-center border-2 border-gray-200 rounded-3xl shadow-md p-4 hover:scale-110 hover:shadow-lg"
            style={{transition: "all 0.3s"}}>
              <img src={whyus1} alt="whyus1" className="w-4/5 md:w-11/12" />
              <p className="text-center font-semibold mt-1">
                Vast community <br /> of health sector
              </p>
            </div>
          </div>
          <div className="lg:w-full md:w-2/5 w-10/12 flex flex-col items-center  p-5">
            <div className=" xl:w-2/3 h-full flex flex-col justify-evenly items-center border-2 border-gray-200 rounded-3xl shadow-md p-4 hover:scale-110 hover:shadow-lg"
            style={{transition: "all 0.3s"}}>
              <img src={whyus2} alt="whyus1" className="w-4/5 md:w-11/12" />
              <p className="text-center font-semibold mt-1">
              Strengthen your <br /> business with right
              <br /> people
              </p>
            </div>
          </div>
          </div>
          <div className="flex md:flex-row flex-col justify-center items-center w-full">
          <div className="lg:w-full md:w-2/5 w-10/12 flex flex-col items-center  p-5">
            <div className=" xl:w-2/3 h-full flex flex-col justify-evenly items-center border-2 border-gray-200 rounded-3xl shadow-md p-4 hover:scale-110 hover:shadow-lg"
            style={{transition: "all 0.3s"}}>
              <img src={whyus3} alt="whyus1" className="w-4/5 md:w-11/12" />
              <p className="text-center font-semibold mt-1">
              Tonnes of<br/> opportunities.
              </p>
            </div>
          </div>
          <div className="lg:w-full md:w-2/5 w-10/12 flex flex-col items-center  p-5">
            <div className=" xl:w-2/3 h-full flex flex-col justify-evenly items-center border-2 border-gray-200 rounded-3xl shadow-md p-4 hover:scale-110 hover:shadow-lg"
            style={{transition: "all 0.3s"}}>
              <img src={whyus4} alt="whyus1" className="w-4/5 md:w-11/12" />
              <p className="text-center font-semibold mt-1">
              Make global <br /> connections
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
      {/* JOBS AND HIRE */}
      <div className="w-full my-10" id="jobs">
        <div className="w-full h-96 flex sm:flex-row flex-col px-3 sm:justify-start sm:items-start justify-center items-center">
          <div className="sm:w-1/2 h-72 md:justify-end flex rounded-3xl justify-center">
            <img src={jobs} alt="job" className="w-2/3 sm:w-11/12 md:w-3/5 sm:mr-5 object-cover rounded-3xl "/>
          </div>
          <div className=" text-center sm:text-left sm:ml-5 ">
            <p className="text-3xl md:text-4xl lg:text-5xl leading-custom mt-3">Search yourself <br/><span className=" text-primary sm:text-white">The Best Jobs</span></p>
            <p className="text-gray-800">Get your dream job at your dream location.<br/>Connect with up to date medical world.</p>
            <button className="bg-blue1 border-2 py-2 px-3 md:px-6 mt-8 rounded-full text-base md:text-lg text-white hover:bg-white hover:text-primary"
            style={{transition: "all 0.3s"}} onClick={() => navigate("/jobs")}>Learn More</button>
          </div>
        </div>
        <div className="w-full sm:h-96 bg-blue1 -mt-80 sm:block hidden"></div>
        <div className="w-full mx-auto justify-center sm:items-start items-center h-96 flex sm:flex-row flex-col mt-20 sm:-mt-24 px-3">
          <div className="text-center sm:text-right sm:mr-5 w-1/2 self-right order-last sm:order-first">
          <p className="text-3xl md:text-4xl lg:text-5xl leading-custom">Find A <br/><span className="text-primary sm:text-white">Professional</span></p>
          <p className="text-gray-800">Find a perfect suit for the job openings<br/> in your business</p>
            <button className="bg-blue1 border-2 py-2 px-3 md:px-6 mt-8 rounded-full text-base md:text-lg text-white hover:text-primary hover:bg-white hover:border-primary "
            style={{transition: "all 0.3s"}} onClick={() => navigate("/hire")}>Learn More</button>
          </div>
          <div className="sm:w-1/2 h-72 justify-center sm:justify-start flex rounded-3xl">
            <img src={professional} alt="professional" className="w-2/3 sm:w-11/12 md:w-3/5 sm:ml-5 object-cover rounded-3xl" />
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div className="w-full flex flex-col bg-background pt-8 px-5">
        <div className="w-full flex md:flex-row flex-col justify-center items-center md:items-start md:justify-start">
          <div className="md:w-2/5 flex justify-center items-center md:items-start md:justify-start  my-3">
            <img src={logofoot} alt="logofoot" className="w-2/3 sm:w-1/3"></img>
          </div>
          <div className="w-3/5 flex md:flex-row flex-col justify-center items-center md:items-start md:justify-start">
            <div className="sm:w-1/3 flex flex-col items-center md:items-start">
              <button className="text-lg font-medium  my-3">Services</button>
              <button className="text-gray-600" onClick={() => navigate("/hire")}>Hire talent</button>
              <button className="text-gray-600" onClick={() => navigate("/feed")}>Community</button>
              <button className="text-gray-600" onClick={() => navigate("/postjob")}>Post a job</button>
              <button className="text-gray-600" onClick={() => navigate("/jobs")}>Find job</button>
            </div>
            <div className="sm:w-1/3 flex flex-col items-center md:items-start">
              <button className="text-lg font-medium  my-3">Help</button>
              <button className="text-gray-600" onClick={() => navigate("/about")}>About Us</button>
              <button className="text-gray-600" onClick={() => navigate("/faq")}>FAQ</button>
              <button className="text-gray-600" onClick={() => navigate("/privacypolicy")}>Privacy Policy</button>
            </div>
            <div className="sm:w-1/3 flex flex-col items-center md:items-start">
              <button className="text-lg font-medium  my-3">Contact Us</button>
              <button className="text-gray-600" onClick={() => navigate("/contact")}>contact@medc.in</button>
              <button className="text-gray-600" onClick={() => navigate("/contact")}>+91 00000 00000</button>
            </div>
          </div>
        </div>
        <div className="w-11/12 text-center mt-8 text-sm text-gray-700 border-t-2 border-gray-300  mx-auto p-1">Copyright  &#169; MedC 2024. All Rights Reserved</div>
      </div>
    </div>
  );
}

export default HomePage;
