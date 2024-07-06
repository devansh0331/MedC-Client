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

import { GoogleOAuthProvider } from "@react-oauth/google";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <ThemeProvider>
            <GoogleOAuthProvider clientId="666618568574-dsqu9thgjrhn16ud5cvvn3rlddd261o1.apps.googleusercontent.com">
              <App />
            </GoogleOAuthProvider>
          </ThemeProvider>
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </UserContextProvider>
);
