import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import "../sass/components.sass";
import { IconSelect, IconZoom } from "./Icons.jsx";

export const InputText = (props) => {
  return <input className="inputText" type="inputText" {...props} />;
};
export const BtnPrimary = ({ text, ...props }) => {
  return (
    <div className="btn_primary" {...props}>
      <p className="btn_primary_text">{text}</p>
    </div>
  );
};
export const SearchBar = ({ searchbar, setSearchbar }) => {
  return (
    <div className="searchbar">
      <div className="searchbar_icon">
        <IconZoom />
      </div>
      <input
        value={searchbar}
        onChange={(e) => {
          setSearchbar(e.target.value);
        }}
        type="text"
        className="searchbar_input"
        placeholder="Search"
      />
    </div>
  );
};

export const Select = ({
  options = [],
  placeholder = "",
  name = "",
  value = false,
  handleChange,
}) => {
  const [active, setActive] = useState(false);
  const click = () => {
    setActive(!active);
  };

  const leave = () => {
    active && setActive(false);
  };

  const selectItem = (value) => {
    setActive(false);
    handleChange(name, value);
  };
  return (
    <div className="select" onMouseLeave={leave}>
      <div className="select_display" onClick={click}>
        {!value && <p className="placeholder">{placeholder}</p>}
        {value && <p className="select_value">{value}</p>}
        <IconSelect active={active} />
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            className="select_options"
            initial={{ heigth: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {options.map((item, index) => (
              <p
                onClick={() => {
                  selectItem(item);
                }}
                key={index}
              >
                {item}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ObjSelects = ({
  options = {},
  placeholder = "Filtros",
  handleFilters,
}) => {
  const [active, setActive] = useState(true);
  const click = () => {
    setActive(!active);
  };

  const leave = () => {
    active && setActive(false);
  };

  const selectItem = (key, value) => {
    // setActive(false);
    handleFilters(key, !value);
  };
  return (
    <div className="select" onMouseLeave={leave}>
      <div className="select_display" onClick={click}>
        <p className="placeholder">{placeholder}</p>
        {/* {!value && <p className="placeholder">{placeholder}</p>} */}
        {/* {value && <p className="select_value">{value}</p>} */}
        <IconSelect active={active} />
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            className="select_options"
            initial={{ heigth: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* {options.for((item, index) => (
              <p
                onClick={() => {
                  selectItem(item);
                }}
                key={index}
              >
                {item}
              </p>
            ))} */}
            {/* {Object.keys(options).forEach((key, index) => {
              console.log(key)
              return (
                <p
                  onClick={() => {
                    selectItem(key, options[key]);
                  }}
                  key={index}
                >
                  {translateKeys(key)}
                </p>
              );
            })} */}
            {translateObject(options, selectItem)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const translateKeys = (key) => {
  switch (key) {
    // case "id":
    case "name":
      return "Nombre";
    case "card_id":
      return "Cédula";
    case "phone":
      return "Teléfono";
    case "gender":
      return "Género";
    case "birth":
      return "Fecha de nacimiento";
    case "membership_type":
      return "Tipo de M.";
    case "membership":
      return "Membresia";
    case "createdAt":
      return "Fecha de ingreso";
    default:
      return "";
  }
};

const translateObject = (options, selectItem) => {
  let aux = [];
  for (const key in options) {
    aux.push([key, options[key]]);
  }
  return aux.map((item, index) => {
    let text = translateKeys(item[0]);
    if (text.length > 0) {
      return (
        <div style={{ display: "flex", position: "relative" }} key={index}>
          <p
            onClick={() => {
              selectItem(item[0], item[1]);
            }}
          >
            {text}
          </p>
          {item[1] && <div className="circleActive"></div>}
        </div>
      );
    }
  });
};

// case id:
// case name:
// case card_id:
// case phone:
// case gender:
// case birth:
// case membership_type:
// case membership:
// case createdAt:
