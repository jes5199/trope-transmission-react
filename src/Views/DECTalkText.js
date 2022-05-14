function DECTalkText({initialValue}) {
    const [text, setText] = useState(initialValue);

    return <div>
        <textarea value={text} onChange={setText}></textarea>
        
    </div>
}

export default DECTalkText;