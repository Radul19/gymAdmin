import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import "../sass/components.sass";
import { IconSelect, IconZoom } from "./Icons.jsx";

export const InputText = (props) => {
  return <input className="inputText" type="inputText" {...props} />;
};
export const BtnPrimary = ({ text,action=()=>{} }) => {
  return (
    <div className="btn_primary" onClick={action} >
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
        onChange={({ value }) => {
          setSearchbar(value);
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
    setActive(false)
    handleChange(name,value)
  };
  return (
    <div className="select" onMouseLeave={leave} >
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
              <p onClick={()=>{selectItem(item)}} key={index} >{item}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
