import { client } from "@/app/ApolloWrapper";
import { createLikeMutation, createRetweetMutation, deletePostMutation, getPostByIdQuery } from "@/api/queries";
import { useState, useEffect, useContext } from "react";
import CommentsPage from "./CommentsPage";
import { Context } from "@/app/layout";

export default function Tweet({tweetData, pageData, setPageData}){
    const { 
        post_id,
    } = tweetData


    const [tweet, setTweet] = useState();
    const [updated, setUpdated] = useState(false)
    const [viewingComments, setViewingComments] = useState(false);
    const {loggedIn, userData} = useContext(Context)

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
    }, [updated])

    async function handleUpdateLikes(e){
        const { data } = await client.mutate({
            mutation: createLikeMutation,
            variables: { input: {post_id, user_id: userData.user_id}}
          });
          setUpdated(!updated)
        return data;
    }

    async function handleUpdateRetweet(e){
        const { data } = await client.mutate({
            mutation: createRetweetMutation,
            variables: { input: {post_id, user_id: userData.user_id}}
        });
        setUpdated(!updated)
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
                <span id="screen_name">@{tweet.user.username} </span>
                <span>{tweet.created_at}</span>
            </h3>
            <button 
                className="mx-2 px-4 py-2 rounded-lg bg-blue-900"
                onClick={handleDeleteTweet}
                disabled = {!loggedIn}
                >
                    Delete
            </button>
            </div>
            <p className="py-5">{tweet.content}</p>
            <div className="py-3">
                <button 
                    className="pr-10" 
                    onClick={()=>setViewingComments(!viewingComments)}
                    >
                        Comments {tweet.comments}
                </button>
                <button 
                    className="pr-10" 
                    onClick={handleUpdateLikes}
                    disabled = {!loggedIn}> 
                        Likes {tweet.likes}
                </button>
                <button 
                    className="pr-10" 
                    onClick={handleUpdateRetweet}
                    disabled = {!loggedIn}
                    >
                        Retweet {tweet.retweets}
                </button>
            </div>
            <div className={ viewingComments ? "outline outline-1 outline-slate-200 rounded-sm text-base" : undefined}>
                {viewingComments && <CommentsPage post_id={post_id} updated = {updated} setUpdated={setUpdated}/>}
            </div>
        </div>
        </>
    )
}