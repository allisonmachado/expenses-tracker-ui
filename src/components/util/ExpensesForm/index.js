import ErrorList from "../ErrorList";

export default function ExpensesForm({
  handleFormChange,
  handleSubmit,
  informError,
  disabled,
  expense,
  saved,
  error,
}) {
  return (<form onSubmit={handleSubmit} noValidate>

    <div className="form-group">
      <label htmlFor="titleInput">Title<strong className="text-danger">*</strong></label>
      <input
        id="titleInput"
        className="form-control"
        type="text"
        name="title"
        value={expense.title}
        disabled={disabled}
        onChange={handleFormChange} />
    </div>

    <div className="form-group">
      <label htmlFor="valueInput">Value</label>
      <input
        id="valueInput"
        className="form-control"
        type="number"
        name="value"
        value={expense.value}
        disabled={disabled}
        onChange={handleFormChange} />
    </div>

    <div className="form-group">
      <label htmlFor="notesInput">Notes</label>
      <textarea
        id="notesInput"
        className="form-control"
        rows="3"
        name="notes"
        value={expense.notes}
        disabled={disabled}
        onChange={handleFormChange}>
      </textarea>

      <div className="form-check">
        <input
          id="paydInput"
          className="form-check-input"
          type="checkbox"
          name="payd"
          checked={expense.payd}
          disabled={disabled}
          onChange={handleFormChange} />
        <label htmlFor="paydInput">Payd</label>
      </div>
    </div>

    {informError && <ErrorList errors={[error]}></ErrorList>}
    {saved || <button type="submit" className="btn btn-light" disabled={disabled}>
      <i className="bi bi-save"></i> Save
    </button>}
  </form>);
}
