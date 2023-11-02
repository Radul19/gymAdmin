import React, { useContext, useEffect, useState } from "react";
import "../sass/dashboard.sass";
import {
  IconMuscle,
  IconMoney,
  IconUser,
  IconUserPlus,
  IconArrowUp,
  IconCheckCircle,
  IconArrowLeft,
} from "../components/Icons.jsx";
import { SearchBar } from "../components/Inputs.jsx";
import Table from "../components/Table.jsx";
import PageContainer from "../components/PageContainer.jsx";
import { motion } from "framer-motion";
import { User } from "../components/Schemas.js";
import moment from "moment";
import AccessBar from "../components/AccessBar.jsx";
import { LocContext } from "../components/location.jsx";

const fillData = async (set = () => {}) => {
  const res = await electron.readUsers();
  const users = JSON.parse(res);

  let actives = 0;
  let news = 0;
  let today = [];
  let missing = 0;

  users.forEach((user) => {
    if (moment(user.membership).unix() > moment().unix()) {
      actives += 1;
    } else {
      missing += 1;
    }

    if (moment().week() === user.createdAtWeek) news += 1;

    user.attemps.forEach((att) => {
      if (moment(att.time).format("YYYY M D") === moment().format("YYYY M D")) {
        let { name, card_id } = user;
        today.push({ ...att, name, card_id });
      }
    });
  });
  // console.log({ actives, news, today, missing });
  set({ actives, news, today, missing });
};


function Dashboard() {
  
  const { location } = useContext(LocContext);
  const [searchbar, setSearchbar] = useState("");
  const [data, setData] = useState({
    actives: 0,
    news: 0,
    today: [],
    missing: 0,
  });
  useEffect(() => {
    fillData(setData);
  }, []);

  const tableFilters = {
    name: true,
    card_id: true,
    time: true,
    stat: true,
  };


  return (
    <PageContainer>
      <div className="dashboard_ctn">
        <AccessBar {...{ data, setData }} />
        <div className="top">
          <TopLeft data={data} />
          <TopRight data={data} />
        </div>
        <div className="bottom">
          <div className="title_searchbar">
            <p onClick={() => console.log(electron)}>Registro de asistencia</p>
            <SearchBar {...{ searchbar, setSearchbar }} />
          </div>
          <Table {...{tableFilters,searchbar}} data={data.today} />
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

const TopLeft = ({ data }) => (
  <div className="top_left">
    <p className="title">Dashboard</p>
    <div className="widgets_ctn">
      <Widget Icon={IconUser} text="Usuarios Activos" num={data.actives} />
      <Widget Icon={IconUserPlus} text="Nuevos esta semana" num={data.news} />
      <Widget Icon={IconMuscle} text="Entrenaron hoy" num={data.today.length} />
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

const TopRight = () => {
  // const [data, setData] = useState({
  //   day:[],
  //   week:[],
  //   month:[],
  //   year:[]
  // });
  // const [range, setRange] = useState(1);
  // useEffect(() => {
  //   (async () => {
  //     const res = await electron.readUsers();
  //     const users = JSON.parse(res);
  //     users.forEach(user => {

  //     });
  //   })();
  // }, []);

  return (
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
            <IconArrowLeft />
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
};
