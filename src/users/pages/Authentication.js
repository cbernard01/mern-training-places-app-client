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
import {INITIAL_LOGIN, useForm} from "../../common/hooks/form-hook";
import {AuthContext} from "../../common/context/authentication-context";
import "./Authentication.css";

const Authentication = () => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(INITIAL_LOGIN, false);

  const submitHandler = event => {
    event.preventDefault();
    console.log(formState);
    auth.login();
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({...formState.inputs, name: {value: "", isValid: true}}, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData({...formState.inputs, name: {value: "", isValid: false}}, false);
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <Card className={"authentication"}>
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
  );
};

export default Authentication;
