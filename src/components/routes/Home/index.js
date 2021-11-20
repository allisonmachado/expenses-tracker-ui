import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import LoadingLine from "../../util/LoadingLine";
import ErrorList from "../../util/ErrorList";

import { INT_TO_MONTHS } from "../../../lib/Constants";
import CreateExpenseModal from "../../util/CreateExpenseModal";

export default function Home({ expenseService }) {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const [expenses, setExpenses] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const loadedExpenses = await expenseService.getAll();
        const loadedYears = Object.keys(loadedExpenses).sort().reverse();
        const loadedMonths = loadedYears.length > 0
          ? Object.keys(loadedExpenses[loadedYears[currentYearIndex]])
          : [];

        setExpenses(loadedExpenses);
        setYears(loadedYears);
        setMonths(loadedMonths);
      } catch (error) {
        setErrors([error.message]);
      } finally {
        setLoading(false);
      }
    }
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateYearAndMonth(currentYearIndex) {
    setCurrentYearIndex(currentYearIndex);
    setMonths(Object.keys(expenses[years[currentYearIndex]]));
  }

  function handlePrev() {
    const nextCurrentYearIndex = currentYearIndex - 1;
    if (nextCurrentYearIndex >= 0) {
      updateYearAndMonth(nextCurrentYearIndex);
    }
  }

  function handleNext() {
    const nextCurrentYearIndex = currentYearIndex + 1;
    if (nextCurrentYearIndex < years.length) {
      updateYearAndMonth(nextCurrentYearIndex);
    }
  }

  return (<>
    {years[currentYearIndex] && <>
      <div className="row">
        <div className="col-md-10">
          <h1>Expenses {years[currentYearIndex]}</h1>
        </div>
        <div className="col-md-2 d-none d-lg-block d-xl-block">
          <button type="button" className="btn btn-block btn-light" data-toggle="modal" data-target="#createExpenseModal">
            New Expense
          </button>
        </div>
      </div>
      <hr></hr>
    </>}
    {loading ? <LoadingLine>Loading...</LoadingLine> : <>
      {errors.length > 0 ? <ErrorList errors={errors}></ErrorList> : <>
        {(years[currentYearIndex] && months?.length > 0) ? <>
          <div className="list-group">
            {months.map(month => <Link
              to={`/expenses/${years[currentYearIndex]}/${INT_TO_MONTHS[month]}`}
              className="list-group-item list-group-item-action"
              key={currentYearIndex + month}
            >
              {INT_TO_MONTHS[month]}
            </Link>)}
          </div>
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
        </> : <>
          <div className="row">
            <div className="col-md-10">
              <h3>You have no expenses registered</h3>
            </div>
            <div className="col-md-2 d-none d-lg-block d-xl-block">
              <button type="button" className="btn btn-block btn-light">
                New Expense
              </button>
            </div>
          </div>
          <hr></hr>
        </>}
      </>}
    </>}
    <CreateExpenseModal />
  </>);
}
