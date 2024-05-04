import { client } from "@/app/ApolloWrapper";
import { createLike, createLikeMutation, createRetweetMutation, deletePostMutation, getPostByIdQuery } from "@/api/queries";
import { useState, useEffect } from "react";
import CommentsPage from "./CommentsPage";

export default function Tweet({tweetData, pageData, setPageData}){
    const { 
        post_id,
    } = tweetData


    const [tweet, setTweet] = useState();
    const [postLikes, setPostLikes] = useState(false)
    const [viewingComments, setViewingComments] = useState(false);

    async function getData(){
        const { data } = await client.query({
            query: getPostByIdQuery,
            variables: {input: {post_id}},
            fetchPolicy: "network-only"
        });
        setTweet(data.getPostById)
        return data.getPostById;
    }

    useEffect(()=>{
        getData();
    }, [postLikes])

    async function handleUpdateLikes(e){
        const { data } = await client.mutate({
            mutation: createLikeMutation,
            variables: { input: {post_id: post_id, user_id: tweet.user_id}}
          });
        setPostLikes(!postLikes)
        return data;
    }

    async function handleUpdateRetweet(e){
        const { data } = await client.mutate({
            mutation: createRetweetMutation,
            variables: { input: {post_id: post_id, user_id: tweet.user_id}}
        });
        setPostLikes(!postLikes)
        return data;
    }


    async function handleDeleteTweet(e){
        const { data } = await client.mutate({
            mutation: deletePostMutation,
            variables: { input: {id: post_id}}
          });
          setPageData(pageData.filter((e)=>e.post_id!=post_id))
        return data;
    }

    if( !tweet ){
        return <p>... Loading</p>
    }
    return(
        <>
        <div className="bg-blue-600 text-white p-3 mx-10 my-5 rounded-lg text-lg">
            <div className="flex justify-between">
            <h3 className="py-2">{tweet.title}
                <span id="screen_name">@{tweet.user_id} </span>
                <span>{tweet.created_at}</span>
            </h3>
            <button 
                className="mx-2 px-4 py-2 rounded-lg bg-blue-900"
                onClick={handleDeleteTweet}
                >
                    Delete
            </button>
            </div>
            <p className="py-5">{tweet.content}</p>
            <div className="py-3">
                <button className="pr-10" onClick={()=>setViewingComments(!viewingComments)}>Comments {tweet.comments}</button>
                <button className="pr-10" onClick={handleUpdateLikes}> Likes {tweet.likes}</button>
                <button className="pr-10" onClick={handleUpdateRetweet}>Retweet {tweet.retweets}</button>
            </div>
            {viewingComments && <CommentsPage post_id={post_id} />}
        </div>
        </>
    )
}