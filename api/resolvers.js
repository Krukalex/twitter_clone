import { getPosts } from "@/data/posts";
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
    }
}