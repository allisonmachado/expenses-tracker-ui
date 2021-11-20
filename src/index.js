import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import ProvideAuth from "./components/util/ProvideAuth";

import AuthFetch from "./data/http/AuthFetch";
import AuthService from "./services/AuthService";
import AuthRepository from "./data/storage/AuthRepository";

import { Environment } from "./lib/Environment";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "jquery/dist/jquery.slim";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.css";
import ExpenseFetch from "./data/http/ExpenseFetch";
import ExpenseService from "./services/ExpenseService";

const BACKEND_API = Environment.getBackendApi();

const authFetch = new AuthFetch(BACKEND_API);
const expenseFetch = new ExpenseFetch(BACKEND_API);

const authRepository = new AuthRepository();

const container = {
  authService: new AuthService(authFetch, authRepository),
  expenseService: new ExpenseService(expenseFetch, authRepository),
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProvideAuth authService={container.authService}>
        <App container={container} />
      </ProvideAuth>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
