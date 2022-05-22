function PitchSelect({value, onChange}) {
    return <span>
        <label htmlFor="pitch">pitch: </label>
        <input type="number" id="pitch" name="pitch" value={value} min="-12" max="12" onChange={(e) => onChange(e.target.value)}/>
    </span>
}

export default PitchSelect;