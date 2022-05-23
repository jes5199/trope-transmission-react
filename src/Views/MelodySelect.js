function MelodySelect({tropeDefCatalog, onChange, value}) {
    return <span style={{padding: "5px"}}>
        <label htmlFor="melody">melody: </label>
        <select id="melody" name="melody" value={value} onChange={(e) => onChange(e.target.value)}>
            {Object.keys(tropeDefCatalog?.defs || {}).map((tropeDefName) => 
                <option value={tropeDefName} key={tropeDefName}>{tropeDefName}</option>
            )}
        </select>
    </span>
}

export default MelodySelect;