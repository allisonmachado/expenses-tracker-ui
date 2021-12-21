import CreateExpenseModal from "./components/util/CreateExpenseModal";
import Expenses from "./components/routes/Expenses";
import NotFound from "./components/routes/NotFound";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Login from "./components/routes/Login";
import Home from "./components/routes/Home";

import { Switch, Route } from "react-router-dom";

export default function App({ container }) {
  return (<>
    <Header {...container} />
    <main role="main" className="flex-shrink-0">
      <div className="container py-5 my-5">
        <Switch>
          <Route exact path="/">
            <Home {...container} />
          </Route>
          <Route path="/login">
            <Login {...container} />
          </Route>
          <Route path="/expenses">
            <Expenses {...container} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <CreateExpenseModal />
      </div>
    </main>
    <Footer />
  </>);
}
