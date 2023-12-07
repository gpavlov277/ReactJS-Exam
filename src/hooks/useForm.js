import { useContext, useState } from "react";
import AuthContext from "../contexts/authContext";
import ItemContext from "../contexts/itemContext";

export default function useForm(submitHandler, initialValues) {
  const [values, setValues] = useState(initialValues);

  const [formValidate, setFormValidate] = useState({
    email: false,
    username: false,
    password: false,
    repeatPassword: false,
    heading: false,
    about: false,
    image: false,
  });

  // const { setCreateError } = useContext(ItemContext);
  const { setErr } = useContext(AuthContext);

  function onTouch(e) {
    onChange(e);
  }
  const onChange = (e) => {
    setErr({});
    // setCreateError({});
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
            [e.target.name]: "Username should be at least 5 characters",
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
        if (values["password"] === e.target.value && e.target.value.length >= 5) {
          setFormValidate((state) => ({ ...state, [e.target.name]: false }));
          setFormValidate((state) => ({ ...state, password: false }));
        } else {
          if (e.target.value.length >= 5 && e.target.value === values["password"]) {
            setFormValidate((state) => ({ ...state, [e.target.name]: false }));
          } else {
            setFormValidate((state) => ({ ...state, [e.target.name]: "Password do not match!" }));
          }
        }
      case "heading":
        if (e.target.value.length <= 0) {
          setFormValidate((state) => ({ ...state, [e.target.name]: "This field is required" }));
        } else {
          setFormValidate((state) => ({ ...state, [e.target.name]: false }));
        }
      case "about":
        if (e.target.value.length <= 0) {
          setFormValidate((state) => ({ ...state, [e.target.name]: "This field is required" }));
        } else {
          setFormValidate((state) => ({ ...state, [e.target.name]: false }));
        }
      case "image":
        if (e.target.value.length <= 0) {
          setFormValidate((state) => ({ ...state, [e.target.name]: "This field is required" }));
        } else {
          setFormValidate((state) => ({ ...state, [e.target.name]: false }));
        }

        break;
      default:
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler(values);
  };
  return { values, onChange, onSubmit, formValidate, onTouch };
}
