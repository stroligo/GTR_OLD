import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
  return (
    <Navbar as="section" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>GTR</Navbar.Brand>
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
            <LinkContainer to="/tasks">
              <Nav.Link>Tasks</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/taskuser/4062127">
              <Nav.Link>Ver minhas tarefas</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
