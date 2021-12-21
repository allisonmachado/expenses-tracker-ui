import { Link, useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import NoExpensesWarning from "../../../util/NoExpensesWarning";
import LoadingLine from "../../../util/LoadingLine";
import SimpleDate from "../../../../lib/SimpleDate";
import ErrorList from "../../../util/ErrorList";

import { INT_TO_MONTHS } from "../../../../lib/Constants";

export default function ListMonths({ expenseService }) {
  const history = useHistory();
  const { year } = useParams();

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [fullExpenses, setFullExpenses] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const loadedExpenses = await expenseService.getAll();
        const loadedYears = Object.keys(loadedExpenses).sort().reverse();
        const yearIndex = loadedYears.indexOf(year);

        if (yearIndex > -1) {
          const loadedMonths = loadedYears.length > 0
            ? Object.keys(loadedExpenses[loadedYears[yearIndex]])
            : [];

          setFullExpenses(loadedExpenses);
          setExpenses(loadedExpenses);
          setYears(loadedYears);
          setMonths(loadedMonths);
          setCurrentYearIndex(yearIndex);
        }
      } catch (error) {
        setErrors([error.message]);
      } finally {
        setLoading(false);
      }
    }
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  function handlePrev() {
    const nextYearIndex = currentYearIndex - 1;
    if (nextYearIndex >= 0) {
      const loadedYears = Object.keys(expenses).sort().reverse();
      const nextYear = loadedYears[nextYearIndex];
      history.push(`/expenses/${nextYear}/`);
    }
  }

  function handleNext() {
    const nextYearIndex = currentYearIndex + 1;
    if (nextYearIndex < years.length) {
      const loadedYears = Object.keys(expenses).sort().reverse();
      const nextYear = loadedYears[nextYearIndex];
      history.push(`/expenses/${nextYear}/`);
    }
  }

  return (<>
    {years[currentYearIndex] && <>
      <div className="row">
        <div className="col-md-10">
          <h1>Expenses {years[currentYearIndex]}</h1>
        </div>
        <div className="col-md-2 d-none d-lg-block d-xl-block">
          <button type="button" className="btn btn-light" data-toggle="modal" data-target="#createExpenseModal">
            <i className="bi-plus"></i> New Expense
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
              className={`list-group-item list-group-item-action ${SimpleDate.isCurrentYearMonth({year: years[currentYearIndex], month}) && "list-group-item-dark"}`}
              key={currentYearIndex + month}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{INT_TO_MONTHS[month]}</h5>
                <small>
                  {fullExpenses[years[currentYearIndex]][month].map(e => e.value).reduce((acc, curr) => acc + curr, 0)}€
                </small>
              </div>
            </Link>)}
          </div>
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
        </> : <NoExpensesWarning />}
      </>}
    </>}
  </>);
}
