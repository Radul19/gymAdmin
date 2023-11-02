import React, { useContext, useEffect, useState } from "react";
import { card_id_dots } from "../components/helpers.js";
import { IconCheckCircle, IconCrossCircle } from "../components/Icons.jsx";
import { BtnPrimary, InputText, Select } from "../components/Inputs.jsx";
import { LocContext } from "../components/location.jsx";
import PageContainer from "../components/PageContainer.jsx";
import {
  Payment,
  paymentsAmount,
  updateMembership,
} from "../components/Schemas.js";
import "../sass/pay.sass";

const month12 = () => {
  let aux = [];
  for (let i = 0; i < 12; i++) {
    aux.push(`${i + 1} Meses`);
  }
  return aux;
};

function Pay({ setMsg }) {
  const { setLocation } = useContext(LocContext);
  const [allUsers, setAllUsers] = useState([]);
  const [inputs, setInputs] = useState({
    card_id: "",
    amount: "",
    months: "",
  });
  const [found, setFound] = useState(null);
  const [amount_type, setAmount_type] = useState(false);
  const tgType = () => {
    setAmount_type(!amount_type);
  };

  const onChange = (e) => {
    // const remove = e.nativeEvent.inputType === "deleteContentBackward";
    const att = e.target.getAttribute("name");
    let value = e.target.value;

    if (att === "card_id") {
      value = card_id_dots(value);
    }

    setInputs((prev) => ({ ...prev, [att]: value }));
  };

  const handleChange = (att, value) => {
    setInputs((prev) => ({ ...prev, [att]: value }));
  };

  useEffect(() => {
    (async () => {
      const res = await electron.readUsers();
      const users = JSON.parse(res);
      setAllUsers(users);
    })();
  }, []);

  useEffect(() => {
    let tm;
    if (inputs.card_id.length > 0) {
      tm = setTimeout(() => {
        let user_exist = allUsers.some(
          (item) => item.card_id === inputs.card_id
        );
        setFound(user_exist);
      }, 2000);
    } else setFound(null);

    return () => {
      clearTimeout(tm);
    };
  }, [inputs.card_id]);

  const onClick = async () => {
    try {
      let user_exist = allUsers.find((item) => item.card_id === inputs.card_id);

      if (user_exist) {
        let id = await paymentsAmount();
        const newPayment = new Payment({
          id,
          card_id: user_exist.card_id,
          name: user_exist.name,
          phone: user_exist.phone,
          amount: inputs.amount,
          amount_type,
          months: inputs.months,
        });
        await newPayment.registerPayment();
        await updateMembership(inputs.months, user_exist.card_id);
      }
      setMsg({
        text: "Pago registrado con exito",
        status: true,
        show: true,
      });
      resetValues();
      setLocation("/");
    } catch (error) {
      console.log(error);
      setMsg({
        text: "Error al registrar el pago",
        status: false,
        show: true,
      });
    }
  };

  const resetValues = () => {
    setAllUsers([]);
    setInputs({ card_id: "", amount: "", months: "" });
    setFound(null);
    setAmount_type(false);
  };

  return (
    <PageContainer>
      <div className="pay_ctn">
        <div className="inside">
          <p className="title">Registrar Pago</p>
          <LongInput
            label="Cédula de usuario"
            {...{ found, onChange }}
            placeholder="Ejemplo: 29.123.321"
            name="card_id"
            value={inputs.card_id}
            maxLength={10}
          />
          <div className="double_inputs">
            <AmountInput
              placeholder="Ejemplo: 12.540,12 Bs.f"
              {...{ onChange, amount_type, tgType }}
              name="amount"
              value={inputs.amount}
            />
            <p className="equal"> = </p>
            <ShortSelect
              {...{ handleChange }}
              name="months"
              value={inputs.months}
            />
          </div>
          <div className="btn">
            <BtnPrimary text="Confirmar" {...{ onClick }} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Pay;

export const LongInput = ({
  found = false,
  label,
  hideLabel = false,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const onMouseEnter = () => {
    setShow(true);
  };
  const onMouseLeave = () => {
    setShow(false);
  };

  return (
    <div className="long_select">
      <div className="labels">
        <p className={hideLabel ? "label hidden" : "label"}>{label}</p>
        {props.value.length > 0 && show ? (
          <>
            {found && <p className="msg_sc">Usuario Encontrado</p>}
            {!found && (
              <p className="msg_err">No se ha encontrado al usuario</p>
            )}
          </>
        ) : null}
      </div>
      <div className="found" {...{ onMouseLeave, onMouseEnter }}>
        {props.value.length > 0 && found !== null ? (
          <>{found ? <IconCheckCircle /> : <IconCrossCircle />}</>
        ) : null}
      </div>
      {/* <Select {...props} /> */}
      <InputText {...props} />
    </div>
  );
};

export const LongSelect = ({ label, hideLabel = false, ...props }) => {
  return (
    <div className="long_select">
      <p className={hideLabel ? "label hidden" : "label"}>{label}</p>
      <Select {...props} />
    </div>
  );
};

const AmountInput = ({ amount_type, tgType, ...props }) => {
  return (
    <div className="amount_input">
      {/* <MoneySign/> */}
      <p className="label">Ingresar Monto</p>
      <div style={{ position: "relative" }}>
        <InputText width="100%" {...props} style={{ paddingRight: "4.2em" }} />
        <p className="money_sign" onClick={tgType}>
          {amount_type && "$"}
          {!amount_type && "Bs.f"}
        </p>
      </div>
    </div>
  );
};

const ShortSelect = ({ ...props }) => {
  return (
    <div className="short_select">
      <p className="label">Meses</p>
      <Select placeholder="Sin seleccionar" options={month12()} {...props} />
    </div>
  );
};

const MoneySign = () => {
  const [active, setActive] = useState(false);
  const onClick = () => {
    setActive(!active);
  };
  return (
    <div className="money_ctn" onClick={onClick}>
      {active && <p>$</p>}
      {!active && <p>Bs.F</p>}
    </div>
  );
};
