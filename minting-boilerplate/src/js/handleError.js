import { errorMessages } from "../config";

function handleError(err) {
  if (String(err).includes(errorMessages.error6)) {
    return {
      title: "Error",
      message: errorMessages.error6Response,
    };
  } else {
    return {
      title: "Error",
      message: "An error occured.",
    };
  }
}

export default handleError;
