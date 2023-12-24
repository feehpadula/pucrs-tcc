import { useState } from "react";
import { IsAuthenticated } from "../services/Auth";
import MenuDropdown from "./MenuDropdown";
import LoginDropdown from "./LoginDropdown";
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
      <span onClick={profileMenuHandleClick} style={{ pointerEvents: open && "none" }} />
      {IsAuthenticated()
        ? open && <MenuDropdown parentCallback={profileMenuHandleBlur} routes={routes} />
        : open && (
            <LoginDropdown parentCallback={profileMenuHandleBlur} routes={routes} />
          )}
    </div>
  );
}

export default Profile;
