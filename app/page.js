  "use client"

  import Tweet from '@/components/Tweet'
  import { useEffect, useState, useContext } from "react";
  import { client } from "@/app/ApolloWrapper";
  import { getPostsQuery } from "@/api/queries";
  import { useRouter } from 'next/navigation';
  import { Context } from './layout';
  
  
  
  export default function PostFunction(){
    const router = useRouter();
    const [data, setData] = useState();
    const {loggedIn} = useContext(Context)
  
  
      useEffect(()=>{
          async function getData(){
              const { data } = await client.query({
                  query: getPostsQuery
              });
              //console.log(data.posts);
              setData(data.posts)
              return data.posts;
          }
          getData();
      }, [])
  
  
      return (
          <>
          {loggedIn && <button className= "mx-10 my-5 bg-slate-900 p-5 text-white rounded-lg" onClick={()=>router.push('/pages/post')}>
              Make a post
          </button>}
          {data ? data.map((tweetData, key)=><Tweet tweetData= {tweetData} pageData = {data} setPageData={setData} key={key}/>) : <p>Loading ...</p>} 
          </>
      );
  }