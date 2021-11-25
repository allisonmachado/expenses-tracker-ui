import { useParams, Redirect, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Joi from "joi";

import LoadingLine from "../../../util/LoadingLine";
import ErrorList from "../../../util/ErrorList";
import Title from "../../../util/Title";
import Alert from "../../../util/Alert";

import { MONTHS_TO_INT } from "../../../../lib/Constants";

export default function CreateExpense({ expenseService }) {
  const { year } = useParams();
  const { month } = useParams();

  const [expense, setExpense] = useState({
    title: "",
    from: { year, month: MONTHS_TO_INT[month] },
    value: 0,
    payd: false,
    notes: "",
  });
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState([]);
  const [informError, setInformError] = useState(false);
  const history = useHistory();
  const [validArgs, setValidArgs] = useState(null);

  function handleFormChange(event) {
    const name = event.target.name;
    const value = event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;

    setExpense({
      ...expense, [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    setInformError(false);
    try {
      await expenseService.create({
        title: expense.title,
        from: {
          year: Number(expense.from.year),
          month: Number(expense.from.month)
        },
        value: Number(expense.value),
        payd: expense.payd,
        ...(expense.notes ? { notes: expense.notes } : {})
      });
      setSaved(true);
    } catch (error) {
      setError(error.message);
      setInformError(true);
      setDisabled(false);
    }
  }

  const inputSchema = Joi.object({
    year: Joi.number()
      .min(0)
      .max(3000)
      .required(),
    month: Joi.string()
      .valid(...Object.keys(MONTHS_TO_INT))
      .required(),
  });

  useEffect(() => {
    function checkValidArgs(year, month) {
      const { error } = inputSchema.validate({ year, month });
      return !error;
    }
    const receivedValidArgs = checkValidArgs(year, month);
    setValidArgs(receivedValidArgs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (validArgs === false
    ? <Redirect to={{ pathname: "/404-not-found" }} />
    : <> <Title>{month} Expenses, {year} - Create</Title>
      {saved && <Alert type="success" message="Expense saved successfully" />}
      <form onSubmit={handleSubmit} noValidate>

        <div className="form-group">
          <label htmlFor="titleInput">Title*</label>
          <input
            id="titleInput"
            className="form-control"
            type="text"
            name="title"
            value={expense.title}
            disabled={disabled}
            onChange={handleFormChange} />
        </div>

        <div className="form-group">
          <label htmlFor="valueInput">Value*</label>
          <input
            id="valueInput"
            className="form-control"
            type="number"
            name="value"
            value={expense.value}
            disabled={disabled}
            onChange={handleFormChange} />
        </div>

        <div className="form-group">
          <label htmlFor="notesInput">Notes</label>
          <textarea
            id="notesInput"
            className="form-control"
            rows="3"
            name="notes"
            value={expense.notes}
            disabled={disabled}
            onChange={handleFormChange}>
          </textarea>

          <div className="form-check">
            <input
              id="paydInput"
              className="form-check-input"
              type="checkbox"
              name="payd"
              value={expense.payd}
              disabled={disabled}
              onChange={handleFormChange} />
            <label htmlFor="paydInput">Payd</label>
          </div>
        </div>

        {informError && <ErrorList errors={[error]}></ErrorList>}
        {saved || <button type="submit" className="btn btn-primary" disabled={disabled}>Submit</button>}
      </form>

      {saved && <button className="btn btn-secondary" onClick={() => history.goBack()}>Back</button>}
      <br></br>
      {disabled && !saved && <LoadingLine>Loading...</LoadingLine>}
    </>);
}
