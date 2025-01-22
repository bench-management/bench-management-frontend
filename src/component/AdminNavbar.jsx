import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image from '../img/tig85642.png';
import "../css/custom-navbar.css";
import apiClient from "../lib/apiClient"; 

const AdminNavbar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar" data-bs-theme="dark">
      <Container>
        <img src={image} alt="bounteous logo" style={{ height: 40, paddingRight: 25 }} ></img>
        <Navbar.Brand as={Link} to="/">Bench Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Nav.Link as={Link} to="/charts">Report</Nav.Link>  {/* New "Report" Link */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
