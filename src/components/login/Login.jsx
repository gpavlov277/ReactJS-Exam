import { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import Loader from "../loader/Loader";

const LoginFormKeys = {
  Email: "email",
  Password: "password",
};

export default function Login() {
  const { loginSubmitHandler, authError, setErr, isLoading } = useContext(AuthContext);
  const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
    [LoginFormKeys.Email]: "",
    [LoginFormKeys.Password]: "",
  });

  useEffect(() => {
    setErr({});
  }, []);

  return (
    <div className="wrapper fadeInDown mt-4">
      <div id="formContent">
        <h2 className="active"> Log In </h2>

        <Link to={"/register"}>
          <h2 className="inactive underlineHover">Register </h2>
        </Link>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="login"
            className="fadeIn first"
            name={LoginFormKeys.Email}
            placeholder="email"
            value={values[LoginFormKeys.Email]}
            onChange={onChange}
          />

          <input
            type="password"
            id="password"
            className="fadeIn first"
            name={LoginFormKeys.Password}
            placeholder="password"
            value={values[LoginFormKeys.Password]}
            onChange={onChange}
          />
          <div>
            <p className="form-error">{authError}</p>
            {isLoading && <Loader />}
          </div>
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
      </div>
    </div>
  );
}
