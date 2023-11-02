import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { card_id_dots } from "./helpers.js";
import { IconArrowUp, IconCheckCircle, IconCrossCircle } from "./Icons.jsx";
import { BtnPrimary, InputText } from "./Inputs.jsx";
import { findUser, pushAccess, User } from "./Schemas.js";


const AccessBar = ({ data, setData }) => {
  const [active, setActive] = useState(false);

  const [results, setResults] = useState({
    status: 0,
    msg: false,
  });

  const [inputs, setInputs] = useState({
    access: "",
    exit: "",
  });

  const variants = {
    open: {
      x: -380,
    },
    close: {
      x: 0,
    },
  };
  const variantText = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
      transition: { duration: 1 },
    },
    visible: {
      opacity: 1,
      y: `0`,
      transition: { duration: 1 },
    },
  };

  const click = () => {
    setActive(!active);
  };

  const onChange = (e) => {
    const att = e.target.getAttribute("name");
    let value = e.target.value;

    if (att === "access") {
      value = card_id_dots(value);
    }

    setInputs((prev) => ({ ...prev, [att]: value }));
  };

  const onClick = async () => {
    const { status, msg } = await pushAccess(inputs.access, setData);
    setResults({ status, msg });
    setInputs({access:"",exit:''})
    // setTimeout(() => setActive({ status: 0, msg: false }), 4000);
  };

  useEffect(() => {
    const time = setTimeout(
      () => results.msg && setResults({ status: 0, msg: false }),
      4000
    );
    return () => {
      clearTimeout(time);
    };
  }, [results]);

  return (
    <motion.div
      className="AccessBar"
      variants={variants}
      animate={active ? "open" : "hidden"}
      transition={{ ease: "easeInOut" }}
    >
      <div className="btn_ctn">
        <div className="btn" onClick={click}>
          <IconArrowUp size={18} className={active ? "open" : "close"} />
        </div>
      </div>
      <div className="ctn">
        <AccessInput
          name="access"
          value={inputs.access}
          {...{ onChange, onClick }}
          maxLength={10}
        />
        <div className="result">
          <AnimatePresence>
            {results.status === 200 && <IconCheckCircle size="84" />}
            {results.status > 400 && <IconCrossCircle size="84" />}
          </AnimatePresence>
          <AnimatePresence>
            {results.msg && (
              <motion.p
                variants={variantText}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {results.msg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        {/* <AccessInput text="Registrar Salida" /> */}
      </div>
    </motion.div>
  );
};

export default AccessBar;

const AccessInput = ({ onClick, ...props }) => {
  return (
    <div className="ai_ctn">
      <p>Registrar Acceso</p>
      <InputText placeholder="Cedula" {...props} />
      <div style={{ height: "3em" }}>
        <BtnPrimary text="Confirmar" {...{ onClick }} />
      </div>
    </div>
  );
};
