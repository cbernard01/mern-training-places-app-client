import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./common/components/Navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation/>
      <main>
      <Switch>
        <Route path={"/"} exact component={Users}/>
        <Route path={"/places/new"} exact component={NewPlace}/>
        <Redirect to={"/"}/>
      </Switch>
      </main>
    </Router>
  )
};

export default App;
