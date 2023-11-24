import { mapRoutes } from "../utils/utils";
import TopMenuItem from "./TopMenuItem";
import Search from "./Search";
import Profile from "./Profile";
import "./TopMenu.scss";

function TopMenu({ routes }) {
  return (
    <div className="top-menu-container">
      <div className="top-menu-icon">
        <a href="/">
          <img className="logo" alt="Logotipo What are the odds?" src="/logo@32.png" />
        </a>
      </div>
      <TopMenuItem routes={mapRoutes(routes, "TopMenu")} />
      <div className="top-menu-search">
        <Search placeholder="Pesquisar" />
      </div>
      <Profile routes={mapRoutes(routes, "Profile")} />
    </div>
  );
}

export default TopMenu;
