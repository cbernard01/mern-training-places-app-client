import React, {useEffect, useState} from "react";

import UsersList from "../components/UsersList";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner";
import ErrorModal from "../../common/components/UIElements/ErrorModal";
import {useHttpClient} from "../../common/hooks/http-hook";

const Users = () => {
  const {isLoading, errors, sendRequest, clearErrors} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
        setLoadedUsers(responseData.payload.users);
      } catch (errs) {
      }
    };
    fetchUsers().then();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {errors && <ErrorModal errors={errors} onClear={clearErrors}/>}
      {isLoading && <div className={"center"}><LoadingSpinner/></div>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers}/>}
    </React.Fragment>
  );
};

export default Users;
