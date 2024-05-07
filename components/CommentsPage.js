import { createCommentMutation, getPostCommentsQuery } from "@/api/queries"
import { client } from "@/app/ApolloWrapper"
import { useEffect, useState, useContext } from "react"
import Comment from "./Comment"
import { Context } from "@/app/layout"

export default function CommentsPage({post_id, updated, setUpdated}){
    const [postData, setPostData] = useState()
    const [commentInput, setCommentInput] = useState("")
    const {loggedIn, userData} = useContext(Context)

    const {username, user_id} = userData

    const getComments = async()=>{
        const { data } = await client.query({
            query: getPostCommentsQuery,
            variables: {input: {post_id: post_id}},
            fetchPolicy: 'network-only'
        })
        setPostData(data.getPostComments)
    }

    useEffect(()=>{
        getComments()
    }, [updated])

    async function handleCommentSubmit(e){
        const { data } = await client.mutate({
            mutation: createCommentMutation,
            variables: { input: {post_id: post_id, user_id: user_id, content: commentInput}},
          });
          setCommentInput("")
          setUpdated(!updated)
        return data;
    }

    if(!postData){
        return <p>Loading ...</p>
    }
    return(
        <>
        <div className="max-h-[300px] overflow-y-scroll scrollbar-hide">
            {postData.map((data)=><Comment data={data}/>)}
        </div>
        <div className="flex px-1">
            <input 
                placeholder="place comment here" 
                className="px-2 rounded-md text-black my-3 w-[80%]" 
                onChange={(e)=>setCommentInput(e.target.value)} 
                value={commentInput}/>
            <button 
                className="mx-2 bg-blue-900 px-3 py-2 my-2.5 rounded-lg text-base"
                onClick={handleCommentSubmit}
                disabled = {!loggedIn}
                >
                    Submit
            </button>
        </div>
        </>
    )
}