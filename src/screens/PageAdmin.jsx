import React, { useContext, useState } from "react";
import { LocContext } from "../components/location.jsx";
import NavBar from "../components/NavBar.jsx";
import PageContainer from "../components/PageContainer.jsx";
import Dashboard from "./Dashboard.jsx";
import Pay from "./Pay.jsx";
import Register from "./Register.jsx";
import Database from "./Database.jsx";
import Reports from "./Reports.jsx";
import Msg from "../components/Msg.jsx";

function PageAdmin() {
  const { location } = useContext(LocContext);
  const [msg, setMsg] = useState({
    text: "",
    status: false,
    show:false
  });
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <NavBar />
      <Msg {...{ msg,setMsg }} />
      {location === "/" && <Dashboard {...{setMsg}} />}
      {location === "/pay" && <Pay {...{setMsg}} />}
      {location === "/register" && <Register {...{setMsg}} />}
      {location === "/database" && <Database  {...{setMsg}}/>}
      {location === "/access" && <Reports {...{setMsg}} />}
    </div>
  );
}

export default PageAdmin;

/** TO DO
 * Estadisticas en dashboard
 *
 * Pagina de Reporte (?)
 */
