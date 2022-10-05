import React from "react";
import { useState, useEffect } from "react";
import Style from "../../js/Style";
import { websiteStyling } from "../../config.js";
import "./Modal.css";

function Modal(modalData) {
  const [data, setData] = useState({
    show: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    setData(modalData.data);
  }, [modalData]);

  return (
    <div
      className="modal-container"
      style={data.show ? { display: "block" } : { display: "none" }}
    >
      <div
        className="modal"
        style={{ backgroundColor: websiteStyling.bodyBackgroudColor }}
      >
        <span style={Style().border}>
          <h1>{data.title}</h1>
          <p>X</p>
        </span>
        <p>{data.message}</p>
      </div>
    </div>
  );
}

export default Modal;
