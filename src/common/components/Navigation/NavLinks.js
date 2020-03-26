import React, {useContext} from "react";
import {NavLink} from "react-router-dom";

import {AuthContext} from "../../context/authentication-context";
import Button from "../FormElements/Button";
import "./NavLinks.css";

const NavLinks = props => {
  const auth = useContext(AuthContext);

  const onLogoutHandler = () => auth.logout();

  return (
    <ul className={"nav-links"}>
      <li><NavLink to={"/"} exact>ALL USERS</NavLink></li>
      {auth.isLoggedIn && (
        <li><NavLink to={`/u1/places`}>MY PLACES</NavLink></li>
      )}
      {auth.isLoggedIn && (
        <li><NavLink to={"/places/new"}>ADD PLACE</NavLink></li>
      )}
      {!auth.isLoggedIn ?
        (<li><NavLink to={"/authenticate"}>AUTHENTICATE</NavLink></li>)
        :
        (<li><Button onClick={onLogoutHandler}>LOG OUT</Button></li>)
      }

    </ul>
  );
};

export default NavLinks;
