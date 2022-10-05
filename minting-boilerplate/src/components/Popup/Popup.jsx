import React, { useState, useEffect } from "react";
import "./Popup.css";

function Popup(popupData) {
  const [data, setData] = useState({
    show: false,
    color: "",
    message: "",
  });

  useEffect(() => {
    setData(popupData.data);
  }, [popupData]);

  return (
    <div
      className="popup"
      style={{
        right: data.show ? "7px" : "-100%",
        backgroundColor: data.color,
      }}
    >
      <p
        className="close"
        onClick={() => {
          setData({ show: false });
        }}
      >
        x
      </p>
      <p>{data.message}</p>
    </div>
  );
}

export default Popup;
