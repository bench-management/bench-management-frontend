import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
  import '../styles/AdminNavbar.scss';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <Navbar expand="lg"  bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Bench Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Candidate" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/add-candidate">Add Candidate</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/delete-candidate">Delete Candidate</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as= {Link} to="/search-candidate">Search Candidate</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;