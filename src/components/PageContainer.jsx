import { motion } from "framer-motion";
import React from "react";
import NavBar from "./NavBar.jsx";

function PageContainer({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .5 }}
    >
      {children}
    </motion.div>
  );
}
export default PageContainer;
