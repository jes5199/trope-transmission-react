class DecSungSyllable {
    decTalk = ""
    speed = 10
    pitchDurationPairs = []

    startPhoneme = null
    holdPhoneme = null
    endPhoneme = null

    splitPhoneme(decPhoneme) {
        if (decPhoneme.includes("<")) {
            return [decPhoneme];
        } else if (decPhoneme === "~gr_eu") {
            return ["~gr_o", "~oy", "~yx"];
        } else if (decPhoneme === "~gr_az") {
            return ["~eh", "~gr_az"];
        } else if (decPhoneme === "~gr_au") {
            return ["~gr_a", "~gr_au_w"];
        } else if (decPhoneme === "~gr_a~gr_j") {
            return ["~gr_a", "~gr_a", "~gr_j"];
        }
        return [decPhoneme, decPhoneme];
    }

    slideAndThenHoldPitch(decPhoneme, pitch, slideDuration, holdDuration) {
        if (!slideDuration) {slideDuration = ""}
        if (!holdDuration) {holdDuration = ""}
        if (!pitch) {pitch = ""} else {pitch = 5000 + pitch}
    
        let parts = this.splitPhoneme(decPhoneme);
    
        let r = "";
        for (let [index, phoneme] of parts.entries()) {
            if (phoneme.includes("<")) {
                r += phoneme;
            } else {
                // seems like a bug in TT that diphongs get held extra long
                let duration = index === 0 ? slideDuration : holdDuration;
                r += phoneme + "<" + duration + "," + pitch + ">";
            }
        }
        return r;
    }
    
    vowelHoldDuration(speed, duration, isUpbeat) {
        let divisor = 20 + (12 * speed);
    
        let wholeNoteLength = Math.round(120000 / divisor);
        let noteLength = Math.round(wholeNoteLength / duration);
    
        if (isUpbeat) {
            noteLength = Math.round(noteLength / 1.1);
        }
    
        let tenPercentLength = Math.round(noteLength * 0.1);
        let randomLength = Math.floor(Math.random() * tenPercentLength);
        let sungNoteLength = noteLength + randomLength;
    
        let holdLength = Math.max(25, sungNoteLength - 50);
        return holdLength;
    }

    noteSlideAndHoldDuration(speed, duration, isVowel, isUpbeat) {    
        let slideDuration = isVowel ? 50 : 20;
        let holdDuration = isVowel ? this.vowelHoldDuration(speed, duration, isUpbeat) : null;
    
        return [slideDuration, holdDuration];
    }
        

    calculateDecTalk() {
        let r = "";

        if (this.startPhoneme) {
            let [pitch, duration] = this.pitchDurationPairs[0];
            let [slideDuration, holdDuration] = this.noteSlideAndHoldDuration(this.speed, duration, false, false);
            r += this.slideAndThenHoldPitch(this.startPhoneme, pitch, slideDuration, holdDuration);
        }

        for (let [pitch, duration] of this.pitchDurationPairs) {
            let detune = Math.floor(Math.random() * 3) - 2;

            let [slideDuration, holdDuration] = this.noteSlideAndHoldDuration(this.speed, duration, true, false);
            
            r += this.slideAndThenHoldPitch(this.holdPhoneme, pitch + detune, slideDuration, holdDuration);
        }

        if (this.endPhoneme) {
            let [pitch, duration] = this.pitchDurationPairs[this.pitchDurationPairs.length - 1];
            let [slideDuration, holdDuration] = this.noteSlideAndHoldDuration(this.speed, duration, false, false);
            r += this.slideAndThenHoldPitch(this.endPhoneme, pitch, slideDuration, holdDuration);
        }

        this.decTalk = r;
    }
    
    constructor(speed, pitchDurationPairs, startPhoneme, holdPhoneme, endPhoneme) {
        this.speed = speed;
        this.pitchDurationPairs = pitchDurationPairs;
        this.startPhoneme = startPhoneme;
        this.holdPhoneme = holdPhoneme;
        this.endPhoneme = endPhoneme;

        this.calculateDecTalk();
    }
}

export default DecSungSyllable;