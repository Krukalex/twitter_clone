'use client'

import defaultImg from '../../assets/default_img.png'
import { useState, useEffect } from 'react'
import { client } from '@/app/ApolloWrapper';
import { getUserByIdQuery } from '@/api/queries';

export default function ProfilePage(){
    const user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState();

    async function getUserData(){
        const { data } = await client.query({
            query: getUserByIdQuery,
            variables:{input: {user_id}}
        })
        setUser(data.getUserById)
        setUserName(data.getUserById.username)
        setEmail(data.getUserById.email)
    }
    useEffect(()=>{
        getUserData();
        
    }, [])
    
    if(!user){
        return <p>loading ...</p>
    }
    return(
        <>
        <div className='flex'>
            <div>
                <img src={defaultImg.src} width={200} height={200} alt='profile picture'/>
                <button>Upload new profile picture</button>
            </div>
            <div className='flex flex-col'>
                <input 
                    placeholder="username" 
                    value={username} 
                    onChange={(e)=>setUserName(e.target.value)}/>
                <input 
                    placeholder="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>
            </div>
        </div>
        </>
    )
}