import { useParams, useRouteMatch, Redirect, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Joi from "joi";

import Alert from "../../../util/Alert";
import ErrorList from "../../../util/ErrorList";
import PaydBadge from "../../../util/PaydBadge";
import LoadingLine from "../../../util/LoadingLine";
import ConfirmationModal from "../../../util/ConfirmationModal";

import { INT_TO_MONTHS, MONTHS_TO_INT } from "../../../../lib/Constants";

export default function ListExpenses({ expenseService }) {
  const history = useHistory();
  const { year } = useParams();
  const { month } = useParams();
  const { url } = useRouteMatch();

  const monthNumber = Number(MONTHS_TO_INT[month]);

  const [selectedExpense, setSelectedExpense] = useState({
    _id: 0, title: "",
  });
  const [deleteError, setDeleteError] = useState("");
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
        const loadedExpenses = await expenseService.getAll();
        setExpenses(loadedExpenses[year][monthNumber]);
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
    } catch (error) {
      setDeleteError(error.message);
      setTimeout(() => setDeleteError(""), 3000);
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
              <h1>{month} Expenses, {year}</h1>
            </div>
            <div className="col-md-2 d-none d-lg-block d-xl-block">
              <Link to={`${url}/create`}>
                <button type="button" className="btn btn-block btn-light">
                  New Expense
                </button>
              </Link>
            </div>
          </div>
          <hr></hr>
          {deleteError && <Alert type="danger" message={deleteError} />}
          {expenses.length > 0 || <h5>No expenses were registered in this period</h5>}
          {expenses.map(expense => <div className="card mt-2 mb-2" key={expense._id}>
            <div className="card-body">
              <h5 className="card-title">{expense.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">€{expense.value} <PaydBadge payd={expense.payd} /></h6>
              <p className="card-text">{expense.notes}</p>
              <Link to={`${url}/update/${expense._id}`} className="btn btn-link">
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-link"
                data-toggle="modal"
                data-target="#confirmationModal"
                onClick={() => setSelectedExpense({ _id: expense._id, title: expense.title })}>
                Delete
              </button>
            </div>
          </div>)}
          <hr></hr>
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-light float-left" onClick={() => handlePrev()}>
                Prev
              </button>
            </div>
            <div className="col">
              <button type="button" className="btn btn-light float-right" onClick={() => handleNext()}>
                Next
              </button>
            </div>
          </div>
          <ConfirmationModal
            title="Confirmation"
            action="Delete"
            item={selectedExpense}
            name={selectedExpense.title}
            deleteHandler={deleteExpense} />
        </>);
}
