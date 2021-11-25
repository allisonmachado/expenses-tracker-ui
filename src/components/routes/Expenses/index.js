import { Switch, useRouteMatch } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";

import CreateExpense from "./CreateExpense";
import UpdateExpense from "./UpdateExpense";
import ListExpenses from "./ListExpenses";
import ListMonths from "./ListMonths";

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
      <PrivateRoute path={`${path}/:year/`}>
        <ListMonths expenseService={expenseService} />
      </PrivateRoute>
    </Switch>
  );
}
