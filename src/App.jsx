import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CandidateForm from "./component/candidateForm";
import EditCandidateForm from "./component/EditCandidateForm";
import Home from "./component/Home";
import InterviewsDisplayTable from "./component/InterviewsDisplayTable";
import AddInterviewForm from "./component/AddInterviewForm";
import Verification from "./component/Verification";
import AuthenticatedRoute from "./component/AuthenticatedRoute";
import CandidateTable from "./component/CandidateTable";
import Charts from "./component/Chart";

function App() {
  return (
    // <Router basename="/bench-management-frontend">
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Verification />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={<AuthenticatedRoute element={<Home />} />}
        />
        <Route
          path="/search-candidate"
          element={<AuthenticatedRoute element={<CandidateTable />} />}
        />
        <Route
          path="/add-candidate"
          element={<AuthenticatedRoute element={<CandidateForm />} />}
        />
        <Route
          path="/edit-candidate/:id"
          element={<AuthenticatedRoute element={<EditCandidateForm />} />}
        />
        <Route
          path="/interview"
          element={<AuthenticatedRoute element={<InterviewsDisplayTable />} />}
        />
        <Route
          path="/add-interview"
          element={<AuthenticatedRoute element={<AddInterviewForm />} />}
        />
        <Route
          path="/charts"
          element={<AuthenticatedRoute element={<Charts />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
