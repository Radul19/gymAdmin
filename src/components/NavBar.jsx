import React, { useContext, useState } from "react";
import "../sass/components.sass";
import {
  IconDatabase,
  IconHome,
  IconPerson,
  IconStat,
  IconWrite,
} from "./Icons.jsx";
import { LocContext } from "./location.jsx";

// innerWidth

const NavBar = () => {
  const [hover, setHover] = useState(false);

  const ome = () => {
    setHover(true);
  };
  const oml = () => {
    setTimeout(() => {
      setHover(false);
    }, 400);
  };

  return (
    <div className="navbar_ctn" onMouseEnter={ome} onMouseLeave={oml}>
      <div className="navbar">
        <NavbarItem {...{ hover }} Icon={IconHome} text="Dashboard" href="/" />
        <NavbarItem
          {...{ hover }}
          Icon={IconPerson}
          text="Añadir usuario"
          href="/register"
        />
        <NavbarItem
          {...{ hover }}
          Icon={IconWrite}
          text="Registrar pago"
          href="/pay"
        />
        <NavbarItem
          {...{ hover }}
          Icon={IconDatabase}
          text="Base de datos"
          href="/database"
        />
        <NavbarItem
          {...{ hover }}
          Icon={IconStat}
          text="Registros"
          href="/access"
        />
      </div>
    </div>
  );
};

export default NavBar;

const NavbarItem = ({ Icon, text, hover, href }) => {
  const { location, setLocation } = useContext(LocContext);
  return (
    <div
      className={`navbar_item ${location === href && "nb_active"}`}
      onClick={() => {
        setLocation(href);
      }}
    >
      <div
        className={`${location === href ? "bg" : "bg_false"} ${
          hover ? "bg_active" : " "
        }`}
      ></div>
      <div className="icon">
        <Icon />
      </div>
      <p>{text}</p>
    </div>
  );
};
