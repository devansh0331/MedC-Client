import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  </UserContextProvider>
);
