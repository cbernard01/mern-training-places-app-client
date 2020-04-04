import React, {useCallback, useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./common/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authentication from "./users/pages/Authentication";
import {AuthContext} from "./common/context/authentication-context";

const App = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const login = useCallback((uid, token) => {
    setUserId(uid);
    setToken(token);
  }, []);
  const logout = useCallback(() => {
    setUserId(null);
    setToken(null)
  }, []);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path={"/"} exact component={Users}/>
        <Route path={"/:userId/places"} exact component={UserPlaces}/>
        <Route path={"/places/new"} exact component={NewPlace}/>
        <Route path={"/places/:placeId"} exact component={UpdatePlace}/>
        <Redirect to={"/"}/>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path={"/"} exact component={Users}/>
        <Route path={"/:userId/places"} exact component={UserPlaces}/>
        <Route path={"/authenticate"} exact component={Authentication}/>
        <Redirect to={"/authenticate"}/>
      </Switch>
    );
  }


  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, userId: userId, token: token, login: login, logout: logout}}>
      <Router>
        <MainNavigation/>
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  )
};

export default App;
