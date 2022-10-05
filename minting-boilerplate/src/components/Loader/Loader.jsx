import { websiteStyling } from "../../config";
import "./Loader.css";

function Loader() {
  return (
    <div
      className="loader"
      style={{ borderTop: `0.2em solid ${websiteStyling.loaderColor}` }}
    ></div>
  );
}

export default Loader;
