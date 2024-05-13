import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

function HomePage() {
  const { userInfo, setUserInfo } = useContext(UserContext);

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
