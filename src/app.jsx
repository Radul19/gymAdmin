// import Login from './screens/Login.jsx';
import * as React from "react";
import { createRoot } from "react-dom/client";
import PageAdmin from "./screens/PageAdmin.jsx";
import { LocContext } from "./components/location.jsx";

const App = () => {
  const [location, setLocation] = React.useState("/");
  return (
    // <React.StrictMode>
      <LocContext.Provider value={{ location, setLocation }}>
        <PageAdmin />
      </LocContext.Provider>
    // </React.StrictMode>
  );
};

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App />);
