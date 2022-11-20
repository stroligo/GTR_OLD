import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  return (
    <Navbar as="section" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>GTR - Gestão do Trabalho Remoto</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="justify-content-end" id="navbarScroll">
          <Nav>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="project">
              <Nav.Link>Project</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/modelo">
              <Nav.Link>Modelo da semana</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
