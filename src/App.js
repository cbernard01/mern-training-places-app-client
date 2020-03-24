import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./common/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

const App = () => {
  return (
    <Router>
      <MainNavigation/>
      <main>
        <Switch>
          <Route path={"/"} exact component={Users}/>
          <Route path={"/places/new"} exact component={NewPlace}/>
          <Route path={"/places/:placeId"} exact component={UpdatePlace}/>
          <Route path={"/:userId/places"} exact component={UserPlaces}/>
          <Redirect to={"/"}/>
        </Switch>
      </main>
    </Router>
  )
};

export default App;
