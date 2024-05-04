import { createPostLike } from "@/data/postLikes";
import { createPost, deletePost, getPosts, getPostsById, getPostsIds } from "@/data/posts";
import { createRetweet } from "@/data/retweets";
import { getUsers } from "@/data/users"

export const resolvers = {
    Query:{
        users: async()=>{
            const data = await getUsers();
            return data;
        },
        posts: async()=>{
            const data = await getPostsIds();
            return data
        },
        getPostById: async(_root, {input: {post_id}})=>{
            const data = await getPostsById(post_id);
            return data;
        }
    },
    Mutation:{
        createPost: async(_root, {input:{title, content}})=>{
            const user_id = 1;

            const data = await createPost({title, content, user_id})
            return null;
        },
        deletePost: async(_root, {input: {id}})=>{
            const data = await deletePost(id)
            return null
        },
        createLike: async(_root, {input: { post_id, user_id } })=>{
            const data = await createPostLike({post_id, user_id})
            return null;
        },
        createRetweet: async(_root, {input: {post_id, user_id}})=>{
            const data = await createRetweet({post_id, user_id})
            return null;
        }
    }
}