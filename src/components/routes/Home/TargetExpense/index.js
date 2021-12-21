import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

import NoExpensesWarning from "../../../util/NoExpensesWarning";
import LoadingLine from "../../../util/LoadingLine";
import ErrorList from "../../../util/ErrorList";

export default function TargetExpense({ expenseService }) {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const [years, setYears] = useState([]);
  const [currentYearIndex,] = useState(0);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const loadedExpenses = await expenseService.getAll();
        const loadedYears = Object.keys(loadedExpenses).sort().reverse();

        setYears(loadedYears);
      } catch (error) {
        setErrors([error.message]);
      } finally {
        setLoading(false);
      }
    }
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<>
    {loading ? <LoadingLine>Loading...</LoadingLine> : <>
      {errors.length > 0 ? <ErrorList errors={errors}></ErrorList> : <>
        {(years.length > 0) ? <>
          <Redirect to={{ pathname: `/expenses/${years[currentYearIndex]}` }} />
        </> : <NoExpensesWarning />}
      </>}
    </>}
  </>);
}
