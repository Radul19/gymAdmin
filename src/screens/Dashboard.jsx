import React, { useEffect, useState } from "react";
import "../sass/dashboard.sass";
import {
  IconMuscle,
  IconMoney,
  IconUser,
  IconUserPlus,
  IconArrowUp,
  IconCheckCircle,
} from "../components/Icons.jsx";
import { BtnPrimary, InputText, SearchBar } from "../components/Inputs.jsx";
import Table from "../components/Table.jsx";
import PageContainer from "../components/PageContainer.jsx";
import { motion } from "framer-motion";
import { User } from "../components/Schemas.js";
import moment from "moment";

const fillData = async (set = () => {}) => {
  const res = await electron.readUsers();
  const users = JSON.parse(res);
  // let aux = [{membership:['2023','03','19']},{membership:['2023','06','22']},{membership:['2024','01','19']},{membership:['2020','03','19']},{membership:['2023','06','19']}]

  // console.log(aux.sort((a,b)=>{
  //   let z = moment(a.membership).unix()
  //   let y = moment(b.membership).unix()
  //   return z - y
  // }))
  let actives = 0;
  let news = 0;
  let today = 0;
  let missing = 0;

  users.forEach((element) => {
    if (moment(element.membership).unix() > moment().unix()) {
      actives += 1;
    } else {
      missing += 1;
    }

    if (moment().week() === element.createdAtWeek) news += 1;

  });
  console.log({ actives, news, today, missing });
  set({ actives, news, today, missing });
};

function Dashboard() {
  const [searchbar, setSearchbar] = useState("");
  const [data, setData] = useState({
    actives: 0,
    news: 0,
    today: 0,
    missing: 0,
  });
  useEffect(() => {
    fillData(setData);
  }, []);

  return (
    <PageContainer>
      <div className="dashboard_ctn">
        <AccessBar />
        <div className="top">
          <TopLeft data={data} />
          <TopRight data={data} />
        </div>
        <div className="bottom">
          <div className="title_searchbar">
            <p onClick={() => console.log(electron)}>Registro de asistencia</p>
            <SearchBar {...{ searchbar, setSearchbar }} />
          </div>
          <Table />
        </div>
      </div>
    </PageContainer>
  );
}

export default Dashboard;

/** TOP LEFT ITEMS  */
const Widget = ({ Icon, text, num }) => {
  return (
    <div className="widget">
      <div className="widget_icon">
        <Icon />
      </div>
      <div className="widget_right">
        <p className="widget_amount">{num}</p>
        <p className="widget_text">{text}</p>
      </div>
    </div>
  );
};

const TopLeft = ({data}) => (
  <div className="top_left">
    <p className="title">Dashboard</p>
    <div className="widgets_ctn">
      <Widget Icon={IconUser} text="Usuarios Activos" num={data.actives} />
      <Widget Icon={IconUserPlus} text="Nuevos esta semana" num={data.news} />
      <Widget Icon={IconMuscle} text="Entrenaron hoy" num="129" />
      <Widget Icon={IconMoney} text="Pagos pendientes" num={data.missing} />
    </div>
  </div>
);
/** TOP RIGHT ITEMS */
const list = [0, 50, 100, 150, 200, 250];
const list2 = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
const list3 = [110, 183, 235, 248, 158, 124, 79];

const calcSize = (num, max) => {
  let aux = (num * 100) / 250;
  return `${aux}%`;
};

const ArrowLeft = () => (
  <svg
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.06667 5.2L6.4 1.2C7.05924 0.705573 8 1.17595 8 2L8 10C8 10.824 7.05924 11.2944 6.4 10.8L1.06667 6.8C0.533334 6.4 0.533333 5.6 1.06667 5.2Z"
      fill="#CCC9C0"
    />
  </svg>
);

const TopRight = ({data}) => (
  <div className="top_right">
    <div className="stats_ctn">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="stats_title">Stadistics</p>
        <div className="type_select">
          <p className="type_select_text">Semanal</p>
          <ArrowLeft />
        </div>
      </div>
      <p className="stats_subtitle">Users and days</p>
      <div className="stats_info">
        <div className="display_ctn">
          <div className="display_absolute">
            {list.toReversed().map((item, index) => (
              <div className="display_absolute_line" key={index}>
                <p className="display_absolute_line_text">{item}</p>
              </div>
            ))}
          </div>
          <div className="display_absoluteBars">
            {list2.map((item, index) => (
              <div
                className="display_absoluteBars_bar"
                key={index}
                style={{ height: calcSize(list3[index], null) }}
              >
                <p className="display_absoluteBars_bar_text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AccessBar = () => {
  const [active, setActive] = useState(false);

  const variants = {
    open: {
      x: -380,
    },
    close: {
      x: 0,
    },
  };

  const click = () => {
    setActive(!active);
  };

  return (
    <motion.div
      className="AccessBar"
      variants={variants}
      animate={active ? "open" : "close"}
      transition={{ ease: "easeOut" }}
    >
      <div className="btn_ctn">
        <div className="btn" onClick={click}>
          <IconArrowUp size={18} className={active ? "open" : "close"} />
        </div>
      </div>
      <div className="ctn">
        <AccessInput />
        <div className="result">
          <IconCheckCircle size="120" />
          <p>Acceso Exitoso</p>
        </div>
        <AccessInput />
      </div>
    </motion.div>
  );
};

const AccessInput = () => {
  return (
    <div className="ai_ctn">
      <p>Registrar Acceso</p>
      <InputText placeholder="Cedula" />
      <div style={{ height: "3em" }}>
        <BtnPrimary text="Confirmar" />
      </div>
    </div>
  );
};
