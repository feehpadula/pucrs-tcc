import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Routes from "./services/Routes";
import TopMenu from "./components/TopMenu";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TopMenu routes={Routes.routes} />
    <RouterProvider router={Routes} />
  </React.StrictMode>
);
