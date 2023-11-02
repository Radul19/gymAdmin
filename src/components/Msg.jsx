import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import "../sass/components.sass";
import { IconCheckCircle, IconCrossCircle } from "./Icons.jsx";

function Msg({ msg, setMsg }) {
  const onClick = () => {
    setMsg((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    if (msg.show) {
      let tm = setTimeout(() => {
        onClick();
      }, 5000);
      return () => {
        clearTimeout(tm);
      };
    }
  }, [msg.show]);

  return (
    <AnimatePresence>
      {msg.show && (
        <motion.div
          className="msg"
          onClick={onClick}
          initial={{ y: -50 }}
          animate={{ y: 50 }}
          exit={{ y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {msg.status ? <IconCheckCircle /> : <IconCrossCircle />}
          <p style={{ marginLeft: "1em" }}>{msg.text}</p>
          <div style={{ marginLeft: "auto" }}>
            <p style={{ marginTop: -1, marginRight: ".3em" }}>x</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Msg;
