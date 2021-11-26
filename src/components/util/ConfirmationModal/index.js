export default function ConfirmationModal({ id, title, action, actionHandler }) {
  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={`${id}Label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {action}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={actionHandler}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
