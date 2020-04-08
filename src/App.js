import React, {Suspense} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import Users from "./users/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./common/components/Navigation/MainNavigation";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Authentication from "./users/pages/Authentication";
import {AuthContext} from "./common/context/authentication-context";
import {useAuthentication} from "./common/hooks/authentication-hook";
import LoadingSpinner from "./common/components/UIElements/LoadingSpinner";

const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Authentication = React.lazy(() => import("./users/pages/Authentication"));

const App = () => {
  const {token, login, logout, userId} = useAuthentication();

  const loading = () => {
    return (
      <div className={"center"}>
        <LoadingSpinner/>
      </div>
    )
  }

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
          <Suspense fallback={loading()}>{routes}</Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  )
};

export default App;
