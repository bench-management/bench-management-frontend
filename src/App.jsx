import { useState } from 'react';

import './App.css';
import Formm from './component/Formm';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Formm/>
    </>
  );
}

export default App;
