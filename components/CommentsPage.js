import { getPostCommentsQuery } from "@/api/queries"
import { client } from "@/app/ApolloWrapper"
import { useEffect, useState } from "react"
import Comment from "./Comment"

export default function CommentsPage({post_id}){
    const [postData, setPostData] = useState()

    useEffect(()=>{
        const getComments = async()=>{
            const { data } = await client.query({
                query: getPostCommentsQuery,
                variables: {input: {post_id: post_id}}
            })
            console.log(data)
            setPostData(data.getPostComments)
        }
        getComments()
    })

    if(!postData){
        return <p>No Comments Yet</p>
    }
    return(
        <>
        {postData.map((data)=><Comment data={data}/>)}
        </>
    )
}