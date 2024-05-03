import { client } from "@/app/ApolloWrapper";
import { deletePostMutation } from "@/api/queries";

export default function Tweet({tweetData, pageData, setPageData}){
    const { 
        post_id,
        title, 
        content, 
        created_at,
        user_id, 
        likes, 
        retweets
    } = tweetData

    async function handleDeleteTweet(e){
        const { data } = await client.mutate({
            mutation: deletePostMutation,
            variables: { input: {id: post_id}}
          });
          setPageData(pageData.filter((e)=>e.post_id!=post_id))
        return data;
    }


    return(
        <div className="bg-blue-600 text-white p-3 mx-10 my-5 rounded-lg text-lg">
            <div className="flex justify-between">
            <h3 className="py-2">{title}
                <span id="screen_name">@{user_id} </span>
                <span>{created_at}</span>
            </h3>
            <button 
                className="mx-2 px-4 py-2 rounded-lg bg-blue-900"
                onClick={handleDeleteTweet}
                >
                    Delete
            </button>
            </div>
            <p className="py-5">{content}</p>
            <div className="py-3">
                <button className="pr-10">Comments 0</button>
                <button className="pr-10"> Likes {likes}</button>
                <button className="pr-10">Retweet {retweets}</button>
            </div>
        </div>
    )
}