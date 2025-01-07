import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CandidateForm from './component/candidateForm';
import AdminNavbar from './component/AdminNavbar';
import CandidateSearch from './component/CandidateSearch';
import EditCandidateForm from './component/EditCandidateForm';
import Home from './component/Home';
import InterviewsDisplayTable from './component/InterviewsDisplayTable';
import AddInterviewForm from './component/AddInterviewForm';
import EditInterviewForm from './component/EditInterviewForm';
import CandidateTable from './component/CandidateTable';


function App() {
  return (
    <Router>
      <AdminNavbar />
      <Routes>
        {/* <Route path="search-candidate" element={<CandidateSearch />} />
        <Route path="add-candidate" element={<CandidateForm />} />
        <Route path="edit-candidate/:id" element={<EditCandidateForm />} />
        <Route path="interview" element={<InterviewsDisplayTable />} />
        <Route path="add-interview" element={<AddInterviewForm />} />
        <Route path="edit-interview/:id" element={<EditInterviewForm />} />
        <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<CandidateTable />} />

      </Routes>
    </Router>
  );
}

export default App;
