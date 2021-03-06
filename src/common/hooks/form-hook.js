import {useCallback, useReducer} from "react";

export const INITIAL_PLACE = {
  title: {value: "", isValid: false},
  description: {value: "", isValid: false},
  address: {value: "", isValid: false}
};

export const INITIAL_LOGIN = {
  name: {value: "", isValid: true},
  email: {value: "", isValid: false},
  password: {value: "", isValid: false},
  image: {value: "", isValid: true}
};

const formReducer = (state, action) => {
  switch(action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) formIsValid = formIsValid && action.isValid;
        else formIsValid = formIsValid && state.inputs[inputId].isValid;
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid}
        },
        isValid: formIsValid
      };
      case "SET_DATA":
        return {inputs: action.inputs, isValid: action.isValid};
    default:
      return state;
  }
};

export const useForm = (initialInput, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInput,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({type: "INPUT_CHANGE", value: value, isValid: isValid, inputId: id});
  }, []);

  const setFormData = useCallback(( inputs, isValid) => {
    dispatch({type: "SET_DATA", inputs: inputs, isValid: isValid});
  }, []);

  return [formState, inputHandler, setFormData];
};
