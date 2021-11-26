import { useState } from "react";

export function useAlert() {
  const [alert, setAlert] = useState("");

  function setNotification(message, timeInSecs) {
    setAlert(message);
    setTimeout(() => setAlert(""), timeInSecs * 1000);
  }

  return [alert, setNotification];
}
