import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import TopMenu from "./components/TopMenu";
import Home from "./routes/Home";
import Topic from "./routes/Topic";
import Data from "./routes/Data";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    label: "Home",
    position: "TopMenu",
    errorElement: <Home />,
  },
  {
    path: "/topic/:id",
    element: <Topic />,
    label: "Tópico",
  },
  {
    path: "/data/:tid/:id",
    element: <Data />,
    label: "Tópico",
  },

  {
    path: "/",
    element: <Home />,
    label: "Home",
    position: "Profile",
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TopMenu routes={routes.routes} />
    <RouterProvider router={routes} />
  </React.StrictMode>
);
