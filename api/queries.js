import { gql } from "graphql-tag";

export const usersQuery  = gql`
    query getUsers{
        users{
            user_id
            username
            email
            password
            created_at
        }
    }
`

export const getPostsQuery = gql`
    query getPosts{
        posts {
            post_id
        }
    }
`

export const getPostByIdQuery = gql`
    query getPostById($input: getPostByIdInput){
        getPostById(input: $input) {
            post_id
            title
            content
            likes
            retweets
            created_at
            user_id
        }
    }
`

export const createPostMutation = gql`
    mutation CreatePost($input: createPostInput!) {
        createPost(input: $input) {
            title
        }
    }
`

export const deletePostMutation = gql`
    mutation DeletePost($input: deletePostInput) {
        deletePost(input: $input) {
            post_id
        }
    }
`

export const createLikeMutation = gql`
    mutation CreateLike($input: createLikeInput!){
        createLike(input: $input) {
            post_id
        }
    }
`

export const createRetweetMutation = gql`
    mutation CreateRetweet($input: createRetweetInput!){
        createRetweet(input: $input) {
            post_id
        }
    }
`