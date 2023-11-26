import { createBrowserRouter } from "react-router-dom";
import Home from "../routes/Home";
import Topic from "../routes/Topic";
import Data from "../routes/Data";
import Create from "../routes/Create";

export default createBrowserRouter([
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
    path: "/create",
    element: <Create />,
    label: "Create",
    position: "TopMenu",
  },

  {
    path: "/",
    element: <Home />,
    label: "Home",
    position: "Profile",
  },
]);
