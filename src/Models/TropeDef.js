import Melody from "./Melody";

class TropeDefCatalog {
    defs = {}

    addTropeDef(tropeDef) {
        if (tropeDef.type === "Torah" ) {
            this.defs[tropeDef.name] = tropeDef;
        }
    }

    names() {
        return Object.keys(this.defs);
    }

    byName(name) {
        return this.defs[name];
    }

    fromXml(xml) {
        Array.from(xml.getElementsByTagName("TROPEDEF")).forEach((element) => {
            this.addTropeDef( new TropeDef().fromXml(element) );
        });
        return this;
    }
}

class TropeDef {
    name = ""
    type = ""
    encoding = ""
    pitchbend = 0
    key = "C MAJOR"
    assimilatePitch = false
    assimilateRhythm = false
    description = ""
    tropes = []

    constructor(name, type, encoding, pitchbend, key, assimilatePitch, assimilateRhythm, description) {
        this.name = name
        this.type = type
        this.encoding = encoding
        this.pitchbend = pitchbend
        this.key = key
        this.assimilatePitch = assimilatePitch
        this.assimilateRhythm = assimilateRhythm
        this.description = description
    }

    fromXml(element) {
        //console.log(element);
        this.name = element.getAttribute('NAME');
        this.type = element.getAttribute('TYPE');
        this.encoding = element.getAttribute('ENCODING');
        this.pitchbend = element.getAttribute('PITCHBEND');
        this.key = element.getAttribute('KEY');
        this.assimilatePitch = element.getAttribute('ASSIMILATE_PITCH');
        this.assimilateRhythm = element.getAttribute('ASSIMILATE_RHYTHM');
        this.description = element.getAttribute('DESCRIPTION');
        this.tropes = Array.from(element.getElementsByTagName('TROPE')).map(element => new Trope().fromXml(element, this));
        return this;
    }

    byName(name) {
        let matches = this.tropes.filter(tr => tr.name === name);
        if (matches.length > 1) {
            console.log("multiple entries for " + name);
        }
        return matches[0];
    }
}

class Trope {
    tropeDef = null
    name = ""
    melodies = []

    fromXml(element, tropeDef) {
        this.tropeDef = tropeDef
        this.name = element.getAttribute('NAME');
        this.melodies = Array.from(element.getElementsByTagName('CONTEXT')).map(element => new TropeMelody().fromXml(element));
        return this;
    }

    default() {
        let matches = this.melodies.filter(melody => melody.default);

        if (matches.length > 1) {
            console.log("multiple defaults for " + this.name);
        }
        return matches[0];
    }
}

class TropeMelody {
    rules = {}
    upbeatNotes = []
    notes = []
    default = false

    fromXml(element) {
        if (element.getAttribute("DEFAULT")) {
            this.default = element.getAttribute("DEFAULT");
        }
        Array.from(element.getAttributeNames()).forEach((attribute) => {
            this.rules[attribute] = element.getAttribute(attribute);
        });
        this.upbeatNotes = []
        this.notes = []    
        Array.from(element.getElementsByTagName('NOTE')).forEach((noteElement) => {
            let pitch = noteElement.getAttribute("PITCH");
            let duration = noteElement.getAttribute("DURATION");
            let isUpbeat = noteElement.getAttribute("UPBEAT");

            let pair = [pitch, duration];
            if (isUpbeat) {
                this.upbeatNotes.push(pair);
            } else {
                this.notes.push(pair);
            }
        })
        return this;
    }

    melody() {
        return new Melody(this.upbeatNotes[0], this.notes);
    }
}

class TropeDefXml {
    path = ""
    xml = null
    tropeDefCatalog = null

    constructor(path) {
        this.path = path || "/tropedef.xml"
        this.tropeDefCatalog = new TropeDefCatalog()
    }

    fetch(callback) {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                self.processResponse(this, callback);
            }
          };
        
          xhttp.open("GET", this.path, true);
          xhttp.send();
    }

    processResponse(response, callback) {
        this.xml = response.responseXML;
        this.processXml(this.xml);
        callback(this.tropeDefCatalog);
    }

    processXml(xml) {
        this.tropeDefCatalog = new TropeDefCatalog();
        this.tropeDefCatalog.fromXml(xml)
    }
}

export {TropeDefXml}