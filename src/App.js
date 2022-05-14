
import React, { useState } from 'react';

import './App.css';
import DECTalk from './Views/DECTalk';
import TropeCatalogue from './Views/TropeCatalogue.js';

function App() {
  //const [tropText, setTropText] = useState("טִפְחָ֖א");

  return (
    <div className="App">
      <DECTalk value="hello" />
      <TropeCatalogue/>
    </div>
  );
}

export default App;
