import "./Register.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import Loader from "../loader/Loader";
export default function Register() {
  const RegisterFormKeys = {
    Email: "email",
    Username: "username",
    Password: "password",
    RePass: "repeatPassword",
  };

  const { registerSubmitHandler, authError, setErr, isLoading } = useContext(AuthContext);
  const { values, onChange, onSubmit, formValidate } = useForm(registerSubmitHandler, {
    [RegisterFormKeys.Email]: "",
    [RegisterFormKeys.Username]: "",
    [RegisterFormKeys.Password]: "",
    [RegisterFormKeys.RePass]: "",
  });

  useEffect(() => {
    setErr({});
  }, []);

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
          {formValidate["username"] && <p className="form-error">{formValidate.username}</p>}

          <input
            type="email"
            id="login"
            className="fadeIn second"
            name={RegisterFormKeys.Email}
            placeholder={RegisterFormKeys.Email}
            value={values[RegisterFormKeys.Email]}
            onChange={onChange}
          />
          {formValidate["email"] && <p className="form-error">{formValidate.email}</p>}
          <input
            type="password"
            id="password"
            className="fadeIn second"
            name={RegisterFormKeys.Password}
            placeholder={RegisterFormKeys.Password}
            value={values[RegisterFormKeys.Password]}
            onChange={onChange}
          />
          {formValidate["password"] && <p className="form-error">{formValidate.password}</p>}

          <input
            type="password"
            id="re-pass"
            className="fadeIn second"
            name={RegisterFormKeys.RePass}
            placeholder="repeat password"
            value={values[RegisterFormKeys.RePass]}
            onChange={onChange}
          />
          {formValidate["repeatPassword"] && (
            <p className="form-error">{formValidate.repeatPassword}</p>
          )}

          <div>
            <p className="form-error">{authError}</p>
            {isLoading && <Loader />}
          </div>
          <input type="submit" className="fadeIn second" value="Register" />
        </form>
      </div>
    </div>
  );
}
