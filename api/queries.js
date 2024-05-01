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
            title
            content
            created_at
            user_id
            likes
            retweets
        }
    }
`