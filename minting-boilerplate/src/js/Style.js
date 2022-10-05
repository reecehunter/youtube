import { websiteStyling } from "../config";

function Style() {
  return {
    paragraph: {
      fontSize: websiteStyling.paragraphFontSize,
    },
    button: {
      fontSize: websiteStyling.buttonSize,
      backgroundColor: websiteStyling.buttonBackgroundColor,
      color: websiteStyling.buttonFontColor,
    },
    increment: {
      fontSize: websiteStyling.paragraphFontSize,
      backgroundColor: "transparent",
      color: websiteStyling.fontColor,
    },
    border: {
      borderBottom: `2px solid ${websiteStyling.borderColor}`,
    },
    bubble: {
      backgroundColor: websiteStyling.bubbleBackgroundColor,
    },
  };
}

export default Style;
