"use client"

import Tweet from '@/components/Tweet'
import { useEffect, useState } from "react";
import { client } from "@/app/ApolloWrapper";
import { getPostsQuery } from "@/api/queries";



export default function PostFunction(){

    const [data, setData] = useState();

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


    return (
        <>
        <h1>Make a post</h1>
        {data ? <Tweet data = {data} /> : <p>Loading ...</p>} 
        </>
    );
}