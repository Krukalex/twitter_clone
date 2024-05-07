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
            comments
            created_at
            user{
                user_id
                username
            }
        }
    }
`

export const getPostCommentsQuery = gql`
    query GetPostComments($input: getPostCommentsInput!){
        getPostComments(input: $input){
            content
            post_id
            user{
                user_id
                username
            }
            created_at
        }
    }
`

export const getUserByEmailQuery = gql`
    query GetUserByEmail($input: getUserByEmailInput){
        getUserByEmail(input: $input) {
            user_id
            username
            email
            password
        }
    }
`

export const getUserByIdQuery = gql`
    query GetUserById($input: getUserByIdInput){
        getUserById(input: $input) {
            email
            username
            user_id
            created_at
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

export const createCommentMutation = gql`
    mutation CreateComments($input: createCommentInput){
        createComment(input: $input) {
            post_id
        } 
    }
`

export const createUserMutation = gql`
    mutation CreateUser($input: createUserInput){
        createUser(input: $input) {
            user_id
        }
    }
`