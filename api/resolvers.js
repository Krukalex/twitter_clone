import { createComment, getPostComments, getUserComments } from "@/data/comments";
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
        },
        getPostComments: async(_root, {input: {post_id}})=>{
            const data = await getPostComments(post_id);
            return data;
        },
        getUserComments: async(_root, {input: {user_id}})=>{
            const data = await getUserComments(user_id);
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
        },
        createComment: async(_root, {input: {post_id, user_id, content}})=>{
            const data = await createComment({post_id, user_id, content});
            return null;
        }
    }
}