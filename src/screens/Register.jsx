import React, { useContext, useState } from "react";
import { BtnPrimary, InputText } from "../components/Inputs.jsx";
import PageContainer from "../components/PageContainer.jsx";
import "../sass/register.sass";
import { LongSelect } from "./Pay.jsx";
import { memTypes, User } from "../components/Schemas.js";
import { card_id_dots } from "../components/helpers.js";
import { LocContext } from "../components/location.jsx";

const phoneLine = (text) => {
  text = text.replaceAll("-", "");
  let aux = text.split("");
  for (let i = 0; i < aux.length; i++) {
    if (i === 3) {
      aux.splice(i + 1, 0, "-");
    }
  }
  let aux2 = aux.toString();
  return aux2.replaceAll(",", "");
};

const month12 = () => {
  let aux = [];
  for (let i = 0; i < 12; i++) {
    aux.push(`${i + 1} Meses`);
  }
  return aux;
};

const resetValues = {
  name: "",
  card_id: "",
  phone: "",
  birth: "",
  email: "",
  gender: false,
  membership_type: false,
  membership: false,
};

const exampleValues = {
  name: "Mateo Test1",
  card_id: "12.312.312",
  phone: "1231-2312323",
  birth: "2023-09-26",
  email: "example@gmail.com",
  gender: "Masculino",
  membership_type: "Membership 1",
  membership: "1 Mes",
};

function Register({ setMsg }) {
  
  const { setLocation } = useContext(LocContext);
  const [inputs, setInputs] = useState(resetValues);

  const createUser = async () => {
    try {
      let newUser = new User(inputs);
      console.log(newUser);
      await newUser.registerUser();
      setMsg({
        text: "Usuario registro con exito!",
        status: true,
        show: true,
      });
      setInputs(resetValues)
      setLocation('/')
    } catch (error) {
      setMsg({
        text: "No se ha podido registrar al usuario",
        status: false,
        show: true,
      });
    }
  };

  const onChange = (e) => {
    const remove = e.nativeEvent.inputType === "deleteContentBackward";
    const att = e.target.getAttribute("name");
    let value = e.target.value;

    if (att === "card_id" && !remove) {
      value = card_id_dots(value);
    }

    if (att === "phone" && !remove) {
      value = phoneLine(value);
    }

    setInputs((prev) => ({ ...prev, [att]: value }));
  };

  const handleChange = (att, value) => {
    setInputs((prev) => ({ ...prev, [att]: value }));
  };

  return (
    <PageContainer>
      <div className="register_ctn">
        <div className="inside">
          <p className="title">Registrar Usuario</p>
          <div className="inputs_ctn">
            <div className="left">
              <InputLabel
                {...{ onChange }}
                name="name"
                label="Nombre y apellido"
                placeholder="Ejemplo: Mateo Hernandez"
                value={inputs.name}
              />
              <InputLabel
                {...{ onChange }}
                name="card_id"
                label="Cedula"
                placeholder="29.777.444"
                value={inputs.card_id}
                maxLength={10}
              />
              <InputLabel
                {...{ onChange }}
                name="birth"
                label="Fecha de nacimiento"
                placeholder="1998/12/21"
                value={inputs.birth}
                type="date"
                maxLength={10}
              />
              <LongSelect
                label="Datos de membresia"
                placeholder="Tipo de membresia"
                options={memTypes}
                name="membership_type"
                value={inputs.membership_type}
                {...{ handleChange }}
              />
            </div>
            <div className="right">
              <InputLabel
                {...{ onChange }}
                name="email"
                label="Correo"
                placeholder="example@gmail.com"
                value={inputs.email}
              />
              <InputLabel
                {...{ onChange }}
                name="phone"
                label="Numero telefonico"
                placeholder="0414-5631233"
                value={inputs.phone}
              />
              <LongSelect
                label="Género"
                placeholder="Seleccionar"
                options={["Masculino", "Femenino", "Otros"]}
                name="gender"
                value={inputs.gender}
                {...{ handleChange }}
              />
              <LongSelect
                label="_"
                hideLabel={true}
                placeholder="Meses Iniciales"
                options={month12()}
                name="membership"
                value={inputs.membership}
                {...{ handleChange }}
              />
            </div>
          </div>
          <div className="btn">
            <BtnPrimary text="Confirmar" onClick={createUser} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Register;

const InputLabel = ({ label, ...props }) => {
  return (
    <div>
      <p className="label">{label}</p>
      <InputText width="100%" {...props} />
    </div>
  );
};
