import React, {useContext} from "react";
import {useHistory} from "react-router-dom";

import Input from "../../common/components/FormElements/Input";
import Button from "../../common/components/FormElements/Button";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../common/util/validators";
import {INITIAL_PLACE, useForm} from "../../common/hooks/form-hook";
import {useHttpClient} from "../../common/hooks/http-hook";
import ErrorModal from "../../common/components/UIElements/ErrorModal";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner";
import {AuthContext} from "../../common/context/authentication-context";
import ImageUpload from "../../common/components/FormElements/ImageUpload";
import "./PlaceForm.css";


const NewPlace = props => {
  const {isLoading, errors, sendRequest, clearErrors} = useHttpClient();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(INITIAL_PLACE, false);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("creator", auth.userId);

      await sendRequest("http://localhost:5000/api/places", "POST", {}, formData);
      history.push("/");
    } catch (errs) {
    }
  };

  return (
    <React.Fragment>
      {errors && <ErrorModal errors={errors} onClear={clearErrors}/>}
      {isLoading && <div className={"center"}><LoadingSpinner asOverlay/></div>}
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

        <ImageUpload center id={"image"} onInput={inputHandler} errorText={"Please provide an image."}/>

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
    </React.Fragment>
  )
};

export default NewPlace;
