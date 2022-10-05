import { useEffect } from "react";
import "./App.css";
import Connect from "./components/Connect/Connect";
import { websiteStyling } from "./config";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = websiteStyling.bodyBackgroudColor;
    document.body.style.fontFamily = websiteStyling.font;
    document.body.style.color = websiteStyling.fontColor;
  }, []);

  return (
    <div>
      <Connect />
    </div>
  );
}

export default App;
