export default function ConfirmationModal({ title, action, name, item, deleteHandler }) {
  return (
    <div className="modal fade" id="confirmationModal" tabIndex={-1} aria-labelledby="confirmationModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="confirmationModalLabel">{title}</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          {action}: <span className="font-weight-bold">{name}</span>?
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => deleteHandler(item)}>Yes</button>
        </div>
      </div>
    </div>
  </div>
  );
}
