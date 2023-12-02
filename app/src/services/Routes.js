import { createBrowserRouter } from "react-router-dom";
import Home from "../routes/Home";
import Search from "../routes/Search";
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
    path: "/search/:name/:page?",
    element: <Search />,
    label: "Pesquisar",
  },
  {
    path: "/topic/:id/:page?",
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
    label: "Criar",
    position: "TopMenu",
  },

  {
    path: "/",
    element: <Home />,
    label: "Home",
    position: "Profile",
  },
]);
