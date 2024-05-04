export default function Comment({data}){
    return(
        <>
        <h1>@{data.user_id}</h1>
        <p>{data.content}</p>
        </>
    )
}