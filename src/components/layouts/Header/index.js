import NavLink from "./NavLink";

import { useAuthState } from "../../../hooks/useAuthState";

export default function Header({ authService }) {
  const auth = useAuthState();

  function logoutUser() {
    authService.quitUser();
    auth.signOut();
  }

  const logoutButton = <span className="nav-link" role="button" onClick={logoutUser}>Logout</span>;

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="/">Cash Tracker</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <NavLink to="/#">Expenses</NavLink>
            {auth.user ? logoutButton : <NavLink to="/login">Login</NavLink>}
          </ul>
        </div>
      </nav>
    </header>
  );
}
