import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {PLACES} from "./UserPlaces";
import Input from "../../common/components/FormElements/Input";
import Button from "../../common/components/FormElements/Button";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../common/util/validators";
import {INITIAL_PLACE, useForm} from "../../common/hooks/form-hook";
import "./PlaceForm.css";
import Card from "../../common/components/UIElements/Card";

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  const identifiedPlace = PLACES.find(p => p.id === placeId);

  const [formState, inputHandler, setFormData] = useForm(INITIAL_PLACE, false);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData({
        title: {value: identifiedPlace.title, isValid: true},
        description: {value: identifiedPlace.description, isValid: true}
      }, true);
    }

    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const submitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className={"center"}>
        <Card className={"place-card--not-found"}>
        <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={"center"}>Loading...</div>
    )
  }

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
      <Button type={"submit"} disabled={!formState.isValid}>UPDATE PLACE</Button>
    </form>
  )
};

export default UpdatePlace;
