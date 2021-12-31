import { useParams, useRouteMatch, Redirect, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Joi from "joi";

import Alert from "../../../util/Alert";
import Title from "./Title";
import ErrorList from "../../../util/ErrorList";
import PaydBadge from "../../../util/PaydBadge";
import SimpleDate from "../../../../lib/SimpleDate";
import LoadingLine from "../../../util/LoadingLine";
import ConfirmationModal from "../../../util/ConfirmationModal";

import { useAlertState } from "../../../../hooks/useAlertState";
import { INT_TO_MONTHS, MONTHS_TO_INT } from "../../../../lib/Constants";

export default function ListExpenses({ expenseService }) {
  const history = useHistory();

  const { year } = useParams();
  const { month } = useParams();
  const { url } = useRouteMatch();

  const monthNumber = Number(MONTHS_TO_INT[month]);

  const hideCloneOption = SimpleDate.isCurrentYearMonth({
    year,
    month: monthNumber,
  });

  const [selectedExpense, setSelectedExpense] = useState({
    _id: 0, title: "",
  });
  const [errorAlert, notifyErrorAlert] = useAlertState();
  const [successAlert, notifySuccessAlert] = useAlertState();
  const [validArgs, setValidArgs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [expenses, setExpenses] = useState([]);

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
    async function fetchExpenses() {
      try {
        const fullExpensesObject = await expenseService.getAll();
        const expensesList = fullExpensesObject[year][monthNumber];
        setExpenses(expensesList.sort((a, b) => b.value - a.value)); // desc value
      } catch (error) {
        if (error.message.includes("Cannot read properties")) {
          setValidArgs(false);
        } else {
          setErrors([error.message]);
        }
      } finally {
        setLoading(false);
      }
    }

    const receivedValidArgs = checkValidArgs(year, month);
    setValidArgs(receivedValidArgs);

    if (receivedValidArgs) {
      fetchExpenses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  async function deleteExpense(expense) {
    try {
      await expenseService.deleteById(expense._id);
      const currentExpenses = expenses.filter(e => e._id !== expense._id);
      setExpenses(currentExpenses);
      notifySuccessAlert(`Expense ${expense.title} deleted successfully`, 3);
    } catch (error) {
      notifyErrorAlert(error.message, 3);
    }
  }

  async function cloneExpenses() {
    try {
      await expenseService.clone({
        year: Number(year),
        month: monthNumber
      });
      notifySuccessAlert(`"${month} Expenses, ${year}" cloned successfully`, 3);
    } catch (error) {
      notifyErrorAlert(error.message, 3);
    }
  }

  async function togglePayd(expense) {
    try {
      expense.payd = !expense.payd;
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
      setExpenses([...expenses]);
    } catch (error) {
      notifyErrorAlert(error.message, 3);
    }
  }

  function handlePrev() {
    const nextMonthNumber = monthNumber - 1;
    const nextMonth = INT_TO_MONTHS[nextMonthNumber];
    if (nextMonth) {
      history.push(`/expenses/${year}/${nextMonth}`);
    }
  }

  function handleNext() {
    const nextMonthNumber = monthNumber + 1;
    const nextMonth = INT_TO_MONTHS[nextMonthNumber];
    if (nextMonth) {
      history.push(`/expenses/${year}/${nextMonth}`);
    }
  }

  return (loading ?
    <LoadingLine>Loading...</LoadingLine>
    : errors.length > 0
      ? <ErrorList errors={errors}></ErrorList>
      : validArgs === false ?
        <Redirect to={{ pathname: "/404-not-found" }} />
        : <>
          <div className="row">
            <div className="col-md-10">
              <Title month={month} year={year} expenses={expenses} />
            </div>
            <div className="col-md-2">
              <Link to={`${url}/create`} className="btn btn-light btn-block">
                <i className="bi-plus"></i> New Expense
              </Link>
              {hideCloneOption || <button type="button" className="btn btn-light btn-block" data-toggle="modal" data-target="#cloneExpensesConfirmationModal">
                <i className="bi-front"></i> Clone Expenses
              </button>}
            </div>
          </div>
          <hr></hr>
          {errorAlert && <Alert type="danger" message={errorAlert} />}
          {successAlert && <Alert type="success" message={successAlert} />}
          {expenses.length > 0 || <h5>No expenses were registered in this period</h5>}
          {expenses.map(expense => <div className="card mt-2 mb-2" key={expense._id}>
            <div className="card-body">
              <h5 className="card-title">{expense.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                €{expense.value} <PaydBadge payd={expense.payd} onClick={() => togglePayd(expense)} />
              </h6>
              <p className="card-text">{expense.notes}</p>
              <Link to={`${url}/update/${expense._id}`} className="btn btn-light mr-2">
                <i className="bi-pencil"></i> Edit
              </Link>
              <button
                type="button"
                className="btn btn-light"
                data-toggle="modal"
                data-target="#deleteExpenseConfirmationModal"
                onClick={() => setSelectedExpense({ _id: expense._id, title: expense.title })}>
                <i className="bi-trash"></i> Delete
              </button>
            </div>
          </div>)}
          <hr></hr>
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-light float-left" onClick={() => handlePrev()}>
                <i className="bi-arrow-left-short"></i> Prev
              </button>
            </div>
            <div className="col">
              <button type="button" className="btn btn-light float-right" onClick={() => handleNext()}>
                Next <i className="bi-arrow-right-short"></i>
              </button>
            </div>
          </div>
          <ConfirmationModal
            id="deleteExpenseConfirmationModal"
            title="Confirmation"
            action={`Delete expense: "${selectedExpense.title}"`}
            actionHandler={() => deleteExpense(selectedExpense)} />
          <ConfirmationModal
            id="cloneExpensesConfirmationModal"
            title="Confirmation"
            action={`Confirm cloning expenses from "${month} Expenses, ${year}" into current month?`}
            actionHandler={() => cloneExpenses()} />
        </>);
}
