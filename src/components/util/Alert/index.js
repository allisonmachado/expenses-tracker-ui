export default function Alert({ type, message }) {
  const completeClass = "alert alert-" + type;
  return (
    <div className={completeClass} role="alert">{message}</div>
  );
}
