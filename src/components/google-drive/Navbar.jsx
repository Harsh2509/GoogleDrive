import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="d-flex justify-content-between px-3"
      >
        <Navbar.Brand as={Link} to="/">
          Codedamn Drive
        </Navbar.Brand>
        <Nav.Link as={Link} to="/user">
          Profile
        </Nav.Link>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
