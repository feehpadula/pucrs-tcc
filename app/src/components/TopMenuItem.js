import "./TopMenuItem.scss";

function TopMenuItem({ routes }) {
  return (
    routes && (
      <div className="top-menu-items">
        <ul>
          {routes.map((route, index) => (
            <li key={index} className="top-menu-item">
              <a href={route.path}>{route.label}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default TopMenuItem;
