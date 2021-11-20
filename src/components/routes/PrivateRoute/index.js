import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../../../hooks/useAuthState";

export default function PrivateRoute({ children, ...rest }) {
  const auth = useAuthState();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { destination: location }
            }}
          />
        )
      }
    />
  );
}
