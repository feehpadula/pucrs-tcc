import { mapRoutes } from "../utils/Utils";
import { IsAuthenticated } from "../services/Auth";
import { ToastContainer } from "react-toastify";
import TopMenuItem from "./TopMenuItem";
import Search from "./Search";
import Profile from "./Profile";
import "react-toastify/dist/ReactToastify.css";
import "./TopMenu.scss";

function TopMenu({ routes }) {
  return (
    <div className="top-menu-container">
      <div className="top-menu-icon">
        <a href="/">
          <img className="logo" alt="Logotipo What are the odds?" src="/logo@32.png" />
        </a>
      </div>
      <TopMenuItem routes={mapRoutes(routes, "TopMenu", IsAuthenticated() !== false)} />
      <div className="top-menu-search">
        <Search placeholder="Pesquisar" />
      </div>
      <Profile routes={mapRoutes(routes, "Profile", IsAuthenticated() !== false)} />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default TopMenu;
