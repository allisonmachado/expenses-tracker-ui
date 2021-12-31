import { useState } from "react";

export function useExpenseFormState({year, month}) {
  const [expense, setExpense] = useState({
    title: "",
    from: { year, month },
    value: 0,
    payd: false,
    notes: "",
  });

  function handleFormChange(event) {
    const name = event.target.name;
    const value = event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;

    setExpense({
      ...expense, [name]: value
    });
  }

  return [expense, setExpense, handleFormChange];
}
