import { useEffect, useRef } from "react";
import style from "./MenuDropdown.module.scss";

const MenuDropdown = ({ parentCallback, routes }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  function profileMenuHandleBlur(e) {
    parentCallback(e);
  }

  return (
    <ul
      ref={ref}
      tabIndex="0"
      className={style.menuDropdown}
      onBlur={profileMenuHandleBlur}
    >
      {routes.map((route, index) => (
        <li key={index}>
          <a href={route.path}>{route.label}</a>
        </li>
      ))}
    </ul>
  );
};

export default MenuDropdown;
