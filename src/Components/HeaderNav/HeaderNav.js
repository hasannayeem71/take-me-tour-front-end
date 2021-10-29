import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./HeaderNav.css";
const HeaderNav = () => {
  const { user, logOut } = useAuth();
  useEffect(() => {
    //change the  title of the site
    document.title = "Login";
  }, []);
  return (
    <div className="mb-5 pb-4 container-fluid">
      <Navbar bg="white" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              className=" nav-image "
              src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png"
              alt=""
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll>
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>

              {user && (
                <Nav.Link as={Link} to="/my-package">
                  My Package
                </Nav.Link>
              )}

              <Nav.Link as={Link} to="/manage-package">
                Manage All
              </Nav.Link>

              <Nav.Link as={Link} to="/add-package">
                Add Package
              </Nav.Link>

              {user && (
                <Nav.Link as={Link} to="/delete-package">
                  Delete Package
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>
            {user ? (
              <div>
                <button onClick={logOut} className="login-logout">
                  LOGOUT <i className="fas fa-sign-in-alt"></i>
                </button>
                <span>{user.displayName}</span>
              </div>
            ) : (
              <div>
                <Link to="/login" className="login-logout me-5 ">
                  <i className="fas fa-sign-in-alt"></i> LOGIN
                </Link>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderNav;
