import React from "react";

const Navbar = ({ left, right }) => {
  return (
    <div className="nav-bar">
      <div className="left">{left}</div>
      <div className="right">{right}</div>
    </div>
  );
};

export default Navbar;
