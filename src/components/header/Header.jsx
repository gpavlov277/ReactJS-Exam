import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function Header() {
  const { isAuth, username, logoutHandler } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>

            {!isAuth && (
              <>
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to={"/register"}>
                  Register
                </Nav.Link>
              </>
            )}

            {isAuth && (
              <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={"/profile-settings"}>
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/profile-settings"}>
                  Information
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
