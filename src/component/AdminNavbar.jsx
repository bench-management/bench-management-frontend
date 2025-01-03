import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/AdminNavbar.scss';
import logo from '../img/benchIcon.gif'
const AdminNavbar = () => {
  return (
    <Navbar  expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <img src={logo} alt='logo' style={{height:'45px', marginRight:'15px'}} />
        <Navbar.Brand href="/">Bench Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Candidate</Nav.Link>
            <Nav.Link href="/interview">Interview</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
