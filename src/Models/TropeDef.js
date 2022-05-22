class TropeDefCatalog {
    defs = {
    }

    addTropeDef(tropeDef) {
        defs[tropeDef.name] = tropeDef
    }

    names() {
        return Object.keys(this.defs);
    }

    byName(name) {
        return this.defs[name];
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

    constructor(path) {
        this.path = path
    }

    fetch() {
        this.xml = "TODO"
    }
}