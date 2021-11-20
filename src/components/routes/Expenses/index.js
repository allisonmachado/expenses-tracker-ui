import { Switch, useRouteMatch } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";
import CreateExpense from "./CreateExpense";
import ListExpenses from "./ListExpenses";
import UpdateExpense from "./UpdateExpense";

export default function Expenses({ expenseService }) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <PrivateRoute path={`${path}/:year/:month/update/:id`}>
        <UpdateExpense expenseService={expenseService} />
      </PrivateRoute>
      <PrivateRoute path={`${path}/:year/:month/create`}>
        <CreateExpense expenseService={expenseService} />
      </PrivateRoute>
      <PrivateRoute path={`${path}/:year/:month`}>
        <ListExpenses expenseService={expenseService} />
      </PrivateRoute>
    </Switch>
  );
}
