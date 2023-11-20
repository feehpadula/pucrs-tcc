import "./TopMenuItem.scss";

function TopMenuItem({ routes }) {
  return (
    <div className="top-menu-items">
      <ul>
        {routes.map((route, index) => (
          <li key={index} className="top-menu-item">
            <a href={route.route}>{route.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopMenuItem;
