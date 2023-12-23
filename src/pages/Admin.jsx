import React from "react";
import Navbar from "../components/navbar/Navbar";
import NavItem from "../components/navbar/NavItem";
import User from "../components/admin/User";

const Admin = () => {
  return (
    <div className="page">
      <section className="container">
        <Navbar
          left={
            <NavItem href="/admin" navlink="active" value="Wellcome Admin" />
          }
          right={<NavItem href="/admin" navlink="active" value="Visite Me" />}
        />
        <User />
      </section>
    </div>
  );
};

export default Admin;
