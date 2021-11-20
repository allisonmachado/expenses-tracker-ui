export default function ErrorList({ errors }) {
  return (
    <div className="text-danger">
      <ul>{errors.map((err, index) => <li key={index}>{err}</li>)}</ul>
    </div>
  );
}
