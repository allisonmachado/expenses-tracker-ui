import { useHistory, useParams, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";

import OperationTitle from "../../../util/OperationTitle";
import ExpensesForm from "../../../util/ExpensesForm";
import LoadingLine from "../../../util/LoadingLine";
import ErrorList from "../../../util/ErrorList";
import Alert from "../../../util/Alert";

import { useExpenseFormState } from "../../../../hooks/useExpenseFormState";

export default function UpdateExpense({ expenseService }) {
  const { id } = useParams();

  const [
    expense,
    setExpense,
    handleFormChange
  ] = useExpenseFormState({
    year: 0,
    month: 0,
  });

  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingErrors, setLoadingErrors] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [informError, setInformError] = useState(false);
  const history = useHistory();

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
      setError(error.message);
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
        : <> 
          <OperationTitle 
            title={expense.title}
            month={expense.from.month}
            year={expense.from.year}
            operation="Update" />
          {saved && <Alert type="success" message="Expense saved successfully" />}

          <ExpensesForm
            handleFormChange={handleFormChange}
            handleSubmit={handleSubmit}
            informError={informError}
            disabled={disabled}
            expense={expense}
            saved={saved}
            error={error} />

          {saved && <button className="btn btn-secondary" onClick={() => history.goBack()}>
            <i className="bi-arrow-left-short"></i> Back
          </button>}
          <br></br>
          {disabled && !saved && <LoadingLine>Loading...</LoadingLine>}
        </>);
}
