import { useState } from "react";

export function useAlertState() {
  const [alert, setAlert] = useState("");

  function notify(message, timeInSecs) {
    setAlert(message);
    setTimeout(() => setAlert(""), timeInSecs * 1000);
  }

  return [alert, notify];
}
