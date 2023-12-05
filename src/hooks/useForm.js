import { useState } from "react";

export default function useForm(submitHandler, initialValues) {
  const [values, setValues] = useState(initialValues);
  const [formValidate, setFormValidate] = useState({
    email: false,
    username: false,
    password: false,
    repeatPassword: false,
  });
  const onChange = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));

    switch (e.target.name) {
      case "email":
        if (e.target.value.length < 3) {
          setFormValidate((state) => ({ ...state, [e.target.name]: "Invalid Email address!" }));
        } else {
          setFormValidate((state) => ({ ...state, [e.target.name]: false }));
        }
        break;
      case "username":
        if (e.target.value.length < 5) {
          setFormValidate((state) => ({
            ...state,
            [e.target.name]: "Username should be at least 5 charactersword",
          }));
        } else {
          setFormValidate((state) => ({ ...state, [e.target.name]: false }));
        }

        break;
      case "password":
        if (e.target.value.length < 5) {
          setFormValidate((state) => ({
            ...state,
            [e.target.name]: "Password should be at least 5 charactersword",
          }));
        } else {
          setFormValidate((state) => ({ ...state, [e.target.name]: false }));
          if (values["repeatPassword"] === e.target.value) {
            setFormValidate((state) => ({ ...state, [e.target.name]: false }));
            setFormValidate((state) => ({ ...state, repeatPassword: false }));
          } else {
            setFormValidate((state) => ({ ...state, [e.target.name]: "Password do not match!" }));
          }
        }
        break;
      case "repeatPassword":
        if (values["password"] === e.target.value) {
          setFormValidate((state) => ({ ...state, [e.target.name]: false }));
          setFormValidate((state) => ({ ...state, password: false }));
        } else {
          setFormValidate((state) => ({ ...state, [e.target.name]: "Password do not match!" }));
        }

        break;
      default:
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler(values);
  };
  return { values, onChange, onSubmit, formValidate };
}
