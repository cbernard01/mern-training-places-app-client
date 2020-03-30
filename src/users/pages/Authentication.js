import React, {useContext, useState} from "react";

import Input from "../../common/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../common/util/validators";
import Button from "../../common/components/FormElements/Button";
import Card from "../../common/components/UIElements/Card";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner";
import {INITIAL_LOGIN, useForm} from "../../common/hooks/form-hook";
import {AuthContext} from "../../common/context/authentication-context";
import {useHttpClient} from "../../common/hooks/http-hook";
import ErrorModal from "../../common/components/UIElements/ErrorModal";
import "./Authentication.css";

const Authentication = () => {
  const auth = useContext(AuthContext);
  const {isLoading, errors, sendRequest, clearErrors} = useHttpClient();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(INITIAL_LOGIN, false);

  const submitHandler = async event => {
    event.preventDefault();

    try {
      if (isLoginMode) {
        await sendRequest("http://localhost:5000/api/users/login",
          "POST",
          {"Content-Type": "application/json"},
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }));
      } else {
        await sendRequest("http://localhost:5000/api/users/signup", "POST",
          {"Content-Type": "application/json"},
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            image: "tester",
            places: []
          }));
      }

      auth.login();
    } catch (errs) {
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: {value: "", isValid: true}
      }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData({...formState.inputs, name: {value: "", isValid: false}}, false);
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
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(15)]}
            errorText={"Please enter a valid password (between five and fifteen characters long)."}
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
