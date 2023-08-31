import { useState } from "react"

const ShortURL = () => {
    const [shortenLink, setShortenLink] = useState("Platzhalter Short URL")

    return (
        <div className="result">
            <p>{shortenLink}</p>
            <button>Copy</button>
        </div>
    )
}

export default ShortURL