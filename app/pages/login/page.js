'use client'

import { getUserByEmailQuery } from "@/api/queries";
import { client } from "@/app/ApolloWrapper"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation";
import { Context } from "@/app/layout";

export default function loginPage(){
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failedLogin, setFailedLogin] = useState(false)
    const {loggedIn, setLoggedIn} = useContext(Context)


    async function handleLogin(e){
        const { data } = await client.query({
            query: getUserByEmailQuery,
            variables: {input: {email}}
        })
        const user = data.getUserByEmail
        if(user && user.password == password){
            router.push('/pages/post')
            setFailedLogin(false);
            sessionStorage.setItem("user_id", user.user_id)
            setLoggedIn(true)
        } else {
            setFailedLogin(true);
            setEmail("")
            setPassword("")
        }
    }
    return(
        <>
        <div className='flex flex-col bg-blue-700 p-10 pb-20 my-40 mx-[30vh] rounded-md items-center w-[60%]'>
            <p className="text-center mb-10 text-white text-xl">Fake Twitter</p>
            {failedLogin && <p className="bg-red-200 px-3 py-1 rounded-sm text-red-900 w-[80%] text-center">Login failed - username or password is incorrect</p>}
            <input 
                placeholder="Enter username" 
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
            <button onClick={handleLogin} className="bg-white px-3 rounded-md">Submit</button>
        </div>
        </>
    )
}