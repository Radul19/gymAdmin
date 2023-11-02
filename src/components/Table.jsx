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
      let sb = searchbar;
      data.forEach((item) => {
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
      {tf.name && <Title text="Nombre" name="name" {...{ order, so }} />}
      {tf.card_id && (
        <Title so={so} text="Cedula" name="card_id" order={order} />
      )}
      {tf.phone && <Title so={so} text="Teléfono" name="phone" order={order} />}
      {tf.gender && <Title so={so} text="Género" name="gender" order={order} />}
      {tf.birth && <Title so={so} text="Edad" name="birth" order={order} />}

      {tf.time && (
        <Title text="Hora de registro" name="time" {...{ order, so }} />
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
      {/** PAYS */}
      {tf.amount && (
        <Title so={so} text="Cantidad" name="amount" order={order} />
      )}
      {tf.amount_type && (
        <Title so={so} text="Moneda" name="amount_type" order={order} />
      )}
      {tf.months && <Title so={so} text="Meses" name="months" order={order} />}
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
const Row = ({ item, ...tf }) => {
  return (
    <div className="row_ctn">
      {/** USER PROPS */}
      {item.id && tf.id && <p className="row_num">{item.id}</p>}
      {item.name && tf.name && <p className="row_item">{item.name}</p>}
      {item.card_id && tf.card_id && <p className="row_item">{item.card_id}</p>}
      {item.phone && tf.phone && <p className="row_item">{item.phone}</p>}
      {item.gender && tf.gender && <p className="row_item">{item.gender}</p>}
      {item.birth && tf.birth && (
        <p className="row_item">{getAge(item.birth)}</p>
      )}
      {item.time && tf.time && <p className="row_item">{getTime(item.time)}</p>}
      {item.date && tf.date && (
        <p className="row_item">{getTime(item.time, false)}</p>
      )}
      {item.membership && tf.membership && (
        <p className="row_item">{getUnixTime(item.membership)}</p>
      )}
      {item.membership_type && tf.membership_type && (
        <p className="row_item">{item.membership_type}</p>
      )}
      {item.createdAt && tf.createdAt && (
        <p className="row_item">{getUnixTime(item.createdAt)}</p>
      )}
      {tf.stat && (
        <div className="row_status">
          {item.status ? <IconCheckBox /> : <IconErrorBox />}
        </div>
      )}

      {/** PAYS PROPS */}
      {item.amount && tf.amount && <p className="row_item">{item.amount}</p>}
      {tf.amount_type && (
        <p className="row_item">{getCurrency(item.amount_type)}</p>
      )}
      {tf.months && <p className="row_item">{item.months}</p>}
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

const getCurrency = (aux) => {
  if (aux) return "$";
  else return "Bs.f";
};
