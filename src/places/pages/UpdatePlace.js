import React, {useEffect, useState, useContext} from "react";
import {useHistory} from "react-router-dom";

import {useParams} from "react-router-dom";
import Input from "../../common/components/FormElements/Input";
import Button from "../../common/components/FormElements/Button";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../common/util/validators";
import {INITIAL_PLACE, useForm} from "../../common/hooks/form-hook";
import Card from "../../common/components/UIElements/Card";
import {useHttpClient} from "../../common/hooks/http-hook";
import ErrorModal from "../../common/components/UIElements/ErrorModal";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner";
import {AuthContext} from "../../common/context/authentication-context";
import "./PlaceForm.css";

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const {isLoading, errors, sendRequest, clearErrors} = useHttpClient();
  const [identifiedPlace, setIdentifiedPlace] = useState(null);
  const [formState, inputHandler, setFormData] = useForm(INITIAL_PLACE, false);

  const placeId = useParams().placeId;

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
        setFormData({
          title: {value: responseData.payload.place.title, isValid: true},
          description: {value: responseData.payload.place.description, isValid: true},
          address: {value: responseData.payload.place.address, isValid: true}
        }, true);

        setIdentifiedPlace(responseData.payload.place);
      } catch (errs) {
      }
    };

    fetchPlace().then();
  }, [placeId, sendRequest, setFormData]);

  const submitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(`http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        {"Content-Type": "application/json"},
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value
        }));
      history.push(`/${auth.userId}/places`);
    } catch (errs) {
      console.log(errs)
    }
  };

  const renderNoForm = () => {
    return (
      <div className={"center"}>
        <Card className={"place-card--not-found"}>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  };

  const renderForm = () => {
      return (
        <form className={"place-form"} onSubmit={submitHandler}>
          <Input
            id={"title"}
            element={"input"}
            type={"text"}
            label={"Title"}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={"Please enter a valid title."}
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
          />

          <Input
            id={"description"}
            element={"textarea"}
            label={"Description"}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText={"Please enter a valid description (min. 5 characters)."}
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
          />

          <Input
            id={"address"}
            element={"input"}
            type={"text"}
            label={"Address"}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={"Please enter a valid address."}
            onInput={inputHandler}
            initialValue={formState.inputs.address.value}
            initialValid={formState.inputs.address.isValid}
          />
          <Button type={"submit"} disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
      );
  };

  return (
    <React.Fragment>
      {errors && <ErrorModal errors={errors} onClear={clearErrors}/>}
      {isLoading && <div className={"center"}><LoadingSpinner/></div>}
      {!isLoading && !identifiedPlace && !errors && renderNoForm()}
      {!isLoading && identifiedPlace && !errors && renderForm()}

    </React.Fragment>
  );
};

export default UpdatePlace;
