
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image from '../img/tig85642.png'
import "../css/custom-navbar.css"
import apiClient from "../lib/apiClient"; 
const AdminNavbar = () => {

  const handleDownload = async (event) => {
    event.preventDefault();

    try {
        const response = await apiClient.get("/candidates/export", {
            responseType: "blob", // Ensure the response is treated as a binary file
        });

        // Create a blob from the response data
        const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "candidates.xlsx");

        document.body.appendChild(link);
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error during file download:", error);
    }
};




  return (
    <Navbar expand="lg" className="custom-navbar" data-bs-theme="dark">
      <Container>
        <img src={image} alt="bounteous logo" style={{ height: 40, paddingRight: 25 }} ></img>
        <Navbar.Brand as={Link} to="/">Bench Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Candidate</Nav.Link>

            {/* <Nav.Link as={Link} to="/interview">Interview</Nav.Link> */}

            <Nav.Link as={Link} to="/download" onClick={handleDownload}>Download Candidates</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
