import { useHistory, useParams, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";

import LoadingLine from "../../../util/LoadingLine";
import ErrorList from "../../../util/ErrorList";
import Title from "../../../util/Title";
import Alert from "../../../util/Alert";

export default function UpdateExpense({ expenseService }) {
  const { id } = useParams();

  const [expense, setExpense] = useState({
    title: "",
    from: { year: 0, month: 0 },
    value: 0,
    payd: false,
    notes: "",
  });
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingErrors, setLoadingErrors] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [informError, setInformError] = useState(false);
  const [formError, setFormError] = useState([]);
  const history = useHistory();

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
      await expenseService.update({
        _id: expense._id,
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
      setFormError(error.message);
      setInformError(true);
      setDisabled(false);
    }
  }

  useEffect(() => {
    async function fetchExpense() {
      try {
        const loadedExpense = await expenseService.getById(id);
        setExpense(loadedExpense);
      } catch (error) {
        if (error.message === "Requested resource not found"
          || error.message === "Verify all mandatory fields and formats") {
          setNotFound(true);
        } else {
          setLoadingErrors([error.message]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchExpense();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (loading ?
    <LoadingLine>Loading...</LoadingLine>
    : loadingErrors.length > 0
      ? <ErrorList errors={loadingErrors}></ErrorList>
      : notFound ?
        <Redirect to={{ pathname: "/404-not-found" }} />
        : <> <Title>Update Expense: {expense.title}</Title>
          {saved && <Alert type="success" message="Expense saved successfully" />}
          <form onSubmit={handleSubmit} noValidate>

            <div className="form-group">
              <label htmlFor="titleInput">Title<strong className="text-danger">*</strong></label>
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
              <label htmlFor="valueInput">Value</label>
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
                  checked={expense.payd}
                  disabled={disabled}
                  onChange={handleFormChange} />
                <label htmlFor="paydInput">Payd</label>
              </div>
            </div>

            {informError && <ErrorList errors={[formError]}></ErrorList>}
            {saved || <button type="submit" className="btn btn-primary" disabled={disabled}>Submit</button>}
          </form>

          {saved && <button className="btn btn-secondary" onClick={() => history.goBack()}>Back</button>}
          <br></br>
          {disabled && !saved && <LoadingLine>Loading...</LoadingLine>}
        </>);
}
