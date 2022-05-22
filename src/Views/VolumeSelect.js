function VolumeSelect({value, onChange}) {
    return <span style={{padding: "5px"}}>
        <label htmlFor="pitch">volume: </label>
        <input type="number" id="volume" name="volume" value={value} min="1" max="10" onChange={(e) => onChange(e.target.value)}/>
    </span>
}

export default VolumeSelect;