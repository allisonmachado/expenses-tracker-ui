import { Switch, useRouteMatch } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";
import TargetExpense from "./TargetExpense";

export default function Expenses({ expenseService }) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <PrivateRoute path={`${path}`}>
        <TargetExpense expenseService={expenseService} />
      </PrivateRoute>
    </Switch>
  );
}
