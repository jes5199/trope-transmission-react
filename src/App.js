
import React, { useState, useRef } from 'react';

import './App.css';
import DECTalk from './Views/DECTalk';
import TropeCatalogue from './Views/TropeCatalogue.js';
import VoicedWord from './Views/VoicedWord';

function App() {
  //const [tropText, setTropText] = useState("טִפְחָ֖א");
  const [selectedWord, setSelectedWord] = useState(null);

  const audioRef = useRef();

  const decTalkTexts = [
    "hello",
    "test"
  ];

  const decTalkText = selectedWord === null ? "" : decTalkTexts[selectedWord]

  return (
    <div className="App">
      <div style={{fontSize: 48}}>
      <VoicedWord color="pink" selected={selectedWord === 0} onClick={() => setSelectedWord(0)} onDoubleClick={() => audioRef.current?.play()} >טִפְחָ֖א</VoicedWord>
      <VoicedWord color="pink" selected={selectedWord === 1} onClick={() => setSelectedWord(1)} onDoubleClick={() => audioRef.current?.play()}>טִפְחָ֖א</VoicedWord>
      </div>

      <div>
        <DECTalk value={decTalkText} audioRef={audioRef}/>
      </div>
    </div>
  );
}

export default App;
