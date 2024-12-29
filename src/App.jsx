import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CandidateForm from './component/CandidateForm';
import AdminNavbar from './component/AdminNavbar';
import CandidateSearch from './component/CandidateSearch';
import EditCandidateForm from './component/EditCandidateForm';
import Home from './component/Home';

function App() {
  return (
    <Router>
      <AdminNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="search-candidate" element={<CandidateSearch />} />
        <Route path="add-candidate" element={<CandidateForm />} />
        <Route path="edit-candidate/:id" element={<EditCandidateForm />} />
      </Routes>
    </Router>
  );
}

export default App;

