import { createComment, getPostComments, getUserComments } from "@/data/comments";
import { createPostLike } from "@/data/postLikes";
import { createPost, deletePost, getPosts, getPostsById, getPostsIds } from "@/data/posts";
import { createRetweet } from "@/data/retweets";
import { getUserById, getUsers, getUserByEmail, createUser } from "@/data/users"

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
            const postData = await getPostsById(post_id);
            const userData = await getUserById(postData.user_id)
            const output = {
                ...postData,
                user: userData[0]
            }
            return output;
        },
        getPostComments: async(_root, {input: {post_id}})=>{
            const commentData = await getPostComments(post_id);
            const commentsWithUsers = await Promise.all(commentData.map(async(data)=>{
                const userData = await getUserById(data.user_id)
                return {
                    ...data,
                    user: userData[0]
                }
            }))
            return commentsWithUsers;
        },
        getUserComments: async(_root, {input: {user_id}})=>{
            const data = await getUserComments(user_id);
            return data;
        },
        getUserByEmail: async(_root, {input: {email}})=>{
            const userData = await getUserByEmail(email);
            // const postData = await getPostsById(userData.post_id);
            // const output = {
            //     ...userData,
            //     posts: postData[0]
            // }
            return userData[0];
        },
        getUserById: async(_root, {input: {user_id}})=>{
            const userData = await getUserById(user_id);
            return userData[0];
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
        },
        createUser: async(_root, {input: {username, email, password}}) =>{
            const data = await createUser({username, email, password});
            return null
        }
    }
}