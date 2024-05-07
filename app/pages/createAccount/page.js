'use client'

import { useContext, useState } from "react"
import { client } from "@/app/ApolloWrapper";
import { createUserMutation } from "@/api/queries";
import { useRouter } from "next/navigation";
import { Context } from "@/app/layout";

export default function CreateAccount(){
    const router = useRouter();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const {setLoggedIn} = useContext(Context)

    async function handleCreateUser(e){
        e.preventDefault();
        const { data } = await client.mutate({
            mutation: createUserMutation,
            variables: {input: {username, email, password}}
        })
        setLoggedIn(true)
        router.push('/')
        return data;
    }


    return(
        <>
        <div className='flex flex-col bg-blue-700 p-10 pb-20 mt-40 mb-10 mx-[30vh] rounded-md w-[60%]'>
            <p className="mb-10 text-white text-xl">Create an Account</p>
            <input 
                placeholder="Enter username" 
                type="text" 
                className="my-5 h-10 rounded-lg px-2 w-[80%]"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}/>
            <input 
                placeholder="Enter email" 
                type="text" 
                className="my-5 h-10 rounded-lg px-2 w-[80%]"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
            <input 
                placeholder="Enter password" 
                type="text" 
                className="my-5 h-10 rounded-lg px-2 w-[80%]"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleCreateUser} className="bg-slate-300 px-3 mt-10 rounded-md w-[20%] text-xl">Submit</button>
        </div>
        </>
    )
}