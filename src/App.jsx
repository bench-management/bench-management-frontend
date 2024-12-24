import { useState } from 'react';

import './App.css';
import CandidateForm from './component/candidateForm';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CandidateForm/>
    </>
  );
}

export default App;
