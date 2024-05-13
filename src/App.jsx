import { useContext, useEffect } from "react";
import "./App.css";
import Main from "./pages/Main";
import Cookies from "js-cookie";
import { UserContext } from "./UserContext";

function App() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    console.log(userInfo.name);
  }, []);

  return (
    <h1 className="">
      <Main />
    </h1>
  );
}

export default App;
