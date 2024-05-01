export default function Tweet({data}){
    const { 
        title, 
        content, 
        created_at,
        user_id, 
        likes, 
        retweets
    } = data[0]


    return(
        <div>
            <h3>{title}
                <span id="screen_name">@{user_id} </span>
                <span>{created_at}</span>
            </h3>
            <p>{content}</p>
            <div>
                <button>Comments 0</button>
                <button > Likes {likes}</button>
                <button>Retweet {retweets}</button>
            </div>
        </div>
    )
}