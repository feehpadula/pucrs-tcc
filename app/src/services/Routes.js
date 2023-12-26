import { createBrowserRouter } from "react-router-dom";
import { RemoveToken } from "../services/Auth";
import Home from "../routes/Home";
import Search from "../routes/Search";
import Topic from "../routes/Topic";
import Data from "../routes/Data";
import Create from "../routes/Create";

const routes = [
  {
    path: "/",
    element: <Home />,
    label: "Home",
    position: "TopMenu",
    errorElement: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
    label: "Criar",
    position: "TopMenu",
    requireLogin: true,
  },
  {
    path: "/profile",
    element: <Home />,
    label: "Meu perfil",
    position: "Profile",
    requireLogin: true,
  },
  {
    path: "/logout",
    element: <RemoveToken />,
    label: "Sair",
    position: "Profile",
    requireLogin: true,
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
];

export default createBrowserRouter(routes);
