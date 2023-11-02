import moment from "moment";
import React, { useEffect, useState } from "react";
import { ObjSelects, SearchBar, Select } from "../components/Inputs.jsx";
import PageContainer from "../components/PageContainer.jsx";
import Table from "../components/Table.jsx";
import "../sass/database.sass";

const dbTypes = ["Usuarios", "Registro de Acceso", "Pagos", "Reportes"];
const allFilters = [
  {
    id: false,
    name: true,
    card_id: true,
    phone: true,
    gender: true,
    birth: true,
    membership_type: true,
    membership: true,
    createdAt: true,
  },
  { id:true,name: true, card_id: true, time: true, stat: true },
  {
    id:true,
    name:true ,
    card_id:true,
    phone:true,
    amount:true,
    amount_type:true,
    months:true ,
  },
  {},
];

const fillAccessData = async () => {
  let res = await electron.readUsers();
  let users = JSON.parse(res);
  let aux = [];
  users.forEach((user) => {
    user.attemps.forEach((att) => {
      let { name, card_id } = user;
      aux.push({ ...att, name, card_id });
    });
  });
  return JSON.stringify(aux);
};

function Database() {
  const [inputs, setInputs] = useState({
    db_type: "Usuarios",
  });
  const [searchbar, setSearchbar] = useState("");
  const [tableFilters, setTableFilters] = useState(allFilters[0]);

  const [data, setData] = useState([]);

  const handleChange = (att, value) => {
    setInputs((prev) => ({ ...prev, [att]: value }));
  };

  const handleFilters = (att, value) => {
    setTableFilters((prev) => ({ ...prev, [att]: value }));
  };
  const fillData = async () => {
    let res = "[]";
    let dbt = inputs.db_type;
    if (dbt === "Usuarios") res = await electron.readUsers();
    if (dbt === "Registro de Acceso") res = await fillAccessData();
    else if (dbt === "Pagos") res = await electron.readPays();
    // else if (dbt === "Reportes") res = await electron.readReports();
    res = JSON.parse(res);
    setData(res);
  };

  useEffect(() => {
    let i = dbTypes.indexOf(inputs.db_type);
    setTableFilters(allFilters[i]);
    fillData();
  }, [inputs.db_type]);

  return (
    <PageContainer>
      <div className="database_ctn">
        <p className="title">Database</p>
        <div className="db_inputs">
          <Select
            {...{ handleChange }}
            value={inputs.db_type}
            options={dbTypes}
            name="db_type"
          />
          <div className="select_search">
            <ObjSelects options={tableFilters} {...{ handleFilters }} />
            <SearchBar {...{ searchbar, setSearchbar }} />
          </div>
        </div>
        <Table {...{ tableFilters, data, searchbar }} />
      </div>
    </PageContainer>
  );
}

export default Database;
