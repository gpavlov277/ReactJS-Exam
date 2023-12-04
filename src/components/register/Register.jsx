import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// import styles from "./Login.module.css";
import "./Register.css";
import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div className="wrapper fadeInDown mt-4">
      <div id="formContent">
        <Link to={"/login"}>
          <h2 className="inactive underlineHover"> Log In </h2>
        </Link>
        <h2 className="active">Register </h2>

        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="username"
            placeholder="username"
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="password"
          />

          <input
            type="password"
            id="re-pass"
            className="fadeIn third"
            name="re-pass"
            placeholder="repeat password"
          />
          <input type="submit" className="fadeIn fourth" value="Register" />
        </form>
      </div>
    </div>
  );
}
