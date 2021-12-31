import { useHistory, useParams, Redirect, } from "react-router-dom";
import React, { useEffect, useState } from "react";

import OperationTitle from "../../../util/OperationTitle";
import ExpensesForm from "../../../util/ExpensesForm";
import LoadingLine from "../../../util/LoadingLine";
import Alert from "../../../util/Alert";
import Joi from "joi";

import { MONTHS_TO_INT } from "../../../../lib/Constants";

import { useExpenseFormState } from "../../../../hooks/useExpenseFormState";

export default function CreateExpense({ expenseService }) {
  const { year } = useParams();
  const { month } = useParams();

  const [
    expense, ,
    handleFormChange
  ] = useExpenseFormState({
    year,
    month: MONTHS_TO_INT[month],
  });

  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState([]);
  const [informError, setInformError] = useState(false);
  const [validArgs, setValidArgs] = useState(null);
  const history = useHistory();

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

  useEffect(() => {
    const inputSchema = Joi.object({
      year: Joi.number()
        .min(0)
        .max(3000)
        .required(),
      month: Joi.string()
        .valid(...Object.keys(MONTHS_TO_INT))
        .required(),
    });
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
    : <> 
      <OperationTitle
        title="Expenses"
        month={MONTHS_TO_INT[month]}
        year={year}
        operation="Create" />
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
