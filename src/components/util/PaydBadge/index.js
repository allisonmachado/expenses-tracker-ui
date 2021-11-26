export default function PaydBadge({ payd, onClick }) {
  return (payd
    ? <span onClick={onClick} style={{cursor: "pointer"}} className="badge badge-primary">Payd</span>
    : <span onClick={onClick} style={{cursor: "pointer"}} className="badge badge-danger">Unpaid</span>);
}
