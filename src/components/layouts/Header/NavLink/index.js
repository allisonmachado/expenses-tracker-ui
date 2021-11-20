import React from "react";

import { Link, useRouteMatch } from "react-router-dom";

export default function NavLink({ to, children }) {

  const match = useRouteMatch({ path: to, exact: false });

  return (
    <li className={match ? "nav-item active" : "nav-item"}>
      <Link className="nav-link" to={to}>
        {children} {match ? <span className="sr-only">(current)</span> : null}
      </Link>
    </li>
  );
}
