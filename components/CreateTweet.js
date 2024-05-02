import { useState } from "react"

export default function CreateTweet({setCreating}){
    // const [input, setInput] = useState({
    //     title: "",
    //     body: ""
    //  })

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    return(
        <div className="overflow-hidden fixed inset-0 bg-blue-600 text-white backdrop-blur-sm py-5 px-7" role="dialog" aria-modal="true">
            <div className="flex">
                <h1 className="text-lg mb-5">What's on your mind?</h1>
                <button className="text-lg mb-5" onClick={()=>setCreating(false)}>Close</button>
            </div>
            <div>
            <input 
                className="bg-blue-100 h-20 overflow-hidden rounded-lg mb-5 text-lg px-3 w-[90%]" 
                placeholder="Enter a title" 
                onChange={(e)=>setTitle(e.target.value)}
                value={title}>
            </input>
            </div>
            <div>
            <input className="bg-blue-100 h-80 overflow-hidden rounded-lg mb-5 text-lg px-3 w-[90%]" placeholder="Enter content here">
            </input>
            </div>
        </div>
    )
}