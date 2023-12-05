import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// import styles from "./Login.module.css";
import "./Register.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
export default function Register() {
  const RegisterFormKeys = {
    Email: "email",
    Username: "username",
    Password: "password",
    RePass: "repeatPassword",
  };

  const { registerSubmitHandler, authError } = useContext(AuthContext);
  const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
    [RegisterFormKeys.Email]: "",
    [RegisterFormKeys.Username]: "",
    [RegisterFormKeys.Password]: "",
    [RegisterFormKeys.RePass]: "",
  });
  return (
    <div className="wrapper fadeInDown mt-4">
      <div id="formContent">
        <Link to={"/login"}>
          <h2 className="inactive underlineHover"> Log In </h2>
        </Link>
        <h2 className="active">Register </h2>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="username"
            className="fadeIn second"
            name={RegisterFormKeys.Username}
            placeholder={RegisterFormKeys.Username}
            value={values[RegisterFormKeys.Username]}
            onChange={onChange}
          />
          <input
            type="email"
            id="login"
            className="fadeIn second"
            name={RegisterFormKeys.Email}
            placeholder={RegisterFormKeys.Email}
            value={values[RegisterFormKeys.Email]}
            onChange={onChange}
          />
          <input
            type="password"
            id="password"
            className="fadeIn second"
            name={RegisterFormKeys.Password}
            placeholder={RegisterFormKeys.Password}
            value={values[RegisterFormKeys.Password]}
            onChange={onChange}
          />

          <input
            type="password"
            id="re-pass"
            className="fadeIn second"
            name={RegisterFormKeys.RePass}
            placeholder="repeat password"
            value={values[RegisterFormKeys.RePass]}
            onChange={onChange}
          />
          <p className="form-error">{authError}</p>

          <input type="submit" className="fadeIn second" value="Register" />
        </form>
      </div>
    </div>
  );
}
