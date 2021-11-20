import { Environment } from "../../../lib/Environment";

export default function Footer() {
  const VERSION = Environment.getVersion();

  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <p>Running version {VERSION} </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
