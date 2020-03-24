import React, {useCallback} from "react";

import Input from "../../common/components/FormElements/Input";
import Button from "../../common/components/FormElements/Button";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../common/util/validators";
import {INITIAL_PLACE, useForm} from "../../common/hooks/form-hook";
import "./PlaceForm.css";



const NewPlace = props => {
  const [formState, inputHandler] = useForm(INITIAL_PLACE, false);

  const submitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

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
      />
      <Input
        id={"description"}
        element={"textarea"}
        label={"Description"}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText={"Please enter a valid description (at least 5 characters)."}
        onInput={inputHandler}
      />
      <Input
        id={"address"}
        element={"input"}
        type={"text"}
        label={"Address"}
        validators={[VALIDATOR_REQUIRE()]}
        errorText={"Please enter a valid address"}
        onInput={inputHandler}
      />

      <Button typ={"submit"} disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  )
};

export default NewPlace;
