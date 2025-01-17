import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme accentColor="indigo" grayColor="auto" radius="large" scaling="95%">
      <App />
    </Theme>
  </React.StrictMode>
);
