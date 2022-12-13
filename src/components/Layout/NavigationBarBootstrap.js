import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Avatar from "@mui/joy/Avatar";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import LogRegisterContext from "../../contexts/log-register-context";

const NavigationBarBootstrap = () => {
  const logRegisterContext = useContext(LogRegisterContext);

  const logoutHandler = () => {
    logRegisterContext.logout();
  };
  return (
    <header>
      <Navbar bg="light" expand="lg" className="navigation-bar-bootstrap">
        <Container fluid style={{ margin: "0 10rem" }}>
          <Navbar.Brand as={NavLink} to="/">
            Trip Planner
          </Navbar.Brand>
          <Nav className="d-flex justify-content-end">
            {!logRegisterContext.token && (
              <Nav.Link style={{ margin: "0 0.5rem" }} as={NavLink} to="/auth">
                Login
              </Nav.Link>
            )}
            {logRegisterContext.token && (
              <Nav.Link style={{ margin: "0 0.5rem" }} as={NavLink} to="/trips">
                All trips
              </Nav.Link>
            )}
            {logRegisterContext.token && (
              <Nav.Link
                style={{ margin: "0 0.5rem" }}
                as={NavLink}
                to="/my-trips"
              >
                My trips
              </Nav.Link>
            )}
            {logRegisterContext.token && (
              <Nav.Link
                style={{ margin: "0 0.5rem" }}
                as={NavLink}
                to="/new-trip"
              >
                Create trip
              </Nav.Link>
            )}
            {logRegisterContext.token && (
              <Avatar style={{ marginLeft: "0.5rem" }}></Avatar>
            )}
            {logRegisterContext.token && (
              <NavDropdown>
                <NavDropdown.Item as={NavLink} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/help">
                  Help
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Button} onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavigationBarBootstrap;
