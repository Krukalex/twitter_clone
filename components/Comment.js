export default function Comment({data}){
    return(
        <>
        <div className="px-3 py-3 outline outline-1">
            <h1 className="mb-2">@{data.user_id}</h1>
            <p>{data.content}</p>
        </div>
        </>
    )
}