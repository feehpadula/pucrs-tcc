import { useState } from "react";
import Dropdown from "./Dropdown";
import "./Profile.scss";

function Profile({ routes }) {
  const [open, setOpen] = useState(false);

  function profileMenuHandleClick() {
    setOpen(true);
  }

  const profileMenuHandleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div className="top-menu-profile">
      <span
        onClick={profileMenuHandleClick}
        style={{ pointerEvents: open && "none" }}
      ></span>
      {open && <Dropdown parentCallback={profileMenuHandleBlur} routes={routes} />}
    </div>
  );
}

export default Profile;
