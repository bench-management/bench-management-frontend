import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CandidateForm from './component/CandidateForm';
import AdminNavbar from './component/AdminNavbar';
import CandidateSearchPage from './component/CandidateSearchPage';

function App() {
  return (
    <Router>
      <AdminNavbar />
      <Routes>
        <Route path='/' element={<CandidateSearchPage />} />
        <Route path="add-candidate" element={<CandidateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
