import moment from "moment";
import React, { useEffect, useState } from "react";
import "../sass/components.sass";
import {
  IconArrowDown,
  IconArrowUp,
  IconCheckBox,
  IconErrorBox,
} from "./Icons.jsx";

function Table({ data, tableFilters: tf, searchbar }) {
  const [copyData, setCopyData] = useState([]);
  const [order, setOrder] = useState({
    name: "",
    status: 1,
  });

  const so = (name) => {
    let st = order.name === name ? order.status + 1 : 2;
    if (st > 3) {
      setOrder({ name: "", status: 1 });
    } else {
      setOrder({ name, status: st });
      // if(order.name === name) setOrder({name,status:3})
      // else setOrder({name,status:3})
    }
  };

  // const rowFilter = {
  //   id,
  //   name,
  //   card_id,
  //   time,
  //   date,
  //   stat,
  // };

  let orderData = (d) => {
    if (order.name.length > 0) {
      let n = order.status === 3 ? -1 : 1;
      d.sort((a, b) => {
        if (order.name === "time") {
          let t1 = a[order.name];
          let t2 = b[order.name];
          if (t1 > t2) return 1 * n;
          else if (t1 < t2) return -1 * n;
          return 0;
        }
        if (order.name === "stat") {
          let s1 = n === 1 ? a.status : !a.status;
          let s2 = n === 1 ? b.status : !b.status;
          if (s1 && !s2) return 1;
          else if (!s1 && s2) return -1;
          return 0;
        }
        if (a[order.name] > b[order.name]) return 1 * n;
        else if (a[order.name] < b[order.name]) return -1 * n;
        return 0;
      });
    } else {
      d.sort((a, b) => {
        if (a.id > b.id) return 1;
        else if (a.id < b.id) return -1;
        else return 0;
      });
    }
  };

  useEffect(() => {
    if (searchbar.length > 0) {
      let aux = [];
      data.forEach((item) => {
        let sb = searchbar;
        for (const key in item) {
          let value =
            typeof item[key] === "string"
              ? item[key]
              : JSON.stringify(item[key]);
          if (key === "time") value = moment(item.time).format("hh:mma");
          if (key === "date") value = moment(item.time).format("YYYY M D");
          if (value === sb) aux.push(item);
        }
      });
      orderData(aux);
      setCopyData(aux.reverse());
    } else {
      let aux = [...data];
      orderData(aux);
      setCopyData(aux.reverse());
    }
  }, [searchbar, data, order]);

  return (
    <div className="table">
      <div className="table_ctn">
        <AllTitles {...{ order, so, tf }} />
        <div className="table_info">
          {data.length === 0 && (
            <div className="noinfo">
              <p>No se encontraron resultados</p>
            </div>
          )}
          {copyData.map((item, index) => (
            <Row {...tf} item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const AllTitles = ({ order, so, tf }) => {
  return (
    <div className="table_header">
      {tf.id && <Tag {...{ order, so }} />}
      {tf.name && <Title so={so} text="Nombre" name="name" order={order} />}
      {tf.card_id && (
        <Title so={so} text="Cedula" name="card_id" order={order} />
      )}
      {tf.phone && <Title so={so} text="Teléfono" name="phone" order={order} />}
      {tf.gender && <Title so={so} text="Género" name="gender" order={order} />}
      {tf.birth && <Title so={so} text="Edad" name="birth" order={order} />}

      {tf.time && (
        <Title so={so} text="Hora de registro" name="time" order={order} />
      )}
      {tf.date && (
        <Title so={so} text="Tipo de registro" name="date" order={order} />
      )}
      {tf.membership && (
        <Title so={so} text="Membresia" name="membership" order={order} />
      )}
      {tf.membership_type && (
        <Title so={so} text="Tipo de M." name="membership_type" order={order} />
      )}
      {tf.createdAt && (
        <Title so={so} text="Fecha de Ingreso" name="createdAt" order={order} />
      )}
      {tf.stat && <Title so={so} text="Status" name="stat" order={order} />}
    </div>
  );
};

const Title = ({ text, name, so, order }) => {
  const onClick = () => {
    so(name);
  };
  return (
    <div className="title_ctn" {...{ onClick }}>
      <p className="title_text">{text}</p>
      <div className="title_icon">
        {order.name === name && (
          <>
            {order.status === 2 && <IconArrowUp />}
            {order.status === 3 && <IconArrowDown />}
          </>
        )}
      </div>
    </div>
  );
};

const Tag = ({ order, so }) => {
  const onClick = () => {
    so("id");
  };
  return (
    <div className="tag" {...{ onClick }}>
      <p className="tag_text">#</p>
      <div className="tag_icon">
        {order.name === "id" && (
          <>
            {order.status === 2 && <IconArrowUp />}
            {order.status === 3 && <IconArrowDown />}
          </>
        )}
      </div>
    </div>
  );
};

/**props
 * id
 * name
 * card_id
 * time
 *
 */
const Row = ({ item, ...props }) => {
  return (
    <div className="row_ctn">
      {props.id && <p className="row_num">{item.id}</p>}
      {props.name && <p className="row_item">{item.name}</p>}
      {props.card_id && <p className="row_item">{item.card_id}</p>}
      {props.phone && <p className="row_item">{item.phone}</p>}
      {props.gender && <p className="row_item">{item.gender}</p>}
      {props.birth && <p className="row_item">{getAge(item.birth)}</p>}
      {props.time && <p className="row_item">{getTime(props.time)}</p>}
      {props.date && <p className="row_item">{getTime(props.time, false)}</p>}
      {props.membership && (
        <p className="row_item">{getUnixTime(item.membership)}</p>
      )}
      {props.membership_type && (
        <p className="row_item">{item.membership_type}</p>
      )}
      {props.createdAt && (
        <p className="row_item">{getUnixTime(item.createdAt)}</p>
      )}
      {props.stat && (
        <div className="row_status">
          {item.status ? <IconCheckBox /> : <IconErrorBox />}
        </div>
      )}
    </div>
  );
};

export default Table;
// 1998/07/07
const getAge = (date) => {
  let aux1 = date.split("/");
  let aux = moment(aux1).fromNow(true).split(" ");
  return aux[0] + " Años";
};

const getUnixTime = (date) => {
  return moment(date).format("DD/MM/YYYY");
};
const getTime = (t, bool = true) => {
  if (bool) return moment(t).format("hh:mma");
  else return moment(t).format("YYYY M D");
};
