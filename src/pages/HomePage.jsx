import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { SERVER_URL } from "../ServerURL";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${SERVER_URL}/auth/is-user`, {
      credentials: "include",
    }).then((res) =>
      res.json().then((res) => {
        {
          // console.log("Home: " + res);
          // if (res == true) navigate("/feed");
          // else {
          //   Cookies.remove("token");
          //   navigate("/signup");
          // }
        }
      })
    );
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-black mb-6">
          {userInfo.name ? `Welcome ${userInfo.name}` : "Home Page"}
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
