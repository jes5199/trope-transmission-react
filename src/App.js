
import React, { useState, useRef } from 'react';

import './App.css';
import DECTalk from './Views/DECTalk';
//import TropeCatalogue from './Views/TropeCatalogue.js';
import VoicedWord from './Views/VoicedWord';
import DecSungSyllable from './Models/DecSungSyllable';
import DecPhoneticWord from './Models/DecPhoneticWord';
import Melody from './Models/Melody';

function App() {
  //const [tropText, setTropText] = useState("טִפְחָ֖א");
  const [selectedWord, setSelectedWord] = useState(null);

  const audioRef = useRef();


  const melodyXml = [            
    ["g", 8, "upbeat"], 
    ["a", 10],
    ["C", 12],
    ["g", 8]];

  const melody = new Melody(melodyXml[0], melodyXml.slice(1));
  const transpose = -6 + 1;

  const speed = 3;
  const rate = 20 + (15 * speed);

  const sing = new DecPhoneticWord("Paul", rate, [
      new DecSungSyllable(3, melody.upbeatPitchAndDurationPairs(transpose), '~t', "~iy", "~p"),
      new DecSungSyllable(3, melody.pitchAndDurationPairs(transpose), '~cz', "~sp_o", null)
    ]
  );

  const decTalkTexts = [
    sing.decTalk
  ];

  const decTalkText = selectedWord === null ? "" : decTalkTexts[selectedWord]

  return (
    <div className="App">
      <div style={{fontSize: 48}}>
      <VoicedWord color="pink" selected={selectedWord === 0} onClick={() => setSelectedWord(0)} onDoubleClick={() => {audioRef.current?.play()}}>טִפְחָ֖א</VoicedWord>
      </div>

      <div>
        <DECTalk value={decTalkText} audioRef={audioRef}/>
      </div>
    </div>
  );
}

export default App;
