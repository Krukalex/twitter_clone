"use client"

import { useState } from "react"
import { createPostMutation } from "@/api/queries"
import { client } from "@/app/ApolloWrapper"
import { useRouter } from "next/navigation";


export default function PostFunction(){
    const router = useRouter();
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")


    async function handleCreateSubmit(e){
        e.preventDefault()
        const { data } = await client.mutate({
            mutation: createPostMutation,
            variables: { input: {title: title, content: body}}
          });
        router.push('/')
        return data;
    }

    return(
        <div className="bg-blue-600 text-white backdrop-blur-sm w-[100%] py-5 px-7" role="dialog" aria-modal="true">
            <div className="flex justify-between mt-5 mb-3">
                <h1 className="text-lg text-2xl">What's on your mind?</h1>
                <button className="text-lg bg-red-700 p-3 rounded-lg" onClick={()=>router.push('/')} >Cancel</button>
            </div>
            <form>
            <div>
                <input 
                    className="bg-blue-100 h-20 rounded-lg my-2 text-lg px-3 text-black align-top whitespace-normal w-full" 
                    placeholder="Enter a title" 
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                />
            </div>
            <div>
                <textarea 
                    className="bg-blue-100 rounded-lg my-2 px-3 pt-4 text-lg text-black resize-none w-full h-[55vh]" 
                    placeholder="Enter content here"
                    onChange={(e)=>setBody(e.target.value)}
                    value={body}
                ></textarea>
            </div>
            <button 
                className="text-lg my-5 bg-blue-900 py-4 px-8 rounded-lg text-xl" 
                onClick={handleCreateSubmit}
                >
                    Submit
            </button>
            </form>
        </div>
    )

}