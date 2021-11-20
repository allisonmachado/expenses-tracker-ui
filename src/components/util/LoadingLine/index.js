export default function LoadingLine({ children }) {
  return (
    <div className="d-flex align-items-center">
      <strong>{children}</strong>
      <div className="spinner-border ml-3" role="status" aria-hidden="true"></div>
    </div>
  );
}
