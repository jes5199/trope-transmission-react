function cssColor(color) {
    if (color === "pink") {
        return "#FE70FF"
    }
}

function VoicedWord({value, color, selected, onClick, onDoubleClick, children}) {
    const styleColor = cssColor(color);
    const selectedColor = "#808080";

    const backgroundColor = selected ? selectedColor : styleColor;
    const textColor = selected ? styleColor : "#000000";

    const onMouseDown = function(e) {
        if (e.detail > 1){
            e.preventDefault();
        }    
    }

    return <span style={{
        backgroundColor: backgroundColor,
        color: textColor,
        fontSize: 48, padding: "5px", margin: "15px"}}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseDown={onMouseDown}
        >
        {children}
    </span>

}

export default VoicedWord;