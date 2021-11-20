export default function PaydBadge({ payd }) {
  return (payd
    ? <span className="badge badge-primary">Payd</span>
    : <span className="badge badge-danger">Unpayd</span>);
}
