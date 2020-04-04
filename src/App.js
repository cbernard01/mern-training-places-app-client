import React, {useCallback, useEffect, useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./common/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authentication from "./users/pages/Authentication";
import {AuthContext} from "./common/context/authentication-context";

let logoutTimer;

const App = () => {
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const [token, setToken] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setUserId(uid);
    setToken(token);
    setTokenExpirationDate(tokenExpirationDate);

    console.log(tokenExpirationDate);

    localStorage.setItem("userData", JSON.stringify({
      userId: uid,
      token: token,
      expiration: tokenExpirationDate
    }));
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setTokenExpirationDate(null);
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = new Date(tokenExpirationDate.toString()).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, storedData.expiration);
    }
  }, [login]);

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
