import { useState } from "react";

import { INT_TO_MONTHS } from "../../../lib/Constants";

import SimpleDate from "../../../lib/SimpleDate";

export default function CloneExpenseModal({ actionHandler }) {
  const { year: currentYear } = SimpleDate.getCurrentYearMonth();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const yearOptions = [currentYear + 1, ...Array.from({ length: 4 }, (_, i) => currentYear - i)];

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function handleMonthChange(event) {
    setMonth(event.target.value);
  }

  function isButtonDisabled() {
    return month === "" || year === "";
  }

  return (
    <div className="modal fade" id="cloneExpenseModal" tabIndex={-1} aria-labelledby="cloneExpenseModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="cloneExpenseModalLabel">Please select the target period</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>The expenses from this month will be copied to the target period.</p>
            <form noValidate>
              <div className="form-group">
                <label htmlFor="yearInput">Year</label>
                <select
                  id="yearInput"
                  value={year}
                  onChange={handleYearChange}
                  className="custom-select">
                  <option value="">Select a year</option>
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
                  <option value="">Select a month</option>
                  {monthOptions.map((month, index) => <option key={index} value={month}>{INT_TO_MONTHS[month]}</option>)}
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-dismiss="modal"
              disabled={isButtonDisabled()}
              onClick={() => actionHandler({ year, month })}>
                <i className="bi bi-check"></i> 
                Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
