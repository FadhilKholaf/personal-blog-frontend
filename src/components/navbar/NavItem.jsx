import React from "react";

const NavItem = (props) => {
  return (
    <a href={props.href} className={`nav-link ${props.navlink}`}>
      {props.value}
    </a>
  );
};

export default NavItem;
