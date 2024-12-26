// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import CandidateForm from './component/CandidateForm';
// import AdminNavbar from './component/AdminNavbar';
// import CandidateSearchPage from './component/CandidateSearchPage';
// import EditCandidateForm from './component/EditCandidateForm'




// function App() {

//   return (
//     <Router>
//       <AdminNavbar />
//       <Routes>
//         {/* <Route path='/' element={}> */}
//           {/* <Route index element={<h1>Home Page</h1>} /> */}
//           <Route path="search-candidate" element={<CandidateSearchPage />}/>
//           {/* <Route path="search-candidate" element={<CandidateSearchPage />} /> */}
//           <Route path="add-candidate" element={<CandidateForm />} />
//           {/* <Route path = "edit-candidate" element={<EditCandidateForm/>}/> */}
//           <Route path="edit-candidate" element={<EditCandidateForm id="1" />} />

//         {/* </Route> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


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
      <CandidateSearchPage/>
      <Routes>
        <Route path="search-candidate" element={<CandidateSearchPage />} />
        <Route path="add-candidate" element={<CandidateForm />} />
        {/* Pass dynamic candidate ID via URL */}
        <Route path="edit-candidate/:id" element={<EditCandidateForm />} />
      </Routes>
    </Router>
  );
}

export default App;

