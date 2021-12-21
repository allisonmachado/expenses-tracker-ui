export default function NoExpensesWarning({ children }) {
  return (<>
    <div className="row">
      <div className="col-md-10">
        <h3>You have no expenses registered</h3>
      </div>
      <div className="col-md-2 d-none d-lg-block d-xl-block">
        <button type="button" className="btn btn-light" data-toggle="modal" data-target="#createExpenseModal">
          <i className="bi-plus"></i> New Expense
        </button>
      </div>
    </div>
    <hr></hr>
  </>);
}
