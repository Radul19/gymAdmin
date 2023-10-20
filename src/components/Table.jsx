import React from "react";
import "../sass/components.sass";
import { IconArrowDown, IconArrowUp } from "./Icons.jsx";

function Table() {
  return (
    <div className="table">
      <div className="table_ctn">
        <div className="table_header">
          <Tag />
          <Title text="Nombre" />
          <Title text="Cedula" />
          <Title text="Hora de registro" />
          <Title text="Tipo de registro" />
          <Title text="Status" />
        </div>
        <div className="table_info">
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
        </div>
      </div>
    </div>
  );
}

const Title = ({ text }) => {
  return (
    <div className="title_ctn">
      <p className="title_text">{text}</p>
      <div className="title_icon">
        <IconArrowUp/>
      </div>
    </div>
  );
};

const Tag = () => {
  return (
    <div className="tag">
      <p className="tag_text">#</p>
      <div className="tag_icon"></div>
    </div>
  );
};

const Row = () => {
  return (
    <div className="row_ctn">
      <p className="row_num">1</p>
      <p className="row_item">Jhon Doe</p>
      <p className="row_item">28.666.777</p>
      <p className="row_item">2:24pm</p>
      <p className="row_item">Acceso</p>
      <p className="row_status">x</p>
    </div>
  );
};

export default Table;
