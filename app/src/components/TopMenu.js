import TopMenuItem from "./TopMenuItem";
import Search from "./Search";
import Profile from "./Profile";
import "./TopMenu.scss";

function TopMenu() {
  return (
    <div className="top-menu-container">
      <div className="top-menu-icon">
        <span></span>
      </div>
      <TopMenuItem
        routes={[
          { name: "AAA", route: "aaa" },
          { name: "BBB", route: "bbb" },
          { name: "CCC", route: "ccc" },
          { name: "DDD", route: "ddd" },
        ]}
      />
      <Search />
      <Profile />
    </div>
  );
}

export default TopMenu;
