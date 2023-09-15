import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

function Translater() {
    const [option, setOption] = useState([]);
    const [from, setFrom] = useState("en");
    const [to, setTo] = useState("en");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const translate = () => {
        const params = new URLSearchParams({ foo: "bar" });
        params.append("q", input);
        params.append("source", from);
        params.append("target", to);
        params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
        axios.post("/foo", params);
        axios
            .post("https://libretranslate.de/translate", params, {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((res) => {
                console.log(res.data);
                setOutput(res.data.translatedText);
            });
    };

    useEffect(() => {
        axios
            .get("https://libretranslate.de/languages", {
                headers: { accept: "application/json" },
            })
            .then((res) => {
                console.log(res.data);
                setOption(res.data);
            });
    }, []);
    // curl -X 'GET' \
    // 'https://libretranslate.com/languages' \
    // -H 'accept: application/json'
    return (
        <>
            <div className="App">
                <div>
                    from({from}):
                    <select onChange={(e) => setFrom(e.target.value)}>
                        {option.map((opt) => (
                            <option key={opt.code} value={opt.code}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                    to({to}):
                    <select onChange={(e) => setTo(e.target.value)}>
                        {option.map((opt) => (
                            <option key={opt.code} value={opt.code}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <textarea
                        cols="50"
                        rows="4"
                        onInput={(e) => setInput(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <textarea cols="50" rows="4" value={output}></textarea>
                </div>
                <div>
                    <button onClick={(e) => translate()}>translate</button>
                </div>
            </div>
        </>
    )
}

export default Translater