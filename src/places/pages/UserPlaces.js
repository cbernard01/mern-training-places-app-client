import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import PlaceList from "../components/PlaceList";
import {useHttpClient} from "../../common/hooks/http-hook";
import ErrorModal from "../../common/components/UIElements/ErrorModal";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  const {isLoading, errors, sendRequest, clearErrors} = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState(null);

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.payload.places);
      } catch (errs) {
      }
    };

    fetchPlaces().then();
  }, [userId, sendRequest]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place=> place.id !== deletedPlaceId));
  };

  return (
    <React.Fragment>
      {errors && <ErrorModal errors={errors} onClear={clearErrors}/>}
      {isLoading && <div className={"center"}><LoadingSpinner/></div>}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler}/>}
    </React.Fragment>
  );
};

export default UserPlaces;
