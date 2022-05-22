import NoteNames from '../Data/NoteNames'

class Melody {
    upbeatNoteAndDuration = null;
    noteAndDurationPairs = [];

    numberFor(note) {
        return NoteNames[note] ?? note
    }

    pitchFor(note, transpose) {
        let noteNumber = this.numberFor(note);    
        if (!transpose) { 
            transpose = 0;
        }

        let transposedNote = noteNumber + transpose + 30 + 5 - 9;
        let frequency = Math.round((2 ** (transposedNote / 12) ) * 13.75);
    
        return frequency;
    }

    upbeatPitchAndDurationPairs(transpose) {
        if (this.upbeatNoteAndDuration) {
            let [upbeatNote, upbeatDuration] = this.upbeatNoteAndDuration;
            let upbeatPitch = this.pitchFor(upbeatNote, transpose);
            return [[upbeatPitch, upbeatDuration]];
        }
    }

    pitchAndDurationPairs(transpose) {
        return this.noteAndDurationPairs.map( (pair) => {
            let [note, duration] = pair;
            let pitch = this.pitchFor(note, transpose);
            return [pitch, duration];
        })
    }

    constructor(upbeatNoteAndDuration, noteAndDurationPairs) {
        this.upbeatNoteAndDuration = upbeatNoteAndDuration;
        this.noteAndDurationPairs = noteAndDurationPairs;
    }
}

export default Melody;