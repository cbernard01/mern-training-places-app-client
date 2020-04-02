import React, {useContext, useState} from "react";

import Input from "../../common/components/FormElements/Input";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../common/util/validators";
import Button from "../../common/components/FormElements/Button";
import Card from "../../common/components/UIElements/Card";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner";
import {INITIAL_LOGIN, useForm} from "../../common/hooks/form-hook";
import {AuthContext} from "../../common/context/authentication-context";
import {useHttpClient} from "../../common/hooks/http-hook";
import ErrorModal from "../../common/components/UIElements/ErrorModal";
import ImageUpload from "../../common/components/FormElements/ImageUpload";
import "./Authentication.css";

const Authentication = () => {
  const auth = useContext(AuthContext);
  const {isLoading, errors, sendRequest, clearErrors} = useHttpClient();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(INITIAL_LOGIN, false);

  const submitHandler = async event => {
    event.preventDefault();
    let responseData;

    try {
      if (isLoginMode) {
        responseData = await sendRequest("http://localhost:5000/api/users/login",
          "POST",
          {"Content-Type": "application/json"},
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        );
      } else {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        formData.append("places", "");

        responseData = await sendRequest("http://localhost:5000/api/users/signup", "POST", {}, formData);

      }

      auth.login(responseData.payload.user.id);
    } catch (errs) {
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: {value: "", isValid: true},
        image: {value: "", isValid: true}
      }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData({
        ...formState.inputs,
        name: {value: "", isValid: false},
        image: {value: "", isValid: false}
        }, false);
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <React.Fragment>
      {errors && <ErrorModal errors={errors} onClear={clearErrors}/>}
      <Card className={"authentication"}>
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <hr/>
        <form onSubmit={submitHandler}>
          {!isLoginMode &&
          <Input
            id={"name"}
            element={"input"}
            type={"text"}
            label={"Your Name"}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={"Please enter a valid name"}
            onInput={inputHandler}
            initialValue={formState.inputs.name.value}
            initialValid={formState.inputs.name.isValid}
          />
          }
          {!isLoginMode &&
          <ImageUpload center id={"image"} onInput={inputHandler}/>
          }
          <Input
            id={"email"}
            element={"input"}
            type={"text"}
            label={"Email"}
            validators={[VALIDATOR_EMAIL()]}
            errorText={"Please enter a valid username"}
            onInput={inputHandler}
            initialValue={formState.inputs.email.value}
            initialValid={formState.inputs.email.isValid}
          />

          <Input
            id={"password"}
            element={"input"}
            type={"password"}
            label={"Password"}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText={"Please enter a valid password (at least six characters long)."}
            onInput={inputHandler}
            initialValue={formState.inputs.password.value}
            initialValid={formState.inputs.password.isValid}
          />
          <Button type={"submit"} disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </Button>
        </form>
        <Button onClick={switchModeHandler}>
          {isLoginMode ? "SIGN UP NOW!" : "LOG IN NOW!"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Authentication;
