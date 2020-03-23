import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [{
    id: "u1",
    name: "Clifford Bernard",
    image: "https://ak6.picdn.net/shutterstock/videos/9925526/thumb/1.jpg",
    places: 4
  }];

  return (
    <UsersList items={USERS}/>
  );
};

export default Users;
