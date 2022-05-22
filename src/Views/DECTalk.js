import React, { useState } from 'react';

function DECTalk({value, audioRef}) {
    const [oldText, setOldText] = useState(value);
    const [text, setText] = useState(value);

    if(oldText !== value) {
        setTimeout(() => {setOldText(value); setText(value)}, 10);
    }

    const audioUrl = text === "" ? "" : `http://34.222.28.30/tropetalk?say=${encodeURIComponent(text)}`;

    const handleChange = event => {
        console.log("setting text to ", event.target.value);
        setText(event.target.value);
    };

    return <div style={{margin: "20px"}} id={"decTalk " + value}>
        <div>
            <textarea readOnly cols="80" rows="5" value={text} onChange={handleChange}></textarea>
        </div>
        { audioUrl &&
        <div>
            <audio controls src={audioUrl} ref={audioRef}>
            <source src={audioUrl} type="audio/wav" />
            </audio>
        </div>
        }
    </div>
}

export default DECTalk;