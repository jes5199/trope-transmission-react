class DecPhoneticWord {
    decTalk = "";

    constructor(voice, rate, syllables) {
        let phonemes = "";

        for (let syllable of syllables) {
            if (syllable.decTalk) {
                phonemes += syllable.decTalk;
            } else if (typeof phonemes === 'string') {
                phonemes += syllable;
            }
        }

        this.decTalk =  "[:volume att 80] [:mode email on] [:comma -40] [:name "+voice+"] " 
        + "[:rate "+rate+"] [:phoneme arpabet speak on]" 
        + "[" + phonemes + "]"
    }
}

export default DecPhoneticWord;