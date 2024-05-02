import { createPost, deletePost, getPosts } from "@/data/posts";
import { getUsers } from "@/data/users"

export const resolvers = {
    Query:{
        users: async()=>{
            const data = await getUsers();
            return data;
        },
        posts: async()=>{
            const data = await getPosts();
            return data
        }
    },
    Mutation:{
        createPost: async(_root, {input:{title, content}})=>{
            const likes = 0;
            const retweets = 0;
            const user_id = 1;

            const data = await createPost({title, content, likes, retweets, user_id})
            return null;
        },
        deletePost: async(_root, {input: {id}})=>{
            const data = await deletePost(id)
            return null
        }
    }
}