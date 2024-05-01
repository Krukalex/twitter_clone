'use server';

import { client } from "@/app/ApolloWrapper";
import { getPostsQuery } from "@/api/queries";

export async function getData(){
    const { data } = await client.query({
        query: getPostsQuery
    });
    //console.log(data.posts);
    return data.posts;
}