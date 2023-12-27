import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UsersContextProvider } from "./contexts/UsersContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UsersContextProvider>
      <App />
    </UsersContextProvider>
  </React.StrictMode>
);
