"use client"

import Tweet from '@/components/Tweet'
import { useEffect, useState } from "react";
import { client } from "@/app/ApolloWrapper";
import { getPostsQuery } from "@/api/queries";
import CreateTweet from '@/components/CreateTweet';



export default function PostFunction(){

    const [data, setData] = useState();
    const [creating, setCreating] = useState(false)

    useEffect(()=>{
        async function getData(){
            const { data } = await client.query({
                query: getPostsQuery
            });
            //console.log(data.posts);
            setData(data.posts)
            return data.posts;
        }
        getData();
    }, [])

    function handleCreate(e){
        e.preventDefault()
        setCreating(true)
    }

    return (
        <>
        <button onClick={handleCreate} className= "mx-10 my-5 bg-slate-900 p-5 text-white rounded-lg">
            Make a post
        </button>
        {creating && <CreateTweet setCreating={setCreating}/>}
        {data ? data.map((tweetData, key)=><Tweet data = {tweetData} key={key}/>) : <p>Loading ...</p>} 
        </>
    );
}