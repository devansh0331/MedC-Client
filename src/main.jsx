import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./UserContext.jsx";
import { store } from "./store.js";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </UserContextProvider>
);
