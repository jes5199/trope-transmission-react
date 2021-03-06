function SpeedSelect({value, onChange}) {
    return <span style={{padding: "5px"}}>
        <label htmlFor="speed">speed: </label>
        <input type="number" id="speed" name="speed" value={value} min="1" max="25" onChange={(e) => onChange(e.target.value)}/>
    </span>
}

export default SpeedSelect;