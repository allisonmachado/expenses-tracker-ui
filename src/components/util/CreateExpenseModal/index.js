import { useHistory } from "react-router-dom";
import { useState } from "react";

import { INT_TO_MONTHS } from "../../../lib/Constants";

export default function CreateExpenseModal() {
  const history = useHistory();
  const currentTime = new Date();

  const [month, setMonth] = useState(currentTime.getMonth() + 1);
  const [year, setYear] = useState(currentTime.getFullYear());

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const yearOptions = [year + 1, ...Array.from({ length: 4 }, (_, i) => year - i)];

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function handleMonthChange(event) {
    setMonth(event.target.value);
  }

  return (
    <div className="modal fade" id="createExpenseModal" tabIndex={-1} aria-labelledby="createExpenseModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createExpenseModalLabel">Please select the period:</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form noValidate>
              <div className="form-group">
                <label htmlFor="yearInput">Year</label>
                <select
                  id="yearInput"
                  value={year}
                  onChange={handleYearChange}
                  className="custom-select">
                  {yearOptions.map((year, index) => <option key={index} value={year}>{year}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="monthInput">Month</label>
                <select
                  id="monthInput"
                  value={month}
                  onChange={handleMonthChange}
                  className="custom-select">
                  {monthOptions.map((month, index) => <option key={index} value={month}>{INT_TO_MONTHS[month]}</option>)}
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => history.push(`/expenses/${year}/${INT_TO_MONTHS[month]}/create`)}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
}
