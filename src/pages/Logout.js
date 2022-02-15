import React from "react";
import Backdrop from "components/ui/backdrop";

function Logout() {
  React.useEffect(() => {
    localStorage.removeItem("profile");
    localStorage.removeItem("session");

    window.location.href = '/';
  }, []);

  return <Backdrop open />;
}

export default Logout;
