class TropeDefCatalog {
    defs = {}

    addTropeDef(tropeDef) {
        this.defs[tropeDef.name] = tropeDef;
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
        return this;
    }
}

class Trope {
    name = ""
}

class TropeContext {

}

class TropeNote {

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
            if (this.readyState == 4 && this.status == 200) {
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