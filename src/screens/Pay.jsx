import { color, motion } from "framer-motion";
import React from "react";
import { BtnPrimary, InputText, Select } from "../components/Inputs.jsx";
import NavBar from "../components/NavBar.jsx";
import PageContainer from "../components/PageContainer.jsx";
import "../sass/pay.sass";
function Pay() {
  return (
    <PageContainer>
      <div className="pay_ctn">
        <div className="inside">
          <p className="title">Registrar Pago</p>
          <LongSelect label="Seleccionar usuario" />
          <div className="double_inputs">
            <AmountInput />
            <p className="equal"> = </p>
            <ShortSelect />
          </div>
          <div className="btn">
            <BtnPrimary text="Confirmar" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Pay;

export const LongSelect = ({ label, hideLabel = false,...props }) => {
  return (
    <div className="long_select">
      <p className={hideLabel ? "label hidden" : "label"}>{label}</p>
      <Select {...props} />
    </div>
  );
};

const AmountInput = () => {
  return (
    <div className="amount_input">
      <p className="label">Ingresar Monto</p>
      <InputText width="100%" placeholder="Ejemplo: 12.540,12 Bs.f" />
    </div>
  );
};

const ShortSelect = () => {
  return (
    <div className="short_select">
      <p className="label">Meses</p>
      <Select placeholder="Sin seleccionar" />
    </div>
  );
};
