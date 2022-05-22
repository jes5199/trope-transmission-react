function RangeSelect({value, onChange}) {
    return <span style={{padding: "5px"}}>
        <label htmlFor="range">range: </label>
        <select id="range" name="range" value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="Child">Child</option>
            <option value="Soprano">Soprano</option>
            <option value="Alto">Alto</option>
            <option value="Tenor">Tenor</option>
            <option value="Baritone">Baritone</option>
            <option value="Bass">Bass</option>
        </select>
    </span>
}

export default RangeSelect;