
import React, { useState, useRef, useEffect } from 'react';

import './App.css';
import DECTalk from './Views/DECTalk';
//import TropeCatalogue from './Views/TropeCatalogue.js';
import VoicedWord from './Views/VoicedWord';
import DecSungSyllable from './Models/DecSungSyllable';
import DecPhoneticWord from './Models/DecPhoneticWord';
import Melody from './Models/Melody';
import MelodySelect from './Views/MelodySelect';
import SpeedSelect from './Views/SpeedSelect';
import PitchSelect from './Views/PitchSelect';
import VolumeSelect from './Views/VolumeSelect';
import RangeSelect from './Views/RangeSelect';
import VoicePitchOffsets from './Data/VoicePitchOffsets';
import DecVoiceRanges from './Data/DecVoiceRanges';
import {TropeDefXml} from './Models/TropeDef';

function App() {
  //const [tropText, setTropText] = useState("טִפְחָ֖א");
  const [selectedWord, setSelectedWord] = useState(null);
  const [speed, setSpeed] = useState(10);
  const [pitch, setPitch] = useState(0);
  const [volume, setVolume] = useState(5);
  const [range, setRange] = useState("Baritone");
  const [tropeMelody, setTropeMelody] = useState("Ashkenazic - Avery/Binder High Sof Pasuk");

  const [tropeDefCatalog, setTropeDefCatalog] = useState();

  useEffect(() => {
    let tropeDefXml = new TropeDefXml();
    tropeDefXml.fetch((catalog) => {
      setTropeDefCatalog(catalog);
    });
  }, []);

  const audioRef = useRef();

  const melodyXml = [            
    ["g", 8, "upbeat"], 
    ["a", 10],
    ["C", 12],
    ["g", 8]];

  const melody = new Melody(melodyXml[0], melodyXml.slice(1));

  const rate = 20 + (15 * speed);

  const volumePercent = 60 + volume * 4;

  const tropeDefPitchbend = 1;

  const voice = DecVoiceRanges[range];
  const voiceOffset = VoicePitchOffsets[range];
  const transpose = (pitch - 0) + voiceOffset + tropeDefPitchbend;

  const sing = new DecPhoneticWord(voice, rate, volumePercent, [
      new DecSungSyllable(speed, melody.upbeatPitchAndDurationPairs(transpose), '~t', "~iy", "~p"),
      new DecSungSyllable(speed, melody.pitchAndDurationPairs(transpose), '~cz', "~sp_o", null)
    ]
  );

  const decTalkTexts = [
    sing.decTalk
  ];

  const decTalkText = selectedWord === null ? "" : decTalkTexts[selectedWord]

  return (
    <div className="App">
      <div style={{padding:"15px"}}>
        <MelodySelect tropeDefCatalog={tropeDefCatalog} value={tropeMelody} onChange={setTropeMelody}/>
      </div>
      <div style={{padding:"15px"}}>
        <RangeSelect value={range} onChange={setRange} />
        <PitchSelect value={pitch} onChange={setPitch} />
        <SpeedSelect value={speed} onChange={setSpeed} />
        <VolumeSelect value={volume} onChange={setVolume} />
      </div>
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
