import { useEffect } from "react";
import "./App.css";
import Main from "./pages/Main";
import Cookies from "js-cookie";

function App() {
  useEffect(() => {
    const cookies = Cookies.get("token");
    console.log(cookies);
  }, []);

  return (
    <h1 className="">
      <Main />
    </h1>
  );
}

export default App;
