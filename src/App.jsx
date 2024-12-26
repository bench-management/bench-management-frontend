import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CandidateForm from './component/CandidateForm';
import AdminNavbar from './component/AdminNavbar';
import CandidateSearchPage from './component/CandidateSearchPage';
import EditCandidateForm from './component/EditCandidateForm';

function App() {
  return (
    <Router>
      <AdminNavbar />
      <Routes>
    <Route path='/' element={<CandidateSearchPage />} />
        <Route path="search-candidate" element={<CandidateSearchPage />} />
        <Route path="add-candidate" element={<CandidateForm />} />
        <Route path="edit-candidate/:id" element={<EditCandidateForm />} />
      </Routes>
    </Router>
  );
}

export default App;

