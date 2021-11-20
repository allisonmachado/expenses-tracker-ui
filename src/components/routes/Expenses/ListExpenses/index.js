import { useParams, useRouteMatch, Redirect, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Joi from "joi";

import Title from "../../../util/Title";
import ErrorList from "../../../util/ErrorList";
import PaydBadge from "../../../util/PaydBadge";
import LoadingLine from "../../../util/LoadingLine";

import { MONTHS_TO_INT } from "../../../../lib/Constants";
import ConfirmationModal from "../../../util/ConfirmationModal";
import Alert from "../../../util/Alert";

export default function ListExpenses({ expenseService }) {
  const { year } = useParams();
  const { month } = useParams();
  const { url } = useRouteMatch();

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
        setExpenses(loadedExpenses[year][MONTHS_TO_INT[month]]);
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
  }, []);

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

  return (loading ?
    <LoadingLine>Loading...</LoadingLine>
    : errors.length > 0
      ? <ErrorList errors={errors}></ErrorList>
      : validArgs === false ?
        <Redirect to={{ pathname: "/404-not-found" }} />
        : <>
          <Title>{month} Expenses, {year}</Title>
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
          <Link to={`${url}/create`}>
            <button type="button" className="btn btn-primary float-right">
              Create
            </button>
          </Link>
          <ConfirmationModal
            title="Confirmation"
            action="Delete"
            item={selectedExpense}
            name={selectedExpense.title}
            deleteHandler={deleteExpense} />
        </>);
}
