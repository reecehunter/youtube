import "./Topbar.css";
import Style from "../../js/Style";

function Topbar({ account }) {
  return (
    <div className="topbar" style={Style().bubble}>
      <p>{account}</p>
    </div>
  );
}

export default Topbar;
