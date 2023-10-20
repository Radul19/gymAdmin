import React, { useContext, useState } from "react";
import { LocContext } from "../components/location.jsx";
import NavBar from "../components/NavBar.jsx";
import PageContainer from "../components/PageContainer.jsx";
import Dashboard from "./Dashboard.jsx";
import Pay from "./Pay.jsx";
import Register from "./Register.jsx";
import Database from "./Database.jsx";
import Access from "./Access.jsx";


function PageAdmin() {
  const { location } = useContext(LocContext);
  return (
    <div className="PageContainer">
      <NavBar />
      {location === "/" && <Dashboard />}
      {location === "/pay" && <Pay />}
      {location === "/register" && <Register />}
      {location === "/database" && <Database />}
      {location === "/access" && <Access />}
    </div>
  );
}

export default PageAdmin;
