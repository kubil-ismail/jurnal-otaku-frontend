import React from "react";

function Auth({ children }) {
  React.useEffect(() => {
    const profile = localStorage.getItem("profile");
    const session = localStorage.getItem("session");

    if (!profile || !session) {
      window.location.replace = "/";
    }
  });

  return children;
}

export default Auth;
