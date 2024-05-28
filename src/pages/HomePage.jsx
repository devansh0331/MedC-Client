import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { SERVER_URL } from "../ServerURL";
import { useNavigate } from "react-router-dom";
import mainIllus from "../assets/mainIllus.png";

function HomePage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
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
    <div className="w-screen h-screen flex box-border">
      <div className="w-1/2 h-4/5 flex flex-col p-4 pt-40 pl-10 box-border">
        <h1 className="text-6xl">Connecting Careers, <br/> Healing Lives</h1>
        <p className="text-gray-700 text-2xl mt-5">Interact with the best Medical Professionals, and <br/> make your presence in the Medical Community</p>
        <div className=" mt-10">
          <button className="bg-primary text-xl text-white px-6 py-2 mr-5 rounded-full shadow-lg active:translate-x-0.5 active:translate-y-0.5">Get Started</button>
          <button className="border-2 border-primary text-xl text-primary mx-5 px-6 py-2 rounded-full shadow-lg active:translate-x-0.5 active:translate-y-0.5 hover:bg-primary hover:text-white">Learn More</button>
        </div>
      </div>
      <div className="w-1/2 h-full box-border p-4">
        <img src={mainIllus} alt="mainillus" className="w-full h-full"></img>
      </div>
    </div>
  );
}

export default HomePage;
