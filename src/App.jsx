import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CandidateForm from './component/CandidateForm';
import AdminNavbar from './component/AdminNavbar';
import CandidateSearchPage from './component/CandidateSearchPage';




function App() {

  return (
    <Router>
      <AdminNavbar />
      <CandidateSearchPage/>
      <Routes>
        {/* <Route path='/' element={}> */}
          {/* <Route index element={<h1>Home Page</h1>} /> */}
          <Route path="search-candidate" element={<CandidateSearchPage />} />
          <Route path="add-candidate" element={<CandidateForm />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
