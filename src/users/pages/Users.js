import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [{
    id: "u1",
    name: "Clifford Bernard",
    image: "https://ak6.picdn.net/shutterstock/videos/9925526/thumb/1.jpg",
    places: 4
  },{
    id: "u2",
    name: "Megan Bernard",
    image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    places: 2
  }];

  return (
    <UsersList items={USERS}/>
  );
};

export default Users;
