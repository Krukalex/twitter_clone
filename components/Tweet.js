export default function Tweet({data}){
    const { 
        title, 
        content, 
        created_at,
        user_id, 
        likes, 
        retweets
    } = data


    return(
        <div className="bg-blue-600 text-white p-3 mx-10 my-5 rounded-lg text-lg">
            <h3 className="py-2">{title}
                <span id="screen_name">@{user_id} </span>
                <span>{created_at}</span>
            </h3>
            <p className="py-5">{content}</p>
            <div className="py-3">
                <button className="pr-10">Comments 0</button>
                <button className="pr-10"> Likes {likes}</button>
                <button className="pr-10">Retweet {retweets}</button>
            </div>
        </div>
    )
}