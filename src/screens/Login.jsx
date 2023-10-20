import React from "react";
import "../sass/login.sass";
import NavBar from "../components/NavBar.jsx";
import { Logo } from "../components/Icons.jsx";
import { BtnPrimary, InputText } from "../components/Inputs.jsx";

function Login() {
  return (
    <div className="LoginPage">
      {/* <NavBar /> */}
      <LoginForm />
    </div>
  );
}

export default Login;

const LoginForm = () => {
  return (
    <div className="loginForm">
      <div className="logo_ctn">
        <Logo />
      </div>
      <div className="input_ctn">
        <InputText />
      </div>
      <div className="input_ctn">
        <InputText />
      </div>
      <div className="input_ctn">
      <div className="checkbox"></div>
      <p className="check_text" >mantener sesion</p>
      </div>
      <div className="input_ctn">
        <BtnPrimary text="Iniciar Sesion" />
      </div>
      <p className="register_text">Registrar nuevo administrador</p>
    </div>
  );
};
