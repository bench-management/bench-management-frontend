import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useEffect
import "./App.css";
import CandidateForm from "./component/candidateForm";
import AdminNavbar from "./component/AdminNavbar";
import CandidateSearch from "./component/CandidateSearch";
import EditCandidateForm from "./component/EditCandidateForm";
import Home from "./component/Home";
import InterviewsDisplayTable from "./component/InterviewsDisplayTable";
import AddInterviewForm from "./component/AddInterviewForm";
import Verification from "./component/Verification";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks login status

  // Check authentication state on app load
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  return (
    <Router>
      <Routes>

        <Route
          path="/login"
          element={<Verification setIsAuthenticated={setIsAuthenticated} />}
        />

        {isAuthenticated && (
          <>
            <Route path="/" element={<><AdminNavbar /><Home /></>} />
            <Route path="/search-candidate" element={<><AdminNavbar /><CandidateSearch /></>} />
            <Route path="/add-candidate" element={<><AdminNavbar /><CandidateForm /></>} />
            <Route path="/edit-candidate/:id" element={<><AdminNavbar /><EditCandidateForm /></>} />
            <Route path="/interview" element={<><AdminNavbar /><InterviewsDisplayTable /></>} />
            <Route path="/add-interview" element={<><AdminNavbar /><AddInterviewForm /></>} />
          </>
        )}


        {!isAuthenticated && <Route path="*" element={<Navigate to={"/login"} />} />}

      </Routes>
    </Router>
  );
}

export default App;
